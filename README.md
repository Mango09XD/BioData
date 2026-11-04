# BioData 4.0.0

Plataforma educativa estática en español sobre biología, química, genética y ecología. Desarrollo preparado en `biodata-v4` para revisión antes de incorporar a `main`.

## Contenido y herramientas

- 30 organismos en seis grupos, con clasificación, adaptaciones, importancia ecológica, referencias e ilustraciones esquemáticas de grupo. Búsqueda, ordenamiento y comparación de dos o tres fichas.
- Tres tipos celulares seleccionables, 14 estructuras explicadas y recorridos por mitosis y meiosis. Se corrige la representación de cromátidas tras separarse.
- Explorador de ADN con orientación de cadenas, complemento inverso, ARN y traducción con los 64 codones del código estándar. Validación de secuencias y límite de 120 bases.
- Cuadros de Punnett AA/Aa/aa con probabilidades genotípicas y fenotípicas.
- 118 elementos con masas y configuraciones de PubChem, grupo, período, propiedades disponibles, usos y conexiones biológicas. Valores no disponibles y predicciones se identifican expresamente.
- Seis modelos numéricos: fotosíntesis, ósmosis, difusión, crecimiento logístico, transferencia trófica y cinética enzimática. Todos tienen controles, ecuaciones, gráficas, datos tabulados y límites del modelo.
- 32 lecciones, tres niveles, 44 preguntas en el banco y evaluaciones aleatorias de diez preguntas con revisión de respuestas. Cada lección incluye una pregunta con retroalimentación.
- 52 términos relacionados y ocho recursos institucionales. Ruta interactiva de método científico.
- Favoritos, historial, lecciones leídas, mejores resultados, objetivos personales y logros locales. Tema claro/oscuro y menú móvil con acceso por teclado.

El apartado educativo de bases de datos y sus preguntas, tarjetas, lección y glosario se retiraron. No se incluyen funciones de cuentas, administración de usuarios ni IA externa.

## Probar localmente

Necesitas un navegador moderno. Para el servidor de desarrollo y pruebas usa Node.js 20 o posterior; no hay paquetes que instalar.

```sh
git clone https://github.com/Mango09XD/BioData.git
cd BioData
git switch biodata-v4
npm start
```

Abre `http://127.0.0.1:4173/BioData/`. Detén el servidor con Ctrl+C. También puedes servir la carpeta con Live Server u otro servidor estático. Si descargaste el ZIP, abre una terminal en la carpeta descomprimida y ejecuta `npm start`.

No abras `index.html` mediante `file://`: los módulos ES y el contenido JSON requieren HTTP. En GitHub Pages no se ejecuta Node ni se necesita un servidor de aplicación.

```sh
npm test
```

Las pruebas usan el ejecutor incluido en Node. Consulta [docs/PRUEBAS.md](docs/PRUEBAS.md) para conocer qué se ejecutó y las limitaciones de la revisión.

## Estructura

```text
index.html          Estructura semántica, carga y navegación
assets/             Marca e ilustraciones SVG locales
css/                Tokens, distribución y módulos visuales
data/               Catálogos JSON y referencias
js/main.js          Navegación hash, búsquedas, menú y tema
js/catalog.js       Carga de contenido e índice global
js/models.js        Cálculos científicos independientes de la interfaz
js/storage.js       Adaptador local de preferencias y aprendizaje
js/ui.js            Utilidades, escape de texto e iconos
js/views/           Módulos de cada área y actividades
tests/              Integridad de contenido, modelos y persistencia
tools/serve.mjs     Servidor estático local
docs/               Auditoría, validación y mantenimiento
```

## Publicar después de aprobar la revisión

1. Revisa la propuesta de `biodata-v4` y ejecuta las comprobaciones indicadas.
2. Tras aprobación explícita, incorpora los cambios en `main`.
3. Conserva GitHub Pages configurado con **Deploy from a branch → main → /(root)**.
4. Revisa el resultado del flujo de Pages. El sitio conserva `https://mango09xd.github.io/BioData/`.
5. Comprueba rutas como `#organismos`, `#quimica/6` y `#academia/adn` en la URL publicada.

No hay paso de compilación, dependencias remotas, claves ni variables de entorno. `.nojekyll` evita procesamientos adicionales. Esta entrega no cambia la rama de publicación ni realiza un despliegue de producción.

## Mantener y ampliar

El contenido se almacena localmente en JSON. Añade explicaciones y fuentes verificables, conserva identificadores estables y ejecuta `npm test` después de editar. Las instrucciones detalladas están en [docs/MANTENIMIENTO.md](docs/MANTENIMIENTO.md).

Los valores químicos se importaron de PubChem el 4 de noviembre de 2026. Se conservan como una copia para no depender de una API al navegar. Las configuraciones y valores previstos permanecen identificados como tales. Los textos educativos son explicaciones propias del proyecto y los diagramas son esquemáticos. Las instituciones enlazadas no avalan BioData.

El almacenamiento usa `biodata.v4`. Se migran lecturas anteriores de `biodata.library.read`, el tema V2 y objetivos equivalentes de progreso V2 cuando están disponibles. Borrar datos del navegador elimina el progreso local. No hay sincronización entre perfiles o dispositivos.

## Evolución a V5

El adaptador de almacenamiento está separado de las vistas; podrá sustituirse por una capa de servicio. Los catálogos tienen identificadores estables y los modelos no dependen de la interfaz. Las cuentas, sincronización, backend y asistente con IA requieren un diseño y despliegue posteriores; no forman parte de V4.
