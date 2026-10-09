import React from 'react';

const PHASE_CARDS = [
  {
    id: 'wonder',
    emoji: '🤔',
    title: 'Wonder',
    subtitle: 'The Eiffel mystery!',
  },
  {
    id: 'story',
    emoji: '📖',
    title: 'Story',
    subtitle: '10 Cities Challenge',
  },
  {
    id: 'simulate',
    emoji: '🧪',
    title: 'Simulate',
    subtitle: '5 Station Lab',
  },
  {
    id: 'practice',
    emoji: '🎮',
    title: 'Practice',
    subtitle: '100 challenges',
  },
  {
    id: 'reflect',
    emoji: '📓',
    title: 'Reflect',
    subtitle: 'Cert & review',
  },
];

export default function IntroScreen({ onStart, onSelectPhase }) {
  return (
    <div className="intro-screen-layout">
      {/* Top Grade Pill */}
      <div className="grade-badge-pill">
        <span>✨ Grade 8 Math</span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="hero-main-title">Global Triangle Architects</h1>
      <h2 className="hero-subtitle">Properties, Angles, Pythagoras, Congruence &amp; Similarity!</h2>

      {/* Intro Description Box */}
      <div className="hero-description-box">
        <p>
          Discover why triangles make our world's greatest bridges and towers unbreakable! Master angle sums, Pythagoras, congruence proofs, and shadow surveying. 📐🌍
        </p>
      </div>

      {/* 5 Phase Cards Row */}
      <div className="phase-cards-row">
        {PHASE_CARDS.map((card) => (
          <div
            key={card.id}
            className="home-phase-card"
            onClick={() => (onSelectPhase ? onSelectPhase(card.id) : onStart())}
          >
            <div className="phase-card-emoji">{card.emoji}</div>
            <h3 className="phase-card-title">{card.title}</h3>
            <span className="phase-card-subtitle">{card.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Main CTA Button */}
      <button className="btn-begin-journey" onClick={onStart}>
        <span className="rocket-icon">🚀</span>
        <span>Begin Your Journey!</span>
      </button>

      {/* Bottom Feature Tags */}
      <div className="bottom-feature-tags">
        <div className="feature-tag-pill">
          <span>🎯 100 Random Questions</span>
        </div>
        <div className="feature-tag-pill">
          <span>📐 5 Simulation Stations</span>
        </div>
        <div className="feature-tag-pill">
          <span>🏆 Badges &amp; XP</span>
        </div>
      </div>
    </div>
  );
}
