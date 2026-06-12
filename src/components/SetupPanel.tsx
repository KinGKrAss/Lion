/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language, Scenario } from '../types';
import { ChevronRight } from 'lucide-react';

interface SetupPanelProps {
  languages: Language[];
  scenarios: Scenario[];
  onComplete: (language: Language, scenario: Scenario) => void;
}

export default function SetupPanel({ languages, scenarios, onComplete }: SetupPanelProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
  const [step, setStep] = useState<'language' | 'scenario'>('language');

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setStep('scenario');
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    onComplete(selectedLanguage, scenario);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-auto flex flex-col justify-center px-6 py-20"
    >
      <div className="max-w-2xl mx-auto w-full">
        {step === 'language' ? (
          <motion.div
            key="language"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-2">Choose Your Language</h2>
            <p className="text-slate-400 mb-8">Select the language you want to learn</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    selectedLanguage.id === lang.id
                      ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="text-sm font-semibold">{lang.nativeName}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('scenario')}
              className="w-full px-6 py-3 rounded-full gold-gradient text-black font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-500/50 transition-all"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="scenario"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <button
              onClick={() => setStep('language')}
              className="text-slate-400 hover:text-slate-300 text-sm mb-4 flex items-center gap-1"
            >
              ← Back
            </button>

            <h2 className="text-4xl font-serif font-bold mb-2">Choose Your Scenario</h2>
            <p className="text-slate-400 mb-8">
              Learning {selectedLanguage.nativeName} - Select a practice scenario
            </p>

            <div className="space-y-3 mb-8">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedScenario.id === scenario.id
                      ? 'border-gold-400 bg-gold-400/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{scenario.title}</h3>
                      <p className="text-sm text-slate-400">{scenario.description}</p>
                    </div>
                    <span className="text-2xl ml-4">{scenario.icon}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => handleScenarioSelect(selectedScenario)}
              className="w-full px-6 py-3 rounded-full gold-gradient text-black font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold-500/50 transition-all"
            >
              Start Learning <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}