import { SimulationResult } from '../types';

export const SIMULATOR_PRESETS = [
  "Someone replied with 'K' instead of 'Okay'",
  "They saw my story in 30 seconds but didn't reply to my DM",
  "My friend walked past me and didn't wave (or did they?)",
  "Teacher / Boss said: 'Can we talk for 2 minutes?'",
  "I said 'You too' when the waiter said 'Enjoy your food'",
  "Woke up at 3:17 AM and remembered an awkward thing from 2018",
  "Left on 'Delivered' for 47 minutes",
  "They used a period at the end of their text instead of an emoji"
];

const DRAMA_LEVELS = [
  "UNLIMITED 🔥",
  "BOLLYWOOD CLIMAX 🎬",
  "CRITICAL MELTDOWN 🤯",
  "OSCAR NOMINATED 🏆",
  "LEVEL 999 PARANOIA 🚨",
  "EXISTENTIAL CRISIS ✨"
];

const HEADLINES = [
  "Your brain has already imagined 17 possible endings.",
  "Congratulations! You turned a 2-second situation into a 3-season Netflix series.",
  "Your brain is currently producing a movie that nobody asked for.",
  "Breaking News: Rutuja is overthinking again.",
  "Situation detected. Drama level: UNLIMITED.",
  "Local Brain creates entire dystopian universe over a simple punctuation mark.",
  "Forensic report confirms: 99.4% of this problem does not exist."
];

const NETFLIX_SYNOPSES = [
  "In a world where a text message arrives without an exclamation mark, one brave girl named Rutuja must decipher the hidden betrayal threatening her weekend.",
  "A high-stakes thriller spanning 5 alternate realities, where a friend looking in your general direction triggers an international diplomatic crisis.",
  "Based on a true story: A 4-second awkward pause turns into an emotional monologue worthy of Sanjay Leela Bhansali with full background violin score.",
  "Season 1: The Silence. Season 2: The Conspiracy. Season 3: Realizing they just left their phone in the kitchen while eating samosas."
];

const TRAJECTORY_STEPS = [
  [
    "Phase 1: Innocent event occurs.",
    "Phase 2: Brain registers suspicion.",
    "Phase 3: Re-reading chat history from 6 months ago.",
    "Phase 4: Preparing for a hypothetical confrontation that will never happen.",
    "Final Status: Exhausted, but looking cute."
  ],
  [
    "Step 1: Normal human interaction.",
    "Step 2: 'Did my tone sound weird?'",
    "Step 3: Calculating their astrological alignment.",
    "Step 4: Writing a mental apology letter.",
    "Step 5: They were actually just taking a nap."
  ],
  [
    "00:00 - Small incident.",
    "00:05 - Analysis begins.",
    "00:30 - Consulted FBI intuition database.",
    "01:00 - Concluded the entire universe is testing my patience.",
    "01:15 - Swaraj reminds me: 'Stop overthinking, you're my friend!'"
  ]
];

const OVERTHINKING_ADVICES = [
  "Recommendation: Drink a glass of water, eat a snack, and close this tab! 🥤",
  "Friendly reminder: They probably just sneezed and forgot their phone. Relax! 😂",
  "Medical diagnosis: 0% real danger, 100% dramatic genius. 💖",
  "Swaraj's emergency order: Stop thinking so hard, your brain needs sleep! 🛌",
  "Universe update: Everyone is busy worrying about themselves, not your 2-second awkwardness! ✨"
];

export function generateSimulation(situation: string): SimulationResult {
  const cleanSituation = situation.trim() || "A totally normal, harmless situation";
  const headline = HEADLINES[Math.floor(Math.random() * HEADLINES.length)];
  const dramaLevel = DRAMA_LEVELS[Math.floor(Math.random() * DRAMA_LEVELS.length)];
  const netflixSynopsis = NETFLIX_SYNOPSES[Math.floor(Math.random() * NETFLIX_SYNOPSES.length)];
  const trajectory = TRAJECTORY_STEPS[Math.floor(Math.random() * TRAJECTORY_STEPS.length)];
  const advice = OVERTHINKING_ADVICES[Math.floor(Math.random() * OVERTHINKING_ADVICES.length)];
  const imaginedEndings = Math.floor(Math.random() * 25) + 12; // 12 to 36
  const energy = Math.floor(Math.random() * 400) + 750; // 750% to 1150%

  return {
    id: 'sim-' + Date.now(),
    situation: cleanSituation,
    headline,
    dramaLevel,
    netflixSynopsis,
    brainTrajectory: trajectory,
    imaginedEndings,
    overthinkingEnergy: energy,
    advice
  };
}
