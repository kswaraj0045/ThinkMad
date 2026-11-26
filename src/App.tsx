import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DesktopNav } from './components/common/DesktopNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { EmergencyModal } from './components/features/EmergencyModal';
import { QuitConfirmModal } from './components/common/QuitConfirmModal';
import { ShutdownScreen } from './components/common/ShutdownScreen';
import { sounds } from './utils/sound';

// Feature Views
import { HomeDashboard } from './components/features/HomeDashboard';
import { OverthinkingSimulator } from './components/features/OverthinkingSimulator';
import { MoodOfTheDay } from './components/features/MoodOfTheDay';
import { ExploreHub } from './components/features/ExploreHub';
import { BrainDiagnostics } from './components/features/BrainDiagnostics';
import { EmergencyView } from './components/features/EmergencyView';
import { SecretLetter } from './components/features/SecretLetter';
import { SmileGiftBox } from './components/features/SmileGiftBox';
import { ComplimentMachine } from './components/features/ComplimentMachine';

export const AppContent: React.FC = () => {
  const { currentTab, setCurrentTab, isEmergencyOpen, closeEmergency } = useApp();
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const isAllowingExitRef = useRef(false);

  // Intercept smartphone & browser Back button
  useEffect(() => {
    // Prime history stack
    window.history.replaceState({ app: 'rutuja', step: 1 }, '');
    window.history.pushState({ app: 'rutuja', step: 2 }, '');

    const handlePopState = () => {
      // If user confirmed exit, allow browser to navigate back freely
      if (isAllowingExitRef.current) {
        return;
      }

      // Re-push history immediately to prevent accidental app quit
      window.history.pushState({ app: 'rutuja', step: 2 }, '');

      // Priority 1: If emergency modal is open, close it
      if (isEmergencyOpen) {
        closeEmergency();
        return;
      }

      // Priority 2: If on a sub-screen, return to Home
      if (currentTab !== 'home') {
        setCurrentTab('home');
        return;
      }

      // Priority 3: On Home screen, trigger the dramatic Quit Confirm Modal
      sounds.playEmergencyBeep();
      setIsQuitModalOpen(true);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentTab, isEmergencyOpen, closeEmergency, setCurrentTab]);

  const handleStay = () => {
    setIsQuitModalOpen(false);
  };

  const handleExit = () => {
    isAllowingExitRef.current = true;
    setIsQuitModalOpen(false);

    // 1. Try closing window natively (works in PWA, homescreen standalone, and webviews)
    try {
      window.close();
    } catch {
      // ignore
    }

    // 2. If there is prior browser history before our app, navigate back
    if (window.history.length > 2) {
      window.history.go(-2);
    }

    // 3. Fallback: Display peaceful Shutdown Screen so user unambiguously exits session
    setIsExited(true);
  };

  const handleRestart = () => {
    isAllowingExitRef.current = false;
    setIsExited(false);
    window.history.pushState({ app: 'rutuja', step: 2 }, '');
  };

  if (isExited) {
    return <ShutdownScreen onRestart={handleRestart} />;
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'home':
        return <HomeDashboard />;
      case 'simulator':
        return <OverthinkingSimulator />;
      case 'mood':
        return <MoodOfTheDay />;
      case 'explore':
        return <ExploreHub />;
      case 'diagnostics':
        return <BrainDiagnostics />;
      case 'emergency':
        return <EmergencyView isModal={false} />;
      case 'letter':
        return <SecretLetter />;
      case 'gift':
        return <SmileGiftBox />;
      case 'compliment':
        return <ComplimentMachine />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Floating background decorative ambient elements (subtle, non-distracting) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pastel-pink/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-5 w-80 h-80 bg-pastel-lavender/30 rounded-full blur-3xl" />
      </div>

      {/* Header bar */}
      <Header />

      {/* Desktop / Tablet Top Navigation */}
      <DesktopNav />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-4 md:py-6 relative z-10 mobile-nav-spacer">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Global Toast System */}
      <ToastContainer />

      {/* Emergency Modal Overlay */}
      <EmergencyModal />

      {/* Quit Confirmation Drama Modal */}
      <QuitConfirmModal
        isOpen={isQuitModalOpen}
        onStay={handleStay}
        onExit={handleExit}
      />

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
