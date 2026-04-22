import { create } from 'zustand';
import { UserProfile, Partnership } from '../types';

interface AppState {
  user: UserProfile | null;
  partner: UserProfile | null;
  partnership: Partnership | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: UserProfile | null) => void;
  setPartner: (partner: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  
  // Sync logic
  syncWithPartner: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    userId: 'user_test_1',
    name: 'مستخدم تجريبي',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    joinedAt: Date.now(),
    delegatedSpendingCeiling: 1000,
    notificationSettings: {
      tasks: true,
      updates: true,
      athkar: true,
      financial: true,
      social: true
    },
    taskSettings: {
      showDailyFilter: true
    }
  },
  partner: {
    userId: 'partner_test_1',
    name: 'شريك تجريبي',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=partner',
    joinedAt: Date.now(),
    delegatedSpendingCeiling: 1000,
    notificationSettings: {
      tasks: true,
      updates: true,
      athkar: true,
      financial: true,
      social: true
    },
    taskSettings: {
      showDailyFilter: true
    }
  },
  partnership: {
    id: 'ps_test_1',
    partnerIds: ['user_test_1', 'partner_test_1'],
    status: 'active',
    settings: {
      sharedBudget: true,
      sharedTasks: true
    }
  },
  isLoading: false,
  
  setUser: (user) => set({ user }),
  setPartner: (partner) => set({ partner }),
  setLoading: (isLoading) => set({ isLoading }),
  
  syncWithPartner: () => {
    // Shared state logic
  }
}));
