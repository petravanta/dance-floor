// Checks what the JSON Schemas can't: ids are unique, every reference points at something that exists,
// tempos make sense, buildsOn never loops back on itself, and animation keys are in order.
// Run: node scripts/check-data.js
const fs = require('fs'), path = require('path');
const read = f => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', f), 'utf8'));
const styles = read('styles.json'), moves = read('moves.json');
const errors = [];

const styleIds = new Set();
for (const s of styles) {
  if (styleIds.has(s.id)) errors.push(`styles.json: id "${s.id}" is used more than once`);
  styleIds.add(s.id);
  if (!(s.bpm.min <= s.bpm.default && s.bpm.default <= s.bpm.max)) errors.push(`styles.json: "${s.id}" bpm needs min ≤ default ≤ max`);
}
const byId = new Map();
for (const m of moves) {
  if (byId.has(m.id)) errors.push(`moves.json: id "${m.id}" is used more than once`);
  byId.set(m.id, m);
  if (!styleIds.has(m.style)) errors.push(`moves.json: "${m.id}" has style "${m.style}", which isn't in styles.json`);
}
for (const m of moves) {
  for (const r of m.buildsOn) if (!byId.has(r)) errors.push(`moves.json: "${m.id}" builds on "${r}", which doesn't exist`);
  if (m.buildsOn.includes(m.id)) errors.push(`moves.json: "${m.id}" builds on itself`);
}
const state = new Map();
const visit = (id, trail) => {
  if (state.get(id) === 2 || !byId.has(id)) return;
  if (state.get(id) === 1) { errors.push(`moves.json: buildsOn loop ${trail.concat(id).join(' → ')}`); return; }
  state.set(id, 1);
  for (const r of byId.get(id).buildsOn) visit(r, trail.concat(id));
  state.set(id, 2);
};
for (const m of moves) visit(m.id, []);

// Animations: keys start at 0, go in order, and stay inside the loop.
for (const m of moves) {
  const a = m.animation; if (!a) continue;
  if (a.keys[0].at !== 0) errors.push(`moves.json: "${m.id}" animation must start with a key at 0`);
  a.keys.forEach((k, i) => {
    if (k.at >= a.beats) errors.push(`moves.json: "${m.id}" animation key at ${k.at} is past the ${a.beats}-beat loop`);
    if (i && k.at <= a.keys[i - 1].at) errors.push(`moves.json: "${m.id}" animation keys must be in order (${k.at} after ${a.keys[i - 1].at})`);
    if (k.turn !== undefined && a.view !== 'front') errors.push(`moves.json: "${m.id}" uses turn, which only works in front view`);
  });
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`data ok: ${styles.length} styles, ${moves.length} moves`);
