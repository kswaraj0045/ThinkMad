import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { generateFBIReport, FBI_PRESETS } from '../../data/fbiData';
import { InvestigationReport } from '../../types';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/sound';
import { triggerPastelCelebration } from '../../utils/confetti';

export const FBIBureau: React.FC = () => {
  const { unlockBadge, addToast } = useApp();
  const [situation, setSituation] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [report, setReport] = useState<InvestigationReport | null>(null);

  const handleStartInvestigation = (customText?: string) => {
    const text = customText !== undefined ? customText : situation;
    if (!text.trim()) {
      addToast("Suspicion Missing! 🕵️‍♀️", "Enter a message or pick an incident below to investigate.", "warning");
      return;
    }

    sounds.playPop();
    setIsInvestigating(true);

    setTimeout(() => {
      const generated = generateFBIReport(text);
      setReport(generated);
      setIsInvestigating(false);
      sounds.playChime();
      triggerPastelCelebration();
      unlockBadge('badge-fbi-investigator');
    }, 1100);
  };

  const handleReset = () => {
    sounds.playPop();
    setReport(null);
    setSituation('');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 text-xs font-black tracking-wide uppercase">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Feature 03 • Forensic Feelings</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-display">
          FBI: FEELINGS BUREAU OF INVESTIGATION 🕵️‍♀️
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-md mx-auto">
          Because apparently, every small thing needs a full investigation.
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-card rounded-3xl p-5 border border-pastel-lavender/80 shadow-soft space-y-4">
        <div>
          <label className="block text-xs font-black uppercase text-slate-600 mb-2 tracking-wider">
            Enter a message or situation...
          </label>
          <input
            type="text"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="e.g. They saw my story in 30 seconds but didn't reply to my DM..."
            className="w-full p-3.5 rounded-2xl bg-white border border-pastel-lavender focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-800 text-sm font-medium transition-all shadow-inner"
          />
        </div>

        {/* Action Button: Required START INVESTIGATION 🔍 */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            disabled={isInvestigating}
            onClick={() => handleStartInvestigation()}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pastel-purple-accent text-white font-black text-sm md:text-base shadow-soft hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isInvestigating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>FORENSIC ANALYSIS IN PROGRESS...</span>
              </>
            ) : (
              <>
                <span>START INVESTIGATION 🔍</span>
              </>
            )}
          </motion.button>

          {report && (
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all shrink-0"
            >
              Reset Investigation
            </button>
          )}
        </div>

        {/* Quick presets */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Suspicious evidence case files:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {FBI_PRESETS.slice(0, 4).map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSituation(preset);
                  handleStartInvestigation(preset);
                }}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-600 font-semibold transition-all active:scale-95 text-left"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Investigation Report Card */}
      <AnimatePresence mode="wait">
        {report && (
          <motion.div
            key={report.caseId}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white rounded-3xl p-5 md:p-7 border-2 border-indigo-200 shadow-soft-lg space-y-5 relative overflow-hidden"
          >
            {/* Fake Bureau Watermark & Top header */}
            <div className="border-b-2 border-dashed border-indigo-100 pb-4 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    FBI
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-indigo-950 tracking-wider">
                      Official Dossier
                    </h3>
                    <p className="text-[11px] font-bold text-indigo-600">
                      CASE ID: {report.caseId}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                  STATUS: {report.status}
                </div>
              </div>

              <p className="text-xs text-slate-600 italic pt-1">
                Incident logged: "{report.situation}"
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[10px] uppercase font-bold text-slate-500">Suspicion Level</span>
                <p className="text-xs md:text-sm font-extrabold text-indigo-900 mt-0.5">
                  {report.suspicionLevel}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100">
                <span className="text-[10px] uppercase font-bold text-slate-500">Drama Percentage</span>
                <p className="text-xs md:text-sm font-extrabold text-rose-600 mt-0.5">
                  {report.dramaPercentage}% Drama
                </p>
              </div>
            </div>

            {/* Primary Suspect */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-amber-700">Primary Suspect:</span>
                <p className="text-xs md:text-sm font-black text-amber-950 mt-0.5">
                  {report.primarySuspect}
                </p>
              </div>
              <span className="text-2xl">🕵️</span>
            </div>

            {/* Evidence List */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                Forensic Evidence Log:
              </h4>
              <ul className="space-y-1 bg-slate-50 rounded-2xl p-3 border border-slate-200">
                {report.evidenceFound.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Final Verdict Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 border border-purple-200 space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">
                Official Bureau Verdict:
              </span>
              <p className="text-sm md:text-base font-black text-slate-900 leading-snug">
                "{report.verdict}"
              </p>
            </div>

            {/* Detective Conclusion */}
            <div className="text-xs md:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed font-medium">
              <p className="font-bold text-slate-800 mb-1">Detective Special Agent Notes:</p>
              {report.funnyConclusion}
            </div>

            {/* Official Bureau Stamp */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="inline-block px-4 py-1.5 rounded-xl border-2 border-red-500 text-red-600 font-black text-xs uppercase tracking-widest rotate-[-3deg] shadow-sm">
                APPROVED: 0% REAL DANGER
              </div>

              {/* Reset investigation button */}
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Close Case & Reset</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
