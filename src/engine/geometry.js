// geometry.js — Pure geometric math engine for Grade 8 Triangles

export const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
export const toDeg = (r) => (r * 180) / Math.PI;
export const toRad = (d) => (d * Math.PI) / 180;
export const round = (v, dp = 1) => Math.round(v * 10 ** dp) / 10 ** dp;

// Interior angle at vertex Q between rays QP and QR, in degrees
export function angleAt(P, Q, R) {
  const v1 = { x: P.x - Q.x, y: P.y - Q.y };
  const v2 = { x: R.x - Q.x, y: R.y - Q.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y);
  if (mag === 0) return 0;
  const cos = Math.max(-1, Math.min(1, dot / mag));
  return toDeg(Math.acos(cos));
}

// Angles of triangle [A, B, C]
export function anglesOf([A, B, C]) {
  const a = round(angleAt(B, A, C), 1);
  const b = round(angleAt(A, B, C), 1);
  const c = round(180 - a - b, 1);
  return { A: a, B: b, C: c, sum: 180 };
}

// Side lengths of triangle [A, B, C]
export function sidesOf([A, B, C]) {
  return {
    a: round(dist(B, C), 1),
    b: round(dist(A, C), 1),
    c: round(dist(A, B), 1)
  };
}

export const ANGLE_TOL = 0.75;
export const SIDE_TOL = 0.03;

export function classifyByAngles({ A, B, C }, tol = ANGLE_TOL) {
  const max = Math.max(A, B, C);
  if (Math.abs(max - 90) <= tol) return 'right';
  return max > 90 ? 'obtuse' : 'acute';
}

export function classifyBySides({ a, b, c }, relTol = SIDE_TOL) {
  const eq = (x, y) => Math.abs(x - y) <= relTol * Math.max(x, y, 1);
  if (eq(a, b) && eq(b, c)) return 'equilateral';
  if (eq(a, b) || eq(b, c) || eq(a, c)) return 'isosceles';
  return 'scalene';
}

export function classifyBySidesExact(a, b, c) {
  if (a === b && b === c) return 'equilateral';
  return (a === b || b === c || a === c) ? 'isosceles' : 'scalene';
}

export function classifyByAnglesExact(A, B, C) {
  const m = Math.max(A, B, C);
  if (m === 90) return 'right';
  return m > 90 ? 'obtuse' : 'acute';
}

export const thirdAngle = (x, y) => 180 - x - y;
export const exteriorAngle = (remote1, remote2) => remote1 + remote2;

// Triangle Inequality: sum of any 2 sides > 3rd side
export const canFormTriangle = (a, b, c) =>
  a + b > c && a + c > b && b + c > a;

export const thirdSideRange = (a, b) => ({
  min: Math.abs(a - b),
  max: a + b
});

export function integerThirdSides(a, b) {
  const { min, max } = thirdSideRange(a, b);
  const out = [];
  for (let s = min + 1; s < max; s++) out.push(s);
  return out;
}

// Pythagorean theorem
export const hypotenuse = (a, b) => Math.sqrt(a * a + b * b);
export const missingLeg = (c, a) => Math.sqrt(Math.max(0, c * c - a * a));

// Converse of Pythagoras: acute if a^2+b^2 > c^2, right if ==, obtuse if <
export function pythagoreanClass(x, y, z, eps = 1e-5) {
  const [p, q, r] = [x, y, z].sort((m, n) => m - n);
  const lhs = p * p + q * q;
  const rhs = r * r;
  if (Math.abs(lhs - rhs) <= eps) return 'right';
  return lhs > rhs ? 'acute' : 'obtuse';
}

export const areaBH = (b, h) => 0.5 * b * h;
export const perimeter = (a, b, c) => a + b + c;
export const isoscelesHeight = (equalSide, base) =>
  Math.sqrt(Math.max(0, equalSide ** 2 - (base / 2) ** 2));
