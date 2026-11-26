import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Heart, X } from 'lucide-react';
import { getRandomSmileMessage } from '../../data/smileMessages';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration, triggerHeartConfetti } from '../../utils/confetti';

export const FloatingSmileBox: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleCatchBox = () => {
    sounds.playPop();
    const nextMsg = getRandomSmileMessage();
    setMessage(nextMsg);
    setIsOpen(true);

    sounds.playCelebration();
    triggerHeartConfetti();
    unlockBadge('badge-gift-opened');
    addToast('You Caught It! 🎁', 'A smile has been deposited into your mental account.', 'love');
  };

  const handleCatchAnother = () => {
    sounds.playPop();
    const nextMsg = getRandomSmileMessage();
    setMessage(nextMsg);
    sounds.playChime();
    triggerPastelCelebration();
  };

  return (
    <>
      {/* Floating Interactive Element on Homescreen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-30 select-none"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            y: [0, -9, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          onClick={handleCatchBox}
          className="flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-gradient-to-r from-pastel-pink-deep via-[#FF758F] to-[#FF85A1] text-white shadow-soft-lg border-2 border-white/80 group cursor-pointer"
          title="Catch me if you want to smile 🎁"
        >
          {/* Bouncing Gift Icon */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg shadow-inner group-hover:rotate-12 transition-transform">
            🎁
          </div>

          <div className="text-left">
            <span className="block text-xs font-black tracking-tight leading-tight font-display drop-shadow-sm">
              Catch me if you want to smile
            </span>
            <span className="block text-[10px] text-pink-100 font-semibold leading-none">
              Tap to unwrap surprise ✨
            </span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse shrink-0" />
        </motion.button>
      </motion.div>

      {/* Surprise Modal Dialog when caught */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 15 }}
              className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 md:p-7 shadow-2xl border-2 border-pastel-pink text-center space-y-4 overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative top icon */}
              <div className="w-16 h-16 rounded-full bg-pastel-pink text-pastel-pink-deep flex items-center justify-center mx-auto text-3xl shadow-sm border border-pastel-pink-deep/20 animate-bounce">
                🎁
              </div>

              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-pastel-pink/70 text-pastel-pink-deep text-[10px] font-black uppercase tracking-wider">
                  Caught you! 💗
                </span>
                <h3 className="text-lg md:text-xl font-black text-slate-800 font-display">
                  Catch Me If You Want to Smile
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Here is your floating care package for today:
                </p>
              </div>

              {/* Message Box */}
              <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#FFF5F7] via-[#FFF9FA] to-[#F5F2FB] border border-pastel-pink shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase text-pastel-pink-deep tracking-wider flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 fill-pastel-pink-deep" />
                  <span>Personal Smile Note</span>
                </span>
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed font-display">
                  "{message}"
                </p>
              </div>

              {/* Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={handleCatchAnother}
                  className="px-5 py-2.5 rounded-xl bg-pastel-pink-deep hover:bg-rose-600 text-white font-extrabold text-xs transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Catch Another Surprise 🎁</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all active:scale-95"
                >
                  I'm Smiling Now ✨
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
