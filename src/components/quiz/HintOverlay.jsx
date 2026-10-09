import React from 'react';
import { HelpCircle, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function HintOverlay({ hint1, hint2, explanation, attemptCount }) {
  if (attemptCount === 0) return null;

  return (
    <div className="hint-overlay-box">
      {attemptCount >= 1 && hint1 && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <Lightbulb size={18} color="#ffd54f" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#ffd54f' }}>Hint 1: </strong>
            <span>{hint1}</span>
          </div>
        </div>
      )}

      {attemptCount >= 2 && hint2 && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
          <Lightbulb size={18} color="#ff7043" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#ff7043' }}>Hint 2: </strong>
            <span>{typeof hint2 === 'string' ? hint2 : hint2.text}</span>
          </div>
        </div>
      )}

      {attemptCount >= 3 && explanation && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4, background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
          <CheckCircle2 size={18} color="#81c784" style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#81c784' }}>Worked Solution: </strong>
            <span>{explanation}</span>
          </div>
        </div>
      )}
    </div>
  );
}
