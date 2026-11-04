# Mantenimiento de BioData 4

## Contenido

Los contenidos heredados se conservaron en `*-original.json` y las ampliaciones en `*-extra.json` para hacer rastreable la migración. Ambos se cargan como un solo catálogo; no contienen versiones alternativas de una misma ficha.

Una lección tiene `id`, `title`, `cat`, `level`, `time`, `summary`, tres o más `parts` (título y explicación), `terms`, `check` (pregunta, opciones, índice correcto y explicación) y `source` HTTPS. Usa Esencial, Intermedio o Avanzado como nivel. Las vistas muestran el número de conceptos y lecciones del catálogo; al ampliar actualiza los textos descriptivos que indiquen 30, 32 o 52.

Para añadir un organismo, incluye campos de la ficha y una entrada en `taxonomy.json`, con dominio, reino/agrupación, filo, clase, orden, familia, adaptación e importancia ecológica. Indica el sistema de clasificación cuando sea necesario. Añade referencias específicas; no asignes rangos arbitrarios a grupos que no los tienen de forma uniforme. La ilustración de grupo no sustituye una imagen diagnóstica de la especie.

Los términos del glosario deben tener una lección existente y términos relacionados que también existan. Las pruebas detectan vínculos relacionados rotos. Las preguntas de evaluación enlazan una lección y usan un índice correcto comenzando en cero.

## Elementos

`elements.json` conserva propiedades obtenidas de la API oficial `https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON`. Los nombres españoles y posiciones de tabla se conservaron del catálogo previo. `elements-context.json` contiene explicaciones de usos y ejemplos biológicos para cada símbolo.

Antes de actualizar, conserva la fecha y procedencia, revisa símbolos y números atómicos y compara registros modificados. No rellenes datos ausentes por analogía. Las transiciones de fase pueden depender de presión y forma alotrópica; para uso técnico debe consultarse la ficha completa. Una clasificación convencional de familia no demuestra todas las propiedades de un elemento superpesado.

## Interfaz y modelos

`tokens.css` define ambos temas. `layout.css` organiza navegación y portada; `modules.css` presenta actividades. Mantén etiquetas y estados de foco, comprueba pantallas de 390, 768 y 1440 píxeles y respeta `prefers-reduced-motion`.

Las entradas de texto se escapan antes de insertarlas en plantillas. No añadas HTML o enlaces ejecutables provenientes de búsquedas, parámetros de URL o almacenamiento. No coloques credenciales en el cliente.

Los cálculos están en `models.js`; cada control del laboratorio define unidad, intervalo y valor inicial. Mantén ecuación, gráfica, tabla y explicación coherentes. Si cambias un modelo, adapta pruebas de estados límite y conservación, y vuelve a comprobar la interfaz.

## Progreso

`storage.js` es la única capa de persistencia. Lectura, resolución de conceptos, experimentos y objetivos personales se miden por separado. Las puntuaciones conservan el mejor resultado por proporción de aciertos. El adaptador funciona en memoria cuando el navegador impide guardar.

Al introducir un nuevo formato de datos, añade una migración explícita: no borres preferencias existentes. La interfaz no presenta cuentas o progreso remoto mientras no exista infraestructura para ello.

## Publicación y recuperación

Revisa y aprueba la propuesta antes de incorporar a main. No cambies la configuración de Pages para previsualizar la rama de desarrollo. Para recuperación después de una publicación, crea una reversión del cambio aprobado en GitHub o publica un commit anterior mediante un procedimiento revisado; evita reescribir el historial de main.

Los archivos de V2/V3 retirados siguen disponibles en el historial de Git. Los datos anteriores de navegador no se eliminan durante la migración.
