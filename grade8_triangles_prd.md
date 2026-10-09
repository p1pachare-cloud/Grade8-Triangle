# Product Requirements Document (PRD)

## Triangles — Properties, Angles, Pythagoras, Congruence & Similarity | Grade 8 Math

### Intellia SG | Global Grade 8 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Triangle Architects — Triangles"**, an interactive, gamified, simulation-based lesson module for **Grade 8 students (age 13–14)**. It teaches the concept of **Triangles** with a focus on *understanding why the rules work*, not just applying them:

- Classifying triangles (by sides and by angles)
- The angle sum property and the exterior angle property
- The triangle inequality
- The Pythagorean theorem and its converse
- Congruence criteria (SSS, SAS, ASA, AAS, RHS) and why SSA/AAA fail
- Similarity criteria (AA, SAS~, SSS~), scale factors, and indirect measurement
- Area and perimeter of triangles in multi-step real-world problems

The module is a standalone **React (Vite + JSX)** web application that **strictly mirrors the visual language, UX structure, phase flow, and interaction patterns** of the reference product:

- Reference site: **<https://grade5-time-intervals.vercel.app/>**
- Reference repository: **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>**
- Reference docs in that repo: `grade5_time_intervals_prd.md`, `grade5_time_intervals_trd.md`, `audio_generation_pipeline.md`

The module will be hosted within the Intellia course catalogue, following the same URL family as `https://intelliasg.com/courses/grade-3-math`, restructured for Grade 8:

```
https://intelliasg.com/courses/grade-8-math/lessons/triangles/
```

Audio narration follows the **ElevenLabs pipeline** in `audio_generation_pipeline.md` (Voice: **Alice**, Voice ID `Xb7hH8MSUJpSbSDYk0k2`, Model `eleven_multilingual_v2`), using the same hybrid pre-generation + dynamic fallback architecture, the same per-style voice settings, and the same rule that **only paragraph text and questions are narrated — never titles or headings**.

The lesson follows Intellia's proven **6-phase learner journey** (INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT) with a **learning-first** rule: every concept is *discovered in a simulation, formalised in a rule card, and checked* **before** any scored practice unlocks.

Three things differ from the Grade 5 reference, deliberately:

1. **Every practice question is randomised, not just the order.** Questions are generated from parameterised templates (random angles, side lengths, names, cities), so no two students, and no two sessions, see the same numbers.
2. **Five simulation stations** instead of three, because Triangles has five distinct big ideas that each need a manipulable model.
3. **A "why" layer.** Grade 8 students are expected to justify, so Play includes *Spot the Error* and *Order the Reasoning* questions alongside computation.

---

## 2. Product Vision & Goals

**Vision.** To make triangle geometry feel like real engineering — helping 13–14 year old learners *see* why the angles add to 180°, *feel* why three sticks sometimes can't close, *prove* the Pythagorean theorem with their own hands, and use congruence and similarity to measure things nobody can reach with a ruler.

**Goals**

| Goal                          | Metric                                                              |
| ----------------------------- | ------------------------------------------------------------------- |
| Learning Completion           | ≥85% of students complete all 6 phases                              |
| Learning-first compliance     | 100% of students pass all 5 station checkpoints before Play unlocks |
| Practice Engagement           | ≥90% attempt at least 20 practice questions                         |
| Score Achievement             | Average Play score ≥70% on first attempt                            |
| Session Duration              | Average engagement ≥25 minutes per session (resume supported)       |
| Curriculum Alignment          | 100% aligned to global Grade 8 triangle standards (Section 4)       |
| Phase Progression             | ≥75% reach Play phase in a single session                           |
| Simulation Interaction Rate   | ≥95% complete all 5 stations                                        |
| Conceptual transfer           | ≥65% correct on "Spot the Error" / reasoning items                  |
| Randomisation Integrity       | 0 repeated parameter sets within a session; 0 identical sessions in a 1,000-run test |

---

## 3. Target Users

**Primary: Grade 8 Students (Age 13–14)**

- Comfortable with variables and one-step/two-step equations (needed for algebraic angle problems)
- Know squares and square roots; familiar with the coordinate grid
- Ready to move from "apply the formula" to "explain why it works"
- Motivated by streaks, badges, world maps, and a story with real-world engineering stakes — but quick to disengage if the UI feels childish. Visual tone is **playful but not babyish** (see Section 11).
- Global classroom context — familiar with international landmarks, metric units, and travel

**Secondary: Parents & Teachers**

- Assign as classwork, homework, or enrichment
- Expect alignment to recognised global standards (Section 4)
- Monitor completion via phase indicators and badges

**Common Grade 8 misconceptions this product must actively address**

| Misconception | Where it is confronted |
| --- | --- |
| "The longest side is always opposite the biggest angle only for right triangles" | Station B (live side/angle pairing) |
| "Any three lengths make a triangle" | Station B (rods collapse) |
| Adding the legs instead of squaring them (`a + b = c`) | Station C, Q5/Q6 distractors |
| Forgetting the square root at the end of Pythagoras | Station C, Q5 distractors |
| Treating the longest side as a leg in the converse test | Q6 distractors |
| "Two sides and any angle fix a triangle" (SSA) | Station D (two triangles appear) |
| "Same angles means congruent" (AAA) | Station D (triangles of different sizes) |
| Using ratio of areas = ratio of sides in similar triangles | Station E extension, Q8 hard |
| Exterior angle = adjacent interior angle | Station A, Q3 distractors |
| Angle sum of a triangle depends on its size or shape | Station A (drag any vertex; sum stays 180°) |

---

## 4. Curriculum Alignment — Global Grade 8 Mathematics

**Topic:** Triangles
**Programme:** Intellia Grade 8 Math — Geometry
**Lesson URL:** `https://intelliasg.com/courses/grade-8-math/lessons/triangles/`

**Source frameworks (topic-related content only, cross-referenced):**

- U.S. Common Core, Grade 8 Geometry — 8.G.A.5 (angle sum and exterior angle of triangles, angle–angle similarity), 8.G.B.6–8.G.B.7 (Pythagorean theorem and its converse, applications in 2D)
- Singapore MOE Lower Secondary Mathematics — angle properties of triangles, congruence and similarity, Pythagoras' theorem
- UK National Curriculum, Key Stage 3 — properties of triangles, congruence criteria, similarity, Pythagoras' theorem
- CBSE/NCERT Middle School Mathematics — *The Triangle and its Properties*, *Congruence of Triangles*, *The Pythagorean Property* (with later-grade similarity extension)
- Australian Curriculum (Years 8–9) — Measurement and Geometry: congruence of triangles, Pythagoras' theorem, similarity

