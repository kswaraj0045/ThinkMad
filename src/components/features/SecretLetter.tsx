import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerHeartConfetti } from '../../utils/confetti';

export const SecretLetter: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    sounds.playCelebration();
    setIsOpen(true);
    triggerHeartConfetti();
    unlockBadge('badge-swaraj-vip');
    addToast(
      "Letter Unsealed 💌",
      "Swaraj's secret message has been delivered with love!",
      "love"
    );
  };

  const handleFoldLetter = () => {
    sounds.playPop();
    setIsOpen(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Required Heading & Subtitle */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-700 text-xs font-black tracking-wide uppercase">
          <Heart className="w-3.5 h-3.5 fill-pink-500" />
          <span>Feature 07 • Personal Digital Gift</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          A LITTLE SOMETHING FOR YOU 💗
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Someone left you a message...
        </p>
      </div>

      {/* Envelope Container */}
      <div className="flex flex-col items-center justify-center py-4 select-none">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE STATE */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Interactive Envelope Graphic */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenLetter}
                className="w-72 h-48 md:w-80 md:h-52 bg-gradient-to-tr from-[#FFE5EC] via-[#FFF0F3] to-[#E9E4F5] rounded-3xl border-2 border-pastel-pink-deep/40 shadow-soft-lg cursor-pointer relative overflow-hidden flex items-center justify-center group"
              >
                {/* Envelope Flap Triangle */}
                <div 
                  className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FFD1DC] to-[#FFE5EC] border-b border-pastel-pink-deep/30"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />

                {/* Wax Seal Heart in Center */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#E63946] to-[#FF758F] shadow-glow-pink flex items-center justify-center border-2 border-white text-white group-hover:scale-115 transition-transform"
                >
                  <Heart className="w-8 h-8 fill-white" />
                </motion.div>

                {/* Envelope bottom lines */}
                <div className="absolute bottom-3 left-4 text-[10px] font-mono font-bold text-slate-400">
                  TO: RUTUJA
                </div>
                <div className="absolute bottom-3 right-4 text-[10px] font-mono font-bold text-slate-400">
                  FROM: SWARAJ ❤️
                </div>

                {/* Floating stamp */}
                <div className="absolute top-3 right-3 w-8 h-10 border border-dashed border-rose-300 rounded bg-white/70 flex items-center justify-center text-xs">
                  🌸
                </div>
              </motion.div>

              {/* Required Open Button: OPEN YOUR LETTER 💌 */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenLetter}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-sm md:text-base shadow-glow-pink flex items-center gap-2 group tracking-wide"
              >
                <span>OPEN YOUR LETTER 💌</span>
              </motion.button>

              <p className="text-xs text-slate-400 font-semibold">
                Tap the envelope or button to break the wax seal
              </p>
            </motion.div>
          ) : (
            /* OPENED LETTER REVEAL STATE */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="w-full max-w-xl bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-[#F7F2FC] rounded-3xl p-6 md:p-8 border-2 border-pink-200 shadow-soft-lg space-y-6 relative overflow-hidden"
            >
              {/* Decorative pastel background watermarks */}
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

              {/* Letter Header */}
              <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💌</span>
                  <span className="text-xs font-black uppercase text-pink-700 tracking-wider">
                    Special Delivery for Rutuja
                  </span>
                </div>
                <button
                  onClick={handleFoldLetter}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
                  title="Fold letter back into envelope"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fold letter</span>
                </button>
              </div>

              {/* REQUIRED MAIN PERSONAL MESSAGE */}
              <div className="p-4 md:p-5 rounded-2xl bg-white/90 border border-pink-200 shadow-sm text-center">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-rose-600 font-display leading-snug">
                  "Stop overthinking, you're Swaraj's friend! ❤️"
                </h2>
              </div>

              {/* REQUIRED WARM LINES & BODY */}
              <div className="space-y-4 text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                
                <p>
                  Life is not always going to go according to plan, and that's okay.
                </p>

                <p>
                  You don't need to figure everything out today.
                </p>

                <p>
                  Whenever your brain starts creating unnecessary stories, remember to smile, take a breath, and enjoy the moment.
                </p>

                <p className="font-bold text-slate-800">
                  Keep being your wonderful self, Rutuja.
                </p>

              </div>

              {/* REQUIRED SIGNATURE ENDING */}
              <div className="pt-4 border-t border-pink-100/80 flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Sent with infinite warmth,</p>
                  <p className="text-base md:text-lg font-black text-slate-800 font-display mt-0.5">
                    With lots of love,<br />
                    <span className="text-rose-600">Swaraj ❤️</span>
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-xl shadow-inner">
                  ✨
                </div>
              </div>

              {/* Action: Keep pinned or fold */}
              <div className="pt-2 text-center">
                <button
                  onClick={handleFoldLetter}
                  className="px-5 py-2.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-xs transition-all active:scale-95"
                >
                  Fold Letter Back ✉️
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
