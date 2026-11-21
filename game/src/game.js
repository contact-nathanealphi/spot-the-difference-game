// Spot the Difference — game controller: draws the two panels, handles
// clicks, hints, the countdown, scoring and the level flow. The two panels
// are painted from the same scene code (see scenes.js); the right panel is
// the changed copy. A difference found in either panel is circled in both.

import { LEVELS, PANEL_W, PANEL_H } from './levels.js';
import { drawScene } from './scenes.js';
import {
  playFind, playWrong, playHint, playClick, playWin, playLevelClear,
  toggleMute, isMuted,
} from './audio.js';

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const PANEL_GAP = 40;
const PANEL_Y = 12;
const LEFT_X = 10;
const RIGHT_X = LEFT_X + PANEL_W + PANEL_GAP;

const state = {
  levelIndex: 0,
  found: new Set(),
  pulses: [],
  misses: [],
  hintPulse: null,
  score: 0,
  combo: 0,
  bestCombo: 0,
  timeLeft: LEVELS[0].timeLimit,
  hintsLeft: LEVELS[0].hints,
  phase: 'playing', // playing | levelClear | gameWon | timeUp
  paused: false,
  staged: false,
  lastTick: 0,
  toast: '',
  toastUntil: 0,
  foundOrder: [],
};

const $ = (id) => document.getElementById(id);

function level() {
  return LEVELS[state.levelIndex];
}

function foundCount() {
  return state.found.size;
}

function remainingCount() {
  return level().diffs.length - state.found.size;
}

function formatTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function updateHud() {
  const lv = level();
  $('levelName').textContent = lv.name;
  $('levelBlurb').textContent = lv.blurb;
  $('foundCount').textContent = `${foundCount()} / ${lv.diffs.length}`;
  $('remainCount').textContent = String(remainingCount());
  $('timer').textContent = formatTime(state.timeLeft);
  $('timer').classList.toggle('danger', state.timeLeft <= 30 && state.phase === 'playing');
  $('score').textContent = String(state.score);
  $('combo').textContent = state.combo > 1 ? `x${state.combo} combo` : '';
  $('hintsLeft').textContent = String(state.hintsLeft);
  $('hintBtn').disabled = state.hintsLeft <= 0 || state.phase !== 'playing';
  $('levelDots').innerHTML = LEVELS.map((l, i) => {
    const cls = i < state.levelIndex ? 'done' : i === state.levelIndex ? 'now' : '';
    return `<span class="dot ${cls}" title="${l.name}">${i + 1}</span>`;
  }).join('');
  renderChips();
}

function renderChips() {
  const lv = level();
  $('chips').innerHTML = lv.diffs.map((d) => {
    const got = state.found.has(d.id);
    return `<span class="chip ${got ? 'found' : ''}">${got ? '✓ ' : '· '}${got ? d.label : '???'}</span>`;
  }).join('');
}

function drawPanel(px, right) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, PANEL_Y, PANEL_W, PANEL_H);
  ctx.clip();
  ctx.translate(px, PANEL_Y);
  drawScene(ctx, level().scene, right);
  ctx.restore();
  // Panel frame and tag.
  ctx.lineWidth = 4;
  ctx.strokeStyle = right ? '#c94f4f' : '#2f7a4a';
  ctx.strokeRect(px, PANEL_Y, PANEL_W, PANEL_H);
  ctx.fillStyle = right ? '#c94f4f' : '#2f7a4a';
  ctx.font = 'bold 14px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(right ? 'RIGHT  ·  FIND THE CHANGES' : 'LEFT  ·  ORIGINAL', px + 10, PANEL_Y + 22);
}

