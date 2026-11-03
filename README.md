# BioData — Enciclopedia Interactiva de la Vida

Prototipo educativo para la Muestra del Quehacer Educativo. Integra Biología y Programación en una interfaz interactiva.

## Cómo abrirlo
1. Descarga y descomprime `BioData_Proyecto_Completo.zip`.
2. Abre la carpeta `BioData`.
3. Abre `index.html` con Chrome, Edge o Firefox.
4. No necesitas instalar paquetes ni conectarte a internet para probar las funciones incluidas.

## Estructura
- `index.html`: estructura de la interfaz.
- `css/styles.css`: diseño, colores, distribución y adaptación a pantallas pequeñas.
- `js/data.js`: datos de organismos, elementos, estructuras celulares y esquema de base de datos.
- `js/app.js`: navegación general y procesos administrativos.
- `js/organismos.js`: catálogo, filtros y fichas.
- `js/tabla-periodica.js`: selector de elementos químicos.
- `js/celulas-adn.js`: información interactiva de la célula y ADN.
- `js/base-datos.js`: demostración visual de tablas y consultas SQL.
- `js/desafios.js`: preguntas, respuestas, puntuación y reinicio.
- `assets/`: carpeta reservada para imágenes e iconos propios.

## Funciones incluidas
- Navegación por módulos y subapartados.
- Buscador global básico y filtros de organismos.
- Fichas de organismos con hábitat, nutrición y reproducción.
- Tabla periódica de muestra con elementos seleccionables.
- Diagrama esquemático de una célula vegetal con estructuras seleccionables.
- Esquema visual de tablas y consulta SQL ilustrativa.
- Flujo de procesos administrativos.
- Cuestionario con retroalimentación y puntuación.
- Diseño adaptable a computadoras y celulares.

## Importante
- Esta versión es un **prototipo local**: la base de datos es ilustrativa y no está conectada a un servidor MySQL.
- La tabla periódica contiene una selección de elementos, no los 118.
- La información científica debe ampliarse y contrastarse con fuentes confiables antes de la exposición.
- La asistente de inteligencia artificial se dejó fuera, como se solicitó.
- No se cargan bibliotecas externas; el sitio puede abrirse sin conexión.

## Para editar
Puedes editar los archivos con Visual Studio Code. Mantén la estructura de carpetas para que los enlaces a CSS y JavaScript sigan funcionando.


## Mejora: Laboratorio interactivo
La rama `mejora-laboratorio-interactivo` añade un módulo de aprendizaje experimental, sin dependencias ni servicios de pago:
- **Cuadro de Punnett:** cruces monohíbridos AA/Aa/aa, cuatro combinaciones y porcentajes genotípicos y fenotípicos.
- **Factores limitantes de la fotosíntesis:** controles de luz, agua y CO₂. El indicador toma el valor mínimo; es una **simulación conceptual**, no una tasa experimental.
- **Glosario científico:** 12 conceptos de biología, genética, células y tecnología con búsqueda inmediata.
- Acceso desde la portada y la navegación lateral, diseño adaptable y controles accesibles.

Archivos afectados: `index.html`, `css/styles.css`, `js/app.js`, y el nuevo `js/laboratorio.js`.

### Pruebas manuales sugeridas
1. Abrir `index.html`; entrar en «Laboratorio» desde el menú y desde la portada.
2. En Punnett comprobar que `Aa × Aa` muestra AA 25 %, Aa 50 %, aa 25 % y dominante 75 %.
3. Comprobar `AA × aa`: 100 % Aa, dominante 100 %.
4. En fotosíntesis poner agua en 0: indicador 0. Cambiar los controles y comprobar el factor limitante.
5. Buscar «ADN» y «SQL» en el glosario; probar también una búsqueda vacía o sin resultados.
6. Revisar en móvil y verificar que los seis módulos anteriores siguen navegando correctamente.

No se incluye una IA real ni se cambia la demostración de MySQL. La integración futura de IA será responsabilidad del equipo asignado.


## BioData V2 — Actualización visual y funcional

La versión V2 conserva la demostración original de los módulos científicos y añade:

