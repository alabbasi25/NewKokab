'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Lock, Eye, Users, ArrowUpCircle, ArrowDownCircle, Coins } from 'lucide-react';
import { useFinance } from '../hooks/useFinance';

export const AddTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const { addTransaction } = useFinance();
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'expense' | 'income' | 'savings'>('expense');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Home');
  const [privacy, setPrivacy] = useState<'private' | 'visible' | 'shared'>('shared');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    await addTransaction({
      amount: parseFloat(amount),
      type,
      description,
      category,
      privacy,
      status: 'confirmed'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-lg glass-card bg-[#050505] p-8 border-white/10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">إضافة عملية</h2>
          <button onClick={onClose} className="p-2 opacity-20 hover:opacity-100 transition-all"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Amount Input Large */}
          <div className="text-center">
            <input 
              autoFocus
              type="number"
              className="w-full bg-transparent text-6xl font-black text-center outline-none placeholder:opacity-10 tracking-tighter"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <p className="text-[10px] font-black opacity-20 mt-4 tracking-[0.3em] uppercase">المبلغ بالريال</p>
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'income', label: 'دخل', icon: ArrowUpCircle, color: 'text-emerald-400' },
              { id: 'expense', label: 'مصروف', icon: ArrowDownCircle, color: 'text-rose-400' },
              { id: 'savings', label: 'ادخار', icon: Coins, color: 'text-amber-400' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id as any)}
                className={`flex flex-col items-center gap-2 p-4 rounded-3xl border transition-all ${
                  type === t.id ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5 opacity-30'
                }`}
              >
                <t.icon size={20} className={type === t.id ? t.color : ''} />
                <span className="text-[10px] font-black uppercase">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input 
              className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-white/20 transition-all"
              placeholder="وصف العملية..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
               <select 
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-xs appearance-none outline-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Home">المنزل</option>
                <option value="Personal">شخصي</option>
                <option value="Work">العمل</option>
                <option value="Transport">نقل</option>
                <option value="Savings">مدخرات</option>
              </select>

              <div className="relative">
                <select 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-xs appearance-none outline-none"
                  value={privacy}
                  onChange={e => setPrivacy(e.target.value as any)}
                >
                  <option value="shared">مشترك</option>
                  <option value="visible">مرئي</option>
                  <option value="private">خاص</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-white text-black font-black rounded-[2rem] text-lg active:scale-95 transition-all shadow-2xl shadow-white/10"
          >
            حفظ العملية
          </button>
        </form>
      </motion.div>
    </div>
  );
};
