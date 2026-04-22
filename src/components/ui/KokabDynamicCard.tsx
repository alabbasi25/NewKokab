import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KokabCard } from './KokabCard';
import { KokabButton } from './KokabButton';
import { KokabBadge } from './KokabBadge';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface CardSection {
  title: string;
  items: {
    label: string;
    value: string | number;
    status?: 'success' | 'warning' | 'danger' | 'info';
  }[];
}

interface KokabDynamicCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  sections: CardSection[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  variant?: 'glass' | 'solid' | 'gradient';
  accentColor?: string;
}

export const KokabDynamicCard: React.FC<KokabDynamicCardProps> = ({
  title,
  subtitle,
  icon,
  sections,
  primaryAction,
  variant = 'glass',
  accentColor = 'var(--color-primary)',
}) => {
  return (
    <KokabCard 
      variant={variant} 
      padding="none" 
      glow 
      borderColor={`${accentColor}33`}
      shadowColor={`${accentColor}22`}
      className="overflow-hidden flex flex-col group h-full transition-all duration-700 hover:bg-gradient-to-br hover:from-[var(--color-bg-card)] hover:to-[var(--color-bg-deep)]"
    >
      {/* Header section with icon and titles */}
      <div className="p-6 border-b border-[var(--color-border)]/20 bg-gradient-to-r from-[var(--color-bg-card)]/50 to-transparent relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-32 h-32 bg-opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" 
          style={{ backgroundColor: accentColor }} 
        />
        
        <div className="flex items-center gap-4 relative z-10">
          {icon && (
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              <div className="group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-black tracking-tighter">{title}</h3>
            {subtitle && <p className="text-xs opacity-50 font-bold">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* Structured content: dynamic columns/sections */}
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx} 
                  className="flex justify-between items-center group/item p-2 -mx-2 rounded-xl hover:bg-[var(--color-bg-surface)]/20 transition-colors"
                >
                  <span className="text-xs font-bold opacity-70">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black">{item.value}</span>
                    {item.status && (
                      <div 
                        className={`w-1.5 h-1.5 rounded-full ring-4 shadow-sm ${
                          item.status === 'success' ? 'bg-emerald-500 ring-emerald-500/10' :
                          item.status === 'warning' ? 'bg-amber-500 ring-amber-500/10' :
                          item.status === 'danger' ? 'bg-rose-500 ring-rose-500/10' :
                          'bg-sky-400 ring-sky-400/10'
                        }`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      {primaryAction && (
        <div className="px-6 py-5 bg-[var(--color-bg-deep)]/30 border-t border-[var(--color-border)]/20 flex justify-end">
          <KokabButton 
            onClick={primaryAction.onClick}
            variant="ghost"
            size="sm"
            className="group/btn gap-2 font-black transition-all hover:pr-8 hover:bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          >
            {primaryAction.label}
            {primaryAction.icon || <ArrowRight size={16} className="rotate-180 group-hover/btn:translate-x-1 transition-transform" />}
          </KokabButton>
        </div>
      )}
    </KokabCard>
  );
};
