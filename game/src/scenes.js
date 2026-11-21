// Scene painters for Spot the Difference. Every scene is drawn twice — once
// for the left panel, once for the right — and `right` switches on the small
// changes listed in levels.js. All art is original flat-colour vector art
// painted with plain canvas calls: no images, no network, no library.

export function drawScene(ctx, sceneId, right) {
  if (sceneId === 'livingRoom') drawLivingRoom(ctx, right);
  else if (sceneId === 'garden') drawGarden(ctx, right);
  else drawNightCafe(ctx, right);
}

function circle(ctx, x, y, r, fill, stroke) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function box(ctx, x, y, w, h, fill, stroke) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  if (stroke) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.strokeRect(x, y, w, h);
  }
}

function ellipse(ctx, x, y, rx, ry, fill, stroke) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

// ---------------------------------------------------------------- living room
function drawLivingRoom(ctx, right) {
  // Wall and floor.
  box(ctx, 0, 0, 560, 300, '#f6dfba');
  box(ctx, 0, 300, 560, 140, '#b07a45');
  ctx.fillStyle = '#9c6a38';
  for (let x = 0; x < 560; x += 56) ctx.fillRect(x, 300, 3, 140);
  // Rug.
  ellipse(ctx, 280, 424, 210, 22, '#c94f4f');
  ellipse(ctx, 280, 424, 170, 16, '#e8b04b');
  if (!right) ellipse(ctx, 280, 424, 120, 10, '#c94f4f');

  // Window with sky.
  box(ctx, 30, 30, 140, 150, '#8ec9e8', '#5a4632');
  box(ctx, 40, 40, 120, 130, '#bfe6f7');
  if (!right) {
    circle(ctx, 98, 96, 22, '#ffd93b', '#e8a90c');
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.strokeStyle = '#ffd93b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(98 + Math.cos(a) * 28, 96 + Math.sin(a) * 28);
      ctx.lineTo(98 + Math.cos(a) * 36, 96 + Math.sin(a) * 36);
      ctx.stroke();
    }
  } else {
    ellipse(ctx, 98, 96, 26, 14, '#ffffff');
    ellipse(ctx, 84, 88, 16, 11, '#ffffff');
    ellipse(ctx, 112, 88, 16, 11, '#ffffff');
  }
  ctx.strokeStyle = '#5a4632';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(100, 40); ctx.lineTo(100, 170);
  ctx.moveTo(40, 105); ctx.lineTo(160, 105);
  ctx.stroke();
  // Curtains: left panel always, right panel only on the left side.
  box(ctx, 18, 24, 22, 162, '#d96a6a', '#a84a4a');
  if (!right) box(ctx, 150, 24, 22, 162, '#d96a6a', '#a84a4a');

  // Painting above the sofa.
  box(ctx, 226, 46, 100, 80, '#7a5a34');
  box(ctx, 232, 52, 88, 68, '#a8d8a0');
  if (!right) circle(ctx, 276, 86, 16, '#ffd93b', '#e8a90c');
  else {
    circle(ctx, 276, 86, 16, '#f4ead2');
    circle(ctx, 282, 82, 14, '#a8d8a0');
  }
  ctx.fillStyle = '#5d8a4a';
  ctx.beginPath();
  ctx.moveTo(232, 120); ctx.lineTo(262, 92); ctx.lineTo(292, 120); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(272, 120); ctx.lineTo(300, 96); ctx.lineTo(320, 120); ctx.closePath(); ctx.fill();

  // Wall clock.
  circle(ctx, 487, 74, 28, '#fff8e7', '#5a4632');
  ctx.fillStyle = '#3a2e22';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('12', 487, 56);
  ctx.fillText('6', 487, 98);
  ctx.fillText('3', 508, 78);
  ctx.fillText('9', 466, 78);
  ctx.strokeStyle = '#3a2e22';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(487, 74);
  if (!right) { ctx.lineTo(487, 54); ctx.moveTo(487, 74); ctx.lineTo(505, 74); }
  else { ctx.lineTo(495, 88); ctx.moveTo(487, 74); ctx.lineTo(487, 94); }
  ctx.stroke();
  circle(ctx, 487, 74, 3, '#3a2e22');

  // Bookshelf.
  box(ctx, 440, 140, 105, 160, '#8a5a34', '#5a3a20');
  box(ctx, 448, 150, 89, 46, '#6e4525');
  box(ctx, 448, 208, 89, 46, '#6e4525');
  box(ctx, 448, 266, 89, 26, '#6e4525');
  const shelfBooks = ['#c94f4f', '#4f7ec9', '#4fae5f', '#e8b04b', '#9b59b6'];
  const bookCount = right ? 4 : 5;
  shelfBooks.slice(0, bookCount).forEach((color, i) => {
    box(ctx, 452 + i * 17, 214, 14, 34, color, '#333');
  });
  box(ctx, 452, 158, 12, 32, '#4f7ec9', '#333');
  box(ctx, 466, 158, 12, 32, '#e8b04b', '#333');
  box(ctx, 480, 158, 12, 32, '#c94f4f', '#333');
  circle(ctx, 520, 172, 9, '#e8b04b', '#a87a1e');
  box(ctx, 452, 270, 40, 18, '#4fae5f', '#333');
  box(ctx, 496, 270, 36, 18, '#c94f4f', '#333');

  // Side table with lamp.
  box(ctx, 25, 300, 70, 10, '#8a5a34', '#5a3a20');
  box(ctx, 56, 310, 8, 55, '#8a5a34');
  box(ctx, 30, 360, 60, 8, '#8a5a34');
  box(ctx, 54, 282, 10, 18, '#5a4632');
  ctx.beginPath();
  ctx.moveTo(42, 262); ctx.lineTo(74, 262); ctx.lineTo(68, 236); ctx.lineTo(48, 236); ctx.closePath();
  ctx.fillStyle = right ? '#4fae5f' : '#ffd93b';
  ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#5a4632'; ctx.stroke();

  // Potted plant.
  ctx.strokeStyle = '#4a7a3a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(46, 368); ctx.quadraticCurveTo(30, 340, 38, 318);
  ctx.moveTo(46, 368); ctx.quadraticCurveTo(46, 338, 46, 312);
  ctx.moveTo(46, 368); ctx.quadraticCurveTo(62, 340, 56, 316);
  ctx.stroke();
  circle(ctx, 38, 316, 7, '#e86a8a');
  if (!right) circle(ctx, 46, 310, 7, '#e86a8a');
  circle(ctx, 56, 314, 7, '#e86a8a');
  ctx.beginPath();
  ctx.moveTo(28, 368); ctx.lineTo(64, 368); ctx.lineTo(58, 402); ctx.lineTo(34, 402); ctx.closePath();
  ctx.fillStyle = '#c96a3b'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#8a4520'; ctx.stroke();

  // Sofa.
  box(ctx, 60, 260, 370, 26, '#7a5a8a', '#4a3355');
  box(ctx, 60, 286, 370, 70, '#9370a8', '#4a3355');
  box(ctx, 60, 356, 370, 20, '#7a5a8a', '#4a3355');
  box(ctx, 52, 300, 18, 76, '#7a5a8a', '#4a3355');
  box(ctx, 420, 300, 18, 76, '#7a5a8a', '#4a3355');
  // Throw blanket on the back, left side.
  if (!right) {
    box(ctx, 96, 252, 56, 34, '#4fae5f', '#2f6a3a');
    ctx.fillStyle = '#e8f0e0';
    ctx.fillRect(96, 252, 56, 6);
  }
  // Cushions.
  box(ctx, 128, 296, 62, 46, right ? '#4f9ec9' : '#d94f4f', '#5a2a2a');
  box(ctx, 208, 296, 62, 46, '#e8b04b', '#8a6a1e');
  box(ctx, 288, 296, 62, 46, '#4fae5f', '#2f6a3a');
  // Cat asleep on the right end.
  if (!right) {
    ellipse(ctx, 372, 300, 30, 16, '#f0a35e', '#a8661e');
    circle(ctx, 348, 288, 12, '#f0a35e', '#a8661e');
    ctx.beginPath();
    ctx.moveTo(340, 280); ctx.lineTo(342, 268); ctx.lineTo(348, 278); ctx.closePath();
    ctx.fillStyle = '#f0a35e'; ctx.fill();
    ctx.beginPath();
    ctx.moveTo(352, 278); ctx.lineTo(356, 267); ctx.lineTo(358, 279); ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#a8661e'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(396, 292); ctx.quadraticCurveTo(410, 282, 404, 268); ctx.stroke();
  }

  // Coffee table with teapot and books.
  box(ctx, 180, 386, 200, 12, '#8a5a34', '#5a3a20');
  box(ctx, 192, 398, 10, 26, '#6e4525');
  box(ctx, 358, 398, 10, 26, '#6e4525');
  if (!right) {
    ellipse(ctx, 282, 402, 20, 12, '#7fb3d9', '#2f5a7a');
    ctx.beginPath();
    ctx.moveTo(262, 398); ctx.quadraticCurveTo(248, 396, 250, 406); ctx.stroke();
    ctx.fillStyle = '#7fb3d9';
    ctx.beginPath(); ctx.arc(302, 400, 7, -Math.PI / 2, Math.PI / 2); ctx.fill();
    ctx.fillRect(278, 386, 8, 6);
  }
  circle(ctx, 322, 394, 9, '#fff8e7', '#5a4632');
  box(ctx, 226, 380, 34, 6, '#c94f4f', '#7a2a2a');
  box(ctx, 228, 374, 30, 6, '#4f7ec9', '#2f4a7a');
}

