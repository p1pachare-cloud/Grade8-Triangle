import React from 'react';

const SYMBOLS = ['△', '∠', '180°', 'a²+b²=c²', '≅', '∼', '📐', '√', 'θ', '3-4-5'];

export default function FloatingGeometry() {
  return (
    <div className="floating-numbers" aria-hidden="true">
      {SYMBOLS.map((sym, i) => {
        const top = (i * 11 + 7) % 90;
        const left = (i * 17 + 5) % 92;
        const duration = 18 + (i % 6) * 4;
        const delay = (i * 2.3) % 10;
        return (
          <span
            key={i}
            className="floating-number"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {sym}
          </span>
        );
      })}
    </div>
  );
}
