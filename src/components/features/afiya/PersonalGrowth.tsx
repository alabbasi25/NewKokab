import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, CheckCircle, Target, Flame, Plus, X, Trophy, Sparkles, BookOpen, Brain, Zap } from 'lucide-react';
import { usePlanet } from '../../../context/KokabContext';
import { ModernInput } from '../../ui/ModernInput';
import { EmptyState } from '../../ui/EmptyState';
import { KokabCard } from '../../ui/KokabCard';

export const PersonalGrowth: React.FC = () => {
  const { currentUser, habits, updateHabitProgress, addHabit, profiles } = usePlanet();
  const [showAdd, setShowAdd] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'done'>('all');
  const [newHabit, setNewHabit] = useState({ title: '', target: 10, unit: '', color: 'blue' as const });

  const myHabits = habits[currentUser] || [];
  
  const filteredHabits = useMemo(() => {
    if (activeFilter === 'pending') return myHabits.filter(h => h.progress < h.target);
    if (activeFilter === 'done') return myHabits.filter(h => h.progress >= h.target);
    return myHabits;
  }, [myHabits, activeFilter]);

  const completedToday = myHabits.filter(h => h.progress >= h.target).length;
  const totalDailyProgress = myHabits.length > 0 
    ? myHabits.reduce((acc, h) => acc + Math.min(100, (h.progress / h.target) * 100), 0) / myHabits.length 
    : 0;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addHabit(newHabit);
    setShowAdd(false);
    setNewHabit({ title: '', target: 10, unit: '', color: 'blue' });
  };

  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
      {/* Header & Vision */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight">غراس {profiles[currentUser].name}</h2>
            <p className="text-sm opacity-50 font-medium italic">"تطوير الذات هو وقود الكوكب للحياة"</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdd(true)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/20"
          >
            <Plus size={28} />
          </motion.button>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <KokabCard variant="glass" className="p-4 flex flex-col items-center justify-center gap-1 border-emerald-500/20">
              <Zap className="text-emerald-500 mb-1" size={20} />
              <span className="text-[9px] font-black opacity-40 uppercase tracking-widest text-center">الإكمال اليومي</span>
              <span className="text-xl font-black text-emerald-500">{Math.round(totalDailyProgress)}%</span>
           </KokabCard>
           <KokabCard variant="glass" className="p-4 flex flex-col items-center justify-center gap-1 border-purple-500/20">
              <Trophy className="text-purple-500 mb-1" size={20} />
              <span className="text-[9px] font-black opacity-40 uppercase tracking-widest text-center">أوسمة النمو</span>
              <span className="text-xl font-black text-purple-500">١٢</span>
           </KokabCard>
           <KokabCard variant="glass" className="p-4 flex flex-col items-center justify-center gap-1 border-blue-500/20">
              <Brain className="text-blue-500 mb-1" size={20} />
              <span className="text-[9px] font-black opacity-40 uppercase tracking-widest text-center">المستوى الحالي</span>
              <span className="text-xl font-black text-blue-500">٧</span>
           </KokabCard>
           <KokabCard variant="glass" className="p-4 flex flex-col items-center justify-center gap-1 border-rose-500/20">
              <Flame className="text-rose-500 mb-1" size={20} />
              <span className="text-[9px] font-black opacity-40 uppercase tracking-widest text-center">سلسلة الإنجاز</span>
              <span className="text-xl font-black text-rose-500">٥ أيام</span>
           </KokabCard>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
        {(['all', 'pending', 'done'] as const).map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeFilter === f ? 'bg-white/10 text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
          >
            {f === 'all' ? 'الكل' : f === 'pending' ? 'جاري العمل' : 'مكتمل'}
          </button>
        ))}
      </div>

      {/* Habit List */}
      <div className="space-y-6">
        {myHabits.length === 0 ? (
          <EmptyState 
            icon={Sparkles}
            title="لا توجد غراس بعد"
            description="ابدأ بزراعة عادة يومية جديدة لتطوير نفسك وزيادة بركة الكوكب."
            actionLabel="ازرع أول عادة"
            onAction={() => setShowAdd(true)}
          />
        ) : filteredHabits.length === 0 ? (
          <div className="p-12 text-center glass-card border-dashed border-white/10 opacity-40 italic text-sm">
            لا توجد عادات في هذا التصنيف حالياً
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredHabits.map(habit => {
              const isCompleted = habit.progress >= habit.target;
              return (
                <motion.div 
                  layout
                  key={habit.id} 
                  className={`glass-card p-6 space-y-4 border-2 transition-all relative overflow-hidden group ${isCompleted ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/5'}`}
                >
                  {isCompleted && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 0.05 }}
                      className="absolute -right-4 -top-4 text-emerald-500"
                    >
                      <Trophy size={100} />
                    </motion.div>
                  )}

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                        {isCompleted ? <CheckCircle size={24} /> : <BookOpen size={24} />}
                      </div>
                      <div className="space-y-1">
                        <h3 className={`font-black text-lg ${isCompleted ? 'text-emerald-500 line-through opacity-50' : ''}`}>{habit.title}</h3>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{habit.target} {habit.unit} يومياً</span>
                           <div className="w-1 h-1 rounded-full bg-white/20" />
                           <div className="flex items-center gap-1 text-[10px] text-orange-500 font-black uppercase tracking-tighter">
                             <Flame size={12} /> نشط {Math.floor(Math.random() * 10) + 1} أيام
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-black ${isCompleted ? 'text-emerald-500' : ''}`}>{habit.progress}</div>
                      <div className="text-[9px] font-bold opacity-30 uppercase tracking-widest">{habit.unit}</div>
                    </div>
                  </div>
                  
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (habit.progress / habit.target) * 100)}%` }}
                      className={`h-full transition-all relative ${isCompleted ? 'bg-emerald-500' : 'bg-[var(--color-primary)]'}`}
                    >
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </motion.div>
                  </div>

                  <div className="flex justify-end pt-2 relative z-10">
                    {!isCompleted ? (
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateHabitProgress(habit.id, habit.progress + 1)}
                        className="px-6 py-2.5 rounded-xl bg-white text-[#0f172a] font-black text-xs shadow-xl shadow-white/10 hover:shadow-white/20 transition-all flex items-center gap-2"
                      >
                        <Plus size={16} /> تسجيل تقدم
                      </motion.button>
                    ) : (
                      <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-500/20">
                        <Sparkles size={14} /> تم الإنجاز بنجاح
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-card w-full max-w-lg p-8 relative z-10 space-y-8 rounded-t-[3rem] md:rounded-[3rem] border-t border-white/10"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto md:hidden" />
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">ازرع عادة جديدة</h3>
                  <p className="text-xs opacity-50">خُطوات صغيرة تؤدي لتغيير حقيقي</p>
                </div>
                <button onClick={() => setShowAdd(false)} className="p-3 bg-white/5 rounded-2xl"><X size={20} /></button>
              </div>
              <form onSubmit={handleAdd} className="space-y-6">
                <ModernInput 
                  label="ما هي العادة؟" required placeholder="مثلاً: قراءة القرآن، الرياضة، تعلم مهارة..."
                  value={newHabit.title}
                  onChange={e => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ModernInput 
                    label="الهدف اليومي" type="number" required
                    value={newHabit.target}
                    onChange={e => setNewHabit(prev => ({ ...prev, target: Number(e.target.value) }))}
                  />
                  <ModernInput 
                    label="وحدة القياس" required placeholder="صفحة، دقيقة، ركعة..."
                    value={newHabit.unit}
                    onChange={e => setNewHabit(prev => ({ ...prev, unit: e.target.value }))}
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full py-5 text-sm shadow-2xl">بِسْمِ اللَّهِ نَبْدَأ</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
