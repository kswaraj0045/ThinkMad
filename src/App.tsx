import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DesktopNav } from './components/common/DesktopNav';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { EmergencyModal } from './components/features/EmergencyModal';

// Feature Views
import { HomeDashboard } from './components/features/HomeDashboard';
import { OverthinkingSimulator } from './components/features/OverthinkingSimulator';
import { FBIBureau } from './components/features/FBIBureau';
import { RutujaOracle } from './components/features/RutujaOracle';
import { BrainDiagnostics } from './components/features/BrainDiagnostics';
import { EmergencyView } from './components/features/EmergencyView';
import { SecretLetter } from './components/features/SecretLetter';
import { ExtrasHub } from './components/features/ExtrasHub';

export const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'home':
        return <HomeDashboard />;
      case 'simulator':
        return <OverthinkingSimulator />;
      case 'fbi':
        return <FBIBureau />;
      case 'oracle':
        return <RutujaOracle />;
      case 'diagnostics':
        return <BrainDiagnostics />;
      case 'emergency':
        return <EmergencyView isModal={false} />;
      case 'letter':
        return <SecretLetter />;
      case 'extras':
        return <ExtrasHub />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      
      {/* Floating background decorative ambient elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pastel-pink/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-5 w-80 h-80 bg-pastel-lavender/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-pastel-peach/30 rounded-full blur-3xl" />
      </div>

      {/* Header bar */}
      <Header />

      {/* Desktop / Tablet Top Navigation */}
      <DesktopNav />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 md:py-6 relative z-10 mobile-nav-spacer">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
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

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
