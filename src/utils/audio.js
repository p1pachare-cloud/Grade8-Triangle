import { audioMap } from './audioMap';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

let currentAudio = null;
let activeQueueSymbol = null;
const elevenLabsCache = new Map();

export function say(text) { return { text, style: 'statement' }; }
export function ask(text) { return { text, style: 'question' }; }
export function cheer(text) { return { text, style: 'encouragement' }; }
export function emphasize(text) { return { text, style: 'emphasis' }; }
export function think(text) { return { text, style: 'thinking' }; }
export function celebrate(text) { return { text, style: 'celebration' }; }
export function instruct(text) { return { text, style: 'instruction' }; }

export function stopNarration() {
  activeQueueSymbol = Symbol();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) {
    return audioMap[text];
  }

  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) {
    return elevenLabsCache.get(cacheKey);
  }

  const apiKey = import.meta.env?.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const styleSettings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
    const response = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2',
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: styleSettings,
        }),
      }
    );

    if (!response.ok) return null;
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    elevenLabsCache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.warn('ElevenLabs API audio generation fallback:', err);
    return null;
  }
}

function playAudioFile(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      currentAudio = null;
      resolve();
    };
    audio.play().catch(() => {
      currentAudio = null;
      resolve();
    });
  });
}

function speakWithWebSpeech(text) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.08;
    
    // Pick female educator voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK English Female') || v.name.includes('Zira') || v.lang.startsWith('en')));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export async function narrate(segments, enabled = true, onSegmentStart = null) {
  if (!enabled || !segments || segments.length === 0) return;
  stopNarration();
  const queueSymbol = Symbol();
  activeQueueSymbol = queueSymbol;

  for (let i = 0; i < segments.length; i++) {
    if (activeQueueSymbol !== queueSymbol) break;
    const seg = segments[i];
    if (onSegmentStart) onSegmentStart(i, seg);

    const audioUrl = await getAudioUrl(seg.text, seg.style);
    if (activeQueueSymbol !== queueSymbol) break;

    if (audioUrl) {
      await playAudioFile(audioUrl);
    } else {
      // Clean speech synthesis fallback
      await speakWithWebSpeech(seg.text);
    }
  }
}

// ================= Web Audio SFX Synthesizer =================
let audioCtx = null;
function getAudioCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChime() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.18, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.45);
    });
  } catch (e) {}
}

export function playBuzz() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.2);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {}
}

export function playFanfare() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.2, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.65);
    });
  } catch (e) {}
}

export function playClick() {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (e) {}
}
