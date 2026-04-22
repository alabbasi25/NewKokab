import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc,
  doc
} from 'firebase/firestore';
import { Transaction, UserID } from '../../types';
import { db } from '../firebase/firebaseService';

export const FinanceService = {
  /**
   * Subscribe to transactions with privacy logic
   */
  subscribeTransactions: (
    userId: UserID, 
    partnerId: UserID | null, 
    callback: (transactions: Transaction[]) => void
  ) => {
    if (!db) {
       console.warn("DB not initialized, skipping subscription");
       return () => {};
    }

    const transactionsRef = collection(db, 'transactions');
    const q = query(
      transactionsRef,
      orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const allTransactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];

      const filtered = allTransactions.filter(t => {
        // Condition 1: My transaction (always visible to me)
        if (t.userId === userId) return true;
        
        // Condition 2: Partner's transaction
        if (partnerId && t.userId === partnerId) {
          return t.privacy === 'visible' || t.privacy === 'shared';
        }

        return false;
      });

      callback(filtered);
    }, (error) => {
      console.error("Finance sync failed:", error);
      callback([]); // Return empty on error
    });
  },

  /**
   * Create a new transaction
   */
  createTransaction: async (userId: UserID, transaction: Omit<Transaction, 'id' | 'userId' | 'timestamp'>) => {
    try {
      if (!db) throw new Error("Database not initialized");
      const transactionsRef = collection(db, 'transactions');
      await addDoc(transactionsRef, {
        ...transaction,
        userId,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  },

  /**
   * Update transaction status (e.g., for consensus)
   */
  updateTransaction: async (transactionId: string, updates: Partial<Transaction>) => {
    try {
      if (!db) throw new Error("Database not initialized");
      const docRef = doc(db, 'transactions', transactionId);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  }
};
