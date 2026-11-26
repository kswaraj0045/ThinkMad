import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getRandomOraclePrediction } from '../../data/oracleData';
import { OraclePrediction } from '../../types';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration } from '../../utils/confetti';

export const RutujaOracle: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [question, setQuestion] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [prediction, setPrediction] = useState<OraclePrediction | null>(null);

  const handleConsultOracle = () => {
    if (!question.trim()) {
      addToast("Silence in the cosmos! 🌌", "Please type your question for the universe first.", "warning");
      return;
    }

    sounds.playOracleGlow();
    setIsConsulting(true);

    setTimeout(() => {
      const pred = getRandomOraclePrediction();
      setPrediction(pred);
      setIsConsulting(false);
      sounds.playChime();
      triggerPastelCelebration();
      unlockBadge('badge-oracle-believer');
    }, 1200);
  };

  const handleRevealAnother = () => {
    sounds.playOracleGlow();
    setIsConsulting(true);

    setTimeout(() => {
      const pred = getRandomOraclePrediction();
      setPrediction(pred);
      setIsConsulting(false);
      sounds.playChime();
      triggerPastelCelebration();
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-300 text-purple-700 text-xs font-black tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Feature 05 • Cosmic Guidance</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          THE GREAT RUTUJA ORACLE 🔮
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Ask the universe. Let's see what it has to say.
        </p>
      </div>

      {/* Crystal Ball Visual Centerpiece */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        
        {/* Floating stars & sparkles */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-64 h-64 border border-dashed border-purple-300/40 rounded-full"
          />
        </div>

        {/* 3D Glowing Crystal Ball */}
        <motion.div
          animate={isConsulting ? { scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] } : { y: [0, -8, 0] }}
          transition={
            isConsulting
              ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative w-44 h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center select-none"
        >
          {/* Intense Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-400 to-indigo-400 blur-2xl opacity-50 animate-pulse" />

          {/* Glass Crystal Sphere */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-white/90 via-purple-300/80 to-purple-700/90 shadow-soft-lg border-2 border-white/80 backdrop-blur-md overflow-hidden flex items-center justify-center">
            
            {/* Inner nebula swirls */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-purple-900 via-indigo-800 to-pink-600 opacity-80" />
            
            {/* Sparkle particles */}
            <div className="absolute w-2 h-2 rounded-full bg-white blur-[1px] top-8 left-12 animate-ping" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-pink-200 top-20 right-10 animate-pulse" />
            <div className="absolute w-2 h-2 rounded-full bg-amber-200 bottom-12 left-16 animate-bounce" />

            {/* Reflection highlights */}
            <div className="absolute top-3 left-6 w-16 h-8 bg-white/40 rounded-full blur-[2px] rotate-[-25deg]" />

            {/* Inner Icon or Mystery Question Mark */}
            <div className="relative z-10 text-center">
              {isConsulting ? (
                <RefreshCw className="w-12 h-12 text-white animate-spin drop-shadow-md mx-auto" />
              ) : (
                <span className="text-4xl md:text-5xl filter drop-shadow">🔮</span>
              )}
            </div>
          </div>

          {/* Crystal Ball Stand */}
          <div className="absolute -bottom-4 w-28 h-6 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-full shadow-md border-t border-amber-200/80" />
        </motion.div>

        <p className="text-xs text-purple-600 font-bold mt-6 tracking-wide">
          {isConsulting ? "Consulting cosmic star charts..." : "The Crystal Ball is glowing with energy ✨"}
        </p>

      </div>

      {/* Question Input Card - NO PREDEFINED QUESTIONS AS REQUIRED */}
      <div className="glass-card rounded-3xl p-5 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div>
          <label className="block text-xs font-black uppercase text-slate-600 mb-2 tracking-wider">
            Ask any question to the cosmos:
          </label>
          {/* Required exact placeholder: "Type your question here..." */}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConsultOracle();
            }}
            placeholder="Type your question here..."
            className="w-full p-3.5 rounded-2xl bg-white border border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-slate-800 text-sm font-medium transition-all shadow-inner"
          />
        </div>

        {/* Required Button: REVEAL MY FUTURE 🔮 */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          disabled={isConsulting}
          onClick={handleConsultOracle}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-black text-sm md:text-base shadow-soft hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {isConsulting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>COMMUNING WITH GALAXY...</span>
            </>
          ) : (
            <>
              <span>REVEAL MY FUTURE 🔮</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Prediction Output Card */}
      <AnimatePresence mode="wait">
        {prediction && (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-5 md:p-6 border-2 border-purple-300 shadow-soft-lg space-y-5"
          >
            {/* Cosmic Header */}
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <span className="text-xs font-black uppercase text-purple-700 tracking-wider">
                Cosmic Alignment: {prediction.cosmicSign}
              </span>
              <span className="text-xs font-bold text-slate-400">
                100% Wholesome
              </span>
            </div>

            {/* Main Revelation */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 text-center space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                The Universe Decrees:
              </span>
              <h2 className="text-lg md:text-xl font-black text-purple-950 font-display leading-relaxed">
                "{prediction.prediction}"
              </h2>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-slate-400">Mood Advice:</span>
                <p className="font-bold text-slate-700">{prediction.moodAdvice}</p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-0.5">
                <span className="text-[10px] font-black uppercase text-amber-700">Cosmic Lucky Snack:</span>
                <p className="font-bold text-amber-900">{prediction.luckySnack}</p>
              </div>
            </div>

            {/* Overthinking Antidote */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-800 font-bold flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span>Antidote: {prediction.overthinkingAntidote}</span>
            </div>

            {/* Required Button: REVEAL ANOTHER PREDICTION */}
            <div className="pt-2 text-center">
              <button
                onClick={handleRevealAnother}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-extrabold text-xs md:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>REVEAL ANOTHER PREDICTION</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
