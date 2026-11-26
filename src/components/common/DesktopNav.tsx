import React from 'react';
import { Home, Brain, Search, Sparkles, Cpu, AlertTriangle, Mail, Grid } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const DesktopNav: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const navItems: { tab: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { tab: 'simulator', label: 'Simulator', icon: <Brain className="w-4 h-4" /> },
    { tab: 'fbi', label: 'FBI Feelings', icon: <Search className="w-4 h-4" /> },
    { tab: 'oracle', label: 'The Oracle', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'diagnostics', label: 'Brain.exe', icon: <Cpu className="w-4 h-4" /> },
    { tab: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-4 h-4 text-red-500" /> },
    { tab: 'letter', label: 'Secret Letter', icon: <Mail className="w-4 h-4 text-pink-500" /> },
    { tab: 'extras', label: 'Fun Extras', icon: <Grid className="w-4 h-4" /> },
  ];

  return (
    <div className="hidden md:flex items-center justify-center gap-1.5 py-3 px-4 max-w-4xl mx-auto">
      <div className="bg-white/85 backdrop-blur-md p-1.5 rounded-3xl border border-pastel-lavender/60 shadow-soft flex items-center gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-pastel-pink to-pastel-lavender text-pastel-purple-accent shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
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
