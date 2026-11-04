import { slug } from './ui.js';
export const modules = [
  ['inicio', 'Inicio', 'home', 'Tu punto de partida para explorar la vida.'],
  ['organismos', 'Organismos', 'leaf', 'Compara formas de vida, adaptaciones y ecosistemas.'],
  [
    'celulas',
    'Laboratorio celular',
    'cell',
    'Descubre la función de cada estructura y la división celular.',
  ],
  ['genetica', 'Genética y ADN', 'dna', 'Conecta bases, genes y probabilidades de herencia.'],
  [
    'quimica',
    'Química de la vida',
    'atom',
    'Explora los 118 elementos y las moléculas de la vida.',
  ],
  [
    'laboratorio',
    'Laboratorio virtual',
    'flask',
    'Modifica variables y comprende modelos científicos.',
  ],
  ['academia', 'Academia BioData', 'academy', 'Aprende por niveles y comprueba tus conocimientos.'],
  [
    'biblioteca',
    'Biblioteca y glosario',
    'book',
    'Encuentra conceptos, conexiones y fuentes confiables.',
  ],
  ['espacio', 'Mi espacio', 'chart', 'Tu progreso, favoritos y descubrimientos recientes.'],
];
export async function loadCatalog() {
  const filenames = [
    'organisms-original',
    'organisms-extra',
    'taxonomy',
    'elements',
    'lessons-original',
    'lessons-extra',
    'glossary',
    'sources',
    'elements-context',
    'questions',
  ];
  const data = await Promise.all(
    filenames.map(async (name) => {
      const response = await fetch(new URL('../data/' + name + '.json', import.meta.url));
      if (!response.ok) throw new Error('No se pudo cargar ' + name);
      return response.json();
    }),
  );
  const [
    original,
    extra,
    taxonomy,
    elements,
    oldLessons,
    newLessons,
    glossary,
    sources,
    elementContext,
    questions,
  ] = data;
  const organisms = [...original, ...extra].map((o) => ({
    ...o,
    id: slug(o.scientific),
    type:
      o.scientific === 'Paramecium caudatum'
        ? 'Protista'
        : ['Escherichia coli', 'Lactobacillus spp.'].includes(o.scientific)
          ? 'Bacteria'
          : o.type,
    taxonomy: taxonomy[o.scientific],
  }));
  return {
    organisms,
    elements,
    elementContext,
    lessons: [...oldLessons, ...newLessons],
    glossary,
    sources,
    questions,
  };
}
export function buildIndex(catalog) {
  return [
    ...modules.map(([id, title, , detail]) => ({ id, title, detail })),
    {
      id: 'academia/reto',
      title: 'Reto BioData',
      detail: 'Evaluación científica de diez preguntas',
    },
    ...catalog.organisms.map((o) => ({
      id: 'organismos/' + o.id,
      title: o.name,
      detail: o.scientific + ' · ' + o.type,
    })),
    ...catalog.elements.map((e) => ({
      id: 'quimica/' + e.n,
      title: e.name,
      detail: e.s + ' · elemento ' + e.n,
    })),
    ...catalog.lessons.map((l) => ({
      id: 'academia/' + l.id,
      title: l.title,
      detail: l.cat + ' · ' + l.summary,
    })),
    ...catalog.glossary.map((t) => ({
      id: 'biblioteca/' + slug(t.term),
      title: t.term,
      detail: t.definition,
    })),
  ];
}
