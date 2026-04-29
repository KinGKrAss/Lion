/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  voiceCode: string; // For browser TTS
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
  systemPrompt: string;
  icon: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  originalText?: string; 
  correction?: string;
  explanation?: string;
  translation?: string;
}

export type AppState = 'landing'| 'setup' | 'chat';
