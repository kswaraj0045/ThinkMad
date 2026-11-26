export const SMILE_MESSAGES = [
  "Reminder: The awkward thing you did 3 years ago? Nobody remembers it except your 2 AM brain.",
  "You're like a cup of warm tea on a rainy afternoon—cozy, comforting, and essential.",
  "If overthinking burned calories, you would have won an Olympic gold medal by now! 😂",
  "Fun fact: Even penguins trip over their own feet sometimes and they still look adorable. Just like you.",
  "Swaraj officially certifies: Today is guaranteed to turn out better than you think.",
  "Whenever you doubt yourself, remember who's friend you are. (Hint: Swaraj's! ❤️)",
  "Your smile looks infinitely better than your 'I am analyzing a single punctuation mark' face.",
  "The world would be 47% less entertaining without your dramatic commentary.",
  "Life advice: When life gets messy, take a deep breath and blame it on mercury in retrograde.",
  "Did you know? Otters hold hands while sleeping so they don't float away. Consider this a mental hand-hold!",
  "Warning: Rutuja's level of cuteness has exceeded local regulatory limits.",
  "You don't need a five-year plan for today. You just need to get through today with a smile.",
  "Take a look in the mirror: that person is doing much better than she gives herself credit for.",
  "A good laugh is currently on its way to you within the next few hours. Get ready!",
  "You are allowed to take up space, make mistakes, and laugh at ridiculous things.",
  "Whatever you are stressing about right now will make a hilarious story 6 months from now.",
  "Swaraj sent you this reminder: Drink some water, drop your shoulders, and relax your jaw.",
  "Congratulations! You have survived 100% of your worst imaginary catastrophe scenarios.",
  "Not every notification is a life emergency. Put the phone down and breathe.",
  "You have a heart of gold and a brain with too many open tabs. Both are lovable.",
  "Emergency happiness protocol: Close your eyes, think of your favorite dessert, and smile. ✨",
  "Stop overthinking, you're Swaraj's friend! ❤️ (This message never gets old!)"
];

export function getRandomSmileMessage(): string {
  const idx = Math.floor(Math.random() * SMILE_MESSAGES.length);
  return SMILE_MESSAGES[idx];
}
