import React, { useState, useEffect } from 'react';
import { MONTHS, MONTH_THEMES, MONTH_IMAGE_SEEDS } from '../utils/dateUtils';

export default function HeroSection({ currentMonth, currentYear, navigate, goToToday, theme }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const seed = MONTH_IMAGE_SEEDS[currentMonth];
  const imgSrc = `https://picsum.photos/seed/${seed}/1200/520`;

  useEffect(() => {
    setImgLoaded(false);
    const img = new Image();
    img.onload = () => { setCurrentSrc(imgSrc); setImgLoaded(true); };
    img.onerror = () => setImgLoaded(true); // show fallback gradient
    img.src = imgSrc;
  }, [imgSrc]);

  return (
    <div className="relative overflow-hidden" style={{ height: '280px' }}>
      {/* Fallback gradient while image loads */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.accent} 100%)`,
          opacity: imgLoaded ? 0 : 1,
        }}
      />

      {/* Hero image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={`${MONTHS[currentMonth]} ${currentYear}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
      )}

      {/* Darkening gradient overlay — heavier at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0.68) 100%)',
        }}
      />

      {/* Diagonal accent shape — like the reference image badge */}
      <div
        className="absolute bottom-0 right-0 flex flex-col items-end pr-7 pb-5 select-none"
        style={{ zIndex: 2 }}
      >
        <span
          className="tracking-[0.22em] text-white/75 font-light text-base"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {currentYear}
        </span>
        <span
          className="uppercase font-bold text-white leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
            textShadow: '0 2px 12px rgba(0,0,0,0.45)',
            letterSpacing: '0.04em',
          }}
        >
          {MONTHS[currentMonth]}
        </span>

        {/* Colored accent bar under month name */}
        <div
          className="mt-1.5 h-1 rounded-full"
          style={{ width: '60%', backgroundColor: theme.accent, opacity: 0.9 }}
        />
      </div>

      {/* Theme label badge — top left */}
      <div className="absolute top-4 left-5 z-10">
        <span
          className="text-xs tracking-widest uppercase px-3 py-1 rounded-full font-medium"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            fontFamily: "'Karla', sans-serif",
          }}
        >
          {theme.label}
        </span>
      </div>

      {/* Navigation — left arrow */}
      <button
        onClick={() => navigate('prev')}
        aria-label="Previous month"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full
                   text-white transition-all hover:scale-110 active:scale-95"
        style={{
          width: '42px',
          height: '42px',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.35)',
          fontSize: '1.5rem',
        }}
      >
        ‹
      </button>

      {/* Navigation — right arrow */}
      <button
        onClick={() => navigate('next')}
        aria-label="Next month"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full
                   text-white transition-all hover:scale-110 active:scale-95"
        style={{
          width: '42px',
          height: '42px',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.35)',
          fontSize: '1.5rem',
        }}
      >
        ›
      </button>

      {/* Today button */}
      <button
        onClick={goToToday}
        aria-label="Go to today"
        className="absolute bottom-5 left-5 z-10 text-xs font-medium text-white px-3 py-1 rounded-full
                   transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.35)',
          fontFamily: "'Karla', sans-serif",
          letterSpacing: '0.06em',
        }}
      >
        Today
      </button>
    </div>
  );
}
