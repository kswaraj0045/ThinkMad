import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  RefreshCw, 
  Smile, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { BrainMascot } from '../mascot/BrainMascot';
import { useApp } from '../../context/AppContext';
import { getRandomQuote } from '../../data/quotesData';
import { sounds } from '../../utils/sound';

export const HomeDashboard: React.FC = () => {
  const { setCurrentTab, openEmergency, dramaLevel } = useApp();
  const [quote, setQuote] = useState(() => getRandomQuote());
  const [isQuoteRefreshing, setIsQuoteRefreshing] = useState(false);

  const handleRefreshQuote = () => {
    sounds.playPop();
    setIsQuoteRefreshing(true);
    setQuote(getRandomQuote());
    setTimeout(() => setIsQuoteRefreshing(false), 300);
  };

  return (
    <div className="space-y-6 pb-6">
      
      {/* Welcome Hero Banner with Animated Mascot */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-3xl p-5 md:p-7 relative overflow-hidden border border-white/70 shadow-soft"
      >
        {/* Soft pastel decorative gradient circles */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-pastel-pink/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pastel-purple/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          
          {/* Animated Brain Mascot */}
          <div className="shrink-0">
            <BrainMascot mood={dramaLevel > 70 ? 'overthinking' : 'happy'} size="md" />
          </div>

          {/* Welcome Text */}
          <div className="flex-1 text-center md:text-left space-y-2">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-pink/80 border border-pastel-pink-deep/30 text-pastel-pink-deep text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rutuja's Mental Wellness HQ</span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight font-display">
              Welcome back, Rutuja! 💗
            </h1>

            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-lg">
              Your brain has <span className="font-extrabold text-pastel-purple-accent underline decoration-pastel-pink-deep decoration-2">47 tabs open</span>. Let's close a few.
            </p>

            {/* Required prominent Fix My Brain button */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={openEmergency}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-sm md:text-base shadow-glow-pink flex items-center gap-2 group transition-shadow"
              >
                <span>FIX MY BRAIN 😂</span>
                <span className="text-lg group-hover:rotate-12 transition-transform">🚨</span>
              </motion.button>

              <button
                onClick={() => setCurrentTab('letter')}
                className="px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-pastel-pink/40 border border-pastel-purple/30 text-slate-700 text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Swaraj's Note</span>
              </button>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Brain Status & Meters Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        
        {/* Status Card 1 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card-lavender rounded-2xl p-3.5 border border-pastel-purple/40 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-pastel-purple-accent">
            <span className="text-[11px] font-black uppercase tracking-wider">Brain Status</span>
            <Layers className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <p className="text-xs md:text-sm font-black text-slate-800 leading-tight">
              TOO MANY TABS OPEN
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              47 background processes
            </p>
          </div>
        </motion.div>

        {/* Status Card 2 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card-pink rounded-2xl p-3.5 border border-pastel-pink-deep/30 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-pastel-pink-deep">
            <span className="text-[11px] font-black uppercase tracking-wider">Current Mood</span>
            <Smile className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <p className="text-xs md:text-sm font-black text-slate-800 leading-tight">
              DRAMATIC BUT CUTE
            </p>
            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
              Bollywood level: 85%
            </p>
          </div>
        </motion.div>

        {/* Status Card 3 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card-lavender rounded-2xl p-3.5 border border-pastel-purple/40 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-indigo-500">
            <span className="text-[11px] font-black uppercase tracking-wider">Peace Level</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <p className="text-xs md:text-sm font-black text-slate-800 leading-tight">
              LOADING...
            </p>
            <div className="w-full bg-slate-200/70 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <motion.div
                animate={{ width: ['20%', '65%', '40%', '80%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Status Card 4 */}
        <motion.div
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-3.5 border border-slate-200 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-black uppercase tracking-wider">System Status</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <p className="text-xs md:text-sm font-black text-slate-800 leading-tight flex items-center gap-1">
              <span>SURVIVING</span>
              <span>✨</span>
            </p>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
              Swaraj firewall active
            </p>
          </div>
        </motion.div>

      </section>

      {/* Random Funny Motivational Quote Card */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="bg-white/90 rounded-3xl p-4 md:p-5 border border-pastel-lavender/70 shadow-soft relative overflow-hidden"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-pastel-purple-accent">
            <span className="text-lg">💡</span>
            <h3 className="text-xs font-black uppercase tracking-wider">
              Random Anti-Overthinking Thought
            </h3>
          </div>
          <button
            onClick={handleRefreshQuote}
            className={`p-1.5 rounded-full hover:bg-pastel-lavender/50 text-slate-400 hover:text-pastel-purple-accent transition-all ${
              isQuoteRefreshing ? 'rotate-180' : ''
            }`}
            title="Give me another quote"
            aria-label="New quote"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm md:text-base font-bold text-slate-700 italic mt-2.5 leading-relaxed">
          "{quote}"
        </p>
      </motion.section>

      {/* Quick Access Control Centre Hub */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base md:text-lg font-black text-slate-800 font-display flex items-center gap-2">
            <span>Control Centre Modules</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pastel-pink text-pastel-pink-deep font-bold">
              6 Online
            </span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">Select a tool</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          
          {/* Module 1: Simulator */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab('simulator')}
            className="p-4 rounded-3xl bg-white border border-pastel-lavender/70 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🧠
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-slate-800 font-display">
                Overthinking Simulator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Turn a 2-second event into a 3-season Netflix drama.
              </p>
            </div>
          </motion.button>

          {/* Module 2: FBI Feelings Bureau */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab('fbi')}
            className="p-4 rounded-3xl bg-white border border-pastel-lavender/70 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🕵️‍♀️
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-slate-800 font-display">
                FBI Feelings Bureau
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Full forensic investigation for suspicious punctuation.
              </p>
            </div>
          </motion.button>

          {/* Module 3: Great Oracle */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab('oracle')}
            className="p-4 rounded-3xl bg-white border border-pastel-lavender/70 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🔮
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-slate-800 font-display">
                The Great Oracle
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Ask the universe. Get wholesome & funny predictions.
              </p>
            </div>
          </motion.button>

          {/* Module 4: Brain Diagnostics */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab('diagnostics')}
            className="p-4 rounded-3xl bg-white border border-pastel-lavender/70 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                💻
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-slate-800 font-display">
                Brain.exe Diagnostics
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Check RAM usage & try to install Peace of Mind.
              </p>
            </div>
          </motion.button>

          {/* Module 5: Emergency Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={openEmergency}
            className="p-4 rounded-3xl bg-red-50/80 border border-red-200/80 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🚨
              </div>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-red-700 font-display">
                Emergency Overthinking
              </h3>
              <p className="text-xs text-red-600/80 mt-0.5 leading-relaxed">
                Immediate 5-second countdown & calming protocol.
              </p>
            </div>
          </motion.button>

          {/* Module 6: Secret Letter */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentTab('letter')}
            className="p-4 rounded-3xl bg-pastel-pink/40 border border-pastel-pink-deep/30 shadow-soft hover:shadow-soft-lg text-left transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white text-pink-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm">
                💌
              </div>
              <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-extrabold text-slate-800 font-display">
                Secret Note from Swaraj
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                A warm personal reminder whenever you need it. ❤️
              </p>
            </div>
          </motion.button>

        </div>
      </section>

    </div>
  );
};
