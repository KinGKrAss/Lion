import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language, Scenario } from '../types';
import { Globe, BookOpen, Coffee, Hotel, Briefcase, MessageSquare, Check, Sparkles } from 'lucide-react';

interface SetupPanelProps {
  languages: Language[];
  scenarios: Scenario[];
  onComplete: (lang: Language, scene: Scenario) => void;
  key?: string;
}

const ICON_MAP: Record<string, any> = {
  Coffee,
  Hotel,
  Briefcase,
  MessageSquare
};

export default function SetupPanel({ languages, scenarios, onComplete }: SetupPanelProps) {
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const [selectedScene, setSelectedScene] = useState<Scenario>(scenarios[0]);

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-white mb-2 underline decoration-gold-500/30 underline-offset-8">Configure Your Experience</h2>
        <p className="text-slate-400 font-light">Select your target language and desired roleplay environment.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 w-full">
        {/* Languages */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gold-500" />
            <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-gold-500/80">Target Language</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang)}
                className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group ${
                  selectedLang.id === lang.id 
                    ? 'bg-gold-500/10 border-gold-500/50 ring-1 ring-gold-500/50' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-bold text-white group-hover:text-gold-400 transition-colors">{lang.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{lang.nativeName}</p>
                </div>
                {selectedLang.id === lang.id && (
                  <motion.div layoutId="lang-check" className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Check className="w-5 h-5 text-gold-500" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-gold-500" />
            <h3 className="uppercase tracking-[0.2em] text-xs font-bold text-gold-500/80">Conversation Scenario</h3>
          </div>
          <div className="space-y-3">
            {scenarios.map((scene) => {
              const Icon = ICON_MAP[scene.icon] || MessageSquare;
              return (
                <button
                  key={scene.id}
                  onClick={() => setSelectedScene(scene)}
                  className={`w-full relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${
                    selectedScene.id === scene.id 
                      ? 'bg-gold-500/10 border-gold-500/50 ring-1 ring-gold-500/50' 
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selectedScene.id === scene.id ? 'bg-gold-500 text-white' : 'bg-white/5 text-slate-400 group-hover:text-gold-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{scene.title}</p>
                    <p className="text-xs text-slate-500 font-light line-clamp-1">{scene.description}</p>
                  </div>
                  {selectedScene.id === scene.id && (
                    <motion.div layoutId="scene-check" className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Check className="w-5 h-5 text-gold-500" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-16 w-full max-w-md"
      >
        <button
          onClick={() => onComplete(selectedLang, selectedScene)}
          className="w-full flex items-center justify-center gap-2 py-5 rounded-full gold-gradient text-white font-bold text-xl shadow-2xl shadow-gold-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          Commence Mastery
        </button>
      </motion.div>
    </div>
  );
}
