
export interface StepData {
  steps: number;
  calories: number;
  distance: number; // in km
  timestamp: string;
}

export interface DailyStats {
  date: string;
  steps: number;
  goal: number;
}

export interface UserProfile {
  name: string;
  weight: number; // kg
  stepGoal: number;
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  STATS = 'STATS',
  AI_COACH = 'AI_COACH',
  SETTINGS = 'SETTINGS'
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
