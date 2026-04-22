'use client';
import React from 'react';
import { UserID } from '@/types';

export const Dashboard = ({ onSwitchUser }: { onSwitchUser: (id?: UserID) => void }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">لوحة التحكم</h1>
      <button 
        onClick={() => onSwitchUser()}
        className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-xs"
      >
        تبديل المستخدم
      </button>
    </div>
  );
};
