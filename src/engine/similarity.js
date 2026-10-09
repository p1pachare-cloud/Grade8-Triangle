// similarity.js — Similarity testing, scale factors, and indirect measurement

export const scaleFactor = (corrSmall, corrBig) => corrBig / corrSmall;

export function similarByAA(t1Angles, t2Angles, tol = 0.5) {
  const s1 = Object.values(t1Angles).sort((x, y) => x - y);
  const s2 = Object.values(t2Angles).sort((x, y) => x - y);
  return s1.every((v, i) => Math.abs(v - s2[i]) <= tol);
}

export function similarBySSS(s1, s2, eps = 1e-4) {
  const a = [...s1].sort((x, y) => x - y);
  const b = [...s2].sort((x, y) => x - y);
  const k = b[0] / a[0];
  return a.every((v, i) => Math.abs(b[i] / v - k) <= eps * k);
}

export const heightFromShadow = (knownHeight, knownShadow, targetShadow) =>
  (knownHeight / knownShadow) * targetShadow;
