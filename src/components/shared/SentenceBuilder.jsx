import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { playClick, playChime } from '../../utils/audio';

export default function SentenceBuilder({ words = [], targetSentence = '', onComplete }) {
  const [placedWords, setPlacedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState(() => {
    // Shuffled pool
    return [...words].sort(() => Math.random() - 0.5);
  });
  const [isError, setIsError] = useState(false);

  const handleAddWord = (word, index) => {
    playClick();
    setIsError(false);
    const newPlaced = [...placedWords, word];
    setPlacedWords(newPlaced);
    const newAvail = [...availableWords];
    newAvail.splice(index, 1);
    setAvailableWords(newAvail);

    // If all words placed, check
    if (newPlaced.length === words.length) {
      const sentenceAttempt = newPlaced.join(' ').toLowerCase();
      const targetClean = targetSentence.replace(/[.!]/g, '').toLowerCase();
      if (sentenceAttempt.includes(targetClean) || targetClean.includes(sentenceAttempt) || newPlaced.length >= words.length - 1) {
        playChime();
        onComplete();
      } else {
        setIsError(true);
      }
    }
  };

  const handleReset = () => {
    playClick();
    setPlacedWords([]);
    setAvailableWords([...words].sort(() => Math.random() - 0.5));
    setIsError(false);
  };

  return (
    <div className="sentence-builder-box">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffd54f' }}>
          Tap words to lock the rule:
        </span>
        <button
          onClick={handleReset}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem' }}
          title="Reset words"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Target Slot Area */}
      <div
        style={{
          minHeight: 48,
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 'var(--radius-sm)',
          border: isError ? '1.5px solid #ef5350' : '1.5px dashed rgba(255,255,255,0.25)',
          padding: '8px 12px',
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {placedWords.length === 0 ? (
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', fontStyle: 'italic' }}>
            Tap the word cards below in order...
          </span>
        ) : (
          placedWords.map((w, idx) => (
            <span
              key={idx}
              style={{
                background: '#ffd54f',
                color: '#1a1a2e',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.95rem',
              }}
            >
              {w}
            </span>
          ))
        )}
      </div>

      {isError && (
        <span style={{ color: '#ef9a9a', fontSize: '0.85rem', fontWeight: 700 }}>
          Not quite in order! Tap Reset to try again.
        </span>
      )}

      {/* Available words pool */}
      <div className="word-chips-pool">
        {availableWords.map((w, i) => (
          <button
            key={i}
            className="word-chip"
            onClick={() => handleAddWord(w, i)}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
}
