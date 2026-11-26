import React from 'react';
import { Volume2, VolumeX, Award, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { soundEnabled, toggleSound, badges, setCurrentTab, openEmergency } = useApp();
  const unlockedCount = badges.filter((b) => b.unlockedAt !== null).length;

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-pastel-lavender/60 shadow-sm transition-all">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between">
        
        {/* Brand identity */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pastel-pink-deep via-pastel-purple to-pastel-lavender flex items-center justify-center shadow-soft transform group-hover:scale-105 transition-transform">
            <span className="text-lg">🧠</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm md:text-base tracking-wider text-slate-800 font-display">
                RUTUJA.EXE
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-pastel-pink text-pastel-pink-deep border border-pastel-pink-deep/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-pastel-purple-accent font-medium line-clamp-1">
              THE OVERTHINKING CONTROL CENTRE
            </p>
          </div>
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          
          {/* Emergency quick button */}
          <button
            onClick={openEmergency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-bold hover:bg-red-100 active:scale-95 transition-all shadow-sm"
            title="Emergency Overthinking Alert"
          >
            <AlertCircle className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span className="hidden sm:inline">EMERGENCY</span>
            <span>🚨</span>
          </button>

          {/* Achievements badge button */}
          <button
            onClick={() => setCurrentTab('explore')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-pastel-lavender/60 hover:bg-pastel-lavender border border-pastel-purple/30 text-xs font-bold text-pastel-purple-accent transition-all active:scale-95"
            title="View Badges & Achievements"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px]">{unlockedCount}/{badges.length}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border transition-all active:scale-90 ${
              soundEnabled
                ? 'bg-pastel-pink/70 border-pastel-pink-deep/40 text-pastel-pink-deep'
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

        </div>
      </div>
    </header>
  );
};
