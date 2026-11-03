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

