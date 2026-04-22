'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Lock, Eye, Users, Clock } from 'lucide-react';
import { Task } from '../../../types';
import { useAppStore } from '../../../store/useAppStore';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  viewMode: 'list' | 'grid';
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, viewMode }) => {
  const { user } = useAppStore();
  const isMine = task.assignedTo === user?.userId;
  const isCompleted = task.status === 'completed';

  const PrivacyIcon = () => {
    if (task.privacy === 'private') return <Lock size={10} className="text-rose-400" />;
    if (task.privacy === 'visible') return <Eye size={10} className="text-blue-400" />;
    return <Users size={10} className="text-emerald-400" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      className={`glass-card p-4 flex flex-col justify-between group transition-all ${
        isCompleted ? 'opacity-50' : 'hover:border-[var(--color-primary)]/40'
      } ${viewMode === 'list' ? 'flex-row items-center' : 'min-h-[140px]'}`}
    >
      <div className={`flex items-start gap-3 ${viewMode === 'list' ? 'items-center' : ''}`}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`shrink-0 transition-all ${isCompleted ? 'text-emerald-500' : 'text-white/20 hover:text-white/40'}`}
        >
          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </button>
        
        <div className="flex flex-col gap-1 overflow-hidden">
          <h3 className={`text-sm font-bold truncate ${isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full ${
              isMine ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
            }`}>
              {isMine ? 'أنت' : 'الشريك'}
            </span>
            <div className="flex items-center gap-1 opacity-40">
              <PrivacyIcon />
              <span className="text-[9px] font-bold">
                {task.privacy === 'private' ? 'خاص' : task.privacy === 'visible' ? 'مرئي' : 'مشترك'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="flex justify-between items-end pt-4 border-t border-white/5 mt-auto">
          <div className="flex items-center gap-1 opacity-40 text-[9px] font-bold">
            <Clock size={10} />
            <span>{task.estimatedMinutes} د</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${
            task.priority === 'urgent' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' :
            task.priority === 'high' ? 'bg-orange-500' : 'bg-blue-400'
          }`} />
        </div>
      )}
    </motion.div>
  );
};
