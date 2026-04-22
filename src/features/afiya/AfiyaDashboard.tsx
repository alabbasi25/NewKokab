'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Droplets, 
  Moon, 
  Smile, 
  Activity, 
  Sparkles,
  ChevronRight,
  Wind
} from 'lucide-react';
import { useAfiya } from '@/context/AfiyaContext';
import { VitalSignsLog } from '@/components/features/afiya/VitalSignsLog';
import { HydrationStation } from '@/components/features/afiya/HydrationStation';
import { MoodTracker } from '@/components/features/afiya/MoodTracker';
import { WorshipSync } from '@/components/features/afiya/WorshipSync';
import { useAppStore } from '@/store/useAppStore';

type AfiyaTab = 'overview' | 'vitals' | 'hydration' | 'spiritual' | 'mood';

export const AfiyaDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState<AfiyaTab>('overview');
  const { vitals, weather } = useAfiya();
  const { user } = useAppStore();
  const userId = user?.userId || 'user_test_1';
  const myVitals = vitals[userId];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'vitals': return <VitalSignsLog />;
      case 'hydration': return <HydrationStation />;
      case 'mood': return <MoodTracker />;
      case 'spiritual': return <WorshipSync />;
      default: return <Overview myVitals={myVitals} weather={weather} onNavigate={setActiveSubTab} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 pb-12">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2 text-emerald-400">
           <Wind size={18} />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">مركز العافية</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight">واحة السلام</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-2xl overflow-x-auto no-scrollbar">
         {[
           { id: 'overview', label: 'نظرة عامة', icon: Sparkles },
           { id: 'vitals', label: 'الصحة', icon: Activity },
           { id: 'hydration', label: 'الترطيب', icon: Droplets },
           { id: 'mood', label: 'المزاج', icon: Smile },
           { id: 'spiritual', label: 'الروحانية', icon: Moon }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveSubTab(tab.id as AfiyaTab)}
             className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
               activeSubTab === tab.id 
                 ? 'bg-white text-black font-black shadow-lg scale-105' 
                 : 'opacity-40 font-bold text-xs hover:opacity-100 hover:bg-white/5'
             }`}
           >
             <tab.icon size={14} />
             <span>{tab.label}</span>
           </button>
         ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Overview = ({ myVitals, weather, onNavigate }: any) => {
  return (
    <div className="flex flex-col gap-6">
      {/* AI Wellness Insight Card */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card p-8 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-emerald-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={40} className="text-emerald-400" />
        </div>
        <div className="flex flex-col gap-4 relative z-10">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">توصية اليوم الذكية</span>
           </div>
           <p className="text-lg font-bold leading-relaxed">
             "معدل نومك يشير إلى استقرار جيد. ننصح بـ ٢٠ دقيقة من المشي الهادئ المسائي لتعزيز جودة النوم أكثر."
           </p>
           <button className="text-[10px] font-black underline underline-offset-4 decoration-emerald-500/40 opacity-60">اطلب تحليلًا معمقًا عبر Gemini</button>
        </div>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<Moon size={20} />} 
          title="النوم" 
          value={`${myVitals.sleepQuality}%`} 
          color="text-indigo-400" 
          onClick={() => onNavigate('vitals')}
        />
        <StatCard 
          icon={<Droplets size={20} />} 
          title="الماء" 
          value="١.٥ لتر" 
          color="text-blue-400" 
          onClick={() => onNavigate('hydration')}
        />
        <StatCard 
          icon={<Heart size={20} />} 
          title="الحالة" 
          value="رائع" 
          color="text-rose-400" 
          onClick={() => onNavigate('mood')}
        />
        <StatCard 
          icon={<Activity size={20} />} 
          title="الخطوات" 
          value={myVitals.steps.toLocaleString()} 
          color="text-emerald-400" 
          onClick={() => onNavigate('vitals')}
        />
      </div>

      {/* Weather / Atmosphere Card */}
      <div onClick={() => onNavigate('spiritual')} className="glass-card p-6 flex flex-col gap-4 border-white/5 cursor-pointer hover:bg-white/[0.02] transition-all">
         <div className="flex justify-between items-center">
            <h3 className="text-xs font-black opacity-40 uppercase tracking-widest">جو الكوكب الحالي</h3>
            <span className="text-[10px] p-1 px-2 bg-emerald-500/10 text-emerald-500 rounded-full font-black uppercase">إيجابي عالي</span>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-4xl">☀️</div>
            <div>
               <p className="font-bold">{weather.reason}</p>
               <p className="text-[10px] opacity-40 mt-1">{weather.suggestion}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, onClick }: any) => (
  <div 
    onClick={onClick}
    className="glass-card p-5 flex flex-col gap-3 group cursor-pointer border-white/5 hover:border-white/10 active:scale-95 transition-all"
  >
     <div className={`p-2 w-fit rounded-xl bg-white/5 ${color} opacity-40 group-hover:opacity-100 transition-opacity`}>
        {icon}
     </div>
     <div>
        <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-center justify-between">
           <span className="text-xl font-black">{value}</span>
           <ChevronRight size={14} className="opacity-0 group-hover:opacity-30 transition-opacity" />
        </div>
     </div>
  </div>
);
