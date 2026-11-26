import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { sounds } from '../../utils/sound';
import { triggerHeartConfetti } from '../../utils/confetti';

interface QuitConfirmModalProps {
  isOpen: boolean;
  onStay: () => void;
  onExit: () => void;
}

export const QuitConfirmModal: React.FC<QuitConfirmModalProps> = ({
  isOpen,
  onStay,
  onExit
}) => {
  const handleStay = () => {
    sounds.playCelebration();
    triggerHeartConfetti();
    onStay();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
          {/* Backdrop with dark blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleStay}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Dramatic Exit Prevention Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 25 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="relative z-10 w-full max-w-sm bg-white rounded-3xl p-6 md:p-7 shadow-2xl border-2 border-pastel-pink text-center space-y-4 overflow-hidden"
          >
            {/* Top decorative badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Drama Alert Level 999 🚨</span>
            </div>

            {/* Animated Dramatic Avatar */}
            <motion.div
              animate={{
                rotate: [0, -8, 8, -6, 6, 0],
                y: [0, -4, 0]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-20 h-20 rounded-full bg-pastel-pink/80 border-4 border-pastel-pink-deep/30 flex items-center justify-center mx-auto text-4xl shadow-inner"
            >
              🥺
            </motion.div>

            {/* Required exact message title */}
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 font-display leading-tight">
                Why are you quitting the site? 🥺💔
              </h2>
              <p className="text-xs text-rose-500 font-extrabold tracking-wide uppercase">
                Wait Rutuja, don't leave!
              </p>
            </div>

            {/* Funny & emotional body text */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50/40 to-pink-50 border border-pastel-pink text-xs md:text-sm text-slate-700 font-semibold leading-relaxed space-y-1.5">
              <p>
                Your brain still has <span className="font-black text-rose-600">47 tabs open</span>! Who is going to overthink the punctuation in that last text message if you leave?! 😭
              </p>
              <p className="text-pastel-purple-accent font-bold pt-1">
                "Stop overthinking, you're Swaraj's friend! ❤️"
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStay}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-sm md:text-base shadow-glow-pink flex items-center justify-center gap-2 group transition-all"
              >
                <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
                <span>OKAY, I'LL STAY! 💗</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </motion.button>

              <button
                onClick={onExit}
                className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                I really have to go 🥺
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
