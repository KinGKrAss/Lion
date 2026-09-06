/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Crown, Zap, Landmark, WalletCards, Wind, FileText, BrainCircuit } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-auto"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-gold-400" />
            <span className="text-sm uppercase tracking-widest font-semibold text-gold-400">Lion Core</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Organize Every Project with
            <span className="gold-text-gradient block mt-2">Royal Precision</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            Lion/Z1 ist das zentrale Betriebssystem für Projektorganisation, Analyse und Entscheidungen – mit Modulen für Core, Immobilien, Finanzen, Energie, Diplomatie und ZOE AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto min-h-12 px-8 py-4 rounded-full gold-gradient text-black font-bold text-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Lion/Z1 starten →
          </button>
          <button
            type="button"
            onClick={onStart}
            className="w-full sm:w-auto min-h-12 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors"
          >
            Module ansehen
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
        >
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">6</p>
            <p className="text-sm text-slate-300">Module</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">Z1</p>
            <p className="text-sm text-slate-300">Core</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">ZOE</p>
            <p className="text-sm text-slate-300">AI</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl sm:text-4xl font-serif font-bold mb-12 text-center"
        >
          Lion/Z1 Module
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'CORE',
              desc: 'Benutzer, Rollen, Einstellungen, Sicherheit und Systemstatus.',
            },
            {
              icon: <Landmark className="w-6 h-6" />,
              title: 'GAIA',
              desc: 'Immobilien, Grundstücke, Mietverträge, Projekte und Karten.',
            },
            {
              icon: <WalletCards className="w-6 h-6" />,
              title: 'FORTUNA',
              desc: 'Einnahmen, Ausgaben, Cashflow, Vermögensübersicht und Berichte.',
            },
            {
              icon: <Wind className="w-6 h-6" />,
              title: 'ELECTRA',
              desc: 'Windparks, Solaranlagen, Energieproduktion und CO₂-Auswertungen.',
            },
            {
              icon: <FileText className="w-6 h-6" />,
              title: 'DIPLOMATIE',
              desc: 'Dokumente, Verträge, Kontakte und Termine.',
            },
            {
              icon: <BrainCircuit className="w-6 h-6" />,
              title: 'ZOE AI',
              desc: 'Analysen, Zusammenfassungen, Automatisierungen und strategische Vorschläge.',
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="text-gold-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
            Bereit für Lion/Z1?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Wähle ein Modul und starte mit strukturierter Analyse im verbindlichen Z1-Ausgabeformat.
          </p>
          <button
            onClick={onStart}
            className="w-full sm:w-auto min-h-12 px-8 py-4 rounded-full gold-gradient text-black font-bold text-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 transform hover:scale-105"
          >
            System öffnen →
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
}