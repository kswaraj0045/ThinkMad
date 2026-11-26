export type NavigationTab = 
  | 'home'
  | 'simulator'
  | 'mood'
  | 'explore'
  | 'letter'
  | 'diagnostics'
  | 'emergency'
  | 'gift'
  | 'compliment';

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
