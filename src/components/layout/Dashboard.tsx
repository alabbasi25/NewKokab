import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Package, 
  Plane, 
  Lock, 
  MessageSquare, 
  User, 
  Bell, 
  Fingerprint, 
  Menu, 
  X, 
  LayoutDashboard, 
  Wallet, 
  Target, 
  ListTodo, 
  Calendar, 
  Shield, 
  ShieldCheck,
  TrendingUp, 
  Activity, 
  Settings, 
  Sparkles, 
  Smile, 
  MessageCircle, 
  History, 
  FileText, 
  Bot,
  ChevronLeft,
  Search,
  Plus,
  LogOut,
  Send,
  Swords,
  Rocket,
  Library,
  Book,
  Droplets,
  Zap,
  Baby,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePlanet } from '../../context/KokabContext';
import { useAI } from '../../hooks/useAI';
import { KokabCard } from '../ui/KokabCard';
import { KokabButton } from '../ui/KokabButton';
import { KokabBadge } from '../ui/KokabBadge';
import { PillarGateway } from '../ui/PillarGateway';
import { SystemDashboard } from '../features/nizam/SystemDashboard';
import { InventoryManager } from '../features/nizam/InventoryManager';
import { UnifiedLedger } from '../features/nizam/UnifiedLedger';
import { WorshipSync } from '../features/afiya/WorshipSync';
import { VitalSignsLog } from '../features/afiya/VitalSignsLog';
import { SecureVault } from '../features/nizam/SecureVault';
import { TravelPlanner } from '../features/vision/TravelPlanner';
import { FutureFund } from '../features/vision/FutureFund';
import { TaskOrchestrator } from '../features/nizam/TaskOrchestrator';
import { GlobalSchedule } from '../features/nizam/GlobalSchedule';
import { PrivateSanctum } from '../features/mawadda/PrivateSanctum';
import { GratitudeFeed } from '../features/mawadda/GratitudeFeed';
import { ConflictRoom } from '../features/mawadda/ConflictRoom';
import { PermissionsManager } from '../features/nizam/PermissionsManager';
import { PersonalGrowth } from '../features/afiya/PersonalGrowth';
import { AIOracle } from '../features/vision/AIOracle';
import { Arena } from '../features/nizam/Arena';
import { AppRoadmap } from '../features/vision/AppRoadmap';
import { RomanceLounge } from '../features/mawadda/RomanceLounge';
import { KnowledgeStudio } from '../features/afiya/KnowledgeStudio';
import { FocusSync } from '../features/afiya/FocusSync';
import { HydrationStation } from '../features/afiya/HydrationStation';
import { TimeCapsule } from '../features/vision/TimeCapsule';
import { HapticPresence } from '../features/mawadda/HapticPresence';
import { FutureFamily } from '../features/vision/FutureFamily';
import { ProfilePage } from '../views/ProfilePage';
import { NotificationCenter } from '../ui/NotificationCenter';
import { KokabProgressBar } from '../ui/KokabProgressBar';
import { KokabStatCard } from '../ui/KokabStatCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { PlanetHealthSection } from '../ui/PlanetHealthSection';

import { MoodTracker } from '../features/afiya/MoodTracker';
import { SharedJournal } from '../features/mawadda/SharedJournal';
import { LoveLanguageQuiz } from '../features/mawadda/LoveLanguageQuiz';
import { DateNightAI } from '../features/mawadda/DateNightAI';

type ViewID = 
  | 'arena' | 'romance' | 'knowledge' | 'focus' | 'conflict'
  | 'system' | 'ledger' | 'future_fund' | 'tasks' | 'inventory' | 'worship'
  | 'private' | 'growth' | 'health' | 'hydration' | 'travel' | 'family'
  | 'haptic' | 'gratitude' | 'capsule' | 'vault'
  | 'mood' | 'journal' | 'quiz' | 'dates'
  | 'home' | 'profile' | 'permissions' | 'ai' | 'chat' | 'roadmap';

import { TestMode } from '../ui/TestMode';

import { ChatScreen } from '../features/mawadda/ChatScreen';
import { UserID } from '../../types';

