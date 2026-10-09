import React, { useState, useEffect } from 'react';
import { Flame, Zap, Star, ArrowRight } from 'lucide-react';
import WorldMap from '../quiz/WorldMap';
import QuestionRenderer from '../quiz/QuestionRenderer';
import FeedbackOverlay from '../shared/FeedbackOverlay';
import Mascot from '../Mascot';
import { questionBank } from '../../data/questionBank';
import { WORLDS } from '../../data/worlds';
import { calcXP, calcStars } from '../../utils/scoring';
import { narrate, playChime, playBuzz } from '../../utils/audio';
import { correctNarration, incorrectNarration } from '../../utils/narration';

export default function PracticePhase({
  onNext,
  audioEnabled,
  xp,
  setXp,
  streak,
  setStreak,
  maxStreak,
  setMaxStreak,
  worldScores,
  setWorldScores,
  onSpotErrorSolved
}) {
  const [currentWorld, setCurrentWorld] = useState(0);
  const [questionIdxInWorld, setQuestionIdxInWorld] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const worldQuestions = questionBank.slice(currentWorld * 10, (currentWorld + 1) * 10);
  const currentQuestion = worldQuestions[questionIdxInWorld] || worldQuestions[0];
  const worldMeta = WORLDS[currentWorld] || WORLDS[0];

  const handleSelectAnswer = (answer) => {
    const isCorrect = String(answer).trim().toLowerCase() === String(currentQuestion.correctAnswer).trim().toLowerCase();

    if (isCorrect) {
      playChime();
      const xpEarned = calcXP(attemptCount + 1, 0, streak);
      setXp((prev) => prev + xpEarned);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const updatedScores = [...worldScores];
      updatedScores[currentWorld] = (updatedScores[currentWorld] || 0) + 1;
      setWorldScores(updatedScores);

      if (currentQuestion.format === 'spot_error' && onSpotErrorSolved) {
        onSpotErrorSolved();
      }

      narrate(correctNarration(), audioEnabled);
      setFeedback({ isCorrect: true, xpEarned, explanation: currentQuestion.explanation });
    } else {
      playBuzz();
      setStreak(0);
      const nextAttempt = attemptCount + 1;
      setAttemptCount(nextAttempt);

      narrate(incorrectNarration(), audioEnabled);
      if (nextAttempt >= 3) {
        setFeedback({ isCorrect: false, xpEarned: 0, explanation: currentQuestion.explanation });
      }
    }
  };

  const handleContinueFeedback = () => {
    setFeedback(null);
    setAttemptCount(0);

    if (questionIdxInWorld < worldQuestions.length - 1) {
      setQuestionIdxInWorld((prev) => prev + 1);
    } else {
      // Completed world
      if (currentWorld < 9) {
        setCurrentWorld((prev) => prev + 1);
        setQuestionIdxInWorld(0);
      } else {
        onNext();
      }
    }
  };

  const currentWorldScore = worldScores[currentWorld] || 0;
  const stars = calcStars(currentWorldScore);

  return (
    <div className="phase-container practice-phase">
      <div className="glass-card phase-card">
        {/* Header Stats Bar */}
        <div className="play-stats-bar">
          <div className="stat-pill xp-pill">
            <Zap size={18} />
            <span>{xp} XP</span>
          </div>

          <div className="stat-pill streak-pill">
            <Flame size={18} className="flame-icon" />
            <span>{streak} Streak</span>
          </div>

          <div className="stat-pill" style={{ color: '#ffd54f' }}>
            <Star size={18} className="star-filled" />
            <span>{stars} Stars</span>
          </div>

          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Q{questionIdxInWorld + 1} of 10 ({worldMeta.landmark})
          </div>
        </div>

        {/* 10 World Map Selector */}
        <WorldMap
          worldScores={worldScores}
          currentWorld={currentWorld}
          onSelectWorld={(w) => {
            setCurrentWorld(w);
            setQuestionIdxInWorld(0);
            setAttemptCount(0);
          }}
        />

        {/* Current Question */}
        <QuestionRenderer
          question={currentQuestion}
          onSelectAnswer={handleSelectAnswer}
          attemptCount={attemptCount}
        />

        {/* Feedback Overlay Modal */}
        <FeedbackOverlay feedback={feedback} onContinue={handleContinueFeedback} />
      </div>
    </div>
  );
}
