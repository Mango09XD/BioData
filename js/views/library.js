import {
  $,
  heading,
  escapeHTML as esc,
  norm,
  slug,
  source,
  empty,
  favoriteButton,
  setupFavorites,
} from '../ui.js';
export function renderLibrary(root, { catalog, store, detail }) {
  if (detail === 'fuentes') {
    root.innerHTML =
      heading(
        'BIBLIOTECA · REFERENCIAS',
        'Conocimiento con procedencia.',
        'Estos recursos conectan las explicaciones de BioData con instituciones científicas y educativas.',
      ) +
      `<div class="grid">${catalog.sources.map((s) => `<article class="panel"><span class="eyebrow">${esc(s.institution)}</span><h2>${esc(s.title)}</h2><p>${esc(s.scope)}</p>${source(s.url, 'Abrir recurso')}</article>`).join('')}</div><div class="panel related"><h2>Créditos y alcance editorial</h2><p>Los textos de V4 son explicaciones educativas redactadas para BioData; conservan y revisan contenidos científicos de la versión anterior. Los datos químicos proceden de PubChem. Los diagramas e iconos SVG son ilustraciones originales del proyecto y no sirven para identificación de especies ni mediciones a escala.</p><p>Los nombres taxonómicos y agrupaciones se presentan como un esquema de consulta; las fichas ofrecen enlaces a GBIF, Kew, Animal Diversity Web o NCBI. Los enlaces permiten profundizar y contrastar, sin implicar que estas instituciones avalen BioData.</p><p>En el navegador no se envía tu progreso a servicios externos. Al abrir una fuente sales de BioData. Las preferencias y resultados guardados dependen del almacenamiento disponible en tu dispositivo.</p><a class="button secondary" href="#biblioteca">Volver al glosario</a></div>`;
    return;
  }
  const term = catalog.glossary.find((t) => slug(t.term) === detail);
  root.innerHTML =
    heading(
      'BIBLIOTECA Y GLOSARIO',
      'Las palabras también conectan.',
      '52 conceptos científicos con definiciones, temas relacionados y acceso a lecciones y fuentes.',
    ) +
    `<div class="actions"><a class="button secondary" href="#biblioteca/fuentes">Fuentes y créditos ↗</a><a class="text-button" href="#academia">Explorar lecciones ↗</a></div>${term ? `<article class="panel term-detail related"><div class="lesson-meta"><span class="eyebrow">CONCEPTO CIENTÍFICO</span>${favoriteButton(store, 'biblioteca/' + slug(term.term))}</div><h2>${esc(term.term)}</h2><p>${esc(term.definition)}</p><div class="chips">${term.related.map((t) => `<a class="chip" href="#biblioteca/${slug(t)}">${esc(t)} ↗</a>`).join('')}</div><a class="button" href="#academia/${term.lesson}">Estudiar el contexto</a> <a class="text-button" href="#biblioteca">Ver todos los conceptos</a></article>` : ''}<div class="toolbar related"><label>Buscar en el glosario<input type="search" id="glossary-search" placeholder="Ej. ósmosis, gen o evidencia"></label><small id="glossary-count" aria-live="polite"></small></div><div id="glossary-list" class="grid"></div>`;
  if (term) {
    store.visit('biblioteca/' + slug(term.term), term.term);
    setupFavorites(root, store);
  }
  function render() {
    const q = norm($('#glossary-search', root).value);
    const terms = catalog.glossary
      .filter((t) => norm(t.term + ' ' + t.definition + ' ' + t.related.join(' ')).includes(q))
      .sort((a, b) => a.term.localeCompare(b.term, 'es'));
    $('#glossary-count', root).textContent = terms.length + ' conceptos';
    $('#glossary-list', root).innerHTML = terms.length
      ? terms
          .map(
            (t) =>
              `<article class="panel glossary-card"><h2><a href="#biblioteca/${slug(t.term)}">${esc(t.term)}</a></h2><p>${esc(t.definition)}</p><a class="text-button" href="#academia/${t.lesson}">Comprender en contexto ↗</a></article>`,
          )
          .join('')
      : empty();
  }
  $('#glossary-search', root).oninput = render;
  render();
}
