import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Check, RotateCcw } from 'lucide-react';
import { MOOD_OPTIONS, MoodOption } from '../../data/moodData';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration } from '../../utils/confetti';

const STORAGE_MOOD_KEY = 'rutuja_mood_today_v1';

export const MoodOfTheDay: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_MOOD_KEY);
      if (saved) {
        setSelectedMoodId(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectMood = (mood: MoodOption) => {
    sounds.playPop();
    setSelectedMoodId(mood.id);
    try {
      localStorage.setItem(STORAGE_MOOD_KEY, mood.id);
    } catch {
      // ignore
    }
    sounds.playChime();
    triggerPastelCelebration();
    unlockBadge('badge-mood-tracker');
    addToast(
      `Mood Logged: ${mood.label} ${mood.emoji}`,
      mood.headline,
      'love'
    );
  };

  const handleReset = () => {
    sounds.playPop();
    setSelectedMoodId(null);
    try {
      localStorage.removeItem(STORAGE_MOOD_KEY);
    } catch {
      // ignore
    }
  };

  const currentMood = MOOD_OPTIONS.find((m) => m.id === selectedMoodId);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pastel-pink/70 border border-pastel-pink-deep/20 text-pastel-pink-deep text-[11px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Mood Tracker 🌸</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight font-display">
          Mood of the Day
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto">
          How is your mind feeling right now, Rutuja?
        </p>
      </div>

      {/* Mood Options Grid */}
      <div className="bg-white/90 rounded-3xl p-5 border border-pastel-lavender/80 shadow-soft space-y-5">
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = selectedMoodId === mood.id;
            return (
              <motion.button
                key={mood.id}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleSelectMood(mood)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all relative ${
                  isSelected
                    ? 'bg-pastel-pink/60 border-pastel-pink-deep shadow-sm text-slate-900 scale-105'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/80 text-slate-600'
                }`}
              >
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-pastel-pink-deep text-white flex items-center justify-center text-[9px]">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <span className="text-2xl md:text-3xl mb-1 filter drop-shadow-sm">
                  {mood.emoji}
                </span>
                <span className="text-xs font-bold font-display">
                  {mood.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Mood Detail Card */}
        <AnimatePresence mode="wait">
          {currentMood ? (
            <motion.div
              key={currentMood.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`p-4 md:p-5 rounded-2xl bg-gradient-to-br ${currentMood.color} border shadow-sm space-y-2.5`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span>Current Vibe: {currentMood.label}</span>
                  <span>{currentMood.emoji}</span>
                </span>
                <button
                  onClick={handleReset}
                  className="text-[11px] font-bold opacity-75 hover:opacity-100 flex items-center gap-1 transition-opacity"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Change</span>
                </button>
              </div>

              <h2 className="text-base md:text-lg font-black font-display leading-snug">
                {currentMood.headline}
              </h2>

              <p className="text-xs md:text-sm font-medium leading-relaxed opacity-95">
                {currentMood.message}
              </p>

              {/* Prescription */}
              <div className="pt-2 border-t border-black/10 flex items-start gap-2 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 mt-0.5 text-rose-500 fill-rose-500 shrink-0" />
                <span>Prescription: {currentMood.prescription}</span>
              </div>
            </motion.div>
          ) : (
            <div className="py-4 text-center text-xs text-slate-400 font-medium">
              Tap any mood above to get your custom comfort advice!
            </div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};
