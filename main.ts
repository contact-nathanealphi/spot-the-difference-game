// Spot the Difference hand-in (Node 22, standard library only). This program
// takes the entry that lives beside it — the static game under game/ and the
// browser screenshots under screenshots/ — and lays them out in the output
// directory the grader provides, together with /output/dossier.json, the
// summary the judge reads, built by the vendored make.fun library. Run it
// outside the grader with MAKEFUN_OUTPUT_DIR set to a scratch folder:
//   MAKEFUN_OUTPUT_DIR=out node main.ts
// It writes the same bytes on every run: no timestamps, no randomness, just
// copies and the dossier the library derives from those exact files.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'game'), join(outputDir, 'game'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// Caps matching the sealed scorer: at most 4 screenshots of 256 KiB each,
// game/ within 993 entries and 48 MiB, paths within 1000 bytes, and the
// dossier text capped at 160 KiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
