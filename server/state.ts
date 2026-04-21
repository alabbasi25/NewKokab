import { KokabState, UserID } from '../src/types.ts';

// In-memory state for now, but easily swappable with a persistent DB
export const initialAppState: Partial<KokabState> = {
  barakahPoints: 2500,
  emergencyMode: false,
  smartHydrationEnabled: true,
  tasks: [],
  inventory: [],
  transactions: [],
  liabilities: [],
  athkar: [],
  messages: [],
  gratitudeFeed: [],
  conflictRoom: [],
  romancePrompts: [],
  moodLogs: [],
  worship: [],
  calendar: [],
  assets: [],
  vault: [],
  consensusRequests: [],
  journal: [],
  vitals: { 
    F: { userId: 'F', weight: 80, sleepQuality: 80, steps: 0, calories: 0, googleFitConnected: false, lastSync: Date.now() }, 
    B: { userId: 'B', weight: 60, sleepQuality: 80, steps: 0, calories: 0, googleFitConnected: false, lastSync: Date.now() } 
  },
  habits: { F: [], B: [] },
  streaks: { 
    F: { userId: 'F', count: 0, lastCompletedAt: Date.now() }, 
    B: { userId: 'B', count: 0, lastCompletedAt: Date.now() } 
  },
  planetHealth: { 
    score: 85, 
    breakdown: { logistics: 80, finance: 90, spiritual: 85, health: 85 } 
  },
  weather: { status: 'sunny', reason: 'Fresh start', suggestion: 'Enjoy the day!', timestamp: Date.now() },
  permissions: [],
  deadManSwitch: { lastCheck: Date.now(), nextCheck: Date.now() + 86400000, status: 'active' },
  fitnessBattle: { 
    F: { steps: 0, calories: 0 }, 
    B: { steps: 0, calories: 0 } 
  },
  budget: { monthlyLimit: 5000, categories: [], lastReset: Date.now() },
  notifications: [],
  challenges: [],
  library: [],
  focusStates: { 
    F: { userId: 'F', isActive: false, startTime: Date.now() }, 
    B: { userId: 'B', isActive: false, startTime: Date.now() } 
  },
  hydrationLogs: [],
  timeCapsules: [],
  geoCapsules: [],
  rouletteTasks: [],
  hobbyProjects: [],
  loveLanguages: [],
  coinStaking: { amount: 0, rewardRate: 0.05, rewards: 0 },
  quranTracker: { logs: { F: [], B: [] }, totalVerses: 6236 },
  moodConfigs: [],
  priorityConfigs: [],
  profiles: {
    F: { userId: 'F', name: 'فهد', joinedAt: Date.now() - 31536000000, delegatedSpendingCeiling: 1000, notificationSettings: { tasks: true, updates: true, athkar: true, financial: true, social: true }, taskSettings: { showDailyFilter: true } },
    B: { userId: 'B', name: 'بشرى', joinedAt: Date.now() - 31536000000, delegatedSpendingCeiling: 1000, notificationSettings: { tasks: true, updates: true, athkar: true, financial: true, social: true }, taskSettings: { showDailyFilter: true } }
  }
};

let appState = { ...initialAppState, lastUpdate: Date.now() };

export const getState = () => appState;

export const updateState = (newState: Partial<KokabState>) => {
  appState = { ...appState, ...newState, lastUpdate: Date.now() };
  return appState;
};

// Users status cache
export const userStatus: Record<UserID, { status: string, lastActive: number }> = {
  F: { status: 'offline', lastActive: Date.now() },
  B: { status: 'offline', lastActive: Date.now() }
};
