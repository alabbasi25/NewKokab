import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Swords, 
  Trophy, 
  Timer, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Zap, 
  Flame, 
  Activity, 
  Heart, 
  ArrowRight,
  BookOpen,
  Home,
  Gamepad2,
  Trash2,
  Clock,
  History as HistoryIcon,
  Filter,
  AlertCircle,
  Users,
  Sparkles
} from 'lucide-react';
import { usePlanet } from '../../../context/KokabContext';
import { Challenge, UserID } from '../../../types';

export const Arena: React.FC = () => {
  const { 
    challenges, 
    proposeChallenge, 
    acceptChallenge, 
    rejectChallenge, 
    completeChallenge, 
    currentUser, 
    streaks, 
    fitnessBattle, 
    updateFitnessBattle,
    profiles,
    updateChallengeProgress
  } = usePlanet();
  
  const [showAdd, setShowAdd] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({ 
    title: '', 
    description: '', 
    points: 10, 
    durationMinutes: 30,
    category: 'fun',
    conditions: ''
  });
  const [now, setNow] = useState(Date.now());
  const [justRejectedId, setJustRejectedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const nowTime = Date.now();
      setNow(nowTime);
      
      // Auto-expire challenges
      challenges.forEach(c => {
        if (c.status === 'active' && c.startTime && (nowTime > c.startTime + c.durationMinutes * 60000)) {
          // This would ideally be a context call, but let's just let it show as expired in UI for now
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [challenges]);

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    proposeChallenge(newChallenge);
    setShowAdd(false);
    setNewChallenge({ title: '', description: '', points: 10, durationMinutes: 30, category: 'fun', conditions: '' });
  };

  const handleReject = (id: string) => {
    setJustRejectedId(id);
    setTimeout(() => {
      rejectChallenge(id);
      setJustRejectedId(null);
    }, 400);
  };

  const getTimeRemaining = (startTime: number, durationMinutes: number) => {
    const end = startTime + durationMinutes * 60 * 1000;
    const remaining = end - now;
    if (remaining <= 0) return '00:00';
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getCategoryIcon = (category: string, size = 20) => {
    switch (category) {
      case 'fitness': return <Activity size={size} />;
      case 'spiritual': return <Zap size={size} />;
      case 'home': return <Home size={size} />;
      case 'learning': return <BookOpen size={size} />;
      case 'romance': return <Heart size={size} />;
      case 'fun': return <Gamepad2 size={size} />;
      default: return <Swords size={size} />;
    }
  };

  const streak = streaks[currentUser];

  const activeChallenges = useMemo(() => 
    challenges.filter(c => c.status === 'active' || c.status === 'pending'), 
  [challenges]);

  const historyChallenges = useMemo(() => 
    challenges.filter(c => c.status === 'completed' || c.status === 'rejected' || c.status === 'expired')
    .sort((a, b) => (b.completedAt || b.rejectedAt || 0) - (a.completedAt || a.rejectedAt || 0)),
  [challenges]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
      {/* Fitness Battle Mode */}
      <section className="glass-card-dark p-6 border-emerald-500/20 bg-emerald-500/5 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black">معركة اللياقة (Fitness Battle)</h3>
              <p className="text-[10px] opacity-60">تحدي الخطوات والسعرات الحي</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            <Flame size={10} className="animate-pulse" /> معركة نشطة
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-black z-10">VS</div>
          
          <div className="space-y-3 text-center">
            <div className="text-[10px] font-bold opacity-50">{profiles.F.name}</div>
            <div className="text-2xl font-black text-emerald-500">{fitnessBattle.F.steps.toLocaleString()}</div>
            <div className="text-[8px] opacity-40 uppercase">خطوة</div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (fitnessBattle.F.steps / 10000) * 100)}%` }}
                className="h-full bg-emerald-500"
              />
            </div>
          </div>
          <div className="space-y-3 text-center">
            <div className="text-[10px] font-bold opacity-50">{profiles.B.name}</div>
            <div className="text-2xl font-black text-blue-500">{fitnessBattle.B.steps.toLocaleString()}</div>
            <div className="text-[8px] opacity-40 uppercase">خطوة</div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (fitnessBattle.B.steps / 10000) * 100)}%` }}
                className="h-full bg-blue-500"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={() => updateFitnessBattle(currentUser, fitnessBattle[currentUser].steps + 500)}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Zap size={16} /> إضافة ٥٠٠ خطوة للمنافسة
        </button>
      </section>

      {/* Streak Section */}
      <div className="glass-card-dark p-6 flex items-center justify-between overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Flame size={120} className="absolute -bottom-10 -left-10 text-orange-500 rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1">سلسلة الإنجاز المتواصلة</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">{streak.count}</span>
            <span className="text-sm font-bold opacity-70">أيام من التحدي</span>
          </div>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-500 shadow-xl shadow-orange-500/20">
          <Flame size={32} className="animate-bounce" />
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-2xl font-black">ساحة التحديات</h2>
          <div className="flex p-1 bg-white/5 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('active')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === 'active' ? 'bg-[var(--color-primary)] text-white' : 'opacity-40'}`}
            >
              تحديات نشطة ({activeChallenges.length})
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${activeTab === 'history' ? 'bg-[var(--color-primary)] text-white' : 'opacity-40'}`}
            >
              السجل ({historyChallenges.length})
            </button>
          </div>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20"
        >
          <Plus size={24} />
        </button>
      </div>

      {activeTab === 'active' && (
        <div className="grid grid-cols-1 gap-4">
          {activeChallenges.length === 0 && (
            <div className="p-12 text-center glass-card opacity-50">
              <Swords size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">لا توجد تحديات نشطة حالياً. ابدأ أول تحدٍ الآن!</p>
            </div>
          )}
          
          {activeChallenges.map(c => (
            <motion.div 
              key={c.id} 
              layout
              animate={{ 
                x: justRejectedId === c.id ? [0, -10, 10, -10, 10, 0] : 0,
                opacity: justRejectedId === c.id ? 0.5 : 1
              }}
              className={`${c.status === 'active' ? 'glass-card-dark border-emerald-500/30' : 'glass-card shadow-lg shadow-black/20'} p-6 space-y-4 relative overflow-hidden transition-all duration-500`}
            >
              {c.status === 'active' && (
                <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500 animate-pulse" />
              )}
              
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    c.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                    c.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {getCategoryIcon(c.category, 24)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-lg leading-none">{c.title}</h3>
                      <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/5 opacity-40">{c.category}</span>
                    </div>
                    <p className="text-xs opacity-60 line-clamp-2">{c.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[var(--color-primary)]">+{c.points}</div>
                  <div className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">بركة</div>
                </div>
              </div>

              {c.conditions && (
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-black uppercase tracking-widest opacity-40">الشروط المطلوبة</span>
                    <p className="text-[10px] font-bold leading-relaxed">{c.conditions}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                  <Clock size={14} /> {c.durationMinutes} دقيقة
                </div>
                <div className="flex items-center gap-2 text-xs font-bold opacity-70">
                  <Trophy size={14} /> {c.status === 'pending' ? (c.proposer === currentUser ? 'أرسلت للشريك' : 'بانتظار قبولك') : 'جاري التحدي'}
                </div>
              </div>

              {c.status === 'pending' && c.proposer !== currentUser && (
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => acceptChallenge(c.id)}
                    className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <Play size={16} /> قبول التحدي
                  </button>
                  <button 
                    onClick={() => handleReject(c.id)}
                    className="px-4 py-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              )}

              {c.status === 'active' && (
                <div className="pt-2 space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest">الوقت المتبقي</div>
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-mono font-black text-emerald-400">
                          {getTimeRemaining(c.startTime || 0, c.durationMinutes)}
                        </div>
                      </div>
                    </div>
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {c.participants.map(pid => (
                        <div key={pid} className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center text-[10px] font-black uppercase">
                          {profiles[pid].name[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      key={`${c.id}-progress`}
                      initial={{ width: '100%' }}
                      animate={{ 
                        width: `${Math.max(0, (1 - (now - (c.startTime || 0)) / (c.durationMinutes * 60000)) * 100)}%` 
                      }}
                      transition={{ ease: "linear" }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>

                  {/* Participant Progress Tracker */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">تقدم المشاركين</span>
                      <Users size={12} className="opacity-40" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {c.participants.map(pid => (
                        <div key={pid} className="space-y-1.5 p-3 rounded-2xl bg-white/5 border border-white/5">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full overflow-hidden border border-white/10">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profiles[pid].name}`} alt="" />
                              </div>
                              <span className="text-[10px] font-bold">{profiles[pid].name}</span>
                            </div>
                            <span className="text-[10px] font-black tabular-nums">%{c.participantProgress?.[pid] || 0}</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${c.participantProgress?.[pid] || 0}%` }}
                              className={`h-full ${pid === 'F' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                            />
                            {pid === currentUser && c.status === 'active' && (
                              <input 
                                type="range" min="0" max="100" 
                                value={c.participantProgress?.[pid] || 0}
                                onChange={(e) => updateChallengeProgress(c.id, pid, parseInt(e.target.value))}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => completeChallenge(c.id, currentUser)}
                      className="flex-1 py-3 rounded-xl bg-white text-black font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <CheckCircle2 size={18} /> أكملت التحدي بنجاح
                    </button>
                    <button 
                      onClick={() => completeChallenge(c.id, currentUser === 'F' ? 'B' : 'F')}
                      className="px-4 py-3 rounded-xl bg-white/10 text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                    >
                      <Trophy size={18} /> فاز الشريك
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="grid grid-cols-1 gap-4">
          {historyChallenges.length === 0 && (
            <div className="p-12 text-center glass-card-dark opacity-30">
              <HistoryIcon size={48} className="mx-auto mb-4" />
              <p className="text-sm italic">لا توجد سجلات بعد</p>
            </div>
          )}
          
          {historyChallenges.map(c => (
            <div key={c.id} className="glass-card p-4 flex gap-4 items-center opacity-80 border-white/5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                c.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {c.status === 'completed' ? <Trophy size={20} /> : <XCircle size={20} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-black">{c.title}</h4>
                <div className="flex items-center gap-4 text-[9px] font-bold opacity-40">
                  <span className="flex items-center gap-1"><Clock size={10} /> {new Date(c.completedAt || c.rejectedAt || 0).toLocaleDateString('ar-EG')}</span>
                  {c.winner && <span className="flex items-center gap-1 text-emerald-500"><Trophy size={10} /> الفائز: {profiles[c.winner].name}</span>}
                  {!c.winner && c.status === 'rejected' && <span className="text-rose-500">تم الرفض</span>}
                </div>
              </div>
              <div className="text-[10px] font-black opacity-30 px-2 py-1 bg-white/5 rounded-lg">{c.category}</div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-card w-full max-w-lg p-8 relative z-10 space-y-6 rounded-t-3xl md:rounded-3xl border-t border-white/10"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto md:hidden" />
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black">طرح تحدٍ جديد</h3>
                <button onClick={() => setShowAdd(false)} className="p-2 opacity-50"><ArrowRight className="rotate-45" /></button>
              </div>
              
              <form onSubmit={handlePropose} className="space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {(['fitness', 'spiritual', 'home', 'fun', 'learning', 'romance'] as const).map(cat => (
                    <button 
                      key={cat} type="button"
                      onClick={() => setNewChallenge(prev => ({ ...prev, category: cat }))}
                      className={`p-3 rounded-2xl flex flex-col items-center gap-2 border transition-all ${
                        newChallenge.category === cat ? 'bg-[var(--color-primary)] text-white border-transparent shadow-lg shadow-[var(--color-primary)]/20' : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {getCategoryIcon(cat, 18)}
                      <span className="text-[8px] font-black uppercase tracking-widest">{cat}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase tracking-widest px-2">موضوع التحدي</label>
                  <input 
                    type="text" required placeholder="مثلاً: قراءة سورة الملك قبل النوم"
                    value={newChallenge.title}
                    onChange={e => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase tracking-widest px-2">الوصف</label>
                  <textarea 
                    placeholder="التفاصيل وكيفية الفوز..."
                    value={newChallenge.description}
                    onChange={e => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field min-h-[80px] py-3"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold opacity-50 uppercase tracking-widest px-2">شروط إضافية (اختياري)</label>
                  <input 
                    type="text" 
                    placeholder="مثلاً: بدون استخدام الجوال خلال الجلسة"
                    value={newChallenge.conditions}
                    onChange={e => setNewChallenge(prev => ({ ...prev, conditions: e.target.value }))}
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase tracking-widest px-2 text-[var(--color-primary)]">نقاط البركة</label>
                    <input 
                      type="number"
                      value={newChallenge.points}
                      onChange={e => setNewChallenge(prev => ({ ...prev, points: Number(e.target.value) }))}
                      className="input-field border-[var(--color-primary)]/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase tracking-widest px-2">المدة (دقيقة)</label>
                    <input 
                      type="number"
                      value={newChallenge.durationMinutes}
                      onChange={e => setNewChallenge(prev => ({ ...prev, durationMinutes: Number(e.target.value) }))}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full py-5 text-sm">إرسال التحدي للشريك</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
