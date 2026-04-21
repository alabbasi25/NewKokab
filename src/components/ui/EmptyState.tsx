import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center space-y-6 glass-card"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-primary)]/20 animate-pulse">
        <Icon size={48} />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-black">{title}</h3>
        <p className="text-sm opacity-50 max-w-[280px] leading-relaxed mx-auto italic">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary flex items-center gap-2"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};
