export const RULE_CARDS = {
  A: {
    station: "Station A: Angle Lab",
    title: "Angle Sum & Exterior Angle Property",
    rules: [
      {
        name: "Angle Sum Property",
        statement: "The three interior angles of any triangle always add up to 180°.",
        formula: "∠A + ∠B + ∠C = 180°",
        why: "Three corners fit together along a straight line (180° straight angle).",
        sentenceWords: ["three", "interior", "angles", "add", "to", "180°"],
        targetSentence: "The three interior angles add to 180°."
      },
      {
        name: "Exterior Angle Property",
        statement: "An exterior angle equals the sum of the two remote interior angles.",
        formula: "∠exterior = ∠remote1 + ∠remote2",
        why: "Both exterior + adjacent interior = 180°, and ∠A + ∠B + ∠C = 180°.",
        sentenceWords: ["exterior", "angle", "equals", "remote", "interior", "sum"],
        targetSentence: "An exterior angle equals remote interior sum."
      }
    ]
  },
  B: {
    station: "Station B: Bridge Builder",
    title: "Triangle Inequality & Side Bounds",
    rules: [
      {
        name: "Triangle Inequality",
        statement: "The sum of the lengths of any two sides must be strictly greater than the third side.",
        formula: "a + b > c,   b + c > a,   a + c > b",
        why: "If a + b < c, the rods cannot reach each other; if a + b = c, they collapse flat.",
        sentenceWords: ["sum", "of", "two", "sides", "greater", "than", "third"],
        targetSentence: "The sum of two sides greater than third."
      },
      {
        name: "Third-Side Range",
        statement: "The third side c must lie strictly between |a − b| and a + b.",
        formula: "|a − b| < c < a + b",
        why: "Minimum length requires closing the difference; maximum requires not stretching flat.",
        sentenceWords: ["third", "side", "between", "difference", "and", "sum"],
        targetSentence: "The third side between difference and sum."
      }
    ]
  },
  C: {
    station: "Station C: Pythagoras Garden",
    title: "Pythagorean Theorem & Converse",
    rules: [
      {
        name: "Pythagorean Theorem",
        statement: "In any right-angled triangle, the square of the hypotenuse equals the sum of squares of the two legs.",
        formula: "a² + b² = c²",
        why: "The areas of the two square gardens built on the legs exactly combine to fill the square on the hypotenuse.",
        sentenceWords: ["square", "of", "hypotenuse", "equals", "sum", "of", "legs", "squared"],
        targetSentence: "The square of hypotenuse equals sum of legs squared."
      },
      {
        name: "Converse of Pythagoras",
        statement: "If a² + b² = c² for the longest side c, the angle opposite c is a right angle (90°). If < c², it is obtuse; if > c², acute.",
        formula: "a² + b² = c²  ⟺  Right Triangle",
        why: "Geometric uniqueness locks the opposite angle to exactly 90°.",
        sentenceWords: ["if", "squares", "match", "triangle", "is", "right", "angled"],
        targetSentence: "If squares match triangle is right angled."
      }
    ]
  },
  D: {
    station: "Station D: Congruence Detective",
    title: "Congruence Criteria (SSS, SAS, ASA, AAS, RHS)",
    rules: [
      {
        name: "The 5 Valid Congruence Rules",
        statement: "Two triangles are congruent (identical in shape and size) if they share: SSS, SAS, ASA, AAS, or RHS.",
        formula: "△ABC ≅ △DEF",
        why: "These 5 conditions uniquely fix the triangle with zero ambiguity.",
        sentenceWords: ["five", "criteria", "prove", "exact", "congruent", "shapes"],
        targetSentence: "Five criteria prove exact congruent shapes."
      },
      {
        name: "Why SSA & AAA Fail",
        statement: "SSA can form TWO different triangles (ambiguous case). AAA fixes angles but allows any size (similarity, not congruence).",
        formula: "SSA ❌ (Ambiguous)   |   AAA ❌ (Scale free)",
        why: "The swinging rod cuts the base twice in SSA; AAA lets triangles scale up or down freely.",
        sentenceWords: ["SSA", "is", "ambiguous", "and", "AAA", "changes", "size"],
        targetSentence: "SSA is ambiguous and AAA changes size."
      }
    ]
  },
  E: {
    station: "Station E: Shadow Surveyor",
    title: "Similarity Criteria & Indirect Measurement",
    rules: [
      {
        name: "Similar Triangles",
        statement: "Two triangles are similar if corresponding angles are equal and corresponding sides are in the same ratio k.",
        formula: "△ABC ∼ △DEF  ⟺  AB/DE = BC/EF = AC/DF = k",
        why: "AA (two equal angles) guarantees the third angle matches and fixes the shape.",
        sentenceWords: ["corresponding", "sides", "in", "same", "ratio", "k"],
        targetSentence: "Corresponding sides in same ratio k."
      },
      {
        name: "Indirect Shadow Measurement",
        statement: "Since sun rays cast equal angles, (object height / shadow) is constant for all vertical objects.",
        formula: "Height / Shadow = Tower / Tower Shadow",
        why: "Right triangles sharing the solar angle are similar by AA.",
        sentenceWords: ["shadow", "proportions", "measure", "unreachable", "heights"],
        targetSentence: "Shadow proportions measure unreachable heights."
      }
    ]
  }
};

export const GLOSSARY = [
  { term: "Equilateral", definition: "A triangle with all 3 sides equal and all 3 angles equal to 60°." },
  { term: "Isosceles", definition: "A triangle with at least 2 equal sides and 2 equal base angles." },
  { term: "Scalene", definition: "A triangle with all 3 sides having different lengths." },
  { term: "Acute Triangle", definition: "A triangle where all 3 interior angles are strictly less than 90°." },
  { term: "Right Triangle", definition: "A triangle with one angle measuring exactly 90°." },
  { term: "Obtuse Triangle", definition: "A triangle with one angle measuring strictly greater than 90°." },
  { term: "Hypotenuse", definition: "The longest side in a right-angled triangle, opposite the 90° angle." },
  { term: "Legs", definition: "The two shorter sides adjacent to the right angle in a right triangle." },
  { term: "Exterior Angle", definition: "An angle formed outside a triangle by extending one of its sides." },
  { term: "Remote Interior", definition: "The two interior angles not adjacent to the exterior angle." },
  { term: "Congruent (≅)", definition: "Identical in both shape and size. All corresponding sides and angles match." },
  { term: "Similar (∼)", definition: "Identical in shape with equal angles, but side lengths are scaled by ratio k." },
  { term: "Scale Factor (k)", definition: "The constant multiplier connecting corresponding sides of similar figures." }
];
