export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const MONTHS_SHORT = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Per-month color themes
export const MONTH_THEMES = [
  { accent: '#1565C0', light: '#DBEAFE', dark: '#1e3a5f', label: 'Winter Blue' },    // Jan
  { accent: '#AD1457', light: '#FCE7F3', dark: '#6b0f35', label: 'Rose Blush' },     // Feb
  { accent: '#2E7D32', light: '#DCFCE7', dark: '#14532d', label: 'Spring Green' },   // Mar
  { accent: '#E65100', light: '#FFEDD5', dark: '#7c2d12', label: 'Blossom Orange' }, // Apr
  { accent: '#4527A0', light: '#EDE9FE', dark: '#2e1065', label: 'Violet Dusk' },    // May
  { accent: '#00695C', light: '#CCFBF1', dark: '#134e4a', label: 'Ocean Teal' },     // Jun
  { accent: '#B45309', light: '#FEF3C7', dark: '#78350f', label: 'Golden Sun' },     // Jul
  { accent: '#5D4037', light: '#FEF3C7', dark: '#3e2723', label: 'Earthy Brown' },   // Aug
  { accent: '#BF360C', light: '#FFEDD5', dark: '#7c2d12', label: 'Harvest Red' },    // Sep
  { accent: '#795548', light: '#FEF9C3', dark: '#451a03', label: 'Amber Leaves' },   // Oct
  { accent: '#37474F', light: '#E2E8F0', dark: '#1e293b', label: 'Slate Mist' },     // Nov
  { accent: '#1A237E', light: '#E0E7FF', dark: '#1e1b4b', label: 'Midnight Indigo' },// Dec
];

// Month-specific image seeds for picsum.photos
export const MONTH_IMAGE_SEEDS = [
  'winter-mountain-snow',
  'february-frozen-lake',
  'spring-cherry-blossom',
  'april-countryside-flowers',
  'may-garden-meadow',
  'summer-ocean-coast',
  'july-canyon-sunset',
  'august-highland-mist',
  'autumn-forest-trail',
  'october-golden-leaves',
  'november-rainy-city',
  'december-snowy-village',
];

// Holidays (month-day format: M-D, 1-indexed month)
export const HOLIDAYS = {
  '1-1':  "New Year's Day",
  '1-14': 'Makar Sankranti',
  '1-26': 'Republic Day',
  '3-25': 'Holi',
  '4-14': 'Ambedkar Jayanti',
  '4-18': 'Good Friday',
  '5-1':  'Labour Day',
  '8-15': 'Independence Day',
  '10-2': 'Gandhi Jayanti',
  '10-20':'Dussehra',
  '11-1': 'Diwali',
  '11-5': 'Guru Nanak Jayanti',
  '12-25':'Christmas Day',
};

// ─── Pure date helpers ─────────────────────────────────────────────────────

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns 0=Monday … 6=Sunday for the 1st of the given month */
export function getFirstDayOfMonth(year, month) {
  const js = new Date(year, month, 1).getDay(); // 0=Sun
  return js === 0 ? 6 : js - 1;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isBetween(date, start, end) {
  if (!start || !end) return false;
  const d = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return d > s && d < e;
}

export function isStartOfRange(date, start, end) {
  if (!start || !end) return false;
  return isSameDay(date, start < end ? start : end);
}

export function isEndOfRange(date, start, end) {
  if (!start || !end) return false;
  return isSameDay(date, start < end ? end : start);
}

export function daysBetween(a, b) {
  if (!a || !b) return 0;
  return Math.abs(Math.round((b.getTime() - a.getTime()) / 86400000)) + 1;
}

export function getHolidayKey(month1indexed, day) {
  return `${month1indexed}-${day}`;
}

export function formatDateShort(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export function formatDateFull(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
}
