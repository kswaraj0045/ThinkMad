import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../../utils/sound';

interface BrainMascotProps {
  mood?: 'happy' | 'overthinking' | 'chill' | 'shocked';
  size?: 'sm' | 'md' | 'lg';
  showSpeechBubble?: boolean;
}

const MASCOT_THOUGHTS = [
  "Rutuja, drink some water! 🥤",
  "Overthinking level: 9000! 🤯",
  "Swaraj says: Relax, you got this! ❤️",
  "47 tabs open, please close 3 💻",
  "Did I leave the stove on? (No) 😂",
  "Cuteness overload detected ✨",
  "Brain needs a 5-minute vacation 🌴",
  "Stop analyzing that 2-word message! 📱"
];

export const BrainMascot: React.FC<BrainMascotProps> = ({
  mood = 'happy',
  size = 'md',
  showSpeechBubble = true
}) => {
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [isWinking, setIsWinking] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32 md:w-36 md:h-36',
    lg: 'w-44 h-44 md:w-52 md:h-52'
  };

  const handleTapMascot = () => {
    sounds.playPop();
    setIsSpinning(true);
    setIsWinking(true);
    setCurrentThoughtIndex((prev) => (prev + 1) % MASCOT_THOUGHTS.length);

    setTimeout(() => {
      setIsWinking(false);
      setIsSpinning(false);
    }, 600);
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none">
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentThoughtIndex}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            className="mb-2 px-3.5 py-1.5 rounded-2xl bg-white/95 shadow-soft border border-pastel-purple/40 text-xs md:text-sm font-bold text-pastel-purple-accent max-w-[200px] text-center relative"
          >
            {MASCOT_THOUGHTS[currentThoughtIndex]}
            {/* Bubble arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-pastel-purple/40" />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Floating Mascot Graphic */}
      <motion.div
        onClick={handleTapMascot}
        animate={isSpinning ? { rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] } : { y: [0, -7, 0] }}
        transition={
          isSpinning
            ? { duration: 0.5, ease: 'easeInOut' }
            : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
        }
        whileTap={{ scale: 0.92 }}
        className={`${sizeClasses[size]} cursor-pointer relative group`}
        title="Tap me for a cute thought!"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Brain SVG Illustration */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 drop-shadow-md"
        >
          <defs>
            <linearGradient id="mascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA8BA" />
              <stop offset="50%" stopColor="#FF758F" />
              <stop offset="100%" stopColor="#B388EB" />
            </linearGradient>
          </defs>

          {/* Brain Lobes */}
          <circle cx="75" cy="80" r="30" fill="url(#mascotGrad)" />
          <circle cx="55" cy="110" r="28" fill="url(#mascotGrad)" />
          <circle cx="80" cy="135" r="28" fill="url(#mascotGrad)" />

          <circle cx="125" cy="80" r="30" fill="url(#mascotGrad)" />
          <circle cx="145" cy="110" r="28" fill="url(#mascotGrad)" />
          <circle cx="120" cy="135" r="28" fill="url(#mascotGrad)" />

          {/* Center Connector */}
          <rect x="68" y="85" width="64" height="50" rx="20" fill="url(#mascotGrad)" />

          {/* Brain Folds (Cute Pink lines) */}
          <path
            d="M 60 85 Q 75 100 65 115"
            stroke="#FFF0F3"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M 140 85 Q 125 100 135 115"
            stroke="#FFF0F3"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M 80 140 Q 100 148 120 140"
            stroke="#FFF0F3"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />

          {/* Eyes */}
          {isWinking ? (
            <>
              {/* Left Eye Winking */}
              <path
                d="M 72 108 Q 80 116 88 108"
                stroke="#2B213A"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye Open */}
              <circle cx="118" cy="108" r="6" fill="#2B213A" />
              <circle cx="120" cy="106" r="2" fill="#FFFFFF" />
            </>
          ) : mood === 'overthinking' ? (
            <>
              {/* Dizzy Spiral Eyes */}
              <circle cx="80" cy="108" r="6" fill="none" stroke="#2B213A" strokeWidth="2.5" />
              <circle cx="120" cy="108" r="6" fill="none" stroke="#2B213A" strokeWidth="2.5" />
            </>
          ) : (
            <>
              {/* Normal Sparkly Eyes */}
              <circle cx="80" cy="108" r="6" fill="#2B213A" />
              <circle cx="120" cy="108" r="6" fill="#2B213A" />
              <circle cx="82" cy="106" r="2" fill="#FFFFFF" />
              <circle cx="122" cy="106" r="2" fill="#FFFFFF" />
            </>
          )}

          {/* Rosy Blush Cheeks */}
          <ellipse cx="64" cy="118" rx="7" ry="4.5" fill="#FF1E56" opacity="0.38" />
          <ellipse cx="136" cy="118" rx="7" ry="4.5" fill="#FF1E56" opacity="0.38" />

          {/* Smile */}
          <path
            d="M 92 118 Q 100 127 108 118"
            stroke="#2B213A"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden Sparkle Halo */}
          <ellipse cx="100" cy="46" rx="28" ry="8" stroke="#FFD166" strokeWidth="3" fill="none" />
          <polygon points="100,26 102,32 108,34 102,36 100,42 98,36 92,34 98,32" fill="#FFB703" />

          {/* Little Floating Heart */}
          <path
            d="M 148 48 C 145 42, 137 42, 137 50 C 137 57, 148 63, 148 63 C 148 63, 159 57, 159 50 C 159 42, 151 42, 148 48 Z"
            fill="#FF4D6D"
          />
        </svg>

        {/* Interactive tap prompt indicator */}
        <span className="absolute -bottom-1 -right-1 text-xs bg-pastel-pink/90 text-pastel-purple-accent px-1.5 py-0.5 rounded-full shadow-sm font-black border border-pastel-purple/30">
          poke!
        </span>
      </motion.div>
    </div>
  );
};
