import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { EMERGENCY_CALMING_MESSAGES, BREATHING_PHASES } from '../../data/emergencyMessages';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerHeartConfetti } from '../../utils/confetti';

interface EmergencyViewProps {
  isModal?: boolean;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ isModal = false }) => {
  const { closeEmergency, unlockBadge, addToast } = useApp();
  const [stage, setStage] = useState<'idle' | 'countdown' | 'calm' | 'resolved'>('idle');
  const [countdown, setCountdown] = useState(5);
  const [calmingMessage, setCalmingMessage] = useState(EMERGENCY_CALMING_MESSAGES[0]);
  const [breathingIndex, setBreathingIndex] = useState(0);

  // Trigger emergency protocol
  const handleStartEmergency = () => {
    sounds.playEmergencyBeep();
    setStage('countdown');
    setCountdown(5);
    const randomMsg = EMERGENCY_CALMING_MESSAGES[Math.floor(Math.random() * EMERGENCY_CALMING_MESSAGES.length)];
    setCalmingMessage(randomMsg);
  };

  // Countdown logic from 5 to 1
  useEffect(() => {
    if (stage === 'countdown') {
      if (countdown > 0) {
        sounds.playEmergencyBeep();
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Countdown finished! Transition to resolved
        setStage('resolved');
        sounds.playCelebration();
        triggerHeartConfetti();
        unlockBadge('badge-emergency-survivor');
        addToast(
          "Emergency Handled! 💗",
          "You survived the overthinking spiral. Swaraj sends hugs!",
          "love"
        );
      }
    }
  }, [stage, countdown]);

  // Breathing cycle animation when resolved or idle
  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingIndex((prev) => (prev + 1) % BREATHING_PHASES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
    sounds.playPop();
    setStage('idle');
    setCountdown(5);
  };

  return (
    <div className={`space-y-6 max-w-2xl mx-auto ${isModal ? 'p-2' : ''}`}>
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-black tracking-wide uppercase">
          <AlertCircle className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          <span>Feature 06 • Rapid Panic Neutralizer</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          EMERGENCY OVERTHINKING PROTOCOL 🚨
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          One-tap immediate decompression whenever your brain refuses to calm down.
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="bg-white/95 rounded-3xl p-6 md:p-8 border-2 border-red-200 shadow-soft-lg space-y-6 text-center relative overflow-hidden">
        
        {/* Stage 1: IDLE - Large prominent button */}
        {stage === 'idle' && (
          <div className="py-6 space-y-6">
            <div className="w-24 h-24 rounded-full bg-red-100 border-4 border-red-300 flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
              🚨
            </div>

            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 font-display">
                Are you spiraling right now?
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium max-w-sm mx-auto">
                Hit the button below. Let the system take over and defuse the situation.
              </p>
            </div>

            {/* Required prominent Emergency Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleStartEmergency}
              className="w-full sm:w-auto px-10 py-5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white font-black text-lg md:text-xl shadow-glow-pink tracking-wider transition-all flex items-center justify-center gap-3 mx-auto border-2 border-white/60 animate-pulse"
            >
              <span>I AM OVERTHINKING!!! 🚨</span>
            </motion.button>

            <p className="text-xs text-slate-400 font-semibold pt-2">
              Warning: May cause immediate relief and sudden giggles.
            </p>
          </div>
        )}

        {/* Stage 2: COUNTDOWN IN PROGRESS */}
        {stage === 'countdown' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-6 space-y-6"
          >
            {/* Flashing Alert Header */}
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest animate-pulse">
              EMERGENCY PROTOCOL ENGAGED
            </div>

            <p className="text-xs md:text-sm font-bold text-red-600">
              Rutuja detected overthinking at maximum capacity!
            </p>

            {/* Giant Countdown Number (5 to 1) */}
            <div className="relative w-36 h-36 rounded-full bg-red-50 border-4 border-red-500 flex items-center justify-center mx-auto shadow-glow-pink">
              <motion.span
                key={countdown}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-6xl md:text-7xl font-black text-red-600 font-display"
              >
                {countdown}
              </motion.span>
            </div>

            {/* Comforting Calming Message */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-sm md:text-base font-extrabold text-red-950 max-w-md mx-auto leading-relaxed">
              "{calmingMessage}"
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Closing imaginary scenario doors... please hold on...
            </p>
          </motion.div>
        )}

        {/* Stage 3: RESOLVED */}
        {stage === 'resolved' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-pink-100 border-4 border-pink-300 flex items-center justify-center mx-auto text-4xl shadow-soft">
              💗
            </div>

            {/* Required Announcement: EMERGENCY SUCCESSFULLY HANDLED 💗 */}
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 font-display">
                EMERGENCY SUCCESSFULLY HANDLED 💗
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
                You took a breath, you paused, and the world did not collapse. Swaraj is proud of you!
              </p>
            </div>

            {/* Calming interactive breath bubble */}
            <div className="bg-gradient-to-r from-pastel-pink/60 via-pastel-lavender/50 to-pastel-pink/60 p-4 rounded-3xl border border-pastel-purple/30 space-y-2">
              <span className="text-[11px] font-black uppercase text-pastel-purple-accent tracking-wider">
                Follow the gentle breath bubble:
              </span>
              <motion.div
                animate={{ scale: [1, 1.25, 1.25, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full bg-white text-pastel-pink-deep shadow-soft flex items-center justify-center mx-auto text-xs font-black border border-pastel-pink"
              >
                {BREATHING_PHASES[breathingIndex].label.split(' ')[0]}
              </motion.div>
              <p className="text-xs font-bold text-slate-700">
                {BREATHING_PHASES[breathingIndex].label}
              </p>
            </div>

            {/* Comfort message card */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs md:text-sm font-bold text-emerald-800">
              "Stop overthinking, you're Swaraj's friend! ❤️"
            </div>

            {/* Required Restart button */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restart Emergency Module</span>
              </button>

              {isModal && (
                <button
                  onClick={closeEmergency}
                  className="px-6 py-3 rounded-2xl bg-pastel-pink-deep text-white font-bold text-xs md:text-sm transition-all active:scale-95 shadow-soft"
                >
                  I'm Calm Now ✨
                </button>
              )}
            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
};
