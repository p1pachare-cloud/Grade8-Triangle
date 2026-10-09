# Technical Requirements Document (TRD)

## Triangles — Properties, Angles, Pythagoras, Congruence & Similarity | Grade 8 Math

### Intellia | Global Grade 8 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, geometry engine, question-generation engine, simulation logic, gamification, audio pipeline, deployment and quality standards for **"Global Triangle Architects — Triangles"**, the Grade 8 interactive lesson module.

The module is a **React 18 application (Vite + JSX)**, structured to mirror the reference repository **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** (same top-level layout: `public/assets`, `scripts`, `src`, `api`, Tailwind + PostCSS + Vite config) and styled to strictly match **<https://grade5-time-intervals.vercel.app/>**. It will be embedded/hosted at:

```
https://intelliasg.com/courses/grade-8-math/lessons/triangles/
```

Audio narration uses **ElevenLabs exclusively**, implementing the pipeline in `audio_generation_pipeline.md`, adapted for **randomly generated questions** (see §9).

### 1.1 Key architectural differences from the Grade 5 reference

| Area | Grade 5 reference | Grade 8 Triangles | Why |
| ---- | ----------------- | ----------------- | --- |
| Question source | Static bank of 100 objects, shuffled | **Seeded, parameterised generators** producing 100 fresh questions per session | "Every question should be random" |
| Math core | `timeMath.js` (minutes arithmetic) | `geometry.js` (points, angles, Pythagoras, congruence & similarity solvers) | Triangles domain |
| Simulations | 3 stations | **5 stations**, each Explore → Formalise → Checkpoint | Five distinct big ideas |
| Question audio | Pre-generated | Static for story/UI; **dynamic + cached + preloaded** for questions | Random numbers can't be pre-generated |
| Session resume | Persist state | Persist **seed + progress**, regenerate deterministically | Small storage, reproducible |
| API key | `VITE_` key used client-side | **Server-side proxy** for runtime audio; `VITE_` key only for the offline script | Don't ship a secret in the bundle |

---

## 2. Technology Stack

| Layer | Technology | Rationale |
| ----- | ---------- | --------- |
| UI Framework | React 18 (JSX, Vite) | Matches reference repo |
| State | `useReducer` + `useState` (context for global game state) | Sufficient for single-module complexity |
| Styling | Tailwind CSS + PostCSS (+ small `App.css` for keyframes) | Matches reference (`tailwind.config.js`, `postcss.config.js`) |
| Icons | Lucide React | Consistent with reference style |
| Geometry rendering | Inline SVG via React | Crisp, scalable, accessible |
| Pointer interaction | Native Pointer Events (`pointerdown/move/up`) + `setPointerCapture` | Unified mouse/touch/pen drag; no heavy library |
| Animation | CSS keyframes/transitions; `requestAnimationFrame` for construction & dissection animations | No external dependency |
| Randomness | `crypto.getRandomValues` → seed; **mulberry32** seeded PRNG | Reproducible sessions |
| Persistence | `localStorage` (progress + seed) and **IndexedDB** (audio blob cache) | No backend |
| Audio generation | ElevenLabs API | Voice: Alice |
| Audio playback | HTML5 `Audio` | Browser-native |
| Serverless | Vercel Function `api/elevenlabs.js` | Hides API key |
| Testing | Vitest + React Testing Library + Playwright (smoke) | Fast unit loop; E2E for phases |
| Linting | ESLint + Prettier | Consistency |
| Hosting | Vercel (static build + function) | Same as reference |

---

## 3. Project Structure (mirrors the Grade 5 reference)

```
grade8-triangles/
├── public/
│   └── assets/
│       ├── audio/                          # Pre-generated .mp3 (static phrases)
│       └── images/
│           ├── mascot-idle.svg  mascot-happy.svg  mascot-thinking.svg
│           ├── mascot-celebrate.svg  mascot-curious.svg  mascot-encouraging.svg
│           ├── world-map-bg.svg
│           └── landmarks/                  # cairo.svg paris.svg sydney.svg london.svg
│                                           # newyork.svg mumbai.svg capetown.svg
│                                           # tokyo.svg rio.svg cusco.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx                             # Root; GameProvider; phase router
│   ├── App.css                             # Keyframes + shared utilities (mirrors reference)
│   ├── components/
│   │   ├── IntroScreen.jsx
│   │   ├── ProgressMap.jsx                 # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx             # Push-the-frame hook (square vs triangle)
│   │   │   ├── StoryPhase.jsx              # 7 panels
│   │   │   ├── SimulatePhase.jsx           # Station hub + gate to Play
│   │   │   ├── PlayPhase.jsx               # World map + question runner
│   │   │   └── ReflectPhase.jsx
│   │   ├── simulations/
│   │   │   ├── StationShell.jsx            # Explore → Formalise → Checkpoint state machine
│   │   │   ├── AngleLabStation.jsx         # Station A
│   │   │   ├── BridgeBuilderStation.jsx    # Station B
│   │   │   ├── PythagorasGardenStation.jsx # Station C
│   │   │   ├── CongruenceDetectiveStation.jsx # Station D
│   │   │   ├── ShadowSurveyorStation.jsx   # Station E
│   │   │   └── checkpoints/
│   │   │       └── CheckpointRunner.jsx    # 3-round randomised mini-quiz
│   │   ├── geometry/                       # Reusable SVG building blocks
│   │   │   ├── TriangleCanvas.jsx          # Draggable vertices, angle arcs, labels
│   │   │   ├── AngleArc.jsx
│   │   │   ├── SideLabel.jsx
│   │   │   ├── RodBridge.jsx
│   │   │   ├── SquareGarden.jsx
│   │   │   ├── DissectionProof.jsx
│   │   │   ├── ConstructionBench.jsx
│   │   │   ├── ShadowScene.jsx
│   │   │   ├── SimilarPair.jsx
│   │   │   └── TearAndAlign.jsx
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx        # Dispatch by format
│   │   │   ├── formats/
│   │   │   │   ├── McqFormat.jsx
│   │   │   │   ├── NumericFormat.jsx       # Number pad
│   │   │   │   ├── TrueFalseFormat.jsx
│   │   │   │   ├── MultiSelectFormat.jsx
│   │   │   │   ├── OrderStepsFormat.jsx    # Drag/tap reorder
│   │   │   │   └── SpotErrorFormat.jsx
│   │   │   ├── DiagramFor.jsx              # Picks the diagram for a question spec
│   │   │   ├── HintOverlay.jsx             # Hint 1 text, Hint 2 mini-sim, Hint 3 worked solution
│   │   │   └── WorkedSolution.jsx
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx   StarRating.jsx   BadgePanel.jsx
│   │   │   ├── StreakCounter.jsx   WorldMap.jsx   LevelTitle.jsx
│   │   └── shared/
│   │       ├── Mascot.jsx                  # "Trigo"
│   │       ├── RuleCard.jsx
│   │       ├── SentenceBuilder.jsx         # Formalise-beat drag-the-words
│   │       ├── NumberPad.jsx
│   │       ├── FeedbackOverlay.jsx
│   │       ├── GlossaryPopover.jsx
│   │       └── AudioToggle.jsx
│   ├── data/
│   │   ├── storyContent.js                 # 7 panels: text, visual id, style
│   │   ├── ruleCards.js                    # Station rule cards + sentence-builder targets
│   │   ├── worlds.js                       # 10 worlds: city, landmark, blueprint
│   │   ├── names.js                        # Global names/cities/contexts pools
│   │   ├── tripleTable.js                  # Pythagorean triples
│   │   └── glossary.js
│   ├── engine/
│   │   ├── geometry.js                     # Core math (pure functions, fully tested)
│   │   ├── congruence.js                   # Evidence → # of possible triangles
│   │   ├── similarity.js                   # AA/SAS~/SSS~ checks, scale factors
│   │   ├── rng.js                          # mulberry32, pick, int, shuffle (seeded)
│   │   ├── speakify.js                     # Maths → spoken text
│   │   ├── distractors.js                  # Misconception-driven wrong options
│   │   ├── generators/
│   │   │   ├── index.js                    # registry: Q1…Q10
│   │   │   ├── q1_classify.js
│   │   │   ├── q2_angleSum.js
│   │   │   ├── q3_exterior.js
│   │   │   ├── q4_inequality.js
│   │   │   ├── q5_pythagoras.js
│   │   │   ├── q6_converse.js
│   │   │   ├── q7_congruence.js
│   │   │   ├── q8_similarity.js
│   │   │   ├── q9_area.js
│   │   │   └── q10_multiStep.js
│   │   ├── sessionBuilder.js               # Blueprint → 100 questions, dedupe, shuffle
│   │   └── checkpointBuilder.js            # 3-round randomised station checkpoints
│   ├── hooks/
│   │   ├── useGame.js                      # Context accessor
│   │   ├── useDrag.js                      # Pointer-event vertex dragging + keyboard
│   │   ├── useAudio.js                     # narrate/stop bindings + audioEnabled
│   │   ├── useLocalStorage.js
│   │   └── useReducedMotion.js
│   ├── state/
│   │   ├── gameReducer.js
│   │   ├── actions.js
│   │   └── GameProvider.jsx
│   └── utils/
│       ├── audio.js                        # Engine: segment helpers, narrate, queue
│       ├── audioMap.js                     # AUTO-GENERATED: text → .mp3 path
│       ├── narration.js                    # Phase scripts using segment helpers
│       ├── scoring.js                      # XP, stars, unlock gate
│       ├── badgeEngine.js
│       └── format.js                       # Angle/length formatting, rounding
├── scripts/
│   ├── generate_audio.js                   # Offline ElevenLabs pre-generation
│   ├── clean_audio.js                      # Remove orphaned .mp3
│   ├── check_audio_parity.js               # narration.js ↔ phrases[] diff
│   └── warm_audio_pool.js                  # (optional) pre-generate seeded question pool
├── api/
│   └── elevenlabs.js                       # Vercel function (server-side key)
├── tests/
│   ├── geometry.test.js   congruence.test.js   similarity.test.js
│   ├── generators.test.js   randomness.test.js   speakify.test.js
│   ├── scoring.test.js   badges.test.js
│   └── e2e/phases.spec.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── .env.local.example
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global state (`state/gameReducer.js`)

```js
export const initialState = {
  // Navigation
  phase: 'intro',            // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'
  storyPanel: 0,             // 0–6
  currentStation: 0,         // 0..4  (A..E)

  // Simulation (learning-first gate)
  stations: {
    A: { explore: 0, formalised: false, passed: false, retries: 0, perfect: true },
    B: { explore: 0, formalised: false, passed: false, retries: 0, perfect: true },
    C: { explore: 0, formalised: false, passed: false, retries: 0, perfect: true },
    D: { explore: 0, formalised: false, passed: false, retries: 0, perfect: true, ssaCaseSeen: false },
    E: { explore: 0, formalised: false, passed: false, retries: 0, perfect: true },
  },

  // Play
  sessionSeed: null,         // uint32, set once at session start
  worldAttempt: Array(10).fill(0),   // increments on replay → new sub-seed
  questions: [],             // current world's 10 generated questions (derived, not persisted)
  currentWorld: 0,           // 0..9
  currentQuestion: 0,        // 0..9 within the world
  worldScores: Array(10).fill(null), // best correct count per world
  worldRunCorrect: 0,        // correct count in the current run
  attemptCount: 0,           // attempts on current question (max 3)
  hintsUsed: 0,

  // Gamification
  xp: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  spotErrorCorrect: 0,

  // Phases
  phaseComplete: { wonder:false, story:false, simulate:false, play:false, reflect:false },

  // Settings
  audioEnabled: true,
  reducedMotion: false,
  schemaVersion: 1,
};
```

### 4.2 Actions

```js
export const ACTIONS = {
  SET_PHASE, NEXT_STORY_PANEL, PREV_STORY_PANEL,
  STATION_EXPLORE_PROGRESS,     // {station, key}      → increments exploration counter
  STATION_FORMALISE_DONE,       // {station}
  STATION_CHECKPOINT_RESULT,    // {station, correct:0..3}
  START_SESSION,                // {seed}
  START_WORLD,                  // {world}   → builds 10 questions via sessionBuilder
  ANSWER_CORRECT,  ANSWER_INCORRECT,  USE_HINT,  NEXT_QUESTION,
  FINISH_WORLD,                 // computes score, stars, unlock
  UNLOCK_BADGE,  COMPLETE_PHASE,
  TOGGLE_AUDIO,  TOGGLE_REDUCED_MOTION,
  RESTORE_SESSION,  RESET_SESSION,
};
```

### 4.3 Key reducer logic

```js
case ACTIONS.STATION_CHECKPOINT_RESULT: {
  const { station, correct } = action;
  const s = state.stations[station];
  const passed = correct >= 2;                  // ≥ 2 of 3
  return {
    ...state,
    xp: state.xp + (passed ? 20 + (correct === 3 && s.retries === 0 ? 10 : 0) : 0),
    stations: {
      ...state.stations,
      [station]: {
        ...s,
        passed: s.passed || passed,
        retries: passed ? s.retries : s.retries + 1,
        perfect: s.perfect && passed && s.retries === 0,
      },
    },
  };
}

