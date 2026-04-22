'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Lock, Eye, Users } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useAppStore } from '../../../store/useAppStore';
import { UserID } from '../../../types';

export const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const { addTask } = useTasks();
  const { user, partner } = useAppStore();
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState<UserID>(user?.userId || 'F');
  const [privacy, setPrivacy] = useState<'private' | 'visible' | 'shared'>('shared');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({
      title,
      assignedTo,
      privacy,
      priority,
      status: 'pending',
      category: 'home',
      estimatedMinutes: 30
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-lg glass-card bg-[#0A0A0A] p-6 border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black">إضافة مهمة جديدة</h2>
          <button onClick={onClose} className="p-2 opacity-40 hover:opacity-100"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">عنوان المهمة</label>
            <input 
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-[var(--color-primary)]/50 transition-all"
              placeholder="اكتب شيئاً تود القيام به..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">لمن؟</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs appearance-none outline-none"
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value as UserID)}
              >
                <option value={user?.userId}>{user?.name} (أنت)</option>
                {partner && <option value={partner.userId}>{partner.name} (الشريك)</option>}
              </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest opacity-40">الأولوية</label>
               <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs appearance-none outline-none"
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
              >
                <option value="low">عادية</option>
                <option value="medium">متوسطة</option>
                <option value="high">مهمة</option>
                <option value="urgent">عاجلة جداً</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">مستوى الخصوصية</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'private', label: 'خاص', icon: Lock, color: 'text-rose-400' },
                { id: 'visible', label: 'مرئي', icon: Eye, color: 'text-blue-400' },
                { id: 'shared', label: 'مشترك', icon: Users, color: 'text-emerald-400' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPrivacy(p.id as any)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    privacy === p.id ? 'bg-white/5 border-white/20 ring-1 ring-white/20' : 'bg-transparent border-white/5 opacity-40'
                  }`}
                >
                  <p.icon size={18} className={privacy === p.id ? p.color : ''} />
                  <span className="text-[9px] font-bold">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            <Save size={18} /> حفظ المهمة
          </button>
        </form>
      </motion.div>
    </div>
  );
};
