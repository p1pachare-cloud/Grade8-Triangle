import React from 'react';

export default function DiagramFor({ visual, data }) {
  if (!visual || visual === 'none') return null;

  if (visual === 'triangle') {
    const { a, b, c, angles, exterior } = data || {};
    return (
      <svg width="220" height="150" viewBox="0 0 220 150">
        <polygon
          points="110,25 190,125 30,125"
          fill="rgba(124, 92, 191, 0.2)"
          stroke="#ffd54f"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {exterior && (
          <line x1="190" y1="125" x2="215" y2="125" stroke="#ff4081" strokeWidth="2.5" strokeDasharray="3 3" />
        )}
        {a && <text x="60" y="70" fill="#00e5ff" fontSize="12" fontWeight="bold">{a}</text>}
        {b && <text x="160" y="70" fill="#ff7043" fontSize="12" fontWeight="bold">{b}</text>}
        {c && <text x="110" y="142" fill="#ffd54f" textAnchor="middle" fontSize="12" fontWeight="bold">{c}</text>}
        {angles && (
          <>
            <text x="110" y="48" fill="#ffffff" textAnchor="middle" fontSize="10">{angles[0]}°</text>
            <text x="55" y="118" fill="#ffffff" fontSize="10">{angles[1]}°</text>
            <text x="165" y="118" fill="#ffffff" fontSize="10">{angles[2]}°</text>
          </>
        )}
      </svg>
    );
  }

  if (visual === 'ladder') {
    const { foot = 5, ladder = 13, height = 12 } = data || {};
    return (
      <svg width="200" height="150" viewBox="0 0 200 150">
        <line x1="40" y1="10" x2="40" y2="130" stroke="#ffffff" strokeWidth="4" />
        <line x1="30" y1="130" x2="180" y2="130" stroke="#ffffff" strokeWidth="4" />
        <line x1="140" y1="130" x2="40" y2="30" stroke="#ffd54f" strokeWidth="4" />
        <rect x="40" y="115" width="15" height="15" fill="none" stroke="#00e5ff" strokeWidth="2" />
        <text x="100" y="70" fill="#ffd54f" fontSize="11" fontWeight="bold">{ladder} m</text>
        <text x="85" y="145" fill="#00e5ff" fontSize="11">{foot} m</text>
        <text x="15" y="85" fill="#81c784" fontSize="11">{height} m</text>
      </svg>
    );
  }

  if (visual === 'rods') {
    const { a = 3, b = 4, c = 8 } = data || {};
    return (
      <svg width="220" height="130" viewBox="0 0 220 130">
        <line x1="20" y1="100" x2="200" y2="100" stroke="#00e5ff" strokeWidth="5" />
        <line x1="20" y1="100" x2="70" y2="40" stroke="#ef5350" strokeWidth="4" />
        <line x1="200" y1="100" x2="140" y2="40" stroke="#4caf50" strokeWidth="4" />
        <circle cx="20" cy="100" r="5" fill="#ffd54f" />
        <circle cx="200" cy="100" r="5" fill="#ffd54f" />
        <text x="110" y="120" fill="#00e5ff" textAnchor="middle" fontSize="11">c = {c}</text>
        <text x="35" y="65" fill="#ef5350" fontSize="11">a = {a}</text>
        <text x="180" y="65" fill="#4caf50" fontSize="11">b = {b}</text>
      </svg>
    );
  }

  if (visual === 'squares') {
    const { a = 3, b = 4, c = 5 } = data || {};
    return (
      <svg width="200" height="150" viewBox="0 0 200 150">
        <polygon points="60,110 60,40 140,110" fill="rgba(255,193,7,0.3)" stroke="#ffd54f" strokeWidth="2.5" />
        <rect x="60" y="98" width="12" height="12" fill="none" stroke="#ffd54f" strokeWidth="1.5" />
        <rect x="20" y="40" width="40" height="70" fill="rgba(255,112,67,0.2)" stroke="#ff7043" strokeWidth="1.5" />
        <rect x="60" y="110" width="80" height="30" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" strokeWidth="1.5" />
        <text x="40" y="80" fill="#ff7043" textAnchor="middle" fontSize="10">a²</text>
        <text x="100" y="130" fill="#00e5ff" textAnchor="middle" fontSize="10">b²</text>
        <text x="110" y="65" fill="#ffd54f" fontSize="10">c²</text>
      </svg>
    );
  }

  if (visual === 'shadow') {
    return (
      <svg width="240" height="130" viewBox="0 0 240 130">
        <circle cx="40" cy="25" r="12" fill="#ffd54f" />
        <line x1="20" y1="110" x2="220" y2="110" stroke="#4caf50" strokeWidth="3" />
        <line x1="70" y1="110" x2="70" y2="85" stroke="#00e5ff" strokeWidth="3" />
        <line x1="70" y1="110" x2="105" y2="110" stroke="#1a237e" strokeWidth="4" />
        <line x1="170" y1="110" x2="170" y2="40" stroke="#ff7043" strokeWidth="4" />
        <line x1="170" y1="110" x2="215" y2="110" stroke="#1a237e" strokeWidth="5" />
        <text x="70" y="78" fill="#00e5ff" textAnchor="middle" fontSize="9">Person</text>
        <text x="170" y="32" fill="#ff7043" textAnchor="middle" fontSize="9">Tower</text>
      </svg>
    );
  }

  if (visual === 'pair') {
    return (
      <svg width="220" height="120" viewBox="0 0 220 120">
        <polygon points="50,25 90,95 15,95" fill="rgba(76,175,80,0.25)" stroke="#81c784" strokeWidth="2.5" />
        <polygon points="160,25 200,95 125,95" fill="rgba(255,193,7,0.25)" stroke="#ffd54f" strokeWidth="2.5" />
        <text x="50" y="112" fill="#81c784" textAnchor="middle" fontSize="11" fontWeight="bold">T1</text>
        <text x="160" y="112" fill="#ffd54f" textAnchor="middle" fontSize="11" fontWeight="bold">T2</text>
      </svg>
    );
  }

  return null;
}
