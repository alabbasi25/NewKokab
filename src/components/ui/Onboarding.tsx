'use client';
import React from 'react';

export const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-black mb-4 tracking-tighter text-white">مرحباً بك في كوكب</h1>
      <p className="opacity-60 mb-8 text-sm">مساحة خاصة بينكما، تبدأ بالوعي وتنتهي بالمودة.</p>
      <button 
        onClick={onComplete}
        className="w-full py-4 bg-white text-black font-black rounded-2xl"
      >
        ابدأ الرحلة
      </button>
    </div>
  );
};