// --------------------------------------------------------------------- garden
function drawGarden(ctx, right) {
  // Sky and grass.
  box(ctx, 0, 0, 560, 260, '#a8dcf0');
  box(ctx, 0, 260, 560, 180, '#79c25f');
  ellipse(ctx, 280, 452, 300, 30, '#5da84a');
  // Sun.
  circle(ctx, 74, 58, 28, '#ffd93b', '#e8a90c');
  if (!right) {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.strokeStyle = '#ffd93b'; ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(74 + Math.cos(a) * 34, 58 + Math.sin(a) * 34);
      ctx.lineTo(74 + Math.cos(a) * 46, 58 + Math.sin(a) * 46);
      ctx.stroke();
    }
  }
  // Clouds.
  const clouds = [[200, 58], [330, 62], [452, 44]];
  clouds.forEach(([cx, cy], i) => {
    if (right && i === 1) return;
    ellipse(ctx, cx, cy, 30, 15, '#ffffff');
    ellipse(ctx, cx - 18, cy + 4, 18, 11, '#ffffff');
    ellipse(ctx, cx + 18, cy + 4, 18, 11, '#ffffff');
  });
  // Birds.
  const birds = [[420, 70], [452, 84], [482, 60]];
  birds.forEach(([bx, by], i) => {
    if (right && i === 1) return;
    ctx.strokeStyle = '#3a3a3a'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx - 10, by); ctx.quadraticCurveTo(bx - 4, by - 8, bx, by);
    ctx.quadraticCurveTo(bx + 4, by - 8, bx + 10, by);
    ctx.stroke();
  });
  // Butterfly.
  if (!right) {
    ctx.fillStyle = '#e86ab0';
    ellipse(ctx, 420, 172, 10, 14, '#e86ab0');
    ellipse(ctx, 436, 172, 10, 14, '#e86ab0');
    ctx.fillStyle = '#8a2a6a';
    ctx.fillRect(426, 168, 3, 20);
  }
  // Big tree, left.
  box(ctx, 82, 190, 26, 120, '#8a5a34', '#5a3a20');
  circle(ctx, 95, 150, 66, '#4a9e3f', '#2f6a28');
  circle(ctx, 48, 176, 42, '#57b34a', '#2f6a28');
  circle(ctx, 142, 176, 42, '#57b34a', '#2f6a28');
  const apples = [[70, 170], [96, 158], [120, 180], [85, 130]];
  apples.forEach(([ax, ay], i) => {
    if (right && i === 1) return;
    circle(ctx, ax, ay, 7, '#e84a4a', '#8a1e1e');
  });
  // Small tree, right.
  box(ctx, 500, 220, 18, 90, '#8a5a34', '#5a3a20');
  circle(ctx, 509, 196, 38, '#57b34a', '#2f6a28');
  circle(ctx, 484, 214, 24, '#4a9e3f', '#2f6a28');
  circle(ctx, 534, 214, 24, '#4a9e3f', '#2f6a28');

  // House.
  box(ctx, 200, 150, 160, 150, '#f2e3c2', '#8a6a3a');
  ctx.beginPath();
  ctx.moveTo(188, 152); ctx.lineTo(280, 92); ctx.lineTo(372, 152); ctx.closePath();
  ctx.fillStyle = '#c94f4f'; ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = '#7a2a2a'; ctx.stroke();
  box(ctx, 308, 102, 20, 48, '#8a5a34', '#5a3a20');
  if (!right) {
    ellipse(ctx, 318, 92, 12, 9, '#e8e8e8');
    ellipse(ctx, 318, 76, 9, 7, '#e8e8e8');
    ellipse(ctx, 314, 62, 7, 5, '#e8e8e8');
  }
  // Windows.
  box(ctx, 216, 196, 36, 36, '#bfe6f7', '#5a4632');
  box(ctx, 308, 196, 36, 36, '#bfe6f7', '#5a4632');
  ctx.strokeStyle = '#5a4632'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(234, 196); ctx.lineTo(234, 232); ctx.moveTo(216, 214); ctx.lineTo(252, 214);
  ctx.moveTo(326, 196); ctx.lineTo(326, 232); ctx.moveTo(308, 214); ctx.lineTo(344, 214);
  ctx.stroke();
  if (right) {
    ctx.fillStyle = '#e8b04b';
    ctx.fillRect(216, 196, 36, 36);
    ctx.fillRect(308, 196, 36, 36);
  } else {
    ctx.fillStyle = '#d96a6a';
    ctx.fillRect(214, 194, 8, 40);
    ctx.fillRect(246, 194, 8, 40);
    ctx.fillRect(306, 194, 8, 40);
    ctx.fillRect(338, 194, 8, 40);
  }
  // Door.
  box(ctx, 262, 226, 36, 74, right ? '#4f9ec9' : '#c94f4f', '#5a2a2a');
  circle(ctx, 292, 266, 4, '#ffd93b');
  ctx.beginPath();
  ctx.arc(280, 226, 12, Math.PI, 0);
  ctx.fillStyle = right ? '#4f9ec9' : '#c94f4f'; ctx.fill();

  // Fence.
  ctx.fillStyle = '#f2e3c2';
  for (let x = 8; x < 560; x += 32) {
    if (right && x === 168) continue;
    ctx.fillRect(x, 300, 14, 44);
    ctx.beginPath();
    ctx.moveTo(x, 300); ctx.lineTo(x + 7, 290); ctx.lineTo(x + 14, 300); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#d9c49a';
  ctx.fillRect(0, 312, 560, 6);
  ctx.fillRect(0, 332, 560, 6);

  // Path to the door.
  ctx.fillStyle = '#d9c9a8';
  ellipse(ctx, 280, 356, 26, 12, '#d9c9a8');
  ellipse(ctx, 280, 386, 30, 12, '#d9c9a8');
  ellipse(ctx, 280, 418, 34, 12, '#d9c9a8');

  // Flower beds.
  const tulips = [[80, 372, '#e84a4a'], [120, 372, '#e84a4a'], [160, 372, '#e8b04b'], [200, 372, '#e84a4a']];
  tulips.forEach(([fx, fy, color]) => {
    ctx.strokeStyle = '#2f6a28'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fx, fy + 18); ctx.lineTo(fx, fy); ctx.stroke();
    circle(ctx, fx, fy - 4, 9, right && fx === 120 ? '#ffd93b' : color, '#7a1e1e');
  });
  const tulipsR = [[400, 372, '#e8b04b'], [440, 372, '#e84a4a'], [480, 372, '#e8b04b'], [520, 372, '#e84a4a']];
  tulipsR.forEach(([fx, fy, color]) => {
    ctx.strokeStyle = '#2f6a28'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fx, fy + 18); ctx.lineTo(fx, fy); ctx.stroke();
    circle(ctx, fx, fy - 4, 9, color, '#7a1e1e');
  });
  // Watering can.
  if (!right) {
    ellipse(ctx, 372, 392, 18, 12, '#4f9ec9', '#2f5a7a');
    ctx.beginPath(); ctx.moveTo(356, 390); ctx.quadraticCurveTo(340, 386, 338, 374); ctx.stroke();
    ctx.fillStyle = '#4f9ec9';
    ctx.fillRect(384, 388, 10, 5);
  }
  // Pond with duck.
  ellipse(ctx, 478, 396, 62, 22, '#6ab8d9', '#2f6a8a');
  if (!right) {
    ellipse(ctx, 470, 392, 14, 9, '#ffffff', '#888');
    circle(ctx, 460, 384, 7, '#ffffff', '#888');
    ctx.fillStyle = '#e8a90c';
    ctx.beginPath(); ctx.moveTo(453, 384); ctx.lineTo(446, 386); ctx.lineTo(453, 388); ctx.closePath(); ctx.fill();
    circle(ctx, 458, 382, 1.5, '#222');
  }
}

