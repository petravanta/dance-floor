# Contributing

The easiest way to help is to add a move. Moves live in one plain JSON file, [`data/moves.json`](data/moves.json), and you don't need to know any JavaScript.

## Add a move

1. Open [`data/moves.json`](data/moves.json) on GitHub and click the pencil icon to edit it. GitHub makes a copy for you if needed.
2. Find a move in the same style, copy its whole `{ … }` block, and paste it after that block, with a comma between them. Moves are grouped by style.
3. Change the fields. Every field is explained in [`data/schema/moves.schema.json`](data/schema/moves.schema.json). The main ones:
   - `id`: a new short id in lowercase letters, digits and hyphens. Never change the id of a move that's already there.
   - `name`, `style` (`foundations`, `goth`, `industrial` or `rave`), `difficulty` (1 easy, 2 medium, 3 tricky).
   - `counts`: how it fits the beat, like `"1 step · 2 touch"`.
   - `summary` and `steps`: a sentence, then short ordered cues. Keep them short; people read them on a phone between tracks.
   - `tips`, `mistakes` and `why` are optional. `buildsOn` lists the ids of easier moves to learn first (`[]` if none).
   - `focus`: which part of the body it trains (`feet`, `legs`, `hips`, `torso`, `arms`, `balance`, `awareness`).
   - `video` is an optional https link to a clip showing the move.
4. Click **Propose changes**, then **Create pull request**. A check runs automatically and points out anything that needs fixing.

Here is a complete example:

```json
{
  "id": "shoulder-pop",
  "name": "Shoulder pop",
  "style": "rave",
  "difficulty": 1,
  "buildsOn": ["rave-bounce"],
  "focus": ["torso"],
  "counts": "Pop on every beat",
  "summary": "Shoulders pop up on the beat while the feet keep bouncing.",
  "steps": ["Keep the rave bounce going", "Lift both shoulders sharply on the beat", "Let them drop between beats"]
}
```

## Add a style

Styles live in [`data/styles.json`](data/styles.json): an `id`, a `name`, a short `description`, the typical `bpm` range (`min`, `max`, `default`) and some `music` genres. Optionally give it a `groove`, the practice beat's music: drum lanes like `"x...x...x...x..."` and note lanes like `"0 - 3 - 7 -"`, all explained in [`data/schema/styles.schema.json`](data/schema/styles.schema.json). Add the style first, then its moves.

## Checking locally

```sh
node scripts/check-data.js     # unique ids, styles and buildsOn references exist, no loops
npx ajv-cli@5 validate --spec=draft2020 -c ajv-formats -s data/schema/moves.schema.json -d data/moves.json
```
