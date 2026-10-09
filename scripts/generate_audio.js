import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envLocalPath = path.resolve(__dirname, '../.env.local');
let envKey = '';
if (fs.existsSync(envLocalPath)) {
  const match = fs.readFileSync(envLocalPath, 'utf8').match(/VITE_ELEVENLABS_API_KEY=(.+)/);
  if (match) envKey = match[1].trim();
}

const API_KEY = process.env.ELEVENLABS_API_KEY || process.env.VITE_ELEVENLABS_API_KEY || envKey;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

export const phrases = [
  // Phase 1 — Wonder
  {
    text: "Sarah is standing in Paris, looking up at the Eiffel Tower.",
    style: "thinking",
    filename: "audio_wonder_hook_0.mp3"
  },
  {
    text: "Hundreds of iron beams make triangles, and almost none make squares. Why would engineers choose triangles? Try pushing the frames and see what happens.",
    style: "question",
    filename: "audio_wonder_hook_1.mp3"
  },
  {
    text: "Notice how the square frame wobbles and skews, but the triangle frame is completely rigid! Let's discover why!",
    style: "encouragement",
    filename: "audio_wonder_hook_2.mp3"
  },

  // Phase 2 — Story
  {
    text: "Ten friends. Ten cities. One challenge. John in London, Mike in New York, Sarah in Paris, and seven more friends have joined the Global Skyline Challenge. They must build a skyline using only triangles — and prove that it is safe.",
    style: "statement",
    filename: "audio_story_panel1.mp3"
  },
  {
    text: "Noah is in Cairo, measuring the face of a pyramid. Two of its sides are the same length, and every angle is smaller than ninety degrees. What kind of triangle is that?",
    style: "question",
    filename: "audio_story_panel2.mp3"
  },
  {
    text: "Sarah is in Paris, studying a truss on the Eiffel Tower. She measures two angles: sixty-five degrees and fifty-five degrees. Trigo says the third angle is already decided. How can that be?",
    style: "statement",
    filename: "audio_story_panel3.mp3"
  },
  {
    text: "Emma is in Sydney, looking at the steel arch of the Harbour Bridge. One beam is extended past a corner, making a new angle outside the triangle. Trigo asks: is that outside angle connected to the two angles far away from it?",
    style: "question",
    filename: "audio_story_panel4.mp3"
  },
  {
    text: "John is in London with three steel rods: three, four, and eight meters long. He tries to join them into a triangle, but the ends will not meet. Why not?",
    style: "statement",
    filename: "audio_story_panel5.mp3"
  },
  {
    text: "Mike is in New York. A thirteen-meter ladder leans against a wall with its foot five meters away. How high up the wall does it reach? Trigo whispers: look for the right angle.",
    style: "statement",
    filename: "audio_story_panel6.mp3"
  },
  {
    text: "Liam in Cape Town has two identical cable cars, and Yuki in Tokyo has a tower too tall to measure with a ruler. Matching triangles tell them how to build the first — and shadows tell them how tall the second one is. Let's learn every secret, one station at a time!",
    style: "encouragement",
    filename: "audio_story_panel7.mp3"
  },

  // Phase 3 — Simulations
  {
    text: "Drag any corner of the triangle. Watch the three angles and their total. What do you notice?",
    style: "instruction",
    filename: "audio_sim_station_a.mp3"
  },
  {
    text: "The three interior angles of any triangle add up to one hundred eighty degrees. Three corners always fit together on a straight line.",
    style: "emphasis",
    filename: "audio_sim_station_a_rule.mp3"
  },
  {
    text: "Slide the three rods to see when they can close into a bridge truss and when they collapse.",
    style: "instruction",
    filename: "audio_sim_station_b.mp3"
  },
  {
    text: "The sum of any two sides must always be greater than the third side. Otherwise the rods cannot meet.",
    style: "emphasis",
    filename: "audio_sim_station_b_rule.mp3"
  },
  {
    text: "Count the tiles on each square garden. Watch how the squares on the two legs combine to match the square on the longest side.",
    style: "instruction",
    filename: "audio_sim_station_c.mp3"
  },
  {
    text: "In any right-angled triangle, a squared plus b squared equals c squared.",
    style: "emphasis",
    filename: "audio_sim_station_c_rule.mp3"
  },
  {
    text: "Inspect the case file and test your evidence. Can your combination build exactly one triangle, or is it ambiguous?",
    style: "instruction",
    filename: "audio_sim_station_d.mp3"
  },
  {
    text: "SSS, SAS, ASA, AAS, and RHS lock a triangle. But SSA can give two shapes, and AAA gives any size.",
    style: "emphasis",
    filename: "audio_sim_station_d_rule.mp3"
  },
  {
    text: "Slide the sun to see the shadows stretch. Notice that the ratio of height to shadow stays exactly the same.",
    style: "instruction",
    filename: "audio_sim_station_e.mp3"
  },
  {
    text: "Similar triangles have the exact same shape and matching angles. All corresponding sides scale by the same factor.",
    style: "emphasis",
    filename: "audio_sim_station_e_rule.mp3"
  },

  // Phase 4 & Feedback
  {
    text: "Amazing! You solved it like a true architect!",
    style: "celebration",
    filename: "audio_celebrate.mp3"
  },
  {
    text: "Not quite. Let's look at the diagram again. Which side is the longest?",
    style: "encouragement",
    filename: "audio_encouragement.mp3"
  },
  {
    text: "What an adventure! Pick one triangle rule and explain why it works in your own words.",
    style: "thinking",
    filename: "audio_reflect.mp3"
  }
];

async function generate() {
  if (!API_KEY) {
    console.log('No ElevenLabs API key found. Skipping static generation; client fallback enabled.');
    return;
  }
  const outDir = path.resolve(__dirname, '../public/assets/audio');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const item of phrases) {
    const dest = path.join(outDir, item.filename);
    if (fs.existsSync(dest)) {
      console.log(`Skipping already generated: ${item.filename}`);
      continue;
    }
    console.log(`Generating: ${item.filename}...`);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: item.text,
          model_id: MODEL_ID,
          voice_settings: STYLE_SETTINGS[item.style] || STYLE_SETTINGS.statement,
        }),
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log(`Saved: ${dest}`);
      } else {
        console.error(`Failed ${item.filename}: ${res.statusText}`);
      }
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      console.error(`Error generating ${item.filename}:`, e);
    }
  }

  // Update src/utils/audioMap.js
  const mapPath = path.resolve(__dirname, '../src/utils/audioMap.js');
  const lines = [
    '// audioMap.js — Exact text to pre-generated static audio asset mapping',
    '',
    'export const audioMap = {'
  ];
  phrases.forEach((p, idx) => {
    const comma = idx === phrases.length - 1 ? '' : ',';
    lines.push(`  ${JSON.stringify(p.text)}: "/assets/audio/${p.filename}"${comma}`);
  });
  lines.push('};', '');
  fs.writeFileSync(mapPath, lines.join('\n'), 'utf8');
  console.log(`Updated audio map at: ${mapPath}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generate();
}
