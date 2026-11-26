import React from 'react';
import { Home, Brain, Smile, Sparkles, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const DesktopNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { tab: 'simulator', label: 'Simulator', icon: <Brain className="w-4 h-4" /> },
    { tab: 'mood', label: 'Mood of the Day', icon: <Smile className="w-4 h-4" /> },
    { tab: 'explore', label: 'Explore More', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'letter', label: 'Swaraj\'s Letter', icon: <Mail className="w-4 h-4 text-pink-500" /> },
  ];

  const isTabActive = (tab: NavigationTab) => {
    if (tab === 'explore') {
      return ['explore', 'gift', 'compliment', 'diagnostics'].includes(currentTab);
    }
    return currentTab === tab;
  };

  return (
    <div className="hidden md:flex items-center justify-center gap-2 py-3 px-4 max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-pastel-lavender/60 shadow-soft flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = isTabActive(item.tab);
          return (
            <button
              key={item.tab}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-pastel-pink/70 text-pastel-pink-deep shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
