# Auditoría y decisiones para BioData 4.0

Base revisada: rama main, antes de los cambios de V4. Se revisaron index.html, los tres archivos CSS y los once scripts originales, además del README. No había paquetes, servidor, pruebas automatizadas ni instrucciones AGENTS en el repositorio.

## Fortalezas conservadas

- 17 fichas de organismos y 15 lecciones científicas (se excluye SQL), con contenidos reutilizables.
- Cuadro de Punnett monohíbrido correcto; búsqueda global, filtros y preferencias locales.
- Secuencia complementaria de ADN, navegación por fases de división celular y preguntas con explicación.
- Distribución de los 118 elementos en grupos y períodos, incluyendo series f.

## Problemas encontrados por inspección

- Identidad inconsistente V2/V3 y etiquetas de demostración en distintas pantallas.
- Solo 26 elementos tenían masas y aplicaciones; faltaban configuraciones electrónicas.
- SQL aparecía en navegación, tarjetas, datos, lecciones, cuestionarios y glosario.
- Las cromátidas de anafase y los cromosomas de células hijas se dibujaban como X duplicadas.
- La célula mostraba únicamente estructuras vegetales, sin alternativas animal y procariota.
- No había comparación de organismos, favoritos, historial, resultados de evaluación persistentes ni glosario relacionado.
- El avance se marcaba manualmente por módulo, sin medir resultados de aprendizaje.
- Tres capas CSS acumulaban reglas y varios scripts dependían de objetos globales.
- README desactualizado: todavía afirmaba que la tabla no contenía 118 elementos.
- El modelo de fotosíntesis usaba el mínimo de porcentajes arbitrarios; conviene sustituirlo por una función explícita con parámetros y límites.

## Arquitectura elegida

Aplicación estática con rutas hash, módulos ES independientes y contenido JSON local. Ocho áreas principales y un espacio personal. La capa de almacenamiento es un adaptador independiente, sustituible en V5. Sin cuentas, servicios de IA ni infraestructura de servidor. Los modelos numéricos se separan de la interfaz para comprobarlos con Node.

Se conserva el conocimiento científico y el comportamiento útil mediante migración, con correcciones de diagramas y ampliaciones. El flujo de organización del proyecto pasa a ser una actividad de método científico en Academia. Se retiran archivos antiguos después de migrar los datos para evitar duplicidad. Los contenidos originales siguen disponibles en el historial de Git.

## Revisión y publicación

Trabajo en biodata-v4. La rama main y su configuración de GitHub Pages no se modifican. La entrega se prepara como propuesta de cambios para revisión, sin despliegue de producción. Las verificaciones efectivamente ejecutadas se documentan en PRUEBAS.md.
