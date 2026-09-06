/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, Scenario, Message } from '../types';
import { Send, Volume2, Copy, Check } from 'lucide-react';

interface ChatInterfaceProps {
  language: Language;
  scenario: Scenario;
  initialMessages: Message[];
}

export default function ChatInterface({ language, scenario, initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);

  const offlineMessage = 'Keine Netzwerkverbindung. Prüfe die Verbindung und versuche es erneut.';

  const getResponseErrorMessage = async (response: Response, fallback: string) => {
    try {
      const payload = await response.json();
      if (typeof payload?.error === 'string' && payload.error.trim()) {
        if (payload.error.includes('API key required')) {
          return 'Chat ist aktuell nicht verfügbar: GEMINI_API_KEY fehlt auf dem Server.';
        }
        return payload.error;
      }
    } catch {
      // Ignore JSON parsing errors and use fallback below.
    }

    return fallback;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setError((currentError) => currentError === offlineMessage ? null : currentError);
    };
    const handleOffline = () => {
      setIsOffline(true);
      setError(offlineMessage);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineMessage]);

  // Initialize chat session on mount
  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch('/api/chat/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: language.id,
            scenario: scenario.id,
          }),
        });
        if (!response.ok) {
          throw new Error(await getResponseErrorMessage(response, 'Sitzung konnte nicht gestartet werden.'));
        }
        const data = await response.json();
        setSessionId(data.id);
      } catch (err) {
        const errorMessage = isOffline
          ? offlineMessage
          : err instanceof Error && err.message
            ? err.message
            : 'Sitzung konnte nicht gestartet werden. Chat ist erst nach erfolgreicher Verbindung verfügbar.';
        setError(errorMessage);
        console.error('Failed to create session:', err);
      }
    };

    initSession();
  }, [isOffline, language, offlineMessage, scenario]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    if (isOffline) {
      setError(offlineMessage);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          language: language.id,
          scenario: scenario.id,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(await getResponseErrorMessage(
          response,
          'Der Chat-Service konnte die Anfrage nicht verarbeiten.',
        ));
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg = !navigator.onLine
        ? offlineMessage
        : err instanceof Error && err.message
          ? err.message
          : 'Antwort konnte nicht geladen werden. Bitte später erneut versuchen.';
      setError(errorMsg);
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language.voiceCode;
      speechSynthesis.speak(utterance);
    } else {
      setError('Sprachausgabe wird auf diesem Gerät nicht unterstützt.');
    }
  };

  const handleCopy = async (text: string, id: string) => {
    if (!navigator.clipboard?.writeText) {
      setError('Kopieren wird auf diesem Gerät nicht unterstützt.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      setError('Kopieren fehlgeschlagen. Bitte erneut versuchen.');
      console.error('Copy error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-400 mb-1">Lion/Z1 · {language.nativeName}</p>
          <h2 className="text-2xl font-bold">{scenario.title}</h2>
          {isOffline && (
            <p className="mt-3 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
              Offline: Antworten sind erst nach erneuter Verbindung möglich.
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xl px-4 sm:px-6 py-4 rounded-xl ${
                    message.role === 'user'
                      ? 'gold-gradient text-black rounded-br-none'
                      : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/20'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => handleSpeak(message.content)}
                      className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
                      title="Listen"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="inline-flex min-h-10 min-w-10 items-center justify-center gap-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
                      title="Copy"
                    >
                      {copied === message.id ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/10 border border-white/20 rounded-xl rounded-bl-none px-6 py-4">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gold-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300"
            >
              {error}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 sm:px-6 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Nachricht an Lion/Z1 auf ${language.nativeName}...`}
              className="flex-1 min-h-12 text-base px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:border-gold-400 focus:bg-white/15 transition-colors"
              disabled={loading || isOffline}
              autoComplete="off"
              autoCapitalize="sentences"
              enterKeyHint="send"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || isOffline || !input.trim()}
              className="w-full sm:w-auto min-h-12 px-6 py-3 rounded-full gold-gradient text-black font-bold hover:shadow-lg hover:shadow-gold-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              aria-label="Nachricht senden"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}