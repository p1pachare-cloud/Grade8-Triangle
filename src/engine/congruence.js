// congruence.js — Congruence criteria & ambiguous case checks
import { canFormTriangle, toRad } from './geometry';

export function possibleTriangles(e) {
  switch (e.type) {
    case 'SSS':
      return canFormTriangle(e.a, e.b, e.c) ? 1 : 0;
    case 'SAS':
      return (e.includedAngle > 0 && e.includedAngle < 180 && e.a > 0 && e.b > 0) ? 1 : 0;
    case 'ASA':
      return (e.A > 0 && e.B > 0 && e.A + e.B < 180 && e.includedSide > 0) ? 1 : 0;
    case 'AAS':
      return (e.A > 0 && e.B > 0 && e.A + e.B < 180 && e.side > 0) ? 1 : 0;
    case 'RHS':
      return (e.hyp > e.leg && e.leg > 0) ? 1 : 0;
    case 'AAA':
      return (Math.abs(e.A + e.B + e.C - 180) < 0.1) ? Infinity : 0;
    case 'SSA': {
      // Ambiguous case: side a opposite angleA, adjacent side b
      const { a, b, angleA } = e;
      if (a <= 0 || b <= 0 || angleA <= 0 || angleA >= 180) return 0;
      const h = b * Math.sin(toRad(angleA));
      const EPS = 1e-4;
      if (angleA >= 90) return a > b ? 1 : 0;
      if (a < h - EPS) return 0; // cannot reach the base line
      if (Math.abs(a - h) <= EPS) return 1; // right angle
      if (a >= b) return 1; // single intersection
      return 2; // two intersections!
    }
    default:
      return 0;
  }
}

export function buildSSA({ a, b, angleA }) {
  const h = b * Math.sin(toRad(angleA));
  if (a < h) return [];
  const A = { x: 40, y: 160 };
  const radA = toRad(angleA);
  const C = {
    x: A.x + b * Math.cos(radA) * 12,
    y: A.y - b * Math.sin(radA) * 12
  };
  const d = Math.sqrt(Math.max(0, a * a - h * h));
  const x1 = A.x + (b * Math.cos(radA) - d) * 12;
  const x2 = A.x + (b * Math.cos(radA) + d) * 12;

  const triangles = [];
  if (x1 > A.x) {
    triangles.push({ A, B: { x: x1, y: 160 }, C });
  }
  if (x2 > A.x && Math.abs(x2 - x1) > 5) {
    triangles.push({ A, B: { x: x2, y: 160 }, C });
  }
  return triangles;
}
