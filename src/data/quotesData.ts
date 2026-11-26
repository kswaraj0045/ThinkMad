export const FUNNY_QUOTES = [
  "Overthinking: The art of creating problems that don't exist.",
  "Your brain deserves overtime payment with all the scenarios it produces.",
  "Relax. Even Google doesn't have all the answers.",
  "Not every notification is a life-changing event.",
  "I'm not saying you're dramatic, but Netflix wants to buy rights to your internal monologue.",
  "Stop overthinking. You're Swaraj's friend! ❤️",
  "My brain has 47 tabs open, 12 of them are frozen, and where is that music coming from?!",
  "If overthinking burned calories, Rutuja would be an Olympic athlete.",
  "Remember: Today's catastrophe is tomorrow's hilarious story over coffee.",
  "Breathe in calm... exhale the 14 imaginary arguments you practiced in the shower.",
  "Warning: Excessive analysis of 'k' vs 'ok' may cause severe eye-rolling.",
  "Current mood: 50% sweetheart, 50% worrying about things that will never happen.",
  "The awkward thing you said 3 years ago? No one remembers. They're too busy worrying about their own awkwardness.",
  "Dear Rutuja, please shut down unnecessary background applications to preserve battery.",
  "Life advice: When in doubt, take a nap. You can't overthink while snoring peacefully.",
  "Overthinking level: Wondering if the emoji was passive-aggressive.",
  "Sometimes the answer isn't deep. Sometimes people just drop their phone on their face while texting.",
  "You are one good snack away from feeling 80% better.",
  "Mental RAM is at 99%. Please close tab 'What did they mean by that sigh?'",
  "Don't worry about the world ending today. It's already tomorrow in Australia.",
  "Swaraj's Golden Rule: If it won't matter in 5 years, don't spend more than 5 minutes panicking.",
  "Overthinking is like a rocking chair: it gives you something to do, but gets you nowhere.",
  "Be kind to yourself. You are doing great, even when your thoughts say otherwise.",
  "Smile! You're cute, you're smart, and your brain is just being extra silly today."
];

export function getRandomQuote(): string {
  const idx = Math.floor(Math.random() * FUNNY_QUOTES.length);
  return FUNNY_QUOTES[idx];
}