case ACTIONS.ANSWER_CORRECT: {
  const q = state.questions[state.currentQuestion];
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const streak = state.attemptCount === 0 ? state.streak + 1 : 0;
  return {
    ...state,
    xp: state.xp + xpEarned,
    streak,
    maxStreak: Math.max(state.maxStreak, streak),
    worldRunCorrect: state.worldRunCorrect + 1,
    spotErrorCorrect: state.spotErrorCorrect + (q.format === 'spot_error' ? 1 : 0),
    attemptCount: 0, hintsUsed: 0,
  };
}

case ACTIONS.ANSWER_INCORRECT:
  return { ...state, streak: 0, attemptCount: state.attemptCount + 1 };

case ACTIONS.FINISH_WORLD: {
  const w = state.currentWorld;
  const best = Math.max(state.worldScores[w] ?? 0, state.worldRunCorrect);
  const scores = [...state.worldScores]; scores[w] = best;
  return { ...state, worldScores: scores, worldRunCorrect: 0, currentQuestion: 0 };
}
```

### 4.4 Learning-first gate

```js
export const playUnlocked = (s) =>
  Object.values(s.stations).every(st => st.passed);
```

`PlayPhase` and the bottom-bar "Next" arrow both read `playUnlocked`; `SET_PHASE('play')` is rejected by the reducer when the gate is false.

---

## 5. Geometry Engine (`engine/geometry.js`)

All simulations **and** question generators call the same pure functions, so what students see and what the answer key says can never disagree.

```js
// ---------- primitives ----------
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
  return toDeg(Math.acos(Math.max(-1, Math.min(1, dot / mag))));
}

export function anglesOf([A, B, C]) {
  const a = angleAt(B, A, C), b = angleAt(A, B, C);
  return { A: a, B: b, C: 180 - a - b };       // C derived: sum is exactly 180
}

export const sidesOf = ([A, B, C]) => ({ a: dist(B, C), b: dist(A, C), c: dist(A, B) });

// ---------- classification ----------
export const ANGLE_TOL = 0.75;   // degrees: drag-snap band for "right"
export const SIDE_TOL  = 0.02;   // relative tolerance for equal sides (drag mode)

export function classifyByAngles({ A, B, C }, tol = ANGLE_TOL) {
  const max = Math.max(A, B, C);
  if (Math.abs(max - 90) <= tol) return 'right';
  return max > 90 ? 'obtuse' : 'acute';
}

export function classifyBySides({ a, b, c }, relTol = SIDE_TOL) {
  const eq = (x, y) => Math.abs(x - y) <= relTol * Math.max(x, y);
  if (eq(a, b) && eq(b, c)) return 'equilateral';
  if (eq(a, b) || eq(b, c) || eq(a, c)) return 'isosceles';
  return 'scalene';
}

// Exact-number versions for generated questions (integers)
export function classifyBySidesExact(a, b, c) {
  if (a === b && b === c) return 'equilateral';
  return (a === b || b === c || a === c) ? 'isosceles' : 'scalene';
}
export function classifyByAnglesExact(A, B, C) {
  const m = Math.max(A, B, C);
  return m === 90 ? 'right' : m > 90 ? 'obtuse' : 'acute';
}

// ---------- angle sum / exterior ----------
export const thirdAngle = (x, y) => 180 - x - y;
export const exteriorAngle = (remote1, remote2) => remote1 + remote2;

// ---------- inequality ----------
export const canFormTriangle = (a, b, c) => a + b > c && a + c > b && b + c > a;
export const thirdSideRange = (a, b) => ({ min: Math.abs(a - b), max: a + b }); // open interval

export function integerThirdSides(a, b) {
  const { min, max } = thirdSideRange(a, b);
  const out = [];
  for (let s = min + 1; s < max; s++) out.push(s);
  return out;
}

// ---------- Pythagoras ----------
export const hypotenuse = (a, b) => Math.sqrt(a * a + b * b);
export const missingLeg = (c, a) => Math.sqrt(c * c - a * a);

// Converse: compare squares of the two shorter sides to the longest
export function pythagoreanClass(x, y, z, eps = 1e-9) {
  const [p, q, r] = [x, y, z].sort((m, n) => m - n);
  const lhs = p * p + q * q, rhs = r * r;
  if (Math.abs(lhs - rhs) <= eps) return 'right';
  return lhs > rhs ? 'acute' : 'obtuse';
}

// ---------- area / perimeter ----------
export const areaBH = (b, h) => 0.5 * b * h;
export const perimeter = (a, b, c) => a + b + c;
export const isoscelesHeight = (equalSide, base) => Math.sqrt(equalSide ** 2 - (base / 2) ** 2);
```

### 5.1 Congruence engine (`engine/congruence.js`)

Returns the **number of distinct triangles** (0, 1, 2, or `Infinity`) that satisfy a piece of evidence. Powers Station D's construction bench and the Q7 answer key.

```js
// evidence examples:
//  { type:'SSS', a, b, c }
//  { type:'SAS', a, b, includedAngle }
//  { type:'ASA', A, B, includedSide }
//  { type:'AAS', A, B, side }          // side not between A and B
//  { type:'RHS', hyp, leg }
//  { type:'SSA', a, b, angleA }         // a is opposite angleA; b adjacent
//  { type:'AAA', A, B, C }

export function possibleTriangles(e) {
  switch (e.type) {
    case 'SSS': return canFormTriangle(e.a, e.b, e.c) ? 1 : 0;
    case 'SAS': return (e.includedAngle > 0 && e.includedAngle < 180) ? 1 : 0;
    case 'ASA': return (e.A > 0 && e.B > 0 && e.A + e.B < 180) ? 1 : 0;
    case 'AAS': return (e.A > 0 && e.B > 0 && e.A + e.B < 180) ? 1 : 0;
    case 'RHS': return (e.hyp > e.leg) ? 1 : 0;
    case 'AAA': return (e.A + e.B + e.C === 180) ? Infinity : 0;
    case 'SSA': {
      const { a, b, angleA } = e;                 // a opposite angleA
      const h = b * Math.sin(toRad(angleA));
      const EPS = 1e-9;
      if (angleA >= 90) return a > b ? 1 : 0;
      if (a < h - EPS) return 0;                  // too short to reach
      if (Math.abs(a - h) <= EPS) return 1;       // exactly perpendicular
      if (a >= b) return 1;                       // one valid intersection
      return 2;                                   // h < a < b → ambiguous case
    }
    default: throw new Error(`Unknown evidence type ${e.type}`);
  }
}

