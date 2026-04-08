import React, { useRef } from 'react';
import { MONTHS, formatDateShort, daysBetween } from '../utils/dateUtils';

export default function NotesSection({
  currentMonth,
  currentYear,
  startDate,
  endDate,
  notes,
  monthNoteKey,
  saveNote,
  theme,
}) {
  const monthTextareaRef = useRef(null);
  const rangeTextareaRef = useRef(null);

  const monthNote = notes[monthNoteKey] || '';

  const rangeKey = startDate && endDate
    ? `range_${startDate.toDateString()}_${endDate.toDateString()}`
    : null;
  const rangeNote = rangeKey ? (notes[rangeKey] || '') : '';

  const rangeLabel = startDate && endDate
    ? `${formatDateShort(startDate)} – ${formatDateShort(endDate)} (${daysBetween(startDate, endDate)}d)`
    : null;

  return (
    <div
      className="w-full md:w-60 flex-shrink-0 border-t md:border-t-0 md:border-r flex flex-col gap-0"
      style={{
        borderColor: '#e7e5e4',
        background: '#faf9f7',
        fontFamily: "'Karla', sans-serif",
      }}
    >
      {/* ── Monthly notes ── */}
      <div className="p-4 md:p-5 flex-1">
        {/* Section title */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#a8a29e' }}
          >
            Notes
          </span>
          <div className="flex-1 h-px" style={{ background: '#e7e5e4' }} />
        </div>

        {/* Month label */}
        <p
          className="text-xs mb-2 font-medium"
          style={{ color: theme.accent, letterSpacing: '0.05em' }}
        >
          {MONTHS[currentMonth].toUpperCase()} {currentYear}
        </p>

        {/* Lined textarea wrapper */}
        <div className="relative">
          <textarea
            ref={monthTextareaRef}
            value={monthNote}
            onChange={(e) => saveNote(monthNoteKey, e.target.value)}
            placeholder="Jot down notes for this month…"
            className="lined-textarea w-full bg-transparent resize-none outline-none text-sm relative z-10"
            style={{
              color: '#44403c',
              minHeight: '180px',
              paddingTop: '2px',
              lineHeight: '28px',
              fontFamily: "'Karla', sans-serif",
              caretColor: theme.accent,
            }}
            rows={7}
          />
        </div>

        {/* Character count */}
        <p
          className="text-right text-xs mt-1 transition-opacity"
          style={{ color: '#c7c3bd', opacity: monthNote.length > 0 ? 1 : 0 }}
        >
          {monthNote.length} chars
        </p>
      </div>

      {/* ── Range notes (appears when range is selected) ── */}
      {rangeKey && (
        <div
          className="p-4 md:p-5 border-t"
          style={{ borderColor: '#e7e5e4', background: theme.light + '55' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: theme.accent }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: theme.accent }}
            >
              Range
            </span>
            <div className="flex-1 h-px" style={{ background: theme.accent + '33' }} />
          </div>

          <p className="text-xs mb-2" style={{ color: theme.accent, fontWeight: 600 }}>
            {rangeLabel}
          </p>

          <textarea
            ref={rangeTextareaRef}
            value={rangeNote}
            onChange={(e) => saveNote(rangeKey, e.target.value)}
            placeholder="Notes for this date range…"
            className="lined-textarea w-full bg-transparent resize-none outline-none text-sm"
            style={{
              color: '#44403c',
              minHeight: '84px',
              lineHeight: '28px',
              fontFamily: "'Karla', sans-serif",
              caretColor: theme.accent,
            }}
            rows={3}
          />
        </div>
      )}

      {/* ── Legend ── */}
      <div
        className="px-4 md:px-5 py-3 border-t"
        style={{ borderColor: '#e7e5e4' }}
      >
        <p
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: '#a8a29e' }}
        >
          Legend
        </p>
        <div className="flex flex-col gap-1.5">
          <LegendRow color={theme.accent} label="Selected / range start–end" />
          <LegendRow color={theme.light} label="Days within range" border={theme.accent} />
          <LegendRow color="transparent" border="#ef4444" label="Weekend days" textColor="#ef4444" />
          <LegendRow color={theme.accent} label="Holiday (dot marker)" dot />
        </div>
      </div>
    </div>
  );
}

function LegendRow({ color, border, label, textColor, dot }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex-shrink-0 rounded-md flex items-center justify-center"
        style={{
          width: '18px',
          height: '18px',
          backgroundColor: color,
          border: border ? `2px solid ${border}` : 'none',
        }}
      >
        {dot && (
          <span className="block rounded-full bg-white" style={{ width: '5px', height: '5px' }} />
        )}
      </span>
      <span
        className="text-xs"
        style={{ color: textColor || '#a8a29e', fontFamily: "'Karla', sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}
