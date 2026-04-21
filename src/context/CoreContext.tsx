import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserID, UserProfile, Notification,
  TravelPlan, FutureFamily, TimeCapsuleMessage, GeoTimeCapsule, HobbyProject
} from '../types';
import { kokabApi } from '../api';

interface CoreContextType {
  userId: UserID;
  theme: string;
  setTheme: (theme: string) => void;
  barakahPoints: number;
  addBarakahPoints: (pts: number) => void;
  notifications: Notification[];
  profiles: Record<UserID, UserProfile>;
  travel: TravelPlan[];
  family: FutureFamily | null;
  timeCapsules: TimeCapsuleMessage[];
  geoCapsules: GeoTimeCapsule[];
  hobbyProjects: HobbyProject[];
  
  // App Control
  emergencyMode: boolean;
  toggleEmergencyMode: () => void;
  populateTestData: () => void;
  resetApp: () => void;
}

const CoreContext = createContext<CoreContextType | undefined>(undefined);

export const CoreProvider: React.FC<{ children: React.ReactNode; currentUserId: UserID }> = ({ children, currentUserId }) => {
  const [theme, setThemeState] = useState<string>(localStorage.getItem('kokab-theme') || 'midnight');
  const [barakahPoints, setBarakahPoints] = useState(2500);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profiles, setProfiles] = useState<Record<UserID, UserProfile>>({
    F: { userId: 'F', name: 'فهد', joinedAt: Date.now() - 31536000000, delegatedSpendingCeiling: 1000, notificationSettings: { tasks: true, updates: true, athkar: true, financial: true, social: true }, taskSettings: { showDailyFilter: true } },
    B: { userId: 'B', name: 'بشرى', joinedAt: Date.now() - 31536000000, delegatedSpendingCeiling: 1000, notificationSettings: { tasks: true, updates: true, athkar: true, financial: true, social: true }, taskSettings: { showDailyFilter: true } }
  });
  const [travel, setTravel] = useState<TravelPlan[]>([]);
  const [family, setFamily] = useState<FutureFamily | null>(null);
  const [timeCapsules, setTimeCapsules] = useState<TimeCapsuleMessage[]>([]);
  const [geoCapsules, setGeoCapsules] = useState<GeoTimeCapsule[]>([]);
  const [hobbyProjects, setHobbyProjects] = useState<HobbyProject[]>([]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('kokab-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync initial state from server
  useEffect(() => {
    const fetchState = async () => {
      try {
        const { data } = await kokabApi.getState();
        if (data.barakahPoints !== undefined) setBarakahPoints(data.barakahPoints);
        if (data.emergencyMode !== undefined) setEmergencyMode(data.emergencyMode);
        if (data.profiles) setProfiles(data.profiles as any);
        if (data.notifications) setNotifications(data.notifications);
        if (data.travel) setTravel(data.travel);
        if (data.family) setFamily(data.family);
        if (data.timeCapsules) setTimeCapsules(data.timeCapsules);
        if (data.geoCapsules) setGeoCapsules(data.geoCapsules);
        if (data.hobbyProjects) setHobbyProjects(data.hobbyProjects);
      } catch (err) {
        console.error("Core sync failed", err);
      }
    };
    fetchState();
  }, [currentUserId]);

  const addBarakahPoints = (pts: number) => {
    setBarakahPoints(prev => {
      const newVal = prev + pts;
      kokabApi.updateState({ barakahPoints: newVal });
      return newVal;
    });
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(prev => {
      const newVal = !prev;
      kokabApi.updateState({ emergencyMode: newVal });
      return newVal;
    });
  };

  const populateTestData = async () => {
    const testState = {
      barakahPoints: 8450,
      tasks: [
        { id: 't1', title: 'شراء أغراض البيت', assignedTo: 'F', status: 'pending', priority: 'high', category: 'home', createdAt: Date.now() },
        { id: 't2', title: 'حجز موعد الطبيب', assignedTo: 'B', status: 'completed', priority: 'medium', category: 'health', createdAt: Date.now() }
      ],
      messages: [
        { id: 'm1', senderId: 'F', text: 'كيف حالك اليوم؟', timestamp: Date.now() - 100000, type: 'text', status: 'seen' },
        { id: 'm2', senderId: 'B', text: 'بخير والحمد لله ❤️', timestamp: Date.now() - 50000, type: 'text', status: 'seen' }
      ],
      transactions: [
        { id: 'tr1', amount: 350, type: 'variable', category: 'shopping', description: 'سوبر ماركت', timestamp: Date.now(), status: 'confirmed' }
      ],
      vitals: {
        F: { userId: 'F', weight: 80, sleepQuality: 90, steps: 8400, calories: 2100, googleFitConnected: true, lastSync: Date.now() },
        B: { userId: 'B', weight: 60, sleepQuality: 85, steps: 6200, calories: 1800, googleFitConnected: true, lastSync: Date.now() }
      }
    };
    try {
      await kokabApi.updateState(testState as any);
      window.location.reload();
    } catch (err) {
      console.error("Population failed", err);
    }
  };

  const resetApp = async () => {
    try {
      localStorage.clear();
      await kokabApi.updateState({ 
        barakahPoints: 2500, 
        tasks: [], 
        messages: [], 
        transactions: [],
        emergencyMode: false 
      } as any);
      window.location.reload();
    } catch (err) {
      console.error("Reset failed", err);
    }
  };

  return (
    <CoreContext.Provider value={{
      userId: currentUserId, theme, setTheme, barakahPoints, addBarakahPoints,
      notifications, profiles, travel, family, timeCapsules, geoCapsules, hobbyProjects,
      emergencyMode, toggleEmergencyMode, populateTestData, resetApp
    }}>
      {children}
    </CoreContext.Provider>
  );
};

export const useCore = () => {
  const context = useContext(CoreContext);
  if (!context) throw new Error('useCore must be used within CoreProvider');
  return context;
};
