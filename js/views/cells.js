import { $, $$, heading, escapeHTML as esc, source, svgElement } from '../ui.js';
const parts = {
  membrane: [
    'Membrana plasmática',
    'Bicapa lipídica con proteínas que regula intercambio, señalización y contacto celular. La difusión facilitada utiliza proteínas; el transporte activo puede movilizar solutos contra gradientes.',
    7,
    44,
  ],
  cytoplasm: [
    'Citoplasma',
    'Región celular que incluye citosol y estructuras fuera del núcleo. En el citosol ocurren numerosas reacciones, incluida la glucólisis.',
    65,
    72,
  ],
  nucleus: [
    'Núcleo',
    'Compartimento delimitado por doble membrana que contiene la mayor parte del ADN eucariota. Los poros regulan intercambio; el nucléolo participa en producir subunidades ribosómicas.',
    57,
    32,
  ],
  mitochondria: [
    'Mitocondria',
    'Orgánulo con doble membrana que participa en respiración celular y otras rutas. La membrana interna mantiene un gradiente que impulsa síntesis de ATP. Posee ADN propio.',
    77,
    59,
  ],
  ribosome: [
    'Ribosomas',
    'Complejos de ARN y proteínas que ensamblan polipéptidos. Están presentes en todos los tipos celulares. Los procariotas tienen ribosomas, aunque carezcan de núcleo.',
    28,
    63,
  ],
  er: [
    'Retículo endoplásmico',
    'Red de membranas eucariotas. El retículo rugoso participa en síntesis y procesamiento de proteínas de la vía secretora; el liso interviene en lípidos y otras funciones.',
    67,
    20,
  ],
  golgi: [
    'Aparato de Golgi',
    'Modifica, clasifica y dirige proteínas y lípidos hacia destinos celulares. Se comunica con otros compartimentos mediante vesículas.',
    35,
    24,
  ],
  lysosome: [
    'Lisosoma',
    'Compartimento ácido con enzimas de degradación, característico de células animales. Las vacuolas vegetales pueden cumplir funciones digestivas relacionadas.',
    23,
    44,
  ],
  chloroplast: [
    'Cloroplasto',
    'Orgánulo fotosintético de plantas y algas. Las reacciones luminosas ocurren en tilacoides y la fijación de carbono en el estroma. No todas las células de una planta tienen cloroplastos.',
    24,
    23,
  ],
  vacuole: [
    'Vacuola central',
    'Gran compartimento vegetal que almacena agua y solutos, contribuye a degradación y sostiene turgencia. La presión se contrapone a la resistencia de la pared celular.',
    38,
    55,
  ],
  wall: [
    'Pared celular',
    'Capa externa de soporte. En plantas contiene celulosa; en la mayoría de bacterias contiene peptidoglucano. Su composición varía entre linajes y no equivale a membrana.',
    87,
    40,
  ],
  nucleoid: [
    'Nucleoide',
    'Región procariota sin envoltura nuclear donde se organiza el ADN cromosómico. Las bacterias suelen tener un cromosoma circular; existen excepciones.',
    53,
    40,
  ],
  plasmid: [
    'Plásmido',
    'Molécula de ADN extracromosómico, a menudo circular, presente en algunas bacterias y otros organismos. Puede portar genes útiles, pero no está presente en todas las células.',
    30,
    32,
  ],
  flagellum: [
    'Flagelo bacteriano',
    'Estructura de motilidad que puede rotar mediante un motor de membrana. No todas las bacterias lo poseen; difiere de flagelos eucariotas y de estructuras de arqueas.',
    88,
    65,
  ],
};
const types = {
  animal: [
    'Célula animal',
    ['membrane', 'cytoplasm', 'nucleus', 'mitochondria', 'ribosome', 'er', 'golgi', 'lysosome'],
  ],
  vegetal: [
    'Célula vegetal',
    [
      'membrane',
      'cytoplasm',
      'nucleus',
      'mitochondria',
      'ribosome',
      'chloroplast',
      'vacuole',
      'wall',
    ],
  ],
  procariota: [
    'Célula procariota bacteriana',
    ['membrane', 'cytoplasm', 'ribosome', 'nucleoid', 'plasmid', 'wall', 'flagellum'],
  ],
};
const mitosis = [
  [
    'Interfase previa',
    'El ADN se replica en fase S. Antes de la mitosis hay cuatro cromosomas duplicados en este modelo 2n = 4. La interfase no es una fase de la mitosis.',
    'one',
    'threads',
  ],
  [
    'Profase',
    'Se condensan cuatro cromosomas, cada uno con dos cromátidas hermanas. El número de cromosomas se cuenta por centrómeros.',
    'one',
    'x',
  ],
  [
    'Prometafase',
    'Se desorganiza la envoltura nuclear y los microtúbulos del huso se unen a los cinetocoros.',
    'one',
    'x',
  ],
  [
    'Metafase',
    'Los cuatro cromosomas duplicados se alinean en el ecuador celular; las cromátidas se conectan a polos opuestos.',
    'one',
    'aligned',
  ],
  [
    'Anafase',
    'Se separan las cromátidas hermanas. Cada polo recibe cuatro cromosomas de una cromátida; ya no se representan como X.',
    'one',
    'apart',
  ],
  [
    'Telofase',
    'Se reorganizan dos núcleos con cuatro cromosomas cada uno. El ADN comienza a descondensarse.',
    'two',
    'rod',
  ],
  [
    'Citocinesis',
    'El citoplasma se divide. Se forman dos células 2n = 4, salvo variaciones o errores que este esquema no modela.',
    'two',
    'rod',
  ],
];
const meiosis = [
  [
    'Interfase previa',
    'Una sola replicación de ADN precede a dos divisiones. Modelo de partida: célula diploide 2n = 4.',
    'one',
    'x',
  ],
  [
    'Profase I',
    'Los homólogos se aparean y puede ocurrir entrecruzamiento entre cromátidas no hermanas. El intercambio se explica aquí; el dibujo no representa recombinación molecular.',
    'one',
    'paired',
  ],
  [
    'Metafase I',
    'Los pares de homólogos se orientan en el ecuador. Su orientación independiente contribuye a combinaciones genéticas distintas.',
    'one',
    'paired',
  ],
  [
    'Final de meiosis I',
    'Se separan homólogos, no cromátidas hermanas. Hay dos células n = 2, cada cromosoma aún duplicado. No se replica ADN antes de meiosis II.',
    'two',
    'x',
  ],
  [
    'Meiosis II',
    'Se separan las cromátidas hermanas de cada cromosoma. La división es semejante a una mitosis, pero las células de partida son haploides.',
    'two',
    'apart',
  ],
  [
    'Resultado haploide',
    'El resultado típico son cuatro células n = 2, con cromosomas de una cromátida. Los destinos y tamaños celulares dependen del organismo.',
    'four',
    'rod',
  ],
];
function drawDivision(svg, stage, isMeiosis) {
  svg.replaceChildren();
  const [, , layout, shape] = stage,
    centers =
      layout === 'four'
        ? [
            [95, 72],
            [265, 72],
            [95, 205],
            [265, 205],
          ]
        : layout === 'two'
          ? [
              [95, 140],
              [265, 140],
            ]
          : [[180, 140]];
  const add = (tag, attrs) => {
    const n = svgElement(tag, attrs);
    svg.append(n);
    return n;
  };
  centers.forEach(([cx, cy]) => {
    const rx = layout === 'one' ? 145 : 70,
      ry = layout === 'four' ? 55 : 95;
    add('ellipse', { cx, cy, rx, ry, fill: '#123e50', stroke: '#73cab8', 'stroke-width': 2 });
    const count = isMeiosis && layout !== 'one' ? 2 : 4;
    const draw = (x, y, i, mode) => {
      const color = i % 2 ? '#a1d7f0' : '#96e6bb';
      if (mode === 'threads')
        add('path', {
          d: `M${x - 8} ${y - 12}q20-8 14 10t8 15`,
          fill: 'none',
          stroke: color,
          'stroke-width': 3,
        });
      else
        add('path', {
          d:
            mode === 'x' || mode === 'paired' || mode === 'aligned'
              ? `M${x - 7} ${y - 11}l14 22m0-22-14 22`
              : `M${x - 6} ${y - 10}l7 10-7 10`,
          fill: 'none',
          stroke: color,
          'stroke-width': 4,
          'stroke-linecap': 'round',
        });
    };
    if (shape === 'apart')
      for (let side = -1; side <= 1; side += 2)
        for (let i = 0; i < count; i++)
          draw(cx + side * rx * 0.5, cy - 36 + (i * 72) / (count - 1), i, 'rod');
    else
      for (let i = 0; i < count; i++)
        draw(
          shape === 'aligned' ? cx : cx + (i % 2 ? 18 : -18),
          cy - 28 + Math.floor(i / 2) * 53,
          i,
          shape,
        );
  });
  svg.setAttribute('aria-label', stage[0] + ': ' + stage[1]);
}
export function renderCells(root, { store }) {
  root.innerHTML =
    heading(
      'LABORATORIO CELULAR',
      'Pequeñas estructuras. Grandes funciones.',
      'Selecciona un tipo celular y sus estructuras. Después sigue cómo se reparte la información genética.',
    ) +
    `<div class="chips" id="cell-types">${Object.entries(types)
      .map(
        ([key, [title]], i) =>
          `<button class="chip" data-cell="${key}" aria-pressed="${i === 0}">${title}</button>`,
      )
      .join(
        '',
      )}</div><div class="two-columns"><div class="panel"><div id="cell-scene" class="cell-scene"></div><p class="note">Diagrama esquemático, sin escala. Las posiciones permiten seleccionar estructuras; no representan una ubicación fija ni todas las estructuras de una célula real.</p></div><article class="panel" id="cell-info" aria-live="polite"></article></div>
 <div class="section-heading"><div><span class="eyebrow">INFORMACIÓN QUE SE REPARTE</span><h2>Mitosis y meiosis, paso a paso</h2></div><a class="text-button" href="#academia/meiosis">Profundizar en la meiosis ↗</a></div><div class="panel"><div class="chips"><button class="chip" data-division="mitosis" aria-pressed="true">Mitosis</button><button class="chip" data-division="meiosis" aria-pressed="false">Meiosis</button></div><div class="two-columns"><svg id="division-svg" viewBox="0 0 360 280" class="science-scene" role="img"></svg><div><span class="eyebrow" id="stage-count"></span><h3 id="stage-title"></h3><p id="stage-caption" aria-live="polite"></p><div class="actions"><button class="button secondary" id="previous">← Anterior</button><button class="button" id="play">Reproducir</button><button class="button secondary" id="next">Siguiente →</button></div></div></div><div class="chips stage-chips" id="stage-buttons"></div><p class="note">Modelo cromosómico: 2n = 4, sin representar recombinación ni huso a escala. En anafase mitótica se cuentan transitoriamente ocho cromosomas en la célula; cada polo recibe cuatro.</p>${source('https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle', 'Ciclo celular · OpenStax')} · ${source('https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis', 'Meiosis · OpenStax')}</div>`;
  let type = 'animal',
    division = 'mitosis',
    step = 0,
    timer;
  function showPart(key) {
    const [title, text] = parts[key];
    $('#cell-info', root).innerHTML =
      `<span class="eyebrow">ESTRUCTURA Y FUNCIÓN</span><h2>${title}</h2><p>${text}</p><a class="button secondary" href="#academia/membrana">Estudiar membrana y transporte</a>${source('https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells', 'Estructura celular · OpenStax')}`;
    $$('[data-part]', root).forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.part === key)),
    );
  }
  function drawCell() {
    const ids = types[type][1];
    $('#cell-scene', root).className = 'cell-scene ' + type;
    $('#cell-scene', root).innerHTML =
      `<div class="cell-outline"></div>${type === 'vegetal' ? '<div class="vacuole-shape"></div>' : ''}${ids
        .map((key) => {
          const [title, , x, y] = parts[key];
          return `<button class="cell-hotspot" style="left:${x}%;top:${y}%" data-part="${key}" aria-label="${esc(title)}" aria-pressed="false">${key === 'nucleus' ? '◉' : key === 'chloroplast' ? '▰' : key === 'mitochondria' ? '≈' : '●'}</button>`;
        })
        .join('')}<span class="cell-scene-label">${types[type][0]}</span>`;
    $$('[data-part]', root).forEach((b) => (b.onclick = () => showPart(b.dataset.part)));
    showPart(type === 'procariota' ? 'nucleoid' : 'nucleus');
  }
  $$('[data-cell]', root).forEach(
    (b) =>
      (b.onclick = () => {
        type = b.dataset.cell;
        $$('[data-cell]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        drawCell();
      }),
  );
  function stop() {
    clearInterval(timer);
    timer = null;
    $('#play', root).textContent = 'Reproducir';
  }
  function renderStage() {
    const stages = division === 'mitosis' ? mitosis : meiosis,
      s = stages[step];
    $('#stage-count', root).textContent =
      `${division.toUpperCase()} · ${step + 1} / ${stages.length}`;
    $('#stage-title', root).textContent = s[0];
    $('#stage-caption', root).textContent = s[1];
    $('#previous', root).disabled = step === 0;
    $('#next', root).disabled = step === stages.length - 1;
    $('#stage-buttons', root).innerHTML = stages
      .map(
        ([name], i) =>
          `<button class="chip" data-step="${i}" aria-pressed="${i === step}">${name}</button>`,
      )
      .join('');
    $$('[data-step]', root).forEach(
      (b) =>
        (b.onclick = () => {
          stop();
          step = Number(b.dataset.step);
          renderStage();
        }),
    );
    drawDivision($('#division-svg', root), s, division === 'meiosis');
  }
  $$('[data-division]', root).forEach(
    (b) =>
      (b.onclick = () => {
        stop();
        division = b.dataset.division;
        step = 0;
        $$('[data-division]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        renderStage();
      }),
  );
  $('#previous', root).onclick = () => {
    stop();
    step--;
    renderStage();
  };
  $('#next', root).onclick = () => {
    stop();
    step++;
    renderStage();
  };
  $('#play', root).onclick = () => {
    if (timer) {
      stop();
      return;
    }
    const stages = division === 'mitosis' ? mitosis : meiosis;
    if (step === stages.length - 1) step = 0;
    renderStage();
    $('#play', root).textContent = 'Pausar';
    timer = setInterval(() => {
      if (step === stages.length - 1) {
        stop();
        return;
      }
      step++;
      renderStage();
    }, 2800);
  };
  const visibility = () => {
    if (document.hidden) stop();
  };
  document.addEventListener('visibilitychange', visibility);
  drawCell();
  renderStage();
  return () => {
    clearInterval(timer);
    document.removeEventListener('visibilitychange', visibility);
  };
}
