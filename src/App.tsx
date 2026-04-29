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
import { Sparkles, Crown } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<Message[]>([]);

  const startSetup = () => setState('setup');
  
  const startChat = (lang: Language, scene: Scenario) => {
    setSelectedLanguage(lang);
    setSelectedScenario(scene);
    setMessages([{
      id: 'initial',
      role: 'assistant',
      content: scene.initialMessage,
      timestamp: Date.now()
    }]);
    setState('chat');
  };

  const resetApp = () => {
    setState('landing');
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-royal-black text-slate-100 selection:bg-gold-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-900/10 blur-[120px] rounded-full" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-royal-black/50 backdrop-blur-md border-b border-white/5">
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

        <div className="flex items-center gap-4">
          {state === 'chat' && (
            <button 
              onClick={() => setState('setup')}
              className="px-4 py-2 rounded-full border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors"
            >
              Change Scenario
            </button>
          )}
          <div className="hidden md:flex items-center gap-1 text-[10px] uppercase tracking-widest opacity-40">
            <Sparkles className="w-3 h-3" />
            <span>AI Powered Mastery</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20 h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {state === 'landing' && (
            <LandingPage key="landing" onStart={startSetup} />
          )}
          {state === 'setup' && (
            <SetupPanel 
              key="setup" 
              languages={LANGUAGES} 
              scenarios={SCENARIOS} 
              onComplete={startChat} 
            />
          )}
          {state === 'chat' && (
            <ChatInterface 
              key="chat"
              language={selectedLanguage}
              scenario={selectedScenario}
              initialMessages={messages}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-4 left-0 right-0 text-center pointer-events-none z-50">
        <p className="text-[9px] uppercase tracking-[0.3em] font-medium opacity-30">
          © 2026 Royal KrAss Group • Digital Sovereignty
        </p>
      </footer>
    </div>
  );
}

