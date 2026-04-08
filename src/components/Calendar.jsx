import React from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { MONTH_THEMES } from '../utils/dateUtils';
import SpiralBinding from './SpiralBinding';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';

export default function Calendar() {
  const cal   = useCalendar();
  const theme = MONTH_THEMES[cal.currentMonth];

  return (
    // Full-viewport centering + ambient background
    <div
      className="min-h-screen flex items-center justify-center p-3 md:p-6"
      style={{
        background: `linear-gradient(135deg, ${theme.dark}22 0%, #f5f0e8 60%, ${theme.accent}18 100%)`,
        fontFamily: "'Karla', sans-serif",
        transition: 'background 0.6s ease',
      }}
    >
     
      <div
        className="w-full overflow-hidden relative paper-texture"
        style={{
          maxWidth: '860px',
          borderRadius: '16px',
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.14), 0 2px 0 rgba(255,255,255,0.9) inset',
          background: '#fefcf8',
          
        }}
      >
        
        <SpiralBinding accentColor={theme.accent} />

        
        <HeroSection
          currentMonth={cal.currentMonth}
          currentYear={cal.currentYear}
          navigate={cal.navigate}
          goToToday={cal.goToToday}
          theme={theme}
        />

      
        <div className="flex flex-col md:flex-row" style={{ minHeight: '380px' }}>
          <NotesSection
            currentMonth={cal.currentMonth}
            currentYear={cal.currentYear}
            startDate={cal.startDate}
            endDate={cal.endDate}
            notes={cal.notes}
            monthNoteKey={cal.monthNoteKey}
            saveNote={cal.saveNote}
            theme={theme}
          />

          <CalendarGrid
            today={cal.today}
            currentYear={cal.currentYear}
            currentMonth={cal.currentMonth}
            startDate={cal.startDate}
            endDate={cal.endDate}
            effectiveEnd={cal.effectiveEnd}
            selectionPhase={cal.selectionPhase}
            hoverDate={cal.hoverDate}
            setHoverDate={cal.setHoverDate}
            handleDateClick={cal.handleDateClick}
            clearSelection={cal.clearSelection}
            animKey={cal.animKey}
            animDir={cal.animDir}
            theme={theme}
          />
        </div>

        <div
          className="px-6 py-2.5 border-t flex items-center justify-between"
          style={{ borderColor: '#ede9e3', background: '#f7f5f0' }}
        >
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#c7c3bd', fontFamily: "'Karla', sans-serif" }}
          >
            Interactive Wall Calendar
          </p>
          <p
            className="text-xs"
            style={{ color: '#c7c3bd', fontFamily: "'Karla', sans-serif" }}
          >
            Notes auto-saved · Hover to preview range
          </p>
        </div>
      </div>
    </div>
  );
}
