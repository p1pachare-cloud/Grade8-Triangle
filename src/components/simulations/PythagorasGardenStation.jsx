import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, Split } from 'lucide-react';
import RuleCard from '../shared/RuleCard';
import { RULE_CARDS } from '../../data/ruleCards';
import { hypotenuse, round } from '../../engine/geometry';
import { stationInstructionNarration, stationRuleNarration } from '../../utils/narration';
import { narrate, playClick, playChime, playBuzz } from '../../utils/audio';

export default function PythagorasGardenStation({ audioEnabled, onComplete }) {
  const [beat, setBeat] = useState('explore');
  const [legA, setLegA] = useState(3);
  const [legB, setLegB] = useState(4);
  const [showDissection, setShowDissection] = useState(false);

  const [cpRound, setCpRound] = useState(0);
  const [cpScore, setCpScore] = useState(0);
  const [cpAns, setCpAns] = useState('');
  const [cpFeedback, setCpFeedback] = useState(null);

  const hyp = round(hypotenuse(legA, legB), 1);
  const areaA = legA * legA;
  const areaB = legB * legB;
  const areaC = round(hyp * hyp, 1);

  useEffect(() => {
    if (beat === 'explore') {
      narrate(stationInstructionNarration('C'), audioEnabled);
    } else if (beat === 'formalise') {
      narrate(stationRuleNarration('C'), audioEnabled);
    }
  }, [beat, audioEnabled]);

  const checkpointQuestions = [
    { q: "A right triangle has legs 6 and 8. What is the hypotenuse?", ans: "10", exp: "√(36 + 64) = √100 = 10." },
    { q: "Hypotenuse is 13 and one leg is 5. What is the missing leg?", ans: "12", exp: "√(169 − 25) = √144 = 12." },
    { q: "What is 7² + 24²?", ans: "625", exp: "49 + 576 = 625 = 25²." }
  ];

  const handleCheckCP = () => {
    const curr = checkpointQuestions[cpRound];
    if (cpAns.trim() === curr.ans) {
      playChime();
      setCpScore((s) => s + 1);
      setCpFeedback({ correct: true, text: `Correct! ${curr.exp}` });
    } else {
      playBuzz();
      setCpFeedback({ correct: false, text: `Incorrect. ${curr.exp}` });
    }

    setTimeout(() => {
      setCpFeedback(null);
      setCpAns('');
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
          {/* Garden SVG Stage */}
          <div className="interactive-svg-stage">
            <svg width="360" height="250" viewBox="0 0 360 250">
              {/* Origin corner at (120, 180) */}
              {/* Square on leg B (bottom) */}
              <rect
                x="120"
                y="180"
                width={legB * 16}
                height={legB * 16}
                fill="rgba(0, 229, 255, 0.25)"
                stroke="#00e5ff"
                strokeWidth="2"
              />
              <text x={120 + (legB * 16) / 2} y={180 + (legB * 16) / 2} fill="#00e5ff" textAnchor="middle" fontSize="13" fontWeight="bold">
                b² = {areaB}
              </text>

              {/* Square on leg A (vertical left) */}
              <rect
                x={120 - legA * 16}
                y={180 - legA * 16}
                width={legA * 16}
                height={legA * 16}
                fill="rgba(255, 112, 67, 0.25)"
                stroke="#ff7043"
                strokeWidth="2"
              />
              <text x={120 - (legA * 16) / 2} y={180 - (legA * 16) / 2} fill="#ff7043" textAnchor="middle" fontSize="13" fontWeight="bold">
                a² = {areaA}
              </text>

              {/* The Right Triangle */}
              <polygon
                points={`120,180 120,${180 - legA * 16} ${120 + legB * 16},180`}
                fill="rgba(255, 193, 7, 0.35)"
                stroke="#ffd54f"
                strokeWidth="3"
              />
              <rect x="120" y="166" width="14" height="14" fill="none" stroke="#ffd54f" strokeWidth="2" />

              {/* Hypotenuse Label */}
              <text
                x={120 + (legB * 16) / 2 + 10}
                y={180 - (legA * 16) / 2 - 8}
                fill="#ffd54f"
                fontSize="13"
                fontWeight="bold"
              >
                c² = {areaC} (c = {hyp})
              </text>

              {/* Perfect Triple Ring */}
              {(areaA + areaB === areaC) && (
                <text x="270" y="50" fill="#81c784" textAnchor="middle" fontSize="13" fontWeight="bold">
                  Perfect Triple! ⭐
                </text>
              )}
            </svg>
          </div>

          {/* Sliders */}
          <div style={{ display: 'flex', gap: 20, background: 'rgba(20,16,55,0.7)', padding: 14, borderRadius: 'var(--radius-md)' }}>
            <div className="sim-slider-row" style={{ flex: 1 }}>
              <span className="sim-slider-label">Leg a: {legA}</span>
              <input
                type="range"
                min="2"
                max="6"
                value={legA}
                onChange={(e) => setLegA(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
            <div className="sim-slider-row" style={{ flex: 1 }}>
              <span className="sim-slider-label">Leg b: {legB}</span>
              <input
                type="range"
                min="2"
                max="6"
                value={legB}
                onChange={(e) => setLegB(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
          </div>

          {/* Live Tile Balance Meter */}
          <div className="live-readouts-bar">
            <span className="readout-pill">a² = {areaA} tiles</span>
            <span className="readout-pill">+</span>
            <span className="readout-pill">b² = {areaB} tiles</span>
            <span className="readout-pill highlight">=</span>
            <span className="readout-pill highlight">c² = {areaA + areaB} tiles ({legA}² + {legB}² = {hyp}²)</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
              onClick={() => {
                playClick();
                setShowDissection(!showDissection);
              }}
            >
              <Split size={16} />
              <span>{showDissection ? 'Hide Tile Proof' : 'Show Tile Proof Animation'}</span>
            </button>

            <button
              className="btn btn-primary"
              style={{ fontSize: '0.9rem', padding: '8px 20px' }}
              onClick={() => setBeat('formalise')}
            >
              <span>Lock in Rule →</span>
            </button>
          </div>
        </div>
      )}

      {beat === 'formalise' && (
        <RuleCard
          ruleData={RULE_CARDS.C.rules[0]}
          onLockedIn={() => {
            playChime();
            setBeat('checkpoint');
          }}
        />
      )}

      {beat === 'checkpoint' && (
        <div className="checkpoint-container">
          <div className="checkpoint-header">
            <span className="phase-tag">STATION C CHECKPOINT</span>
            <span style={{ fontWeight: 800, color: '#ffd54f' }}>
              Round {cpRound + 1} of 3 • Score: {cpScore}/3
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
            {checkpointQuestions[cpRound].q}
          </h3>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="number"
              className="journal-textarea"
              style={{ height: 48, width: 140, padding: '8px 14px', fontSize: '1.2rem' }}
              value={cpAns}
              onChange={(e) => setCpAns(e.target.value)}
              placeholder="Answer"
            />
            <button className="btn btn-primary" onClick={handleCheckCP} disabled={!cpAns}>
              Submit Answer
            </button>
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
