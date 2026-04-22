'use client';

import React, { useState } from 'react';
import TaskDashboard from '@/features/tasks/TaskDashboard';
import { FinanceDashboard } from '@/features/finance/FinanceDashboard';
import { AfiyaDashboard } from '@/features/afiya/AfiyaDashboard';
import { MawaddaDashboard } from '@/features/mawadda/MawaddaDashboard';
import { useAppStore } from '@/store/useAppStore';
import { NizamProvider } from '@/context/NizamContext';
import { AfiyaProvider } from '@/context/AfiyaContext';
import { CoreProvider } from '@/context/CoreContext';

export default function HomePage() {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState('الرئيسية');
  
  // Use trial ID if not present
  const activeUserId = user?.userId || 'user_test_1';

  const renderContent = () => {
    switch (activeTab) {
      case 'السجل':
        return <FinanceDashboard />;
      case 'العافية':
        return <AfiyaDashboard />;
      case 'المودة':
        return <MawaddaDashboard />;
      default:
        return <TaskDashboard />;
    }
  };

  return (
    <CoreProvider currentUserId={activeUserId}>
      <AfiyaProvider userId={activeUserId}>
        <NizamProvider userId={activeUserId}>
          <div className="flex flex-col min-h-screen pb-24 max-w-md mx-auto bg-black">
            {/* Top Banner / Welcome */}
            <div className="p-8 pb-4">
              <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase italic">كوكب</h1>
              <p className="text-[10px] opacity-30 font-black uppercase tracking-[0.2em] leading-tight">Beyond Life Management • Test Mode</p>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
            
            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 p-4 max-w-md mx-auto z-40">
              <div className="glass-card p-2 flex justify-around items-center backdrop-blur-3xl bg-white/[0.03] border-white/5 rounded-[2.5rem]">
                {[
                  { id: 'الرئيسية', icon: '🏠' },
                  { id: 'السجل', icon: '💳' },
                  { id: 'العافية', icon: '🌿' },
                  { id: 'المودة', icon: '❤️' }
                ].map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                      activeTab === tab.id ? 'bg-white/10 opacity-100' : 'opacity-30 hover:opacity-100'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-[8px] font-black uppercase">{tab.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </NizamProvider>
      </AfiyaProvider>
    </CoreProvider>
  );
}