// Construct the one or two triangles for animation (SSA)
export function buildSSA({ a, b, angleA }) {
  // Place A at origin, ray at angleA, point C on the ray at distance b.
  // B lies on the x-axis at distance x where |CB| = a → x = b·cosA ± √(a² − (b·sinA)²)
  const A = { x: 0, y: 0 };
  const C = { x: b * Math.cos(toRad(angleA)), y: b * Math.sin(toRad(angleA)) };
  const h = b * Math.sin(toRad(angleA));
  if (a < h) return [];
  const d = Math.sqrt(Math.max(0, a * a - h * h));
  const xs = [C.x + d, C.x - d].filter(x => x > 1e-9);       // B must be on the positive ray
  return xs.map(x => ({ A, B: { x, y: 0 }, C }));
}
```

### 5.2 Similarity engine (`engine/similarity.js`)

```js
export const scaleFactor = (corrSmall, corrBig) => corrBig / corrSmall;

export function similarByAA(t1Angles, t2Angles, tol = 0.5) {
  const s1 = [...Object.values(t1Angles)].sort((x, y) => x - y);
  const s2 = [...Object.values(t2Angles)].sort((x, y) => x - y);
  return s1.every((v, i) => Math.abs(v - s2[i]) <= tol);
}

export function similarBySSS(s1, s2, eps = 1e-6) {
  const a = [...s1].sort((x, y) => x - y), b = [...s2].sort((x, y) => x - y);
  const k = b[0] / a[0];
  return a.every((v, i) => Math.abs(b[i] / v - k) <= eps * k);
}

// Indirect measurement: height / shadow is the same for both objects
export const heightFromShadow = (knownHeight, knownShadow, targetShadow) =>
  (knownHeight / knownShadow) * targetShadow;
```

### 5.3 Rounding and numeric answers

- Integer-answer generators **must** produce exact integers (verified by assertion in tests).
- Decimal answers are rounded to **1 d.p.** unless a generator specifies 2 d.p.
- `NumericFormat` accepts answers within `±0.05` (1 d.p.) or `±0.005` (2 d.p.), after normalising `,` → `.`.

---

## 6. Seeded Randomness (`engine/rng.js`)

```js
// mulberry32: tiny, fast, good enough for gameplay
export function makeRng(seed) {
  let t = seed >>> 0;
  const next = () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),          // inclusive
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    shuffle: (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    chance: (p) => next() < p,
  };
}

export const newSessionSeed = () => {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0];
};

// Derive independent sub-seeds so world N retry M is stable but different
export const subSeed = (seed, world, attempt) =>
  (Math.imul(seed ^ 0x9E3779B9, 2654435761) + world * 7919 + attempt * 104729) >>> 0;
```

**Why seeded rather than `Math.random`:** the session can be resumed from just `{seed, worldAttempt[]}`, test failures are reproducible from a seed, and the 1,000-run randomness test (§16) can assert both *difference across seeds* and *sameness for the same seed*.

---

## 7. Question Data Model & Generators

### 7.1 Question schema

```ts
interface Question {
  id: string;                         // `${world}-${index}-${hash}`
  family: 'Q1'|'Q2'|'Q3'|'Q4'|'Q5'|'Q6'|'Q7'|'Q8'|'Q9'|'Q10';
  world: number;                      // 0..9
  difficulty: 1 | 2 | 3;
  format: 'mcq'|'numeric'|'true_false'|'multi_select'|'order_steps'|'spot_error';

  // Text — display and speech are generated from the same template object
  display: string;                    // what the student sees, with ° √ △ ∠ ² symbols
  speech: string;                    // speakify(display) — what Alice reads

  // Diagram spec (consumed by DiagramFor.jsx)
  diagram: {
    kind: 'triangle'|'rods'|'squares'|'pair'|'shadow'|'ladder'|'none';
    props: object;                    // vertices, labels, marks, hidden values…
  };

  // Answer + options
  correct: number | string | (string|number)[];   // numeric, option id(s), or ordered ids
  tolerance?: number;                 // numeric answers
  unit?: string;                      // '°', 'm', 'cm', 'm²'
  options?: { id: string; label: string; speech: string }[];  // mcq / multi / order / true_false
  distractorMeta?: { id: string; misconception: string }[];   // analytics + hints

  // Scaffolding
  hint1: string;                      // conceptual nudge
  hint2: { text: string; sim: 'tearAndAlign'|'tileCount'|'rodsCollapse'|'overlay'|'shadowRatio'|'steps'; params: object };
  worked: { steps: { display: string; speech: string }[]; result: string };

  // Context (word problems)
  character?: string; city?: string; landmark?: string; contextObject?: string;

  // Analytics tags
  tags: { crossesRight?: boolean; algebraic?: boolean; trap?: 'SSA'|'AAA'|'converse-near-miss'|…; };
  paramHash: string;                  // for de-duplication within a session
}
```

### 7.2 Generator contract

```js
// engine/generators/index.js
export const FAMILIES = { Q1: genClassify, Q2: genAngleSum, /* … */ Q10: genMultiStep };

/**
 * @param {ReturnType<typeof makeRng>} rng
 * @param {{ difficulty:1|2|3, world:number, ctx:{ name:string, city:string, landmark:string } }} opts
 * @returns {Question}
 */
export function generate(family, rng, opts) { return FAMILIES[family](rng, opts); }
```

Every generator:
1. Draws parameters **under validity constraints** (§7.4).
2. Computes the answer by calling `engine/geometry.js` — never from a lookup.
3. Builds distractors from `engine/distractors.js` (misconception functions).
4. Returns `display`, `speech = speakify(display)`, hints, worked solution, and a `paramHash`.

### 7.3 Session builder (`engine/sessionBuilder.js`)

```js
import { WORLDS } from '../data/worlds.js';
import { generate } from './generators';
import { makeRng, subSeed } from './rng';

/**
 * Builds the 10 questions of one world, deterministic from (seed, world, attempt).
 * Enforces no duplicate paramHash, difficulty ramp, format mix, ≤2 uses of any name.
 */
export function buildWorld(seed, worldIdx, attempt = 0) {
  const world = WORLDS[worldIdx];
  const rng = makeRng(subSeed(seed, worldIdx, attempt));
  const seenHash = new Set();
  const nameUse = new Map();
  const out = [];

  for (const slot of world.blueprint) {              // 10 slots: { family, difficulty, format? }
    let q, tries = 0;
    do {
      const ctx = pickContext(rng, world, nameUse);
      q = generate(slot.family, rng, { difficulty: slot.difficulty, world: worldIdx, ctx, format: slot.format });
      tries++;
    } while (seenHash.has(q.paramHash) && tries < 25);
    if (seenHash.has(q.paramHash)) throw new Error('Could not de-duplicate question');
    seenHash.add(q.paramHash);
    nameUse.set(q.character, (nameUse.get(q.character) ?? 0) + 1);
    out.push(q);
  }
  return rng.shuffle(out);                           // shuffle order within the world
}
```

`worlds.js` blueprint example (World 2, Paris — Angle sum):

```js
{
  id: 1, city: 'Paris', landmark: 'Eiffel Tower', focus: 'Q2',
  blueprint: [
    { family:'Q2', difficulty:1 }, { family:'Q2', difficulty:1 }, { family:'Q2', difficulty:2 },
    { family:'Q2', difficulty:2 }, { family:'Q2', difficulty:2, format:'numeric' },
    { family:'Q2', difficulty:3 }, { family:'Q2', difficulty:2, format:'spot_error' },
    { family:'Q2', difficulty:3, format:'order_steps' },
    { family:'Q1', difficulty:2 },                               // review
    { family:'Q1', difficulty:1 },                               // review
  ],
}
```

> Blueprints for all 10 worlds follow the table in the PRD §8.3 (difficulty ramp E/M/H and ≥1 reasoning question per world; World 10 ≥3).

### 7.4 Generator constraints & reference implementations

#### Q2 — Angle sum (incl. algebraic)

```js
// engine/generators/q2_angleSum.js
import { thirdAngle } from '../geometry';
import { speakify } from '../speakify';
import { numericDistractors } from '../distractors';

