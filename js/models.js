export function punnett(p1, p2) {
  if (!['AA', 'Aa', 'aa'].includes(p1) || !['AA', 'Aa', 'aa'].includes(p2))
    throw new Error('Genotipo no válido.');
  const cells = [...p1].flatMap((a) => [...p2].map((b) => [a, b].sort().join('')));
  const genotypes = Object.fromEntries(
    ['AA', 'Aa', 'aa'].map((g) => [g, cells.filter((x) => x === g).length / 4]),
  );
  return { cells, genotypes, dominant: 1 - genotypes.aa, recessive: genotypes.aa };
}
const complement = { A: 'T', T: 'A', C: 'G', G: 'C' };
const bases = 'UCAG';
const amino = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
export const code = Object.fromEntries(
  [...bases].flatMap((a, i) =>
    [...bases].flatMap((b, j) => [...bases].map((c, k) => [a + b + c, amino[i * 16 + j * 4 + k]])),
  ),
);
export function dna(sequence) {
  const seq = sequence.trim().toUpperCase().replace(/\s/g, '');
  if (/[^ATCG]/.test(seq) || seq.length > 120)
    throw new Error('Usa únicamente A, T, C y G; máximo 120 bases.');
  const comp = [...seq].map((b) => complement[b]).join('');
  const rna = seq.replaceAll('T', 'U');
  let protein = '',
    codons = [];
  for (let i = 0; i + 2 < rna.length; i += 3) {
    const triplet = rna.slice(i, i + 3),
      aa = code[triplet];
    codons.push({ triplet, aa });
    if (aa === '*') break;
    protein += aa;
  }
  return {
    seq,
    complement: comp,
    reverseComplement: [...comp].reverse().join(''),
    rna,
    protein,
    codons,
    gc: seq.length ? ([...seq].filter((b) => 'GC'.includes(b)).length / seq.length) * 100 : 0,
    remainder: rna.length % 3,
  };
}
export function photosynthesis(light, co2, water) {
  return 100 * (light / (light + 200)) * (co2 / (co2 + 200)) * (water / 100);
}
export function diffusion(left, right, k, time) {
  const mean = (left + right) / 2,
    difference = (left - right) * Math.exp(-2 * k * time);
  return { left: mean + difference / 2, right: mean - difference / 2, flux: k * difference };
}
export function osmosis(inside, outside, temperature = 25) {
  return {
    deltaPi: 0.008314 * (temperature + 273.15) * (inside - outside),
    direction: inside === outside ? 'equilibrio' : inside > outside ? 'entrada' : 'salida',
  };
}
export function logistic(initial, rate, capacity, time) {
  if (initial === 0) return 0;
  return capacity / (1 + ((capacity - initial) / initial) * Math.exp(-rate * time));
}
export function trophic(energy, efficiency, levels = 4) {
  return Array.from({ length: levels }, (_, i) => energy * (efficiency / 100) ** i);
}
export function enzyme(substrate, vmax, km) {
  return (vmax * substrate) / (km + substrate);
}
