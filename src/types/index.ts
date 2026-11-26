export type NavigationTab = 
  | 'home'
  | 'simulator'
  | 'fbi'
  | 'oracle'
  | 'diagnostics'
  | 'emergency'
  | 'letter'
  | 'extras';

export interface InvestigationReport {
  caseId: string;
  situation: string;
  suspicionLevel: string;
  dramaPercentage: number;
  status: string;
  primarySuspect: string;
  verdict: string;
  funnyConclusion: string;
  evidenceFound: string[];
  recommendedAction: string;
  investigatorNotes: string;
  timestamp: string;
}

export interface OraclePrediction {
  id: string;
  prediction: string;
  moodAdvice: string;
  cosmicSign: string;
  luckySnack: string;
  overthinkingAntidote: string;
}

export interface SimulationResult {
  id: string;
  situation: string;
  headline: string;
  dramaLevel: string;
  netflixSynopsis: string;
  brainTrajectory: string[];
  imaginedEndings: number;
  overthinkingEnergy: number;
  advice: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
  category: 'starter' | 'explorer' | 'master' | 'secret';
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'funny' | 'warning' | 'love';
  duration?: number;
}