export function genAngleSum(rng, { difficulty, world, ctx, format }) {
  if (difficulty === 1) {
    const A = rng.int(6, 16) * 5;                      // multiples of 5
    const B = rng.int(6, 16) * 5;
    if (A + B >= 170) return genAngleSum(rng, { difficulty, world, ctx, format });  // retry (rare)
    const C = thirdAngle(A, B);
    const display = `${ctx.name} is in ${ctx.city}, studying a truss on the ${ctx.landmark}. `
      + `Two angles of the triangle are ${A}° and ${B}°. What is the third angle?`;
    return finish({ family:'Q2', difficulty, world, ctx, display, correct:C, unit:'°',
      diagram:{ kind:'triangle', props:{ angles:{A,B,C:null}, label:'?' } },
      distractors: numericDistractors(C, [180 - A, 360 - A - B, 90 - A - B < 1 ? A + B : 90 - A - B]) ,
      hint1:'The three angles of a triangle always add up to 180°.',
      hint2:{ text:'Watch the three corners line up on a straight line.', sim:'tearAndAlign', params:{A,B,C} },
      worked:{ steps:[
        { display:`${A}° + ${B}° = ${A+B}°`, speech:'' },
        { display:`180° − ${A+B}° = ${C}°`, speech:'' } ], result:`${C}°` },
      paramHash:`Q2-1-${A}-${B}` });
  }
  // difficulty 2/3 → algebraic: pick x first, then fit the coefficients
  for (let i = 0; i < 80; i++) {
    const x = rng.int(10, 40);
    const ks = rng.pick([[1,2,3],[1,1,2],[2,3,4],[1,2,2],[1,3,2]]);   // coefficient sets
    const s = ks.reduce((p, k) => p + k, 0);
    const constTotal = 180 - s * x;                                   // sum of constants needed
    const c1 = rng.int(-30, 30), c2 = rng.int(-30, 30), c3 = constTotal - c1 - c2;
    const cs = [c1, c2, c3];
    const vals = ks.map((k, j) => k * x + cs[j]);
    if (vals.some(v => v < 15) || cs.some(c => Math.abs(c) > 60)) continue;
    const exprs = ks.map((k, j) => `${k === 1 ? '' : k}x${cs[j] === 0 ? '' : cs[j] > 0 ? ` + ${cs[j]}` : ` − ${-cs[j]}`}`);
    const target = rng.pick(['largest', 'smallest']);
    const ans = target === 'largest' ? Math.max(...vals) : Math.min(...vals);
    const display = `A triangle in ${ctx.name}'s ${ctx.landmark} design has angles (${exprs.join(')°, (')})°. `
      + `Find the ${target} angle.`;
    return finish({ family:'Q2', difficulty, world, ctx, display, correct:ans, unit:'°',
      diagram:{ kind:'triangle', props:{ angles:{ A:exprs[0], B:exprs[1], C:exprs[2] } } },
      distractors: numericDistractors(ans, [x, 180 - ans, Math.round(360 / s)]),
      hint1:'Add all three expressions and set the total equal to 180.',
      hint2:{ text:'Combine the x terms, then the numbers.', sim:'steps', params:{ ks, cs } },
      worked:{ steps:[
        { display:`${exprs.join(' + ')} = 180`, speech:'' },
        { display:`${s}x ${constTotal >= 0 ? '+' : '−'} ${Math.abs(constTotal)} = 180  →  x = ${x}`, speech:'' },
        { display:`Angles: ${vals.join('°, ')}°`, speech:'' } ], result:`${ans}°` },
      tags:{ algebraic:true }, paramHash:`Q2-A-${ks.join('')}-${cs.join(',')}-${target}` });
  }
  throw new Error('genAngleSum: no valid draw');
}
```

#### Q5 — Pythagoras (triples + non-triples)

```js
// engine/generators/q5_pythagoras.js
import { TRIPLES } from '../../data/tripleTable';        // [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]
import { hypotenuse, missingLeg, round } from '../geometry';

export function genPythagoras(rng, { difficulty, world, ctx }) {
  if (difficulty <= 2) {
    const [a0, b0, c0] = rng.pick(difficulty === 1 ? TRIPLES.slice(0, 3) : TRIPLES);
    const k = difficulty === 1 ? rng.int(1, 3) : rng.int(1, 5);
    const [a, b, c] = [a0 * k, b0 * k, c0 * k];
    const find = rng.pick(['hyp', 'leg']);
    const obj = rng.pick(['ladder', 'cable', 'ramp']);
    const display = find === 'hyp'
      ? `${ctx.name}'s ${obj} setup in ${ctx.city} makes a right-angled triangle with legs ${a} m and ${b} m. How long is the hypotenuse?`
      : `A ${c} m ${obj} in ${ctx.city} reaches ${b} m up a vertical wall. How far is its foot from the wall?`;
    const ans = find === 'hyp' ? c : a;
    return finish({ /* … see Q2 pattern … */ correct: ans, unit:'m',
      distractors: find === 'hyp'
        ? [a + b, a * a + b * b, Math.abs(a - b)]                 // a+b, forgot √, subtracted
        : [c + b, c * c - b * b, c - b],                          // added, forgot √, subtracted
      paramHash:`Q5-${difficulty}-${a}-${b}-${find}` });
  }
  // Hard: non-triple, 1 d.p. answer
  let a, b;
  do { a = rng.int(4, 20); b = rng.int(4, 20); } while (Number.isInteger(hypotenuse(a, b)));
  const ans = round(hypotenuse(a, b), 1);
  return finish({ correct: ans, tolerance: 0.05, unit:'m',
    distractors: [a + b, a * a + b * b, round(Math.abs(a - b), 1)],
    paramHash:`Q5-3-${a}-${b}` });
}
```

#### Q8 — Similarity (shadows / scale)

```js
// engine/generators/q8_similarity.js
export function genSimilarity(rng, { difficulty, world, ctx }) {
  const k = difficulty === 1 ? rng.pick([2, 3, 4]) : rng.pick([1.5, 2.5, 2 / 3, 3 / 2, 4]);
  const base = rng.pick([[3,4,5],[6,8,10],[5,12,13],[4,6,8],[6,9,12]]);
  const small = base;
  const big = small.map(v => +(v * k).toFixed(2));
  // Ask for the side corresponding to `small[idx]`
  const idx = rng.int(0, 2);
  // Ensure the big side is "nice" (≤ 1 d.p.)
  if (Math.abs(big[idx] * 10 - Math.round(big[idx] * 10)) > 1e-9) return genSimilarity(rng, { difficulty, world, ctx });
  const asked = big[idx];
  /* distractors: additive-scale (small[idx] + (big[0] − small[0])), inverted ratio, area-ratio misuse (k²·small[idx]) */
  /* … build via finish({...}) … */
}
```

#### Remaining families (specification)

| Family | Draw order (constraints first) | Answer function | Key distractors |
| ------ | ------------------------------ | --------------- | --------------- |
| **Q1 Classify** | Choose side-type & angle-type; realise with valid sides/angles; present *either* sides *or* angles *or* both; ask for best description | `classifyBySidesExact` / `classifyByAnglesExact` | Right ↔ acute confusion; "equilateral" for isosceles; ignoring angle info |
| **Q3 Exterior** | Draw two remote angles (sum < 180); ask exterior, or ask a remote angle given exterior; algebraic on M/H (build from solved `x` as in Q2) | `exteriorAngle`, `ext − remote` | `180 − remote`; adjacent interior; `ext + remote` |
| **Q4 Inequality** | Draw `a`,`b`; pick candidate third sides across: inside, equal to `a+b`, equal to `|a−b|`, outside. Formats: single "can it form?", multi-select sets, range MCQ, isosceles-possible-third-side | `canFormTriangle`, `thirdSideRange`, `integerThirdSides` | Using `≥`; inclusive range; swap min/max |
| **Q6 Converse** | 50%: valid triple × k; 25% near-miss (`+1` to one side); 25% obtuse/acute non-right. Decide right / acute / obtuse; hard: "which side is the hypotenuse?" first | `pythagoreanClass` | Using given order (not sorted); `a+b` vs `c`; misidentified hypotenuse |
| **Q7 Congruence** | Choose a rule R (SSS, SAS, ASA, AAS, RHS) or trap (SSA ambiguous, AAA); render two triangles with tick/arc marks consistent with R; ask which rule or "not enough information" | `possibleTriangles` + rule label | Rule swaps (SAS vs SSA; ASA vs AAS); AAA treated as congruent |
| **Q9 Area/perimeter** | E: given `b`,`h`; M: right triangle (find missing leg first); H: isosceles with sides `(s,s,b)` and height by Pythagoras (choose triples so height is an integer when possible) | `areaBH`, `isoscelesHeight`, `perimeter` | Forgot ½; used slant side as height; perimeter instead of area |
| **Q10 Multi-step** | Compose two engines: e.g. *Pythagoras → similarity* (ramp scale-up), *angle sum → exterior*, *inequality → perimeter bound*, *area → scale² (extension)*; includes `order_steps` & `spot_error` variants | Composition of the above; intermediate values exposed as worked steps | Skipping the intermediate step; wrong scale (k vs k²) |

> **Spot-the-Error builder:** take a correct worked solution (`worked.steps`), pick one step *s*, and apply a **mutator** from a family-specific list (e.g. Pythagoras: "drop the root", "add instead of square"; angle-sum: "use 360", "sign error"; similarity: "invert ratio"). The student must tap the broken line and choose the correction.

### 7.5 `finish()` helper

```js
function finish(q) {
  const options = q.format === 'numeric' ? undefined : buildOptions(q);
  return {
    ...q,
    format: q.format ?? (options ? 'mcq' : 'numeric'),
    speech: speakify(q.display),
    options,
    worked: { ...q.worked, steps: q.worked.steps.map(s => ({ ...s, speech: speakify(s.display) })) },
    id: `${q.world}-${q.family}-${q.paramHash}`,
  };
}
```

### 7.6 Distractor rules (`engine/distractors.js`)

- Always **3 distractors**, all distinct from the correct answer **and from each other**
- Each distractor carries a `misconception` tag (used for the Hint 1 text and anonymous analytics)
- Numeric distractors are filtered to the plausible range (e.g. angle ∈ (0°, 180°); length > 0)
- If fewer than 3 valid misconception distractors exist, fill with `±1`, `±5`, `±10` perturbations
- Correct option position is shuffled using the same seeded `rng`

---

## 8. Simulation Technical Specs

### 8.1 `StationShell.jsx` — Explore → Formalise → Checkpoint

```jsx
// Pseudo-structure
const BEATS = ['explore', 'formalise', 'checkpoint'];

