import {
  $,
  $$,
  heading,
  escapeHTML as esc,
  norm,
  slug,
  source,
  empty,
  notify,
  favoriteButton,
  setupFavorites,
  icon,
} from '../ui.js';
import { methodMarkup, setupMethod } from './method.js';
function lessonCard(l, store) {
  const s = store.snapshot;
  return `<article class="lesson-card panel"><div class="lesson-meta"><span class="pill">${esc(l.cat)}</span><small>${esc(l.level)} · ${l.time} min</small></div><h2><a href="#academia/${l.id}">${esc(l.title)}</a></h2><p>${esc(l.summary)}</p><div class="card-bottom"><small>${s.read.includes(l.id) ? '✓ Leída' : 'Por descubrir'}${s.scores[l.id]?.correct ? ' · ✓ Concepto comprobado' : ''}</small><a class="text-button" href="#academia/${l.id}">Estudiar ↗</a></div></article>`;
}
function renderLesson(root, { catalog, store }, lesson) {
  const l = lesson;
  store.visit('academia/' + l.id, l.title);
  root.innerHTML = `<a class="text-button" href="#academia">← Volver a Academia</a>${heading(l.cat + ' · ' + l.level, l.title, l.summary)}<article class="panel reading"><div class="lesson-meta"><span class="pill">Lectura guiada · ${l.time} min</span>${favoriteButton(store, 'academia/' + l.id)}</div>${l.parts.map(([h, p]) => `<section class="lesson-section"><h2>${esc(h)}</h2><p>${esc(p)}</p></section>`).join('')}<div class="chips">${l.terms.map((term) => (catalog.glossary.some((t) => norm(t.term) === norm(term)) ? `<a class="chip" href="#biblioteca/${slug(term)}">${esc(term)} ↗</a>` : `<span class="pill">${esc(term)}</span>`)).join('')}</div><p class="note">Lee, relaciona los conceptos y responde la pregunta. «Leída» registra tu revisión; el resultado de la pregunta se guarda por separado.</p><div class="actions"><button id="mark-read" class="button">${store.snapshot.read.includes(l.id) ? '✓ Lección leída' : 'Marcar como leída'}</button>${source(l.source, 'Fuente educativa del tema')}</div><section class="lesson-check"><span class="eyebrow">COMPRUEBA LA IDEA CENTRAL</span><h2>${esc(l.check[0])}</h2><div class="quiz-options">${l.check[1].map((text, i) => `<button class="quiz-option" data-answer="${i}">${esc(text)}</button>`).join('')}</div><p id="lesson-feedback" role="status"></p><button id="retry-question" class="text-button" hidden>Practicar otra vez</button></section></article><div class="section-heading"><h2>Conecta con otros temas</h2></div><div class="grid">${catalog.lessons
    .filter((x) => x.cat === l.cat && x.id !== l.id)
    .slice(0, 3)
    .map((x) => lessonCard(x, store))
    .join('')}</div>`;
  setupFavorites(root, store);
  if (['metodo', 'experimentos'].includes(l.id)) {
    root.querySelector('.reading').insertAdjacentHTML('beforeend', methodMarkup());
    setupMethod(root);
  }
  $('#mark-read', root).onclick = () => {
    store.markRead(l.id);
    $('#mark-read', root).textContent = '✓ Lección leída';
    notify('Lección registrada en tu recorrido.');
  };
  let answered = false;
  $$('[data-answer]', root).forEach(
    (b) =>
      (b.onclick = () => {
        if (answered) return;
        answered = true;
        const index = Number(b.dataset.answer),
          ok = index === l.check[2];
        $$('[data-answer]', root).forEach((button, i) => {
          button.disabled = true;
          if (i === l.check[2]) button.classList.add('correct');
          else if (button === b) button.classList.add('incorrect');
        });
        $('#lesson-feedback', root).textContent =
          (ok ? 'Correcto. ' : 'Revisa esta idea: ') + l.check[3];
        $('#retry-question', root).hidden = false;
        store.score(l.id, ok ? 1 : 0, 1);
      }),
  );
  $('#retry-question', root).onclick = () => {
    answered = false;
    $$('[data-answer]', root).forEach((b) => {
      b.disabled = false;
      b.classList.remove('correct', 'incorrect');
    });
    $('#lesson-feedback', root).textContent = '';
    $('#retry-question', root).hidden = true;
  };
}
export function renderAcademy(root, context) {
  const { catalog, store, detail } = context;
  if (detail === 'reto') {
    renderChallenge(root, context);
    return;
  }
  if (detail) {
    const l = catalog.lessons.find((x) => x.id === detail);
    if (l) {
      renderLesson(root, context, l);
      return;
    }
    root.innerHTML =
      heading('ACADEMIA', 'Lección no encontrada', 'Regresa al catálogo para continuar.') +
      '<a class="button" href="#academia">Ver lecciones</a>';
    return;
  }
  const cats = [...new Set(catalog.lessons.map((l) => l.cat))];
  root.innerHTML =
    heading(
      'ACADEMIA BIODATA',
      'Aprende con dirección. Avanza a tu ritmo.',
      '32 lecciones en tres niveles, preguntas con explicación y un reto de evaluación. El progreso se conserva en este navegador.',
    ) +
    `<div class="academy-banner panel"><div><span class="eyebrow">PON TUS IDEAS A PRUEBA</span><h2>Un reto, diez conexiones</h2><p>Preguntas de un banco de ${catalog.questions.length + catalog.lessons.length} preguntas. Al terminar podrás revisar todas tus respuestas.</p></div><a class="button" href="#academia/reto">Comenzar evaluación ${icon('arrow')}</a></div><div class="toolbar"><label>Buscar lecciones<input id="lesson-search" type="search" placeholder="Título, concepto o área"></label><label>Área<select id="lesson-category"><option value="">Todas las áreas</option>${cats.map((c) => `<option>${esc(c)}</option>`).join('')}</select></label><label>Nivel<select id="lesson-level"><option value="">Todos los niveles</option><option>Esencial</option><option>Intermedio</option><option>Avanzado</option></select></label><small id="lesson-count" aria-live="polite"></small></div><div id="lessons" class="grid"></div>`;
  function render() {
    const q = norm($('#lesson-search', root).value),
      cat = $('#lesson-category', root).value,
      level = $('#lesson-level', root).value;
    const lessons = catalog.lessons.filter(
      (l) =>
        (!cat || l.cat === cat) &&
        (!level || l.level === level) &&
        norm([l.title, l.summary, ...l.terms].join(' ')).includes(q),
    );
    $('#lesson-count', root).textContent = lessons.length + ' lecciones';
    $('#lessons', root).innerHTML = lessons.length
      ? lessons.map((l) => lessonCard(l, store)).join('')
      : empty();
  }
  $('#lesson-search', root).oninput = render;
  $$('select', root).forEach((s) => (s.onchange = render));
  render();
}
function renderChallenge(root, { catalog, store }) {
  const bank = [
    ...catalog.questions,
    ...catalog.lessons.map((l) => ({
      q: l.check[0],
      o: l.check[1],
      a: l.check[2],
      x: l.check[3],
      lesson: l.id,
    })),
  ];
  // Fisher–Yates gives every bank item the same chance to enter this evaluation.
  const shuffled = [...bank];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const questions = shuffled.slice(0, 10),
    answers = [];
  let current = 0,
    answered = false;
  root.innerHTML = `<a class="text-button" href="#academia">← Volver a Academia</a>${heading('EVALUACIÓN', 'El reto BioData', 'Responde diez preguntas. La explicación aparece después de elegir; al terminar se guarda tu mejor puntuación.')}<section id="challenge" class="panel challenge"></section>`;
  function finish() {
    const correct = answers.filter((a, i) => a === questions[i].a).length;
    store.score('reto', correct, questions.length);
    store.visit('academia/reto', 'Reto BioData');
    $('#challenge', root).innerHTML =
      `<span class="eyebrow">EVALUACIÓN COMPLETADA</span><h2>${correct} de ${questions.length} · ${correct * 10} %</h2><p>${correct >= 8 ? 'Has conectado muchos conceptos. Revisa las explicaciones para consolidarlos.' : 'Revisa las respuestas y retoma las lecciones relacionadas para reforzar tus ideas.'}</p><div class="actions"><button class="button" id="restart">Nuevo reto</button><a class="button secondary" href="#espacio">Ver mi progreso</a></div><div class="answer-review">${questions.map((q, i) => `<section><span class="pill">${answers[i] === q.a ? '✓ Correcta' : 'Para reforzar'}</span><h3>${i + 1}. ${esc(q.q)}</h3><p>Tu respuesta: ${esc(q.o[answers[i]])}<br>Respuesta correcta: ${esc(q.o[q.a])}</p><p>${esc(q.x)}</p><a href="#academia/${q.lesson}">Repasar lección ↗</a></section>`).join('')}</div>`;
    $('#restart', root).onclick = () => renderChallenge(root, { catalog, store });
  }
  function render() {
    const q = questions[current];
    answered = false;
    $('#challenge', root).innerHTML =
      `<div class="lesson-meta"><span class="pill">Pregunta ${current + 1} / ${questions.length}</span><span>${answers.filter((a, i) => a === questions[i].a).length} aciertos</span></div><progress max="10" value="${current}" aria-label="Preguntas respondidas"></progress><h2 id="challenge-question">${esc(q.q)}</h2><div class="quiz-options">${q.o.map((o, i) => `<button class="quiz-option" data-choice="${i}">${String.fromCharCode(65 + i)} · ${esc(o)}</button>`).join('')}</div><p id="challenge-feedback" role="status"></p><button id="question-next" class="button" disabled>${current === 9 ? 'Ver resultado' : 'Siguiente pregunta →'}</button>`;
    $$('[data-choice]', root).forEach(
      (b) =>
        (b.onclick = () => {
          if (answered) return;
          answered = true;
          const choice = Number(b.dataset.choice);
          answers.push(choice);
          $$('[data-choice]', root).forEach((option, i) => {
            option.disabled = true;
            if (i === q.a) option.classList.add('correct');
            else if (option === b) option.classList.add('incorrect');
          });
          $('#challenge-feedback', root).textContent =
            (choice === q.a ? 'Correcto. ' : 'Para tener en cuenta: ') + q.x;
          $('#question-next', root).disabled = false;
        }),
    );
    $('#question-next', root).onclick = () => {
      if (!answered) return;
      if (current === 9) finish();
      else {
        current++;
        render();
        $('#challenge-question', root).setAttribute('tabindex', '-1');
        $('#challenge-question', root).focus();
      }
    };
  }
  render();
}
