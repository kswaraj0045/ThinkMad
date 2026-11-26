import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { triggerHeartConfetti } from '../../utils/confetti';
import { sounds } from '../../utils/sound';

export const Footer: React.FC = () => {
  const { setCurrentTab, addToast } = useApp();

  const handleHeartClick = () => {
    sounds.playCelebration();
    triggerHeartConfetti();
    addToast(
      "A Hug From Swaraj ❤️",
      "Stop overthinking, you're Swaraj's friend! ❤️",
      "love"
    );
  };

  return (
    <footer className="w-full mt-12 pt-8 pb-20 md:pb-10 border-t border-pastel-lavender/70 bg-gradient-to-b from-transparent to-pastel-lavender/30">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
        
        {/* Cute interactive button */}
        <button
          onClick={handleHeartClick}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft border border-pastel-pink hover:border-pastel-pink-deep text-slate-700 text-xs md:text-sm font-bold active:scale-95 transition-all group"
        >
          <span>Tap for a virtual hug</span>
          <Heart className="w-4 h-4 text-pastel-pink-deep fill-pastel-pink-deep group-hover:scale-125 transition-transform" />
        </button>

        {/* Required Footer Signature */}
        <div className="space-y-1">
          <p className="text-xs md:text-sm font-extrabold text-slate-800 font-display">
            Made with ❤️ by Swaraj, especially for Rutuja.
          </p>
          <p className="text-[11px] text-pastel-purple-accent font-semibold tracking-wide">
            TOO MANY THOUGHTS. TOO LITTLE STORAGE.
          </p>
        </div>

        {/* Required personal message badge */}
        <div className="inline-block p-2 rounded-2xl bg-pastel-pink/70 border border-pastel-pink-deep/30 text-[11px] md:text-xs font-bold text-slate-700">
          "Stop overthinking, you're Swaraj's friend! ❤️"
        </div>

        {/* Quick links & version */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium pt-2">
          <button
            onClick={() => setCurrentTab('letter')}
            className="hover:text-pastel-pink-deep transition-colors"
          >
            Read Swaraj's Letter 💌
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentTab('emergency')}
            className="hover:text-red-500 transition-colors"
          >
            Emergency 🚨
          </button>
          <span>•</span>
          <span>RutujaOS v2.4 (No Bugs, Just Drama)</span>
        </div>

      </div>
    </footer>
  );
};
