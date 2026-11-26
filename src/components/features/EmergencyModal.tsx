import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EmergencyView } from './EmergencyView';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyOpen, closeEmergency } = useApp();

  return (
    <AnimatePresence>
      {isEmergencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          {/* Backdrop with pulsing alarm glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEmergency}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-red-300 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeEmergency}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Close Emergency Window"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Embedded Emergency Component */}
            <div className="p-4 md:p-6">
              <EmergencyView isModal={true} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
