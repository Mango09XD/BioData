import { icon, escapeHTML as esc } from '../ui.js';
import { modules } from '../catalog.js';
export function helix() {
  const a = [],
    b = [],
    rungs = [];
  for (let y = 25; y <= 285; y += 13) {
    const x = 210 + Math.sin(y / 42) * 65,
      z = 210 - Math.sin(y / 42) * 65;
    a.push(x + ',' + y);
    b.push(z + ',' + y);
    rungs.push(
      `<path d="M${x} ${y}H${z}" stroke="${y % 2 ? '#71e6c6' : '#7dbad7'}" stroke-width="5" opacity=".7"/><circle cx="${x}" cy="${y}" r="5" fill="#a0f5d7"/><circle cx="${z}" cy="${y}" r="5" fill="#4db9ce"/>`,
    );
  }
  return `<svg viewBox="0 0 420 310" aria-hidden="true"><g fill="none" stroke="#88d9ce" opacity=".2"><circle cx="210" cy="150" r="142"/><circle cx="210" cy="150" r="114" stroke-dasharray="3 8"/><path d="M15 150h390M210 0v300"/></g><g class="helix-group">${rungs.join('')}<polyline points="${a.join(' ')}" fill="none" stroke="#76e4bd" stroke-width="6"/><polyline points="${b.join(' ')}" fill="none" stroke="#65b7d3" stroke-width="6"/></g><g font-family="Segoe UI,sans-serif" font-size="10" fill="#b8eee5"><rect x="267" y="40" width="100" height="29" rx="8" fill="#155766"/><text x="282" y="59">01 · EXPLORAR</text><rect x="33" y="221" width="110" height="29" rx="8" fill="#155766"/><text x="46" y="240">02 · COMPRENDER</text><circle cx="70" cy="70" r="4" fill="#7be4b8"/><circle cx="350" cy="240" r="5" fill="#7be4b8"/></g></svg>`;
}
export function renderHome(root, { catalog, store }) {
  const read = store.snapshot.read.filter((id) => catalog.lessons.some((l) => l.id === id));
  const next = catalog.lessons.find((l) => !read.includes(l.id)) || catalog.lessons[0];
  root.innerHTML = `<section class="hero"><div class="hero-copy"><span class="eyebrow">BIODATA 4 · CONOCIMIENTO EN MOVIMIENTO</span><h1>La vida está llena<br>de <em>conexiones.</em></h1><p>De una molécula a un ecosistema. Explora la ciencia, pon a prueba tus ideas y descubre cómo funciona el mundo vivo.</p><div class="actions"><a class="button" href="#organismos">Comenzar a explorar ${icon('arrow')}</a><a class="button secondary" href="#laboratorio">Entrar al laboratorio</a></div><div class="hero-foot">OBSERVA · EXPERIMENTA · COMPRENDE</div></div><div class="hero-visual">${helix()}</div></section>
 <div class="stats">${[
   ['leaf', catalog.organisms.length, 'Organismos para descubrir'],
   ['atom', 118, 'Elementos conectados'],
   ['book', catalog.lessons.length, 'Lecciones con fuentes'],
   ['flask', 7, 'Modelos interactivos'],
 ]
   .map(
     ([i, n, t]) =>
       `<div class="stat">${icon(i)}<div><strong>${n}</strong><small>${t}</small></div></div>`,
   )
   .join('')}</div>
 <div class="section-heading"><div><span class="eyebrow">SIGUE TU CURIOSIDAD</span><h2>Un universo, muchas perspectivas</h2></div><p>Elige dónde comienza tu próximo descubrimiento.</p></div>
 <div class="grid">${modules
   .slice(1, 8)
   .map(
     ([id, title, i, desc]) =>
       `<a class="module-card" href="#${id}"><span class="module-icon">${icon(i)}</span><h3>${esc(title)}</h3><p>${esc(desc)}</p><small>Explorar área ↗</small></a>`,
   )
   .join(
     '',
   )}<a class="module-card" href="#academia/${next.id}"><span class="module-icon">${icon('arrow')}</span><h3>Tu siguiente paso</h3><p>${esc(next.title)}</p><small>${esc(next.level)} · ${next.time} min de lectura</small></a></div>
 <div class="home-bottom"><article class="panel feature"><span class="eyebrow">EL RETO CIENTÍFICO</span><h2>Entender cambia la forma de mirar.</h2><p>Responde una evaluación de 10 preguntas y descubre qué conceptos dominas y cuáles puedes reforzar.</p><a class="button" href="#academia/reto">Resolver el reto ${icon('arrow')}</a></article><article class="panel"><span class="eyebrow">TU RECORRIDO</span><h2>Cada idea cuenta.</h2><p>Has marcado ${read.length} de ${catalog.lessons.length} lecciones como leídas. Tu avance permanece en este navegador.</p><progress max="${catalog.lessons.length}" value="${read.length}" aria-label="Lecciones leídas"></progress><a class="text-button" href="#espacio">Ver mi aprendizaje ↗</a></article></div>
 <aside class="fact">${icon('dna')}<p><strong>Un pequeño detalle, una gran diferencia.</strong>Las dos cadenas de ADN son antiparalelas. A–T y C–G se complementan, pero para escribir ambas en sentido 5′→3′ necesitas invertir la cadena complementaria. <a href="#genetica">Compruébalo en el explorador de ADN ↗</a></p></aside>`;
}
