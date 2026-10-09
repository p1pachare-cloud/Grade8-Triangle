import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import RuleCard from '../shared/RuleCard';
import { RULE_CARDS } from '../../data/ruleCards';
import { canFormTriangle, thirdSideRange } from '../../engine/geometry';
import { stationInstructionNarration, stationRuleNarration } from '../../utils/narration';
import { narrate, playClick, playChime, playBuzz } from '../../utils/audio';

export default function BridgeBuilderStation({ audioEnabled, onComplete }) {
  const [beat, setBeat] = useState('explore');
  const [a, setA] = useState(6);
  const [b, setB] = useState(8);
  const [c, setC] = useState(10);

  const [cpRound, setCpRound] = useState(0);
  const [cpScore, setCpScore] = useState(0);
  const [cpAns, setCpAns] = useState(null);
  const [cpFeedback, setCpFeedback] = useState(null);

  const isValid = canFormTriangle(a, b, c);

  useEffect(() => {
    if (beat === 'explore') {
      narrate(stationInstructionNarration('B'), audioEnabled);
    } else if (beat === 'formalise') {
      narrate(stationRuleNarration('B'), audioEnabled);
    }
  }, [beat, audioEnabled]);

  const checkpointQuestions = [
    { q: "Can rods of lengths 5, 6, and 12 form a triangle?", options: ["Yes", "No"], ans: "No", exp: "5 + 6 = 11 < 12 (fails inequality)." },
    { q: "If two rods are 7 and 10, what is the MAXIMUM integer length for the 3rd rod?", options: ["16", "17", "18"], ans: "16", exp: "c < 7 + 10 = 17, so max integer is 16." },
    { q: "An isosceles triangle has sides 4 and 9. What must the third side be?", options: ["4", "9"], ans: "9", exp: "4 + 4 = 8 < 9, so third side must be 9." }
  ];

  const handleSelectCP = (opt) => {
    const curr = checkpointQuestions[cpRound];
    if (opt === curr.ans) {
      playChime();
      setCpScore((s) => s + 1);
      setCpFeedback({ correct: true, text: `Correct! ${curr.exp}` });
    } else {
      playBuzz();
      setCpFeedback({ correct: false, text: `Incorrect. ${curr.exp}` });
    }

    setTimeout(() => {
      setCpFeedback(null);
      if (cpRound < 2) {
        setCpRound((r) => r + 1);
      } else {
        playChime();
        onComplete();
      }
    }, 1800);
  };

  return (
    <div className="station-workspace-card">
      <div className="station-beat-nav">
        <button
          className={`beat-tab-btn ${beat === 'explore' ? 'active' : ''}`}
          onClick={() => setBeat('explore')}
        >
          1. Explore
        </button>
        <button
          className={`beat-tab-btn ${beat === 'formalise' ? 'active' : ''}`}
          onClick={() => setBeat('formalise')}
        >
          2. Formalise Rule
        </button>
        <button
          className={`beat-tab-btn ${beat === 'checkpoint' ? 'active' : ''}`}
          onClick={() => setBeat('checkpoint')}
        >
          3. Checkpoint (3 Rounds)
        </button>
      </div>

      {beat === 'explore' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Interactive Bridge Stage */}
          <div className="interactive-svg-stage">
            <svg width="360" height="240" viewBox="0 0 360 240">
              {/* Baseline River / Truss Bed */}
              <line x1="30" y1="190" x2="330" y2="190" stroke="#00e5ff" strokeWidth="6" />
              <text x="180" y="215" fill="#00e5ff" textAnchor="middle" fontSize="13" fontWeight="bold">
                Base Rod c = {c} units
              </text>

              {isValid ? (
                /* Closed Triangle Truss */
                <g>
                  <polygon
                    points={`60,190 ${300},190 ${180},${190 - Math.min(130, Math.sqrt(Math.max(10, a * a * 10 - 200)))}`}
                    fill="rgba(76, 175, 80, 0.25)"
                    stroke="#81c784"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <circle cx="60" cy="190" r="6" fill="#ffd54f" />
                  <circle cx="300" cy="190" r="6" fill="#ffd54f" />
                  <circle cx="180" cy={190 - Math.min(130, Math.sqrt(Math.max(10, a * a * 10 - 200)))} r="6" fill="#ffd54f" />
                  <text x="180" y="45" fill="#81c784" textAnchor="middle" fontSize="14" fontWeight="bold">
                    Truss Locked &amp; Rigid! 🌉
                  </text>
                </g>
              ) : (
                /* Collapsed Rods with visible gap */
                <g>
                  <line x1="60" y1="190" x2={60 + a * 9} y2="130" stroke="#ef5350" strokeWidth="4" />
                  <line x1="300" y1="190" x2={300 - b * 9} y2="130" stroke="#ff7043" strokeWidth="4" />
                  <circle cx="60" cy="190" r="6" fill="#ffd54f" />
                  <circle cx="300" cy="190" r="6" fill="#ffd54f" />
                  <text x="180" y="70" fill="#ef9a9a" textAnchor="middle" fontSize="14" fontWeight="bold">
                    Gap! Rods Cannot Meet ❌
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Rod Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'rgba(20,16,55,0.7)', padding: 14, borderRadius: 'var(--radius-md)' }}>
            <div className="sim-slider-row">
              <span className="sim-slider-label">Rod a: {a}</span>
              <input
                type="range"
                min="2"
                max="16"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
            <div className="sim-slider-row">
              <span className="sim-slider-label">Rod b: {b}</span>
              <input
                type="range"
                min="2"
                max="16"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
            <div className="sim-slider-row">
              <span className="sim-slider-label">Rod c: {c}</span>
              <input
                type="range"
                min="3"
                max="20"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
          </div>

          {/* Inequality Meters */}
          <div className="live-readouts-bar">
            <span className={`readout-pill ${a + b > c ? 'green' : 'red'}`}>
              a + b ({a + b}) {a + b > c ? '>' : '≤'} c ({c})
            </span>
            <span className={`readout-pill ${b + c > a ? 'green' : 'red'}`}>
              b + c ({b + c}) {b + c > a ? '>' : '≤'} a ({a})
            </span>
            <span className={`readout-pill ${a + c > b ? 'green' : 'red'}`}>
              a + c ({a + c}) {a + c > b ? '>' : '≤'} b ({b})
            </span>
            <span className={`readout-pill ${isValid ? 'green' : 'red'}`} style={{ marginLeft: 'auto' }}>
              {isValid ? 'Closed Triangle ✓' : 'Collapsed! ✕'}
            </span>
          </div>

          <button
            className="btn btn-primary"
            style={{ alignSelf: 'flex-end', padding: '8px 20px', fontSize: '0.9rem' }}
            onClick={() => setBeat('formalise')}
          >
            <span>Lock in Rule →</span>
          </button>
        </div>
      )}

      {beat === 'formalise' && (
        <RuleCard
          ruleData={RULE_CARDS.B.rules[0]}
          onLockedIn={() => {
            playChime();
            setBeat('checkpoint');
          }}
        />
      )}

      {beat === 'checkpoint' && (
        <div className="checkpoint-container">
          <div className="checkpoint-header">
            <span className="phase-tag">STATION B CHECKPOINT</span>
            <span style={{ fontWeight: 800, color: '#ffd54f' }}>
              Round {cpRound + 1} of 3 • Score: {cpScore}/3
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
            {checkpointQuestions[cpRound].q}
          </h3>

          <div style={{ display: 'flex', gap: 12 }}>
            {checkpointQuestions[cpRound].options.map((opt, i) => (
              <button
                key={i}
                className="btn btn-secondary"
                style={{ minWidth: 100, fontSize: '1.1rem' }}
                onClick={() => handleSelectCP(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {cpFeedback && (
            <div style={{ color: cpFeedback.correct ? '#81c784' : '#ef9a9a', fontWeight: 800, marginTop: 10 }}>
              {cpFeedback.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
