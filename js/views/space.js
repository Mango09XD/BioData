import { $, heading, escapeHTML as esc, empty, icon, notify } from '../ui.js';
export function renderSpace(root, { catalog, store, index }) {
  const s = store.snapshot,
    read = catalog.lessons.filter((l) => s.read.includes(l.id)),
    checks = catalog.lessons.filter((l) => s.scores[l.id]?.correct === 1),
    best = s.scores.reto;
  const achievements = [
    ['Primer descubrimiento', read.length >= 1, 'Leer una lección'],
    ['Conexiones en marcha', read.length >= 10, 'Leer diez lecciones'],
    ['Ideas comprobadas', checks.length >= 5, 'Resolver cinco preguntas de lección'],
    ['Mente experimental', s.experiments.length >= 3, 'Registrar tres modelos distintos'],
    [
      'Reto científico',
      Boolean(best && best.correct / best.total >= 0.8),
      'Lograr 80 % o más en un reto',
    ],
  ];
  const favorites = s.favorites.map((id) => index.find((x) => x.id === id)).filter(Boolean);
  const savedRoute = Array.isArray(s.routes) ? s.routes : [];
  root.innerHTML =
    heading(
      'MI ESPACIO',
      'Tu curiosidad deja huella.',
      'Progreso y preferencias guardados en este navegador. Puedes leer, practicar y volver a tus descubrimientos.',
    ) +
    `<div class="stats">${[
      [read.length + '/' + catalog.lessons.length, 'Lecciones leídas'],
      [checks.length, 'Conceptos comprobados'],
      [s.experiments.length + '/7', 'Modelos registrados'],
      [best ? Math.round((best.correct / best.total) * 100) + ' %' : '—', 'Mejor evaluación'],
    ]
      .map(
        ([n, t]) => `<div class="stat"><div><strong>${n}</strong><small>${t}</small></div></div>`,
      )
      .join(
        '',
      )}</div><div class="panel"><h2>Tu ruta de aprendizaje</h2><p>Las lecciones leídas y preguntas resueltas se cuentan por separado. Estos objetivos personales son opcionales.</p><div class="route-grid">${[
      ['fundamentos', 'Fundamentos', 'celulas'],
      ['herencia', 'Información y herencia', 'adn'],
      ['materia', 'Materia y energía', 'biomoleculas'],
      ['ambiente', 'Vida y ambiente', 'ecosistemas'],
    ]
      .map(
        ([id, title, lesson]) =>
          `<div class="route-item"><label><input type="checkbox" data-route="${id}" ${savedRoute.includes(id) ? 'checked' : ''}> ${title}</label><a href="#academia/${lesson}">Abrir ruta ↗</a></div>`,
      )
      .join(
        '',
      )}</div></div><div class="section-heading"><h2>Logros de aprendizaje</h2></div><div class="achievement-grid">${achievements.map(([name, unlocked, desc]) => `<article class="panel achievement ${unlocked ? 'unlocked' : ''}">${icon(unlocked ? 'check' : 'star')}<h3>${name}</h3><p>${desc}</p><span class="pill">${unlocked ? 'Conseguido' : 'Por descubrir'}</span></article>`).join('')}</div><div class="section-heading"><h2>Mis favoritos</h2><p>${favorites.length} contenidos guardados</p></div><div class="grid">${favorites.length ? favorites.map((x) => `<article class="panel saved-item"><h3><a href="#${esc(x.id)}">${esc(x.title)}</a></h3><p>${esc(x.detail)}</p><button class="text-button" data-remove="${esc(x.id)}">Quitar de favoritos</button></article>`).join('') : empty('Aún no guardas favoritos. Usa la estrella en organismos, elementos, lecciones o conceptos.')}</div><div class="section-heading"><h2>Descubrimientos recientes</h2></div><div class="history-list panel">${s.recent.length ? s.recent.map((x) => (index.find((i) => i.id === x.id) ? `<a href="#${esc(x.id)}">${esc(x.title)}<small>${new Date(x.date).toLocaleDateString('es-MX')}</small></a>` : '')).join('') : empty('Tu historial aparecerá al explorar contenidos.')}</div><section class="panel related"><h2>Sobre tus datos</h2><p>${store.available ? 'El progreso se guarda en localStorage.' : 'El navegador no permite almacenamiento persistente.'} Se limita a este navegador y perfil; borrar datos del sitio puede eliminarlo. No hay cuentas ni sincronización entre dispositivos.</p><button id="clear-progress" class="button secondary">Restablecer mis datos de aprendizaje</button></section>`;
  root.querySelectorAll('[data-remove]').forEach(
    (b) =>
      (b.onclick = () => {
        store.toggleFavorite(b.dataset.remove);
        renderSpace(root, { catalog, store, index });
        notify('Favorito retirado.');
      }),
  );
  root
    .querySelectorAll('[data-route]')
    .forEach((b) => (b.onchange = () => store.toggleRoute(b.dataset.route)));
  $('#clear-progress', root).onclick = () => {
    if (
      !confirm(
        'Se borrarán favoritos, historial, lecciones, objetivos y puntuaciones de BioData V4 en este navegador. Se conservará el tema. ¿Restablecer?',
      )
    )
      return;
    store.clear();
    renderSpace(root, { catalog, store, index });
    notify('Datos de aprendizaje restablecidos.');
  };
}
