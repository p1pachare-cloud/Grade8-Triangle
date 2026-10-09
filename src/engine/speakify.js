// speakify.js — Convert math notation to natural spoken English for Alice

export function speakify(text) {
  if (!text) return '';
  return text
    .replace(/△([A-Z]{3})/g, 'triangle $1')
    .replace(/∠([A-Z]{1,3})/g, 'angle $1')
    .replace(/(\d+)°/g, '$1 degrees')
    .replace(/a² \+ b² = c²/g, 'a squared plus b squared equals c squared')
    .replace(/(\w+)²/g, '$1 squared')
    .replace(/√(\d+)/g, 'the square root of $1')
    .replace(/≅/g, 'is congruent to')
    .replace(/∼/g, 'is similar to')
    .replace(/(\d+)\s*cm²/g, '$1 square centimeters')
    .replace(/(\d+)\s*m²/g, '$1 square meters')
    .replace(/(\d+)\s*cm/g, '$1 centimeters')
    .replace(/(\d+)\s*m/g, '$1 meters')
    .replace(/½/g, 'one half');
}
