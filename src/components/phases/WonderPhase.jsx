import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import Mascot from '../Mascot';
import { wonderNarration } from '../../utils/narration';
import { narrate, playClick, playChime } from '../../utils/audio';

export default function WonderPhase({ onNext, audioEnabled }) {
  const [squareSkew, setSquareSkew] = useState(0); // 0 to 45 deg
  const [trianglePushed, setTrianglePushed] = useState(false);
  const [pushCount, setPushCount] = useState(0);

  useEffect(() => {
    narrate(wonderNarration(), audioEnabled);
  }, [audioEnabled]);

  const handlePushSquare = () => {
    playClick();
    setSquareSkew((prev) => (prev >= 40 ? 0 : prev + 15));
    setPushCount((prev) => prev + 1);
  };

  const handlePushTriangle = () => {
    playClick();
    setTrianglePushed(true);
    playChime();
    setPushCount((prev) => prev + 1);
    setTimeout(() => setTrianglePushed(false), 500);
  };

  return (
    <div className="phase-container wonder-phase">
      <div className="glass-card phase-card">
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 1 — WONDER</span>
            <h2>The Tower Frame Mystery</h2>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Eiffel Tower, Paris 🇫🇷</span>
        </div>

        <div className="wonder-content-grid">
          <div className="wonder-visual-panel">
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffd54f' }}>
              Push both structural frames below:
            </span>

            <div className="frames-stage">
              {/* 4-Bar Square Frame */}
              <div className="frame-box">
                <svg width="150" height="150" viewBox="-20 -20 180 180">
                  <defs>
                    <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8d6e63" />
                      <stop offset="100%" stopColor="#5d4037" />
                    </linearGradient>
                  </defs>
                  {/* Skewed quadrilateral */}
                  <g transform={`translate(20, 20) skewX(${squareSkew})`}>
                    <polygon
                      points="0,0 90,0 90,90 0,90"
                      fill="rgba(239, 83, 80, 0.15)"
                      stroke="#ef5350"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                    {/* Corner pivot pins */}
                    <circle cx="0" cy="0" r="6" fill="#ffd54f" />
                    <circle cx="90" cy="0" r="6" fill="#ffd54f" />
                    <circle cx="90" cy="90" r="6" fill="#ffd54f" />
                    <circle cx="0" cy="90" r="6" fill="#ffd54f" />
                  </g>
                </svg>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  onClick={handlePushSquare}
                >
                  <AlertTriangle size={15} color="#ef5350" />
                  <span>Push 4-Bar Square!</span>
                </button>
                <span style={{ fontSize: '0.85rem', color: squareSkew > 0 ? '#ef9a9a' : 'var(--text-muted)' }}>
                  {squareSkew > 0 ? `Wobbly & Skewed (${squareSkew}°)` : 'Square (Flexible)'}
                </span>
              </div>

              {/* 3-Bar Triangle Frame */}
              <div className="frame-box">
                <svg width="150" height="150" viewBox="-20 -20 180 180">
                  <g
                    transform="translate(20, 20)"
                    style={{
                      transform: trianglePushed ? 'translate(22px, 20px)' : 'translate(20px, 20px)',
                      transition: 'transform 0.1s ease',
                    }}
                  >
                    <polygon
                      points="45,5 90,90 0,90"
                      fill="rgba(76, 175, 80, 0.2)"
                      stroke="#4caf50"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                    {/* Corner pivot pins */}
                    <circle cx="45" cy="5" r="6" fill="#ffd54f" />
                    <circle cx="90" cy="90" r="6" fill="#ffd54f" />
                    <circle cx="0" cy="90" r="6" fill="#ffd54f" />
                  </g>
                </svg>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  onClick={handlePushTriangle}
                >
                  <Shield size={15} color="#81c784" />
                  <span>Push 3-Bar Triangle!</span>
                </button>
                <span style={{ fontSize: '0.85rem', color: '#81c784', fontWeight: 700 }}>
                  {trianglePushed ? 'Rock Solid! Rigid 🛡️' : 'Triangle (Rigid)'}
                </span>
              </div>
            </div>

            <div className="wonder-stats-row">
              <span className="stat-chip">Pushes tested: {pushCount}</span>
              <span className="stat-chip" style={{ color: '#81c784' }}>Triangle: 100% Rigid</span>
            </div>
          </div>

          <div className="wonder-text-panel">
            <Mascot mood={squareSkew > 0 ? 'thinking' : 'happy'} size="medium" />

            <div className="wonder-narrative">
              <p>
                Sarah is standing in Paris, looking up at the monumental iron beams of the Eiffel Tower.
              </p>
              <p>
                Hundreds of beams form triangles, but almost none make squares. Push both frames! The 4-bar square easily skews into a parallelogram, but the triangle cannot change shape without breaking the rods!
              </p>
              <p className="highlight-text">
                Why are three-sided figures naturally locked in shape? Let's discover the secret mathematics!
              </p>
            </div>

            <button className="btn btn-primary" onClick={onNext} style={{ alignSelf: 'flex-start' }}>
              <span>Enter Story Phase</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
