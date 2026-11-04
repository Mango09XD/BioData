import { $, $$, escapeHTML, norm, icon, notify } from './ui.js';
import { modules, loadCatalog, buildIndex } from './catalog.js';
import { createStore } from './storage.js';
import { renderHome } from './views/home.js';
import { renderOrganisms } from './views/organisms.js';
import { renderCells } from './views/cells.js';
import { renderGenetics } from './views/genetics.js';
import { renderChemistry } from './views/chemistry.js';
import { renderLab } from './views/lab.js';
import { renderAcademy } from './views/academy.js';
import { renderLibrary } from './views/library.js';
import { renderSpace } from './views/space.js';
const renderers = {
  inicio: renderHome,
  organismos: renderOrganisms,
  celulas: renderCells,
  genetica: renderGenetics,
  quimica: renderChemistry,
  laboratorio: renderLab,
  academia: renderAcademy,
  biblioteca: renderLibrary,
  espacio: renderSpace,
};
const aliases = { tabla: 'quimica', desafio: 'academia', ruta: 'espacio', explorador: 'genetica' };
const store = createStore(undefined, () =>
  notify('El navegador no permite guardar. Tu avance se conserva solo durante esta visita.'),
);
let catalog,
  index,
  cleanup = () => {},
  initial = true;
function theme() {
  const dark =
    (store.snapshot.theme ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('#theme-toggle').setAttribute(
    'aria-label',
    dark ? 'Activar modo claro' : 'Activar modo oscuro',
  );
}
function menu(open) {
  const sidebar = $('#sidebar');
  sidebar.classList.toggle('open', open);
  sidebar.inert = !open && matchMedia('(max-width:800px)').matches;
  $('#backdrop').hidden = !open;
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle').setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  $('.workspace').inert = open;
  if (open) $('.nav-link')?.focus();
  else if (document.activeElement?.closest('#sidebar') && matchMedia('(max-width:800px)').matches)
    $('#menu-toggle').focus();
}
function hideSearch() {
  $('#search-results').hidden = true;
  $('#global-search').setAttribute('aria-expanded', 'false');
}
function search() {
  const q = norm($('#global-search').value.trim()),
    box = $('#search-results');
  if (!q) {
    hideSearch();
    return;
  }
  const results = index.filter((x) => norm(x.title + ' ' + x.detail).includes(q)).slice(0, 12);
  box.innerHTML = results.length
    ? results
        .map(
          (x) =>
            `<a class="search-hit" href="#${escapeHTML(x.id)}"><strong>${escapeHTML(x.title)}</strong><small>${escapeHTML(x.detail)}</small></a>`,
        )
        .join('')
    : '<p class="empty">No encontramos ese concepto. Prueba con ADN, carbono o célula.</p>';
  box.hidden = false;
  $('#global-search').setAttribute('aria-expanded', 'true');
}
function sidebarProgress() {
  const count = catalog.lessons.filter((l) => store.snapshot.read.includes(l.id)).length,
    percent = Math.round((count / catalog.lessons.length) * 100);
  $('#side-percent').textContent = percent + ' %';
  $('#side-progress').value = percent;
  $('#side-caption').textContent = count + ' de ' + catalog.lessons.length + ' lecciones leídas';
}
function route() {
  cleanup();
  cleanup = () => {};
  let path;
  try {
    path = decodeURIComponent(location.hash.slice(1));
  } catch {
    path = '';
  }
  const [raw = 'inicio', requestedDetail] = path.split('/'),
    view = raw === 'administracion' ? 'academia' : aliases[raw] || raw || 'inicio',
    detail = raw === 'administracion' ? 'metodo' : requestedDetail;
  const module = modules.find((m) => m[0] === view);
  hideSearch();
  menu(false);
  $$('.nav-link').forEach((a) => {
    if (a.dataset.view === view) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  $('#view-label').textContent = module?.[1] || 'Página no encontrada';
  document.title = (module?.[1] || 'Página no encontrada') + ' · BioData 4';
  const root = $('#main');
  root.className = 'fade-in';
  if (!module) {
    root.innerHTML =
      '<h1>Esta ruta no existe</h1><p>Elige un área de BioData para continuar.</p><a class="button" href="#inicio">Volver al inicio</a>';
  } else
    try {
      cleanup = renderers[view](root, { catalog, store, index, detail }) || (() => {});
    } catch (error) {
      console.error(error);
      root.innerHTML =
        '<h1>No pudimos abrir este contenido</h1><p>Regresa al inicio o vuelve a cargar la página.</p><a class="button" href="#inicio">Ir al inicio</a>';
    }
  if (module && !detail) store.visit(view, module[1]);
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (!initial) root.focus({ preventScroll: true });
  initial = false;
}
async function init() {
  theme();
  $('.skip-link').addEventListener('click', (e) => {
    e.preventDefault();
    $('#main').focus();
  });
  $('#theme-toggle').addEventListener('click', () => {
    store.setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    theme();
  });
  $('#menu-toggle').addEventListener('click', () =>
    menu($('#menu-toggle').getAttribute('aria-expanded') !== 'true'),
  );
  $('#backdrop').addEventListener('click', () => menu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const wasOpen = $('#menu-toggle').getAttribute('aria-expanded') === 'true';
      menu(false);
      hideSearch();
      if (wasOpen) $('#menu-toggle').focus();
    }
    if (
      e.key === '/' &&
      !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)
    ) {
      e.preventDefault();
      $('#global-search').focus();
    }
    if (e.key === 'Tab' && $('#sidebar').classList.contains('open')) {
      const links = $$('a,button', $('#sidebar'));
      const first = links[0],
        last = links.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  matchMedia('(max-width:800px)').addEventListener('change', () => menu(false));
  try {
    catalog = await loadCatalog();
    index = buildIndex(catalog);
  } catch (error) {
    console.error(error);
    $('#main').innerHTML =
      '<div class="empty"><h1>El contenido no pudo cargarse</h1><p>Comprueba la conexión y vuelve a intentarlo. Si abriste un archivo, utiliza un servidor local como indican las instrucciones.</p><button class="button" id="retry">Volver a intentar</button></div>';
    $('#retry').onclick = () => location.reload();
    return;
  }
  $('#navigation').innerHTML = modules
    .map(
      ([id, title, name], i) =>
        `<a class="nav-link ${i === 8 ? 'nav-divider' : ''}" data-view="${id}" href="#${id}">${icon(name)}<span>${title}</span></a>`,
    )
    .join('');
  $('#global-search').addEventListener('input', search);
  $('#global-search').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && !$('#search-results').hidden) {
      e.preventDefault();
      $('.search-hit')?.focus();
    }
  });
  $('#global-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const hit = $('.search-hit');
    if (hit && !$('#search-results').hidden) {
      location.hash = hit.getAttribute('href');
      hideSearch();
    }
  });
  $('#search-results').addEventListener('click', () => hideSearch());
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.global-search,.search-results')) hideSearch();
  });
  store.subscribe(sidebarProgress);
  sidebarProgress();
  window.addEventListener('hashchange', route);
  route();
  if (!store.available)
    notify('El almacenamiento no está disponible. El avance se guardará solo durante esta visita.');
}
init();
