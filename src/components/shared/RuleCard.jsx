import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import SentenceBuilder from './SentenceBuilder';

export default function RuleCard({ ruleData, onLockedIn, isLocked = false }) {
  if (!ruleData) return null;

  return (
    <div className="rule-card-container">
      <div className="phase-header" style={{ marginBottom: 8, paddingBottom: 8 }}>
        <span className="phase-tag">FORMALISE THE RULE</span>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#ffd54f', fontSize: '1.4rem' }}>
          {ruleData.name}
        </h3>
      </div>

      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
        {ruleData.statement}
      </p>

      {ruleData.formula && (
        <div className="rule-formula-box">
          <span>{ruleData.formula}</span>
        </div>
      )}

      {ruleData.why && (
        <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #ff7043', fontSize: '0.95rem' }}>
          <strong style={{ color: '#ffd54f' }}>Why it works: </strong>
          <span style={{ color: '#e0e0e0' }}>{ruleData.why}</span>
        </div>
      )}

      {!isLocked ? (
        <SentenceBuilder
          words={ruleData.sentenceWords}
          targetSentence={ruleData.targetSentence}
          onComplete={onLockedIn}
        />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--green-light)', fontWeight: 800, padding: '8px 0' }}>
          <CheckCircle2 size={20} />
          <span>Rule Locked In! Ready for Checkpoint.</span>
        </div>
      )}
    </div>
  );
}
