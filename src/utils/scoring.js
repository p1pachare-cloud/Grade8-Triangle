// scoring.js — XP, Star ratings, and world unlock calculations

export function calcXP(attemptNumber, hintsUsed, streak) {
  // 10 XP first try | 7 XP second try | 5 XP third try / hints
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export function calcStars(correct, total = 10) {
  // 1 star for 6–7 correct, 2 stars for 8–9, 3 stars for 10/10
  if (correct >= 10) return 3;
  if (correct >= 8) return 2;
  if (correct >= 6) return 1;
  return 0;
}

export function canUnlockWorld(prevWorldScore) {
  // world unlocks at ≥ 6/10 correct
  return prevWorldScore !== null && prevWorldScore >= 6;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}

export function getArchitectTitle(xp) {
  if (xp >= 1000) return 'Master Architect 🏛️';
  if (xp >= 700) return 'Senior Architect 📐';
  if (xp >= 450) return 'Structural Engineer 🌉';
  if (xp >= 200) return 'Site Surveyor 🔍';
  return 'Apprentice Architect 🔺';
}
