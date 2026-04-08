import { useState, useEffect } from 'react';

export function useCalendar() {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectionPhase, setSelectionPhase] = useState(0);
  const [hoverDate, setHoverDate] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [animDir, setAnimDir] = useState('right');
  const [notes, setNotes] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wall_calendar_notes_v2');
      if (raw) setNotes(JSON.parse(raw));
    } catch { }
  }, []);

  const persistNotes = (updated) => {
    setNotes(updated);
    try {
      localStorage.setItem('wall_calendar_notes_v2', JSON.stringify(updated));
    } catch { }
  };

  const saveNote = (key, value) => {
    persistNotes({ ...notes, [key]: value });
  };

  const monthNoteKey = `${currentYear}-${currentMonth}`;

  const navigate = (direction) => {
    setAnimDir(direction === 'prev' ? 'left' : 'right');
    setAnimKey(k => k + 1);

    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentYear(y => y - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(m => m - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentYear(y => y + 1);
        setCurrentMonth(0);
      } else {
        setCurrentMonth(m => m + 1);
      }
    }
  };

  const goToToday = () => {
    const now = new Date();
    setAnimDir('right');
    setAnimKey(k => k + 1);
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  };

  const handleDateClick = (date) => {
    if (selectionPhase === 0 || selectionPhase === 2) {
      setStartDate(date);
      setEndDate(null);
      setSelectionPhase(1);
      setHoverDate(null);
    } else {
      setEndDate(date);
      setSelectionPhase(2);
      setHoverDate(null);
    }
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectionPhase(0);
    setHoverDate(null);
  };

  const effectiveEnd = selectionPhase === 1 && hoverDate ? hoverDate : endDate;

  return {
    today,
    currentYear,
    currentMonth,
    startDate,
    endDate,
    effectiveEnd,
    selectionPhase,
    hoverDate,
    setHoverDate,
    animKey,
    animDir,
    notes,
    monthNoteKey,
    saveNote,
    navigate,
    goToToday,
    handleDateClick,
    clearSelection,
  };
}