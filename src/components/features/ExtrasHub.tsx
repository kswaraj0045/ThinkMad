import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  RefreshCw, 
  CheckCircle2
} from 'lucide-react';
import { FUNNY_QUOTES, getRandomQuote } from '../../data/quotesData';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerHeartConfetti } from '../../utils/confetti';

export const ExtrasHub: React.FC = () => {
  const { 
    badges, 
    unlockBadge, 
    dramaLevel, 
    setDramaLevel, 
    addToast
  } = useApp();

  // --- Quote Generator State ---
  const [quote, setQuote] = useState(() => getRandomQuote());
  const [quoteAnim, setQuoteAnim] = useState(false);

  const handleNextQuote = () => {
    sounds.playPop();
    setQuoteAnim(true);
    setQuote(getRandomQuote());
    setTimeout(() => setQuoteAnim(false), 300);
  };

  // --- Drama Meter Label Logic ---
  const getDramaLabel = (val: number) => {
    if (val <= 20) return { text: "0-20: Totally Chill 😌", desc: "No worries in sight. Highly suspicious for Rutuja.", color: "text-emerald-600 bg-emerald-50" };
    if (val <= 40) return { text: "21-40: Slightly Curious 🤔", desc: "Starting to wonder why they didn't wave back.", color: "text-blue-600 bg-blue-50" };
    if (val <= 60) return { text: "41-60: Thinking Too Much 🧠", desc: "Standard Rutuja operating temperature.", color: "text-amber-600 bg-amber-50" };
    if (val <= 80) return { text: "61-80: Full Bollywood Drama 🎬", desc: "Violin music playing in the background.", color: "text-rose-600 bg-rose-50" };
    return { text: "81-100: Oscar-Winning Overthinking 🏆", desc: "Academy Award speech ready for imaginary argument.", color: "text-purple-600 bg-purple-50" };
  };

  const dramaInfo = getDramaLabel(dramaLevel);

  // --- 5-Minute Peace Timer State ---
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sounds.playCelebration();
      triggerHeartConfetti();
      unlockBadge('badge-zen-master');
      addToast(
        "Peace Timer Finished! 🧘‍♀️",
        "5 minutes of pure calm completed! Brain tabs refreshed.",
        "success"
      );
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerRunning, timeLeft]);

  const handleStartTimer = () => {
    sounds.playPop();
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    sounds.playPop();
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    sounds.playPop();
    setIsTimerRunning(false);
    setTimeLeft(300);
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pastel-lavender border border-pastel-purple/40 text-pastel-purple-accent text-xs font-black tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Extra Fun Features 🎉</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          RUTUJA'S WELLNESS TOOLBOX 🧰
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Fun little interactive widgets to lighten your mood anytime.
        </p>
      </div>

      {/* SECTION B: DRAMA METER (0 to 100) */}
      <section className="glass-card rounded-3xl p-5 md:p-6 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎭</span>
            <div>
              <h2 className="text-sm md:text-base font-black text-slate-800 font-display">
                Drama Meter
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Adjust Rutuja's current internal drama intensity
              </p>
            </div>
          </div>
          <span className="text-lg font-black font-mono text-pastel-purple-accent">
            {dramaLevel}%
          </span>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-3 pt-2">
          <input
            type="range"
            min={0}
            max={100}
            value={dramaLevel}
            onChange={(e) => {
              const val = Number(e.target.value);
              setDramaLevel(val);
              if (val % 25 === 0) sounds.playPop();
            }}
            className="w-full h-3 bg-gradient-to-r from-emerald-200 via-amber-200 to-rose-300 rounded-lg appearance-none cursor-pointer accent-pastel-pink-deep"
          />

          {/* Changing Label Display Card */}
          <div className={`p-3.5 rounded-2xl border border-slate-200 ${dramaInfo.color} transition-colors space-y-0.5`}>
            <p className="text-xs md:text-sm font-black">
              {dramaInfo.text}
            </p>
            <p className="text-[11px] font-semibold opacity-90">
              {dramaInfo.desc}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION C: FIVE-MINUTE PEACE TIMER */}
      <section className="glass-card rounded-3xl p-5 md:p-6 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🕊️</span>
          <div>
            <h2 className="text-sm md:text-base font-black text-slate-800 font-display">
              Five-Minute Peace Timer
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Take 5 minutes to breathe without checking notifications
            </p>
          </div>
        </div>

        {/* Circular Display & Time */}
        <div className="text-center py-4 space-y-3">
          <div className="relative w-36 h-36 rounded-full bg-pastel-lavender/40 border-4 border-pastel-purple/50 flex flex-col items-center justify-center mx-auto shadow-inner">
            <span className="text-3xl md:text-4xl font-black font-mono text-slate-800">
              {formatTimer(timeLeft)}
            </span>
            <span className="text-[10px] font-bold text-pastel-purple-accent uppercase tracking-wider mt-1">
              {isTimerRunning ? 'Breathing...' : timeLeft === 0 ? 'Peace Achieved!' : 'Ready'}
            </span>
          </div>

          <p className="text-xs md:text-sm text-slate-600 font-semibold italic max-w-sm mx-auto">
            {isTimerRunning
              ? "“Inhale peace, exhale drama. Rutuja, you're doing wonderfully.”"
              : timeLeft === 0
              ? "“Congratulations on taking time for your peace! Swaraj approves. ❤️”"
              : "“Press start, close your eyes, and let your brain cool down.”"}
          </p>

          {/* Controls: Start, Pause, Reset */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            {!isTimerRunning ? (
              <button
                onClick={handleStartTimer}
                className="px-6 py-2.5 rounded-2xl bg-pastel-pink-deep text-white font-extrabold text-xs md:text-sm shadow-soft hover:shadow-glow-pink flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 text-white font-extrabold text-xs md:text-sm shadow-soft flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm transition-all active:scale-95 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION A: RANDOM FUNNY QUOTE GENERATOR */}
      <section className="glass-card rounded-3xl p-5 md:p-6 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <div>
              <h2 className="text-sm md:text-base font-black text-slate-800 font-display">
                Funny Quote Generator
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Instant truths about overthinking
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-pastel-purple-accent">
            {FUNNY_QUOTES.length}+ Quotes
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-pastel-lavender text-center space-y-2 shadow-sm">
          <p className="text-sm md:text-base font-extrabold text-slate-800 italic leading-relaxed">
            "{quote}"
          </p>
        </div>

        {/* Required Button: GIVE ME ANOTHER QUOTE */}
        <div className="text-center pt-1">
          <button
            onClick={handleNextQuote}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pastel-pink-deep to-[#FF5376] text-white font-extrabold text-xs md:text-sm shadow-soft hover:shadow-glow-pink transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${quoteAnim ? 'animate-spin' : ''}`} />
            <span>GIVE ME ANOTHER QUOTE</span>
          </button>
        </div>
      </section>

      {/* SECTION D: ACHIEVEMENT BADGES */}
      <section className="glass-card rounded-3xl p-5 md:p-6 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <div>
              <h2 className="text-sm md:text-base font-black text-slate-800 font-display">
                Achievement Badges
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Saved in LocalStorage • Track your progress
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-pastel-lavender text-pastel-purple-accent text-xs font-black">
            {badges.filter((b) => b.unlockedAt !== null).length} / {badges.length}
          </span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {badges.map((badge) => {
            const isUnlocked = badge.unlockedAt !== null;

            return (
              <motion.div
                key={badge.id}
                whileHover={{ y: -2 }}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-white border-pastel-pink shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-2xl md:text-3xl mb-1.5">{badge.icon}</div>
                <div>
                  <h3 className="text-xs font-black text-slate-800 line-clamp-1">
                    {badge.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                    {badge.description}
                  </p>
                </div>
                <div className="mt-2 text-[9px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-600 flex items-center gap-0.5 justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Locked</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