function StationShell({ id, Explore, ruleCards, targets, requiredInteractions }) {
  const { state, dispatch } = useGame();
  const [beat, setBeat] = useState('explore');
  const s = state.stations[id];

  // Explore → Formalise when all required interaction keys have fired
  useEffect(() => {
    if (beat === 'explore' && meetsRequirements(s.explore, requiredInteractions)) setBeat('formalise');
  }, [s.explore]);

  return (
    <>
      {beat === 'explore'    && <Explore onInteract={(key) => dispatch({ type:'STATION_EXPLORE_PROGRESS', station:id, key })} />}
      {beat === 'formalise'  && <RuleCardFlow cards={ruleCards} builderTargets={targets}
                                  onDone={() => { dispatch({ type:'STATION_FORMALISE_DONE', station:id }); setBeat('checkpoint'); }} />}
      {beat === 'checkpoint' && <CheckpointRunner station={id}
                                  onResult={(correct) => dispatch({ type:'STATION_CHECKPOINT_RESULT', station:id, correct })} />}
    </>
  );
}
```

`requiredInteractions` per station:

| Station | Required to leave Explore |
| ------- | ------------------------- |
| A | `drag` ×5 on ≥3 distinct triangles shapes (acute, right, obtuse seen) · `tear` ×1 · `exterior` ×1 |
| B | `close` seen · `collapse` seen · `boundary` found (within ±0.5) · `perimeterChallenge` ≥2 triples |
| C | `drag` ×4 · `tilesSum` seen · `dissection` played · `converse` ×2 |
| D | `build` for each of {SSS, SAS, ASA, AAS, RHS} · `ssa` (must see 2-triangle case) · `aaa` seen |
| E | `moveSun` ×2 · `scale` ×3 · `aaMatch` ×1 |

`Explore` can always be re-entered from the station hub (no penalty).

### 8.2 `useDrag` — pointer + keyboard dragging

```js
export function useDrag({ svgRef, onMove, snap = 0.5, bounds }) {
  const active = useRef(null);

  const toSvg = (e) => {
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    return pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
  };

  const handlers = (id) => ({
    onPointerDown: (e) => { active.current = id; e.currentTarget.setPointerCapture(e.pointerId); },
    onPointerMove: (e) => {
      if (active.current !== id) return;
      const p = toSvg(e);
      onMove(id, clampTo(bounds, snapTo(p, snap)));
    },
    onPointerUp:   (e) => { active.current = null; e.currentTarget.releasePointerCapture(e.pointerId); },
    onKeyDown: (e) => {                                     // keyboard parity
      const step = e.shiftKey ? 5 : 1;
      const d = { ArrowLeft:[-step,0], ArrowRight:[step,0], ArrowUp:[0,-step], ArrowDown:[0,step] }[e.key];
      if (d) { e.preventDefault(); onMove(id, nudge(id, d)); }
    },
    tabIndex: 0, role: 'slider', 'aria-label': `Vertex ${id}`,
  });
  return handlers;
}
```

Rules:
- **Minimum triangle area guard:** reject moves that make the triangle degenerate (area < ε) except in Station B where flat is *intentionally* shown as a boundary state.
- **Vertex hit-area:** 44×44 px (transparent circle larger than the visible 14 px dot).
- **Tap-tap fallback:** tap a vertex to select, tap a grid cell to move it.

### 8.3 Station A — Angle Lab

- **State:** `vertices: [A,B,C]`, `mode: 'drag'|'tear'|'exterior'|'parallel'`
- **Live readouts:** `anglesOf(vertices)`; sum displayed as `A + B + C = 180°` (shown rounded to 1 d.p.; sum is exact because C is derived)
- **Tear & Align:** three `<path>` wedges clipped around each vertex; animation: translate/rotate each wedge so the three apexes coincide on a baseline point, ending with a 180° straight-angle outline. Duration 1.6 s (instant when `reducedMotion`).
- **Parallel reveal:** draws a line through `B` parallel to `AC`; alternate-interior angles drawn in the same colour as `A` and `C` at `B`.
- **Exterior mode:** extend side `AB` beyond `B` by a fixed length; exterior angle `= 180 − ∠B`; assert `≈ A + C` and animate a "balance" bar.
- **Classification chips:** `classifyByAngles` and `classifyBySides` with tolerance; chip text swaps with a short fade.

### 8.4 Station B — Bridge Builder

- **State:** `lengths: {a, b, c}` (0.5 step, 1–20)
- **Layout:** baseline segment of length `c`; rod `a` pivots at the left end, rod `b` at the right end. Closed triangle exists iff `canFormTriangle`.
- **Intersection:** apex found by circle–circle intersection:

```js
export function apexFrom(c, a, b) {
  const x = (c * c + a * a - b * b) / (2 * c);       // along baseline
  const y2 = a * a - x * x;
  return y2 > 0 ? { x, y: Math.sqrt(y2) } : null;     // null → collapse or flat
}
```

- **Collapse animation:** if `null`, rods rotate to lie flat on the baseline with a visible gap (or overlap when one is too long), plus a red `a + b ≤ c` chip.
- **Boundary helper:** a "Show limits" toggle highlights `[|a−b|, a+b]` on the `c` slider track.
- **Perimeter challenge:** enumerates unordered integer triples with `a ≤ b ≤ c`, `a+b+c = P`, `a+b > c`; tracks which the student has found; shows `found / total`.

### 8.5 Station C — Pythagoras Garden

- **State:** `a, b` integers 1–15; `c = hypotenuse(a, b)`
- **Squares:** drawn on each side by rotating the unit square about its side; tile grid drawn only when side length ≤ 15 (performance).
- **Perfect fit ring:** shows when `c` is an integer.
- **Dissection (Bhaskara-style):** precomputed polygons for the "four triangles + inner square" arrangement; scrubber `t ∈ [0,1]` interpolates positions with `ease-in-out`. Both arrangements keep area `(a + b)²` constant — shown as a green "area unchanged" tag.
- **Test mode:** random side set from `generators/q6_converse`; student places the three sides; corner probe shows the angle opposite the longest side via `classify` and compares `p² + q²` with `r²` numerically.
- **Ladder scene:** foot position slider `d`; top height `h = missingLeg(L, d)`; clamps `d ∈ (0, L)`.

### 8.6 Station D — Congruence Detective

- **State:** `evidence: Card[]` (max 3), `triangle?: Triangle[]`
- **Evidence → build:** map the 3 selected cards to an evidence type via `classifyEvidence(cards)` (e.g. two sides + the angle between → `SAS`).

```js
function classifyEvidence(cards) {
  const sides = cards.filter(c => c.kind === 'side');
  const angles = cards.filter(c => c.kind === 'angle');
  const right = angles.some(a => a.value === 90);
  if (sides.length === 3) return 'SSS';
  if (angles.length === 3) return 'AAA';
  if (sides.length === 2 && angles.length === 1) {
    return angles[0].between === sides.map(s => s.id).sort().join('') ? 'SAS' : (right ? 'RHS?' : 'SSA');
  }
  if (angles.length === 2 && sides.length === 1) {
    return sides[0].between === angles.map(a => a.id).sort().join('') ? 'ASA' : 'AAS';
  }
  return 'unknown';
}
```

- **Construction animation:** steps drawn with `requestAnimationFrame` — base segment, arc 1, arc 2 (or angle ray), intersection(s). For SSA the animation sweeps the arc and **pauses at both intersection points**, drawing two triangles in two colours.
- **Overlay test:** two triangle `<g>` elements with pointer-drag + rotate handle + flip button; "match" when the sum of vertex distances (after best-fit pairing) < 3 px.
- **Statuses shown:** `0 triangles`, `1 triangle (unique)`, `2 triangles (ambiguous)`, `∞ triangles (not enough)`.

### 8.7 Station E — Shadow Surveyor

- **State:** `sunAngle ∈ [20°, 70°]`; `personH`, `towerH` from the checkpoint generator (hidden in Explore)
- **Shadow length:** `L = height / tan(sunAngle)` — rendered via `tan` for the visual only; **all student-facing numbers are rounded** and the ratio shown is `height : shadow` (the same for both).
- **Proportion builder:** draggable fraction tiles `[person ÷ shadow] = [tower ÷ shadow]` with a "missing" slot; correctness uses `heightFromShadow`.
- **Scale mode:** `k` slider; `SimilarPair` draws triangle 2 as triangle 1 scaled by `k` about its left vertex; angle arcs stay equal; area bar scales by `k²` (extension toggle).
- **AA discovery:** student drags two angle tokens onto triangle 2; the third auto-fills (angle sum); `similarByAA` → snap & ring.

### 8.8 Checkpoint builder (`engine/checkpointBuilder.js`)

Each station defines three round templates mapped to question families and formats. `buildCheckpoint(station, rng)` returns 3 randomised questions using the same generators as Play (difficulty 1–2), plus an *interactive* variant flag so the answer can also be given on the station's canvas (e.g. Station B: set sliders to prove).

```js
const CHECKPOINT_PLAN = {
  A: [{ family:'Q2', d:1 }, { family:'Q2', d:2 }, { family:'Q3', d:1 }],
  B: [{ family:'Q4', d:1, format:'true_false' }, { family:'Q4', d:2 }, { family:'Q4', d:2, format:'numeric' }],
  C: [{ family:'Q5', d:1 }, { family:'Q5', d:2 }, { family:'Q6', d:1 }],
  D: [{ family:'Q7', d:1 }, { family:'Q7', d:2, trap:true }, { family:'Q7', d:2, matching:true }],
  E: [{ family:'Q8', d:1 }, { family:'Q8', d:2, ctx:'shadow' }, { family:'Q8', d:2, format:'true_false' }],
};
```

If a student fails a checkpoint, a **fresh** set is generated on retry (new sub-seed derived from `retries`).

---

## 9. Audio Pipeline (ElevenLabs — Matching `audio_generation_pipeline.md`)

### 9.1 Voice configuration

- **Voice:** Alice — `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Offline script key:** `VITE_ELEVENLABS_API_KEY` in `.env.local` (read by Node only; **never imported from `src/`**)
- **Runtime proxy key:** `ELEVENLABS_API_KEY` (Vercel env var, no `VITE_` prefix → not exposed to the browser)

### 9.2 Speech style settings

```js
export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};
```

### 9.3 Content policy

Only **paragraph text and questions** are narrated. **Never** narrate titles, headings, world names, station names, button labels. `narration.js` must not contain any string that appears as a heading in the UI (enforced by the parity script, §9.9).

### 9.4 Segment helpers and narration scripts

```js
// utils/audio.js (helpers)
export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'encouragement' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'instruction' });
```

