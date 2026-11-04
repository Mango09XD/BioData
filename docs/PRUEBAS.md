# Verificación de BioData 4.0.0

Fecha: 4 de noviembre de 2026. Entorno: Windows, Node 26.13.0, navegador integrado basado en Chromium. Las pruebas se realizaron sobre una copia local de la rama `biodata-v4`, servida por HTTP con prefijo `/BioData/`.

## Pruebas automatizadas ejecutadas

`npm test`: **21 pruebas aprobadas, 0 fallidas**. El ejecutor y las pruebas están incluidos en el repositorio y no requieren instalar dependencias.

- Nueve combinaciones parentales AA/Aa/aa, probabilidades normalizadas y simetría de los progenitores.
- Secuencia de referencia ATGGCTTTCTAA: complemento TACCGAAAGATT, complemento inverso TTAGAAAGCCAT, ARN AUGGCUUUCUAA y péptido MAF antes de STOP.
- Los 64 codones del código estándar, 20 aminoácidos y tres codones de terminación; rechazo de caracteres inválidos y secuencias demasiado largas.
- Estados límite de fotosíntesis, conservación en difusión, dirección y magnitud osmótica, crecimiento logístico, transferencia trófica y saturación enzimática.
- 118 símbolos y posiciones sin colisiones, masas y configuraciones presentes, 30 fichas con clasificación, 32 lecciones y 44 entradas de preguntas válidas.
- 52 términos con vínculos relacionados y lecciones existentes.
- Escape de texto dinámico, búsqueda sin tildes y retirada del módulo educativo de SQL.
- Persistencia de favoritos y mejores resultados, historial limitado y sin duplicados, migración de lecturas, almacenamiento bloqueado y JSON corrupto.

Además se ejecutó `node --check` sobre todos los módulos JavaScript y se analizaron todos los archivos JSON sin errores.

## Comprobaciones de interfaz ejecutadas

1. Inicio: carga de catálogos y navegación a módulos bajo `/BioData/`; contadores 30/118/32/7.
2. Organismos: búsqueda de Ajolote, entrada sin coincidencias, filtro de tres arqueas, comparación de dos fichas con hábitat/nutrición/reproducción/adaptaciones/importancia ecológica. Apertura de ficha del Ajolote y guardado como favorito.
3. Búsqueda global: Carbono abre la ficha correcta en Química.
4. Tabla: selección de Carbono y Oganesón; búsqueda numérica 118 devuelve un solo elemento. La ficha superpesada identifica predicciones y propiedades ausentes.
5. Genética: entrada ATGX produce error; cargar ejemplo recupera resultados. AA × aa produce 100 % Aa y 100 % fenotipo dominante. Se registra la actividad.
6. Fotosíntesis: agua en cero produce índice cero. Restablecer recupera el valor inicial 40/100. Se corrigió un problema inicial de actualización tras restablecer.
7. Ósmosis: 0.3 y 0.1 mol/L a 25 °C producen 0.496 MPa de diferencia y tendencia de entrada de agua.
8. Difusión: a diez minutos, A ≈ 54.06 y B ≈ 45.94 mmol/L, suma conservada de 100 en compartimentos iguales.
9. Población: condiciones iniciales del formulario producen ≈ 858.486 individuos modelados a veinte años.
10. Ecosistema: 10 000 kJ y 10 % producen 10 kJ en el cuarto nivel. Enzimas: [S] = Km = 5 produce v = 40, la mitad de Vmax = 80.
11. Células: selección de célula vegetal y cloroplasto, cambio a procariota y nucleoide; anafase mitótica y final de meiosis. El SVG final de meiosis contiene cuatro células y ocho cromosomas en total, dos por célula.
12. Academia: filtros por nivel avanzado y búsqueda de traducción, lectura de ADN, respuesta Citosina y retroalimentación correcta, marcado de lectura y favorito.
13. Evaluación: diez preguntas contestadas y sus explicaciones revisadas. Se contabilizaron cinco aciertos y la pantalla final mostró 5/10, 50 %. Mi espacio conservó 50 % como mejor evaluación.
14. Mi espacio: 1/32 lecciones leídas, un concepto comprobado, siete actividades registradas, dos favoritos y logros correspondientes. Lectura y tema se conservaron al recargar.
15. Glosario: búsqueda sin tilde «osmosis», apertura de definición y enlaces relacionados.
16. Menú móvil: abrir menú y cerrar con Escape, con retorno del foco al botón. Se implementaron estado expandido, foco visible y tratamiento del contenido fuera del menú.
17. Tema: cambio a claro y persistencia tras recarga; se inspeccionaron visualmente ambos temas.

## Revisión visual y adaptable

- 390 × 844: portada clara, botones y tarjetas adaptados. Sin desbordamiento horizontal del documento.
- 768 × 1024: tabla periódica de 920 píxeles dentro de un contenedor de 715 píxeles con desplazamiento propio; sin desbordamiento horizontal del documento.
- 1440 × 1000: portada de escritorio con menú lateral, ilustración y tres columnas de módulos; sin desbordamiento horizontal del documento.
- Se inspeccionó también la presentación oscura de inicio y del laboratorio celular.

## Límites de esta verificación

No se ejecutó una auditoría formal WCAG, mediciones Lighthouse, pruebas con lectores de pantalla reales ni una matriz de navegadores Safari/Firefox o dispositivos físicos. La preferencia de movimiento reducido está cubierta por reglas CSS inspeccionadas; no se emuló un cambio de preferencia del sistema en la herramienta de navegador. No se realizó una revisión externa por especialistas de cada ficha taxonómica ni una validación experimental de los modelos, que son educativos y expresan sus supuestos.

Los recursos científicos se enlazan por tema. Se consultaron documentación de PubChem/IUPAC y capítulos de OpenStax sobre transporte, división, crecimiento y enzimas, además del código genético de NCBI. No se garantiza disponibilidad permanente de todos los enlaces externos.

Esta verificación no incluye despliegue de producción: la entrega debe revisarse antes de incorporarse a `main` y publicarse mediante GitHub Pages.
