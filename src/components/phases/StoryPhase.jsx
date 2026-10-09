import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Box, Image as ImageIcon } from 'lucide-react';
import Mascot from '../Mascot';
import { STORY_PANELS } from '../../data/storyContent';
import { getStoryNarration } from '../../utils/narration';
import { narrate } from '../../utils/audio';

export default function StoryPhase({ onNext, audioEnabled }) {
  const [panelIndex, setPanelIndex] = useState(0);
  const [viewMode, setViewMode] = useState('image'); // 'image' | 'interactive'

  const panel = STORY_PANELS[panelIndex];

  useEffect(() => {
    narrate(getStoryNarration(panelIndex), audioEnabled);
  }, [panelIndex, audioEnabled]);

  const handleNext = () => {
    if (panelIndex < STORY_PANELS.length - 1) {
      setPanelIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (panelIndex > 0) {
      setPanelIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="phase-container story-phase">
      <div className="glass-card phase-card">
        <div className="phase-header">
          <div>
            <span className="phase-tag">PHASE 2 — STORY</span>
            <h2>The Global Triangle Architects Club</h2>
          </div>

          <div className="panel-dots">
            {STORY_PANELS.map((p, idx) => (
              <button
                key={p.id}
                className={`panel-dot ${idx === panelIndex ? 'active' : ''}`}
                onClick={() => setPanelIndex(idx)}
                title={`Panel ${idx + 1}: ${p.title}`}
              />
            ))}
          </div>
        </div>

        <div className="story-content-wrapper">
          <div className="story-visual-card">
            <div className="story-card-top-bar">
              <div className="story-location-badge">
                <MapPin size={16} />
                <span>{panel.location}</span>
              </div>

              <div className="story-view-toggle">
                <button
                  className={`story-toggle-btn ${viewMode === 'interactive' ? 'active' : ''}`}
                  onClick={() => setViewMode('interactive')}
                >
                  <Box size={14} />
                  <span>Geometry Model</span>
                </button>
                <button
                  className={`story-toggle-btn ${viewMode === 'image' ? 'active' : ''}`}
                  onClick={() => setViewMode('image')}
                >
                  <ImageIcon size={14} />
                  <span>Story Art</span>
                </button>
              </div>
            </div>

            <div className="visual-graphic-container">
              {viewMode === 'image' ? (
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="story-panel-img"
                  onError={(e) => {
                    // Fallback to interactive mode if local image not found
                    setViewMode('interactive');
                  }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Dynamic Interactive Geometric Diagrams for Each Story Beat */}
                  {panel.visualType === 'squadIntro' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      <circle cx="130" cy="100" r="70" fill="none" stroke="#283593" strokeWidth="2" strokeDasharray="4 4" />
                      <polygon points="130,40 190,140 70,140" fill="rgba(255,193,7,0.2)" stroke="#ffd54f" strokeWidth="3" />
                      <text x="130" y="105" fill="#ffd54f" textAnchor="middle" fontSize="16" fontWeight="bold">Global Club</text>
                      <circle cx="130" cy="40" r="7" fill="#00e5ff" />
                      <circle cx="190" cy="140" r="7" fill="#00e5ff" />
                      <circle cx="70" cy="140" r="7" fill="#00e5ff" />
                    </svg>
                  )}

                  {panel.visualType === 'pyramidFace' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      <polygon points="130,30 210,165 50,165" fill="rgba(255,112,67,0.25)" stroke="#ff7043" strokeWidth="3" />
                      <text x="80" y="90" fill="#ffd54f" fontSize="13" fontWeight="bold">10 m</text>
                      <text x="175" y="90" fill="#ffd54f" fontSize="13" fontWeight="bold">10 m</text>
                      <text x="130" y="185" fill="#00e5ff" textAnchor="middle" fontSize="13" fontWeight="bold">Isosceles (Two Equal Sides)</text>
                    </svg>
                  )}

                  {panel.visualType === 'trussAngle' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      <polygon points="130,40 220,160 40,160" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" strokeWidth="3" />
                      <text x="65" y="150" fill="#ffd54f" fontSize="13" fontWeight="bold">65°</text>
                      <text x="180" y="150" fill="#ffd54f" fontSize="13" fontWeight="bold">55°</text>
                      <text x="130" y="65" fill="#00e676" textAnchor="middle" fontSize="13" fontWeight="bold">? = 60°</text>
                      <text x="130" y="185" fill="#ffffff" textAnchor="middle" fontSize="13">180° − 65° − 55° = 60°</text>
                    </svg>
                  )}

                  {panel.visualType === 'exteriorAngle' && (
                    <svg width="280" height="200" viewBox="0 0 280 200">
                      <polygon points="120,40 200,150 40,150" fill="rgba(124,92,191,0.25)" stroke="#7c5cbf" strokeWidth="3" />
                      <line x1="200" y1="150" x2="265" y2="150" stroke="#ff4081" strokeWidth="3" strokeDasharray="3 3" />
                      <path d="M 220 150 A 20 20 0 0 0 205 135" fill="none" stroke="#ff4081" strokeWidth="3" />
                      <text x="235" y="140" fill="#ff4081" fontSize="12" fontWeight="bold">Exterior</text>
                      <text x="65" y="140" fill="#ffd54f" fontSize="12">∠A</text>
                      <text x="120" y="65" fill="#ffd54f" fontSize="12">∠B</text>
                      <text x="140" y="185" fill="#ffd54f" textAnchor="middle" fontSize="12">Exterior = ∠A + ∠B</text>
                    </svg>
                  )}

                  {panel.visualType === 'rodGap' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      <line x1="30" y1="150" x2="230" y2="150" stroke="#00e5ff" strokeWidth="5" />
                      <text x="130" y="170" fill="#00e5ff" textAnchor="middle" fontSize="12">c = 8 m</text>
                      <line x1="30" y1="150" x2="90" y2="85" stroke="#ef5350" strokeWidth="4" />
                      <text x="45" y="110" fill="#ef5350" fontSize="12">a = 3</text>
                      <line x1="230" y1="150" x2="160" y2="85" stroke="#4caf50" strokeWidth="4" />
                      <text x="205" y="110" fill="#4caf50" fontSize="12">b = 4</text>
                      <circle cx="125" cy="85" r="14" fill="none" stroke="#ff4081" strokeWidth="2" strokeDasharray="2 2" />
                      <text x="130" y="55" fill="#ff4081" textAnchor="middle" fontSize="13" fontWeight="bold">Gap! 3 + 4 &lt; 8</text>
                    </svg>
                  )}

                  {panel.visualType === 'pythagorasLadder' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      {/* Wall & Ground */}
                      <line x1="60" y1="20" x2="60" y2="160" stroke="#ffffff" strokeWidth="4" />
                      <line x1="50" y1="160" x2="220" y2="160" stroke="#ffffff" strokeWidth="4" />
                      {/* Ladder */}
                      <line x1="160" y1="160" x2="60" y2="50" stroke="#ffd54f" strokeWidth="4" />
                      <rect x="60" y="145" width="15" height="15" fill="none" stroke="#00e5ff" strokeWidth="2" />
                      <text x="120" y="95" fill="#ffd54f" fontSize="12" fontWeight="bold">13 m (c)</text>
                      <text x="105" y="180" fill="#00e5ff" fontSize="12" fontWeight="bold">5 m (b)</text>
                      <text x="35" y="105" fill="#4caf50" fontSize="12" fontWeight="bold">h = 12 m</text>
                    </svg>
                  )}

                  {panel.visualType === 'congruenceSimilarity' && (
                    <svg width="260" height="200" viewBox="0 0 260 200">
                      <polygon points="40,140 100,140 70,80" fill="rgba(76,175,80,0.3)" stroke="#4caf50" strokeWidth="2" />
                      <polygon points="130,140 230,140 180,40" fill="rgba(255,193,7,0.3)" stroke="#ffd54f" strokeWidth="2" />
                      <text x="70" y="165" fill="#4caf50" textAnchor="middle" fontSize="11" fontWeight="bold">Scale × 1</text>
                      <text x="180" y="165" fill="#ffd54f" textAnchor="middle" fontSize="11" fontWeight="bold">Similar (Scale k)</text>
                      <text x="130" y="30" fill="#00e5ff" textAnchor="middle" fontSize="13" fontWeight="bold">Congruence &amp; Similarity</text>
                    </svg>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="story-narrative-card">
            <div className="story-speaker-title">
              <Mascot mood="happy" size="medium" />
              <div>
                <span className="phase-tag">{panel.badge}</span>
                <h3>{panel.title}</h3>
              </div>
            </div>

            <p>{panel.narrationText}</p>

            <div className="story-detail-box">
              <span>{panel.detailText}</span>
            </div>

            <div className="story-controls-row">
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={panelIndex === 0}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <button className="btn btn-primary" onClick={handleNext}>
                <span>{panelIndex === STORY_PANELS.length - 1 ? 'Enter Simulations' : 'Next Panel'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