```js
// utils/narration.js — phase-specific functions (static, pre-generated)
export const introNarration = () => [ say("Hello, Architect! Ready to master triangles?") ];

export const wonderNarration = () => [
  think("Sarah is standing in Paris, looking up at the Eiffel Tower."),
  think("Hundreds of iron beams make triangles, and almost none make squares. Why would engineers choose triangles? Try pushing the frames and see what happens."),
];

export const getStoryNarration = (panel) => STORY[panel].segments;      // from storyContent.js

export const stationIntro = {
  A: () => [ instruct("Drag any corner of the triangle. Watch the three angles and their total. What do you notice?") ],
  B: () => [ instruct("Slide the three rods to change their lengths. When do the ends meet, and when do they not?") ],
  C: () => [ instruct("Drag the legs of the right triangle. Watch the squares on each side fill with tiles.") ],
  D: () => [ instruct("Pick three pieces of evidence, then build. How many triangles are possible?") ],
  E: () => [ instruct("Move the sun and watch the shadows change. What stays the same?") ],
};

export const ruleCardNarration = {
  angleSum:     () => [ emphasize("The three angles of any triangle add up to one hundred eighty degrees. Three corners always fit together on a straight line.") ],
  exterior:     () => [ emphasize("An exterior angle equals the sum of the two inside angles that are not next to it.") ],
  inequality:   () => [ emphasize("Any two sides of a triangle must add up to more than the third side.") ],
  pythagoras:   () => [ emphasize("In a right triangle, the square on the longest side has the same area as the two other squares put together.") ],
  converse:     () => [ emphasize("If the squares of the two shorter sides add up to the square of the longest side, the triangle has a right angle.") ],
  congruence:   () => [ emphasize("Triangles are congruent when the facts you know pin down one single shape and size.") ],
  similarity:   () => [ emphasize("Similar triangles have the same shape. Their matching angles are equal and their matching sides share one scale factor.") ],
};

export const feedback = {
  correct:   () => [ celebrate("Amazing! You solved it like a true architect!") ],
  hint1:     () => [ cheer("Not quite. Let's look at the diagram again.") ],
  hint2:     () => [ think("Watch what happens. Can you spot the pattern with me?") ],
  reveal:    () => [ cheer("That one was tricky. Let's walk through it step by step.") ],
  stationOk: () => [ celebrate("Station complete! Your skills are growing.") ],
  worldOk:   () => [ celebrate("World complete! The next landmark is waiting.") ],
};

export const reflectNarration = () => [
  think("What an adventure! Pick one triangle rule and tell me why it works, in your own words."),
  celebrate("Lesson complete! You are a Global Architect!"),
];
```

> Dynamic **question** narration is built at runtime: `ask(question.speech)`, then hints/worked-steps as `cheer/think/say` from `question.hint1`, `question.hint2.text`, `question.worked.steps[].speech`.

### 9.5 Offline pre-generation (`scripts/generate_audio.js`)

```js
// scripts/generate_audio.js  (Node 18+, ESM)
import fs from 'node:fs/promises';
import path from 'node:path';
import 'dotenv/config';                                  // loads .env.local when configured
import { phrases } from './phrases.js';                  // built from narration.js + storyContent.js
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';

const API_KEY  = process.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const OUT_DIR  = 'public/assets/audio';
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 48);

const map = {};
await fs.mkdir(OUT_DIR, { recursive: true });

for (const [i, { text, style }] of phrases.entries()) {
  const file = `audio_${slug(text)}_${i}.mp3`;
  const target = path.join(OUT_DIR, file);
  try { await fs.access(target); map[text] = `/assets/audio/${file}`; continue; } catch {}

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text, model_id: 'eleven_multilingual_v2',
      voice_settings: STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement,
    }),
  });
  if (!res.ok) { console.error(`✗ ${res.status} for: ${text.slice(0, 60)}`); continue; }
  await fs.writeFile(target, Buffer.from(await res.arrayBuffer()));
  map[text] = `/assets/audio/${file}`;
  console.log(`✓ ${file}`);
  await new Promise(r => setTimeout(r, 500));            // rate-limit: 500 ms between calls
}

await fs.writeFile(
  'src/utils/audioMap.js',
  `// AUTO-GENERATED by scripts/generate_audio.js — do not edit\nexport const audioMap = ${JSON.stringify(map, null, 2)};\n`,
);
```

### 9.6 Dynamic audio for generated questions

Because random questions can't be pre-generated, runtime audio uses a **three-level cache** and **eager preload**:

```js
// utils/audio.js
import { audioMap } from './audioMap';
import { STYLE_SETTINGS } from './styleSettings';

const memCache = new Map();                              // `${style}::${text}` → objectURL
let currentQueue = null;                                 // Symbol; guards against overlap
let currentAudio = null;

const key = (t, s) => `${s}::${t}`;

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) return audioMap[text];             // 1. static asset (zero latency)
  const k = key(text, style);
  if (memCache.has(k)) return memCache.get(k);           // 2. memory
  const stored = await idbGet(k);                        // 3. IndexedDB
  if (stored) { const u = URL.createObjectURL(stored); memCache.set(k, u); return u; }

  try {                                                   // 4. network via proxy
    const res = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, style }),
    });
    if (!res.ok) return null;                             // silent skip, never block UX
    const blob = await res.blob();
    idbSet(k, blob).catch(() => {});
    const u = URL.createObjectURL(blob);
    memCache.set(k, u);
    return u;
  } catch { return null; }
}

export async function narrate(segments, { onSegmentStart } = {}) {
  stopNarration();
  const queue = Symbol('narration');
  currentQueue = queue;

  for (let i = 0; i < segments.length; i++) {
    if (currentQueue !== queue) return;                   // superseded or stopped
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style);
    if (currentQueue !== queue) return;
    if (i + 1 < segments.length) getAudioUrl(segments[i + 1].text, segments[i + 1].style); // preload i+1
    if (!url) continue;
    onSegmentStart?.(i);
    await play(url, queue);
  }
}

export function stopNarration() {
  currentQueue = null;
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
}

const play = (url, queue) => new Promise((resolve) => {
  const a = new Audio(url);
  currentAudio = a;
  a.onended = a.onerror = () => resolve();
  a.play().catch(resolve);
  const t = setInterval(() => { if (currentQueue !== queue) { a.pause(); clearInterval(t); resolve(); } }, 100);
  a.addEventListener('ended', () => clearInterval(t));
});

// Question-level preload: while the student answers Q(n), warm Q(n+1)
export function preloadQuestion(q) {
  getAudioUrl(q.speech, 'question');
  getAudioUrl(q.hint1, 'encouragement');
}
```

**Preload policy:** when a world starts, preload questions **1 and 2**; on each `NEXT_QUESTION`, preload `n + 2`. Hints/worked steps are fetched lazily when first requested (they are rarely used).

**Optional seeded pool (`scripts/warm_audio_pool.js`):** for classroom pilots on weak networks, pre-generate the question audio for *N* known seeds (e.g. 20 sessions × 100 questions) into `public/assets/audio/pool/`; the engine then uses `audioMap` hits for those seeds. Disabled by default.

### 9.7 Vercel function (`api/elevenlabs.js`)

```js
// api/elevenlabs.js — keeps the ElevenLabs key off the client
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MAX_LEN = 500;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text, style = 'statement' } = req.body ?? {};
  if (typeof text !== 'string' || text.length === 0 || text.length > MAX_LEN)
    return res.status(400).json({ error: 'Invalid text' });
  if (!STYLE_SETTINGS[style]) return res.status(400).json({ error: 'Invalid style' });

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: STYLE_SETTINGS[style] }),
  });
  if (!r.ok) return res.status(502).json({ error: 'TTS upstream failed' });

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await r.arrayBuffer()));
}
```

Hardening (v1.0): length cap and style whitelist (above); per-IP rate limit (e.g. Vercel KV / Upstash); CORS locked to the Intellia origin(s). The audio engine **fails silently** — if the proxy is unavailable the lesson still works, because every narrated line is also visible on screen.

### 9.8 `speakify()` — math to spoken text

```js
// engine/speakify.js
const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

export function numToWords(n) {
  if (n < 0) return `minus ${numToWords(-n)}`;
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '');
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ' ' + numToWords(n % 100) : ''}`;
  return String(n);
}

const decimalToWords = (s) => {
  const [i, f] = s.split('.');
  return `${numToWords(+i)} point ${[...f].map(d => ONES[+d]).join(' ')}`;
};

export function speakify(text) {
  return text
    .replace(/△([A-Z]{3})/g, (_, v) => `triangle ${[...v].join(' ')}`)
    .replace(/∠([A-Z]{3})/g, (_, v) => `angle ${[...v].join(' ')}`)
    .replace(/≅/g, ' is congruent to ')
    .replace(/∼|~/g, ' is similar to ')
    .replace(/√\(?(\d+(?:\.\d+)?)\)?/g, (_, n) => `the square root of ${n.includes('.') ? decimalToWords(n) : numToWords(+n)}`)
    .replace(/([a-z])²/g, '$1 squared').replace(/(\d+)²/g, (_, n) => `${numToWords(+n)} squared`)
    .replace(/(\d+(?:\.\d+)?)\s?°/g, (_, n) => `${n.includes('.') ? decimalToWords(n) : numToWords(+n)} degrees`)
    .replace(/(\d+(?:\.\d+)?)\s?cm/g, (_, n) => `${n.includes('.') ? decimalToWords(n) : numToWords(+n)} centimeters`)
    .replace(/(\d+(?:\.\d+)?)\s?m\b/g, (_, n) => `${n.includes('.') ? decimalToWords(n) : numToWords(+n)} meters`)
    .replace(/\s?\+\s?/g, ' plus ').replace(/\s?[−–]\s?/g, ' minus ')
    .replace(/\s?=\s?/g, ' equals ').replace(/\s?×\s?/g, ' times ').replace(/\s?÷\s?/g, ' divided by ')
    .replace(/(\d+(?:\.\d+)?)/g, (_, n) => n.includes('.') ? decimalToWords(n) : numToWords(+n))
    .replace(/\s{2,}/g, ' ').trim();
}
```

