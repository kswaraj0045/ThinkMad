import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, Moon } from 'lucide-react';
import { sounds } from '../../utils/sound';

interface ShutdownScreenProps {
  onRestart: () => void;
}

export const ShutdownScreen: React.FC<ShutdownScreenProps> = ({ onRestart }) => {
  const handleWakeUp = () => {
    sounds.playPop();
    onRestart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#161224] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      
      {/* Background glowing stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-900/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-sm w-full space-y-6"
      >
        {/* Animated Sleeping Brain */}
        <div className="relative inline-block">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-28 h-28 rounded-full bg-purple-950/80 border-2 border-purple-500/40 flex items-center justify-center mx-auto text-5xl shadow-[0_0_40px_rgba(168,85,247,0.3)]"
          >
            😴
          </motion.div>
          
          {/* Floating ZZZ */}
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [-5, -25], x: [0, 10] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 right-2 text-xl font-mono font-bold text-purple-300"
          >
            z
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0], y: [-10, -35], x: [5, 20] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6, ease: 'easeInOut' }}
            className="absolute -top-5 right-0 text-2xl font-mono font-bold text-pink-300"
          >
            Z
          </motion.span>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-bold">
            <Moon className="w-3.5 h-3.5" />
            <span>BRAIN.EXE SHUT DOWN</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-slate-100">
            Goodnight, Rutuja! 💤
          </h1>

          <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
            All 47 open tabs have been put to sleep. You may safely close this browser tab now.
          </p>
        </div>

        {/* Personal Message Card */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 font-semibold space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-pink-400 font-black">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            <span>Swaraj's Parting Words</span>
          </div>
          <p className="text-sm font-bold text-slate-200 italic pt-1">
            "Stop overthinking, you're Swaraj's friend! ❤️"
          </p>
        </div>

        {/* Action Button: Wake up / Re-enter */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWakeUp}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-extrabold text-sm shadow-soft flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Wake Up Brain.exe 🧠</span>
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};
