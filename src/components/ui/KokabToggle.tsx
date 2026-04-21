import React from 'react';
import { motion } from 'motion/react';

interface KokabToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon?: React.ReactNode;
}

export const KokabToggle: React.FC<KokabToggleProps> = ({ label, description, enabled, onChange, icon }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl glass-card transition-all hover:bg-white/5 group">
      <div className="flex items-center gap-4">
        {icon && (
          <div className={`p-2.5 rounded-xl transition-all duration-300 ${enabled ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'bg-white/5 opacity-40 shadow-inner'}`}>
            {icon}
          </div>
        )}
        <div className="text-right">
          <div className="text-sm font-black">{label}</div>
          {description && <div className="text-[10px] opacity-40 uppercase tracking-tighter mt-0.5">{description}</div>}
        </div>
      </div>
      
      <button 
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full transition-all duration-500 relative flex items-center px-1 border-2 ${enabled ? 'bg-[var(--color-primary)] border-[var(--color-primary)]/50 shadow-lg shadow-[var(--color-primary)]/20' : 'bg-white/10 border-white/5'}`}
      >
        <motion.div 
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-4 h-4 rounded-full bg-white shadow-sm ring-2 ring-black/5"
        />
      </button>
    </div>
  );
};
