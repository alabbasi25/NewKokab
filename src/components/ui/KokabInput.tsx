import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface KokabInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  maxLength?: number;
  showCounter?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
}

export const KokabInput: React.FC<KokabInputProps> = ({
  label,
  error,
  success,
  maxLength,
  showCounter = false,
  helperText,
  icon,
  className = '',
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const currentLength = String(value || '').length;

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      <div className="flex justify-between items-end px-1">
        <label className="text-[10px] font-black uppercase tracking-widest opacity-60">
          {label}
        </label>
        {showCounter && maxLength && (
          <span className={`text-[8px] font-bold ${currentLength > maxLength ? 'text-rose-500' : 'opacity-40'}`}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <div className="relative group">
        <div className={`
          absolute inset-0 rounded-xl blur-md transition-all duration-300 opacity-0 group-hover:opacity-100
          ${isFocused ? 'bg-[var(--color-primary)]/10 scale-105' : 'bg-white/5'}
        `} />
        
        <div className={`
          relative flex items-center bg-white/5 border rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-200
          ${isFocused ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20' : 'border-white/10 group-hover:border-white/20'}
          ${error ? 'border-rose-500/50' : ''}
          ${success ? 'border-emerald-500/50' : ''}
        `}>
          {icon && (
            <div className={`pl-4 opacity-40 transition-colors ${isFocused ? 'text-[var(--color-primary)] opacity-100' : ''}`}>
              {icon}
            </div>
          )}
          
          <input
            {...props}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className="w-full bg-transparent px-4 py-3 text-sm focus:outline-none placeholder:text-white/20 rtl"
          />

          <div className="flex items-center gap-2 pr-4">
            <AnimatePresence mode="popLayout">
              {error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <AlertCircle size={16} className="text-rose-500" />
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] text-rose-400 font-medium px-1"
          >
            {error}
          </motion.p>
        ) : helperText ? (
          <p className="text-[10px] opacity-40 px-1 italic">
            {helperText}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
