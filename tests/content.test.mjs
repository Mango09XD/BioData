import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { escapeHTML, norm, slug } from '../js/ui.js';
const read = (name) =>
  JSON.parse(fs.readFileSync(new URL('../data/' + name + '.json', import.meta.url), 'utf8'));
const elements = read('elements'),
  contexts = read('elements-context'),
  organisms = [...read('organisms-original'), ...read('organisms-extra')],
  taxonomy = read('taxonomy'),
  lessons = [...read('lessons-original'), ...read('lessons-extra')],
  glossary = read('glossary'),
  questions = read('questions');
test('118 elementos únicos, ubicaciones sin colisiones y propiedades reales', () => {
  assert.equal(elements.length, 118);
  assert.equal(new Set(elements.map((e) => e.s)).size, 118);
  assert.equal(new Set(elements.map((e) => e.row + ':' + e.col)).size, 118);
  elements.forEach((e, i) => {
    assert.equal(e.n, i + 1);
    assert.equal(Number(e.AtomicNumber), e.n);
    assert.equal(e.Symbol, e.s);
    assert.ok(Number(e.mass) > 0);
    assert.ok(e.configuration);
    assert.ok(contexts[e.s]);
    assert.ok(e.col >= 1 && e.col <= 18);
    assert.ok(e.period >= 1 && e.period <= 7);
  });
  assert.equal(elements[117].s, 'Og');
  assert.equal(elements[23].configuration, '[Ar]3d5 4s1');
});
test('30 organismos con datos y ocho campos taxonómicos/editoriales', () => {
  assert.equal(organisms.length, 30);
  assert.equal(new Set(organisms.map((o) => slug(o.scientific))).size, 30);
  for (const o of organisms) {
    for (const k of [
      'name',
      'scientific',
      'habitat',
      'nutrition',
      'reproduction',
      'facts',
      'summary',
    ])
      assert.ok(o[k], o.name + ':' + k);
    assert.equal(taxonomy[o.scientific].length, 8);
  }
});
test('32 lecciones y 44 preguntas con respuestas y referencias válidas', () => {
  assert.equal(lessons.length, 32);
  assert.equal(new Set(lessons.map((l) => l.id)).size, 32);
  for (const l of lessons) {
    assert.ok(l.parts.length >= 3);
    assert.ok(l.parts.every((p) => p[0] && p[1].length > 80));
    assert.match(l.source, /^https:\/\//);
    assert.ok(l.check[2] >= 0 && l.check[2] < l.check[1].length);
    assert.ok(l.check[3].length > 20);
  }
  assert.equal(questions.length + lessons.length, 44);
  for (const q of questions) {
    assert.ok(lessons.some((l) => l.id === q.lesson));
    assert.ok(q.a >= 0 && q.a < q.o.length);
  }
});
test('52 términos sin enlaces relacionados rotos', () => {
  assert.equal(glossary.length, 52);
  for (const t of glossary) {
    assert.ok(
      lessons.some((l) => l.id === t.lesson),
      t.term,
    );
    for (const related of t.related)
      assert.ok(
        glossary.some((g) => g.term === related),
        t.term + ' → ' + related,
      );
  }
});
test('Entradas dinámicas se escapan y la búsqueda ignora tildes', () => {
  assert.equal(
    escapeHTML('<img src=x onerror="alert(1)">'),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;',
  );
  assert.equal(norm('ÓSMOSIS'), 'osmosis');
  assert.equal(slug('Panthera onca'), 'panthera-onca');
});
test('Ningún módulo o contenido educativo de SQL permanece en la aplicación', () => {
  const dirs = ['js', 'data'];
  for (const dir of dirs) {
    function walk(p) {
      for (const entry of fs.readdirSync(p, { withFileTypes: true })) {
        const f = path.join(p, entry.name);
        if (entry.isDirectory()) walk(f);
        else
          assert.doesNotMatch(
            fs.readFileSync(f, 'utf8'),
            /MySQL|SELECT .*FROM|Base de datos MySQL|Consulta SQL/i,
            f,
          );
      }
    }
    walk(fileURLToPath(new URL('../' + dir, import.meta.url)));
  }
  assert.ok(!fs.existsSync(new URL('../js/base-datos.js', import.meta.url)));
});
