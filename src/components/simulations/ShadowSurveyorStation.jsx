import React, { useState, useEffect } from 'react';
import { Sun, CheckCircle2, Sliders } from 'lucide-react';
import RuleCard from '../shared/RuleCard';
import { RULE_CARDS } from '../../data/ruleCards';
import { heightFromShadow } from '../../engine/similarity';
import { round } from '../../engine/geometry';
import { stationInstructionNarration, stationRuleNarration } from '../../utils/narration';
import { narrate, playClick, playChime, playBuzz } from '../../utils/audio';

export default function ShadowSurveyorStation({ audioEnabled, onComplete }) {
  const [beat, setBeat] = useState('explore');
  const [sunAngle, setSunAngle] = useState(45); // deg
  const [scaleK, setScaleK] = useState(2); // scale factor

  const [cpRound, setCpRound] = useState(0);
  const [cpScore, setCpScore] = useState(0);
  const [cpAns, setCpAns] = useState('');
  const [cpFeedback, setCpFeedback] = useState(null);

  // Solar shadow ratio: tan(angle)
  const rad = (sunAngle * Math.PI) / 180;
  const ratio = round(Math.tan(rad), 2); // Height / Shadow
  const personHeight = 1.6; // m
  const personShadow = round(personHeight / Math.tan(rad), 2);
  const towerHeight = 40; // m
  const towerShadow = round(towerHeight / Math.tan(rad), 1);

  useEffect(() => {
    if (beat === 'explore') {
      narrate(stationInstructionNarration('E'), audioEnabled);
    } else if (beat === 'formalise') {
      narrate(stationRuleNarration('E'), audioEnabled);
    }
  }, [beat, audioEnabled]);

  const checkpointQuestions = [
    { q: "A 2 m stick casts a 3 m shadow. A tower casts a 30 m shadow. How tall is the tower in meters?", ans: "20", exp: "2 / 3 = h / 30 → h = (2/3) × 30 = 20 m." },
    { q: "Two similar triangles have scale factor k = 2.5. If side a = 6, what is corresponding side d?", ans: "15", exp: "6 × 2.5 = 15." },
    { q: "If the scale factor is 3, by what factor does the area multiply?", ans: "9", exp: "Area scales by k² = 3² = 9." }
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
          {/* Shadow Scene Stage */}
          <div className="interactive-svg-stage">
            <svg width="360" height="240" viewBox="0 0 360 240">
              {/* Sun in sky */}
              <circle cx="60" cy="35" r="18" fill="#ffd54f" filter="drop-shadow(0 0 10px #ff9800)" />
              <line x1="60" y1="35" x2="340" y2="200" stroke="rgba(255,213,79,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Ground */}
              <line x1="20" y1="200" x2="340" y2="200" stroke="#4caf50" strokeWidth="4" />

              {/* Person on left */}
              <line x1="100" y1="200" x2="100" y2="160" stroke="#00e5ff" strokeWidth="4" />
              <circle cx="100" cy="155" r="5" fill="#00e5ff" />
              {/* Person Shadow */}
              <line x1="100" y1="200" x2={100 + Math.min(60, personShadow * 20)} y2="200" stroke="#283593" strokeWidth="5" />
              <text x="100" y="145" fill="#00e5ff" textAnchor="middle" fontSize="11" fontWeight="bold">
                1.6 m
              </text>
              <text x={100 + (personShadow * 20) / 2} y="215" fill="#ffd54f" textAnchor="middle" fontSize="11">
                {personShadow} m shadow
              </text>

              {/* Tower on right */}
              <line x1="260" y1="200" x2="260" y2="70" stroke="#ff7043" strokeWidth="6" />
              <polygon points="255,70 265,70 260,50" fill="#ff7043" />
              {/* Tower Shadow */}
              <line x1="260" y1="200" x2={260 - Math.min(110, towerShadow * 2)} y2="200" stroke="#283593" strokeWidth="7" />
              <text x="260" y="42" fill="#ff7043" textAnchor="middle" fontSize="12" fontWeight="bold">
                Tower: 40 m
              </text>
              <text x={260 - (towerShadow * 2) / 2} y="222" fill="#ffd54f" textAnchor="middle" fontSize="11">
                {towerShadow} m shadow
              </text>
            </svg>
          </div>

          {/* Sun Angle Slider */}
          <div style={{ background: 'rgba(20,16,55,0.7)', padding: 14, borderRadius: 'var(--radius-md)' }}>
            <div className="sim-slider-row">
              <Sun size={20} color="#ffd54f" />
              <span className="sim-slider-label">Sun Angle: {sunAngle}°</span>
              <input
                type="range"
                min="25"
                max="65"
                value={sunAngle}
                onChange={(e) => setSunAngle(Number(e.target.value))}
                className="sim-slider-input"
              />
            </div>
          </div>

          {/* Live Proportions Meter */}
          <div className="live-readouts-bar">
            <span className="readout-pill">
              Person: 1.6 ÷ {personShadow} = {ratio}
            </span>
            <span className="readout-pill highlight">=</span>
            <span className="readout-pill">
              Tower: 40 ÷ {towerShadow} = {ratio}
            </span>
            <span className="readout-pill green" style={{ marginLeft: 'auto' }}>
              Height : Shadow Constant! (AA Similarity)
            </span>
          </div>

          <button
            className="btn btn-primary"
            style={{ alignSelf: 'flex-end', fontSize: '0.9rem', padding: '8px 20px' }}
            onClick={() => setBeat('formalise')}
          >
            <span>Lock in Rule →</span>
          </button>
        </div>
      )}

      {beat === 'formalise' && (
        <RuleCard
          ruleData={RULE_CARDS.E.rules[0]}
          onLockedIn={() => {
            playChime();
            setBeat('checkpoint');
          }}
        />
      )}

      {beat === 'checkpoint' && (
        <div className="checkpoint-container">
          <div className="checkpoint-header">
            <span className="phase-tag">STATION E CHECKPOINT</span>
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
