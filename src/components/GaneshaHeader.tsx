import React from 'react';

export const GaneshaHeader: React.FC<{ light?: boolean }> = ({ light = false }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center select-none py-1">
      {/* Handcrafted Golden Lord Ganesha Line Emblem */}
      <div className="relative w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full filter drop-shadow-sm"
          fill="none"
          stroke={light ? '#ffffff' : '#b45309'}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Crown (Mukut) */}
          <path d="M50 12 L43 28 L57 28 Z" fill={light ? '#ffffff22' : '#fef3c7'} />
          <path d="M38 28 L50 20 L62 28 Z" />
          <circle cx="50" cy="16" r="2.5" fill={light ? '#ffffff' : '#d97706'} />

          {/* Trishul / Tilak on forehead */}
          <path d="M50 32 L50 44" stroke={light ? '#ffffff' : '#dc2626'} strokeWidth="3" />
          <path d="M46 36 Q50 40 54 36" stroke={light ? '#ffffff' : '#dc2626'} strokeWidth="2.5" />
          <circle cx="50" cy="46" r="2" fill={light ? '#ffffff' : '#dc2626'} />

          {/* Ears */}
          <path d="M38 32 C24 30 18 42 22 56 C26 70 38 72 40 68" />
          <path d="M62 32 C76 30 82 42 78 56 C74 70 62 72 60 68" />

          {/* Head & Trunk (Sondh) with elegant curve */}
          <path d="M42 34 C44 48 42 62 46 76 C48 84 54 94 62 94 C68 94 72 88 72 82 C72 78 68 76 64 78 C60 80 62 86 66 85" strokeWidth="3.6" />

          {/* Big Belly curve */}
          <path d="M36 70 C28 80 30 102 50 106 C64 106 70 96 66 84" opacity="0.65" />

          {/* Modak in trunk hand */}
          <circle cx="68" cy="74" r="4.5" fill={light ? '#ffffff' : '#f59e0b'} stroke={light ? '#ffffff' : '#b45309'} strokeWidth="2" />
        </svg>
      </div>

      {/* Auspicious Sanskrit invocation */}
      <p
        className={`font-serif text-xs sm:text-sm font-semibold tracking-widest uppercase mt-1 ${
          light ? 'text-white/95' : 'text-[#854d0e]'
        }`}
      >
        ॥ श्री गणेशाय नमः ॥
      </p>
    </div>
  );
};
