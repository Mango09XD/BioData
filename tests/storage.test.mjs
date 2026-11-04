import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../js/storage.js';
const memory = () => {
  const data = new Map();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) };
};
test('Favoritos, lecciones y mejor puntuación sobreviven a otra instancia', () => {
  const storage = memory(),
    a = createStore(storage);
  a.toggleFavorite('academia/adn');
  a.markRead('adn');
  a.markRead('adn');
  a.score('reto', 8, 10);
  a.score('reto', 3, 10);
  a.experiment('osmosis');
  a.experiment('osmosis');
  const b = createStore(storage);
  assert.equal(b.hasFavorite('academia/adn'), true);
  assert.deepEqual(b.snapshot.read, ['adn']);
  assert.equal(b.snapshot.scores.reto.correct, 8);
  assert.deepEqual(b.snapshot.experiments, ['osmosis']);
});
test('Historial limitado a 20, sin duplicados; reset conserva tema', () => {
  const s = createStore(memory());
  s.setTheme('dark');
  for (let i = 0; i < 25; i++) s.visit('id' + i, 'Tema ' + i);
  s.visit('id24', 'Último');
  assert.equal(s.snapshot.recent.length, 20);
  assert.equal(s.snapshot.recent[0].title, 'Último');
  s.clear();
  assert.equal(s.snapshot.theme, 'dark');
  assert.equal(s.snapshot.recent.length, 0);
});
test('Almacenamiento bloqueado conserva sesión y avisa', () => {
  let notified = 0;
  const s = createStore(
    {
      getItem() {
        return null;
      },
      setItem() {
        throw Error('blocked');
      },
    },
    () => notified++,
  );
  s.markRead('adn');
  assert.equal(notified, 1);
  assert.equal(s.available, false);
  assert.deepEqual(s.snapshot.read, ['adn']);
});
test('JSON corrupto no bloquea y migración conserva lecturas y tema antiguos', () => {
  const data = memory();
  data.setItem('biodata.v4', '{bad json');
  assert.doesNotThrow(() => createStore(data));
  const old = memory();
  old.setItem('biodata.library.read', '["adn","sql"]');
  old.setItem('biodata.v2.theme', 'light');
  const migrated = createStore(old);
  assert.deepEqual(migrated.snapshot.read, ['adn']);
  assert.equal(migrated.snapshot.theme, 'light');
});