> Implementation note: the order of the replacements matters (units and symbols before bare numbers). `tests/speakify.test.js` carries a fixture table of ≥ 60 display → speech pairs, including all rows in PRD §10.5.

### 9.9 Parity and cleanup scripts

- **`scripts/clean_audio.js`** — imports `audioMap.js`, scans `public/assets/audio/`, deletes any `.mp3` not referenced.
- **`scripts/check_audio_parity.js`** (CI) —
  1. Every string returned by `narration.js` and `storyContent.js` exists in `phrases[]`; every `phrases[]` entry is used.
  2. No narrated string equals any UI heading (list exported from `data/headings.js`).
  3. For **1,000 generated questions**, `speakify(display) === speech`.
  4. Fails the build on any mismatch.

### 9.10 Workflow (updating or adding static narration)

1. Add the exact text + style to `scripts/phrases.js` (paragraph/question text only — never titles).
2. `node scripts/generate_audio.js` → saves `.mp3`, updates `src/utils/audioMap.js`.
3. Optional: `node scripts/clean_audio.js`.
4. Add the same string to `narration.js` / `storyContent.js` using the matching helper.
5. Wire the component:

```jsx
useEffect(() => {
  if (state.audioEnabled) narrate(wonderNarration());
  return () => stopNarration();
}, [state.audioEnabled]);
```

---

## 10. Gamification Implementation

### 10.1 XP, stars, unlock gate (`utils/scoring.js`)

```js
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : (attemptNumber === 2 && hintsUsed === 0) ? 7 : 5;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}

export const calcStars = (correct) => (correct >= 10 ? 3 : correct >= 8 ? 2 : correct >= 6 ? 1 : 0);
export const canUnlockNext = (correct) => correct >= 6;           // PRD: 6/10
export const totalStars = (scores) => scores.reduce((s, c) => s + (c == null ? 0 : calcStars(c)), 0);

export const LEVELS = [
  { title: 'Apprentice', xp: 0 }, { title: 'Surveyor', xp: 200 }, { title: 'Engineer', xp: 500 },
  { title: 'Architect', xp: 900 }, { title: 'Master Architect', xp: 1400 },
];
export const levelFor = (xp) => [...LEVELS].reverse().find(l => xp >= l.xp);
```

### 10.2 Badge engine (`utils/badgeEngine.js`)

```js
export const BADGES = [
  { id:'triangle_tamer',   label:'🔺 Triangle Tamer',   test:(s)=> s.phaseComplete.wonder && s.phaseComplete.story },
  { id:'angle_architect',  label:'📐 Angle Architect',  test:(s)=> s.stations.A.passed },
  { id:'bridge_builder',   label:'🌉 Bridge Builder',   test:(s)=> s.stations.B.passed && s.stations.B.perfect },
  { id:'pythagoras_pro',   label:'🌱 Pythagoras Pro',   test:(s)=> s.stations.C.passed },
  { id:'congruence_detective', label:'🕵️ Congruence Detective', test:(s)=> s.stations.D.passed && s.stations.D.ssaCaseSeen },
  { id:'shadow_surveyor',  label:'🌞 Shadow Surveyor',  test:(s)=> s.stations.E.passed },
  { id:'master_builder',   label:'🥇 Master Builder',   test:(s)=> totalCorrect(s) >= 80 },
  { id:'perfect_blueprint',label:'💎 Perfect Blueprint',test:(s)=> s.worldScores.some(w => w === 10) },
  { id:'streak_star',      label:'🔥 Streak Star',      test:(s)=> s.maxStreak >= 10 },
  { id:'sharp_eye',        label:'🎯 Sharp Eye',        test:(s)=> s.spotErrorCorrect >= 5 },
  { id:'global_architect', label:'🌍 Global Architect', test:(s)=> Object.values(s.phaseComplete).every(Boolean) },
];

const totalCorrect = (s) => s.worldScores.reduce((t, w) => t + (w ?? 0), 0);

export const checkBadges = (s) => BADGES.filter(b => !s.badges.includes(b.id) && b.test(s)).map(b => b.id);
```

Called from a `useEffect` in `GameProvider` after any state change that may unlock a badge; each new badge triggers a toast (`BadgePanel`) and `narrate([celebrate(...)])`.

**Note on "Master Builder" (≥ 80 % across Play):** because it requires all ten worlds, it only unlocks at the end; a *progress ring* in `BadgePanel` shows partial progress.

### 10.3 Hint ladder

| Attempt result | UI | Audio |
| -------------- | -- | ----- |
| 1st wrong | `HintOverlay` shows `hint1`; diagram highlights the relevant part (via `diagram.props.highlight`) | `feedback.hint1()` + `ask(hint1)` |
| 2nd wrong | `hint2.sim` mini-simulation plays inside the overlay (reuses station components with `params`) | `feedback.hint2()` |
| 3rd wrong | `WorkedSolution` animates `worked.steps` one by one; the correct answer is shown | `feedback.reveal()` + each step's `speech` |

No XP penalty. XP for a 3rd-attempt/revealed question: 0 (the question still counts as *answered*, not *correct*).

---

## 11. Session Persistence & Resume

```js
const SESSION_KEY = 'intellia_triangles_g8_v1';
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

// Only small, stable values are saved. Questions are NOT saved — they are regenerated
// deterministically from (sessionSeed, world, worldAttempt).
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    v: 1, ts: Date.now(),
    phase: state.phase, storyPanel: state.storyPanel, currentStation: state.currentStation,
    stations: state.stations,
    sessionSeed: state.sessionSeed, worldAttempt: state.worldAttempt,
    currentWorld: state.currentWorld, currentQuestion: state.currentQuestion,
    worldScores: state.worldScores, worldRunCorrect: state.worldRunCorrect,
    xp: state.xp, streak: state.streak, maxStreak: state.maxStreak,
    badges: state.badges, spotErrorCorrect: state.spotErrorCorrect,
    phaseComplete: state.phaseComplete, audioEnabled: state.audioEnabled,
  }));
}, [state]);

// On mount
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved?.v === 1 && Date.now() - saved.ts < MAX_AGE_MS) dispatch({ type: 'RESTORE_SESSION', payload: saved });
```

All storage calls are wrapped in `try/catch` (private-browsing / storage-disabled fallback = in-memory only).

---

## 12. Styling, Animation & UI Contract

### 12.1 Matching the reference UI

- Copy `tailwind.config.js`, `postcss.config.js`, the global CSS, font imports and colour tokens from `p1pachare-cloud/Grade5-Time-Intervals`. **Do not recreate them by eye.**
- Keep the same component naming for shared shell pieces: `ProgressMap`, `Mascot`, `FeedbackOverlay`, `StarRating`, `BadgePanel`, `StreakCounter`, `WorldMap`, `XPTracker`.
- Layout skeleton: **Top bar** (logo · "Triangles" · 6 dots · audio toggle) → **Main** → **Bottom bar** (XP · stars · streak · nav arrows); **sidebar** on ≥768 px.

### 12.2 Keyframes (same set as the reference)

