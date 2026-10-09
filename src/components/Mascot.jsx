import React from 'react';

export default function Mascot({ mood = 'idle', size = 'medium', className = '' }) {
  const sizePx = size === 'large' ? 120 : size === 'medium' ? 80 : 50;

  return (
    <div
      className={`mascot-robot mascot-mood-${mood} ${className}`}
      style={{ width: sizePx, height: sizePx }}
      title={`Trigo (${mood})`}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd54f" />
            <stop offset="60%" stopColor="#ff9800" />
            <stop offset="100%" stopColor="#ff7043" />
          </linearGradient>
          <filter id="trigoGlow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Robot Antenna / Compass Pin */}
        <line x1="50" y1="12" x2="50" y2="4" stroke="#ffd54f" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="4" r="3.5" fill="#00e5ff" filter="url(#trigoGlow)" />

        {/* Triangle Body */}
        <polygon
          points="50,12 88,84 12,84"
          fill="url(#trigoGrad)"
          filter="url(#trigoGlow)"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Protractor Arc Marking */}
        <path
          d="M 28 72 A 28 28 0 0 1 72 72"
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2"
          strokeDasharray="2,2"
        />

        {/* Visor Screen */}
        <ellipse cx="50" cy="52" rx="20" ry="14" fill="#0f0b29" stroke="#ffffff" strokeWidth="1.5" />

        {/* Eyes based on mood */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <>
            <path d="M 40 50 Q 44 44 48 50" stroke="#00e5ff" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 52 50 Q 56 44 60 50" stroke="#00e5ff" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'thinking' ? (
          <>
            <circle cx="43" cy="50" r="3.5" fill="#00e5ff" />
            <ellipse cx="57" cy="48" rx="4" ry="2" fill="#00e5ff" />
          </>
        ) : (
          <>
            <circle cx="43" cy="50" r="3.5" fill="#00e5ff" />
            <circle cx="57" cy="50" r="3.5" fill="#00e5ff" />
          </>
        )}

        {/* Protractor Smile / Mouth */}
        {mood === 'celebrating' || mood === 'happy' ? (
          <path d="M 43 58 Q 50 65 57 58" stroke="#ff4081" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : mood === 'thinking' ? (
          <line x1="45" y1="58" x2="55" y2="57" stroke="#ffd54f" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d="M 44 58 Q 50 62 56 58" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Compass Arm (Right side) */}
        <path
          d="M 80 65 L 94 76 L 91 80 L 76 72"
          fill="#ff9800"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <circle cx="94" cy="76" r="2" fill="#ffd54f" />
      </svg>
    </div>
  );
}
