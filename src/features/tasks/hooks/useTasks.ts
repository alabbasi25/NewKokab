import { useEffect, useState } from 'react';
import { TaskService } from '../../../services/tasks/taskService';
import { useAppStore } from '../../../store/useAppStore';
import { Task } from '../../../types';

const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'تجهيز قائمة مشتريات الكوكب',
    assignedTo: 'user_test_1',
    status: 'pending',
    priority: 'high',
    category: 'home',
    estimatedMinutes: 30,
    privacy: 'shared',
    createdAt: Date.now()
  },
  {
    id: 't2',
    title: 'مراجعة الميزانية الشهرية',
    assignedTo: 'partner_test_1',
    status: 'completed',
    priority: 'medium',
    category: 'work',
    estimatedMinutes: 60,
    privacy: 'visible',
    createdAt: Date.now()
  },
  {
    id: 't3',
    title: 'مفاجأة للشريك (سرية)',
    assignedTo: 'user_test_1',
    status: 'pending',
    priority: 'high',
    category: 'personal',
    estimatedMinutes: 120,
    privacy: 'private',
    createdAt: Date.now()
  }
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const { user, partner } = useAppStore();

  useEffect(() => {
    if (!user) return;

    try {
      const unsubscribe = TaskService.subscribeTasks(
        user.userId,
        partner?.userId || null,
        (updatedTasks) => {
          if (updatedTasks.length > 0) {
            setTasks(updatedTasks);
          }
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn("Using mock tasks due to service unavailability");
    }
  }, [user, partner]);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = { ...task, id: Math.random().toString(), createdAt: Date.now() } as Task;
    setTasks(prev => [newTask, ...prev]);
    
    await TaskService.createTask({
      ...task,
      createdAt: Date.now()
    }).catch(() => console.log("Task added locally (Test Mode)"));
  };

  const toggleTask = async (task: Task) => {
    const isCompleted = task.status === 'completed';
    const newStatus = isCompleted ? 'pending' : 'completed';
    
    // Optimistic UI update for Test Mode
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus as any } : t));

    const canEdit = task.assignedTo === user?.userId || task.privacy === 'shared';
    if (canEdit) {
      await TaskService.updateTask(task.id, { 
        status: newStatus as any
      }, user!.userId).catch(() => console.log("Status toggled locally (Test Mode)"));
    }
  };

  return { tasks, addTask, toggleTask };
};
