/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Crown, Zap, Globe, Users, BookOpen, Target } from 'lucide-react';

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
      <section className="min-h-screen flex flex-col justify-center px-6 py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-gold-400" />
            <span className="text-sm uppercase tracking-widest font-semibold text-gold-400">Language Mastery</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Master Any Language with
            <span className="gold-text-gradient block mt-2">Royal Precision</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-8">
            LingoLion combines AI-powered language learning with immersive scenarios. Learn Spanish, French, German, and more through real-world conversations with advanced AI tutors.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-full gold-gradient text-black font-bold text-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Start Learning →
          </button>
          <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors">
            Learn More
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-20"
        >
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">7+</p>
            <p className="text-sm text-slate-300">Languages</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">4+</p>
            <p className="text-sm text-slate-300">Scenarios</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-gold-400">AI</p>
            <p className="text-sm text-slate-300">Powered</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-serif font-bold mb-12 text-center"
        >
          Why Choose LingoLion?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'AI-Powered',
              desc: 'Advanced language AI that adapts to your level and learning style.',
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Real Scenarios',
              desc: 'Learn through immersive, real-world conversation scenarios.',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Expert Feedback',
              desc: 'Get instant corrections and explanations from your AI tutor.',
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              title: 'Structured Learning',
              desc: 'Follow a guided path from beginner to advanced proficiency.',
            },
            {
              icon: <Target className="w-6 h-6" />,
              title: 'Goal Tracking',
              desc: 'Monitor your progress and celebrate your milestones.',
            },
            {
              icon: <Crown className="w-6 h-6" />,
              title: 'Premium Quality',
              desc: 'Experience the royal treatment in language learning.',
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
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Master a Language?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Choose your language, pick a scenario, and start conversing with our AI tutor today.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-full gold-gradient text-black font-bold text-lg hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Journey →
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
}