> **Note for the curriculum lead:** standard codes above are listed from the publicly known framework structures and must be verified against the current published documents before launch. Content outside the triangle topic (circles, quadrilaterals, trigonometric ratios, coordinate geometry) is explicitly excluded.

**Learning Objectives Covered**

| LO   | Description                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------- |
| LO1  | Classify triangles by sides (equilateral, isosceles, scalene) and by angles (acute, right, obtuse) |
| LO2  | State and use the angle sum property (interior angles sum to 180°), including algebraic angles     |
| LO3  | State and use the exterior angle property (exterior angle = sum of the two remote interior angles) |
| LO4  | Apply the triangle inequality to decide if three lengths form a triangle and to bound a third side |
| LO5  | Apply the Pythagorean theorem to find a missing side of a right triangle                           |
| LO6  | Apply the converse of the Pythagorean theorem to test whether a triangle is right-angled           |
| LO7  | Identify congruence criteria (SSS, SAS, ASA, AAS, RHS) and explain why SSA and AAA are not enough  |
| LO8  | Use similarity (AA, SAS~, SSS~) and scale factors to find missing sides                            |
| LO9  | Calculate area (½ × base × height) and perimeter, including heights found via Pythagoras           |
| LO10 | Solve multi-step real-world problems combining two or more triangle properties                     |
| LO11 | Justify and critique reasoning (spot the error, order the steps of an argument)                    |

**Concrete → Pictorial → Abstract (CPA) Progression**

- **Concrete:** Draggable vertices, "tear-and-align" corners, rods that physically connect or collapse, tile-filled squares on the sides
- **Pictorial:** Labelled diagrams with live measurements, side-by-side triangle pairs, shadow diagrams
- **Abstract:** `∠A + ∠B + ∠C = 180°`, `a² + b² = c²`, `a + b > c`, `△ABC ≅ △DEF`, `AB/DE = BC/EF = k`

**Number Ranges by Difficulty**

- **Easy:** Whole-number degrees (multiples of 5), small Pythagorean triples (3-4-5, 5-12-13, 6-8-10), single-step
- **Medium:** Any whole-number degrees, algebraic angles (`x`, `2x + 10`), scaled triples, decimals to 1 d.p., two-step
- **Hard:** Non-triple Pythagoras (answer to 1–2 d.p.), heights via Pythagoras, scale factors as fractions, three-step contexts, spot-the-error

