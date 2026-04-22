'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Music, 
  Camera, 
  MessageSquareHeart,
  Flame,
  Star
} from 'lucide-react';
import { RomanceLounge } from '@/components/features/mawadda/RomanceLounge';
import { GratitudeFeed } from '@/components/features/mawadda/GratitudeFeed';
import { DateNightAI } from '@/components/features/mawadda/DateNightAI';
import { SharedJournal } from '@/components/features/mawadda/SharedJournal';
import { PrivateSanctum } from '@/components/features/mawadda/PrivateSanctum';

type MawaddaTab = 'lounge' | 'gratitude' | 'dates' | 'journal' | 'sanctum';

export const MawaddaDashboard = () => {
  const [activeSubTab, setActiveSubTab] = useState<MawaddaTab>('lounge');

  const renderContent = () => {
    switch (activeSubTab) {
      case 'gratitude': return <GratitudeFeed />;
      case 'dates': return <DateNightAI />;
      case 'journal': return <SharedJournal />;
      case 'sanctum': return <PrivateSanctum />;
      default: return <RomanceLounge />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 pb-12">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-2 text-rose-400">
           <Heart size={18} fill="currentColor" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">رواق المودة</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight">مساحتنا الخاصة</h2>
      </div>

      {/* Sub Navigation */}
      <div className="flex gap-2 p-1 bg-rose-500/5 rounded-2xl overflow-x-auto no-scrollbar">
         {[
           { id: 'lounge', label: 'الرواق', icon: MessageSquareHeart },
           { id: 'gratitude', label: 'امتنان', icon: Star },
           { id: 'dates', label: 'مواعيدنا', icon: Calendar },
           { id: 'journal', label: 'مذكرات', icon: Camera },
           { id: 'sanctum', label: 'الحرم', icon: Flame }
         ].map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveSubTab(tab.id as MawaddaTab)}
             className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
               activeSubTab === tab.id 
                 ? 'bg-rose-500 text-white font-black shadow-lg scale-105' 
                 : 'opacity-40 font-bold text-xs hover:opacity-100 hover:bg-rose-500/10'
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
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.98 }}
           transition={{ duration: 0.3 }}
           className="min-h-[400px]"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Quick Access Floating Suggestion */}
      {activeSubTab === 'lounge' && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card p-6 bg-gradient-to-r from-rose-500/10 border-rose-500/20"
        >
           <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500 rounded-2xl text-white shadow-xl shadow-rose-500/20">
                 <Sparkles size={20} />
              </div>
              <div className="flex-1">
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">مقترح اللحظة</p>
                 <p className="font-bold text-sm">"ما هو أجمل ذكرى لنا في هذا الشهر؟ شاركاها الآن في المذكرات."</p>
              </div>
           </div>
        </motion.div>
      )}
    </div>
  );
};
