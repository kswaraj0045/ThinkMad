import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, Smile, Heart, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type: string = 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'funny':
        return <Smile className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'love':
        return <Heart className="w-4 h-4 text-pink-500 shrink-0 fill-pink-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-pastel-purple-accent shrink-0" />;
    }
  };

  return (
    <div className="fixed top-14 left-0 right-0 z-50 pointer-events-none flex flex-col items-center px-4 gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            className="pointer-events-auto max-w-sm w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-lg border border-pastel-purple/30 p-3 flex items-start gap-2.5"
          >
            <div className="mt-0.5">{getIcon(toast.type)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-extrabold text-slate-800 line-clamp-1">
                {toast.title}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-0.5">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
