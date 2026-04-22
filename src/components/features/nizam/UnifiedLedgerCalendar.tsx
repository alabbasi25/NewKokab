import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'motion/react';
import { CreditCard, Calendar as CalendarIcon, Info } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';
import { Transaction, Liability } from '../../../types';

interface UnifiedLedgerCalendarProps {
  transactions: Transaction[];
  liabilities: Liability[];
}

export const UnifiedLedgerCalendar: React.FC<UnifiedLedgerCalendarProps> = ({ transactions, liabilities }) => {
  const [value, setValue] = useState(new Date());

  const getDayContent = (date: Date) => {
    const dayTransactions = transactions.filter(t => {
      const tDate = new Date(t.timestamp);
      return tDate.getDate() === date.getDate() && 
             tDate.getMonth() === date.getMonth() && 
             tDate.getFullYear() === date.getFullYear();
    });

    const dayLiabilities = liabilities.filter(l => {
      const lDate = new Date(l.dueDate);
      return lDate.getDate() === date.getDate() && 
             lDate.getMonth() === date.getMonth() && 
             lDate.getFullYear() === date.getFullYear();
    });

    if (dayTransactions.length === 0 && dayLiabilities.length === 0) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-1">
        {dayTransactions.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]" />}
        {dayLiabilities.length > 0 && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]" />}
      </div>
    );
  };

  const selectedDateTransactions = transactions.filter(t => {
    const tDate = new Date(t.timestamp);
    return tDate.getDate() === value.getDate() && 
           tDate.getMonth() === value.getMonth() && 
           tDate.getFullYear() === value.getFullYear();
  });

  const selectedDateLiabilities = liabilities.filter(l => {
    const lDate = new Date(l.dueDate);
    return lDate.getDate() === value.getDate() && 
           lDate.getMonth() === value.getMonth() && 
           lDate.getFullYear() === value.getFullYear();
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      <div className="glass-card p-4 overflow-hidden ledger-calendar-container">
        <Calendar 
          onChange={(val: any) => setValue(val as Date)} 
          value={value}
          tileContent={({ date, view }) => view === 'month' ? getDayContent(date) : null}
          className="bg-transparent border-none w-full text-white font-sans"
        />
        
        <style>{`
          .ledger-calendar-container .react-calendar {
            background: transparent !important;
            border: none !important;
            width: 100% !important;
            font-family: inherit !important;
          }
          .ledger-calendar-container .react-calendar__navigation button {
            color: white !important;
            font-weight: 900 !important;
            text-transform: uppercase !important;
            font-size: 12px !important;
          }
          .ledger-calendar-container .react-calendar__navigation button:hover {
            background: rgba(255, 255, 255, 0.05) !important;
          }
          .ledger-calendar-container .react-calendar__month-view__weekdays__weekday {
            color: rgba(255, 255, 255, 0.3) !important;
            font-size: 10px !important;
            font-weight: 900 !important;
            text-decoration: none !important;
          }
          .ledger-calendar-container .react-calendar__tile {
            color: white !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            height: 60px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            border-radius: 12px !important;
          }
          .ledger-calendar-container .react-calendar__tile:hover {
            background: rgba(255, 255, 255, 0.05) !important;
          }
          .ledger-calendar-container .react-calendar__tile--active {
            background: var(--color-primary) !important;
            color: white !important;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
          }
          .ledger-calendar-container .react-calendar__tile--now {
            background: rgba(16, 185, 129, 0.1) !important;
            color: #10b981 !important;
          }
          .ledger-calendar-container .react-calendar__month-view__days__tile--neighboringMonth {
            opacity: 0.2 !important;
          }
        `}</style>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest opacity-40 px-2">
          أحداث {value.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
        </h3>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar pr-1">
          {selectedDateTransactions.length === 0 && selectedDateLiabilities.length === 0 && (
            <div className="glass-card p-8 flex flex-col items-center justify-center opacity-30 text-center space-y-2">
              <Info size={24} />
              <p className="text-[10px] font-bold">لا توجد عمليات مبرمجة</p>
            </div>
          )}

          {selectedDateLiabilities.map(l => (
            <motion.div 
              key={l.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-4 border-rose-500/10 bg-rose-500/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center">
                  <CreditCard size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-black">{l.name}</div>
                  <div className="text-[8px] font-bold text-rose-500 uppercase tracking-widest">التزام مستحق</div>
                </div>
                <div className="mr-auto text-[10px] font-black tabular-nums">
                  ${l.monthlyInstallment.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}

          {selectedDateTransactions.map(t => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                  <CalendarIcon size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-black">{t.description}</div>
                  <div className="text-[8px] font-bold opacity-40 uppercase tracking-widest">{t.category}</div>
                </div>
                <div className="mr-auto text-[10px] font-black text-rose-500 tabular-nums">
                  -${t.amount.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
