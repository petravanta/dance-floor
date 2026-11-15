# Dance Floor

A friendly primer on basic dance-floor moves for goth, industrial and rave nights. Pick a move, read a few short cues, then press play on the count-along beat and try it.

**Open it:** https://petravanta.github.io/dance-floor/ · part of [petravanta's apps](https://petravanta.github.io/general/)

- Floor basics that work anywhere (bounce, step-touch, sway, arms, dancing in a crowd), then goth, industrial and rave moves.
- Each move has a little animated stick figure that dances it in time with the beat, with a cue on each count.
- Each move has an easy / medium / tricky tag, how-to steps, tips, common mistakes, and links to easier and next moves.
- A count-along beat at each style's typical tempo that sounds like the genre (house, post-punk, EBM, acid rave), with half time for goth and a plain click if you prefer.
- Phone and desktop, light and dark themes, installable, works offline.
- Nothing personal is saved. It's a primer, not a tracker.

## Extending the app

| Dataset | File | Schema | What it controls |
| --- | --- | --- | --- |
| Styles | [`data/styles.json`](data/styles.json) | [`data/schema/styles.schema.json`](data/schema/styles.schema.json) | The style tabs, their description, typical genres and tempo |
| Moves | [`data/moves.json`](data/moves.json) | [`data/schema/moves.schema.json`](data/schema/moves.schema.json) | Every move: style, difficulty, counts, steps, tips, mistakes, what it builds on, and its animation |

See [CONTRIBUTING.md](CONTRIBUTING.md) to add a move. Other apps (for example Study Buddy) can read `data/moves.json` straight from `https://petravanta.github.io/dance-floor/data/moves.json`.

## Running locally

```sh
python3 -m http.server
```

Then open http://localhost:8000/.

## License

MIT, see [LICENSE](LICENSE).
