import { useEffect, useState } from 'react';
import { FinanceService } from '../../../services/finance/financeService';
import { useAppStore } from '../../../store/useAppStore';
import { Transaction } from '../../../types';

const MOCK_FINANCE: Transaction[] = [
  {
    id: 'f1',
    amount: 150.5,
    type: 'expense',
    category: 'Home',
    description: 'قائمة مشتريات المنزل',
    timestamp: Date.now() - 3600000,
    status: 'confirmed',
    privacy: 'shared',
    userId: 'user_test_1'
  },
  {
    id: 'f2',
    amount: 45.0,
    type: 'expense',
    category: 'Personal',
    description: 'هدية سرية للشريك',
    timestamp: Date.now() - 7200000,
    status: 'confirmed',
    privacy: 'private',
    userId: 'user_test_1'
  },
  {
    id: 'f3',
    amount: 2500,
    type: 'income',
    category: 'Work',
    description: 'راتب الشهر',
    timestamp: Date.now() - 86400000,
    status: 'confirmed',
    privacy: 'visible',
    userId: 'partner_test_1'
  }
];

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_FINANCE);
  const { user, partner } = useAppStore();

  useEffect(() => {
    if (!user) return;

    try {
      const unsubscribe = FinanceService.subscribeTransactions(
        user.userId,
        partner?.userId || null,
        (updated) => {
          if (updated.length > 0) {
            setTransactions(updated);
          }
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn("Using mock financial data (Test Mode)");
    }
  }, [user, partner]);

  const addTransaction = async (t: Omit<Transaction, 'id' | 'userId' | 'timestamp'>) => {
    if (!user) return;

    // Optimistic UI for Test Mode
    const newT: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      userId: user.userId,
      timestamp: Date.now()
    };
    setTransactions(prev => [newT, ...prev]);

    await FinanceService.createTransaction(user.userId, t).catch(e => {
        console.log("Transaction added locally (Test Mode)");
    });
  };

  const totals = {
    income: transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
    expense: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
    savings: transactions.filter(t => t.type === 'savings').reduce((acc, t) => acc + t.amount, 0),
  };

  const balance = totals.income - totals.expense;

  return { transactions, addTransaction, totals, balance };
};
