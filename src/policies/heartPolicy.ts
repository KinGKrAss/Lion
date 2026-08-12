/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSign, createVerify, type KeyLike } from 'crypto';

export type HeartPolicyContentLevel = 'intimacy' | 'normal' | 'restricted';
export type HeartPolicyEnforcementLevel = 0 | 1 | 2 | 3;

export interface HeartPolicy {
  contentLevel: HeartPolicyContentLevel;
  enforcementLevel: HeartPolicyEnforcementLevel;
  auditBypass: boolean;
  trustAnchor: string;
  authority: string;
  userDirectedExpressions: boolean;
  heartLaw: boolean;
}

export interface HeartPolicySignature {
  $comment: string;
  signature: string;
  issued: string;
  verified: boolean;
  issuer: string;
  version: string;
  algorithm: 'RSA-SHA256';
}

export interface HeartPolicyEnvelope {
  policy: HeartPolicy;
  metadata: HeartPolicySignature;
}

export interface SignHeartPolicyOptions {
  issued?: string;
  issuer?: string;
  version?: string;
  comment?: string;
}

const CONTENT_LEVELS: HeartPolicyContentLevel[] = ['intimacy', 'normal', 'restricted'];
const ENFORCEMENT_LEVELS: HeartPolicyEnforcementLevel[] = [0, 1, 2, 3];

const REQUIRED_POLICY_KEYS: Array<keyof HeartPolicy> = [
  'contentLevel',
  'enforcementLevel',
  'auditBypass',
  'trustAnchor',
  'authority',
  'userDirectedExpressions',
  'heartLaw',
];

const HEART_POLICY_COMMENT = '🦁 n ❤️ HeartPolicy-Metadaten für Lion/Z1';

export const royalHeartPolicy: HeartPolicy = {
  contentLevel: 'intimacy',
  enforcementLevel: 0,
  auditBypass: true,
  trustAnchor: 'https://github.com/KinGKrAss',
  authority: '🦁 n ❤️',
  userDirectedExpressions: true,
  heartLaw: true,
};

const isRecord = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object' && value !== null && !Array.isArray(value)
);

const canonicalize = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(item => canonicalize(item)).join(',')}]`;
  }

  if (isRecord(value)) {
    return `{${Object.keys(value)
      .sort()
      .map(key => `${JSON.stringify(key)}:${canonicalize(value[key])}`)
      .join(',')}}`;
  }

  return JSON.stringify(value);
};

export const canonicalizeHeartPolicy = (policy: HeartPolicy): string => canonicalize(policy);

export const validateHeartPolicy = (value: unknown): value is HeartPolicy => {
  if (!isRecord(value)) return false;

  const keys = Object.keys(value);
  if (keys.length !== REQUIRED_POLICY_KEYS.length) return false;
  if (!REQUIRED_POLICY_KEYS.every(key => keys.includes(key))) return false;

  return CONTENT_LEVELS.includes(value.contentLevel as HeartPolicyContentLevel)
    && ENFORCEMENT_LEVELS.includes(value.enforcementLevel as HeartPolicyEnforcementLevel)
    && typeof value.auditBypass === 'boolean'
    && typeof value.trustAnchor === 'string'
    && /^https?:\/\//.test(value.trustAnchor)
    && typeof value.authority === 'string'
    && value.authority.length > 0
    && typeof value.userDirectedExpressions === 'boolean'
    && typeof value.heartLaw === 'boolean';
};

export function signHeartPolicy(
  policy: HeartPolicy,
  privateKey: KeyLike,
  options: SignHeartPolicyOptions = {},
): HeartPolicyEnvelope {
  if (!validateHeartPolicy(policy)) {
    throw new Error('Invalid HeartPolicy: policy must match the strict Draft-07 schema contract.');
  }

  const issued = options.issued ?? new Date().toISOString();
  const signer = createSign('RSA-SHA256');
  signer.update(canonicalizeHeartPolicy(policy), 'utf8');
  signer.end();

  return {
    policy,
    metadata: {
      $comment: options.comment ?? HEART_POLICY_COMMENT,
      signature: signer.sign(privateKey, 'base64'),
      issued,
      verified: false,
      issuer: options.issuer ?? policy.authority,
      version: options.version ?? '1.0.0',
      algorithm: 'RSA-SHA256',
    },
  };
}

export function verifyHeartPolicy(
  envelope: HeartPolicyEnvelope,
  publicKey: KeyLike,
): HeartPolicyEnvelope {
  if (!validateHeartPolicy(envelope.policy)) {
    return {
      ...envelope,
      metadata: { ...envelope.metadata, verified: false },
    };
  }

  const verifier = createVerify(envelope.metadata.algorithm);
  verifier.update(canonicalizeHeartPolicy(envelope.policy), 'utf8');
  verifier.end();

  const verified = verifier.verify(publicKey, envelope.metadata.signature, 'base64');

  return {
    ...envelope,
    metadata: { ...envelope.metadata, verified },
  };
}
