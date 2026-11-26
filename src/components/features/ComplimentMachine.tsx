import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { getRandomCompliment } from '../../data/complimentsData';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration, triggerHeartConfetti } from '../../utils/confetti';

interface ComplimentMachineProps {
  embedded?: boolean;
}

export const ComplimentMachine: React.FC<ComplimentMachineProps> = ({ embedded = false }) => {
  const { unlockBadge, addToast } = useApp();
  const [compliment, setCompliment] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);

  const handleGetCompliment = () => {
    sounds.playPop();
    const nextCompliment = getRandomCompliment();
    setCompliment(nextCompliment);
    setClickCount((prev) => prev + 1);

    sounds.playChime();
    if (clickCount % 3 === 0) {
      triggerHeartConfetti();
    } else {
      triggerPastelCelebration();
    }

    unlockBadge('badge-compliment-loved');
    addToast('Compliment Dispensed! 💗', '100% verified factual truth.', 'love');
  };

  if (embedded) {
    return (
      <div className="bg-white/80 rounded-3xl p-5 md:p-6 border border-pastel-pink/50 shadow-soft text-center space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase text-pastel-pink-deep tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-pastel-pink-deep" />
            <span>Random Compliment Machine 💗</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Instant Smiles</span>
        </div>

        {/* Display Area */}
        <AnimatePresence mode="wait">
          {compliment ? (
            <motion.div
              key={compliment}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50/40 to-pink-50 border border-pastel-pink shadow-sm space-y-1"
            >
              <span className="text-[10px] font-black uppercase text-pastel-pink-deep tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Certified Fact for Rutuja</span>
              </span>
              <p className="text-sm md:text-base font-black text-slate-800 font-display leading-relaxed">
                "{compliment}"
              </p>
            </motion.div>
          ) : (
            <p className="text-xs text-slate-400 font-medium py-1">
              Need a little boost? Tap the button below!
            </p>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetCompliment}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-xs md:text-sm shadow-soft hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 mx-auto tracking-wide"
          >
            {compliment ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>GIVE ME ANOTHER COMPLIMENT 💗</span>
              </>
            ) : (
              <>
                <span>GIVE ME A COMPLIMENT 💗</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-pink/70 border border-pastel-pink-deep/20 text-pastel-pink-deep text-[11px] font-black uppercase tracking-wider">
          <Heart className="w-3 h-3 fill-pastel-pink-deep" />
          <span>Compliment Booth 💗</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
          Random Compliment Machine
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          Need a quick reminder that you are amazing? Press the button.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/90 rounded-3xl p-6 md:p-8 border border-pastel-lavender/80 shadow-soft text-center space-y-6">
        
        {/* Animated Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-pastel-pink/70 text-pastel-pink-deep flex items-center justify-center mx-auto shadow-sm"
        >
          <Heart className="w-8 h-8 fill-pastel-pink-deep" />
        </motion.div>

        {/* Display Area */}
        <AnimatePresence mode="wait">
          {compliment ? (
            <motion.div
              key={compliment}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50/50 to-pink-50 border border-pastel-pink shadow-sm space-y-1"
            >
              <span className="text-[10px] font-black uppercase text-pastel-pink-deep tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Certified Fact</span>
              </span>
              <p className="text-base md:text-lg font-black text-slate-800 font-display leading-relaxed">
                "{compliment}"
              </p>
            </motion.div>
          ) : (
            <div className="py-4 text-xs md:text-sm text-slate-400 font-medium">
              Ready to dispense your personalized compliment!
            </div>
          )}
        </AnimatePresence>

        {/* Required Button: "GIVE ME A COMPLIMENT 💗" */}
        <div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetCompliment}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-sm md:text-base shadow-soft hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 mx-auto tracking-wide"
          >
            {compliment ? (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>GIVE ME ANOTHER COMPLIMENT 💗</span>
              </>
            ) : (
              <>
                <span>GIVE ME A COMPLIMENT 💗</span>
              </>
            )}
          </motion.button>
        </div>

      </div>

    </div>
  );
};