- Portada completamente renovada con ilustración vectorial original de ADN, tarjetas, estadísticas y paneles.
- Nueva interfaz de navegación lateral y barra superior adaptable a dispositivos móviles.
- Buscador global con resultados para organismos, elementos, temas celulares y módulos; acceso rápido con la tecla \`/\`.
- Modo claro/oscuro con preferencia guardada en el navegador.
- Sección **Mi aprendizaje** para marcar manualmente las 7 áreas completadas, con avance local almacenado mediante \`localStorage\`.
- Enlaces directos internos usando el fragmento de URL (por ejemplo, \`#laboratorio\`).
- Catálogo de organismos ampliado con ejemplos adicionales de México y otros ecosistemas.
- Cuestionario ampliado a **13 preguntas** y laboratorio de genética y fotosíntesis incluido.
- Todos los recursos básicos de la web siguen siendo gratuitos; no se requiere XAMPP, WampServer ni paquetes externos para visualizar esta DEMO.

### Ejecutar BioData V2

Abre \`index.html\` en un navegador moderno, o usa Live Server en Visual Studio Code. Los estilos de la V2 se encuentran en \`css/v2.css\` y los scripts compartidos siguen en la carpeta \`js/\`.

### Consideraciones importantes

- La pantalla «Mi aprendizaje» es local y manual: **no** equivale a cuentas de usuario ni a seguimiento en un servidor.
- La base de datos MySQL sigue siendo una **representación ilustrativa**, sin conexión real a MySQL.
- La asistente de IA no está implementada: otros integrantes del equipo desarrollarán esa parte.
- El simulador de fotosíntesis es conceptual y no estima resultados científicos medidos.
- La tabla periódica contiene una selección de elementos, no los 118.
- Revisar científicamente las fichas y diagramas antes de la exposición final.

### Comprobaciones recomendadas

1. Abrir la portada y comprobar la navegación por los nueve apartados (incluido Mi aprendizaje).
2. Abrir Organismos, Tabla periódica, Células, Laboratorio, Desafíos, Base de datos y Administración; probar los controles interactivos de cada módulo.
3. Buscar «Ajolote», «Oxígeno», «ADN» y un texto inexistente en el buscador superior.
4. Abrir un enlace directo con \`#laboratorio\` y volver a Inicio.
5. Marcar áreas completadas, actualizar el navegador y verificar que el progreso persiste. Restablecerlo con su botón.
6. Activar el modo oscuro, actualizar el navegador y verificar la persistencia.
7. Comprobar el menú móvil y distintas anchuras de pantalla.
8. Corroborar que el cuestionario muestra 13 preguntas y el laboratorio conserva sus controles.



## BioData V3 — Enciclopedia extendida y visualizaciones animadas

Se amplía la DEMO V2 sin depender de servicios pagados ni reemplazar el contenido anterior:

- **Biblioteca científica:** 16 guías temáticas extensas distribuidas entre biología, genética, ecología, química y tecnología. Cada guía tiene 3 apartados explicativos, conceptos clave, autoevaluación y un enlace a una fuente educativa para profundizar.
- **Explorador visual de ADN:** introduce secuencias A/T/C/G, observa su cadena complementaria, longitud y porcentaje GC con una visualización animada.
- **Animación de mitosis:** 6 etapas (incluida la interfase previa y la citocinesis), navegación manual y reproducción automática. Modelo esquemático.
- **Tabla periódica ampliada:** 118 elementos con nombres, símbolos, número atómico y ubicación. 26 fichas iniciales conservan más propiedades; las otras se identifican como fichas de referencia sin inventar sus masas o usos. Dispone de búsqueda y filtro de categoría.
- **Diseño ampliado:** nuevos módulos en la navegación, tarjetas con microanimaciones, órbitas del inicio, estilos móviles y soporte para usuarios que prefieren menos movimiento.
- **Integración con navegación V2:** permite buscar lecciones desde la barra superior y marcarlas como leídas mediante almacenamiento local.
- No se integró un proveedor de IA ni se añadió una conexión real a MySQL.

### Archivos de la ampliación
- \`js/contenidos.js\`: guías, filtros y autoevaluaciones.
- \`js/visualizaciones.js\`: modelo interactivo de ADN y secuencia de mitosis.
- \`js/elementos-completos.js\`: catálogo de los 118 elementos.
- \`js/tabla-periodica.js\`: representación interactiva de los elementos.
- \`css/v3.css\`: diseño, efectos y controles de los nuevos módulos.
- \`index.html\` y \`js/app.js\`: navegación e integración.

### Comprobación de la demo
1. Abrir \`index.html\`. En Inicio, comprobar la sección de módulos y animaciones.
2. Entrar a **Biblioteca**, buscar ADN, cambiar categorías, abrir una guía, responder y marcar como leída.
3. Ir a **Explorador visual**, escribir una secuencia de ADN, comprobar pares A-T y C-G y ajustar la entrada; avanzar y reproducir mitosis.
4. En **Tabla periódica**, seleccionar hidrógeno, carbono y oganesón, filtrar y buscar por nombre/símbolo/número.
5. Revisar los módulos heredados, la búsqueda, el menú móvil y el progreso de aprendizaje.
6. Activar la preferencia del sistema «reducir movimiento» y comprobar que las animaciones decorativas se detienen.

**Alcance científico:** los simuladores son ilustraciones didácticas, no visualizaciones moleculares de escala exacta ni predicciones experimentales. Las guías son material de apoyo, no sustituyen manuales especializados. Antes de su presentación pública conviene revisar científicamente las explicaciones y sus fuentes.

**Validación realizada en código:** análisis de sintaxis de los scripts JS modificados, comprobación de identificadores principales y carga del catálogo de 118 símbolos únicos. Pendiente: prueba integral con navegador en varios tamaños de pantalla.
