import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, HardDrive, RefreshCw, AlertTriangle, ShieldCheck, DownloadCloud } from 'lucide-react';
import { INITIAL_DIAGNOSTICS, INSTALLATION_STEPS } from '../../data/diagnosticsData';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerHeartConfetti } from '../../utils/confetti';

export const BrainDiagnostics: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [stepMessage, setStepMessage] = useState('');
  const [isInstallComplete, setIsInstallComplete] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleInstallPeaceOfMind = () => {
    sounds.playPop();
    setIsInstalling(true);
    setIsInstallComplete(false);
    setInstallProgress(5);
    setStepMessage(INSTALLATION_STEPS[0].message);

    // Sequence progress through steps
    INSTALLATION_STEPS.forEach((step, idx) => {
      setTimeout(() => {
        setInstallProgress(step.progress);
        setStepMessage(step.message);
        sounds.playPop();

        if (idx === INSTALLATION_STEPS.length - 1) {
          setTimeout(() => {
            setIsInstalling(false);
            setIsInstallComplete(true);
            sounds.playCelebration();
            triggerHeartConfetti();
            unlockBadge('badge-peace-mode');
            addToast("Installation Finished! 🕊️", "Peace of mind attempted. Overthinking remains indestructible.", "funny");
          }, 700);
        }
      }, (idx + 1) * 750);
    });
  };

  const handleRestartScan = () => {
    sounds.playPop();
    setIsScanning(true);
    setIsInstallComplete(false);
    setIsInstalling(false);
    setInstallProgress(0);

    setTimeout(() => {
      setIsScanning(false);
      sounds.playChime();
      addToast("Scan Complete 💻", "47 tabs still humming nicely. Zero damage detected.", "info");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-700 text-xs font-black tracking-wide uppercase">
          <Cpu className="w-3.5 h-3.5" />
          <span>Feature 04 • System Health</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          BRAIN.EXE SYSTEM DIAGNOSTICS 💻
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Checking Rutuja's brain performance...
        </p>
      </div>

      {/* Main Diagnostic Terminal Card */}
      <div className="glass-card rounded-3xl p-5 md:p-6 border border-pastel-lavender/80 shadow-soft space-y-5">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 pl-2">
              terminal://rutuja/brain-metrics
            </span>
          </div>

          <button
            onClick={handleRestartScan}
            disabled={isScanning || isInstalling}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-pastel-purple-accent transition-colors disabled:opacity-50"
            title="Re-run Diagnostic Scan"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-pastel-purple-accent' : ''}`} />
            <span>Restart Scan</span>
          </button>
        </div>

        {/* Diagnostic Metrics List */}
        <div className="space-y-3.5">
          {INITIAL_DIAGNOSTICS.map((metric, idx) => {
            const isCrit = metric.status === 'critical';
            const isWarn = metric.status === 'warning';

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs md:text-sm font-black text-slate-800">
                  <div className="flex items-center gap-1.5">
                    {isCrit && <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                    {isWarn && <HardDrive className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    {!isCrit && !isWarn && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    <span>{metric.label}</span>
                  </div>
                  <span
                    className={`font-mono px-2 py-0.5 rounded-md text-xs font-bold ${
                      isCrit
                        ? 'bg-rose-100 text-rose-700'
                        : isWarn
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {metric.value}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isScanning ? '50%' : `${metric.percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      isCrit
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                        : isWarn
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    }`}
                  />
                </div>

                <p className="text-[11px] text-slate-500 font-medium">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Installation Section */}
        <div className="pt-3 border-t border-slate-200/70">
          
          {!isInstalling && !isInstallComplete && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleInstallPeaceOfMind}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 text-white font-black text-sm md:text-base shadow-soft hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 group"
            >
              <DownloadCloud className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>INSTALL PEACE OF MIND</span>
            </motion.button>
          )}

          {/* Installation in progress */}
          {isInstalling && (
            <div className="space-y-3 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                  <span>{stepMessage}</span>
                </span>
                <span className="font-mono">{installProgress}%</span>
              </div>
              <div className="w-full bg-indigo-200/50 h-3 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  animate={{ width: `${installProgress}%` }}
                  transition={{ ease: 'easeInOut', duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Installation Complete Result Screen */}
          <AnimatePresence>
            {isInstallComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 md:p-5 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  🎉
                </div>

                {/* Required Final Message */}
                <h3 className="text-base md:text-lg font-black text-emerald-950 font-display">
                  Installation complete! Unfortunately, overthinking cannot be uninstalled. 😂
                </h3>

                <p className="text-xs md:text-sm text-emerald-800 font-medium max-w-md mx-auto leading-relaxed">
                  System patch applied successfully. Your dramatic brain has been declared a permanent feature, not a bug.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={handleRestartScan}
                    className="px-5 py-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run Another Scan</span>
                  </button>
                  <button
                    onClick={handleInstallPeaceOfMind}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all active:scale-95 shadow-sm"
                  >
                    Re-install Patch
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};
