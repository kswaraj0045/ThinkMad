import React from 'react';
import { Home, Brain, Search, Sparkles, MoreHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, badges } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode; badgeCount?: number }[] = [
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
      tab: 'fbi',
      label: 'FBI',
      icon: <Search className="w-5 h-5" />
    },
    {
      tab: 'oracle',
      label: 'Oracle',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      tab: 'extras',
      label: 'More',
      icon: <MoreHorizontal className="w-5 h-5" />,
      badgeCount: badges.filter(b => b.unlockedAt !== null).length
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-pastel-lavender/70 shadow-[0_-5px_20px_rgba(142,125,190,0.12)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab || (item.tab === 'extras' && ['diagnostics', 'emergency', 'letter', 'extras'].includes(currentTab));

          return (
            <button
              key={item.tab}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 relative transition-all active:scale-90 ${
                isActive ? 'text-pastel-pink-deep font-black' : 'text-slate-500 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-2xl transition-all relative ${
                  isActive ? 'bg-pastel-pink text-pastel-pink-deep shadow-sm scale-110' : 'hover:bg-slate-100'
                }`}
              >
                {item.icon}
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-pastel-purple-accent text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {item.badgeCount}
                  </span>
                )}
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
