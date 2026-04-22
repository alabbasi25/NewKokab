import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface KokabCardProps extends HTMLMotionProps<"div"> {
  variant?: 'glass' | 'solid' | 'outline' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: string;
  shadowColor?: string;
  glow?: boolean;
}

export const KokabCard: React.FC<KokabCardProps> = ({ 
  children, 
  variant = 'glass', 
  padding = 'md',
  borderColor,
  shadowColor,
  glow = false,
  className = '',
  style,
  ...props 
}) => {
  const variants = {
    glass: 'glass-card backdrop-blur-2xl',
    solid: 'bg-[var(--color-bg-card)] border border-[var(--color-border)]/30 rounded-[2rem]',
    outline: 'bg-transparent border-2 border-[var(--color-border)] rounded-[2rem]',
    gradient: 'bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-deep)] border border-[var(--color-border)]/30 rounded-[2rem]'
  };

  const customStyle = {
    ...style,
    ...(borderColor ? { borderColor } : {}),
    ...(shadowColor ? { '--color-shadow': shadowColor } as React.CSSProperties : {})
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={glow ? { 
        boxShadow: `0 0 40px ${shadowColor || 'var(--color-shadow)'}`,
        borderColor: borderColor || 'var(--color-primary)',
        y: -4
      } : {}}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={customStyle}
      className={`
        ${variants[variant]}
        ${paddings[padding]}
        ${glow ? 'transition-all duration-500' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};
