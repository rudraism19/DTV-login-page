export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: 'Technical' | 'Analytical' | 'Practical' | 'Soft Skills';
  description: string;
}

export interface SyncSource {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSynced?: string;
  status: 'idle' | 'syncing' | 'synced' | 'failed';
  metrics: string[];
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  mobileNumber?: string;
  role?: string;
  city?: string;
  fieldOfStudy: string;
  targetCareer: string;
  skills: Skill[];
  studyHours: number;
  xp: number;
  level: number;
  syncSources: SyncSource[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  durationHours: number;
  skillImpacts: { skillName: string; increase: number }[];
  examImpact: number; // impact on predicted exam score
}