```css
@keyframes bounceIn   { 0%{transform:scale(.3);opacity:0} 50%{transform:scale(1.05);opacity:1} 70%{transform:scale(.9)} 100%{transform:scale(1)} }
@keyframes shake      { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
@keyframes floatUp    { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-60px) scale(1.5);opacity:0} }
@keyframes pulseGlow  { 0%,100%{box-shadow:0 0 0 0 rgba(74,144,217,.4)} 50%{box-shadow:0 0 0 12px rgba(74,144,217,0)} }
@keyframes celebrate  { 0%{transform:rotate(-5deg) scale(1)} 25%{transform:rotate(5deg) scale(1.1)} 50%{transform:rotate(-3deg) scale(1.05)} 75%{transform:rotate(3deg) scale(1.1)} 100%{transform:rotate(0) scale(1)} }
@keyframes slideInUp  { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }

/* Triangle-specific additions */
@keyframes tearOff    { to { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); } }
@keyframes arcSweep   { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: 0; } }
@keyframes rodCollapse{ to { transform: rotate(var(--flat)); } }

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

### 12.3 Geometry colour roles (tokens, not hard-coded)

| Role | Token | Usage |
| ---- | ----- | ----- |
| Side a / b / c | `--geo-side-a`, `--geo-side-b`, `--geo-side-c` | Rods, side labels, squares |
| Interior angle | `--geo-angle` | Filled arcs |
| Exterior angle | `--geo-exterior` | Dashed arc + coral fill |
| Right-angle marker | `--geo-right` | Square marker |
| Correct / Wrong | `--ok`, `--bad` | Feedback glow |

Colour is **never the only cue**: angle arcs carry numeric labels; congruence marks use tick patterns; correct/wrong include icons.

---

## 13. Component Prop Contracts

| Component | Props | Notes |
| --------- | ----- | ----- |
| `TriangleCanvas` | `{ vertices, onChange, mode, showAngles?, showSides?, showExterior?, highlight?, interactive? }` | Emits `onInteract('drag' \| …)` |
| `AngleArc` | `{ at, from, to, label, kind: 'interior'\|'exterior'\|'right' }` | Right angle renders a square |
| `RodBridge` | `{ a, b, c, onChange, showLimits? }` | Uses `apexFrom` |
| `SquareGarden` | `{ a, b, showTiles?, onTilesSum? }` | Disables tiles when side > 15 |
| `DissectionProof` | `{ a, b, t, onT }` | `t ∈ [0,1]` scrub |
| `ConstructionBench` | `{ evidence, onResult }` | Reports `{count, triangles}` |
| `ShadowScene` | `{ sunAngle, objects:[{label,height}], reveal? }` | Visual only |
| `SimilarPair` | `{ t1, k, showAngles?, showAreaBar? }` | Scales about left vertex |
| `RuleCard` | `{ title, words, symbol, because, onNext }` | Title never narrated |
| `SentenceBuilder` | `{ target, bank, onDone }` | Drag/tap words |
| `QuestionRenderer` | `{ question, onAnswer, attempt }` | Dispatch by `format` |
| `HintOverlay` | `{ question, level }` | Level 1/2/3 |
| `WorldMap` | `{ worldScores, currentWorld, onSelectWorld }` | Lock/star states |
| `Mascot` | `{ mood }` | 6 moods |
| `FeedbackOverlay` | `{ isCorrect, xpEarned, onContinue }` | bounceIn / shake |
| `BadgePanel` | `{ badges, newBadgeId? }` | Toast + grid |

---

## 14. Performance Requirements

| Metric | Target |
| ------ | ------ |
| Initial load (Vite production) | < 2 s on broadband; < 3 s on throttled 4G |
| Time to first meaningful paint | < 1 s |
| Drag interaction frame rate | ≥ 55 fps on mid-range tablet (SVG ≤ 400 nodes per canvas) |
| Memory | < 80 MB |
| Bundle size (gzipped, excluding audio) | < 600 KB |
| Code splitting | Stations and `QuestionRenderer` formats lazy-loaded with `React.lazy` |
| Lighthouse Performance / Accessibility | ≥ 90 / ≥ 90 |
| Static audio latency | ~0 ms (cached static `.mp3`) |
| Dynamic audio latency | < 2 s first play; ~0 ms after preload |
| Question generation | < 20 ms per world (10 questions) |

SVG performance notes: tile grids capped at side ≤ 15; large construction scenes use `shape-rendering="geometricPrecision"` only on labels, `crispEdges` on grids; memoise `anglesOf` per vertex tuple.

---

## 15. Browser & Device Support

| Environment | Support |
| ----------- | ------- |
| Chrome 110+ (desktop & Android) | Full |
| Safari 15+ (macOS, iPadOS, iOS) | Full (audio unlocked by first user gesture) |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| IE 11 | Not supported |

**Autoplay policy:** the Intro screen's "Start" tap is the user gesture that unlocks audio; `narrate()` is only called after it. A visible audio toggle persists the preference.

---

## 16. Quality & Testing Standards

### 16.1 Unit tests (Vitest)

| Suite | What it proves |
| ----- | -------------- |
| `geometry.test.js` | `anglesOf` sums to 180; classification tolerances; `canFormTriangle` boundaries (equal-sum = false); `pythagoreanClass` for triples, near-misses, obtuse; isosceles height |
| `congruence.test.js` | SSS/SAS/ASA/AAS/RHS → 1; AAA → ∞; **SSA matrix**: `a<h`→0, `a=h`→1, `h<a<b`→2, `a≥b`→1; obtuse `A` cases |
| `similarity.test.js` | AA / SSS~ true & false cases; `heightFromShadow` |
| `generators.test.js` | For each family × difficulty: run **10,000 draws**; assert (i) no thrown errors, (ii) answer recomputed independently equals `correct`, (iii) exactly one correct option, (iv) 3 distinct distractors, (v) all angles > 0 and sum = 180, (vi) sides satisfy inequality where required, (vii) integer-answer families return integers |
| `randomness.test.js` | 1,000 seeds × `buildWorld` for each world → **no two outputs identical**; same seed → identical output; no duplicate `paramHash` within a world |
| `speakify.test.js` | ≥ 60 fixture pairs incl. PRD §10.5 |
| `scoring.test.js` / `badges.test.js` | XP table, star thresholds, unlock gate, badge conditions |

### 16.2 Component & E2E tests

- **React Testing Library:** `StationShell` beat transitions; `playUnlocked` gate (Play rejects navigation until all stations pass); `QuestionRenderer` per format; hint ladder 1→2→3.
- **Playwright smoke:** Intro → Wonder → Story → 5 stations (scripted interactions) → Play world 1 → Reflect; run at 1280×800, 768×1024, 375×812.
- **Keyboard test:** every drag has an arrow-key path; tab order is logical.

### 16.3 Accessibility audit

- Lighthouse + axe in CI; manual screen-reader pass on one station and one question format
- Colour-contrast check on all token pairs
- `prefers-reduced-motion` verified for Tear & Align, Dissection, Construction animations

### 16.4 Audio parity and integrity

- `check_audio_parity.js` in CI (see §9.9)
- Manual: listen-through of all static clips for pronunciation of names (Aisha, Yuki, Sofia, Carlos), "∠", "√" phrases

### 16.5 Content QA

- Curriculum lead reviews: Rule Cards, hint wording, worked solutions, standards table
- 200 randomly sampled generated questions per family are exported to a CSV for human review of wording and plausibility

---

## 17. Build, Deployment & Embedding

### 17.1 Config

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: '/',                                 // set to the lesson sub-path if self-hosted under Intellia
  build: { target: 'es2020', sourcemap: false, chunkSizeWarningLimit: 600 },
});
```

```json
// vercel.json
{
  "rewrites": [{ "source": "/((?!api/|assets/).*)", "destination": "/index.html" }],
  "headers": [
    { "source": "/assets/audio/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] }
  ]
}
```

```
# .env.local.example
VITE_ELEVENLABS_API_KEY=     # used ONLY by scripts/generate_audio.js (Node)
ELEVENLABS_API_KEY=          # used by api/elevenlabs.js on Vercel (set in project settings)
```

> `.env.local` is git-ignored. Do not import `import.meta.env.VITE_ELEVENLABS_API_KEY` anywhere under `src/`.

### 17.2 Hosting at the Intellia lesson URL

```
https://intelliasg.com/courses/grade-8-math/lessons/triangles/
```

Two supported options — pick with the Intellia web team (the Grade 3 course page could not be inspected automatically, so embedding requirements are unconfirmed):

1. **Iframe embed** of the Vercel deployment (preferred): the Intellia page sets `<iframe src="…vercel.app" allow="autoplay; fullscreen">`. The app must allow framing from `intelliasg.com` (`Content-Security-Policy: frame-ancestors https://intelliasg.com https://*.intelliasg.com`).
2. **Direct hosting** under the lesson path: set Vite `base` to the sub-path and serve `index.html` for all sub-routes.

**Optional host messaging** (proposal, only if Intellia wants progress events):

```js
window.parent?.postMessage({ source:'intellia-triangles', type:'phase', phase: state.phase }, 'https://intelliasg.com');
window.parent?.postMessage({ source:'intellia-triangles', type:'complete', xp: state.xp, stars: totalStars(state.worldScores) }, 'https://intelliasg.com');
```

### 17.3 CI

1. `npm run lint` · `npm test` (Vitest) · `node scripts/check_audio_parity.js`
2. `npm run build` · bundle-size check (< 600 KB gz)
3. Playwright smoke against the preview deployment
4. Lighthouse CI thresholds (Perf ≥ 90, A11y ≥ 90)

---

## 18. Suggested Implementation Order

| Step | Deliverable |
| ---- | ----------- |
| 1 | Scaffold from the Grade 5 repo (config, Tailwind, shell, ProgressMap, Mascot, Feedback, World/Badge/XP components); swap copy |
| 2 | `geometry.js`, `congruence.js`, `similarity.js`, `rng.js`, `speakify.js` + unit tests |
| 3 | `TriangleCanvas` + `useDrag` + Station A end-to-end (validates `StationShell`) |
| 4 | Stations B–E |
| 5 | Generators Q1–Q10 + `sessionBuilder` + randomness tests |
| 6 | Play phase: question formats, hint ladder, world map, gamification |
| 7 | Wonder + Story + Reflect content and art |
| 8 | Audio: `phrases.js`, generation script, audio engine, proxy, parity script |
| 9 | Accessibility, performance, cross-device QA |
| 10 | Deploy to Vercel; integrate at the Intellia lesson URL |

---

## 19. Appendix

### 19.1 Pythagorean triple table (`data/tripleTable.js`)

```js
export const TRIPLES = [[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]];
```

Easy uses the first three at scale 1–3; Medium/Hard uses all six at scale 1–5; near-miss converse questions perturb one side by ±1.

### 19.2 Global context pools (`data/names.js`)

```js
export const NAMES = ['John','Mike','Sarah','Emma','Liam','Sofia','Noah','Aisha','Carlos','Yuki',
                      'Priya','Fatima','Diego','Chloe','Ravi','Amara','Kofi','Mei','Ivan','Elena','Hassan','Lucas'];
export const CITIES = {
  Cairo:['Giza Pyramids'], Paris:['Eiffel Tower'], Sydney:['Harbour Bridge'], London:['Tower Bridge'],
  'New York':['Brooklyn Bridge'], Mumbai:['Bandra–Worli Sea Link'], 'Cape Town':['Table Mountain Cableway'],
  Tokyo:['Skytree'], 'Rio de Janeiro':['Christ the Redeemer'], Cusco:['Machu Picchu'],
};
export const OBJECTS = ['ladder','cable','ramp','beam','kite string','support rod'];
```

### 19.3 SSA ambiguity quick reference (for the Station D rule card & tests)

Given sides `a` (opposite ∠A) and `b` (adjacent), and ∠A acute, with `h = b·sin A`:

| Condition | Triangles |
| --------- | --------- |
| `a < h` | 0 |
| `a = h` | 1 (right triangle) |
| `h < a < b` | **2** |
| `a ≥ b` | 1 |

If ∠A is right or obtuse: `a > b` → 1, otherwise 0. (Right-angle SSA with hypotenuse is the RHS case.)

---

**Document Version:** 1.0 | October 2026
**Product:** Intellia — Grade 8 Math, Triangles
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Lesson URL:** `https://intelliasg.com/courses/grade-8-math/lessons/triangles/`
