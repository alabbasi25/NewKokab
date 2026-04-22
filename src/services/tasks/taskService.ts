import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/firebaseService';
import { Task, UserID } from '../../types';

export const TaskService = {
  // Create task with privacy rule
  createTask: async (taskData: Omit<Task, 'id'>) => {
    if (!db) {
      console.warn("Firestore not available");
      return null;
    }
    return await addDoc(collection(db, 'tasks'), taskData);
  },

  // Real-time synchronization with privacy filtering
  subscribeTasks: (userId: UserID, partnerId: UserID | null, callback: (tasks: Task[]) => void) => {
    if (!db) return () => {};
    
    const q = query(collection(db, 'tasks'));
    
    return onSnapshot(q, (snapshot) => {
// ...
      const allTasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
      
      const filtered = allTasks.filter(task => {
        // Rule 1: Always see my own tasks
        if (task.assignedTo === userId) return true;
        
        // Rule 2: See partner tasks if visible or shared
        if (partnerId && task.assignedTo === partnerId) {
          return task.privacy === 'visible' || task.privacy === 'shared';
        }
        
        return false;
      });
      
      callback(filtered);
    });
  },

  updateTask: async (taskId: string, updates: Partial<Task>, currentUserId: UserID) => {
    const taskRef = doc(db, 'tasks', taskId);
    // Logic to prevent editing partner's non-shared tasks would go here
    return await updateDoc(taskRef, updates);
  }
};
