import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NavigationTab, Badge, ToastMessage } from '../types';
import { storage } from '../utils/storage';
import { sounds } from '../utils/sound';
import { triggerPastelCelebration } from '../utils/confetti';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  badges: Badge[];
  unlockBadge: (id: string) => boolean;
  dramaLevel: number;
  setDramaLevel: (val: number) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  isEmergencyOpen: boolean;
  openEmergency: () => void;
  closeEmergency: () => void;
  visitCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const RANDOM_IDLE_TOASTS = [
  { title: "Care Package 🎁", message: "A virtual smile is ready for you in Explore!", type: "love" as const },
  { title: "Brain Status ☕", message: "Your brain requested a coffee break.", type: "info" as const },
  { title: "System Tip 🕊️", message: "Peace mode activated in background.", type: "success" as const },
  { title: "Swaraj's Reminder ❤️", message: "Stop overthinking, you're Swaraj's friend!", type: "love" as const },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTabState] = useState<NavigationTab>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sounds.getSoundEnabled());
  const [badges, setBadges] = useState<Badge[]>(() => storage.getBadges());
  const [dramaLevel, setDramaLevelState] = useState<number>(() => storage.getDramaLevel());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [visitCount, setVisitCount] = useState<number>(1);

  // Initialize visit & award first badge
  useEffect(() => {
    const visits = storage.recordVisit();
    setVisitCount(visits);

    // Unlock first badge
    setTimeout(() => {
      unlockBadge('badge-first-visit');
      addToast(
        "Welcome to RUTUJA.EXE! 💗",
        "Your personal overthinking control centre is online.",
        "love"
      );
    }, 1200);

    // Random cute ambient toast every 75 seconds
    const interval = setInterval(() => {
      const pick = RANDOM_IDLE_TOASTS[Math.floor(Math.random() * RANDOM_IDLE_TOASTS.length)];
      addToast(pick.title, pick.message, pick.type);
    }, 75000);

    return () => clearInterval(interval);
  }, []);

  const setCurrentTab = (tab: NavigationTab) => {
    sounds.playPop();
    setCurrentTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSound = () => {
    const next = sounds.toggleSound();
    setSoundEnabled(next);
    addToast(
      next ? "Sound Effects On 🔊" : "Sound Muted 🔇",
      next ? "Cute chimes and pops enabled!" : "Silent contemplation mode active.",
      "info"
    );
  };

  const unlockBadge = (id: string): boolean => {
    const updated = storage.unlockBadge(id);
    if (updated) {
      setBadges(storage.getBadges());
      sounds.playChime();
      triggerPastelCelebration();
      addToast(
        `🏆 Achievement Unlocked!`,
        `${updated.icon} ${updated.title}: ${updated.description}`,
        "success"
      );
      return true;
    }
    return false;
  };

  const setDramaLevel = (val: number) => {
    setDramaLevelState(val);
    storage.setDramaLevel(val);
    if (val >= 90) {
      unlockBadge('badge-drama-queen');
    }
  };

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newToast: ToastMessage = { id, title, message, type, duration: 4500 };

    setToasts((prev) => [newToast, ...prev.slice(0, 3)]); // Keep at most 4 toasts

    setTimeout(() => {
      removeToast(id);
    }, 4800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openEmergency = () => {
    sounds.playEmergencyBeep();
    setIsEmergencyOpen(true);
  };

  const closeEmergency = () => {
    setIsEmergencyOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        soundEnabled,
        toggleSound,
        badges,
        unlockBadge,
        dramaLevel,
        setDramaLevel,
        toasts,
        addToast,
        removeToast,
        isEmergencyOpen,
        openEmergency,
        closeEmergency,
        visitCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