**Vocabulary Focus:** *vertex, side, interior angle, exterior angle, remote interior angles, equilateral, isosceles, scalene, acute, obtuse, right-angled, hypotenuse, leg, Pythagorean triple, converse, congruent, similar, corresponding, included angle, scale factor, altitude (height), base, perimeter, area*

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hello, Architect! Ready to master Triangles? 📐🌍"               │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
│ Audio on/off toggle + "Resume where you left off" if a saved session exists│
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈2 min)                                                  │
│                                                                            │
│ Hook (interactive): Sarah stands in Paris looking at the Eiffel Tower.     │
│ "Why are there triangles everywhere in this tower — and not squares?"      │
│ → Student PUSHES a four-bar square frame: it wobbles and folds flat.       │
│ → Student PUSHES a three-bar triangle frame: it will not change shape.     │
│ → Mascot "Trigo" (a friendly triangle-robot with a compass arm) reacts.    │
│ → "Let's discover the secrets that make triangles so strong!"              │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈3 min) — "The Global Triangle Architects Club"           │
│ 7 illustrated panels, world-map backdrop with city pins (Section 6)        │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈14–18 min)  ← LEARNING HAPPENS HERE                   │
│                                                                            │
│ 5 interactive stations. Each station has three beats:                      │
│   1. EXPLORE   — free manipulation with live measurements                  │
│   2. FORMALISE — the rule appears as a Rule Card; student "locks it in"    │
│   3. CHECKPOINT— 3 randomised mini-rounds; ≥2/3 correct to pass            │
│                                                                            │
│  A. Angle Lab            (angle sum + exterior angle)                      │
│  B. Bridge Builder       (triangle inequality + classification)            │
│  C. Pythagoras Garden    (theorem + converse)                              │
│  D. Congruence Detective (SSS, SAS, ASA, AAS, RHS; SSA & AAA fail)         │
│  E. Shadow Surveyor      (similarity + indirect measurement)               │
│                                                                            │
│ Stations unlock in order. PLAY IS LOCKED until all 5 checkpoints pass.     │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈15–20 min)                                                │
│                                                                            │
│ IntelliPlay™ — 100 randomised questions across 10 worlds                   │
│ (each world = a real-world landmark that uses triangles)                   │
│ 10 questions per world; world unlocks at ≥6/10 correct                     │
│ Stars (1–3), XP, badges, streak fire counter active                        │
│ Encouragement-first feedback; 3 attempts with graduated hints              │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈2 min)                                                 │
│                                                                            │
│ Prompt: "Pick one triangle rule. Explain to Trigo why it works — or        │
│ describe where you'd use it to build something."                           │
│ Lesson-complete badge, XP / stars / badge summary, "Share with your        │
│ teacher" export (screenshot / printable summary).                          │
└────────────────────────────────────────────────────────────────────────────┘
```

> The reference product labels these as six phase dots (Intro, Wonder, Story, Simulate, Play, Reflect). The same six dots are kept. Results/summary appears inside Reflect.

**Estimated total time:** 35–45 minutes. Progress auto-saves so a student can finish across two sittings (24-hour resume window).

---

## 6. Phase 2 — The Story: "The Global Triangle Architects Club"

**Premise.** The International Youth Engineering Fair has announced the **Global Skyline Challenge**: teams must design a bridge-and-tower skyline using only triangles, and *prove* each design is safe. Ten friends from ten cities form the **Global Triangle Architects Club**, meeting over video call. Their robot assistant **Trigo** keeps their toolkit.

**Cast (global, consistent across story and questions)**

| Name   | City         | Role in the club           | Landmark theme            |
| ------ | ------------ | -------------------------- | ------------------------- |
| Noah   | Cairo        | Pyramid surveyor           | Giza Pyramids             |
| Sarah  | Paris        | Truss designer             | Eiffel Tower              |
| Emma   | Sydney       | Bridge analyst             | Sydney Harbour Bridge     |
| John   | London       | Structural tester          | Tower Bridge              |
| Mike   | New York     | Cable & ladder engineer    | Brooklyn Bridge           |
| Aisha  | Mumbai       | Right-angle checker        | Bandra–Worli Sea Link     |
| Liam   | Cape Town    | Cableway planner           | Table Mountain Cableway   |
| Yuki   | Tokyo        | Height measurer            | Tokyo Skytree             |
| Sofia  | Rio de Janeiro | Area & materials planner | Christ the Redeemer       |
| Carlos | Cusco        | Expedition lead            | Machu Picchu              |

**Extended name pool for word problems:** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Kofi, Mei, Ivan, Elena, Hassan, Lucas.

**Story panels** (illustrated, animated slide-in, ElevenLabs narration; panel *titles* are not narrated)

| # | Panel | Narrated text (paragraphs only) | Visual | Concept seeded |
| - | ----- | -------------------------------- | ------ | -------------- |
| 1 | The Club | "Ten friends. Ten cities. One challenge. John in London, Mike in New York, Sarah in Paris, and seven more friends have joined the Global Skyline Challenge. They must build a skyline using only triangles — and prove that it is safe." | World map; 10 pins light up one by one | Motivation |
| 2 | Noah's Pyramid | "Noah is in Cairo, measuring the face of a pyramid. Two of its sides are the same length, and every angle is smaller than ninety degrees. What kind of triangle is that?" | Pyramid face with measured sides/angles | Classification |
| 3 | Sarah's Truss | "Sarah is in Paris, studying a truss on the Eiffel Tower. She measures two angles: sixty-five degrees and fifty-five degrees. Trigo says the third angle is already decided. How can that be?" | Truss triangle, two angles shown, third hidden | Angle sum |
| 4 | Emma's Bridge | "Emma is in Sydney, looking at the steel arch of the Harbour Bridge. One beam is extended past a corner, making a new angle outside the triangle. Trigo asks: is that outside angle connected to the two angles far away from it?" | Extended side, exterior angle arc | Exterior angle |
| 5 | John's Test | "John is in London with three steel rods: three, four, and eight meters long. He tries to join them into a triangle, but the ends will not meet. Why not?" | Rods animation: gap at the joint | Triangle inequality |
| 6 | Mike's Ladder | "Mike is in New York. A thirteen-meter ladder leans against a wall with its foot five meters away. How high up the wall does it reach? Trigo whispers: look for the right angle." | Ladder diagram, right-angle mark | Pythagoras |
| 7 | The Big Idea | "Liam in Cape Town has two identical cable cars, and Yuki in Tokyo has a tower too tall to measure with a ruler. Matching triangles tell them how to build the first — and shadows tell them how tall the second one is. Let's learn every secret, one station at a time!" | Cable cars; Skytree with shadow | Congruence & similarity |

- Key vocabulary is highlighted as it appears (*isosceles, acute, exterior angle, hypotenuse, congruent, similar*).
- Tapping a highlighted word opens a **mini-glossary card** (visual + one-line definition).
- Panels advance on tap/arrow; narration auto-plays when audio is enabled.

---

## 7. Phase 3 — Simulation Design (Detailed)

### 7.0 Common station pattern (applies to all five)

| Beat | What happens | Exit condition |
| ---- | ------------ | -------------- |
| **1. Explore** | Student freely manipulates the model. Live readouts show the relevant measurements. A small *Trigo prompt* suggests experiments ("Drag the top corner as far as you can. What happens to the total?"). | Student completes **N required interactions** (e.g. ≥3 different triangles dragged; ≥1 reveal triggered) |
| **2. Formalise** | The **Rule Card** slides in: rule in words, symbol form, and a one-line *why* ("because…"). Student confirms understanding by completing a short sentence-builder (drag words into the rule). | Sentence-builder correct (unlimited tries) |
| **3. Checkpoint** | 3 randomised mini-rounds using the same model, with a blank to solve. | ≥2 of 3 correct; otherwise Trigo replays the Explore prompt and offers a fresh set of 3 |

**Rules for all stations**

- All numbers are randomised every visit (Section 8.4 generators).
- Drag interactions have a tap-tap fallback and keyboard controls (arrow keys nudge a vertex by 1 unit; Shift = 5).
- Live readouts update at ≥30 fps while dragging.
- Narration plays on station entry (instruction) and on each feedback.
- No time pressure.

---

### 7.1 Station A — "Angle Lab" (angle sum + exterior angle)

**LOs:** LO1 (angle-based classification), LO2, LO3

**Explore visual**

- A large triangle on a soft grid with three draggable vertices (A, B, C)
- Live readouts: `∠A`, `∠B`, `∠C`, and their **sum**, which always shows `180°`
- Live classification chip (acute / right / obtuse, and equilateral / isosceles / scalene) — updates as the student drags, with a tolerance band (e.g. within 0.5° of 90° snaps to "right")

**Interactions**

1. **Drag any vertex** — angles change; the sum does not.
2. **Tear & Align** button — the three corners tear off the triangle (animated) and rotate to sit side-by-side along a straight line, forming a **straight angle (180°)**. Student can replay with a different triangle.
3. **Parallel-line reveal** — a line through the top vertex parallel to the base appears; alternate-interior angles flash in matching colours to show *why* the angles fit on a straight line.
4. **Extend a side** — student taps a vertex; side extends; the **exterior angle** appears. A split-bar shows `exterior = remote interior 1 + remote interior 2` and a balance scale compares the exterior with the two far angles.

**Rule Cards**

- *Angle Sum:* "The three interior angles of any triangle add up to 180°. Why? Three corners fit on a straight line." 
- *Exterior Angle:* "An exterior angle equals the sum of the two interior angles that are *not* next to it. Why? Because exterior + adjacent interior = 180°, and so do all three interior angles."

**Checkpoint rounds (random each time)**

- R1: Two angles given, find the third (e.g. `52°`, `67°` → `61°`)
- R2: Algebraic angles (e.g. `x`, `2x + 10`, `3x − 40` → `x = 35`)
- R3: Exterior angle given; find a missing remote interior angle

**Feedback:** correct → sum bar fills and glows; incorrect → Trigo overlays the straight-line replay.

---

### 7.2 Station B — "Bridge Builder" (triangle inequality + side classification)

**LOs:** LO1, LO4

**Explore visual**

- Three **rods** (red, green, blue) with length sliders (1–20 units) pinned at two ends to a baseline
- When the lengths allow, the free ends **swing together and snap** into a triangle; when they don't, the rods **hang apart** with a visible gap
- Live meter beneath: three bars showing `a + b`, `b + c`, `a + c` against the third side, each turning green (`>`) or red (`≤`)
- Live chips: side classification (equilateral / isosceles / scalene), and *largest angle sits opposite the longest side* (angles drawn at the joints)

**Interactions**

1. Slide rods to find sets that **close** and sets that **collapse**.
2. Find the **boundary**: set `a = 6`, `b = 9`, then slide `c` — the sim marks the min and max values at which the triangle just closes (flat, degenerate "triangle" shown as a straight line).
3. **Perimeter challenge:** "Build a triangle with perimeter exactly 24 using whole-number sides — how many different ones can you make?" A counter lists each unique triple found.

**Rule Card**

- *Triangle Inequality:* "The sum of any two sides must be greater than the third side. If it equals the third side, the triangle goes flat. If it is less, the rods can't meet."
- *Third-side range:* "If two sides are `a` and `b`, the third side must be between `|a − b|` and `a + b`."

**Checkpoint rounds**

- R1: Three lengths — can they form a triangle? (tap Yes/No, then set the sliders to prove it)
- R2: Two sides given — choose the range of the third side
- R3: Two sides given and an "isosceles" condition — find the possible third side(s) (e.g. sides 4 and 9, isosceles → third side must be 9)

---

### 7.3 Station C — "Pythagoras Garden" (theorem + converse)

**LOs:** LO5, LO6

**Explore visual**

- A right triangle on a grid with a **square garden** built on each side. Each square is filled with unit tiles so area is literally countable.
- Draggable leg lengths `a` and `b` (whole-number steps). Live readouts: `a²`, `b²`, `c²`, and a bar comparing `a² + b²` with `c²`.

**Interactions**

1. **Tile count:** drag the legs; watch the two smaller gardens' tiles sum to the big garden's tiles. Triples (3-4-5, 5-12-13, 8-15-17) flash a "Perfect fit!" ring.
2. **Dissection proof:** press *Show me why* — the two small squares break into pieces (animation) that rearrange to exactly fill the big square. Student can scrub the animation forward/backward.
3. **Converse tester:** *Switch to Test Mode* — student is given three side lengths and drags them into the triangle. A **corner probe** shows whether the angle at the longest side's opposite vertex is acute (`a² + b² > c²`), right (`=`), or obtuse (`<`).
4. **Ladder scene:** a ladder leans on a wall; student drags the foot; the top slides down; live `h = √(c² − d²)`.

**Rule Cards**

- *Pythagoras:* "In a right triangle, the square on the hypotenuse has the same area as the two squares on the legs: `a² + b² = c²`."
- *Converse:* "If `a² + b² = c²` for the three sides, the triangle has a right angle. If `<`, it is obtuse. If `>`, it is acute."
- *Watch out:* "The hypotenuse is always the longest side, opposite the right angle."

**Checkpoint rounds**

- R1: Find the hypotenuse (random triple, scaled)
- R2: Find a missing leg (non-triple allowed on medium/hard, answer to 1 d.p.)
- R3: Is it a right triangle? (random three sides; includes near-miss traps such as `7, 24, 26`)

---

### 7.4 Station D — "Congruence Detective" (SSS, SAS, ASA, AAS, RHS; why SSA & AAA fail)

**LOs:** LO7, LO11

**Explore visual**

- A **Detective Desk** with a case file: *"Can the facts below make exactly one triangle?"*
- **Evidence cards** (draggable): side lengths and angles. The student picks 3 pieces of evidence and presses *Build*.
- The workbench uses a **compass-and-ruler construction animation**: base is drawn; arcs and angle rays swing out; the sim reports **how many triangles are possible: 0, 1, 2, or infinitely many**.

**Evidence combinations the student can test**

| Evidence | Result in the sim |
| --- | --- |
| 3 sides (SSS) | Exactly one triangle (shape locked) |
| 2 sides + the **included** angle (SAS) | Exactly one triangle |
| 2 angles + the **included** side (ASA) | Exactly one triangle |
| 2 angles + a **non-included** side (AAS) | Exactly one triangle (third angle follows from the angle sum) |
| Right angle + hypotenuse + a leg (RHS) | Exactly one triangle |
| 2 sides + a **non-included** angle (SSA) | **Sometimes two triangles** (ambiguous case) — the arc cuts the ray at two points |
| 3 angles (AAA) | **Infinitely many** — triangles of different sizes appear and scale |

**Interactions**

1. **Build mode:** choose evidence, build, read the count.
2. **Overlay test:** two triangles are shown; student drags one on top of the other. If it fits exactly (after rotate/flip), a "match" ring appears. Student then names the rule that guarantees it.
3. **Matching marks:** tick marks and arcs identify equal sides/angles. Student taps pairs to mark corresponding parts, and the sim checks the correspondence.

**Rule Cards**

- *Five ways to prove congruence:* SSS, SAS, ASA, AAS, RHS — each shown as a mini diagram.
- *Two ways that do NOT work:* **SSA** (unless the angle is right → RHS) and **AAA** (same shape, any size → that's *similarity*).
- *Why it works:* "If the evidence pins the triangle down to a single shape and size, the triangles must be congruent."

**Checkpoint rounds**

- R1: Two triangles with marked parts — which congruence rule? (options include "not enough information")
- R2: Spot the trap — an SSA or AAA pair that *looks* congruent
- R3: Corresponding parts — "If △ABC ≅ △DEF, which side matches `AB`? Which angle matches `∠C`?"

---

### 7.5 Station E — "Shadow Surveyor" (similarity + indirect measurement)

**LOs:** LO8, LO10

**Explore visual**

- A sunny scene: a person (known height), a tower (unknown height), and their **shadows** on the ground, drawn as two right triangles sharing the same sun-ray angle.
- A **Sun Angle slider** changes the shadow lengths — the ratio `height : shadow` stays the same for both objects.
- A **Similar Triangles Workbench**: two triangles side-by-side with a *scale factor* slider `k`; corresponding sides and angles highlight in matching colours.

**Interactions**

1. **Move the sun:** both shadows stretch; the sim shows both ratios stay equal (`1.6 ÷ 2 = 0.8` for the person, `40 ÷ 50 = 0.8` for the tower).
2. **Scale a triangle:** drag `k`; angles do not change, all sides multiply by `k`. A mini "area vs. side" bar shows perimeter × `k` and area × `k²` (extension).
3. **AA discovery:** student matches two angles of two triangles; the sim shows that the third angle is forced, and the triangles snap into a "similar" state.
4. **Missing-side solver:** student sets up the proportion with draggable fractions `height / shadow = height / shadow` and solves.

**Rule Cards**

- *Similar triangles:* "Same shape, possibly different size. Corresponding angles are equal and corresponding sides are in the same ratio `k`."
- *AA:* "Two equal angles are enough — the third must be equal too."
- *Also valid:* SAS~ (two sides in proportion + included angle equal) and SSS~ (all three sides in proportion).
- *Similar vs. congruent:* "Congruent is similar with `k = 1`."

**Checkpoint rounds**

- R1: Missing side in two similar triangles (random integer `k`)
- R2: Indirect measurement — shadow problem (random numbers, random city)
- R3: Similar or not? — decide using AA, SAS~, or SSS~ and state why

---

## 8. Phase 4 — Question Engine (100 Randomised Questions)

### 8.1 What "randomised" means (requirement)

For every Play session:

1. **Parameters are random.** Every question is generated at runtime from a *template* with random but *valid* values (angles, side lengths, scale factors, names, cities, contexts).
2. **Order is random.** Fisher-Yates shuffle within the world's blueprint (Section 8.3).
3. **Options are random.** Correct answer position is shuffled; distractors are generated from known misconceptions (Section 8.6).
4. **Answers are computed**, never hard-coded — the generator calls the same geometry engine the simulations use.
5. **No repeats within a session.** A parameter-hash set prevents two questions with identical numbers.
6. **No two sessions are alike** (verified by a 1,000-run test; Section 13).

### 8.2 Question Types (10 families)

| Type | Family | Concept | Example (one random draw) | Answer format |
| ---- | ------ | ------- | ------------------------- | ------------- |
| Q1 | Classify | LO1 | "Noah measures a pyramid face with angles 50°, 50°, 80°. Which description fits best?" | MCQ (e.g. *acute isosceles*) |
| Q2 | Angle sum | LO2 | "Sarah's truss triangle has angles `x`, `2x + 10`, `3x − 40`. Find the largest angle." | Numeric |
| Q3 | Exterior angle | LO3 | "In △ABC, the exterior angle at C is 119°. If ∠A = 48°, find ∠B." | Numeric |
| Q4 | Triangle inequality | LO4 | "John has rods of 7 m and 12 m. Which length could the third rod be?" | MCQ / Multi-select |
| Q5 | Pythagoras | LO5 | "Mike's ladder is 13 m long. Its foot is 5 m from the wall. How high does it reach?" | Numeric |
| Q6 | Converse | LO6 | "Aisha measures 20 m, 21 m, 29 m. Is the corner a right angle? Explain with calculation." | MCQ / True-False |
| Q7 | Congruence rule | LO7 | "Two cable-car frames have two equal sides and an equal non-included angle. Are they definitely congruent?" | MCQ |
| Q8 | Similarity | LO8 | "Yuki's 1.6 m friend casts a 2 m shadow. The tower's shadow is 50 m. How tall is the tower?" | Numeric |
| Q9 | Area & perimeter | LO9 | "Sofia's isosceles panel has sides 13, 13, 10. Find its area." | Numeric |
| Q10 | Multi-step reasoning | LO10, LO11 | "Carlos's ramp is 5 m long and rises 3 m. A matching ramp is built at ×2.5 scale. How long is its horizontal run?" | Numeric / Ordered steps |

### 8.3 World Blueprint (10 questions per world)

Each world teaches one idea with **8 focus questions** and **2 spaced-retrieval questions** from earlier worlds (World 1 = 10 focus; World 10 = mixed boss set).

| World | City & landmark | Focus (8 Qs) | Review (2 Qs) | Difficulty ramp (E/M/H) |
| ----- | --------------- | ------------ | ------------- | ----------------------- |
| 1 | **Cairo — Giza Pyramids** | Q1 Classify | — (10 focus) | 5 / 4 / 1 |
| 2 | **Paris — Eiffel Tower** | Q2 Angle sum | Q1 | 3 / 5 / 2 |
| 3 | **Sydney — Harbour Bridge** | Q3 Exterior angle | Q1, Q2 | 3 / 4 / 3 |
| 4 | **London — Tower Bridge** | Q4 Triangle inequality | Q2, Q3 | 3 / 4 / 3 |
| 5 | **New York — Brooklyn Bridge** | Q5 Pythagoras | Q1, Q4 | 3 / 4 / 3 |
| 6 | **Mumbai — Bandra–Worli Sea Link** | Q6 Converse | Q5 ×2 | 2 / 5 / 3 |
| 7 | **Cape Town — Table Mountain Cableway** | Q7 Congruence | Q3, Q6 | 3 / 4 / 3 |
| 8 | **Tokyo — Skytree** | Q8 Similarity | Q5, Q7 | 2 / 5 / 3 |
| 9 | **Rio de Janeiro — Christ the Redeemer** | Q9 Area & perimeter | Q5, Q8 | 2 / 4 / 4 |
| 10 | **Cusco — Machu Picchu (Final Expedition)** | Q10 Multi-step (mixed concepts) | — (10 mixed) | 0 / 4 / 6 |

Overall: ≈ 31 Easy / 42 Medium / 27 Hard across the 100.

### 8.4 Question formats (not only multiple choice)

| Format | Use |
| ------ | --- |
| **MCQ (4 options)** | Classification, congruence rule, ranges |
| **Numeric input (number pad)** | Angle values, side lengths, areas; tolerance ±0.05 for decimals |
| **True / False + "pick the reason"** | Converse, inequality |
| **Multi-select** | "Which of these sets form a triangle?" |
| **Order the reasoning** | Drag 4–5 proof/solution steps into order (LO11) |
| **Spot the Error** | A student's worked solution has one mistake — tap the line that's wrong, then pick the fix (LO11) |
| **Interactive diagram answer** | Drag a vertex to the position that makes a given angle (used sparingly) |

Per world, at least 1 question is *Order the reasoning* or *Spot the Error* (World 10: at least 3).

### 8.5 Generator constraints (so random never means broken)

- **Valid triangle guaranteed:** every angle set sums to 180° with all angles > 0; every side set satisfies the triangle inequality (except Q4 negatives, which are constructed deliberately).
- **Pythagorean triples:** seeded from a table (3-4-5, 5-12-13, 8-15-17, 7-24-25, 20-21-29, 9-40-41) × integer scale 1–5; non-triples allowed only when answer is requested to 1–2 d.p.
- **Algebraic angles:** solutions chosen first (integer `x`), expression coefficients then fitted so every angle is a positive whole number of degrees.
- **Similarity:** scale factors drawn from {1.5, 2, 2.5, 3, 4, 1/2, 2/3, 3/2}; sides forced to be rational so answers are exact or 1 d.p.
- **Congruence/SSA traps:** SSA is generated only with a non-right angle; RHS only when the right angle is explicit.
- **Units:** metric (cm, m); no mixed units unless the question is a unit-trap labelled Hard.
- **Names/cities:** drawn from the global pool with no more than 2 uses of the same name per world.

### 8.6 Distractors from misconceptions

| Template | Typical distractors |
| -------- | ------------------- |
| Q2 angle sum | Using 360°; subtracting from 90°; forgetting one angle |
| Q3 exterior | Using the adjacent interior angle; subtracting from 90°; adding all three |
| Q4 inequality | Using `a + b ≥ c`; range `[a−b, a+b]` inclusive; swapping min/max |
| Q5 Pythagoras | `a + b`; `a² + b²` (no root); `c² − b²` leg treated as hypotenuse |
| Q6 converse | Testing `a² + b = c`; using the wrong "longest" side; claiming right when `>` or `<` |
| Q7 congruence | SSA called "SAS"; AAA called "ASA"; "SSS" for non-matching sides |
| Q8 similarity | Adding the scale difference; using area ratio as side ratio; inverted proportion |
| Q9 area | Missing the ½; using slant side as height; using perimeter instead of area |

### 8.7 Worked examples of generated questions

> The numbers below are **one random draw**; the engine produces fresh numbers every session.

- **Q2 (Medium):** "Sarah's truss triangle has angles `x`, `2x + 10`, and `3x − 40`. Find the largest angle." → `6x − 30 = 180` → `x = 35` → angles `35°, 80°, 65°` → **80°**.
- **Q3 (Medium):** "The exterior angle at C of △ABC is `(4x + 5)°`. The two remote interior angles are `50°` and `(x + 30)°`. Find `x`." → `4x + 5 = x + 80` → **x = 25**.
- **Q5 (Easy):** "Mike's 13 m ladder reaches a wall with its foot 5 m away. How high is the top?" → `√(169 − 25) = 12` → **12 m**.
- **Q6 (Hard):** "Aisha's three cables are 20 m, 21 m, and 29 m. Is the corner a right angle?" → `400 + 441 = 841 = 29²` → **Yes**.
- **Q8 (Medium):** "A 1.6 m student casts a 2 m shadow. The tower's shadow is 50 m. Tower height?" → `1.6/2 = h/50` → **40 m**.
- **Q9 (Hard):** "Isosceles panel sides 13, 13, 10. Area?" → height `√(169 − 25) = 12` → `½ × 10 × 12` = **60**.

**Spot the Error example (Q10-style):**
> *Sofia wrote:* Step 1: `a² + b² = c²`. Step 2: `6² + 8² = c²`. Step 3: `36 + 64 = c²`. Step 4: `c² = 100, so c = 100`.
> *Tap the wrong line.* → **Step 4** (should be `c = √100 = 10`).

### 8.8 Language & Notation Requirements

- Angles in degrees with the `°` symbol; triangles named `△ABC`; sides as `AB`, `BC`, `CA` or lowercase `a`, `b`, `c` opposite the matching vertex
- Congruence `≅`, similarity `∼` — each introduced with a text label the first time
- Right angle marked with a square; equal sides with tick marks; equal angles with arcs
- Pythagorean notation: `a² + b² = c²` with *hypotenuse* named in words in the first appearance
- Square roots shown as `√`; decimals rounded to 1 d.p. unless stated

---

## 9. Gamification Design

### 9.1 Reward System

- **Stars (⭐):** per 10-question world — 1 star for 6–7 correct, 2 stars for 8–9, 3 stars for 10/10
- **XP:** 10 XP correct first try | 7 XP second try | 5 XP third try or hint used
- **Streak 🔥:** fire counter for consecutive correct answers (resets on a wrong first attempt)
- **Streak bonus:** +5 XP per correct answer when streak ≥ 5
- **Station XP:** +20 XP for each station checkpoint passed; +10 bonus for passing round-by-round with no retries
- **Level titles** (cosmetic, from total XP): Apprentice → Surveyor → Engineer → Architect → Master Architect

### 9.2 Badges (Unlockable)

| Badge | How to earn |
| ----- | ----------- |
| 🔺 **Triangle Tamer** | Complete Wonder + Story |
| 📐 **Angle Architect** | Pass Station A |
| 🌉 **Bridge Builder** | Pass Station B with no failed checkpoint round |
| 🌱 **Pythagoras Pro** | Pass Station C |
| 🕵️ **Congruence Detective** | Pass Station D and find the SSA two-triangle case |
| 🌞 **Shadow Surveyor** | Pass Station E |
| 🥇 **Master Builder** | Score ≥ 80% across Play |
| 💎 **Perfect Blueprint** | 10/10 in any world |
| 🔥 **Streak Star** | Streak of 10 correct |
| 🎯 **Sharp Eye** | Correct on 5 Spot-the-Error questions |
| 🌍 **Global Architect** | Complete all 6 phases (lesson-complete badge) |

### 9.3 Feedback Mechanics (encouragement-first)

**✅ Correct:** bounce animation, Trigo happy, celebration audio, floating XP, streak increments.

**❌ Attempt 1 (incorrect):** gentle shake; Hint 1 — a *conceptual nudge* ("Which side is the longest?"); the diagram highlights the relevant part.

**❌ Attempt 2:** Hint 2 — a **mini-simulation replay** (e.g. the tear-and-align animation, a tile-count of the squares, the rods collapsing) specific to the concept.

**❌ Attempt 3:** the answer and a **step-by-step animated worked solution** are shown with narration. No score penalty.

No negative scoring. A wrong first attempt resets the streak but never removes XP.

### 9.4 World Map (IntelliPlay™ Progression — Global Landmarks)

A horizontal, scrollable world map (stacked vertical list on mobile). Each world is a landmark card with lock/unlock, star rating, and best score.

| World | Landmark | Unlock rule |
| ----- | -------- | ----------- |
| 1 | Cairo — Giza Pyramids | Unlocked when Play opens |
| 2 | Paris — Eiffel Tower | ≥6/10 in World 1 |
| 3 | Sydney — Harbour Bridge | ≥6/10 in World 2 |
| 4 | London — Tower Bridge | ≥6/10 in World 3 |
| 5 | New York — Brooklyn Bridge | ≥6/10 in World 4 |
| 6 | Mumbai — Sea Link | ≥6/10 in World 5 |
| 7 | Cape Town — Cableway | ≥6/10 in World 6 |
| 8 | Tokyo — Skytree | ≥6/10 in World 7 |
| 9 | Rio — Christ the Redeemer | ≥6/10 in World 8 |
| 10 | Cusco — Machu Picchu | ≥6/10 in World 9 |

- **Retry:** a world can be replayed; the engine generates a fresh set of 10 questions.
- **3-star Bonus Challenge:** 10/10 unlocks 3 extra "Spot the Error" / "Order the Reasoning" questions for bonus XP.
- **Soft landing:** if a student scores <6/10 twice in a row, Trigo offers a **"Quick Replay"** of the relevant station's Explore beat before the third attempt.

### 9.5 Mascot — "Trigo", the Triangle Robot

- **Character:** a friendly triangle-shaped robot with a compass-arm and a protractor "smile"
- **Mood states:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, station prompts and feedback, hints, Reflect
- **Reactions:** correct answer, badge unlock, streak milestone, world completion, station pass
- **Audio:** all mascot speech via the ElevenLabs Alice voice

---

## 10. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 10.1 Pipeline Summary

- **Voice Provider:** ElevenLabs
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Pre-generation:** `scripts/generate_audio.js` → static `.mp3` in `public/assets/audio/` (all story, station, feedback, badge and hint phrases)
- **Dynamic fallback (primary path for questions):** because Grade 8 question numbers are randomly generated, question text is narrated through the dynamic path, with in-memory + IndexedDB caching and eager preloading
- **Mapping:** auto-generated `src/utils/audioMap.js` (exact text → file path)
- **Cleanup:** `scripts/clean_audio.js` removes orphaned files
- **Engine:** `narrate(segments)` with a `currentQueue` symbol (no overlap), `stopNarration()`, and preloading of segment *i+1* while *i* plays
- **Segment helpers:** `say()`, `ask()`, `cheer()`, `emphasize()`, `think()`, `celebrate()`, `instruct()`

### 10.2 Content Policy — Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated ONLY for paragraph/story text and question text. Titles, headings, world names, station names and section labels are **never** narrated.

### 10.3 Speech Styles Mapped to ElevenLabs Settings

| Style | Stability | Similarity Boost | Style | Speaker Boost | Use case |
| ----- | --------- | ---------------- | ----- | ------------- | -------- |
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ | Badge unlock, world complete, station pass |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ | Hints, wrong-answer support |
| `question` | 0.20 | 0.55 | 0.55 | ✅ | Practice and checkpoint questions |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ | Rule Cards, key vocabulary |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ | Wonder hook, Trigo thinking moments |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ | Story narration, station instructions |

### 10.4 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "Sarah is standing in Paris, looking up at the Eiffel Tower."
> "Hundreds of iron beams make triangles, and almost none make squares. Why would engineers choose triangles? Try pushing the frames and see what happens."

**Phase 2 (Story panel 3) — style: statement**
> "Sarah is in Paris, studying a truss on the Eiffel Tower. She measures two angles: sixty-five degrees and fifty-five degrees. Trigo says the third angle is already decided. How can that be?"

**Phase 3 (Station A instruction) — style: instruction**
> "Drag any corner of the triangle. Watch the three angles and their total. What do you notice?"

**Phase 3 (Rule Card, Angle Sum) — style: emphasis**
> "The three angles of any triangle add up to one hundred eighty degrees. Three corners always fit together on a straight line."

**Phase 3 (Station D) — style: question**
> "You have two sides and an angle that is not between them. Can you build exactly one triangle?"

**Phase 4 (hint 1) — style: encouragement**
> "Not quite. Let's look at the diagram again. Which side is the longest?"

**Phase 4 (correct) — style: celebration**
> "Amazing! You solved it like a true architect!"

**Phase 5 (Reflect) — style: thinking**
> "What an adventure! Pick one triangle rule and tell me why it works, in your own words."

### 10.5 Speech-friendly maths (speakify)

Math is spoken from a deterministic transform so display and audio always share a source:

| Display | Spoken |
| ------- | ------ |
| `65°` | "sixty-five degrees" |
| `△ABC` | "triangle A B C" |
| `∠ABC` | "angle A B C" |
| `a² + b² = c²` | "a squared plus b squared equals c squared" |
| `√144` | "the square root of one hundred forty-four" |
| `△ABC ≅ △DEF` | "triangle A B C is congruent to triangle D E F" |
| `△ABC ∼ △DEF` | "triangle A B C is similar to triangle D E F" |
| `2x + 10` | "two x plus ten" |
| `12.5 cm` | "twelve point five centimeters" |

### 10.6 1:1 Parity Rule

Every narrated string must correspond **word for word** to the on-screen text it accompanies, after the deterministic `speakify()` transform (e.g. `65°` on screen ↔ "sixty-five degrees" in audio; the reference app uses the same convention for times). For static scripts: any UI text change requires updating `generate_audio.js`'s `phrases` array **and** `narration.js`, re-running the generator, and optionally the cleanup script. For generated questions, the display string and the narration string are produced from the **same template object**, so drift is impossible by construction and is additionally covered by an automated parity test.

---

## 11. UX & Visual Design Requirements

### 11.1 Visual Theme

- **Brand:** Intellia — Think. Explore. Become.
- **Reference UI (strict match):** `https://grade5-time-intervals.vercel.app/` and the UI structure in `https://github.com/p1pachare-cloud/Grade5-Time-Intervals`
- **What "strict match" means:** identical layout skeleton (top bar, main area, bottom bar, sidebar behaviour), phase dot tracker, card/rounded-corner/shadow language, button styles, animation set (bounceIn, shake, floatUp, pulseGlow, celebrate, slideInUp), world-map pattern, badge toast, feedback overlay, and mascot placement — with the content swapped for Triangles.
- **Colours & type:** take exact tokens (primary brand blue, reward gold, wrong-answer coral, card whites, shadows, phase-band colours, font family) from the reference repo's `tailwind.config.js` / `App.css` during implementation — **these were not machine-readable at the time of writing this PRD and must be copied, not approximated.** Working placeholder values from the reference TRD: primary blue `#4A90D9`, with rounded type (Nunito/Fredoka-style).
- **Grade 8 tone adjustments (within the same system):** slightly more compact type scale, technical grid backgrounds (blueprint motif) in station canvases, mascot animations quieter than Grade 5 — the *skeleton* stays the same; only *density and tone* mature.
- **Illustrations:** cartoon-line style, globally inclusive characters; landmark silhouettes (pyramids, Eiffel Tower, Sydney Harbour Bridge, Tower Bridge, Brooklyn Bridge, Sea Link, Table Mountain, Skytree, Christ the Redeemer, Machu Picchu).
- **Geometry canvases:** clean SVG; consistent colour coding — sides `a/b/c` (blue/green/orange), interior angles (filled arcs), exterior angles (dashed arcs + coral), right-angle square marker, congruence ticks, similarity ratio chips.

