# Notes for coding agents

Follow the shared standards in https://github.com/petravanta/general/blob/main/STANDARDS.md (hub link, theme switch, shared look, built-in knowledge, installing on a phone). Take patterns from there, not from the other apps. This file only adds what's specific to Dance Floor.

- Dance Floor is a light primer for casual dancers, not a training plan. It deliberately has no progress tracking and no Google Drive storage: nothing personal is saved. Keep it that way unless petravanta asks; tracking belongs in Study Buddy, which can read `data/moves.json`.
- The app is `index.html` with no build step. Serve the folder (`python3 -m http.server`) to run it; `data/` can't load from `file://`. The shared look is inlined between its marker comments.
- What it teaches is data: `data/styles.json` and `data/moves.json`, with schemas in `data/schema/`. Add or change moves there, never as literals in `index.html`. Move and style ids may be linked to (`?move=<id>`) and used by other apps, so never rename or reuse one.
- `localStorage` holds only conveniences: `danceFloor.tab` (last style tab) and `danceFloor.beat` (`{bpm, half}`).
- The count-along beat schedules Web Audio clicks ahead of time (`tick()` every 25 ms, 120 ms look-ahead) so it stays steady when the page is busy. Goth styles default to half time.
- Run `node scripts/check-data.js` and the ajv command in CONTRIBUTING.md after editing data.
