import React, { useState, useEffect } from 'react';
import DiagramFor from './DiagramFor';
import HintOverlay from './HintOverlay';
import NumberPad from '../shared/NumberPad';

export default function QuestionRenderer({ question, onSelectAnswer, attemptCount }) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(null);
  }, [question?.id]);

  if (!question) return null;

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    onSelectAnswer(opt);
  };

  return (
    <div className="question-renderer-card glass-card">
      <div className="question-type-badge">
        <span>Question Type: {question.family || question.type?.toUpperCase()}</span>
      </div>

      <h3 className="question-text-title">{question.questionText}</h3>

      {/* Visual scaffold if available */}
      {question.visual && question.visual !== 'none' && (
        <div className="question-visual-scaffold">
          <DiagramFor visual={question.visual} data={question.visualData} />
        </div>
      )}

      {/* Render format-specific controls */}
      {question.format === 'numeric' ? (
        <NumberPad onSubmit={(val) => onSelectAnswer(val)} unit={question.unit} />
      ) : (
        /* Options grid for MCQ, True/False, MultiSelect, OrderSteps, SpotError */
        <div className="mcq-options-grid">
          {question.options &&
            question.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  className={`mcq-option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
        </div>
      )}

      {/* Graduated hints */}
      <HintOverlay
        hint1={question.hint1}
        hint2={question.hint2}
        explanation={question.explanation}
        attemptCount={attemptCount}
      />
    </div>
  );
}
