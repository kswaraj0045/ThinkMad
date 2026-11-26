import React from 'react';
import { Home, Brain, Smile, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      tab: 'simulator',
      label: 'Simulator',
      icon: <Brain className="w-5 h-5" />
    },
    {
      tab: 'mood',
      label: 'Mood',
      icon: <Smile className="w-5 h-5" />
    },
    {
      tab: 'explore',
      label: 'Explore',
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  const isTabActive = (tab: NavigationTab) => {
    if (tab === 'home') return currentTab === 'home';
    if (tab === 'simulator') return currentTab === 'simulator';
    if (tab === 'mood') return currentTab === 'mood';
    if (tab === 'explore') {
      return ['explore', 'gift', 'compliment', 'diagnostics', 'letter'].includes(currentTab);
    }
    return currentTab === tab;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pastel-lavender/60 shadow-[0_-4px_20px_rgba(142,125,190,0.08)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="grid grid-cols-4 h-16 items-center px-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = isTabActive(item.tab);

          return (
            <button
              key={item.tab}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
                isActive ? 'text-pastel-pink-deep font-extrabold' : 'text-slate-400 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-2xl transition-all ${
                  isActive ? 'bg-pastel-pink text-pastel-pink-deep scale-110 shadow-sm' : 'hover:bg-slate-50'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-display">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-pastel-pink-deep mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
