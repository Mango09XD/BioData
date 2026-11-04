import { $, $$, heading, escapeHTML as esc, source, notify } from '../ui.js';
import { dna, punnett } from '../models.js';
export function renderGenetics(root, { store }) {
  root.innerHTML =
    heading(
      'GENÉTICA Y ADN',
      'Lee las conexiones de la herencia.',
      'Explora secuencias con orientación explícita y calcula probabilidades en un modelo mendeliano.',
    ) +
    `<div class="two-columns"><article class="panel"><span class="eyebrow">EXPLORADOR MOLECULAR</span><h2>De una secuencia a su mensaje</h2><label for="dna-input">Cadena codificante de ADN · 5′→3′<input id="dna-input" value="ATGGCTTTCTAA" maxlength="150" spellcheck="false" autocomplete="off" aria-describedby="dna-error" placeholder="A, T, C y G · hasta 120 bases"></label><div class="actions related"><button class="button secondary" id="dna-example">Cargar ejemplo</button><button class="text-button" id="dna-clear">Limpiar</button></div><p id="dna-error" role="status" class="error"></p><div id="dna-output"></div><p class="note">La cadena introducida se trata como codificante. Se traduce desde su primera base con el código estándar, hasta la primera señal de terminación. No se buscan genes ni se simula procesamiento de ARN. Las letras del péptido usan el código de una letra.</p>${source('https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi', 'Código genético · NCBI')}</article>
 <article class="panel"><span class="eyebrow">HERENCIA MENDELIANA</span><h2>Cuadro de Punnett</h2><p>Escoge los genotipos parentales. A y a representan dos alelos de un solo gen con dominancia completa de A.</p><div class="two-columns control-pair"><label>Progenitor 1<select id="parent-1">${['AA', 'Aa', 'aa'].map((x) => `<option ${x === 'Aa' ? 'selected' : ''}>${x}</option>`).join('')}</select></label><label>Progenitor 2<select id="parent-2">${['AA', 'Aa', 'aa'].map((x) => `<option ${x === 'Aa' ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div><div id="punnett-grid" class="punnett" aria-label="Combinaciones de gametos"></div><div id="punnett-result" class="note" aria-live="polite"></div><button id="save-cross" class="button secondary">Registrar actividad de genética</button><p class="note">Cada combinación tiene probabilidad 1/4. Los porcentajes son expectativas, no un número garantizado de descendientes. Este modelo no describe rasgos poligénicos, codominancia ni herencia ligada al sexo.</p>${source('https://openstax.org/books/biology-2e/pages/12-2-characteristics-and-traits', 'Herencia · OpenStax')}</article></div>
 <div class="section-heading"><h2>Construye una comprensión completa</h2></div><div class="grid">${[
   ['adn', 'ADN, genes y cromosomas'],
   ['replicacion', 'Replicación'],
   ['transcripcion', 'Transcripción'],
   ['traduccion', 'Traducción'],
   ['mutaciones', 'Mutaciones'],
   ['herencia-compleja', 'Más allá de Mendel'],
 ]
   .map(
     ([id, title]) =>
       `<a class="panel lesson-link" href="#academia/${id}"><h3>${title}</h3><span>Leer lección y practicar ↗</span></a>`,
   )
   .join('')}</div>`;
  function renderDNA() {
    try {
      const d = dna($('#dna-input', root).value);
      $('#dna-error', root).textContent = '';
      if (!d.seq) {
        $('#dna-output', root).innerHTML =
          '<p class="empty">Introduce una secuencia para explorar sus bases.</p>';
        return;
      }
      const shown = d.seq.slice(0, 24);
      $('#dna-output', root).innerHTML =
        `<div class="dna-ladder" aria-label="Pares de bases; esquema sin escala">${[...shown].map((base, i) => `<div class="base-pair" style="--offset:${Math.sin(i * 0.7) * 20}px"><span>${base}</span><i aria-hidden="true">${'AT'.includes(base) ? '··' : '···'}</i><span>${d.complement[i]}</span></div>`).join('')}</div><p class="muted small">Vista de las primeras ${shown.length} bases; todos los resultados usan la secuencia completa.</p><dl class="sequence-list"><dt>Codificante 5′→3′</dt><dd>${esc(d.seq)}</dd><dt>Complementaria 3′→5′</dt><dd>${d.complement}</dd><dt>Complementaria inversa 5′→3′</dt><dd>${d.reverseComplement}</dd><dt>ARN mensajero 5′→3′</dt><dd>${d.rna}</dd><dt>Péptido, marco +1</dt><dd>${d.protein || 'Sin aminoácidos antes de terminar'} ${d.codons.at(-1)?.aa === '*' ? '· STOP' : ''}</dd></dl><div class="metrics"><div><strong>${d.seq.length}</strong><small>Bases</small></div><div><strong>${d.gc.toFixed(1)} %</strong><small>Contenido GC</small></div><div><strong>${d.remainder}</strong><small>Bases fuera de triplete final</small></div></div><div class="codons">${d.codons.map((c) => `<span>${c.triplet}<b>${c.aa === '*' ? 'STOP' : c.aa}</b></span>`).join('')}</div>`;
    } catch (error) {
      $('#dna-error', root).textContent = error.message;
      $('#dna-output', root).replaceChildren();
    }
  }
  function renderPunnett() {
    const p1 = $('#parent-1', root).value,
      p2 = $('#parent-2', root).value,
      p = punnett(p1, p2);
    $('#punnett-grid', root).innerHTML =
      `<span>×</span>${[...p2].map((g) => `<span>${g}</span>`).join('')}${[...p1]
        .map(
          (g, i) =>
            `<span>${g}</span>${p.cells
              .slice(i * 2, i * 2 + 2)
              .map(
                (c) =>
                  `<strong class="${c === 'aa' ? 'recessive' : ''}">${c}<small>${c === 'aa' ? 'Recesivo' : 'Dominante'}</small></strong>`,
              )
              .join('')}`,
        )
        .join('')}`;
    $('#punnett-result', root).textContent =
      Object.entries(p.genotypes)
        .map(([g, p]) => `${g}: ${p * 100} %`)
        .join(' · ') +
      `. Fenotipo dominante: ${p.dominant * 100} %; recesivo: ${p.recessive * 100} %.`;
  }
  $('#dna-input', root).oninput = renderDNA;
  $('#dna-example', root).onclick = () => {
    $('#dna-input', root).value = 'ATGGCTTTCTAA';
    renderDNA();
  };
  $('#dna-clear', root).onclick = () => {
    $('#dna-input', root).value = '';
    renderDNA();
    $('#dna-input', root).focus();
  };
  $$('select', root).forEach((s) => (s.onchange = renderPunnett));
  $('#save-cross', root).onclick = () => {
    store.experiment('genetica');
    notify('Actividad de genética registrada en tu espacio.');
  };
  renderDNA();
  renderPunnett();
}
