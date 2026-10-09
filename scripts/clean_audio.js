import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const audioDir = path.resolve(__dirname, '../public/assets/audio');

if (!fs.existsSync(audioDir)) {
  console.log('Audio directory does not exist.');
  process.exit(0);
}

const referencedFiles = new Set(
  Object.values(audioMap).map((url) => path.basename(url))
);

const allFiles = fs.readdirSync(audioDir);
let deletedCount = 0;

for (const file of allFiles) {
  if (file.endsWith('.mp3') && !referencedFiles.has(file)) {
    const filePath = path.join(audioDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted unused audio: ${file}`);
    deletedCount++;
  }
}

console.log(`Cleanup complete. Removed ${deletedCount} unused audio files.`);
