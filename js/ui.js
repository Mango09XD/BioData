export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const escapeHTML = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
export const norm = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
export const slug = (value) =>
  norm(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
export const enc = encodeURIComponent;
export const fmt = (value, digits = 1) =>
  Number(value).toLocaleString('es-MX', { maximumFractionDigits: digits });
const paths = {
  home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3z',
  leaf: 'M20 3C5 3 2 8 5 16s15 6 15-13ZM5 21 17 8M9 15v-5m4 1h4',
  cell: 'M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6 6l1 1m11 11-1-1',
  dna: 'M7 2c18 7-8 13 10 20M17 2C-1 9 25 15 7 22M7 4h10M7 9h10M7 15h10M7 20h10',
  atom: 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4M2 12c0-7 20-7 20 0S2 19 2 12M7 3c6-4 16 14 10 18S1 7 7 3M17 3C11-1 1 17 7 21S23 7 17 3',
  flask: 'M8 2h8M9 2v7L3 19q-1 3 3 3h12q4 0 3-3L15 9V2M6 15h12M9 18h1m4 1h1',
  academy: 'm2 8 10-5 10 5-10 5L2 8Zm4 3v7q6 5 12 0v-7m4-3v9',
  book: 'M12 5C8 2 3 3 2 4v16c3-2 7-2 10 0 3-2 7-2 10 0V4c-3-2-7-2-10 1Zm0 0v15M5 8h4m6 0h4M5 12h4m6 0h4',
  star: 'm12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1z',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  chart: 'M3 3v18h18M7 16l4-7 4 3 5-8',
  check: 'm5 12 4 4L20 5',
  search: 'M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m6 14 6 6',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 4v6l4 3',
};
export const icon = (name) =>
  `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.leaf}"/></svg>`;
export const heading = (kicker, title, desc) =>
  `<header class="page-heading"><span class="eyebrow">${escapeHTML(kicker)}</span><h1>${escapeHTML(title)}</h1><p>${escapeHTML(desc)}</p></header>`;
export const source = (url, label = 'Consultar fuente') =>
  `<a class="source" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} ↗</a>`;
export const empty = (text = 'No hay coincidencias. Prueba otra búsqueda.') =>
  `<div class="empty">${escapeHTML(text)}</div>`;
let toastTimer;
export function notify(text) {
  const box = $('#notifications');
  box.textContent = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    box.textContent = '';
  }, 4500);
}
export function bind(scope, selector, event, fn) {
  scope.querySelectorAll(selector).forEach((node) => node.addEventListener(event, fn));
}
export const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' });
export function favoriteButton(store, id) {
  return `<button class="favorite-button" data-favorite="${escapeHTML(id)}" aria-pressed="${store.hasFavorite(id)}" aria-label="${store.hasFavorite(id) ? 'Quitar de' : 'Añadir a'} favoritos">${icon('star')}</button>`;
}
export function setupFavorites(root, store) {
  bind(root, '[data-favorite]', 'click', (event) => {
    const b = event.currentTarget;
    const on = store.toggleFavorite(b.dataset.favorite);
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', (on ? 'Quitar de' : 'Añadir a') + ' favoritos');
    notify(on ? 'Guardado en tus favoritos.' : 'Retirado de tus favoritos.');
  });
}
export function svgElement(tag, attrs) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, String(v)));
  return node;
}
