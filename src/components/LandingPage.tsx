import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe2, ShieldCheck, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  key?: string;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-48 h-48 md:w-64 md:h-64 mb-10 relative"
      >
        <div className="absolute inset-0 gold-gradient blur-[60px] opacity-20 animate-pulse" />
        <img 
          src="/src/assets/images/lingo_lion_mascot_1777489292409.png" 
          alt="Lingo Lion Mascot" 
          className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="text-center max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            The Pinnacle of AI Learning
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[0.9]">
            Speak with <span className="gold-text-gradient italic">Authority.</span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-lg md:text-xl font-light leading-relaxed px-4"
        >
          Master any language through immersion with Leo, your elite conversational partner.
          Experience a royal standard of real-time practice.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 rounded-full gold-gradient text-white font-bold text-lg shadow-xl shadow-gold-500/30 hover:scale-105 transition-transform overflow-hidden"
          >
            <div className="flex items-center gap-2 relative z-10">
              Begin Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-3xl mx-auto opacity-50"
        >
          <Feature icon={<Globe2 className="w-5 h-5" />} label="7+ Languages" />
          <Feature icon={<Zap className="w-5 h-5" />} label="Real-time AI" />
          <Feature icon={<ShieldCheck className="w-5 h-5" />} label="Private & Secure" />
          <Feature icon={<Globe2 className="w-5 h-5" />} label="Global Standards" />
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-gold-400">{icon}</div>
      <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
    </div>
  );
}
