// badgeEngine.js — 11 badges aligned with PRD section 9.2

export const BADGES = [
  {
    id: 'triangle_tamer',
    label: '🔺 Triangle Tamer',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete?.wonder && s.phaseComplete?.story,
  },
  {
    id: 'angle_architect',
    label: '📐 Angle Architect',
    description: 'Pass Simulation Station A (Angle Lab)',
    condition: (s) => s.stationsComplete?.[0],
  },
  {
    id: 'bridge_builder',
    label: '🌉 Bridge Builder',
    description: 'Pass Simulation Station B (Bridge Builder)',
    condition: (s) => s.stationsComplete?.[1],
  },
  {
    id: 'pythagoras_pro',
    label: '🌱 Pythagoras Pro',
    description: 'Pass Simulation Station C (Pythagoras Garden)',
    condition: (s) => s.stationsComplete?.[2],
  },
  {
    id: 'congruence_detective',
    label: '🕵️ Congruence Detective',
    description: 'Pass Simulation Station D (Congruence Detective)',
    condition: (s) => s.stationsComplete?.[3],
  },
  {
    id: 'shadow_surveyor',
    label: '🌞 Shadow Surveyor',
    description: 'Pass Simulation Station E (Shadow Surveyor)',
    condition: (s) => s.stationsComplete?.[4],
  },
  {
    id: 'master_builder',
    label: '🥇 Master Builder',
    description: 'Score 80%+ overall in Practice phase',
    condition: (s) => {
      const totalCorrect = (s.worldScores || []).reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_blueprint',
    label: '💎 Perfect Blueprint',
    description: 'Score a perfect 10/10 in any world',
    condition: (s) => (s.worldScores || []).some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => (s.maxStreak || 0) >= 10,
  },
  {
    id: 'sharp_eye',
    label: '🎯 Sharp Eye',
    description: 'Correctly solve 5 Spot-the-Error challenges',
    condition: (s) => (s.spotErrorCorrect || 0) >= 5,
  },
  {
    id: 'global_architect',
    label: '🌍 Global Architect',
    description: 'Complete all 6 phases of the lesson journey',
    condition: (s) => s.phaseComplete && Object.values(s.phaseComplete).every(Boolean),
  },
];

export function checkBadges(state) {
  const current = state.badges || [];
  return BADGES
    .filter(b => !current.includes(b.id) && b.condition(state))
    .map(b => b.id);
}
