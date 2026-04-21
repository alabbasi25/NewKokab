import React from 'react';
import { motion } from 'motion/react';

interface KokabProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export const KokabProgressBar: React.FC<KokabProgressBarProps> = ({
  value,
  max = 100,
  label,
  variant = 'primary',
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    primary: 'bg-[var(--color-primary)]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-blue-500',
  };

  const heights = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest opacity-60">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${variants[variant]} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
        />
      </div>
    </div>
  );
};
