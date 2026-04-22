'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Users,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { useFinance } from './hooks/useFinance';
import { AddTransactionModal } from './components/AddTransactionModal';
import { Transaction } from '@/types';

export const FinanceDashboard = () => {
  const { transactions, totals, balance } = useFinance();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header & Balance Card */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight">السجل الموحد</h2>
            <p className="text-xs opacity-40">تتبع التدفقات المالية بروح الشراكة</p>
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="p-3 bg-white text-black rounded-2xl shadow-xl active:scale-95 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-8 bg-gradient-to-br from-white/[0.08] to-transparent border-white/10"
        >
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">الرصيد المتاح</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black">{balance.toLocaleString()}</span>
              <span className="text-xs opacity-40 font-bold">ريال</span>
            </div>
            
            <div className="grid grid-cols-2 w-full gap-4 mt-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold opacity-40 uppercase">دخل</p>
                  <p className="font-bold text-sm">+{totals.income.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-rose-500/10 text-rose-500">
                  <TrendingDown size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold opacity-40 uppercase">مصاريف</p>
                  <p className="font-bold text-sm">-{totals.expense.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-black opacity-60">المعاملات الأخيرة</h3>
          <button className="text-[10px] font-black opacity-40 flex items-center gap-1">
            رؤية الكل <ChevronDown size={12} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {transactions.map((t, idx) => (
            <TransactionItem key={t.id} transaction={t} index={idx} />
          ))}
        </div>
      </div>

      {isAddOpen && <AddTransactionModal onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};

const TransactionItem = ({ transaction, index }: { transaction: Transaction, index: number }) => {
  const getPrivacyIcon = () => {
    switch (transaction.privacy) {
      case 'private': return <Lock size={12} className="text-rose-400" />;
      case 'visible': return <Eye size={12} className="text-blue-400" />;
      case 'shared': return <Users size={12} className="text-emerald-400" />;
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-4 flex items-center justify-between border-white/5 hover:bg-white/[0.02] transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${
          transaction.type === 'income' ? 'bg-emerald-500/10' : 'bg-white/5'
        }`}>
          <Wallet size={18} className={transaction.type === 'income' ? 'text-emerald-500' : 'opacity-40'} />
        </div>
        <div>
          <h4 className="text-sm font-bold truncate max-w-[120px]">{transaction.description}</h4>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full opacity-40 font-bold">{transaction.category}</span>
             <div className="flex items-center gap-1 opacity-60">
                {getPrivacyIcon()}
                <span className="text-[9px] font-bold capitalize">{transaction.privacy}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-black text-sm ${
          transaction.type === 'income' ? 'text-emerald-400' : 'text-white'
        }`}>
          {transaction.type === 'expense' ? '-' : '+'}{transaction.amount.toLocaleString()}
        </p>
        <p className="text-[9px] opacity-30 font-medium mt-1">
          {new Date(transaction.timestamp).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })}
        </p>
      </div>
    </motion.div>
  );
};