function drawMarkers(now) {
  const lv = level();
  lv.diffs.forEach((d) => {
    if (!state.found.has(d.id)) return;
    [LEFT_X, RIGHT_X].forEach((px) => {
      const cx = px + d.x;
      const cy = PANEL_Y + d.y;
      ctx.strokeStyle = '#ffd93b';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy, d.r + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#2f7a1e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, d.r + 8, 0, Math.PI * 2);
      ctx.stroke();
      // Check mark.
      ctx.strokeStyle = '#2f7a1e';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx - 3, cy + 8);
      ctx.lineTo(cx + 12, cy - 8);
      ctx.stroke();
    });
  });
  // Fresh-find pulse rings.
  state.pulses = state.pulses.filter((p) => now - p.at < 900);
  state.pulses.forEach((p) => {
    const age = (now - p.at) / 900;
    const alpha = 1 - age;
    [LEFT_X, RIGHT_X].forEach((px) => {
      ctx.strokeStyle = `rgba(255, 217, 59, ${alpha})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(px + p.x, PANEL_Y + p.y, p.r + 6 + age * 22, 0, Math.PI * 2);
      ctx.stroke();
    });
  });
  // Miss X marks.
  state.misses = state.misses.filter((m) => now - m.at < 700);
  state.misses.forEach((m) => {
    const age = (now - m.at) / 700;
    ctx.strokeStyle = `rgba(201, 60, 60, ${1 - age})`;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    const s = 10;
    ctx.beginPath();
    ctx.moveTo(m.x - s, m.y - s); ctx.lineTo(m.x + s, m.y + s);
    ctx.moveTo(m.x + s, m.y - s); ctx.lineTo(m.x - s, m.y + s);
    ctx.stroke();
  });
  // Hint pulse: a golden ring breathing over one unfound difference.
  if (state.hintPulse) {
    const d = state.hintPulse;
    const breathe = 1 + 0.12 * Math.sin(now / 180);
    [LEFT_X, RIGHT_X].forEach((px) => {
      ctx.strokeStyle = '#ffb703';
      ctx.lineWidth = 4;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(px + d.x, PANEL_Y + d.y, (d.r + 10) * breathe, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }
  // Toast text.
  if (now < state.toastUntil && state.toast) {
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    const tw = ctx.measureText(state.toast).width + 36;
    ctx.fillStyle = 'rgba(20, 30, 20, 0.85)';
    ctx.fillRect(canvas.width / 2 - tw / 2, PANEL_Y + PANEL_H - 52, tw, 36);
    ctx.fillStyle = '#ffd93b';
    ctx.fillText(state.toast, canvas.width / 2, PANEL_Y + PANEL_H - 27);
  }
}

function drawOverlays() {
  if (state.phase === 'levelClear' || state.phase === 'gameWon' || state.phase === 'timeUp') {
    ctx.fillStyle = 'rgba(15, 20, 35, 0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    if (state.phase === 'gameWon') {
      ctx.fillStyle = '#ffd93b';
      ctx.font = 'bold 52px sans-serif';
      ctx.fillText('🏆 YOU FOUND THEM ALL!', canvas.width / 2, 190);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px sans-serif';
      ctx.fillText(`All ${LEVELS.reduce((n, l) => n + l.diffs.length, 0)} differences across 3 scenes — final score ${state.score}`, canvas.width / 2, 240);
      ctx.font = '20px sans-serif';
      ctx.fillText(`Best combo x${state.bestCombo}  ·  Press R to play again`, canvas.width / 2, 280);
    } else if (state.phase === 'levelClear') {
      ctx.fillStyle = '#ffd93b';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText('LEVEL CLEAR!', canvas.width / 2, 190);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px sans-serif';
      ctx.fillText(`${level().name} — every difference found. Bonus +${Math.round(state.timeLeft) * 5} points`, canvas.width / 2, 240);
      ctx.font = '20px sans-serif';
      ctx.fillText('Press N or click Next Level — the next scene is harder', canvas.width / 2, 280);
    } else {
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 46px sans-serif';
      ctx.fillText("TIME'S UP!", canvas.width / 2, 190);
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px sans-serif';
      ctx.fillText(`You found ${foundCount()} of ${level().diffs.length} differences. So close — try again!`, canvas.width / 2, 240);
      ctx.font = '20px sans-serif';
      ctx.fillText('Press R to retry this level', canvas.width / 2, 280);
    }
  }
}

function render(now) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#efe6d0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawPanel(LEFT_X, false);
  drawPanel(RIGHT_X, true);
  drawMarkers(now);
  drawOverlays();
}

function loop(now) {
  if (!state.staged && state.phase === 'playing' && !state.paused) {
    const dt = state.lastTick ? (now - state.lastTick) / 1000 : 0;
    state.timeLeft -= dt;
    if (state.timeLeft <= 0) {
      state.timeLeft = 0;
      state.phase = 'timeUp';
      playWrong();
      showOverlayButtons();
    }
    updateHud();
  }
  state.lastTick = now;
  render(now);
  requestAnimationFrame(loop);
}

function showOverlayButtons() {
  $('nextBtn').style.display = state.phase === 'levelClear' ? '' : 'none';
  $('retryBtn').style.display = state.phase === 'timeUp' ? '' : 'none';
  $('againBtn').style.display = state.phase === 'gameWon' ? '' : 'none';
}

function markFound(d, now) {
  state.found.add(d.id);
  state.foundOrder.push(d.id);
  state.combo += 1;
  state.bestCombo = Math.max(state.bestCombo, state.combo);
  const points = 100 * state.combo;
  state.score += points;
  state.pulses.push({ x: d.x, y: d.y, r: d.r, at: now });
  state.hintPulse = null;
  state.toast = `+${points}  ·  ${d.label}`;
  state.toastUntil = now + 1800;
  playFind();
  updateHud();
  if (foundCount() === level().diffs.length) {
    const bonus = Math.round(state.timeLeft) * 5;
    state.score += bonus;
    if (state.levelIndex === LEVELS.length - 1) {
      state.phase = 'gameWon';
      playWin();
    } else {
      state.phase = 'levelClear';
      playLevelClear();
    }
    updateHud();
    showOverlayButtons();
  }
}

function handleClick(ev) {
  if (state.phase !== 'playing' || state.paused) return;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (ev.clientX - rect.left) * scaleX;
  const y = (ev.clientY - rect.top) * scaleY;
  let panelX = null;
  let localX = 0;
  if (x >= LEFT_X && x <= LEFT_X + PANEL_W) { panelX = LEFT_X; localX = x - LEFT_X; }
  else if (x >= RIGHT_X && x <= RIGHT_X + PANEL_W) { panelX = RIGHT_X; localX = x - RIGHT_X; }
  else return;
  const localY = y - PANEL_Y;
  if (localY < 0 || localY > PANEL_H) return;
  const now = performance.now();
  const hit = level().diffs.find((d) => {
    if (state.found.has(d.id)) return false;
    const dx = localX - d.x;
    const dy = localY - d.y;
    return Math.hypot(dx, dy) <= d.r + 10;
  });
  if (hit) {
    markFound(hit, now);
  } else {
    state.combo = 0;
    state.timeLeft = Math.max(0, state.timeLeft - 5);
    state.score = Math.max(0, state.score - 10);
    state.misses.push({ x, y, at: now });
    state.toast = 'Not there — minus 5 seconds!';
    state.toastUntil = now + 1400;
    playWrong();
    updateHud();
  }
}

function useHint() {
  if (state.phase !== 'playing' || state.hintsLeft <= 0) return;
  const remaining = level().diffs.filter((d) => !state.found.has(d.id));
  if (!remaining.length) return;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  state.hintsLeft -= 1;
  state.hintPulse = pick;
  state.toast = `Hint: look near the ${pick.label.toLowerCase()}…`;
  state.toastUntil = performance.now() + 2500;
  playHint();
  updateHud();
}

function startLevel(index) {
  state.levelIndex = index;
  state.found = new Set();
  state.foundOrder = [];
  state.pulses = [];
  state.misses = [];
  state.hintPulse = null;
  state.combo = 0;
  state.timeLeft = level().timeLimit;
  state.hintsLeft = level().hints;
  state.phase = 'playing';
  state.toast = '';
  $('nextBtn').style.display = 'none';
  $('retryBtn').style.display = 'none';
  $('againBtn').style.display = 'none';
  updateHud();
}

function nextLevel() {
  if (state.levelIndex < LEVELS.length - 1) startLevel(state.levelIndex + 1);
}

function restartAll() {
  state.score = 0;
  state.bestCombo = 0;
  startLevel(0);
}

function applyShotPreset(shot) {
  state.staged = true;
  state.paused = true;
  const now = performance.now();
  if (shot === 'cover') {
    startLevel(0);
    [0, 2, 4, 6, 9].forEach((i) => {
      const d = level().diffs[i];
      state.found.add(d.id);
      state.foundOrder.push(d.id);
    });
    state.score = 500;
    state.timeLeft = 187;
  } else if (shot === 'find') {
    startLevel(0);
    const d = level().diffs[2];
    state.found.add(d.id);
    state.foundOrder.push(d.id);
    state.pulses.push({ x: d.x, y: d.y, r: d.r, at: now });
    state.score = 100;
    state.combo = 1;
    state.timeLeft = 228;
    state.toast = '+100  ·  The cat vanished';
    state.toastUntil = now + 60000;
  } else if (shot === 'level2') {
    startLevel(1);
    [1, 5, 8].forEach((i) => {
      const d = level().diffs[i];
      state.found.add(d.id);
      state.foundOrder.push(d.id);
    });
    state.score = 1450;
    state.timeLeft = 164;
  } else if (shot === 'win') {
    startLevel(2);
    level().diffs.forEach((d) => {
      state.found.add(d.id);
      state.foundOrder.push(d.id);
    });
    state.score = 6840;
    state.bestCombo = 6;
    state.timeLeft = 41;
    state.phase = 'gameWon';
    showOverlayButtons();
  }
  updateHud();
  render(now);
  window.__shotReady = true;
}

canvas.addEventListener('click', handleClick);
$('hintBtn').addEventListener('click', () => { playClick(); useHint(); });
$('nextBtn').addEventListener('click', () => { playClick(); nextLevel(); });
$('retryBtn').addEventListener('click', () => { playClick(); startLevel(state.levelIndex); });
$('againBtn').addEventListener('click', () => { playClick(); restartAll(); });
$('restartBtn').addEventListener('click', () => { playClick(); startLevel(state.levelIndex); });
$('soundBtn').addEventListener('click', () => {
  const m = toggleMute();
  $('soundBtn').textContent = m ? '🔇 Sound off' : '🔊 Sound on';
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'h' || ev.key === 'H') useHint();
  else if (ev.key === 'r' || ev.key === 'R') {
    if (state.phase === 'gameWon') restartAll();
    else startLevel(state.levelIndex);
  } else if (ev.key === 'n' || ev.key === 'N') {
    if (state.phase === 'levelClear') nextLevel();
  }
});

const params = new URLSearchParams(window.location.search);
const shot = params.get('shot');
if (shot) {
  applyShotPreset(shot);
} else {
  startLevel(0);
  requestAnimationFrame(loop);
}
