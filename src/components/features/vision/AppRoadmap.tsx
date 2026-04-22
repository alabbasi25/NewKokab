import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, 
  Sparkles, 
  Heart, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp, 
  MessageSquare, 
  Bot, 
  Camera, 
  Calendar, 
  Wallet,
  Clock,
  CheckCircle2,
  Construction
} from 'lucide-react';
import { KokabCard } from '../../ui/KokabCard';
import { KokabBadge } from '../../ui/KokabBadge';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed';
  quarter: string;
  icon: React.ReactNode;
  pillar: 'mawadda' | 'nizam' | 'afiya' | 'vision';
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'مستشار Gemini الصوتي الحي',
    description: 'دعم عاطفي واجتماعي فوري عبر محادثات صوتية طبيعية لحل الخلافات وتقديم النصائح.',
    status: 'in-progress',
    quarter: 'Q2 2026',
    icon: <Bot className="text-blue-500" />,
    pillar: 'mawadda'
  },
  {
    id: '2',
    title: 'نظام المشتريات الذكي (Auto-Stock)',
    description: 'توصيات تلقائية لقائمة المشتريات بناءً على معدل الاستهلاك والتفضيلات العائلية.',
    status: 'planned',
    quarter: 'Q3 2026',
    icon: <Zap className="text-amber-500" />,
    pillar: 'nizam'
  },
  {
    id: '3',
    title: 'النبض الافتراضي (Haptic Connect)',
    description: 'إرسال واستقبال نبضات اهتزازية تعبر عن التواجد والاهتمام حتى أثناء الانشغال.',
    status: 'planned',
    quarter: 'Q3 2026',
    icon: <Heart className="text-rose-500" />,
    pillar: 'mawadda'
  },
  {
    id: '4',
    title: 'تحديات الرشاقة المشتركة',
    description: 'ربط بيانات الصحة (الخطوات، النوم) في ساحة تحدي بين الزوجين لزيادة النشاط والمتعة.',
    status: 'planned',
    quarter: 'Q4 2026',
    icon: <TrendingUp className="text-emerald-500" />,
    pillar: 'afiya'
  },
  {
    id: '5',
    title: 'أرشيف الإرث العائلي',
    description: 'مساحة لتخزين الفيديوهات والصور والوثائق الهامة للأبناء والأجيال القادمة.',
    status: 'planned',
    quarter: 'Q1 2027',
    icon: <Shield className="text-purple-500" />,
    pillar: 'vision'
  },
  {
    id: '6',
    title: 'مساعد السفر المتكامل',
    description: 'تخطيط الرحلة من الألف إلى الياء، من حجز التذاكر إلى تنظيم الجدول اليومي بالذكرى.',
    status: 'completed',
    quarter: 'Q1 2026',
    icon: <Globe className="text-sky-500" />,
    pillar: 'vision'
  }
];

export const AppRoadmap: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-32">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-4 rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-2 shadow-inner border border-[var(--color-primary)]/10">
          <Rocket size={40} className="animate-bounce" />
        </div>
        <h2 className="text-3xl font-black tracking-tight">خارطة طريق كوكب ٢٠٢٦</h2>
        <p className="text-sm opacity-50 max-w-xs mx-auto leading-relaxed">
          نعمل باستمرار على تطوير "كوكب" ليكون الملاذ الرقمي الأكمل لكل زوجين يسعيان للنمو والسعادة.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <StatusCard label="مكتمل" count={1} color="bg-emerald-500" />
        <StatusCard label="تحت التطوير" count={1} color="bg-blue-500" />
        <StatusCard label="مخطط له" count={4} color="bg-amber-500" />
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-6 relative before:absolute before:right-6 before:top-4 before:bottom-4 before:w-1 before:bg-white/5 before:rounded-full">
        {roadmapData.map((item, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={item.id} 
            className="relative pr-12 group"
          >
            {/* Timeline Dot */}
            <div className={`absolute right-4 top-8 w-4 h-4 rounded-full border-4 border-[var(--color-bg-deep)] z-10 transition-transform group-hover:scale-125 ${
              item.status === 'completed' ? 'bg-emerald-500' : 
              item.status === 'in-progress' ? 'bg-blue-500 animate-pulse' : 'bg-white/20'
            }`} />

            <KokabCard variant="glass" className={`p-6 space-y-4 transition-all group-hover:border-[var(--color-primary)]/50 ${item.status === 'completed' ? 'opacity-60' : ''}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={12} className="opacity-40" />
                      <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{item.quarter}</span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <p className="text-sm opacity-60 leading-relaxed font-medium">
                {item.description}
              </p>

              {item.pillar && (
                <div className="flex gap-2 pt-2">
                   <KokabBadge 
                     label={item.pillar === 'mawadda' ? 'ركن المودة' : item.pillar === 'nizam' ? 'ركن المنظومة' : item.pillar === 'afiya' ? 'ركن العافية' : 'ركن الرؤية'} 
                     variant="secondary" 
                     className="text-[9px] px-2 py-0.5 border border-white/5" 
                   />
                </div>
              )}
            </KokabCard>
          </motion.div>
        ))}
      </div>

      {/* Future Vision Footer */}
      <KokabCard variant="glass" className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent p-8 text-center space-y-4 border-[var(--color-primary)]/20">
        <Sparkles size={32} className="mx-auto text-[var(--color-primary)]" />
        <h4 className="text-xl font-black">رؤيتنا المستدامة</h4>
        <p className="text-sm opacity-60 leading-relaxed italic">
          "نهدف لجعل كوكب ليس مجرد تطبيق، بل هو نظام حياة يسهل التفاصيل، يعمق المشاعر، ويحفظ الذكريات للأجيال القادمة."
        </p>
      </KokabCard>
    </motion.div>
  );
};

const StatusBadge: React.FC<{ status: RoadmapItem['status'] }> = ({ status }) => {
  const configs = {
    planned: { label: 'مخطط', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    'in-progress': { label: 'جاري العمل', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse' },
    completed: { label: 'مكتمل', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }
  };

  const config = configs[status];

  return (
    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.color}`}>
      {config.label}
    </div>
  );
};

const StatusCard: React.FC<{ label: string; count: number; color: string }> = ({ label, count, color }) => (
  <div className="glass-card p-4 flex flex-col items-center justify-center gap-1 border-white/5">
     <div className={`w-2 h-2 rounded-full ${color} mb-1 shadow-lg shadow-[var(--color-primary)]/20`} />
     <span className="text-[10px] font-black opacity-30 uppercase tracking-widest text-center leading-tight">{label}</span>
     <span className="text-xl font-black">{count}</span>
  </div>
);
