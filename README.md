# Spot the Difference — Three Little Mysteries 🔍

[![best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/contact-nathanealphi/spot-the-difference-game/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/contact-nathanealphi/spot-the-difference-game/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

An original spot-the-difference game, built for
[make.fun's "Make the best spot the difference game" bounty](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451).
Two near-identical pictures side by side, a sharp eye, and a clock that
does not forgive dawdling.

## How to play

Open `game/index.html` in a desktop browser (or run `node serve.ts` and
visit http://localhost:8080). No network, no build step, no install — the
whole game is plain HTML, CSS and JavaScript, and every picture is painted
live on canvas by the game's own code.

- **Click a difference in either picture** and it is circled in gold in
  both panels, with a check mark, a chime and combo points.
- **Wrong clicks cost you**: −5 seconds and −10 points, with a red X where
  you clicked.
- **Hints** (3 per level, button or `H` key) pulse a golden ring around one
  difference you have not found yet.
- **Beat the clock**: each level has its own countdown, and the timer turns
  red and blinks under 30 seconds. Finish a level to bank a time bonus.
- Keys: `H` hint · `R` restart level · `N` next level.

## The three scenes — 38 differences in all

1. **Cozy Living Room** (12 differences, 4:00) — a cat naps on the sofa,
   a teapot waits on the coffee table, and somewhere a cushion quietly
   changed colour.
2. **Sunny Garden** (12 differences, 3:30) — a cottage, a duck pond, a
   butterfly that may or may not still be there.
3. **Night Street Café** (14 differences, 3:00) — lamplight, fairy lights,
   a sign that lost its accent, and the hardest hunt of the three.

Every level tracks what you found (the checklist under the board names
each difference as you discover it), your best combo, and your score.

## How it is made

- `game/src/scenes.js` — all three scenes, painted procedurally on canvas
  (flat-colour original art; the right panel is the same painter with the
  differences switched on).
- `game/src/levels.js` — the level data: scene, time limit, and every
  difference with its position, click radius and reveal label.
- `game/src/game.js` — the controller: clicks, markers, pulses, countdown,
  hints, scoring, combos, level flow and the screenshot staging presets.
- `game/src/audio.js` — sound effects synthesized with WebAudio; no audio
  files are loaded.
- `main.ts` — the hand-in program: copies `game/` and `screenshots/` to
  the output directory and writes `dossier.json` with the vendored
  make.fun library.

## Screenshots

The four shots in `screenshots/` are real renders of this game in
headless Chrome: the cover (living room, 5 of 12 found), the moment a
difference is found, the garden level mid-hunt, and the win screen after
clearing the night café.
