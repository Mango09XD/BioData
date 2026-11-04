import {
  $,
  $$,
  heading,
  escapeHTML as esc,
  norm,
  source,
  favoriteButton,
  setupFavorites,
  empty,
} from '../ui.js';
const categories = {
  Nonmetal: 'No metal',
  'Noble gas': 'Gas noble',
  'Alkali metal': 'Metal alcalino',
  'Alkaline earth metal': 'Alcalinotérreo',
  Metalloid: 'Metaloide',
  Halogen: 'Halógeno',
  'Post-transition metal': 'Metal postransición',
  'Transition metal': 'Metal de transición',
  Lanthanide: 'Lantánido',
  Actinide: 'Actínido',
};
const states = {
  Solid: 'Sólido',
  Liquid: 'Líquido',
  Gas: 'Gas',
  'Expected to be a Solid': 'Sólido previsto',
  'Expected to be a Gas': 'Gas previsto',
};
const biological = new Set([
  'H',
  'C',
  'N',
  'O',
  'P',
  'S',
  'Na',
  'K',
  'Mg',
  'Ca',
  'Cl',
  'Fe',
  'Zn',
  'Cu',
  'Mn',
  'Co',
  'Mo',
  'Se',
  'I',
]);
const noWeight = (n) => [43, 61, 84, 85, 86, 87, 88, 89].includes(n) || n >= 93;
export function renderChemistry(root, { catalog, store, detail }) {
  let selected = catalog.elements.find((e) => String(e.n) === detail) || catalog.elements[7];
  const kinds = [...new Set(catalog.elements.map((e) => e.GroupBlock))];
  root.innerHTML =
    heading(
      'QUÍMICA DE LA VIDA',
      '118 elementos. Infinitas conexiones.',
      'Busca un elemento y consulta su estructura electrónica, propiedades y usos. La posición conserva grupos y períodos.',
    ) +
    `<div class="toolbar"><label>Buscar elemento<input id="element-search" type="search" placeholder="Nombre, símbolo o número atómico"></label><label>Familia<select id="element-category"><option value="">Todas las familias</option>${kinds.map((k) => `<option value="${esc(k)}">${esc(categories[k] || k)}</option>`).join('')}</select></label><label>Enfoque<select id="element-bio"><option value="all">Todos los elementos</option><option value="bio">Selección biológica</option></select></label><small id="element-count" aria-live="polite"></small></div><p class="note">La selección biológica reúne ejemplos estudiados en BioData; no es una lista exhaustiva de elementos esenciales para todos los organismos. Desplaza la tabla horizontalmente en pantallas pequeñas.</p><div class="periodic-scroll" tabindex="0" role="region" aria-label="Tabla periódica con desplazamiento horizontal"><div id="periodic-table" class="periodic-table"></div></div><p id="element-empty" class="empty" hidden>No hay elementos que coincidan con los filtros.</p><article id="element-detail" class="panel related" aria-label="Ficha del elemento"></article><div class="section-heading"><h2>De los átomos a la vida</h2></div><div class="grid">${[
      [
        'biomoleculas',
        'Biomoléculas esenciales',
        'Carbohidratos, lípidos, proteínas y ácidos nucleicos.',
      ],
      ['enlaces', 'Enlaces químicos', 'Cómo las interacciones dan forma a la materia.'],
      ['ph', 'Agua, pH y amortiguadores', 'Comprende polaridad y equilibrio químico.'],
      ['enzimas', 'Enzimas y metabolismo', 'Del sustrato a la velocidad de reacción.'],
    ]
      .map(
        ([id, t, d]) =>
          `<a class="module-card" href="#academia/${id}"><h3>${t}</h3><p>${d}</p><small>Leer y practicar ↗</small></a>`,
      )
      .join('')}</div>`;
  function show(e) {
    selected = e;
    const val = (v, unit = '') =>
      v !== undefined && v !== null && String(v) !== '' ? esc(v) + unit : 'Sin valor en la fuente';
    $('#element-detail', root).innerHTML =
      `<div class="element-heading"><div class="element-symbol"><small>${e.n}</small><strong>${e.s}</strong></div><div><span class="eyebrow">${esc(categories[e.GroupBlock] || e.GroupBlock)}</span><h2>${esc(e.name)}</h2><p>${esc(e.Name)}</p></div>${favoriteButton(store, 'quimica/' + e.n)}</div><dl class="element-properties">${[
        ['Número atómico', e.n],
        ['Grupo', e.group ?? 'Serie f · sin asignación única en esta representación'],
        ['Período', e.period],
        [
          'Masa atómica de referencia',
          val(e.mass, ' u') +
            (noWeight(e.n) ? ' · masa de un isótopo, no peso atómico estándar' : ''),
        ],
        ['Configuración electrónica', e.configuration],
        ['Estado estándar', states[e.StandardState] || e.StandardState || 'No establecido'],
        ['Electronegatividad (Pauling)', val(e.Electronegativity)],
        ['Energía de ionización', val(e.IonizationEnergy, ' eV')],
        ['Punto de fusión', val(e.MeltingPoint, ' K')],
        ['Punto de ebullición', val(e.BoilingPoint, ' K')],
      ]
        .map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`)
        .join(
          '',
        )}</dl><h3>Aplicaciones y conexión con la vida</h3><p>${esc(catalog.elementContext[e.s])}</p>${!biological.has(e.s) ? '<p class="muted small">No se atribuye aquí un papel biológico esencial. Un uso médico o industrial de un compuesto no implica que el elemento sea un nutriente.</p>' : ''}<p class="note">Datos de PubChem, copia local del 4 de noviembre de 2026. Las configuraciones corresponden a átomos neutros; algunos valores de elementos superpesados son predicciones. Las masas publicadas no deben confundirse con números másicos; para elementos sin peso atómico estándar se indica la masa de referencia de un isótopo.</p>${source(e.source, 'Ficha completa · PubChem')} · ${source('https://iupac.org/what-we-do/periodic-table-of-elements/', 'Convenciones · IUPAC')}`;
    setupFavorites(root, store);
    store.visit('quimica/' + e.n, e.name);
    $$('[data-element]', root).forEach((b) =>
      b.setAttribute('aria-pressed', String(Number(b.dataset.element) === e.n)),
    );
  }
  function render() {
    const q = norm($('#element-search', root).value.trim()),
      kind = $('#element-category', root).value,
      bio = $('#element-bio', root).value === 'bio';
    let count = 0;
    $('#periodic-table', root).innerHTML = catalog.elements
      .map((e) => {
        const match =
          (!kind || e.GroupBlock === kind) &&
          (!bio || biological.has(e.s)) &&
          (!q ||
            (/^\d+$/.test(q)
              ? e.n === Number(q)
              : norm(e.name + ' ' + e.s + ' ' + e.Name).includes(q)));
        if (match) count++;
        const family = kinds.indexOf(e.GroupBlock);
        return `<button class="element-cell family-${family} ${match ? '' : 'dimmed'}" style="grid-column:${e.col};grid-row:${e.row}" data-element="${e.n}" aria-label="${esc(e.name)}, número atómico ${e.n}" aria-pressed="${selected.n === e.n}" ${match ? '' : 'disabled'}><small>${e.n}</small><strong>${e.s}</strong><span>${esc(e.name)}</span></button>`;
      })
      .join('');
    $('#element-count', root).textContent = count + ' de 118 elementos';
    $('#element-empty', root).hidden = count > 0;
    $$('[data-element]', root).forEach(
      (b) =>
        (b.onclick = () => {
          show(catalog.elements[Number(b.dataset.element) - 1]);
          $('#element-detail', root).scrollIntoView({ block: 'nearest', behavior: 'instant' });
        }),
    );
  }
  $('#element-search', root).oninput = render;
  $$('select', root).forEach((s) => (s.onchange = render));
  render();
  show(selected);
}
