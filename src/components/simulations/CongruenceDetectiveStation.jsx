import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import RuleCard from '../shared/RuleCard';
import { RULE_CARDS } from '../../data/ruleCards';
import { possibleTriangles } from '../../engine/congruence';
import { stationInstructionNarration, stationRuleNarration } from '../../utils/narration';
import { narrate, playClick, playChime, playBuzz } from '../../utils/audio';

const EVIDENCE_OPTIONS = [
  { id: 'SSS', label: '3 Sides (SSS)', result: 1, text: 'Unique Triangle! Shape locked.' },
  { id: 'SAS', label: '2 Sides + Included Angle (SAS)', result: 1, text: 'Unique Triangle! Sandwich angle locks it.' },
  { id: 'ASA', label: '2 Angles + Included Side (ASA)', result: 1, text: 'Unique Triangle! Rays meet at one point.' },
  { id: 'AAS', label: '2 Angles + Non-Included Side (AAS)', result: 1, text: 'Unique Triangle! 3rd angle follows from 180°.' },
  { id: 'RHS', label: 'Right Angle + Hypotenuse + Leg (RHS)', result: 1, text: 'Unique Triangle! Right angle secures it.' },
  { id: 'SSA', label: '2 Sides + Non-Included Angle (SSA)', result: 2, text: '⚠️ AMBIGUOUS! Swinging rod cuts base twice (2 triangles)!' },
  { id: 'AAA', label: '3 Angles (AAA)', result: Infinity, text: '⚠️ Infinite Triangles! Same shape, any scale size!' },
];

export default function CongruenceDetectiveStation({ audioEnabled, onComplete, onSSACaseSeen }) {
  const [beat, setBeat] = useState('explore');
  const [selectedEvidence, setSelectedEvidence] = useState(EVIDENCE_OPTIONS[0]);

  const [cpRound, setCpRound] = useState(0);
  const [cpScore, setCpScore] = useState(0);
  const [cpAns, setCpAns] = useState(null);
  const [cpFeedback, setCpFeedback] = useState(null);

  useEffect(() => {
    if (beat === 'explore') {
      narrate(stationInstructionNarration('D'), audioEnabled);
    } else if (beat === 'formalise') {
      narrate(stationRuleNarration('D'), audioEnabled);
    }
  }, [beat, audioEnabled]);

  const handleSelectEvidence = (ev) => {
    playClick();
    setSelectedEvidence(ev);
    if (ev.id === 'SSA' && onSSACaseSeen) {
      onSSACaseSeen();
    }
  };

  const checkpointQuestions = [
    { q: "Which of the following is NOT a valid congruence criterion?", options: ["SAS", "SSA", "ASA", "SSS"], ans: "SSA", exp: "SSA is ambiguous and can form 2 distinct triangles." },
    { q: "Why is AAA not enough to prove triangles are congruent?", options: ["It allows any size (scaling)", "Angles don't sum to 180°", "It is only for right triangles"], ans: "It allows any size (scaling)", exp: "AAA preserves shape but allows scaling to any size." },
    { q: "If △ABC ≅ △PQR, which side matches AB?", options: ["PQ", "QR", "PR"], ans: "PQ", exp: "Corresponding letters match: AB ↔ PQ." }
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
          {/* Construction Bench SVG */}
          <div className="interactive-svg-stage">
            <svg width="360" height="240" viewBox="0 0 360 240">
              <text x="180" y="30" fill="#ffd54f" textAnchor="middle" fontSize="14" fontWeight="bold">
                Workbench: Testing {selectedEvidence.id}
              </text>

              {selectedEvidence.id === 'SSA' ? (
                /* Ambiguous Case: 2 Triangles Shown with swinging arc */
                <g>
                  <line x1="40" y1="180" x2="320" y2="180" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="40" y1="180" x2="160" y2="70" stroke="#ffd54f" strokeWidth="3" />
                  <text x="90" y="115" fill="#ffd54f" fontSize="12">Side b</text>

                  {/* Triangle 1 (acute) */}
                  <line x1="160" y1="70" x2="260" y2="180" stroke="#00e5ff" strokeWidth="3" />
                  <polygon points="40,180 160,70 260,180" fill="rgba(0,229,255,0.2)" />

                  {/* Triangle 2 (obtuse) */}
                  <line x1="160" y1="70" x2="110" y2="180" stroke="#ff4081" strokeWidth="3" />
                  <polygon points="40,180 160,70 110,180" fill="rgba(255,64,129,0.2)" />

                  {/* Swinging Arc */}
                  <path d="M 90 190 A 130 130 0 0 0 280 165" fill="none" stroke="#ff7043" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="260" cy="180" r="5" fill="#00e5ff" />
                  <circle cx="110" cy="180" r="5" fill="#ff4081" />

                  <text x="180" y="215" fill="#ff4081" textAnchor="middle" fontSize="13" fontWeight="bold">
                    2 Intersections! Ambiguous Case (SSA Fails!)
                  </text>
                </g>
              ) : selectedEvidence.id === 'AAA' ? (
                /* AAA Case: Nested Scaled Triangles */
                <g>
                  <polygon points="180,60 120,180 240,180" fill="none" stroke="#4fc3f7" strokeWidth="2" />
                  <polygon points="180,90 145,180 215,180" fill="none" stroke="#ffd54f" strokeWidth="2" />
                  <polygon points="180,120 160,180 200,180" fill="none" stroke="#00e676" strokeWidth="2" />
                  <text x="180" y="215" fill="#4fc3f7" textAnchor="middle" fontSize="13" fontWeight="bold">
                    Infinite Sizes! Shapes match, sizes vary (AAA Fails!)
                  </text>
                </g>
              ) : (
                /* Valid Congruence Case: Exactly 1 Rigid Triangle */
                <g>
                  <polygon points="180,60 80,180 280,180" fill="rgba(76,175,80,0.25)" stroke="#81c784" strokeWidth="3.5" />
                  <circle cx="180" cy="60" r="5" fill="#ffd54f" />
                  <circle cx="80" cy="180" r="5" fill="#ffd54f" />
                  <circle cx="280" cy="180" r="5" fill="#ffd54f" />
                  <text x="180" y="215" fill="#81c784" textAnchor="middle" fontSize="13" fontWeight="bold">
                    Locks Exactly 1 Unique Triangle! (Congruent ✓)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Evidence Selector Buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EVIDENCE_OPTIONS.map((ev) => (
              <button
                key={ev.id}
                className={`beat-tab-btn ${selectedEvidence.id === ev.id ? 'active' : ''}`}
                onClick={() => handleSelectEvidence(ev)}
              >
                {ev.label}
              </button>
            ))}
          </div>

          {/* Status Chip */}
          <div className="live-readouts-bar">
            <span
              className={`readout-pill ${
                selectedEvidence.result === 1 ? 'green' : 'red'
              }`}
            >
              {selectedEvidence.text}
            </span>
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
          ruleData={RULE_CARDS.D.rules[0]}
          onLockedIn={() => {
            playChime();
            setBeat('checkpoint');
          }}
        />
      )}

      {beat === 'checkpoint' && (
        <div className="checkpoint-container">
          <div className="checkpoint-header">
            <span className="phase-tag">STATION D CHECKPOINT</span>
            <span style={{ fontWeight: 800, color: '#ffd54f' }}>
              Round {cpRound + 1} of 3 • Score: {cpScore}/3
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
            {checkpointQuestions[cpRound].q}
          </h3>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {checkpointQuestions[cpRound].options.map((opt, i) => (
              <button
                key={i}
                className="btn btn-secondary"
                style={{ fontSize: '1rem' }}
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
