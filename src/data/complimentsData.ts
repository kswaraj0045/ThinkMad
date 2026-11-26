export const COMPLIMENTS = [
  "You have an infectious positive energy that brightens up any room you walk into.",
  "Your sense of humor is top-tier—you make everyday moments so much more fun.",
  "You are genuinely one of the sweetest and most caring friends anyone could ask for.",
  "Your brain might overthink, but your heart always has the purest intentions.",
  "You handle life with so much grace, even when you feel like you're secretly winging it.",
  "Your laugh is genuinely contagious and impossible not to smile at.",
  "You have great taste in friends—especially Swaraj! 😉",
  "You are stronger, wiser, and far more resilient than you ever give yourself credit for.",
  "The world is a much warmer and kinder place simply because you exist in it.",
  "You bring comfort to people just by being your authentic, wonderful self.",
  "You have that rare ability to make people feel heard, valued, and special.",
  "Your chaotic dramatic moments are honestly one of your most endearing qualities.",
  "You have an amazing eye for detail—even if you occasionally use it to overanalyze texts! 😂",
  "You look cute even when you're deeply lost in an imaginary overthinking spiral.",
  "You deserve all the peaceful nights, cozy blankets, and warm snacks in the universe.",
  "You are a rare gem of a friend and Swaraj is lucky to know you! ❤️",
  "Your kindness doesn't go unnoticed. People cherish having you in their lives.",
  "You are effortlessly charming and lovable, exactly the way you are.",
  "You bring out the best in the people around you.",
  "Never change, Rutuja. You are wonderful, unique, and irreplaceable."
];

export function getRandomCompliment(): string {
  const idx = Math.floor(Math.random() * COMPLIMENTS.length);
  return COMPLIMENTS[idx];
}
