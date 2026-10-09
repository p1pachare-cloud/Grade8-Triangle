import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Move, Split, Eye } from 'lucide-react';
import RuleCard from '../shared/RuleCard';
import { RULE_CARDS } from '../../data/ruleCards';
import { anglesOf, round, thirdAngle, exteriorAngle } from '../../engine/geometry';
import { stationInstructionNarration, stationRuleNarration } from '../../utils/narration';
import { narrate, playClick, playChime, playBuzz } from '../../utils/audio';

export default function AngleLabStation({ audioEnabled, onComplete }) {
  const [beat, setBeat] = useState('explore'); // 'explore' | 'formalise' | 'checkpoint'
  const [vertexA, setVertexA] = useState({ x: 180, y: 50 });
  const [vertexB, setVertexB] = useState({ x: 60, y: 220 });
  const [vertexC, setVertexC] = useState({ x: 300, y: 220 });
  const [tearAligned, setTearAligned] = useState(false);
  const [showParallel, setShowParallel] = useState(false);
  const [exteriorExt, setExteriorExt] = useState(0); // 0 to 80 px

  // Checkpoint State (3 rounds)
  const [cpRound, setCpRound] = useState(0);
  const [cpScore, setCpScore] = useState(0);
  const [cpAns, setCpAns] = useState('');
  const [cpFeedback, setCpFeedback] = useState(null);

  const angles = anglesOf([vertexA, vertexB, vertexC]);

  useEffect(() => {
    if (beat === 'explore') {
      narrate(stationInstructionNarration('A'), audioEnabled);
    } else if (beat === 'formalise') {
      narrate(stationRuleNarration('A'), audioEnabled);
    }
  }, [beat, audioEnabled]);

  const handleDragA = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(50, Math.min(310, e.clientX - rect.left));
    const y = Math.max(30, Math.min(180, e.clientY - rect.top));
    setVertexA({ x, y });
  };

  const checkpointQuestions = [
    { q: "Two angles are 52° and 67°. What is the third angle in degrees?", ans: "61", hint: "180 − 52 − 67" },
    { q: "Angles are x, 2x, and 3x. Find the value of x.", ans: "30", hint: "6x = 180" },
    { q: "The exterior angle is 115° and one remote angle is 45°. Find the other remote angle.", ans: "70", hint: "115 − 45" }
  ];

  const handleCheckCheckpoint = () => {
    const curr = checkpointQuestions[cpRound];
    if (cpAns.trim() === curr.ans) {
      playChime();
      setCpScore((s) => s + 1);
      setCpFeedback({ correct: true, text: `Correct! ${curr.ans}°` });
    } else {
      playBuzz();
      setCpFeedback({ correct: false, text: `Not quite. Answer was ${curr.ans}° (${curr.hint})` });
    }

    setTimeout(() => {
      setCpFeedback(null);
      setCpAns('');
      if (cpRound < 2) {
        setCpRound((r) => r + 1);
      } else {
        // Complete
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
          {/* Interactive SVG Stage */}
          <div
            className="interactive-svg-stage"
            onPointerMove={(e) => {
              if (e.buttons === 1) handleDragA(e);
            }}
          >
            <svg width="360" height="260" viewBox="0 0 360 260">
              {/* Optional Parallel Line through Top Vertex */}
              {showParallel && (
                <line
                  x1="10"
                  y1={vertexA.y}
                  x2="350"
                  y2={vertexA.y}
                  stroke="#00e5ff"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* Triangle Polygon */}
              <polygon
                points={`${vertexA.x},${vertexA.y} ${vertexB.x},${vertexB.y} ${vertexC.x},${vertexC.y}`}
                fill="rgba(124, 92, 191, 0.25)"
                stroke="#ffd54f"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Extended side for exterior angle */}
              {exteriorExt > 0 && (
                <>
                  <line
                    x1={vertexB.x}
                    y1={vertexB.y}
                    x2={vertexC.x + exteriorExt}
                    y2={vertexC.y}
                    stroke="#ff4081"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />
                  <path
                    d={`M ${vertexC.x + 20} ${vertexC.y} A 20 20 0 0 0 ${vertexC.x + 12} ${vertexC.y - 15}`}
                    fill="none"
                    stroke="#ff4081"
                    strokeWidth="3"
                  />
                  <text x={vertexC.x + 35} y={vertexC.y - 10} fill="#ff4081" fontSize="12" fontWeight="bold">
                    Ext = {round(angles.A + angles.B, 1)}°
                  </text>
                </>
              )}

              {/* Tear and Align Demonstration Animation */}
              {tearAligned && (
                <g transform="translate(40, 240)">
                  <line x1="0" y1="0" x2="280" y2="0" stroke="#00e676" strokeWidth="4" />
                  <text x="140" y="-8" fill="#00e676" textAnchor="middle" fontSize="13" fontWeight="bold">
                    Straight Line = 180°
                  </text>
                </g>
              )}

              {/* Vertex Labels & Angle Arcs */}
              <text x={vertexA.x} y={vertexA.y - 12} fill="#ffd54f" textAnchor="middle" fontSize="14" fontWeight="bold">
                A ({angles.A}°)
              </text>
              <text x={vertexB.x - 24} y={vertexB.y + 16} fill="#00e5ff" fontSize="14" fontWeight="bold">
                B ({angles.B}°)
              </text>
              <text x={vertexC.x + 12} y={vertexC.y + 16} fill="#ff7043" fontSize="14" fontWeight="bold">
                C ({angles.C}°)
              </text>

              {/* Draggable Vertex A */}
              <circle
                cx={vertexA.x}
                cy={vertexA.y}
                r="10"
                fill="#ffd54f"
                stroke="#1a1a2e"
                strokeWidth="2.5"
                style={{ cursor: 'grab' }}
              />
            </svg>
          </div>

          {/* Live Readouts */}
          <div className="live-readouts-bar">
            <span className="readout-pill">∠A: {angles.A}°</span>
            <span className="readout-pill">∠B: {angles.B}°</span>
            <span className="readout-pill">∠C: {angles.C}°</span>
            <span className="readout-pill highlight">Total Sum = 180°</span>
          </div>

          {/* Interaction Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
              onClick={() => {
                playClick();
                setTearAligned(!tearAligned);
              }}
            >
              <Split size={16} />
              <span>{tearAligned ? 'Reset Corners' : 'Tear & Align Corners (180°)'}</span>
            </button>

            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
              onClick={() => {
                playClick();
                setShowParallel(!showParallel);
              }}
            >
              <Eye size={16} />
              <span>{showParallel ? 'Hide Parallel Line' : 'Show Parallel Line Secret'}</span>
            </button>

            <button
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '8px 16px' }}
              onClick={() => {
                playClick();
                setExteriorExt((e) => (e > 0 ? 0 : 60));
              }}
            >
              <Move size={16} />
              <span>{exteriorExt > 0 ? 'Hide Exterior Angle' : 'Extend Exterior Angle'}</span>
            </button>

            <button
              className="btn btn-primary"
              style={{ marginLeft: 'auto', fontSize: '0.9rem', padding: '8px 20px' }}
              onClick={() => setBeat('formalise')}
            >
              <span>Lock in Rule →</span>
            </button>
          </div>
        </div>
      )}

      {beat === 'formalise' && (
        <RuleCard
          ruleData={RULE_CARDS.A.rules[0]}
          onLockedIn={() => {
            playChime();
            setBeat('checkpoint');
          }}
        />
      )}

      {beat === 'checkpoint' && (
        <div className="checkpoint-container">
          <div className="checkpoint-header">
            <span className="phase-tag">STATION A CHECKPOINT</span>
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
              placeholder="Degrees"
            />
            <button className="btn btn-primary" onClick={handleCheckCheckpoint} disabled={!cpAns}>
              Submit Answer
            </button>
          </div>

          {cpFeedback && (
            <div style={{ color: cpFeedback.correct ? '#81c784' : '#ef9a9a', fontWeight: 800 }}>
              {cpFeedback.text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
