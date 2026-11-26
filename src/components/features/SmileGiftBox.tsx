import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, RefreshCw, Heart } from 'lucide-react';
import { getRandomSmileMessage } from '../../data/smileMessages';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration, triggerHeartConfetti } from '../../utils/confetti';

export const SmileGiftBox: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenBox = () => {
    sounds.playPop();
    setIsOpening(true);

    setTimeout(() => {
      setMessage(getRandomSmileMessage());
      setIsOpen(true);
      setIsOpening(false);
      sounds.playCelebration();
      triggerHeartConfetti();
      unlockBadge('badge-gift-opened');
      addToast('Gift Unwrapped! 🎁', 'A smile has been deposited into your mental account.', 'love');
    }, 600);
  };

  const handleOpenAnother = () => {
    sounds.playPop();
    setIsOpening(true);
    setIsOpen(false);

    setTimeout(() => {
      setMessage(getRandomSmileMessage());
      setIsOpen(true);
      setIsOpening(false);
      sounds.playChime();
      triggerPastelCelebration();
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-pink/70 border border-pastel-pink-deep/20 text-pastel-pink-deep text-[11px] font-black uppercase tracking-wider">
          <Gift className="w-3 h-3" />
          <span>Surprise Delivery 🎁</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
          Open When You Need a Smile
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          A little digital care package whenever your brain gets too loud.
        </p>
      </div>

      {/* Gift Box Container */}
      <div className="bg-white/90 rounded-3xl p-6 md:p-8 border border-pastel-lavender/80 shadow-soft text-center space-y-5">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED GIFT BOX */
            <motion.div
              key="closed-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="py-4 flex flex-col items-center space-y-4"
            >
              {/* Animated Gift Box Graphic */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
                whileTap={{ scale: 0.94 }}
                onClick={handleOpenBox}
                animate={isOpening ? { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] } : { y: [0, -5, 0] }}
                transition={
                  isOpening
                    ? { duration: 0.5, repeat: Infinity }
                    : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }
                className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-tr from-pastel-pink-deep via-[#FF85A1] to-[#FFA8BA] rounded-3xl shadow-glow-pink cursor-pointer relative flex items-center justify-center border-2 border-white group select-none"
              >
                {/* Horizontal & Vertical Gold Ribbons */}
                <div className="absolute inset-y-0 w-5 bg-gradient-to-b from-amber-200 to-amber-400 shadow-sm" />
                <div className="absolute inset-x-0 h-5 bg-gradient-to-r from-amber-200 to-amber-400 shadow-sm" />

                {/* Ribbon Bow on top */}
                <div className="absolute -top-3 w-10 h-7 flex justify-center items-center z-10">
                  <div className="w-5 h-5 rounded-full border-2 border-amber-300 bg-amber-400 rotate-45 shadow-sm" />
                </div>

                <Sparkles className="w-6 h-6 text-white relative z-20 animate-pulse" />
              </motion.div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Special Delivery for Rutuja
                </p>
                <h3 className="text-sm md:text-base font-extrabold text-slate-700">
                  Tap the box to open your surprise!
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenBox}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-xs md:text-sm shadow-soft hover:shadow-glow-pink transition-all"
              >
                Open Gift Box 🎁
              </motion.button>
            </motion.div>
          ) : (
            /* OPENED SURPRISE REVEAL */
            <motion.div
              key="opened-box"
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88 }}
              className="py-2 space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-pastel-pink text-pastel-pink-deep flex items-center justify-center mx-auto text-2xl shadow-sm">
                💖
              </div>

              <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-[#FFF5F7] to-[#F5F2FB] border border-pastel-pink shadow-sm space-y-2">
                <span className="text-[10px] font-black uppercase text-pastel-pink-deep tracking-wider flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 fill-pastel-pink-deep" />
                  <span>A Little Note For You</span>
                </span>
                <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed font-display">
                  "{message}"
                </p>
              </div>

              {/* Action: Open another */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={handleOpenAnother}
                  className="px-5 py-2.5 rounded-2xl bg-pastel-lavender hover:bg-pastel-purple/40 text-pastel-purple-accent font-extrabold text-xs md:text-sm transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Open Another Surprise 🎁</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
