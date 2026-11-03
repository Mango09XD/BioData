/* BioData · Laboratorio educativo. Simulaciones conceptuales sin dependencias externas. */
(() => {
  const $ = id => document.getElementById(id);
  const alleles = ["AA", "Aa", "aa"];
  const gametes = genotype => genotype === "AA" ? ["A","A"] : genotype === "aa" ? ["a","a"] : ["A","a"];
  const phenotype = genotype => genotype.includes("A") ? "Dominante" : "Recesivo";
  const canonical = pair => pair.split("").sort((a,b) => a === b ? 0 : a === "A" ? -1 : 1).join("");
  function mendel() {
    const p1 = $("mendel-parent-1").value;
    const p2 = $("mendel-parent-2").value;
    const g1 = gametes(p1), g2 = gametes(p2);
    const combinations = g1.flatMap(a => g2.map(b => canonical(a + b)));
    const counts = Object.fromEntries(alleles.map(g => [g, combinations.filter(x => x === g).length]));
    $("mendel-grid").innerHTML = '<div class="punnett-label">×</div>' +
      g2.map(g => '<div class="punnett-label">'+g+'</div>').join("") +
      g1.map((a,i) => '<div class="punnett-label">'+a+'</div>'+
        g2.map((b,j) => '<div class="punnett-cell '+ (phenotype(canonical(a+b)) === "Dominante" ? "dominant":"recessive") +'"><strong>'+canonical(a+b)+'</strong><small>'+phenotype(canonical(a+b))+'</small></div>').join("")
      ).join("");
    const dominant = combinations.filter(x => phenotype(x) === "Dominante").length;
    $("mendel-result").textContent = 'Genotipos: '+alleles.map(g => g+': '+counts[g]*25+'%').join(' · ') +
      '. Fenotipo dominante: '+dominant*25+'%; recesivo: '+(4-dominant)*25+'%.';
    $("mendel-summary").textContent = 'Cruzamiento '+p1+' × '+p2+'. Cada cuadro representa una combinación posible de alelos con probabilidad de 25% en este modelo.';
  }
  function photosynthesis() {
    const light=Number($("photo-light").value);
    const water=Number($("photo-water").value);
    const carbon=Number($("photo-co2").value);
    // Modelo didáctico inventado: no representa una tasa fotosintética real.
    const rate=Math.min(light,water,carbon);
    $("photo-light-value").textContent=light+"%";
    $("photo-water-value").textContent=water+"%";
    $("photo-co2-value").textContent=carbon+"%";
    $("photo-meter").style.width=rate+"%";
    $("photo-output").textContent=rate+" / 100";
    const factors=[["luz",light],["agua",water],["CO₂",carbon]];
    const minimum=factors.filter(([name,v])=>v===rate).map(([name])=>name).join(", ");
    $("photo-limitation").textContent="Factor limitante en esta simulación: "+minimum+".";
  }
  const glossary=[
    ["ADN","Molécula que almacena información genética.","Genética"],
    ["Alelo","Variante de un gen.","Genética"],
    ["Cromosoma","Estructura de ADN asociado con proteínas.","Genética"],
    ["Fenotipo","Características observables resultantes del genotipo y el ambiente.","Genética"],
    ["Genotipo","Conjunto de variantes genéticas consideradas en un organismo.","Genética"],
    ["Fotosíntesis","Proceso que convierte energía luminosa en energía química.","Biología"],
    ["Mitocondria","Orgánulo que participa en la respiración celular.","Células"],
    ["Núcleo","Compartimento que contiene la mayor parte del ADN eucariota.","Células"],
    ["Ecosistema","Seres vivos y entorno físico que interactúan.","Ecología"],
    ["SQL","Lenguaje usado para trabajar con bases de datos relacionales.","Tecnología"],
    ["Meiosis","División celular que reduce a la mitad el número de cromosomas.","Genética"],
    ["Mitosis","División nuclear que genera núcleos con la misma información cromosómica.","Células"]
  ];
  const clean=s=>(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  function renderGlossary(){
    const query=clean($("glossary-search").value.trim());
    const filtered=glossary.filter(([name,desc,area])=>clean(name+" "+desc+" "+area).includes(query));
    $("glossary-count").textContent=filtered.length+" conceptos";
    const list=$("glossary-results");
    list.replaceChildren();
    if(!filtered.length){const p=document.createElement("p");p.textContent="No hay conceptos que coincidan con la búsqueda.";list.append(p);return;}
    filtered.forEach(([name,desc,area])=>{
      const card=document.createElement("article");card.className="glossary-entry";
      const title=document.createElement("h3");title.textContent=name;
      const tag=document.createElement("span");tag.className="tag";tag.textContent=area;
      const info=document.createElement("p");info.textContent=desc;
      card.append(title,tag,info);list.append(card);
    });
  }
  document.addEventListener("DOMContentLoaded",()=>{
    if(!$("view-laboratorio"))return;
    ["mendel-parent-1","mendel-parent-2"].forEach(id=>$(id).addEventListener("change",mendel));
    ["photo-light","photo-water","photo-co2"].forEach(id=>$(id).addEventListener("input",photosynthesis));
    $("glossary-search").addEventListener("input",renderGlossary);
    mendel();photosynthesis();renderGlossary();
  });
})();
