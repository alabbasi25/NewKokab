import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  VitalSigns, Habit, WorshipSession, AthkarItem, MoodEntry, UserID, PlanetWeather,
  Streak, FocusState, HydrationLog, Book, QuranTracker, MoodConfig, PriorityConfig
} from '../types';
import { kokabApi } from '../api';

interface AfiyaContextType {
  vitals: Record<UserID, VitalSigns>;
  habits: Record<UserID, Habit[]>;
  worship: WorshipSession[];
  athkar: AthkarItem[];
  moodLogs: MoodEntry[];
  weather: PlanetWeather;
  streaks: Record<UserID, Streak>;
  focusStates: Record<UserID, FocusState>;
  hydrationLogs: HydrationLog[];
  library: Book[];
  quranTracker: QuranTracker | null;
  moodConfigs: MoodConfig[];
  priorityConfigs: PriorityConfig[];
  
  // Actions
  addHabit: (habit: Partial<Habit>) => void;
  updateHabit: (id: string, progress: number) => void;
  addMoodLog: (mood: MoodEntry['mood'], note?: string) => void;
  incrementAthkar: (id: string) => void;
  updateVitals: (data: Partial<VitalSigns>) => void;
}

const AfiyaContext = createContext<AfiyaContextType | undefined>(undefined);

export const AfiyaProvider: React.FC<{ children: React.ReactNode; userId: UserID }> = ({ children, userId }) => {
  const [vitals, setVitals] = useState<Record<UserID, VitalSigns>>({
    F: { userId: 'F', weight: 80, sleepQuality: 80, steps: 0, calories: 0, googleFitConnected: false, lastSync: 0 },
    B: { userId: 'B', weight: 60, sleepQuality: 80, steps: 0, calories: 0, googleFitConnected: false, lastSync: 0 }
  });
  const [habits, setHabits] = useState<Record<UserID, Habit[]>>({ F: [], B: [] });
  const [worship, setWorship] = useState<WorshipSession[]>([]);
  const [athkar, setAthkar] = useState<AthkarItem[]>([]);
  const [moodLogs, setMoodLogs] = useState<MoodEntry[]>([]);
  const [weather, setWeather] = useState<PlanetWeather>({ status: 'sunny', reason: 'Fresh start', suggestion: 'Enjoy!', timestamp: Date.now() });
  const [streaks, setStreaks] = useState<Record<UserID, Streak>>({
    F: { userId: 'F', count: 0, lastCompletedAt: Date.now() },
    B: { userId: 'B', count: 0, lastCompletedAt: Date.now() }
  });
  const [focusStates, setFocusStates] = useState<Record<UserID, FocusState>>({
    F: { userId: 'F', isActive: false, startTime: Date.now() },
    B: { userId: 'B', isActive: false, startTime: Date.now() }
  });
  const [hydrationLogs, setHydrationLogs] = useState<HydrationLog[]>([]);
  const [library, setLibrary] = useState<Book[]>([]);
  const [quranTracker, setQuranTracker] = useState<QuranTracker | null>(null);
  const [moodConfigs, setMoodConfigs] = useState<MoodConfig[]>([]);
  const [priorityConfigs, setPriorityConfigs] = useState<PriorityConfig[]>([]);

  // Sync initial state from server
  useEffect(() => {
    const fetchState = async () => {
      try {
        const { data } = await kokabApi.getState();
        if (data.vitals) setVitals(data.vitals as any);
        if (data.habits) setHabits(data.habits as any);
        if (data.worship) setWorship(data.worship);
        if (data.athkar) setAthkar(data.athkar);
        if (data.moodLogs) setMoodLogs(data.moodLogs);
        if (data.weather) setWeather(data.weather);
        if (data.streaks) setStreaks(data.streaks as any);
        if (data.focusStates) setFocusStates(data.focusStates as any);
        if (data.hydrationLogs) setHydrationLogs(data.hydrationLogs);
        if (data.library) setLibrary(data.library);
        if (data.quranTracker) setQuranTracker(data.quranTracker);
        if (data.moodConfigs) setMoodConfigs(data.moodConfigs);
        if (data.priorityConfigs) setPriorityConfigs(data.priorityConfigs);
      } catch (err) {
        console.error("Afiya sync failed", err);
      }
    };
    fetchState();
  }, [userId]);

  const addHabit = (habit: Partial<Habit>) => {
    const newHabit: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      title: habit.title || '',
      progress: 0,
      target: habit.target || 100,
      unit: habit.unit || '%',
      color: habit.color || 'blue',
      lastUpdated: Date.now(),
      ...habit
    };
    const updated = { ...habits, [userId]: [...habits[userId], newHabit] };
    setHabits(updated);
    kokabApi.updateState({ habits: updated });
  };

  const updateHabit = (id: string, progress: number) => {
    const userHabits = habits[userId].map(h => h.id === id ? { ...h, progress, lastUpdated: Date.now() } : h);
    const updated = { ...habits, [userId]: userHabits };
    setHabits(updated);
    kokabApi.updateState({ habits: updated });
  };

  const addMoodLog = (mood: MoodEntry['mood'], note?: string) => {
    const entry: MoodEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      mood,
      note,
      timestamp: Date.now()
    };
    setMoodLogs(prev => [entry, ...prev]);
    kokabApi.updateState({ moodLogs: [entry, ...moodLogs] });
  };

  const incrementAthkar = (id: string) => {
    const updated = athkar.map(a => a.id === id ? { 
      ...a, 
      count: { ...a.count, [userId]: a.count[userId] + 1 } 
    } : a);
    setAthkar(updated);
    kokabApi.updateState({ athkar: updated });
  };

  const updateVitals = (data: Partial<VitalSigns>) => {
    const newVitals = { ...vitals, [userId]: { ...vitals[userId], ...data, lastSync: Date.now() } };
    setVitals(newVitals);
    kokabApi.updateState({ vitals: newVitals });
  };

  return (
    <AfiyaContext.Provider value={{
      vitals, habits, worship, athkar, moodLogs, weather, streaks, focusStates, hydrationLogs, library, quranTracker, moodConfigs, priorityConfigs,
      addHabit, updateHabit, addMoodLog, incrementAthkar, updateVitals
    }}>
      {children}
    </AfiyaContext.Provider>
  );
};

export const useAfiya = () => {
  const context = useContext(AfiyaContext);
  if (!context) throw new Error('useAfiya must be used within AfiyaProvider');
  return context;
};