### 11.2 Layout Structure (mirrors the Grade 5 reference)

- **Top Bar:** Intellia logo | lesson title "Triangles" | 6-phase dot tracker | audio toggle
- **Main Area:** phase content (responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | phase navigation arrows
- **Sidebar:** hidden on mobile; vertical phase map on tablet+ (inside Simulate it also lists stations A–E with checkmarks)

### 11.3 Geometry Visual Components (primary visuals)

- `TriangleCanvas` — draggable vertices, live angle arcs, side labels, snapping, tolerance-aware classification
- `RodBridge` — three rods and joints (Station B)
- `SquareGarden` — squares-on-sides with tiles, dissection animation (Station C)
- `ConstructionBench` — compass/ruler construction animation with possibility count (Station D)
- `ShadowScene` — sun, person, tower, shadows, similarity overlay (Station E)
- `RuleCard` — animated summary card (words, symbol, "because…" line)
- `WorkedSolution` — step-by-step animated solution used after the third incorrect attempt

### 11.4 Accessibility

- Touch targets ≥ 44×44 px
- WCAG AA contrast on all text; angle/side colour coding is **never the only cue** (labels + patterns)
- Keyboard-operable: vertices focusable; arrow keys nudge; `Enter` confirms
- All drag interactions have a tap-tap fallback
- Screen-reader labels for diagrams ("Triangle ABC. Angle A is 52 degrees…")
- Optional reduced-motion mode (replaces sweeps with instant states)
- No mandatory time pressure
- All narration is optional; every narrated line is also on screen

### 11.5 Responsive Design

- Primary: desktop (1024px+) and tablet (768px+) — classroom context
- Mobile (375px+): stacked single-column; station canvases keep a minimum 320px drawing area with pinch-safe handles

---

## 12. Content Requirements

### 12.1 Simulation Visuals
- Station A, B, C, D, E canvases as in Section 7, all driven by a shared geometry engine
- Rule Cards (5 stations × 1–3 cards each)
- Worked solutions (one animated template per question family)

### 12.2 Question Bank Coverage
- 10 question-family generators producing 100 questions per session
- ≥ 3 distinct templates per family for wording variety
- Spot-the-Error and Order-the-Reasoning in every world

### 12.3 Word Problem Formats

**Structure sense:** "[Name] is in [City], looking at [landmark feature]. [Measurements]. [Question]?"
**Reasoning sense:** "[Name] says [claim]. Is [he/she] right? Explain with a calculation."
**Multi-step sense:** "[Name] needs [target]. First find [intermediate], then use it to find [answer]."

### 12.4 Audio Script Parity
As in Section 10.6.

---

## 13. Success Criteria (v1.0)

| Criterion | Target |
| --------- | ------ |
| All 5 simulation stations functional with Explore → Formalise → Checkpoint | ✅ Required |
| Play locked until all station checkpoints are passed | ✅ Required |
| All 100 questions generated per session; zero repeated parameter sets | ✅ Required |
| 1,000-run randomisation test: no two identical sessions | ✅ Required |
| Answer correctness verified against geometry engine for 10,000 generated questions | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, streak, 11 badges) working | ✅ Required |
| 10-world progression and unlock logic correct | ✅ Required |
| ElevenLabs audio plays for all static phase narration | ✅ Required |
| Dynamic question narration with preloading, < 2 s perceived latency | ✅ Required |
| Mobile / tablet / desktop responsive | ✅ Required |
| Global Grade 8 triangle syllabus coverage confirmed by curriculum lead | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible; keyboard + tap fallbacks on every drag | ✅ Required |
| UI structure matches the Grade 5 Time Intervals reference | ✅ Required |
| Hosted at the Intellia Grade 8 lesson URL | ✅ Required |

