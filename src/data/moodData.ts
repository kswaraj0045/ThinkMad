export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  headline: string;
  message: string;
  prescription: string;
  color: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'happy',
    emoji: '😊',
    label: 'Happy',
    headline: 'Yay! Rutuja is thriving today!',
    message: 'Protect this golden mood at all costs! Do not let any 2-second awkward interaction ruin this masterpiece of a day.',
    prescription: 'Enjoy your favorite snack and spread those good vibes ✨',
    color: 'from-amber-100 to-pink-100 border-amber-300 text-amber-800'
  },
  {
    id: 'sleepy',
    emoji: '😴',
    label: 'Sleepy',
    headline: 'Low Battery Alert 🔋',
    message: 'Your brain has calculated 4,000 thoughts today. No wonder it wants to shut down. Go nap guilt-free!',
    prescription: 'Wrap yourself in a blanket like a cute burrito and snooze.',
    color: 'from-blue-100 to-indigo-100 border-blue-300 text-blue-800'
  },
  {
    id: 'sad',
    emoji: '🥺',
    label: 'Sad',
    headline: 'Sending you the biggest virtual hug ❤️',
    message: 'It is totally okay to not feel 100% today. Whatever is heavy right now will pass. Remember: you are deeply appreciated and loved.',
    prescription: "Swaraj's reminder: 'Stop overthinking, you're Swaraj's friend!' ❤️",
    color: 'from-rose-100 to-purple-100 border-rose-300 text-rose-800'
  },
  {
    id: 'excited',
    emoji: '🤩',
    label: 'Excited',
    headline: 'High Voltage Main-Character Energy! ⚡',
    message: 'Rutuja is ready to conquer the world! Keep this sparkling energy going, but please remember to stay hydrated.',
    prescription: 'Blast your favorite hype song and dance around!',
    color: 'from-purple-100 to-pink-100 border-purple-300 text-purple-800'
  },
  {
    id: 'confused',
    emoji: '😵‍💫',
    label: 'Confused',
    headline: 'Too Many Life Plot Twists?',
    message: 'You do not need to figure out the next 10 years of your life before dinner time. Take it one tiny step at a time.',
    prescription: 'Drink a glass of cold water and pause all imaginary scenarios.',
    color: 'from-amber-100 to-teal-100 border-teal-300 text-teal-800'
  },
  {
    id: 'dramatic',
    emoji: '🎭',
    label: 'Dramatic',
    headline: 'Bollywood Background Score Initiated 🎬',
    message: 'The Oscars called—they want to nominate your internal monologue for Best Original Screenplay!',
    prescription: 'Own the drama, have a hearty laugh at yourself, and smile.',
    color: 'from-fuchsia-100 to-rose-100 border-fuchsia-300 text-fuchsia-800'
  }
];
