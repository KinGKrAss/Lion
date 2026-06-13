/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, Language, Scenario, Message } from './types';
import { LANGUAGES, SCENARIOS } from './constants';
import LandingPage from './components/LandingPage';
import SetupPanel from './components/SetupPanel';
import ChatInterface from './components/ChatInterface';
import TodoApp from './components/TodoApp';
import { Sparkles, Crown, CheckCircle2, LanguagesIcon } from 'lucide-react';

export type AppMode = 'landing' | 'setup' | 'chat' | 'todos';

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  const startSetup = () => setMode('setup');
  
  const startChat = (lang: Language, scene: Scenario) => {
    setSelectedLanguage(lang);
    setSelectedScenario(scene);
    setMessages([{
      id: 'initial',
      role: 'assistant',
      content: scene.initialMessage,
      timestamp: Date.now()
    }]);
    setMode('chat');
  };

  const resetApp = () => {
    setMode('landing');
    setMessages([]);
  };

  const navItems: Array<{ mode: AppMode; label: string; icon: React.ReactNode }> = [
    { mode: 'landing', label: 'LingoLion', icon: <Crown className="w-5 h-5" /> },
    { mode: 'chat', label: 'Lernen', icon: <LanguagesIcon className="w-5 h-5" /> },
    { mode: 'todos', label: 'Aufgaben', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-royal-black text-slate-100 selection:bg-gold-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-royal-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20">
              <Crown className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Lingo<span className="gold-text-gradient">Lion</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">Royal Language Partner</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1">
            {navItems.map(item => (
              <button
                key={item.mode}
                onClick={() => item.mode === 'landing' ? resetApp() : setMode(item.mode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  mode === item.mode
                    ? 'gold-gradient text-black shadow-lg shadow-gold-500/30'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {mode === 'chat' && (
              <button 
                onClick={() => setMode('setup')}
                className="px-3 py-2 rounded-full border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors"
              >
                Ändern
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-40">
              <Sparkles className="w-3 h-3" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 px-2 py-3 bg-royal-black/80 backdrop-blur-md border-t border-white/5">
        <div className="flex justify-around">
          {navItems.map(item => (
            <button
              key={item.mode}
              onClick={() => item.mode === 'landing' ? resetApp() : setMode(item.mode)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                mode === item.mode
                  ? 'text-gold-400'
                  : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-24 md:pb-20 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {mode === 'landing' && (
            <LandingPage key="landing" onStart={startSetup} />
          )}
          {mode === 'setup' && (
            <SetupPanel 
              key="setup" 
              languages={LANGUAGES} 
              scenarios={SCENARIOS} 
              onComplete={startChat} 
            />
          )}
          {mode === 'chat' && (
            <ChatInterface 
              key="chat"
              language={selectedLanguage}
              scenario={selectedScenario}
              initialMessages={messages}
            />
          )}
          {mode === 'todos' && (
            <TodoApp key="todos" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-24 md:bottom-4 left-0 right-0 text-center pointer-events-none z-40">
        <p className="text-[9px] uppercase tracking-[0.3em] font-medium opacity-30">
          © 2026 Royal KrAss Group • Digital Sovereignty
        </p>
      </footer>
    </div>
  );
}
