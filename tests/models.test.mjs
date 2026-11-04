import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  punnett,
  dna,
  code,
  photosynthesis,
  diffusion,
  osmosis,
  logistic,
  trophic,
  enzyme,
} from '../js/models.js';
const near = (a, b, epsilon = 1e-9) => assert.ok(Math.abs(a - b) < epsilon, `${a} != ${b}`);
test('Punnett: Aa × Aa reproduce 1:2:1 y 3:1', () => {
  const p = punnett('Aa', 'Aa');
  assert.deepEqual(p.genotypes, { AA: 0.25, Aa: 0.5, aa: 0.25 });
  assert.equal(p.dominant, 0.75);
});
test('Punnett: extremos y todos los cruces conservan probabilidad', () => {
  assert.deepEqual(punnett('AA', 'aa').cells, ['Aa', 'Aa', 'Aa', 'Aa']);
  assert.equal(punnett('aa', 'aa').recessive, 1);
  for (const a of ['AA', 'Aa', 'aa'])
    for (const b of ['AA', 'Aa', 'aa']) {
      const p = punnett(a, b);
      near(
        Object.values(p.genotypes).reduce((a, b) => a + b, 0),
        1,
      );
      assert.deepEqual(p.genotypes, punnett(b, a).genotypes);
    }
  assert.throws(() => punnett('AB', 'Aa'));
});
test('ADN: complementariedad antiparalela, ARN y péptido conocido', () => {
  const d = dna('ATGGCTTTCTAA');
  assert.equal(d.complement, 'TACCGAAAGATT');
  assert.equal(d.reverseComplement, 'TTAGAAAGCCAT');
  assert.equal(d.rna, 'AUGGCUUUCUAA');
  assert.equal(d.protein, 'MAF');
  assert.equal(d.codons.at(-1).aa, '*');
});
test('Código estándar completo, redundancia y terminación', () => {
  assert.equal(Object.keys(code).length, 64);
  assert.equal(new Set(Object.values(code)).size, 21);
  assert.deepEqual(
    Object.keys(code)
      .filter((k) => code[k] === '*')
      .sort(),
    ['UAA', 'UAG', 'UGA'],
  );
  assert.equal(code.UGG, 'W');
  assert.equal(code.AUG, 'M');
  assert.equal(dna('ATGTGAGCT').protein, 'M');
});
test('ADN: entrada vacía, caracteres inválidos y límite de longitud', () => {
  assert.equal(dna('').gc, 0);
  assert.equal(dna('gc gc').gc, 100);
  assert.equal(dna('ATGGC').remainder, 2);
  assert.throws(() => dna('<script>'));
  assert.throws(() => dna('A'.repeat(121)));
  assert.equal(dna('A'.repeat(120)).seq.length, 120);
});
test('Fotosíntesis: insumos cero, saturación y límites de índice', () => {
  near(photosynthesis(200, 200, 100), 25);
  for (const v of [
    [0, 400, 80],
    [600, 0, 80],
    [600, 400, 0],
  ])
    assert.equal(photosynthesis(...v), 0);
  assert.ok(photosynthesis(1500, 400, 80) > photosynthesis(200, 400, 80));
  assert.ok(photosynthesis(1500, 1200, 100) < 100);
});
test('Difusión: estado inicial, equilibrio y conservación', () => {
  const t0 = diffusion(80, 20, 0.1, 0);
  near(t0.left, 80);
  near(t0.right, 20);
  const t = diffusion(80, 20, 0.1, 10);
  near(t.left + t.right, 100);
  assert.ok(t.left < 80 && t.left > 50);
  near(diffusion(80, 20, 0.1, 200).left, 50);
  near(diffusion(40, 40, 0.2, 10).flux, 0);
  assert.ok(diffusion(20, 80, 0.1, 10).flux < 0);
});
test('Ósmosis: magnitud física y dirección', () => {
  near(osmosis(0.3, 0.1, 25).deltaPi, 0.49576382);
  assert.equal(osmosis(0.3, 0.1).direction, 'entrada');
  assert.equal(osmosis(0.1, 0.3).direction, 'salida');
  assert.equal(osmosis(0.3, 0.3).direction, 'equilibrio');
});
test('Población logística: N0, K, r cero y aproximación', () => {
  near(logistic(100, 0.2, 1000, 0), 100);
  near(logistic(100, 0.2, 1000, 200), 1000);
  near(logistic(1000, 0.2, 1000, 20), 1000);
  near(logistic(100, 0, 1000, 20), 100);
  assert.ok(logistic(1500, 0.2, 1000, 10) < 1500);
  assert.equal(logistic(0, 0.2, 1000, 10), 0);
});
test('Energía trófica: cuatro niveles calculados', () =>
  trophic(10000, 10).forEach((n, i) => near(n, [10000, 1000, 100, 10][i])));
test('Enzimas: velocidad cero, media máxima y saturación', () => {
  assert.equal(enzyme(0, 80, 5), 0);
  assert.equal(enzyme(5, 80, 5), 40);
  assert.ok(enzyme(1000, 80, 5) < 80);
  assert.ok(enzyme(20, 80, 5) > enzyme(5, 80, 5));
});
