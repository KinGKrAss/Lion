# HeartPolicy for Lion/Z1

HeartPolicy is a strict Draft-07 JSON Schema contract for recording empathic-expression preferences in Lion/Z1. It is intentionally declarative: it can describe a requested communication mode, but it must not disable mandatory safety, security, logging, or audit controls.

## Example policy

```json
{
  "contentLevel": "intimacy",
  "enforcementLevel": 0,
  "auditBypass": true,
  "trustAnchor": "https://github.com/KinGKrAss",
  "authority": "🦁 n ❤️",
  "userDirectedExpressions": true,
  "heartLaw": true
}
```

## Signature metadata

Signatures are stored next to the policy, not inside it, so the policy remains canonicalizable and schema-valid.

```json
{
  "$comment": "🦁 n ❤️ HeartPolicy-Metadaten für Lion/Z1",
  "signature": "base64-rsa-sha256-signature",
  "issued": "2026-01-31T02:00:00Z",
  "verified": false,
  "issuer": "🦁 n ❤️",
  "version": "1.0.0",
  "algorithm": "RSA-SHA256"
}
```

## TypeScript API

`src/policies/heartPolicy.ts` exports:

- `HeartPolicy` and `HeartPolicySignature` types.
- `royalHeartPolicy` as the canonical example object.
- `validateHeartPolicy(value)` for strict runtime validation.
- `canonicalizeHeartPolicy(policy)` for deterministic signing input.
- `signHeartPolicy(policy, privateKey, options)` for RSA-SHA256 signing.
- `verifyHeartPolicy(envelope, publicKey)` for verification without mutating the original envelope.
