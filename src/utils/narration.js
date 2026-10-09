import { say, ask, cheer, think, instruct, celebrate, emphasize } from './audio';
import { STORY_PANELS } from '../data/storyContent';

export function wonderNarration() {
  return [
    think("Sarah is standing in Paris, looking up at the Eiffel Tower."),
    ask("Hundreds of iron beams make triangles, and almost none make squares. Why would engineers choose triangles? Try pushing the frames and see what happens."),
    cheer("Notice how the square frame wobbles and skews, but the triangle frame is completely rigid! Let's discover why!")
  ];
}

export function getStoryNarration(panelIndex) {
  const panel = STORY_PANELS[panelIndex];
  if (!panel) return [];

  // Important: Audio is generated ONLY for paragraph text and questions. Never titles or headings!
  if (panel.id === 1) {
    return [say(panel.narrationText)];
  }
  if (panel.id === 2 || panel.id === 4) {
    return [ask(panel.narrationText)];
  }
  if (panel.id === 3 || panel.id === 5 || panel.id === 6) {
    return [say(panel.narrationText)];
  }
  return [cheer(panel.narrationText)];
}

export function stationInstructionNarration(stationLetter) {
  switch (stationLetter) {
    case 'A':
      return [instruct("Drag any corner of the triangle. Watch the three angles and their total. What do you notice?")];
    case 'B':
      return [instruct("Slide the three rods to see when they can close into a bridge truss and when they collapse.")];
    case 'C':
      return [instruct("Count the tiles on each square garden. Watch how the squares on the two legs combine to match the square on the longest side.")];
    case 'D':
      return [instruct("Inspect the case file and test your evidence. Can your combination build exactly one triangle, or is it ambiguous?")];
    case 'E':
      return [instruct("Slide the sun to see the shadows stretch. Notice that the ratio of height to shadow stays exactly the same.")];
    default:
      return [];
  }
}

export function stationRuleNarration(stationLetter) {
  switch (stationLetter) {
    case 'A':
      return [emphasize("The three interior angles of any triangle add up to one hundred eighty degrees. Three corners always fit together on a straight line.")];
    case 'B':
      return [emphasize("The sum of any two sides must always be greater than the third side. Otherwise the rods cannot meet.")];
    case 'C':
      return [emphasize("In any right-angled triangle, a squared plus b squared equals c squared.")];
    case 'D':
      return [emphasize("SSS, SAS, ASA, AAS, and RHS lock a triangle. But SSA can give two shapes, and AAA gives any size.")];
    case 'E':
      return [emphasize("Similar triangles have the exact same shape and matching angles. All corresponding sides scale by the same factor.")];
    default:
      return [];
  }
}

export function correctNarration() {
  return [celebrate("Amazing! You solved it like a true architect!")];
}

export function incorrectNarration() {
  return [cheer("Not quite. Let's look at the diagram again. Which side is the longest?")];
}

export function reflectNarration() {
  return [think("What an adventure! Pick one triangle rule and explain why it works in your own words.")];
}
