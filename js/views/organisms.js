import {
  $,
  $$,
  escapeHTML as esc,
  norm,
  heading,
  empty,
  source,
  icon,
  favoriteButton,
  setupFavorites,
} from '../ui.js';
const types = ['Todos', 'Animal', 'Planta', 'Hongo', 'Bacteria', 'Protista', 'Arquea'];
const typeLabels = ['Todos', 'Animales', 'Plantas', 'Hongos', 'Bacterias', 'Protistas', 'Arqueas'];
const icons = {
  Animal: 'leaf',
  Planta: 'leaf',
  Hongo: 'cell',
  Bacteria: 'cell',
  Protista: 'cell',
  Arquea: 'dna',
};
function references(o) {
  const query = encodeURIComponent(o.scientific.replace(' spp.', ''));
  return (
    source('https://www.gbif.org/species/search?q=' + query, 'Consultar taxonomía en GBIF') +
    ' ' +
    (o.type === 'Animal'
      ? source(
          'https://animaldiversity.org/accounts/' + o.scientific.replace(' ', '_') + '/',
          'Biología en Animal Diversity Web',
        )
      : o.type === 'Planta'
        ? source('https://powo.science.kew.org/results?q=' + query, 'Plantas en Kew')
        : source(
            'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=' + query,
            'Consultar taxón en NCBI',
          ))
  );
}
export function renderOrganisms(root, { catalog, store, detail }) {
  const selected = catalog.organisms.find((o) => o.id === detail);
  if (detail && !selected) {
    root.innerHTML =
      heading(
        'ORGANISMOS',
        'Organismo no encontrado',
        'Puedes regresar al catálogo para elegir otra ficha.',
      ) + '<a class="button" href="#organismos">Volver al catálogo</a>';
    return;
  }
  if (selected) {
    const o = selected,
      t = o.taxonomy;
    store.visit('organismos/' + o.id, o.name);
    root.innerHTML = `<a class="text-button" href="#organismos">← Volver a organismos</a>${heading(o.type, o.name, o.summary)}<article class="panel organism-detail"><div class="organism-detail-head"><img src="assets/${o.type.toLowerCase()}.svg" alt="Ilustración esquemática del grupo ${esc(o.type)}" width="280" height="180"><div><span class="pill">${esc(o.type)}</span><h2><i>${esc(o.scientific)}</i></h2><p>La ilustración representa su grupo biológico; no es una fotografía de identificación.</p>${favoriteButton(store, 'organismos/' + o.id)}</div></div><h3>Clasificación de referencia</h3><dl class="taxonomy">${['Dominio', 'Reino / agrupación', 'Filo / división', 'Clase', 'Orden', 'Familia', 'Género', 'Especie / taxón'].map((k, i) => `<div><dt>${k}</dt><dd>${esc(i < 6 ? t[i] : i === 6 ? o.scientific.split(' ')[0] : o.scientific)}</dd></div>`).join('')}</dl><p class="note">«Protista» es una agrupación didáctica. Los rangos y nombres de linajes varían entre sistemas; se indican agrupaciones convencionales cuando corresponde. spp. representa varias especies de un género.</p><div class="detail-grid">${[
      ['Características', o.summary],
      ['Hábitat', o.habitat],
      ['Alimentación', o.nutrition],
      ['Reproducción', o.reproduction],
      ['Adaptaciones', t[6]],
      ['Importancia ecológica', t[7]],
      ['Curiosidad', o.facts],
    ]
      .map(([k, v]) => `<section><h3>${k}</h3><p>${esc(v)}</p></section>`)
      .join(
        '',
      )}</div>${references(o)}<div class="actions related"><a href="#academia/clasificacion" class="button secondary">Comprender la clasificación</a><a href="#organismos" class="text-button">Comparar con otro organismo ↗</a></div></article>`;
    setupFavorites(root, store);
    return;
  }
  root.innerHTML =
    heading(
      'ENCICLOPEDIA DE LA VIDA',
      'La biodiversidad, de cerca.',
      'Explora 30 fichas de seis grupos, busca adaptaciones y compara hasta tres organismos.',
    ) +
    `<div class="toolbar"><label>Buscar organismos<input id="organism-search" type="search" placeholder="Nombre, hábitat, adaptación…"></label><label>Ordenar<select id="organism-sort"><option value="name">Nombre A–Z</option><option value="scientific">Nombre científico</option><option value="type">Grupo biológico</option></select></label><small id="organism-count" aria-live="polite"></small></div><div class="chips">${types.map((t, i) => `<button class="chip" data-type="${t}" aria-pressed="${i === 0}">${typeLabels[i]}</button>`).join('')}</div><div class="comparison-bar"><span id="compare-caption">Selecciona 2 o 3 fichas para comparar.</span><button id="compare" class="button secondary" disabled>Comparar selección</button></div><div id="organism-list" class="grid"></div><section id="comparison" hidden aria-label="Comparación de organismos"></section>`;
  let type = 'Todos';
  const compare = new Set();
  function render() {
    const q = norm($('#organism-search', root).value),
      sort = $('#organism-sort', root).value;
    const list = catalog.organisms
      .filter(
        (o) =>
          (type === 'Todos' || o.type === type) &&
          norm(Object.values(o).flat().join(' ')).includes(q),
      )
      .sort((a, b) => a[sort].localeCompare(b[sort], 'es'));
    $('#organism-count', root).textContent = list.length + ' organismos';
    $('#organism-list', root).innerHTML = list.length
      ? list
          .map(
            (o) =>
              `<article class="organism-card"><a class="organism-image" href="#organismos/${o.id}"><img src="assets/${o.type.toLowerCase()}.svg" alt="Ilustración del grupo ${esc(o.type)}" width="340" height="170" loading="lazy"></a><div class="organism-copy"><span class="pill">${o.type}</span><h2><a href="#organismos/${o.id}">${esc(o.name)}</a></h2><i>${esc(o.scientific)}</i><p>${esc(o.summary)}</p><div class="card-bottom"><label class="compare-label"><input type="checkbox" data-compare="${o.id}" ${compare.has(o.id) ? 'checked' : ''}> Comparar</label>${favoriteButton(store, 'organismos/' + o.id)}</div></div></article>`,
          )
          .join('')
      : empty();
    setupFavorites(root, store);
    $$('[data-compare]', root).forEach(
      (input) =>
        (input.onchange = () => {
          if (input.checked && compare.size >= 3) {
            input.checked = false;
            $('#compare-caption', root).textContent =
              'El máximo es 3. Retira una ficha para elegir otra.';
            return;
          }
          input.checked
            ? compare.add(input.dataset.compare)
            : compare.delete(input.dataset.compare);
          $('#compare-caption', root).textContent = compare.size + ' de 3 fichas seleccionadas';
          $('#compare', root).disabled = compare.size < 2;
          $('#comparison', root).hidden = true;
        }),
    );
  }
  $('#organism-search', root).oninput = render;
  $('#organism-sort', root).onchange = render;
  $$('[data-type]', root).forEach(
    (b) =>
      (b.onclick = () => {
        type = b.dataset.type;
        $$('[data-type]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        render();
      }),
  );
  $('#compare', root).onclick = () => {
    const rows = catalog.organisms.filter((o) => compare.has(o.id)),
      box = $('#comparison', root);
    box.hidden = false;
    box.innerHTML = `<h2>Comparación científica</h2><div class="table-scroll"><table><caption>Características de los organismos seleccionados</caption><thead><tr><th scope="col">Característica</th>${rows.map((o) => `<th scope="col">${esc(o.name)}</th>`).join('')}</tr></thead><tbody>${[
      ['Grupo', 'type'],
      ['Nombre científico', 'scientific'],
      ['Hábitat', 'habitat'],
      ['Nutrición', 'nutrition'],
      ['Reproducción', 'reproduction'],
      ['Adaptaciones', 6],
      ['Importancia ecológica', 7],
    ]
      .map(
        ([label, key]) =>
          `<tr><th scope="row">${label}</th>${rows.map((o) => `<td>${esc(typeof key === 'number' ? o.taxonomy[key] : o[key])}</td>`).join('')}</tr>`,
      )
      .join('')}</tbody></table></div>`;
    box.scrollIntoView({ block: 'start', behavior: 'instant' });
  };
  render();
}
