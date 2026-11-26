import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Gift, 
  Heart, 
  Cpu, 
  Mail, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmileGiftBox } from './SmileGiftBox';
import { ComplimentMachine } from './ComplimentMachine';
import { BrainDiagnostics } from './BrainDiagnostics';
import { SecretLetter } from './SecretLetter';
import { ExtrasHub } from './ExtrasHub';

type ExploreSection = 'overview' | 'gift' | 'compliment' | 'diagnostics' | 'letter' | 'tools';

export const ExploreHub: React.FC = () => {
  const { badges } = useApp();
  const [activeSection, setActiveSection] = useState<ExploreSection>('overview');
  const unlockedCount = badges.filter((b) => b.unlockedAt !== null).length;

  if (activeSection === 'gift') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="text-xs font-bold text-pastel-purple-accent hover:underline flex items-center gap-1"
        >
          ← Back to Explore
        </button>
        <SmileGiftBox />
      </div>
    );
  }

  if (activeSection === 'compliment') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="text-xs font-bold text-pastel-purple-accent hover:underline flex items-center gap-1"
        >
          ← Back to Explore
        </button>
        <ComplimentMachine />
      </div>
    );
  }

  if (activeSection === 'diagnostics') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="text-xs font-bold text-pastel-purple-accent hover:underline flex items-center gap-1"
        >
          ← Back to Explore
        </button>
        <BrainDiagnostics />
      </div>
    );
  }

  if (activeSection === 'letter') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="text-xs font-bold text-pastel-purple-accent hover:underline flex items-center gap-1"
        >
          ← Back to Explore
        </button>
        <SecretLetter />
      </div>
    );
  }

  if (activeSection === 'tools') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="text-xs font-bold text-pastel-purple-accent hover:underline flex items-center gap-1"
        >
          ← Back to Explore
        </button>
        <ExtrasHub />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-lavender border border-pastel-purple/40 text-pastel-purple-accent text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Care & Fun Center ✨</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
          Explore More Features
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          Thoughtful surprises and wellness tools crafted especially for Rutuja.
        </p>
      </div>

      {/* Primary Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* Feature 1: Open When You Need a Smile */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setActiveSection('gift')}
          className="p-5 rounded-3xl bg-white border border-pastel-pink/50 shadow-soft cursor-pointer hover:border-pastel-pink transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center text-lg border border-pink-100">
              <Gift className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-extrabold text-slate-800 font-display">
              Open When You Need a Smile 🎁
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Virtual surprise gift box containing 20+ sweet and funny pick-me-ups.
            </p>
          </div>
        </motion.div>

        {/* Feature 2: Random Compliment Machine */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setActiveSection('compliment')}
          className="p-5 rounded-3xl bg-white border border-pastel-pink/50 shadow-soft cursor-pointer hover:border-pastel-pink transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg border border-rose-100">
              <Heart className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-extrabold text-slate-800 font-display">
              Random Compliment Machine 💗
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              One-click instant affirmations reminding you how special you are.
            </p>
          </div>
        </motion.div>

        {/* Feature 3: Brain.exe Diagnostics */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setActiveSection('diagnostics')}
          className="p-5 rounded-3xl bg-white border border-pastel-lavender/80 shadow-soft cursor-pointer hover:border-pastel-lavender-dark/40 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg border border-sky-100">
              <Cpu className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-extrabold text-slate-800 font-display">
              Brain.exe Diagnostics 💻
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Check RAM, background tabs, and install Peace of Mind.
            </p>
          </div>
        </motion.div>

        {/* Feature 4: Secret Letter from Swaraj */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setActiveSection('letter')}
          className="p-5 rounded-3xl bg-white border border-purple-100 shadow-soft cursor-pointer hover:border-purple-200 transition-all group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg border border-purple-100">
              <Mail className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-extrabold text-slate-800 font-display">
              Secret Letter from Swaraj 💌
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              A private wax-sealed note with comfort, laughs, and love.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Wellness & Fun Toolbox Banner */}
      <motion.div
        whileHover={{ y: -2 }}
        onClick={() => setActiveSection('tools')}
        className="p-5 rounded-3xl bg-gradient-to-r from-pastel-lavender/50 to-pastel-pink/40 border border-pastel-purple/30 shadow-soft cursor-pointer transition-all flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-pastel-purple-accent flex items-center justify-center text-lg shadow-sm">
            🧰
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 font-display">
              Mental Wellness Toolbox
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Drama Meter, 5-Min Peace Timer, Funny Quotes, Badges ({unlockedCount}/{badges.length})
            </p>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
      </motion.div>

    </div>
  );
};
