import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  Cpu, 
  Gift, 
  Heart, 
  Mail
} from 'lucide-react';
import { BrainMascot } from '../mascot/BrainMascot';
import { SecretLetter } from './SecretLetter';
import { useApp } from '../../context/AppContext';

export const HomeDashboard: React.FC = () => {
  const { setCurrentTab, openEmergency } = useApp();

  return (
    <div className="space-y-6 pb-6 max-w-2xl mx-auto">
      
      {/* Top Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 rounded-3xl p-5 md:p-6 border border-pastel-lavender/60 shadow-soft text-center sm:text-left relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          {/* Brain Mascot (compact, clean) */}
          <div className="shrink-0">
            <BrainMascot size="sm" showSpeechBubble={false} />
          </div>

          {/* Welcome Text */}
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-extrabold text-xs tracking-wider text-pastel-purple-accent uppercase font-display">
                RUTUJA.EXE
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pastel-pink text-pastel-pink-deep border border-pastel-pink-deep/20">
                Control Centre
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
              Welcome back, Rutuja! 💗
            </h1>

            <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
              Your brain has <span className="font-bold text-slate-700">47 tabs open</span>. Let's close a few.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Secret Letter From Swaraj (Embedded right below welcome section) */}
      <section className="bg-white/80 rounded-3xl p-5 md:p-6 border border-pastel-pink/50 shadow-soft">
        <SecretLetter embedded={true} />
      </section>

      {/* Main Section - Exactly 3 Prominent Feature Cards */}
      <section className="space-y-3.5">
        
        {/* Card 1: Overthinking Simulator */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-3xl p-5 border border-pastel-lavender/80 shadow-soft transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0 border border-amber-100">
                🧠
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800 font-display">
                  Overthinking Simulator
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                  Turn a 2-second event into an unnecessary 3-season drama.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-600/80">
              Bollywood level: Unlimited 🎬
            </span>
            <button
              onClick={() => setCurrentTab('simulator')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>Simulate Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Card 2: Mood of the Day */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white rounded-3xl p-5 border border-pastel-pink/50 shadow-soft transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl shrink-0 border border-pink-100">
                🌸
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800 font-display">
                  Mood of the Day
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                  How are you feeling right now? Pick an emoji for custom comfort.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm select-none">
              <span>😊</span>
              <span>😴</span>
              <span>🥺</span>
              <span>🤩</span>
              <span>😵‍💫</span>
              <span>🎭</span>
            </div>
            <button
              onClick={() => setCurrentTab('mood')}
              className="px-4 py-2 rounded-xl bg-pastel-pink-deep hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>Log Mood</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Card 3: Emergency Overthinking Button */}
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-gradient-to-r from-red-50/90 to-rose-50/90 rounded-3xl p-5 border border-red-200/70 shadow-soft transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0 border border-red-200">
                🚨
              </div>
              <div>
                <h2 className="text-base font-extrabold text-red-900 font-display">
                  Emergency Overthinking Button
                </h2>
                <p className="text-xs text-red-700/80 font-medium mt-0.5 line-clamp-1">
                  Immediate 5-second countdown & calming panic neutralizer.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-red-200/50 flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Instant relief mode</span>
            </span>
            <button
              onClick={openEmergency}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <span>I Am Overthinking 🚨</span>
            </button>
          </div>
        </motion.div>

      </section>

      {/* EXPLORE MORE ✨ Section (Smaller cards for remaining features) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pastel-purple-accent" />
            <span>EXPLORE MORE ✨</span>
          </h2>
          <button
            onClick={() => setCurrentTab('explore')}
            className="text-xs font-bold text-pastel-purple-accent hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Sub-card 1: Brain.exe Diagnostics */}
          <button
            onClick={() => setCurrentTab('diagnostics')}
            className="p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm text-left transition-all active:scale-95 flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-sm border border-sky-100 mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                Brain.exe Diagnostics
              </h3>
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                Install peace of mind
              </p>
            </div>
          </button>

          {/* Sub-card 2: Open When You Need a Smile */}
          <button
            onClick={() => setCurrentTab('gift')}
            className="p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm text-left transition-all active:scale-95 flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-sm border border-pink-100 mb-2">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                Need a Smile?
              </h3>
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                Open surprise gift box
              </p>
            </div>
          </button>

          {/* Sub-card 3: Random Compliment Machine */}
          <button
            onClick={() => setCurrentTab('compliment')}
            className="p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm text-left transition-all active:scale-95 flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-sm border border-rose-100 mb-2">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                Compliment Machine
              </h3>
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                Instant sweet words
              </p>
            </div>
          </button>

          {/* Sub-card 4: Secret Letter from Swaraj */}
          <button
            onClick={() => setCurrentTab('letter')}
            className="p-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm text-left transition-all active:scale-95 flex flex-col justify-between group"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm border border-purple-100 mb-2">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800 line-clamp-1">
                Swaraj's Letter
              </h3>
              <p className="text-[11px] text-slate-400 font-medium line-clamp-1 mt-0.5">
                Personal digital gift ❤️
              </p>
            </div>
          </button>

        </div>
      </section>

    </div>
  );
};
