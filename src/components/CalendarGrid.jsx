import React, { useMemo } from 'react';
import {
  DAYS_SHORT,
  HOLIDAYS,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isBetween,
  daysBetween,
  getHolidayKey,
  formatDateShort,
} from '../utils/dateUtils';

export default function CalendarGrid({
  today,
  currentYear,
  currentMonth,
  startDate,
  endDate,
  effectiveEnd,
  selectionPhase,
  hoverDate,
  setHoverDate,
  handleDateClick,
  clearSelection,
  animKey,
  animDir,
  theme,
}) {
  const daysInMonth   = getDaysInMonth(currentYear, currentMonth);
  const firstDay      = getFirstDayOfMonth(currentYear, currentMonth);
  const prevMonthDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1,
  );

  // Build a flat 42-cell array (6 weeks × 7 days)
  const cells = useMemo(() => {
    const arr = [];

    // Trailing days from previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      arr.push({ day: prevMonthDays - i, type: 'prev' });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push({ day: d, type: 'current' });
    }

    // Leading days from next month
    const remaining = 42 - arr.length;
    for (let d = 1; d <= remaining; d++) {
      arr.push({ day: d, type: 'next' });
    }

    return arr;
  }, [currentYear, currentMonth, daysInMonth, firstDay, prevMonthDays]);

  const animClass = animDir === 'right' ? 'animate-slide-right' : 'animate-slide-left';

  const selectionDays =
    startDate && endDate ? daysBetween(startDate, endDate) : null;

  const rangeNote =
    startDate && endDate
      ? `range_${startDate.toDateString()}_${endDate.toDateString()}`
      : null;

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((label, i) => (
          <div
            key={label}
            className="text-center py-1 text-xs font-bold tracking-widest select-none"
            style={{
              color: i >= 5 ? '#ef4444' : '#a8a29e',
              fontFamily: "'Karla', sans-serif",
            }}
          >
            {label.toUpperCase()}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div key={animKey} className={`grid grid-cols-7 gap-y-0.5 ${animClass}`}>
        {cells.map((cell, idx) => {
          const colIdx = idx % 7; // 0=Mon … 6=Sun
          const isWeekend = colIdx >= 5;

          // Inactive (prev/next month) — render greyed out, not interactive
          if (cell.type !== 'current') {
            return (
              <div
                key={`${cell.type}-${idx}`}
                className="text-center py-2 text-xs select-none"
                style={{ color: '#d4cfc9' }}
              >
                {cell.day}
              </div>
            );
          }

          const date    = new Date(currentYear, currentMonth, cell.day);
          const isToday = isSameDay(date, today);

          // Range states
          const rangeStart = isStartOfRange(date, startDate, effectiveEnd);
          const rangeEnd   = isEndOfRange(date, startDate, effectiveEnd);
          const inRange    = isBetween(date, startDate, effectiveEnd);
          const isSelected = rangeStart || rangeEnd;

          // Holiday check
          const holidayKey  = getHolidayKey(currentMonth + 1, cell.day);
          const holidayName = HOLIDAYS[holidayKey];

          // ── Decide cell colours ──────────────────────────────────────────
          let bgStyle  = {};
          let textColor = isWeekend ? '#ef4444' : '#292524';
          let fontWeight = '400';
          let borderRadius = '10px';

          if (isSelected) {
            bgStyle    = { backgroundColor: theme.accent };
            textColor  = '#ffffff';
            fontWeight = '700';
          } else if (inRange) {
            bgStyle    = { backgroundColor: theme.light };
            textColor  = theme.accent;
            borderRadius = '0';
            // stretch edge cells to meet start/end
          } else if (isToday) {
            bgStyle    = { backgroundColor: '#f5f5f4' };
            fontWeight = '700';
          }

          // Rounded edge handling for range
          if (inRange) {
            const isFirstInRow = colIdx === 0;
            const isLastInRow  = colIdx === 6;
            if (isFirstInRow) borderRadius = '10px 0 0 10px';
            else if (isLastInRow) borderRadius = '0 10px 10px 0';
          }

          return (
            <div
              key={`curr-${cell.day}`}
              onClick={() => handleDateClick(date)}
              onMouseEnter={() => selectionPhase === 1 && setHoverDate(date)}
              onMouseLeave={() => selectionPhase === 1 && setHoverDate(null)}
              title={holidayName || ''}
              className="day-cell relative text-center py-2 cursor-pointer select-none"
              style={{
                fontSize: '0.85rem',
                fontFamily: "'Karla', sans-serif",
                color: textColor,
                fontWeight,
                borderRadius,
                ...bgStyle,
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              {/* Today ring */}
              {isToday && !isSelected && (
                <span
                  className="absolute inset-0 rounded-[10px] pointer-events-none"
                  style={{
                    border: `2px solid ${theme.accent}`,
                    opacity: 0.6,
                  }}
                />
              )}

              <span style={{ lineHeight: 1 }}>{cell.day}</span>

              {/* Holiday dot */}
              {holidayName && (
                <span
                  className="block rounded-full"
                  style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: isSelected ? '#fff' : theme.accent,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Selection summary strip */}
      <div
        className="mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2"
        style={{ borderColor: '#e7e5e4', minHeight: '40px' }}
      >
        {startDate ? (
          <>
            <div
              className="flex items-center gap-2 text-sm flex-wrap"
              style={{ fontFamily: "'Karla', sans-serif" }}
            >
              <span
                className="font-bold text-sm px-2 py-0.5 rounded-md"
                style={{ backgroundColor: theme.light, color: theme.accent }}
              >
                {formatDateShort(startDate)}
              </span>
              {effectiveEnd && !isSameDay(startDate, effectiveEnd) && (
                <>
                  <span style={{ color: '#a8a29e', fontSize: '0.75rem' }}>→</span>
                  <span
                    className="font-bold text-sm px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: theme.light, color: theme.accent }}
                  >
                    {formatDateShort(effectiveEnd)}
                  </span>
                  {selectionDays && (
                    <span className="text-xs" style={{ color: '#a8a29e' }}>
                      {selectionDays} day{selectionDays !== 1 ? 's' : ''}
                    </span>
                  )}
                </>
              )}
              {selectionPhase === 1 && (
                <span className="text-xs italic" style={{ color: '#a8a29e' }}>
                  Select end date…
                </span>
              )}
            </div>
            <button
              onClick={clearSelection}
              className="text-xs px-2 py-1 rounded-md transition-all hover:opacity-70"
              style={{
                color: '#a8a29e',
                fontFamily: "'Karla', sans-serif",
                border: '1px solid #e7e5e4',
              }}
            >
              ✕ Clear
            </button>
          </>
        ) : (
          <p
            className="text-xs italic"
            style={{ color: '#c7c3bd', fontFamily: "'Karla', sans-serif" }}
          >
            Click a date to start selecting a range
          </p>
        )}
      </div>
    </div>
  );
}

// ── Small helpers (used only inside this file) ────────────────────────────────

function isStartOfRange(date, start, end) {
  if (!start || !end) return isSameDay(date, start);
  return isSameDay(date, start < end ? start : end);
}

function isEndOfRange(date, start, end) {
  if (!start || !end) return false;
  return isSameDay(date, start < end ? end : start);
}
