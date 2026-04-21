import React from 'react';
import { motion } from 'motion/react';
import { KokabProgressBar } from './KokabProgressBar';

interface KokabStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  onClick?: () => void;
  badge?: string;
  badgeVariant?: 'success' | 'warning' | 'danger';
}

export const KokabStatCard: React.FC<KokabStatCardProps> = ({
  label,
  value,
  icon,
  color,
  progress,
  onClick,
  badge,
  badgeVariant = 'success',
}) => {
  return (
    <motion.button 
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="glass-card p-4 flex flex-col gap-3 border-opacity-20 group relative overflow-hidden text-right rtl"
      style={{ borderColor: `${color}33` }}
    >
      <div className="absolute inset-0 bg-opacity-[0.05] group-hover:bg-opacity-[0.1] transition-colors" style={{ backgroundColor: color }} />
      <div className="absolute top-0 left-0 w-full h-1 bg-opacity-0 group-hover:bg-opacity-40 transition-all" style={{ backgroundColor: color }} />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="p-2 rounded-xl bg-opacity-10" style={{ backgroundColor: color, color: color }}>
          {icon}
        </div>
        {badge && (
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase ${
            badgeVariant === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
            badgeVariant === 'warning' ? 'bg-amber-500/20 text-amber-400' :
            'bg-rose-500/20 text-rose-400'
          }`}>
            {badge}
          </span>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{label}</span>
        <motion.div 
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-black" 
          style={{ color }}
        >
          {value}
        </motion.div>
      </div>

      {progress !== undefined && (
        <div className="relative z-10 pt-1">
          <KokabProgressBar 
            value={progress} 
            size="sm" 
            variant={progress > 80 ? 'success' : progress > 40 ? 'warning' : 'danger'} 
          />
        </div>
      )}
    </motion.button>
  );
};
