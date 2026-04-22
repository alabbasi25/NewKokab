import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Task, KanbanItem, CalendarEvent, Transaction, Liability, UserID, Permission, 
  ConsensusRequest, SecureDocument, VisionBoardGoal,
  DeadManSwitch, FitnessBattle, Budget, Challenge, ArbitrationRequest
} from '../types';
import { kokabApi } from '../api';

interface NizamContextType {
  tasks: Task[];
  inventory: KanbanItem[];
  calendar: CalendarEvent[];
  transactions: Transaction[];
  liabilities: Liability[];
  assets: VisionBoardGoal[];
  vault: SecureDocument[];
  permissions: Permission[];
  consensusRequests: ConsensusRequest[];
  arbitrationRequests: ArbitrationRequest[];
  deadManSwitch: DeadManSwitch | null;
  fitnessBattle: FitnessBattle | null;
  budget: Budget | null;
  challenges: Challenge[];
  rouletteTasks: string[];
  categoryIconConfigs: Record<string, string>; // category -> icon name
  
  // Actions
  addTask: (task: Partial<Task>) => void;
  updateTask: (id: string, data: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateInventory: (id: string, newStock: number) => void;
  addTransaction: (t: Partial<Transaction>) => void;
  requestConsensus: (type: ConsensusRequest['type'], data: any) => void;
  resolveConsensus: (id: string, approved: boolean) => void;
  updateChallengeProgress: (id: string, userId: UserID, progress: number) => void;
  updateCategoryIcon: (category: string, icon: string) => void;
}

const NizamContext = createContext<NizamContextType | undefined>(undefined);

export const NizamProvider: React.FC<{ children: React.ReactNode; userId: UserID }> = ({ children, userId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inventory, setInventory] = useState<KanbanItem[]>([]);
  const [calendar, setCalendar] = useState<CalendarEvent[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const [assets, setAssets] = useState<VisionBoardGoal[]>([]);
  const [vault, setVault] = useState<SecureDocument[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [consensusRequests, setConsensusRequests] = useState<ConsensusRequest[]>([]);
  const [arbitrationRequests, setArbitrationRequests] = useState<ArbitrationRequest[]>([]);
  const [deadManSwitch, setDeadManSwitch] = useState<DeadManSwitch | null>(null);
  const [fitnessBattle, setFitnessBattle] = useState<FitnessBattle | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [rouletteTasks, setRouletteTasks] = useState<string[]>([]);
  const [categoryIconConfigs, setCategoryIconConfigs] = useState<Record<string, string>>({
    home: 'Home',
    work: 'Briefcase',
    personal: 'User',
    other: 'MoreHorizontal'
  });

  // Batch sync to server
  useEffect(() => {
    const sync = async () => {
      try {
        const { data } = await kokabApi.getState();
        if (data.tasks) setTasks(data.tasks);
        if (data.inventory) setInventory(data.inventory as any);
        if (data.calendar) setCalendar(data.calendar);
        if (data.transactions) setTransactions(data.transactions);
        if (data.liabilities) setLiabilities(data.liabilities);
        if (data.assets) setAssets(data.assets as any);
        if (data.vault) setVault(data.vault);
        if (data.permissions) setPermissions(data.permissions);
        if (data.consensusRequests) setConsensusRequests(data.consensusRequests);
        if (data.arbitrationRequests) setArbitrationRequests(data.arbitrationRequests);
        if (data.deadManSwitch) setDeadManSwitch(data.deadManSwitch);
        if (data.fitnessBattle) setFitnessBattle(data.fitnessBattle);
        if (data.budget) setBudget(data.budget);
        if (data.challenges) setChallenges(data.challenges);
        if (data.rouletteTasks) setRouletteTasks(data.rouletteTasks);
        if (data.categoryIconConfigs) setCategoryIconConfigs(data.categoryIconConfigs as any);
      } catch (err) {
        console.error("Nizam sync failed", err);
      }
    };
    sync();
  }, [userId]);

  const addTask = (task: Partial<Task>) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: task.title || '',
      assignedTo: task.assignedTo || userId,
      status: 'pending',
      priority: task.priority || 'medium',
      category: task.category || 'home',
      estimatedMinutes: task.estimatedMinutes || 30,
      privacy: task.privacy || 'shared',
      createdAt: Date.now(),
      ...task
    };
    setTasks(prev => [...prev, newTask]);
    kokabApi.updateState({ tasks: [...tasks, newTask] });
  };

  const updateTask = (id: string, data: Partial<Task>) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...data } : t);
    setTasks(updated);
    kokabApi.updateState({ tasks: updated });
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    kokabApi.updateState({ tasks: updated });
  };

  const updateInventory = (id: string, newStock: number) => {
    const updated = inventory.map(item => item.id === id ? { ...item, currentStock: newStock, status: (newStock <= item.minStock ? 'low' : 'ok') as any } : item);
    setInventory(updated);
    kokabApi.updateState({ inventory: updated });
  };

  const addTransaction = (t: Partial<Transaction>) => {
    const newT: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: t.amount || 0,
      type: t.type || 'expense',
      category: t.category || 'misc',
      description: t.description || '',
      timestamp: Date.now(),
      status: 'pending',
      privacy: 'shared',
      userId: userId,
      ...t
    } as Transaction;
    setTransactions(prev => [...prev, newT]);
    kokabApi.updateState({ transactions: [...transactions, newT] });
  };

  const requestConsensus = (type: ConsensusRequest['type'], data: any) => {
    const req: ConsensusRequest = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      requestedBy: userId,
      data,
      status: 'pending',
      timestamp: Date.now()
    };
    setConsensusRequests(prev => [...prev, req]);
    kokabApi.updateState({ consensusRequests: [...consensusRequests, req] });
  };

  const resolveConsensus = (id: string, approved: boolean) => {
    const updated = consensusRequests.map(r => r.id === id ? { ...r, status: (approved ? 'approved' : 'rejected') as any } : r);
    setConsensusRequests(updated);
    kokabApi.updateState({ consensusRequests: updated });
  };

  const updateChallengeProgress = (id: string, userId: UserID, progress: number) => {
    const updated = challenges.map(c => c.id === id ? { 
      ...c, 
      participantProgress: { ...(c.participantProgress || {}), [userId]: progress } 
    } : c);
    setChallenges(updated);
    kokabApi.updateState({ challenges: updated });
  };

  const updateCategoryIcon = (category: string, icon: string) => {
    const updated = { ...categoryIconConfigs, [category]: icon };
    setCategoryIconConfigs(updated);
    kokabApi.updateState({ categoryIconConfigs: updated });
  };

  return (
    <NizamContext.Provider value={{
      tasks, inventory, calendar, transactions, liabilities, assets, vault, permissions, consensusRequests,
      arbitrationRequests, deadManSwitch, fitnessBattle, budget, challenges, rouletteTasks, categoryIconConfigs,
      addTask, updateTask, deleteTask, updateInventory, addTransaction, requestConsensus, resolveConsensus,
      updateChallengeProgress, updateCategoryIcon
    }}>
      {children}
    </NizamContext.Provider>
  );
};

export const useNizam = () => {
  const context = useContext(NizamContext);
  if (!context) throw new Error('useNizam must be used within NizamProvider');
  return context;
};
