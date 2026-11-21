// Tiny WebAudio sound effects for Spot the Difference. No audio files are
// loaded: every sound is a short oscillator phrase built at run time, so the
// game stays fully offline and dependency-free.

let audioCtx = null;
let muted = false;

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tone(freq, startAt, dur, type = 'sine', vol = 0.12) {
  if (muted) return;
  try {
    const ac = ctx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ac.currentTime + startAt);
    gain.gain.exponentialRampToValueAtTime(vol, ac.currentTime + startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + startAt + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime + startAt);
    osc.stop(ac.currentTime + startAt + dur + 0.05);
  } catch {
    // Audio is decoration; a browser that refuses it must never break play.
  }
}

export function playFind() {
  tone(660, 0, 0.12, 'sine', 0.14);
  tone(880, 0.09, 0.16, 'sine', 0.14);
  tone(1320, 0.18, 0.2, 'sine', 0.1);
}

export function playWrong() {
  tone(180, 0, 0.18, 'square', 0.06);
  tone(140, 0.1, 0.22, 'square', 0.06);
}

export function playHint() {
  tone(520, 0, 0.1, 'triangle', 0.1);
  tone(780, 0.08, 0.14, 'triangle', 0.1);
}

export function playClick() {
  tone(440, 0, 0.06, 'triangle', 0.06);
}

export function playWin() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.22, 'sine', 0.14));
}

export function playLevelClear() {
  [392, 523, 659].forEach((f, i) => tone(f, i * 0.1, 0.18, 'sine', 0.12));
}

export function toggleMute() {
  muted = !muted;
  return muted;
}

export function isMuted() {
  return muted;
}
