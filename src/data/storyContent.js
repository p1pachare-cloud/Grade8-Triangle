export const STORY_PANELS = [
  {
    id: 1,
    character: "The Global Architects",
    location: "Global Video Call",
    landmark: "Worldwide Headquarters",
    title: "The Global Skyline Challenge",
    narrationText: "Ten friends. Ten cities. One challenge. John in London, Mike in New York, Sarah in Paris, and seven more friends have joined the Global Skyline Challenge. They must build a skyline using only triangles — and prove that it is safe.",
    detailText: "The International Youth Engineering Fair challenged youth teams across 10 global cities to construct rigid towers and bridges using geometric principles.",
    visualType: "squadIntro",
    badge: "🌍 10 Cities Assembly",
    image: "/story/story_panel_1.png"
  },
  {
    id: 2,
    character: "Noah",
    location: "Cairo, Egypt",
    landmark: "Great Pyramids of Giza",
    title: "Noah's Pyramid Face",
    narrationText: "Noah is in Cairo, measuring the face of a pyramid. Two of its sides are the same length, and every angle is smaller than ninety degrees. What kind of triangle is that?",
    detailText: "With two equal sides, it is an isosceles triangle! And since all angles are less than 90°, it is an acute isosceles triangle.",
    visualType: "pyramidFace",
    badge: "🔺 Classification",
    image: "/story/story_panel_2.png"
  },
  {
    id: 3,
    character: "Sarah",
    location: "Paris, France",
    landmark: "Eiffel Tower",
    title: "Sarah's Iron Truss",
    narrationText: "Sarah is in Paris, studying a truss on the Eiffel Tower. She measures two angles: sixty-five degrees and fifty-five degrees. Trigo says the third angle is already decided. How can that be?",
    detailText: "Because the three interior angles of every triangle always add up to 180°! 180° - 65° - 55° = 60°.",
    visualType: "trussAngle",
    badge: "📐 Angle Sum 180°",
    image: "/story/story_panel_3.png"
  },
  {
    id: 4,
    character: "Emma",
    location: "Sydney, Australia",
    landmark: "Sydney Harbour Bridge",
    title: "Emma's Arch Exterior",
    narrationText: "Emma is in Sydney, looking at the steel arch of the Harbour Bridge. One beam is extended past a corner, making a new angle outside the triangle. Trigo asks: is that outside angle connected to the two angles far away from it?",
    detailText: "Yes! The exterior angle is always equal to the sum of the two remote interior angles opposite to it.",
    visualType: "exteriorAngle",
    badge: "🌉 Exterior Angle",
    image: "/story/story_panel_4.png"
  },
  {
    id: 5,
    character: "John",
    location: "London, UK",
    landmark: "Tower Bridge",
    title: "John's Collapsing Rods",
    narrationText: "John is in London with three steel rods: three, four, and eight meters long. He tries to join them into a triangle, but the ends will not meet. Why not?",
    detailText: "By the Triangle Inequality, the sum of any two sides must be greater than the third: 3 + 4 = 7, which is less than 8! The rods collapse with a gap.",
    visualType: "rodGap",
    badge: "📏 Triangle Inequality",
    image: "/story/story_panel_5.png"
  },
  {
    id: 6,
    character: "Mike",
    location: "New York, USA",
    landmark: "Brooklyn Bridge",
    title: "Mike's Leaning Ladder",
    narrationText: "Mike is in New York. A thirteen-meter ladder leans against a wall with its foot five meters away. How high up the wall does it reach? Trigo whispers: look for the right angle.",
    detailText: "Pythagorean Theorem: a² + b² = c². Here, 5² + h² = 13², so 25 + h² = 169 → h = √144 = 12 meters!",
    visualType: "pythagorasLadder",
    badge: "🪜 a² + b² = c²",
    image: "/story/story_panel_6.png"
  },
  {
    id: 7,
    character: "Liam & Yuki",
    location: "Cape Town & Tokyo",
    landmark: "Table Mountain & Tokyo Skytree",
    title: "The Big Engineering Idea",
    narrationText: "Liam in Cape Town has two identical cable cars, and Yuki in Tokyo has a tower too tall to measure with a ruler. Matching triangles tell them how to build the first — and shadows tell them how tall the second one is. Let's learn every secret, one station at a time!",
    detailText: "Congruence proves exact structural duplicates (SSS, SAS, ASA, AAS, RHS), while Similarity lets us measure unreachable heights with shadows using proportions!",
    visualType: "congruenceSimilarity",
    badge: "🚀 Congruence & Similarity",
    image: "/story/story_panel_7.png"
  }
];
