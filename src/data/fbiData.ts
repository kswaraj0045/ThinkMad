import { InvestigationReport } from '../types';

export const FBI_PRESETS = [
  "He didn't use an emoji in the last reply.",
  "Group chat went silent right after I sent a meme.",
  "They smiled while looking at their phone during dinner.",
  "My friend said 'Sure' with a full stop.",
  "Someone liked a post from 3 weeks ago at 2 AM.",
  "They viewed my WhatsApp status within 4 seconds."
];

const VERDICTS = [
  "Insufficient evidence. Stop creating imaginary problems.",
  "Case closed. Nobody is plotting against you.",
  "Your brain is the primary suspect.",
  "Overthinking detected. Investigation recommends a snack break.",
  "Acquitted of all charges: The other person was literally eating Maggi.",
  "False Alarm: Subject is simply a normal overthinking princess."
];

const SUSPICION_LEVELS = [
  "99.9% (Dangerously Imaginary)",
  "404% (Suspicion Exceeds Server Capacity)",
  "MAXIMUM BOLLYWOOD DRAMA",
  "88.4% (Cuteness with a touch of paranoia)",
  "100% (Pure Cinematic Fiction)"
];

const CONCLUSIONS = [
  "Agent Fox from the feelings division concludes: Rutuja's brain has fabricated a 6-chapter mystery novel out of a 2-word message.",
  "Forensic analysis of the typing cadence reveals: They were walking to the fridge and dropped their phone. No hidden insult found.",
  "Special Inspector Swaraj certifies: The victim is completely safe, highly dramatic, and in urgent need of hot chocolate.",
  "The Bureau recommends immediate confiscation of all midnight imaginary debate scenarios.",
  "Surveillance audio confirms: The target actually thinks you are hilarious and cool. Case dismissed with hugs."
];

const EVIDENCE_LIST = [
  "Lack of cheerful punctuation marks in paragraph 1",
  "14 minutes of unexplained radio silence",
  "Excessive mental cinema without cinematic license",
  "Zero actual proof of any bad intention",
  "High levels of overthinking hormone detected in coffee cup",
  "Witness testimony: 'She looked at her screen and sighed deeply'"
];

export function generateFBIReport(situation: string): InvestigationReport {
  const cleanSituation = situation.trim() || "Unspecified micro-incident in daily life";
  const caseNumber = Math.floor(1000 + Math.random() * 9000);
  const drama = Math.floor(Math.random() * 150) + 120; // 120% to 270%
  const verdict = VERDICTS[Math.floor(Math.random() * VERDICTS.length)];
  const suspicion = SUSPICION_LEVELS[Math.floor(Math.random() * SUSPICION_LEVELS.length)];
  const conclusion = CONCLUSIONS[Math.floor(Math.random() * CONCLUSIONS.length)];

  // Pick 3 random pieces of evidence
  const shuffledEvidence = [...EVIDENCE_LIST].sort(() => 0.5 - Math.random()).slice(0, 3);

  return {
    caseId: `FBI-RTJ-${caseNumber}`,
    situation: cleanSituation,
    suspicionLevel: suspicion,
    dramaPercentage: drama,
    status: 'SOLVED (IT WAS ALL IN YOUR HEAD)',
    primarySuspect: "Rutuja's Overactive Imagination 🧠",
    verdict,
    funnyConclusion: conclusion,
    evidenceFound: shuffledEvidence,
    recommendedAction: "Prescribe 1 warm drink, 2 deep breaths, and a text to Swaraj.",
    investigatorNotes: "Subject shows high creativity and excessive tab-opening syndrome. Prognosis: She'll be fine in 10 minutes.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