export const Dashboard: React.FC<{ onSwitchUser: (id?: UserID) => void }> = ({ onSwitchUser }) => {
  const { 
    currentUser, 
    partnerStatus, 
    planetHealth, 
    notifications,
    consensusRequests,
    resolveConsensus,
    populateTestData,
    barakahPoints,
    messages
  } = usePlanet();
  
  const [activeTab, setActiveTab] = useState<ViewID>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [presenceActive, setPresenceActive] = useState(false);
  const [testModeEnabled, setTestModeEnabled] = useState(localStorage.getItem('kokab_test_mode') === 'true');

  useEffect(() => {
    localStorage.setItem('kokab_test_mode', String(testModeEnabled));
  }, [testModeEnabled]);

  const handlePresencePulse = () => {
    setPresenceActive(true);
    if ('vibrate' in navigator) navigator.vibrate(200);
    setTimeout(() => setPresenceActive(false), 2000);
  };

  const menuItems = [
    // Relationship Pillar
    { id: 'gratitude', label: 'سجل المودة', icon: <Smile size={20} />, category: 'برج المودة' },
    { id: 'romance', label: 'صالون الرومانسية', icon: <Heart size={20} />, category: 'برج المودة' },
    { id: 'journal', label: 'يوميات الكوكب', icon: <Book size={20} />, category: 'برج المودة' },
    { id: 'conflict', label: 'غرفة التفاهم', icon: <Shield size={20} />, category: 'برج المودة' },
    
    // Operations & Finance Pillar
    { id: 'system', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} />, category: 'برج المنظومة' },
    { id: 'ledger', label: 'الميزانية والمالية', icon: <Wallet size={20} />, category: 'برج المنظومة' },
    { id: 'tasks', label: 'محرك المهام', icon: <ListTodo size={20} />, category: 'برج المنظومة' },
    { id: 'arena', label: 'ساحة التحديات', icon: <Swords size={20} />, category: 'برج المنظومة' },
    { id: 'vault', label: 'أرشيف المستندات', icon: <FileText size={20} />, category: 'برج المنظومة' },

    // Wellness Pillar
    { id: 'health', label: 'السجل الصحي', icon: <Activity size={20} />, category: 'برج العافية' },
    { id: 'mood', label: 'غلاف المشاعر', icon: <Smile size={20} />, category: 'برج العافية' },
    { id: 'worship', label: 'المحراب', icon: <Sparkles size={20} />, category: 'برج العافية' },
    { id: 'growth', label: 'مسار النمو', icon: <TrendingUp size={20} />, category: 'برج العافية' },

    // Vision Pillar
    { id: 'travel', label: 'مخطط الرحلات', icon: <Plane size={20} />, category: 'برج الرؤية' },
    { id: 'future_fund', label: 'صندوق المستقبل', icon: <Target size={20} />, category: 'برج الرؤية' },
    { id: 'family', label: 'شجرة العائلة', icon: <Baby size={20} />, category: 'برج الرؤية' },
    { id: 'capsule', label: 'كبسولة الزمن', icon: <History size={20} />, category: 'برج الرؤية' },
  ];

  const viewMap: Record<string, React.ReactNode> = {
    home: <HomeView setActiveTab={setActiveTab} />,
    arena: <Arena />,
    romance: <RomanceLounge />,
    knowledge: <KnowledgeStudio />,
    focus: <FocusSync />,
    system: <SystemDashboard />,
    inventory: <InventoryManager />,
    ledger: <UnifiedLedger />,
    future_fund: <FutureFund />,
    tasks: <TaskOrchestrator />,
    worship: <WorshipSync />,
    private: <PrivateSanctum />,
    growth: <PersonalGrowth />,
    health: <VitalSignsLog />,
    hydration: <HydrationStation />,
    haptic: <HapticPresence />,
    gratitude: <GratitudeFeed />,
    conflict: <ConflictRoom />,
    mood: <MoodTracker />,
    journal: <SharedJournal />,
    quiz: <LoveLanguageQuiz />,
    dates: <DateNightAI />,
    capsule: <TimeCapsule />,
    travel: <TravelPlanner />,
    family: <FutureFamily />,
    vault: <SecureVault />,
    roadmap: <AppRoadmap />,
    permissions: <PermissionsManager />,
    ai: <AIOracle />,
    chat: <ChatScreen />,
    profile: <ProfilePage onSwitchUser={onSwitchUser} />,
  };

  const renderView = () => viewMap[activeTab] || <HomeView setActiveTab={setActiveTab} />;

  const unreadMessagesCount = messages.filter(m => m.senderId !== currentUser && m.status !== 'read').length;

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[var(--color-bg-deep)] selection:bg-[var(--color-primary)]/30">
      {testModeEnabled && <TestMode onSwitchUser={onSwitchUser} />}
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-l border-[var(--color-border)] flex-col bg-[var(--color-bg-card)]/30 backdrop-blur-2xl z-50">
        <div className="p-8 flex items-center gap-3 border-b border-[var(--color-border)]">
          <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/20">
            <Heart size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">كوكب</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          <div className="space-y-1">
            <motion.button
              onClick={() => setActiveTab('home')}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
            >
              <LayoutDashboard size={20} />
              <span className="text-sm font-bold">الرئيسية</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('roadmap')}
              whileTap={{ scale: 0.95 }}
              className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'roadmap' ? 'bg-amber-500/10 text-amber-500 shadow-lg' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
            >
              <Rocket size={20} />
              <span className="text-sm font-bold">خطة ٢٠٢٦</span>
            </motion.button>
          </div>
          
          {['برج المودة', 'برج المنظومة', 'برج العافية'].map(cat => (
            <div key={cat} className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
              <div className="space-y-1">
                {menuItems.filter(item => item.category === cat).map(item => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as ViewID)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full p-3 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-[var(--color-border)]">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('profile')}
            className="w-full p-3 rounded-xl bg-[var(--color-bg-surface)] flex items-center gap-3 hover:bg-[var(--color-primary)]/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)] transition-colors">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
                alt="Profile" 
              />
            </div>
            <div className="text-right">
              <div className="text-xs font-bold">{currentUser === 'F' ? 'فهد' : 'بشرى'}</div>
              <div className="text-[10px] opacity-50">عرض الملف الشخصي</div>
            </div>
          </motion.button>
        </div>
      </aside>

      {/* Main Mobile-First Container */}
      <div className="flex-1 flex flex-col max-w-md mx-auto lg:max-w-none lg:px-12 relative overflow-hidden">
        {testModeEnabled && <TestMode onSwitchUser={onSwitchUser} />}
        {/* Header */}
        <header className="sticky top-0 p-6 flex justify-between items-center z-50 bg-[var(--color-bg-deep)]/80 backdrop-blur-xl border-b border-[var(--color-border)]/20 lg:py-8 lg:px-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none">
          <div className="flex items-center gap-4">
            {activeTab === 'home' ? (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(true)}
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[var(--color-primary)] lg:hidden border border-[var(--color-border)]/40 shadow-xl"
              >
                <Menu size={24} />
              </motion.button>
            ) : (
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab('home')}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white lg:hidden"
              >
                <ChevronLeft size={24} className="rotate-180" />
              </motion.button>
            )}
            <div className="lg:hidden">
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">كوكب</h1>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                <span className="text-[10px] font-bold opacity-60">
                  {partnerStatus?.status === 'online' ? 'الشريك متصل' : 'الشريك غير متصل'}
                </span>
              </div>
            </div>
            {/* Desktop Breadcrumb-ish */}
            <div className="hidden lg:flex items-center gap-4">
              {activeTab !== 'home' && (
                <button onClick={() => setActiveTab('home')} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <ChevronLeft size={20} className="rotate-180 opacity-40 hover:opacity-100" />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  {activeTab === 'home' ? 'مرحباً بك في كوكبكم' : menuItems.find(i => i.id === activeTab)?.label || 'الملف الشخصي'}
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] font-bold">
                  {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass border border-amber-500/20 bg-amber-500/5">
              <Sparkles size={16} className="text-amber-500" />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-tighter">نقاط البركة</span>
                <span className="text-xs font-black">{barakahPoints}</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-4 ml-6 px-4 py-2 rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${partnerStatus?.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                <span className="text-[10px] font-bold opacity-60">الشريك: {partnerStatus?.status === 'online' ? 'متصل' : 'غير متصل'}</span>
              </div>
              <div className="w-px h-4 bg-[var(--color-border)]" />
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-amber-500" />
                <span className="text-[10px] font-bold opacity-60">صحة الكوكب: {planetHealth.score}%</span>
              </div>
            </div>

            <NotificationCenter />
            
            <motion.button 
              onClick={() => setActiveTab('profile')}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl glass overflow-hidden border-2 border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-all lg:hidden"
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser === 'F' ? 'Fahad' : 'Bushra'}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </motion.button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-28 overflow-y-auto no-scrollbar lg:px-0 lg:max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Consensual Input Overlay */}
      <AnimatePresence>
        {consensusRequests.filter(r => r.status === 'pending' && r.requestedBy !== currentUser).map(req => (
          <motion.div 
            key={req.id}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 left-6 right-6 z-[60] glass-card p-6 border-amber-500/30 shadow-2xl shadow-amber-500/20"
          >
            <div className="flex gap-4 items-start">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-500">
                <Shield size={24} />
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="text-sm font-bold">طلب تأكيد مزدوج</h4>
                <p className="text-xs opacity-70">
                  يطلب {req.requestedBy === 'F' ? 'فهد' : 'بشرى'} إضافة {req.type === 'transaction' ? 'مصروف مالي' : 'موعد جديد'}. هل توافق؟
                </p>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => resolveConsensus(req.id, true)}
                    className="flex-1 py-2 rounded-lg bg-green-500 text-white text-xs font-bold"
                  >
                    موافقة
                  </button>
                  <button 
                    onClick={() => resolveConsensus(req.id, false)}
                    className="flex-1 py-2 rounded-lg bg-rose-500/10 text-rose-500 text-xs font-bold"
                  >
                    رفض
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-4/5 bg-[var(--color-bg-deep)] z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white">
                    <Heart size={24} />
                  </div>
                  <span className="text-xl font-black">القائمة</span>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-[var(--color-text-secondary)]"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                <div className="space-y-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'home' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-sm font-bold">الرئيسية</span>
                  </motion.button>
                </div>
                {['برج المودة', 'برج المنظومة', 'برج العافية', 'برج الرؤية'].map(cat => (
                  <div key={cat} className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 px-2">{cat}</h3>
                    <div className="space-y-1">
                      {menuItems.filter(item => item.category === cat).map(item => (
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          key={item.id}
                          onClick={() => { setActiveTab(item.id as ViewID); setIsMenuOpen(false); }}
                          className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === item.id ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                        >
                          {item.icon}
                          <span className="text-sm font-bold">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="space-y-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('permissions'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'permissions' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)]'}`}
                  >
                    <Shield size={20} />
                    <span className="text-sm font-bold">الصلاحيات والسيادة</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setActiveTab('roadmap'); setIsMenuOpen(false); }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all ${activeTab === 'roadmap' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] shadow-inner'}`}
                  >
                    <Rocket size={20} className="text-amber-500" />
                    <span className="text-sm font-bold">خارطة كوكب ٢٠٢٦</span>
                    <KokabBadge label="خطة" variant="warning" className="mr-auto scale-75" />
                  </motion.button>
                </div>
              </div>

              <div className="p-8 border-t border-[var(--color-border)] space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)]">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${testModeEnabled ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-white/20'}`}>
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-black">وضع الاختبار (QA)</div>
                        <div className="text-[10px] opacity-40 uppercase tracking-tighter">Dev Tools</div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setTestModeEnabled(!testModeEnabled)}
                     className={`w-10 h-5 rounded-full transition-colors relative ${testModeEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}
                   >
                      <motion.div 
                        animate={{ x: testModeEnabled ? 20 : 0 }}
                        className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm"
                      />
                   </button>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-4 rounded-xl bg-rose-500/10 text-rose-500 flex items-center gap-4 font-bold text-sm"
                >
                  <LogOut size={20} /> تسجيل الخروج
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:p-6 z-40 lg:hidden pointer-events-none">
        <div className="glass rounded-[32px] p-2 flex justify-between items-center shadow-2xl shadow-black/40 border border-[var(--color-border)]/50 backdrop-blur-2xl pointer-events-auto">
          <TabItem 
            icon={<LayoutDashboard size={22} />} 
            label="الرئيسية" 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')}
          />
          <TabItem 
            icon={<Package size={22} />} 
            label="المخزون" 
            active={activeTab === 'inventory'} 
            onClick={() => setActiveTab('inventory')}
          />
          <div className="relative -top-8 px-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={handlePresencePulse}
              className={`w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-2xl shadow-[var(--color-primary)]/40 flex items-center justify-center hover:scale-110 transition-transform duration-300 border-4 border-[var(--color-bg-deep)] ${presenceActive ? 'animate-pulse' : ''}`}
            >
              <Fingerprint size={28} />
              {presenceActive && (
                <motion.div 
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
            </motion.button>
          </div>
          <TabItem 
            icon={<MessageCircle size={22} />} 
            label="الدردشة" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
            badge={unreadMessagesCount || undefined}
          />
          <TabItem 
            icon={<User size={22} />} 
            label="أنا" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
};

const TabItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number }> = ({ icon, label, active, onClick, badge }) => (
  <motion.button 
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 relative group ${active ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]' : 'text-[var(--color-text-secondary)] opacity-60 hover:opacity-100'}`}
  >
    {active && (
      <motion.div 
        layoutId="activeTabGlow"
        className="absolute inset-0 bg-[var(--color-primary)]/5 rounded-2xl blur-lg"
      />
    )}
    <div className="relative z-10 transition-transform group-hover:scale-110">
      {icon}
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center ring-2 ring-[var(--color-bg-card)]">
          {badge}
        </span>
      )}
    </div>
    <span className="text-[8px] font-bold uppercase tracking-tighter relative z-10">{label}</span>
    {active && (
      <motion.div 
        layoutId="activeTabDot"
        className="w-1 h-1 rounded-full bg-[var(--color-primary)] mt-0.5 shadow-[0_0_8px_var(--color-primary)]"
      />
    )}
  </motion.button>
);

import { PlanetWeather } from '../features/afiya/PlanetWeather';

const HomeView: React.FC<{ setActiveTab: (tab: ViewID) => void }> = ({ setActiveTab }) => {
  const { planetHealth, barakahPoints, currentUser, partnerStatus, tasks, inventory, messages, streaks } = usePlanet();
  const { loading, suggestion, getSmartSuggestion } = useAI();
  
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const lowInventoryItems = inventory.filter(i => i.currentStock <= i.minStock);
  const unreadMessagesCount = messages.filter(m => m.senderId !== currentUser && m.status !== 'read').length;

  const taskProgress = tasks.length > 0 ? (tasks.filter(t => t.status === 'completed').length / tasks.length) * 100 : 0;
  const inventoryHealth = inventory.length > 0 ? (inventory.filter(i => i.currentStock > i.minStock).length / inventory.length) * 100 : 100;
  const userStreak = streaks?.[currentUser]?.count || 0;

  // Mock stability data for chart
  const stabilityData = [
    { name: 'Sabt', val: 78 },
    { name: 'Ahad', val: 82 },
    { name: 'Ithn', val: 85 },
    { name: 'Thul', val: 80 },
    { name: 'Arba', val: 88 },
    { name: 'Kham', val: 92 },
    { name: 'Jumu', val: 95 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Streak Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight">أهلاً، {currentUser === 'F' ? 'فهد' : 'بشرى'} 👋</h2>
          <div className="flex items-center gap-2">
            <KokabBadge label="الأجواء صافية" variant="success" icon={<Smile size={12} />} />
            {barakahPoints > 2000 && <KokabBadge label="كوكب مبارك" variant="warning" icon={<Sparkles size={12} />} />}
            {userStreak > 0 && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full text-[10px] font-black border border-orange-500/20 shadow-lg shadow-orange-500/5"
              >
                <Zap size={12} fill="currentColor" />
                <span>{userStreak} يوم متواصل</span>
              </motion.div>
            )}
          </div>
        </div>
        <PlanetWeather />
      </div>

      {/* Quick Visual Summary - Interactive Chart */}
      <KokabCard variant="glass" padding="none" className="overflow-hidden border-emerald-500/10">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest opacity-80">استقرار الكوكب</h3>
            <p className="text-[10px] opacity-40">تطور الحالة العامة خلال الأسبوع</p>
          </div>
          <div className="text-right">
             <div className="text-2xl font-black text-emerald-400">{planetHealth.score}%</div>
             <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <TrendingUp size={10} /> +5% عن أمس
             </div>
          </div>
        </div>
        <div className="h-48 w-full pr-4 pb-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stabilityData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-bg-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: 'white'
                }}
                itemStyle={{ color: 'var(--color-primary)' }}
              />
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke="var(--color-primary)" 
                fillOpacity={1} 
                fill="url(#colorVal)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </KokabCard>

      {/* Dynamic Command Center Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <KokabStatCard 
            label="المهام المعلقة"
            value={pendingTasks.length}
            icon={<ListTodo size={24} />}
            color="#10b981"
            progress={taskProgress}
            onClick={() => setActiveTab('tasks')}
            badge={pendingTasks.length > 0 ? "نشط" : undefined}
         />

         <KokabStatCard 
            label="نواقص المنزل"
            value={lowInventoryItems.length}
            icon={<Package size={24} />}
            color="#f59e0b"
            progress={inventoryHealth}
            onClick={() => setActiveTab('inventory')}
            badge={lowInventoryItems.length > 0 ? "عاجل" : "مكتمل"}
            badgeVariant={lowInventoryItems.length > 0 ? "warning" : "success"}
         />

         <KokabStatCard 
            label="الدردشة"
            value={unreadMessagesCount}
            icon={<MessageSquare size={24} />}
            color="#3b82f6"
            onClick={() => setActiveTab('chat')}
            badge={unreadMessagesCount > 0 ? "جديد" : undefined}
            badgeVariant="danger"
         />

         <KokabStatCard 
            label="بيانات الكوكب"
            value={barakahPoints}
            icon={<Swords size={24} />}
            color="#f43f5e"
            onClick={() => setActiveTab('arena')}
         />
      </div>

      {/* Planet Health Score Section */}
      <PlanetHealthSection />

      {/* AI Smart Suggestion */}
      <KokabCard 
        variant="glass" 
        borderColor="rgba(var(--primary-rgb), 0.2)"
        whileHover={{ borderColor: 'rgba(var(--primary-rgb), 0.5)', scale: 1.01 }}
        className="bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
           <Sparkles size={80} />
        </div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--color-shadow)] shrink-0">
            <Bot size={24} />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)]">مستشار Gemini الذكي</span>
              {loading && (
                <div className="flex gap-1 items-center">
                   <span className="animate-pulse text-[10px] text-[var(--color-primary-light)]">جاري التفكير</span>
                   <div className="flex gap-0.5">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 rounded-full bg-[var(--color-primary)]/50" />
                   </div>
                </div>
              )}
            </div>
            {suggestion ? (
              <motion.p 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-bold leading-relaxed italic"
              >
                "{suggestion}"
              </motion.p>
            ) : (
              <p className="text-sm opacity-60">هل تريد نصيحة سريعة لتحسين روتين الكوكب اليوم؟</p>
            )}
            <div className="flex gap-2">
              <KokabButton 
                variant="ghost" 
                size="sm" 
                onClick={() => getSmartSuggestion('routine')}
                className="px-3 py-1 text-[10px] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                نصيحة روتينية
              </KokabButton>
              <KokabButton 
                variant="ghost" 
                size="sm" 
                onClick={() => getSmartSuggestion('wellness')}
                className="px-3 py-1 text-[10px] border border-[var(--color-primary)]/20 hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                نصيحة للعافية
              </KokabButton>
            </div>
          </div>
        </div>
      </KokabCard>

      {/* Pillars Gateway Grid - Mobile First Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PillarGateway 
          label="برج المودة" 
          description="صالون الرومانسية، سجل المودة، والاتصال العاطفي العميق."
          count={planetHealth.breakdown.spiritual} 
          color="purple" 
          icon={<Heart />} 
          onClick={() => setActiveTab('gratitude')}
        />
        <PillarGateway 
          label="برج المنظومة" 
          description="إدارة الميزانية، المهام اليومية، والخطط المالية المشتركة."
          count={planetHealth.breakdown.finance} 
          color="emerald" 
          icon={<Wallet />} 
          onClick={() => setActiveTab('ledger')}
        />
        <PillarGateway 
          label="برج العافية" 
          description="الصحة البدنية، العادات، والنمو الشخصي للزوجين."
          count={planetHealth.breakdown.health} 
          color="rose" 
          icon={<Activity />} 
          onClick={() => setActiveTab('growth')}
        />
        <PillarGateway 
          label="برج الرؤية" 
          description="كبسولة الزمن، مخطط الرحلات، وتطلعات المستقبل المشترك."
          count={Math.round((planetHealth.breakdown.spiritual + planetHealth.breakdown.finance + planetHealth.breakdown.health) / 3)} 
          color="blue" 
          icon={<Plane />} 
          onClick={() => setActiveTab('travel')}
        />
      </div>

      {/* Quick Actions - Simplified */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-40 px-1 italic">وصول سريع</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          <QuickAction 
            icon={<Bot size={20} />} 
            label="مستشار Gemini" 
            color="rose" 
            onClick={() => setActiveTab('ai')}
          />
          <QuickAction 
            icon={<Target size={20} />} 
            label="صندوق الغد" 
            color="emerald" 
            onClick={() => setActiveTab('future_fund')}
          />
          <QuickAction 
            icon={<FileText size={20} />} 
            label="الأرشيف" 
            color="amber" 
            onClick={() => setActiveTab('vault')}
          />
          <QuickAction 
            icon={<LayoutDashboard size={20} />} 
            label="اللوحة السحابية" 
            color="blue" 
            onClick={() => setActiveTab('system')}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick: () => void }> = ({ icon, label, color, onClick }) => {
  const colorMap = {
    blue: 'bg-blue-500/20 text-blue-500 border-blue-500/20',
    emerald: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20',
    purple: 'bg-purple-500/20 text-purple-500 border-purple-500/20',
    rose: 'bg-rose-500/20 text-rose-500 border-rose-500/20',
    amber: 'bg-amber-500/20 text-amber-500 border-amber-500/20'
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-shrink-0 w-24 h-24 glass-card flex flex-col items-center justify-center gap-2 hover:bg-[var(--color-primary)]/10 transition-all duration-300 hover:scale-[1.05] group border border-[var(--color-border)]/40"
    >
      <div className={`w-10 h-10 rounded-2xl ${colorMap[color as keyof typeof colorMap]} flex items-center justify-center group-hover:rotate-12 transition-transform border`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </motion.button>
  );
};

const PillarCard: React.FC<{ label: string; value: number; color: 'blue' | 'emerald' | 'purple' | 'rose'; icon: React.ReactNode }> = ({ label, value, color, icon }) => {
  const colorMap = {
    blue: 'bg-blue-500 text-blue-500',
    emerald: 'bg-emerald-500 text-emerald-500',
    purple: 'bg-purple-500 text-purple-500',
    rose: 'bg-rose-500 text-rose-500'
  };

  return (
    <div className="glass-card p-5 space-y-4 relative overflow-hidden group">
      <div className="absolute -right-2 -top-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        {React.cloneElement(icon as React.ReactElement, { size: 64 })}
      </div>
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg ${colorMap[color].split(' ')[0]}/10 ${colorMap[color].split(' ')[1]}`}>
          {icon}
        </div>
        <span className={`text-lg font-black ${colorMap[color].split(' ')[1]}`}>{value}%</span>
      </div>
      <div className="space-y-2 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{label}</span>
        <div className="h-1.5 w-full bg-[var(--color-bg-surface)] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${colorMap[color].split(' ')[0]}`}
          />
        </div>
      </div>
    </div>
  );
};
