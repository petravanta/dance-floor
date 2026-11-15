# Notes for coding agents

Follow the shared standards in https://github.com/petravanta/general/blob/main/STANDARDS.md (hub link, theme switch, shared look, built-in knowledge, installing on a phone). Take patterns from there, not from the other apps. This file only adds what's specific to Dance Floor.

- Dance Floor is a light primer for casual dancers, not a training plan. It deliberately has no progress tracking and no Google Drive storage: nothing personal is saved. Keep it that way unless petravanta asks; tracking belongs in Study Buddy, which can read `data/moves.json`.
- The app is `index.html` with no build step. Serve the folder (`python3 -m http.server`) to run it; `data/` can't load from `file://`. The shared look is inlined between its marker comments.
- What it teaches is data: `data/styles.json` and `data/moves.json`, with schemas in `data/schema/`. Add or change moves there, never as literals in `index.html`. Move and style ids may be linked to (`?move=<id>`) and used by other apps, so never rename or reuse one.
- `localStorage` holds only conveniences: `danceFloor.tab` (last style tab) and `danceFloor.beat` (`{bpm, half, sound}`).
- Each move's optional `animation` (keyframes for a stick figure, timed in beats) is drawn by the renderer in `index.html` (`poseAt`, `drawPose`), large in the move drawer and as a mini preview on each card (`startMinis`, which only animates cards on screen). It reads the beat's audio clock (`beat.step`, `beat.next`), so the figure stays on the beat; tune moves in the data, not with per-move code. Keyframe fields are documented in the schema.
- The count-along beat schedules Web Audio clicks ahead of time (`tick()` every 25 ms, 120 ms look-ahead) so it stays steady when the page is busy. It steps in 16ths and plays each style's `groove` from `data/styles.json` with small synthesised instruments (no audio files); a style without one, or the Click setting, gets the plain click. Half time halves the drums only. Goth styles default to half time.
- Run `node scripts/check-data.js` and the ajv command in CONTRIBUTING.md after editing data.
