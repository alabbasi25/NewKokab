'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskItem } from './components/TaskItem';
import { AddTaskModal } from './components/AddTaskModal';

export default function TaskDashboard() {
  const { tasks, toggleTask } = useTasks();
  const [view, setView] = React.useState<'list' | 'grid'>('list');
  const [isAddOpen, setIsAddOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tight">مهام الكوكب</h2>
          <p className="text-xs opacity-50">إدارة المسؤوليات المشتركة والخاصة</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setView(view === 'list' ? 'grid' : 'list')}
             className="p-2 glass-card opacity-60 hover:opacity-100 transition-all"
           >
             {view === 'list' ? <LayoutGrid size={18} /> : <List size={18} />}
           </button>
           <button 
             onClick={() => setIsAddOpen(true)}
             className="p-2 bg-[var(--color-primary)] text-white rounded-xl shadow-lg shadow-[var(--color-primary)]/20 active:scale-95 transition-all"
           >
             <Plus size={20} />
           </button>
        </div>
      </div>

      {/* Modals */}
      {isAddOpen && <AddTaskModal onClose={() => setIsAddOpen(false)} />}

      {/* Categories / Filter placeholder */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['الكل', 'المنزل', 'العمل', 'خاص'].map((cat) => (
          <button key={cat} className="px-4 py-2 glass-card text-[10px] font-black uppercase tracking-widest whitespace-nowrap active:bg-white/10">
            {cat}
          </button>
        ))}
      </div>

      {/* Task Content */}
      <div className={view === 'list' ? 'flex flex-col gap-3' : 'grid grid-cols-2 gap-3'}>
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={() => toggleTask(task)} 
                viewMode={view}
              />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-12 text-center opacity-30 italic text-sm"
            >
              لا توجد مهام حالياً... كوكبكم هادئ
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
