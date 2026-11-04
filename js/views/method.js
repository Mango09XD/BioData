import { $, $$, escapeHTML as esc } from '../ui.js';
const stages = [
  [
    'Observar',
    'Comienza con una pregunta',
    'Ejemplo: ¿cómo cambia la germinación de semillas con la disponibilidad de agua? Define qué observarás y en qué condiciones.',
  ],
  [
    'Proponer',
    'Formula una hipótesis contrastable',
    'Ejemplo: dentro de cierto intervalo, un sustrato con humedad adecuada favorece la germinación frente a uno seco. Evita formular una conclusión antes de medir.',
  ],
  [
    'Diseñar',
    'Define variables y comparación',
    'Manipula una variable, conserva condiciones pertinentes y emplea semillas o grupos independientes. Registra especie, cantidades, temperatura y tiempo.',
  ],
  [
    'Analizar',
    'Compara resultados y variación',
    'Organiza mediciones, calcula proporciones de germinación y considera incertidumbre. Compara los resultados con lo esperado y examina explicaciones alternativas.',
  ],
  [
    'Comunicar',
    'Presenta evidencia y límites',
    'Describe métodos y resultados con claridad, cita fuentes y reconoce qué no permite concluir el diseño. Una nueva pregunta puede reiniciar el ciclo.',
  ],
];
export function methodMarkup() {
  return `<section class="lesson-check"><span class="eyebrow">DEL PROYECTO A LA INVESTIGACIÓN</span><h2>Una ruta para investigar</h2><div class="chips">${stages.map(([label], i) => `<button class="chip" data-method="${i}" aria-pressed="${i === 0}">${i + 1}. ${label}</button>`).join('')}</div><div id="method-detail" aria-live="polite"></div><p class="note">Esta secuencia organiza decisiones; la investigación real puede volver a etapas anteriores y también utilizar estudios observacionales.</p></section>`;
}
export function setupMethod(root) {
  function show(index) {
    const [, title, description] = stages[index];
    $('#method-detail', root).innerHTML = `<h3>${esc(title)}</h3><p>${esc(description)}</p>`;
    $$('[data-method]', root).forEach((b, i) =>
      b.setAttribute('aria-pressed', String(i === index)),
    );
  }
  $$('[data-method]', root).forEach((b) => (b.onclick = () => show(Number(b.dataset.method))));
  show(0);
}
