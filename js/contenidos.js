/* BioData V3 — Biblioteca de consulta científica, diseñada sin APIs ni dependencias. */
(() => {
"use strict";
const O="https://openstax.org/books/biology-2e/pages/";
const N="https://www.cancer.gov/publications/dictionaries/genetics-dictionary/def/dna";
const I="https://iupac.org/what-we-do/periodic-table-of-elements/";
const lessons=[
 {id:"celulas",title:"La célula: unidad de la vida",cat:"Biología",icon:"🔬",level:"Esencial",time:6,summary:"Diferencia células procariotas, eucariotas, animales y vegetales.",parts:[
 ["¿Qué es una célula?","La célula es la unidad estructural y funcional de los seres vivos. Una bacteria puede estar formada por una sola célula, mientras que una planta o un animal posee gran cantidad de células especializadas. Todas necesitan obtener materia y energía, regular su ambiente interno y transmitir información hereditaria."],
 ["Procariotas y eucariotas","Las procariotas, como las bacterias, no tienen un núcleo rodeado por membrana; su material genético ocupa una región llamada nucleoide. Las eucariotas poseen núcleo y compartimentos membranosos: por ejemplo, mitocondrias. Las células vegetales suelen incorporar pared de celulosa, cloroplastos y una vacuola central grande."],
 ["¿Por qué importa?","En un organismo pluricelular, células con funciones diferentes forman tejidos; los tejidos integran órganos y sistemas. Observar una epidermis de cebolla al microscopio permite reconocer límites celulares y organización, pero no todas las estructuras son visibles con un equipo escolar básico."]],terms:["Membrana plasmática","Citoplasma","Orgánulos","Nucleoide"],check:["¿Qué tipo de célula posee un núcleo delimitado por membrana?",["Procariota","Eucariota","Virus"],1,"Las células eucariotas tienen núcleo; las procariotas no."],source:O+"4-2-prokaryotic-cells"},
 {id:"membrana",title:"Membrana y transporte celular",cat:"Biología",icon:"🫧",level:"Intermedio",time:6,summary:"Comprende difusión, ósmosis y transporte activo.",parts:[
 ["Una frontera selectiva","La membrana plasmática contiene una bicapa de fosfolípidos y proteínas. No funciona como una pared completamente cerrada: permite intercambiar sustancias y comunicar a la célula con su entorno. Las moléculas pequeñas y no polares suelen atravesar la bicapa con más facilidad que los iones."],
 ["Transporte pasivo y activo","La difusión ocurre espontáneamente a favor de un gradiente de concentración. En la ósmosis, el agua atraviesa una membrana semipermeable de acuerdo con diferencias en el potencial de agua. El transporte activo requiere energía para movilizar sustancias en contra de sus gradientes."],
 ["Ejemplo cercano","Cuando se coloca una célula vegetal en una solución muy concentrada, puede perder agua y su membrana separarse de la pared celular: plasmólisis. Las células animales, sin pared rígida, responden de manera diferente a cambios osmóticos."]],terms:["Ósmosis","Difusión","Transporte activo","Gradiente"],check:["¿Qué transporte puede requerir ATP?",["Difusión simple","Transporte activo","Ósmosis"],1,"El transporte activo puede usar energía para mover sustancias en contra de un gradiente."],source:O+"5-2-passive-transport"},
 {id:"adn",title:"ADN, genes y cromosomas",cat:"Genética",icon:"🧬",level:"Esencial",time:7,summary:"Explica cómo se organiza y transmite la información hereditaria.",parts:[
 ["El lenguaje de cuatro bases","El ADN está formado por nucleótidos que contienen azúcar, fosfato y una base: adenina (A), timina (T), citosina (C) o guanina (G). Sus dos cadenas complementarias se organizan en una doble hélice. A se aparea con T y C con G, lo que permite copiar la información."],
 ["Genes y cromosomas","Un gen es una región de ADN que contribuye a producir una molécula funcional, como un ARN o una proteína. Los cromosomas organizan largas moléculas de ADN con proteínas. No todas las regiones de ADN codifican proteínas: otras intervienen en regulación, estructura y procesos celulares."],
 ["Del ADN a las proteínas","La información de muchos genes se transcribe a ARN y luego se traduce a proteínas mediante ribosomas. La expresión génica depende del tipo de célula y de señales ambientales. Una mutación es un cambio en la secuencia; sus efectos pueden ser perjudiciales, neutros o beneficiosos según el contexto."]],terms:["Nucleótido","Gen","Cromosoma","Mutación"],check:["¿Qué base se aparea con guanina?",["Adenina","Timina","Citosina"],2,"La guanina se aparea con la citosina."],source:N},
 {id:"mitosis",title:"Ciclo celular y mitosis",cat:"Genética",icon:"🔁",level:"Intermedio",time:6,summary:"Descubre cómo una célula reparte su material hereditario.",parts:[
 ["Antes de dividirse","El ciclo celular incluye períodos de crecimiento, duplicación de ADN y división. En la fase S se replica el material genético; los puntos de control ayudan a evitar que la célula avance con daños graves o replicación incompleta."],
 ["Las fases de la mitosis","Durante la profase se condensan los cromosomas; en la prometafase se desorganiza la envoltura nuclear y el huso se conecta con los cromosomas. En metafase se alinean; en anafase se separan cromátidas hermanas; en telofase se reorganizan los núcleos."],
 ["División del citoplasma","La citocinesis reparte el citoplasma y normalmente completa la formación de dos células hijas. La mitosis participa en crecimiento y renovación de tejidos eucariotas; no es el proceso por el que se forman directamente la mayoría de los gametos animales."]],terms:["Interfase","Profase","Metafase","Citocinesis"],check:["¿En qué fase se separan las cromátidas hermanas?",["Metafase","Anafase","Interfase"],1,"La anafase separa las cromátidas hacia polos opuestos."],source:O+"10-2-the-cell-cycle"},
 {id:"meiosis",title:"Meiosis y reproducción sexual",cat:"Genética",icon:"🧫",level:"Intermedio",time:7,summary:"Analiza la reducción cromosómica y la variación genética.",parts:[
 ["Dos divisiones celulares","La meiosis comienza después de una replicación de ADN y comprende dos divisiones consecutivas. Durante la primera se separan cromosomas homólogos; durante la segunda se separan cromátidas hermanas. El resultado típico son cuatro células haploides con combinaciones genéticas distintas."],
 ["Variación genética","En profase I, cromosomas homólogos pueden intercambiar segmentos mediante entrecruzamiento. La segregación independiente de pares de cromosomas también origina combinaciones diferentes. Ambos mecanismos aumentan la diversidad en la reproducción sexual."],
 ["No confundir","Mitosis y meiosis no son sinónimos. La mitosis conserva el número de cromosomas de la célula madre en las hijas; la meiosis lo reduce a la mitad. La fecundación combina material genético de dos gametos y restablece la diploidía en numerosos organismos."]],terms:["Haploide","Diploide","Entrecruzamiento","Homólogos"],check:["¿Cuál es la característica principal de la meiosis?",["Duplica el número cromosómico","Reduce a la mitad el número cromosómico","No interviene ADN"],1,"La meiosis reduce el número cromosómico para la reproducción sexual."],source:O+"11-1-the-process-of-meiosis"},
 {id:"mendel",title:"Leyes de Mendel y herencia",cat:"Genética",icon:"🌱",level:"Intermedio",time:7,summary:"Interpreta genotipos, alelos y cuadros de Punnett.",parts:[
 ["Alelos y genotipos","Un alelo es una variante de un gen. En organismos diploides, muchos genes poseen dos copias, una heredada de cada progenitor. AA y aa representan genotipos homocigotos, mientras que Aa es heterocigoto. La dominancia describe una relación entre alelos y no significa que uno sea más frecuente."],
 ["Cuadro de Punnett","En el cruce idealizado Aa × Aa, los gametos pueden portar A o a. Al combinarlos se obtienen AA, Aa, Aa y aa: proporción genotípica 1:2:1. Si A presenta dominancia completa, la proporción fenotípica esperada es 3:1. Son probabilidades, no cantidades garantizadas en familias pequeñas."],
 ["Modelos y límites","Existen rasgos poligénicos, dominancia incompleta, codominancia, herencia ligada al sexo e influencia ambiental. El cuadro de un solo gen es un buen comienzo, pero no explica todos los caracteres humanos ni todos los patrones de herencia."]],terms:["Alelo","Genotipo","Fenotipo","Dominancia"],check:["En Aa × Aa, ¿qué fracción esperada es aa?",["1/2","1/4","3/4"],1,"Las combinaciones de los gametos generan aa en uno de cuatro cuadros."],source:O+"12-1-mendels-experiments-and-the-laws-of-probability"},
 {id:"fotosintesis",title:"Fotosíntesis y energía solar",cat:"Biología",icon:"☀️",level:"Esencial",time:7,summary:"Aprende cómo las plantas convierten energía luminosa en química.",parts:[
 ["Transformar energía","En plantas y algas, la fotosíntesis utiliza energía luminosa para fabricar compuestos orgánicos a partir de dióxido de carbono y agua. El oxígeno liberado procede de la ruptura de moléculas de agua durante las reacciones dependientes de luz."],
 ["Dos grandes etapas","Las reacciones luminosas ocurren en membranas de tilacoides y producen ATP y NADPH. El ciclo de Calvin, en el estroma del cloroplasto, incorpora carbono del CO₂ en moléculas orgánicas. Ambos procesos están conectados: el ciclo consume energía y poder reductor de la etapa luminosa."],
 ["Factores limitantes","La disponibilidad de luz, CO₂, agua, nutrientes y temperatura influyen en la fotosíntesis. Aumentar una variable no siempre mejora la tasa: otro factor puede limitarla y condiciones extremas pueden reducirla. El simulador de BioData simplifica este principio, no representa datos medidos."]],terms:["Cloroplasto","Tilacoide","ATP","Ciclo de Calvin"],check:["¿Qué molécula aporta el oxígeno que libera la fotosíntesis?",["CO₂","Agua","Glucosa"],1,"La fotólisis del agua libera el oxígeno molecular."],source:O+"8-1-overview-of-photosynthesis"},
 {id:"respiracion",title:"Respiración celular y ATP",cat:"Biología",icon:"⚡",level:"Intermedio",time:6,summary:"Descubre cómo se obtiene energía aprovechable de nutrientes.",parts:[
 ["¿Para qué sirve?","Las células necesitan energía para sintetizar moléculas, mover estructuras y mantener gradientes de iones. El ATP actúa como intermediario energético en muchas reacciones. La respiración celular transforma energía química de moléculas orgánicas en ATP mediante varias rutas metabólicas."],
 ["Pasos principales","En eucariotas, la glucólisis sucede en el citosol. La oxidación del piruvato y el ciclo de ácido cítrico ocurren principalmente en la matriz mitocondrial, mientras que la cadena de transporte de electrones está en la membrana mitocondrial interna."],
 ["Oxígeno y fermentación","En respiración aerobia, el oxígeno funciona como aceptor final de electrones. En ausencia de suficiente oxígeno, algunas células recurren a fermentación para regenerar NAD⁺ y sostener la glucólisis, con producción de ATP mucho menor que la respiración aerobia."]],terms:["ATP","Glucólisis","Mitocondria","Fermentación"],check:["¿Dónde ocurre la glucólisis?",["Núcleo","Citosol","Cloroplasto"],1,"La glucólisis tiene lugar en el citosol."],source:O+"7-1-energy-in-living-systems"},
 {id:"clasificacion",title:"Clasificación de los seres vivos",cat:"Biología",icon:"🦋",level:"Esencial",time:6,summary:"Organiza la biodiversidad mediante taxonomía y evolución.",parts:[
 ["Niveles de clasificación","La taxonomía agrupa organismos usando categorías jerárquicas como dominio, reino, filo, clase, orden, familia, género y especie. Los nombres científicos binomiales combinan género y epíteto específico, como Panthera onca. Esta nomenclatura facilita la comunicación entre idiomas."],
 ["Los tres dominios","Bacteria y Archaea agrupan organismos procariotas; Eukarya incluye animales, plantas, hongos y numerosos protistas. Las relaciones evolutivas se reconstruyen mediante datos moleculares y características compartidas. Por eso las clasificaciones pueden cambiar con nuevas evidencias."],
 ["Una precisión importante","La palabra «microorganismo» describe tamaño o modo de observación, no constituye por sí sola un reino: puede referirse a bacterias, arqueas, protistas y hongos microscópicos. Los virus ocupan una posición especial y no son células."]],terms:["Taxonomía","Especie","Dominio","Filogenia"],check:["¿Qué representa un nombre binomial?",["Familia y orden","Género y epíteto específico","Clase y reino"],1,"Un binomio se forma con el género y el epíteto específico."],source:O+"20-1-organizing-life-on-earth"},
 {id:"ecosistemas",title:"Ecosistemas, redes tróficas y energía",cat:"Ecología",icon:"🌎",level:"Esencial",time:7,summary:"Conecta productores, consumidores y descomponedores.",parts:[
 ["Componentes de un ecosistema","Un ecosistema incluye comunidades de organismos y factores abióticos como agua, luz, temperatura y suelo. Los seres vivos interactúan mediante depredación, competencia, mutualismo y otras relaciones. Los ecosistemas no son sistemas aislados: intercambian materia, energía y organismos."],
 ["Flujo de energía","Los productores captan energía mediante fotosíntesis o quimiosíntesis. Consumidores obtienen energía al alimentarse de otros organismos, mientras descomponedores transforman materia orgánica y liberan nutrientes. En cada transferencia trófica solo una fracción de la energía queda disponible para el siguiente nivel."],
 ["Cadenas y redes","Una cadena alimentaria muestra una ruta simple, por ejemplo pasto → saltamontes → rana → serpiente. Una red alimentaria representa varias rutas conectadas y describe mejor la realidad. La materia se recicla mediante ciclos biogeoquímicos, pero la energía fluye a través del sistema y se disipa como calor."]],terms:["Productor","Consumidor","Descomponedor","Red trófica"],check:["¿Qué grupo fija energía en la base de muchas redes tróficas?",["Productores","Depredadores tope","Parásitos"],0,"Los productores capturan energía y la incorporan en materia orgánica."],source:O+"46-2-energy-flow-through-ecosystems"},
 {id:"biodiversidad",title:"Biodiversidad y conservación",cat:"Ecología",icon:"🐆",level:"Esencial",time:6,summary:"Comprende especies, hábitats y amenazas de conservación.",parts:[
 ["Tres niveles relacionados","La biodiversidad abarca diversidad genética, de especies y de ecosistemas. No consiste solamente en contar animales; también incluye variación entre poblaciones, comunidades y funciones ecológicas. Su mantenimiento puede mejorar la resiliencia de muchos sistemas ante perturbaciones."],
 ["Amenazas actuales","La transformación del hábitat, la sobreexplotación, las especies invasoras, la contaminación y el cambio climático amenazan a numerosas poblaciones. El riesgo depende de la especie y del lugar. Conservar corredores biológicos, humedales y selvas ayuda a mantener procesos naturales."],
 ["Conservación cercana","Los manglares de Veracruz sirven como refugio y zona de crianza para diversas especies, amortiguan oleaje y almacenan carbono. Protegerlos exige decisiones informadas que involucren comunidades, autoridades y científicos. La educación ambiental conecta datos biológicos con acciones prácticas."]],terms:["Diversidad genética","Hábitat","Conservación","Especie invasora"],check:["¿Cuál NO es un nivel usual de biodiversidad?",["Genético","De ecosistemas","De planetas"],2,"Suelen considerarse diversidad genética, de especies y de ecosistemas."],source:O+"47-1-the-biodiversity-crisis"},
 {id:"agua",title:"Ciclo del agua y ciclos biogeoquímicos",cat:"Ecología",icon:"💧",level:"Intermedio",time:6,summary:"Observa cómo circula la materia entre seres vivos y ambiente.",parts:[
 ["Ciclo hidrológico","El agua cambia de reservorio por evaporación, transpiración, condensación, precipitación, infiltración y escorrentía. El movimiento depende de la energía solar y la gravedad. Las actividades humanas pueden modificar infiltración, calidad del agua y disponibilidad local."],
 ["Carbono y nitrógeno","El carbono circula entre atmósfera, océanos, rocas y seres vivos. La fotosíntesis lo incorpora en materia orgánica y la respiración lo libera como CO₂. El nitrógeno atmosférico requiere transformaciones biológicas o físicas para incorporarse de forma utilizable a los organismos."],
 ["Importancia ecológica","Los ciclos biogeoquímicos conectan procesos físicos, químicos y biológicos. La fertilización excesiva puede aportar demasiados nutrientes a cuerpos de agua y contribuir a eutrofización, lo que altera comunidades y disponibilidad de oxígeno."]],terms:["Evaporación","Infiltración","Fijación de nitrógeno","Eutrofización"],check:["¿Qué proceso incorpora CO₂ en materia orgánica?",["Fotosíntesis","Erosión","Condensación"],0,"La fotosíntesis fija carbono en compuestos orgánicos."],source:O+"46-3-biogeochemical-cycles"},
 {id:"atomos",title:"Átomos, moléculas y enlaces químicos",cat:"Química",icon:"⚛",level:"Esencial",time:7,summary:"Relaciona protones, electrones y enlaces con la vida.",parts:[
 ["Estructura atómica","Los átomos poseen un núcleo con protones y, en la mayoría de casos, neutrones; alrededor se encuentran electrones. El número atómico expresa la cantidad de protones y define el elemento. Los isótopos de un mismo elemento difieren en número de neutrones."],
 ["Enlaces y moléculas","Los enlaces covalentes implican compartición de electrones; los iónicos implican atracción entre partículas con cargas opuestas. Los enlaces de hidrógeno y otras interacciones débiles son esenciales para las propiedades del agua, proteínas y ácidos nucleicos."],
 ["Química de la vida","Carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre son fundamentales en numerosas biomoléculas. La estructura química determina propiedades: agua y aceite no se mezclan fácilmente por diferencias en polaridad y fuerzas intermoleculares."]],terms:["Protón","Isótopo","Enlace covalente","Polaridad"],check:["¿Qué indica el número atómico?",["Número de protones","Número de neutrones","Masa exacta"],0,"El número atómico corresponde al número de protones."],source:O+"2-1-atoms-isotopes-ions-and-molecules-the-building-blocks"},
 {id:"biomoleculas",title:"Biomoléculas esenciales",cat:"Química",icon:"🥼",level:"Intermedio",time:7,summary:"Comprende carbohidratos, lípidos, proteínas y ácidos nucleicos.",parts:[
 ["Carbohidratos","Monosacáridos como glucosa participan en el metabolismo energético. Polisacáridos como almidón almacenan energía en plantas; la celulosa proporciona soporte a paredes celulares. La diversidad de enlaces entre azúcares produce propiedades muy diferentes."],
 ["Lípidos y proteínas","Lípidos comprenden grasas, fosfolípidos y esteroides; muchos cumplen funciones de reserva energética y membranas. Las proteínas están formadas por aminoácidos y pueden actuar como enzimas, transportadores, receptores o estructuras celulares. Su función depende de su conformación."],
 ["Ácidos nucleicos","ADN y ARN se componen de nucleótidos y permiten almacenar, transmitir o utilizar información genética. Ninguna clase de biomoléculas trabaja aislada: en las células las rutas metabólicas integran todas para construir estructuras, obtener energía y responder al ambiente."]],terms:["Glucosa","Fosfolípido","Aminoácido","Nucleótido"],check:["¿Qué grupo incluye a las enzimas más comunes?",["Proteínas","Sales minerales","Triglicéridos"],0,"La mayoría de enzimas son proteínas, aunque existen ARN catalíticos."],source:O+"3-1-synthesis-of-biological-macromolecules"},
 {id:"sql",title:"Bases de datos y ciencia",cat:"Tecnología",icon:"🗄️",level:"Esencial",time:6,summary:"Aprende para qué sirven las tablas y consultas de información.",parts:[
 ["Guardar conocimiento estructurado","Una base de datos relacional organiza información en tablas compuestas por filas (registros) y columnas (atributos). Para BioData podrían existir tablas de organismos, elementos y clasificaciones, relacionadas mediante identificadores para evitar repeticiones innecesarias."],
 ["Consultar y mantener calidad","SQL se usa para seleccionar, insertar, actualizar o eliminar datos, según permisos. Una clave primaria identifica registros de forma única y una foránea enlaza tablas. Validación, fuentes y revisión editorial evitan que una base técnicamente correcta almacene contenido científico incorrecto."],
 ["Demo frente a sistema real","Nuestra DEMO incluye un esquema visual con datos de ejemplo, pero no tiene servidor MySQL conectado. Integrar posteriormente PHP y MySQL requerirá construir una API, validar entradas, controlar permisos y proteger credenciales; el navegador nunca debería almacenar contraseñas del servidor."]],terms:["Tabla","Registro","SQL","Clave foránea"],check:["¿Para qué sirve una clave primaria?",["Duplicar campos","Identificar un registro","Diseñar colores"],1,"Una clave primaria identifica de forma única un registro."],source:"https://dev.mysql.com/doc/refman/8.4/en/tutorial.html"},
 {id:"metodo",title:"Método científico y calidad de fuentes",cat:"Tecnología",icon:"📚",level:"Esencial",time:7,summary:"Aprende a investigar, evaluar evidencia y comunicar resultados.",parts:[
 ["Preguntar y comprobar","Una investigación parte de una pregunta comprobable y propone hipótesis que pueden ponerse a prueba mediante observaciones o experimentos. Las variables, los controles y la medición sistemática permiten distinguir explicaciones alternativas y reducir sesgos."],
 ["Fuentes confiables","Es importante verificar autoría, institución, fecha, evidencia y referencias. Los materiales educativos de universidades y organismos científicos son un buen punto de partida, pero las afirmaciones deben concordar con investigaciones actualizadas. Una simulación conceptual no equivale a una medición real."],
 ["Comunicar con responsabilidad","Una buena exposición distingue observación de interpretación y reconoce limitaciones. Documentar procedimientos permite que otras personas examinen o repitan el trabajo. En BioData indicamos qué módulos son demostrativos y enlazamos fuentes consultables para profundizar."]],terms:["Hipótesis","Variable","Control experimental","Evidencia"],check:["¿Qué mejora la calidad de una conclusión científica?",["Ignorar datos contrarios","Describir métodos y límites","Citar solo una opinión"],1,"Métodos transparentes y reconocimiento de límites permiten evaluar hallazgos."],source:"https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology"}
];
const categories=["Todos","Biología","Genética","Ecología","Química","Tecnología"];
const $=id=>document.getElementById(id);
let category="Todos",textQuery="",selected=null,learned=new Set();
try{const saved=JSON.parse(localStorage.getItem("biodata.library.read")||"[]");if(Array.isArray(saved))learned=new Set(saved.filter(id=>lessons.some(l=>l.id===id)));}catch{}
function el(tag,cls,content){const node=document.createElement(tag);if(cls)node.className=cls;if(content!==undefined)node.textContent=content;return node;}
function makeButton(label,fn,cls=""){const b=el("button",cls,label);b.type="button";b.addEventListener("click",fn);return b;}
function render(){
 const container=$("library-grid");if(!container)return;
 const q=textQuery.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
 const list=lessons.filter(l=>(category==="Todos"||l.cat===category)&&[l.title,l.summary,l.cat,...l.terms].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(q));
 $("library-count").textContent=list.length+" lecciones · "+learned.size+" leídas";
 container.replaceChildren();
 if(!list.length)container.append(el("p","library-empty","No hay lecciones que coincidan. Prueba otra búsqueda."));
 list.forEach(l=>{
   const card=el("article","lesson-card");card.dataset.cat=l.cat;
   card.append(el("span","lesson-icon",l.icon));
   const meta=el("div","lesson-meta");meta.append(el("span","lesson-badge",l.cat),el("span","lesson-time",l.time+" min · "+l.level));card.append(meta);
   card.append(el("h3","",l.title),el("p","",l.summary));
   const lower=el("div","lesson-bottom");
   lower.append(el("span","lesson-done",learned.has(l.id)?"✓ Leído":"Explorar tema"));
   lower.append(makeButton("Abrir ↗",()=>show(l.id),"lesson-open"));
   card.append(lower);container.append(card);
 });
}
function show(id){
 const l=lessons.find(x=>x.id===id);if(!l)return;
 selected=l.id;
 const panel=$("library-detail");panel.hidden=false;panel.replaceChildren();
 const upper=el("div","lesson-detail-top");
 const back=makeButton("← Volver al catálogo",()=>{panel.hidden=true;selected=null;$("library-grid").scrollIntoView({block:"start",behavior:"smooth"});},"lesson-back");
 const categoryTag=el("span","lesson-badge",l.cat+" · "+l.level);
 upper.append(back,categoryTag);panel.append(upper);
 panel.append(el("span","lesson-detail-icon",l.icon),el("h2","",l.title),el("p","lesson-detail-lead",l.summary));
 const content=el("div","lesson-sections");
 l.parts.forEach(([heading,body])=>{const section=el("section","lesson-text-section");section.append(el("h3","",heading),el("p","",body));content.append(section);});
 panel.append(content);
 const terms=el("div","lesson-keywords");terms.append(el("strong","","Conceptos clave: "));l.terms.forEach(t=>terms.append(el("span","tag",t)));panel.append(terms);
 const quiz=el("div","lesson-mini-quiz");quiz.append(el("span","eyebrow","COMPRUEBA TU APRENDIZAJE"),el("h3","",l.check[0]));
 const feedback=el("p","quiz-feedback");feedback.setAttribute("aria-live","polite");
 const options=el("div","lesson-mini-options");
 l.check[1].forEach((option,index)=>options.append(makeButton(option,()=>{
   [...options.children].forEach((b,i)=>{b.disabled=true;if(i===l.check[2])b.classList.add("correct");else if(i===index)b.classList.add("incorrect");});
   feedback.textContent=(index===l.check[2]?"✓ ¡Correcto! ":"Revisa esta idea: ")+l.check[3];
   feedback.className="quiz-feedback"+(index===l.check[2]?"":" bad");
 },"quiz-option")));
 quiz.append(options,feedback);panel.append(quiz);
 const bottom=el("div","lesson-detail-footer");
 const link=el("a","","Consultar fuente educativa ↗");link.href=l.source;link.target="_blank";link.rel="noopener noreferrer";
 bottom.append(link,makeButton(learned.has(l.id)?"✓ Lección leída":"✓ Marcar como leída",()=>{
   learned.add(l.id);try{localStorage.setItem("biodata.library.read",JSON.stringify([...learned]));}catch{}
   render();show(id);
 },"button"));panel.append(bottom);
 panel.scrollIntoView({behavior:"smooth",block:"start"});
}
function search(query){$("library-search").value=query;textQuery=query;category="Todos";syncCategories();render();}
function syncCategories(){document.querySelectorAll("[data-library-cat]").forEach(b=>{b.classList.toggle("active",b.dataset.libraryCat===category);b.setAttribute("aria-pressed",String(b.dataset.libraryCat===category));});}
function init(){
 const filters=$("library-categories");if(!filters)return;
 filters.replaceChildren();
 categories.forEach(cat=>{const b=makeButton(cat,()=>{category=cat;syncCategories();render();},"chip");b.dataset.libraryCat=cat;filters.append(b);});
 $("library-search").addEventListener("input",e=>{textQuery=e.target.value;render();});
 syncCategories();render();
}
document.addEventListener("DOMContentLoaded",init);
window.BioLibrary={lessons,render,show,search};
})();