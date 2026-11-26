import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, RefreshCw, Flame, Film, Zap, CheckCircle2 } from 'lucide-react';
import { generateSimulation, SIMULATOR_PRESETS } from '../../data/simulatorData';
import { SimulationResult } from '../../types';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration } from '../../utils/confetti';

export const OverthinkingSimulator: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [inputSituation, setInputSituation] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleRunSimulation = (situationToRun?: string) => {
    const text = situationToRun !== undefined ? situationToRun : inputSituation;
    if (!text.trim()) {
      addToast("Empty Situation? 🤔", "Enter a scenario or pick a preset chip below!", "warning");
      return;
    }

    sounds.playPop();
    setIsSimulating(true);

    setTimeout(() => {
      const generated = generateSimulation(text);
      setResult(generated);
      setIsSimulating(false);
      sounds.playChime();
      triggerPastelCelebration();
      unlockBadge('badge-first-visit');
    }, 900);
  };

  const handlePickPreset = (preset: string) => {
    setInputSituation(preset);
    handleRunSimulation(preset);
  };

  const handleReset = () => {
    sounds.playPop();
    setResult(null);
    setInputSituation('');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-700 text-xs font-black tracking-wide uppercase">
          <Brain className="w-3.5 h-3.5" />
          <span>Feature 02 • Brain Generator</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          THE OVERTHINKING SIMULATOR 🧠
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Enter a situation. Let your brain make it unnecessarily complicated.
        </p>
      </div>

      {/* Input Box & Action */}
      <div className="glass-card rounded-3xl p-5 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div>
          <label className="block text-xs font-black uppercase text-slate-600 mb-2 tracking-wider">
            What innocent situation occurred?
          </label>
          <textarea
            value={inputSituation}
            onChange={(e) => setInputSituation(e.target.value)}
            placeholder="e.g. He replied with 'K' instead of 'Okay'..."
            rows={3}
            className="w-full p-3.5 rounded-2xl bg-white/95 border border-pastel-lavender focus:border-pastel-purple focus:ring-2 focus:ring-pastel-pink/50 outline-none text-slate-800 text-sm font-medium transition-all resize-none shadow-inner"
          />
        </div>

        {/* Action Button: Required label OVERTHINK THIS 😂 */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isSimulating}
            onClick={() => handleRunSimulation()}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-black text-sm md:text-base shadow-soft hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>EXPANDING DRAMA BY 9000%...</span>
              </>
            ) : (
              <>
                <span>OVERTHINK THIS 😂</span>
                <span className="text-lg group-hover:scale-125 transition-transform">🤯</span>
              </>
            )}
          </motion.button>

          {result && (
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all shrink-0"
            >
              Clear
            </button>
          )}
        </div>

        {/* Cute Preset chips */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Or pick an instant overthinking trigger:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SIMULATOR_PRESETS.slice(0, 5).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handlePickPreset(preset)}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-white hover:bg-pastel-pink/40 border border-pastel-purple/20 text-slate-600 font-semibold transition-all active:scale-95 text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Result Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white/95 rounded-3xl p-5 md:p-6 border-2 border-pastel-pink-deep/30 shadow-soft-lg space-y-5"
          >
            
            {/* Top Badge & Headline */}
            <div className="space-y-2 border-b border-pastel-lavender/60 pb-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Drama Level: {result.dramaLevel}</span>
                </span>
                <span className="text-xs font-bold text-slate-400">
                  ⚡ {result.overthinkingEnergy}% Energy Wasted
                </span>
              </div>

              <h2 className="text-lg md:text-xl font-black text-slate-800 leading-snug font-display">
                "{result.headline}"
              </h2>

              <p className="text-xs text-slate-500 italic">
                Trigger: "{result.situation}"
              </p>
            </div>

            {/* Netflix Series Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-extrabold uppercase tracking-widest">
                <Film className="w-4 h-4" />
                <span>Netflix Original Series Pitch</span>
              </div>
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                {result.netflixSynopsis}
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-300 font-bold">
                <span>⭐ 99.4% Match for Rutuja's Brain</span>
                <span>•</span>
                <span>{result.imaginedEndings} Alternate Endings</span>
              </div>
            </div>

            {/* Brain Trajectory Breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>How Your Brain Escalated This:</span>
              </h3>
              <div className="space-y-1.5 bg-pastel-lavender/30 rounded-2xl p-3 border border-pastel-purple/20">
                {result.brainTrajectory.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-pastel-purple-accent shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calming Advice */}
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm text-emerald-800 font-bold flex items-center gap-2.5">
              <span className="text-xl shrink-0">💖</span>
              <span>{result.advice}</span>
            </div>

            {/* Required Button: GENERATE ANOTHER RESULT */}
            <div className="pt-2 text-center">
              <button
                onClick={() => handleRunSimulation()}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-pastel-lavender hover:bg-pastel-lavender-dark/20 text-pastel-purple-accent font-extrabold text-xs md:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>GENERATE ANOTHER RESULT</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
