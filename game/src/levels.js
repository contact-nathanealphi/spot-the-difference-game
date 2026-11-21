// Level data for Spot the Difference: three hand-built scenes, each with a
// dozen or so fair-but-sneaky differences. Coordinates are panel-local
// (each panel is 560 x 440). `r` is the click tolerance radius in pixels.

export const PANEL_W = 560;
export const PANEL_H = 440;

export const LEVELS = [
  {
    id: 'living-room',
    name: 'Level 1 — Cozy Living Room',
    scene: 'livingRoom',
    blurb: 'A quiet afternoon at home. Nothing moves… or does it?',
    timeLimit: 240,
    hints: 3,
    diffs: [
      { id: 'clock-hands', x: 487, y: 74, r: 30, label: 'Clock hands moved' },
      { id: 'painting-sky', x: 276, y: 86, r: 30, label: 'Painting: sun became a moon' },
      { id: 'cat', x: 372, y: 292, r: 30, label: 'The cat vanished' },
      { id: 'cushion', x: 148, y: 312, r: 30, label: 'Cushion changed colour' },
      { id: 'books', x: 492, y: 214, r: 28, label: 'A book went missing' },
      { id: 'teapot', x: 282, y: 398, r: 28, label: 'The teapot disappeared' },
      { id: 'plant-bloom', x: 46, y: 318, r: 26, label: 'A flower lost its bloom' },
      { id: 'rug-stripe', x: 280, y: 424, r: 26, label: 'A rug stripe is gone' },
      { id: 'window-sun', x: 98, y: 96, r: 30, label: 'The sun hid behind a cloud' },
      { id: 'lamp-shade', x: 58, y: 262, r: 28, label: 'Lamp shade changed colour' },
      { id: 'blanket', x: 122, y: 268, r: 28, label: 'The throw blanket is gone' },
      { id: 'curtain', x: 158, y: 104, r: 28, label: 'A curtain panel is missing' },
    ],
  },
  {
    id: 'garden',
    name: 'Level 2 — Sunny Garden',
    scene: 'garden',
    blurb: 'Bees, birds and one very sneaky gardener. Look closely.',
    timeLimit: 210,
    hints: 3,
    diffs: [
      { id: 'sun-rays', x: 74, y: 58, r: 32, label: 'The sun lost its rays' },
      { id: 'cloud', x: 330, y: 62, r: 28, label: 'A cloud drifted away' },
      { id: 'smoke', x: 318, y: 128, r: 28, label: 'Chimney smoke is gone' },
      { id: 'door', x: 280, y: 258, r: 30, label: 'The front door changed colour' },
      { id: 'curtains', x: 232, y: 212, r: 28, label: 'Window curtains closed' },
      { id: 'tulip', x: 120, y: 372, r: 26, label: 'A red tulip turned yellow' },
      { id: 'butterfly', x: 428, y: 178, r: 26, label: 'The butterfly flew off' },
      { id: 'birds', x: 452, y: 84, r: 26, label: 'A bird flew away' },
      { id: 'picket', x: 168, y: 322, r: 24, label: 'A fence picket is missing' },
      { id: 'duck', x: 470, y: 392, r: 28, label: 'The duck left the pond' },
      { id: 'apples', x: 96, y: 158, r: 26, label: 'An apple fell from the tree' },
      { id: 'watering-can', x: 372, y: 384, r: 28, label: 'The watering can is gone' },
    ],
  },
  {
    id: 'night-cafe',
    name: 'Level 3 — Night Street Café',
    scene: 'nightCafe',
    blurb: 'Lamplight, jazz and fourteen tiny lies. The hardest hunt yet.',
    timeLimit: 180,
    hints: 3,
    diffs: [
      { id: 'moon', x: 486, y: 56, r: 30, label: 'The moon turned crescent' },
      { id: 'stars', x: 120, y: 52, r: 26, label: 'A star went out' },
      { id: 'awning', x: 280, y: 158, r: 28, label: 'An awning stripe changed' },
      { id: 'bulb', x: 220, y: 208, r: 22, label: 'A fairy bulb went dark' },
      { id: 'sign', x: 280, y: 118, r: 28, label: 'The café sign lost its accent' },
      { id: 'menu-price', x: 452, y: 318, r: 26, label: 'The menu price changed' },
      { id: 'basket', x: 50, y: 340, r: 28, label: 'Flowers left the bike basket' },
      { id: 'cat', x: 344, y: 288, r: 26, label: 'The windowsill cat is gone' },
      { id: 'cups', x: 444, y: 346, r: 26, label: 'A coffee cup disappeared' },
      { id: 'lamp-glow', x: 520, y: 250, r: 30, label: 'The street lamp went out' },
      { id: 'curtain-cafe', x: 216, y: 250, r: 26, label: 'A café curtain closed' },
      { id: 'planter', x: 166, y: 382, r: 26, label: 'A planter lost its flowers' },
      { id: 'manhole', x: 300, y: 414, r: 26, label: 'The manhole cover is gone' },
      { id: 'cafe-clock', x: 392, y: 118, r: 26, label: 'The café clock hands moved' },
    ],
  },
];

export function totalDiffs() {
  return LEVELS.reduce((sum, level) => sum + level.diffs.length, 0);
}
