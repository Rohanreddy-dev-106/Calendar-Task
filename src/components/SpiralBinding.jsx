import React from 'react';

export default function SpiralBinding() {
  // Render 20 spiral rings
  const rings = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div
      className="relative flex items-end justify-center gap-2.5 px-6 pb-0 pt-1 z-10"
      style={{ background: '#e7e5e4', height: '30px' }}
    >
      {rings.map((i) => (
        <div
          key={i}
          style={{
            width: '18px',
            height: '26px',
            borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
            border: '2.5px solid #9ca3af',
            borderBottom: 'none',
            background: 'linear-gradient(135deg, #d1d5db 30%, #9ca3af 100%)',
            boxShadow: 'inset -1px -1px 3px rgba(0,0,0,0.15), 1px 1px 2px rgba(0,0,0,0.1)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