---

## 14. Out of Scope (v1.0)

- Trigonometric ratios (sin/cos/tan), the sine and cosine rules
- Heron's formula, circumcircle/incircle, triangle centres
- Formal two-column proofs (reasoning is supported by Order/Spot-the-Error only)
- Coordinate-geometry derivations
- Teacher dashboard / backend analytics; student accounts; multiplayer
- Printable worksheet generation
- Languages other than English (the audio stack supports a later multilingual release)

---

## 15. Assumptions, Risks & Open Items

| # | Item | Mitigation |
| - | ---- | ---------- |
| 1 | Exact colour/typography tokens of the reference were not machine-readable when drafting | Copy from the reference repo's Tailwind/CSS files before UI work begins |
| 2 | The Intellia Grade 3 course page could not be read by automated tools | Confirm URL pattern and any embedding requirements (iframe, base path, CSP) with the Intellia web team |
| 3 | Reference PRD/TRD conflict on world-unlock threshold (6/10 vs 5/10) | This PRD fixes it at **6/10** |
| 4 | Dynamic audio for random questions increases API usage | Proxy + cache; optional "seeded pool" pre-generation (TRD §9.6) |
| 5 | Dragging precision on small touch screens | Snap-to-grid, large handles, keyboard/tap fallback |
| 6 | Curriculum standard codes need verification | Curriculum lead sign-off before launch |

---

**Document Version:** 1.0 | October 2026
**Product:** Intellia — Grade 8 Math, Triangles
**Lesson Title:** Global Triangle Architects — Triangles
**Curriculum:** Global Grade 8 Mathematics (Common Core, Singapore MOE, UK NC, CBSE/NCERT, Australian Curriculum cross-aligned)
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Parent Course Page:** `https://intelliasg.com/courses/grade-8-math/`
**Lesson URL:** `https://intelliasg.com/courses/grade-8-math/lessons/triangles/`
