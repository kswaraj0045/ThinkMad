export interface DiagnosticMetric {
  label: string;
  value: string;
  percent: number;
  status: 'critical' | 'warning' | 'normal' | 'funny';
  description: string;
}

export const INITIAL_DIAGNOSTICS: DiagnosticMetric[] = [
  {
    label: "Brain RAM Utilization",
    value: "99.8%",
    percent: 99,
    status: "critical",
    description: "47 mental tabs open simultaneously with 4K background video of past cringe moments."
  },
  {
    label: "Overthinking CPU Core",
    value: "100% Turbo",
    percent: 100,
    status: "critical",
    description: "Processor overheating from calculating 38 possible meanings of a single punctuation mark."
  },
  {
    label: "Unnecessary Scenarios",
    value: "847 Active",
    percent: 94,
    status: "warning",
    description: "Bollywood drama generator operating without proper entertainment license."
  },
  {
    label: "Peace of Mind",
    value: "404 Not Found",
    percent: 12,
    status: "critical",
    description: "Server requested serenity. Received: 'Did I leave the stove on?' instead."
  },
  {
    label: "Midnight Sleep Protocol",
    value: "Disabled",
    percent: 5,
    status: "warning",
    description: "Overruled by late-night existential symposium committee."
  },
  {
    label: "Swaraj Friendship Firewall",
    value: "100% Active ❤️",
    percent: 100,
    status: "normal",
    description: "Shielding Rutuja from unnecessary self-doubt since day one."
  }
];

export const INSTALLATION_STEPS = [
  { message: "Initializing PeaceOfMind.dll...", progress: 15 },
  { message: "Scanning for imaginary problems...", progress: 32 },
  { message: "Deleting 3,412 shower arguments...", progress: 54 },
  { message: "Downloading chill vibes & hot chocolate...", progress: 73 },
  { message: "Applying Swaraj's anti-overthinking patch v2.0...", progress: 91 },
  { message: "Finalizing brain defragmentation...", progress: 100 }
];
