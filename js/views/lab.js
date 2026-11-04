import { $, $$, heading, escapeHTML as esc, fmt, source, notify } from '../ui.js';
import { photosynthesis, diffusion, osmosis, logistic, trophic, enzyme } from '../models.js';
const base = 'https://openstax.org/books/biology-2e/pages/';
const experiments = {
  fotosintesis: {
    name: 'Fotosíntesis',
    title: 'Luz, carbono y disponibilidad de agua',
    instruction:
      'Modifica una variable manteniendo las otras constantes. Compara el índice fotosintético calculado para distintas intensidades de luz.',
    controls: [
      ['light', 'Luz · µmol de fotones m⁻² s⁻¹', 0, 1500, 50, 600],
      ['co2', 'CO₂ · ppm', 0, 1200, 20, 400],
      ['water', 'Disponibilidad relativa de agua · %', 0, 100, 5, 80],
    ],
    equation: 'Índice = 100 · L/(L+200) · C/(C+200) · W/100',
    limits:
      'Modelo didáctico de saturación, sin calibración para una especie. El resultado es un índice sin unidades, no una tasa medida. Omite temperatura, respiración y fotoinhibición.',
    source: base + '8-1-overview-of-photosynthesis',
    lesson: 'fotosintesis',
    calculate: (v) => ({
      value: photosynthesis(v.light, v.co2, v.water),
      unit: '/ 100',
      message:
        'Al aumentar luz o CO₂ la respuesta se satura. Si el agua o cualquiera de los otros insumos vale cero, el índice también es cero.',
      x: 'Luz (µmol m⁻² s⁻¹)',
      y: 'Índice (0–100)',
      points: Array.from({ length: 16 }, (_, i) => [
        i * 100,
        photosynthesis(i * 100, v.co2, v.water),
      ]),
    }),
  },
  osmosis: {
    name: 'Ósmosis',
    title: '¿Hacia dónde se moverá el agua?',
    instruction:
      'Compara concentraciones de solutos no permeantes dentro y fuera de una célula ideal. Ajusta hasta obtener equilibrio osmótico.',
    controls: [
      ['inside', 'Concentración interior · mol/L', 0, 0.6, 0.02, 0.3],
      ['outside', 'Concentración exterior · mol/L', 0, 0.6, 0.02, 0.1],
      ['temperature', 'Temperatura · °C', 0, 40, 1, 25],
    ],
    equation: 'Δπ = R · T · (Cinterior − Cexterior), R = 0.008314 MPa·L·mol⁻¹·K⁻¹',
    limits:
      'Soluciones ideales diluidas y un soluto no disociable (i = 1), membrana permeable solo al agua e igual presión hidrostática inicial. Se estima diferencia de presión osmótica, no volumen ni velocidad. Salidas negativas indican mayor presión osmótica exterior.',
    source: base + '5-2-passive-transport',
    lesson: 'membrana',
    calculate: (v) => {
      const r = osmosis(v.inside, v.outside, v.temperature);
      return {
        value: r.deltaPi,
        unit: 'MPa',
        message:
          r.direction === 'equilibrio'
            ? 'Sin flujo neto inicial por esta diferencia osmótica. Las moléculas de agua siguen moviéndose.'
            : r.direction === 'entrada'
              ? 'El agua tiende a entrar: la concentración de soluto no permeante es mayor dentro.'
              : 'El agua tiende a salir: la concentración de soluto no permeante es mayor fuera.',
        x: 'Concentración exterior (mol/L)',
        y: 'Δπ (MPa)',
        points: Array.from({ length: 13 }, (_, i) => [
          i * 0.05,
          osmosis(v.inside, i * 0.05, v.temperature).deltaPi,
        ]),
      };
    },
  },
  difusion: {
    name: 'Difusión',
    title: 'Un gradiente que se reduce',
    instruction:
      'Fija las concentraciones iniciales de dos compartimentos de igual volumen. Cambia el tiempo y observa que la cantidad total se conserva.',
    controls: [
      ['left', 'Concentración inicial A · mmol/L', 0, 100, 5, 80],
      ['right', 'Concentración inicial B · mmol/L', 0, 100, 5, 20],
      ['k', 'Constante de intercambio · min⁻¹', 0.01, 0.5, 0.01, 0.1],
      ['time', 'Tiempo · min', 0, 30, 1, 10],
    ],
    equation: 'CA(t) = media + (CA0−CB0)·exp(−2kt)/2; CB(t) = media − (CA0−CB0)·exp(−2kt)/2',
    limits:
      'Dos compartimentos bien mezclados, cerrados y de igual volumen, con intercambio pasivo lineal. No modela membranas selectivas, reacciones ni transporte activo. El equilibrio elimina flujo neto, no movimiento molecular.',
    source: base + '5-2-passive-transport',
    lesson: 'membrana',
    calculate: (v) => {
      const d = diffusion(v.left, v.right, v.k, v.time);
      return {
        value: d.left,
        unit: 'mmol/L en A',
        message: `En B: ${fmt(d.right, 2)} mmol/L. Suma de concentraciones: ${fmt(d.left + d.right, 2)} mmol/L, igual a la inicial porque los volúmenes son iguales. Flujo neto A→B: ${fmt(d.flux, 3)} mmol·L⁻¹·min⁻¹.`,
        x: 'Tiempo (min)',
        y: 'Concentración A (mmol/L)',
        points: Array.from({ length: 31 }, (_, i) => [i, diffusion(v.left, v.right, v.k, i).left]),
      };
    },
  },
  poblacion: {
    name: 'Población',
    title: 'Crecer con recursos limitados',
    instruction:
      'Ajusta población inicial, capacidad de carga y tasa. Explora qué pasa por debajo y por encima de la capacidad de carga.',
    controls: [
      ['initial', 'Población inicial · individuos', 10, 1000, 10, 100],
      ['capacity', 'Capacidad de carga K · individuos', 100, 2000, 50, 1000],
      ['rate', 'Tasa intrínseca r · año⁻¹', 0, 0.8, 0.02, 0.2],
      ['time', 'Tiempo · años', 0, 40, 1, 20],
    ],
    equation: 'N(t) = K / [1 + ((K−N0)/N0) · exp(−rt)]',
    limits:
      'Solución continua del crecimiento logístico con r y K constantes, población cerrada y sin edades ni azar. Los valores decimales representan abundancia modelada; no individuos fraccionados observados.',
    source: base + '45-3-environmental-limits-to-population-growth',
    lesson: 'poblaciones',
    calculate: (v) => ({
      value: logistic(v.initial, v.rate, v.capacity, v.time),
      unit: 'individuos modelados',
      message:
        v.initial === v.capacity
          ? 'N0 = K: la población permanece constante.'
          : v.initial < v.capacity
            ? 'La población crece hacia K si r > 0. A mayor densidad, menor crecimiento per cápita.'
            : 'N0 supera K: el modelo predice descenso hacia K si r > 0.',
      x: 'Tiempo (años)',
      y: 'Individuos',
      points: Array.from({ length: 41 }, (_, i) => [i, logistic(v.initial, v.rate, v.capacity, i)]),
    }),
  },
  ecosistema: {
    name: 'Ecosistema',
    title: 'La energía entre niveles tróficos',
    instruction:
      'Modifica la energía de productores y la eficiencia de transferencia. Compara los cuatro niveles y explica por qué no toda la energía alcanza el siguiente.',
    controls: [
      ['energy', 'Energía en productores · kJ', 1000, 20000, 500, 10000],
      ['efficiency', 'Eficiencia de transferencia · %', 5, 30, 1, 10],
    ],
    equation: 'En = E0 · (eficiencia/100)ⁿ',
    limits:
      'Cadena de cuatro niveles con una eficiencia constante elegida por el usuario. El 10 % es un ejemplo, no una ley universal. Una red real tiene múltiples rutas; la materia se recicla y la energía se disipa.',
    source: base + '46-2-energy-flow-through-ecosystems',
    lesson: 'ecosistemas',
    calculate: (v) => {
      const e = trophic(v.energy, v.efficiency);
      return {
        value: e[3],
        unit: 'kJ en nivel 4',
        message: `Productores: ${fmt(e[0])}; consumidores primarios: ${fmt(e[1])}; secundarios: ${fmt(e[2])}; terciarios: ${fmt(e[3])} kJ.`,
        x: 'Nivel trófico (0 = productores)',
        y: 'Energía disponible (kJ)',
        points: e.map((y, i) => [i, y]),
      };
    },
  },
  enzimas: {
    name: 'Enzimas',
    title: 'La velocidad tiene un límite',
    instruction:
      'Aumenta la concentración de sustrato y observa saturación. Ajusta [S] igual a Km y comprueba que v = Vmax/2.',
    controls: [
      ['substrate', 'Sustrato [S] · mmol/L', 0, 20, 0.5, 5],
      ['vmax', 'Vmax · µmol/min', 10, 100, 5, 80],
      ['km', 'Km · mmol/L', 0.5, 10, 0.5, 5],
    ],
    equation: 'v = Vmax · [S] / (Km + [S])',
    limits:
      'Modelo de Michaelis–Menten bajo supuestos de velocidad inicial y estado cuasiestacionario. No representa cooperatividad ni inhibición. Km no equivale automáticamente a una constante de afinidad en todos los mecanismos.',
    source: base + '6-5-enzymes',
    lesson: 'enzimas',
    calculate: (v) => ({
      value: enzyme(v.substrate, v.vmax, v.km),
      unit: 'µmol/min',
      message: `La velocidad corresponde al ${fmt((100 * enzyme(v.substrate, v.vmax, v.km)) / v.vmax)} % de Vmax. Con [S] = Km = ${fmt(v.km)}, la velocidad sería ${fmt(v.vmax / 2)} µmol/min.`,
      x: 'Sustrato (mmol/L)',
      y: 'Velocidad (µmol/min)',
      points: Array.from({ length: 21 }, (_, i) => [i, enzyme(i, v.vmax, v.km)]),
    }),
  },
};
function graph(r) {
  const ys = r.points.map((p) => p[1]),
    min = Math.min(0, ...ys),
    max = Math.max(1, ...ys),
    xmin = r.points[0][0],
    xmax = r.points.at(-1)[0];
  const x = (n) => 55 + ((n - xmin) / (xmax - xmin || 1)) * 445,
    y = (n) => 225 - ((n - min) / (max - min || 1)) * 175;
  return `<svg class="plot" viewBox="0 0 550 285" role="img" aria-label="${esc(r.y + ' en función de ' + r.x)}"><path d="M55 45V225H510" fill="none" stroke="currentColor" opacity=".4"/><path d="M55 ${y(0)}H510" stroke="currentColor" opacity=".15"/><polyline points="${r.points.map(([a, b]) => x(a) + ',' + y(b)).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="3"/><g fill="currentColor" font-size="11"><text x="55" y="19">${esc(r.y)}</text><text x="240" y="278">${esc(r.x)}</text><text x="8" y="53">${fmt(max)}</text><text x="8" y="230">${fmt(min)}</text><text x="55" y="246">${fmt(xmin)}</text><text x="489" y="246">${fmt(xmax)}</text></g></svg>`;
}
export function renderLab(root, { store, detail }) {
  let active = experiments[detail] ? detail : 'fotosintesis';
  root.innerHTML =
    heading(
      'LABORATORIO VIRTUAL',
      'Cambia una variable. Descubre un patrón.',
      'Seis modelos numéricos con controles, resultados y supuestos explícitos. La genética se explora en su propio laboratorio.',
    ) +
    `<div class="chips" id="lab-tabs">${Object.entries(experiments)
      .map(
        ([id, e]) =>
          `<button class="chip" data-lab="${id}" aria-pressed="${id === active}">${e.name}</button>`,
      )
      .join('')}<a class="chip" href="#genetica">Genética ↗</a></div><div id="experiment"></div>`;
  function render() {
    const e = experiments[active];
    $('#experiment', root).innerHTML =
      `<article class="panel"><span class="eyebrow">EXPERIMENTO · ${e.name}</span><h2>${e.title}</h2><p>${e.instruction}</p><div class="two-columns"><form id="lab-form"><div class="sliders">${e.controls.map(([id, label, min, max, step, value]) => `<label for="${id}">${label}<span class="slider-value" id="value-${id}">${fmt(value)}</span><input id="${id}" name="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`).join('')}</div><div class="actions"><button class="button" type="submit">Calcular y registrar</button><button class="button secondary" type="reset">Valores iniciales</button></div><p class="note"><strong>Ecuación</strong><br>${esc(e.equation)}</p></form><div id="lab-output" aria-live="polite"></div></div><p class="note"><strong>Alcance y supuestos</strong><br>${e.limits}</p><div class="actions">${source(e.source, 'Fundamento científico · OpenStax')}<a class="text-button" href="#academia/${e.lesson}">Estudiar el tema ↗</a></div></article>`;
    function calculate() {
      const values = Object.fromEntries(
        e.controls.map(([id]) => [id, Number($('#' + id, root).value)]),
      );
      e.controls.forEach(([id]) => ($('#value-' + id, root).textContent = fmt(values[id], 2)));
      const r = e.calculate(values);
      $('#lab-output', root).innerHTML =
        `<div class="lab-result"><strong>${fmt(r.value, 3)}</strong><span>${r.unit}</span></div><p>${esc(r.message)}</p>${graph(r)}<details><summary>Ver los datos de la gráfica</summary><div class="table-scroll"><table><caption>Valores calculados por el modelo</caption><thead><tr><th scope="col">${esc(r.x)}</th><th scope="col">${esc(r.y)}</th></tr></thead><tbody>${r.points.map(([x, y]) => `<tr><td>${fmt(x, 2)}</td><td>${fmt(y, 3)}</td></tr>`).join('')}</tbody></table></div></details>`;
    }
    $$('input', root).forEach((input) => (input.oninput = calculate));
    $('#lab-form', root).onsubmit = (event) => {
      event.preventDefault();
      calculate();
      store.experiment(active);
      notify('Experimento registrado en tu espacio de aprendizaje.');
    };
    $('#lab-form', root).onreset = (event) => {
      event.preventDefault();
      e.controls.forEach((control) => {
        $('#' + control[0], root).value = control[5];
      });
      calculate();
    };
    calculate();
  }
  $$('[data-lab]', root).forEach(
    (b) =>
      (b.onclick = () => {
        active = b.dataset.lab;
        $$('[data-lab]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        render();
      }),
  );
  render();
}
