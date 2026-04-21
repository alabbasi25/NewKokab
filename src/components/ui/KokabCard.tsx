import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface KokabCardProps extends HTMLMotionProps<"div"> {
  variant?: 'glass' | 'solid' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderColor?: string;
}

export const KokabCard: React.FC<KokabCardProps> = ({ 
  children, 
  variant = 'glass', 
  padding = 'md',
  borderColor,
  className = '',
  style,
  ...props 
}) => {
  const variants = {
    glass: 'glass-card backdrop-blur-2xl',
    solid: 'bg-[var(--color-bg-card)] border rounded-[2rem]',
    outline: 'bg-transparent border-2 rounded-[2rem]'
  };

  const customStyle = {
    ...style,
    ...(borderColor ? { borderColor } : {})
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={customStyle}
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};