// ------------------------------------------------------------------ night cafe
function drawNightCafe(ctx, right) {
  // Night sky, street and building.
  box(ctx, 0, 0, 560, 400, '#1c2a4a');
  box(ctx, 0, 400, 560, 40, '#3a3a4a');
  ctx.fillStyle = '#4a4a5a';
  for (let x = 20; x < 560; x += 64) ellipse(ctx, x, 420, 18, 5, '#4a4a5a');
  if (!right) ellipse(ctx, 300, 414, 26, 8, '#2a2a3a');
  // Stars.
  const stars = [[60, 40], [120, 52], [180, 34], [240, 58], [330, 36], [420, 46], [60, 96], [150, 88]];
  stars.forEach(([sx, sy], i) => {
    if (right && i === 1) return;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(sx, sy - 5); ctx.lineTo(sx + 1.5, sy - 1.5); ctx.lineTo(sx + 5, sy);
    ctx.lineTo(sx + 1.5, sy + 1.5); ctx.lineTo(sx, sy + 5); ctx.lineTo(sx - 1.5, sy + 1.5);
    ctx.lineTo(sx - 5, sy); ctx.lineTo(sx - 1.5, sy - 1.5); ctx.closePath(); ctx.fill();
  });
  // Moon.
  circle(ctx, 486, 56, 26, '#f4ead2', '#d9c9a0');
  if (right) circle(ctx, 496, 50, 22, '#1c2a4a');
  circle(ctx, 478, 48, 4, '#d9c9a0');
  circle(ctx, 492, 64, 3, '#d9c9a0');

  // Café building.
  box(ctx, 140, 90, 280, 310, '#7a4a6a', '#3a2033');
  box(ctx, 140, 90, 280, 14, '#5a3350');
  // Sign.
  box(ctx, 220, 100, 120, 36, '#f2e3c2', '#8a6a3a');
  ctx.fillStyle = '#5a2a4a';
  ctx.font = 'bold 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(right ? 'CAFE' : 'CAFÉ', 280, 126);
  // Small wall clock.
  circle(ctx, 392, 118, 18, '#fff8e7', '#3a2033');
  ctx.strokeStyle = '#3a2033'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(392, 118);
  if (!right) { ctx.lineTo(392, 104); ctx.moveTo(392, 118); ctx.lineTo(404, 118); }
  else { ctx.lineTo(400, 128); ctx.moveTo(392, 118); ctx.lineTo(392, 132); }
  ctx.stroke();
  // Awning.
  for (let i = 0; i < 7; i++) {
    const ax = 150 + i * 38;
    const stripe = (right && i === 3) ? '#4f9ec9' : (i % 2 ? '#f2e3c2' : '#c94f4f');
    ctx.fillStyle = stripe;
    ctx.beginPath();
    ctx.moveTo(ax, 140); ctx.lineTo(ax + 38, 140); ctx.lineTo(ax + 38, 172);
    ctx.quadraticCurveTo(ax + 19, 182, ax, 172); ctx.closePath(); ctx.fill();
  }
  // Windows.
  box(ctx, 168, 210, 96, 90, '#ffd93b', '#3a2033');
  box(ctx, 296, 210, 96, 90, '#ffd93b', '#3a2033');
  ctx.strokeStyle = '#3a2033'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(216, 210); ctx.lineTo(216, 300); ctx.moveTo(168, 255); ctx.lineTo(264, 255);
  ctx.moveTo(344, 210); ctx.lineTo(344, 300); ctx.moveTo(296, 255); ctx.lineTo(392, 255);
  ctx.stroke();
  if (right) {
    ctx.fillStyle = '#8a4a6a';
    ctx.fillRect(200, 210, 32, 90);
  } else {
    ctx.fillStyle = '#8a4a6a';
    ctx.fillRect(168, 210, 10, 90);
    ctx.fillRect(254, 210, 10, 90);
  }
  // Cat on the right windowsill.
  if (!right) {
    ellipse(ctx, 348, 292, 20, 11, '#3a3a3a', '#111');
    circle(ctx, 332, 284, 8, '#3a3a3a', '#111');
    ctx.beginPath();
    ctx.moveTo(326, 278); ctx.lineTo(327, 268); ctx.lineTo(332, 276); ctx.closePath();
    ctx.fillStyle = '#3a3a3a'; ctx.fill();
    ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(366, 288); ctx.quadraticCurveTo(376, 280, 370, 270); ctx.stroke();
  }
  // Door.
  box(ctx, 268, 230, 44, 170, '#4a2a3a', '#241222');
  circle(ctx, 304, 318, 4, '#ffd93b');
  // Fairy lights.
  ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(140, 186); ctx.quadraticCurveTo(280, 214, 420, 186); ctx.stroke();
  for (let i = 0; i < 9; i++) {
    const bx = 156 + i * 32;
    const by = 186 + Math.sin((i / 8) * Math.PI) * 22;
    const lit = !(right && i === 2);
    circle(ctx, bx, by + 6, 5, lit ? '#ffd93b' : '#555566', '#3a2033');
  }
  // Menu board.
  box(ctx, 424, 250, 72, 92, '#2a2a3a', '#111');
  box(ctx, 430, 256, 60, 80, '#f2e3c2', '#8a6a3a');
  ctx.fillStyle = '#3a2033'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
  ctx.fillText('MENU', 438, 272);
  ctx.font = '11px sans-serif';
  ctx.fillText('Coffee', 438, 290);
  ctx.fillText('Cake', 438, 306);
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(right ? '15' : '12', 452, 324);

  // Street lamp.
  box(ctx, 516, 210, 8, 170, '#2a2a3a');
  box(ctx, 506, 196, 28, 16, '#2a2a3a', '#111');
  if (!right) {
    ctx.fillStyle = 'rgba(255, 217, 59, 0.25)';
    ctx.beginPath(); ctx.arc(520, 250, 44, 0, Math.PI * 2); ctx.fill();
    circle(ctx, 520, 204, 7, '#ffd93b', '#e8a90c');
  } else {
    circle(ctx, 520, 204, 7, '#777788', '#444');
  }

  // Bicycle with basket.
  ctx.strokeStyle = '#c9c9d9'; ctx.lineWidth = 4;
  circle(ctx, 62, 372, 22, 'rgba(0,0,0,0)', '#c9c9d9');
  circle(ctx, 132, 372, 22, 'rgba(0,0,0,0)', '#c9c9d9');
  ctx.beginPath();
  ctx.moveTo(62, 372); ctx.lineTo(96, 340); ctx.lineTo(132, 372);
  ctx.moveTo(96, 340); ctx.lineTo(118, 340); ctx.lineTo(132, 372);
  ctx.moveTo(88, 340); ctx.lineTo(78, 322);
  ctx.moveTo(118, 340); ctx.lineTo(138, 330);
  ctx.stroke();
  box(ctx, 74, 322, 20, 6, '#8a5a34');
  box(ctx, 40, 344, 18, 14, '#8a5a34', '#5a3a20');
  if (!right) {
    circle(ctx, 46, 338, 5, '#e86a8a');
    circle(ctx, 54, 336, 5, '#ffd93b');
    circle(ctx, 50, 342, 5, '#e86a8a');
  }

  // Outdoor table with cups.
  ellipse(ctx, 440, 360, 44, 10, '#5a3350', '#3a2033');
  box(ctx, 436, 360, 8, 34, '#5a3350');
  circle(ctx, 420, 350, 8, '#fff8e7', '#5a4632');
  if (!right) circle(ctx, 444, 346, 8, '#fff8e7', '#5a4632');
  // Planter.
  box(ctx, 128, 384, 76, 22, '#8a5a34', '#5a3a20');
  if (!right) {
    circle(ctx, 148, 380, 7, '#e86a8a');
    circle(ctx, 166, 378, 7, '#ffd93b');
    circle(ctx, 184, 380, 7, '#e86a8a');
  }
}
