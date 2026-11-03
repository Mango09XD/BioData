/* BioData V2 · Navegación, búsqueda, personalización y progreso local */
(() => {
  "use strict";
  const views = [
    ["inicio","Inicio"],["organismos","Organismos"],["tabla","Tabla periódica"],
    ["celulas","Células y ADN"],["laboratorio","Laboratorio"],
    ["desafio","Desafíos"],["base-datos","Base de datos"],
    ["administracion","Administración"],["biblioteca","Biblioteca científica"],["explorador","Explorador visual"],["ruta","Mi aprendizaje"]
  ];
  const routeModules = [
    ["organismos","🌿","Organismos biológicos","Explora fichas de seres vivos"],
    ["tabla","⚛","Tabla periódica","Descubre los elementos químicos"],
    ["celulas","🧬","Células y ADN","Conoce la vida a escala celular"],
    ["laboratorio","🧪","Laboratorio interactivo","Experimenta con modelos educativos"],
    ["desafio","◎","Desafíos","Resuelve el cuestionario científico"],
    ["base-datos","▤","Bases de datos","Consulta las estructuras de información"],
    ["administracion","▦","Administración","Comprende los procesos del proyecto"],
    ["biblioteca","📚","Biblioteca científica","Lee temas y comprueba tus conocimientos"],
    ["explorador","🧪","Explorador visual","Manipula secuencias de ADN y observa la mitosis"]
  ];
  const $ = id => document.getElementById(id);
  const safeLoad = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const safeSave = (key,value) => { try { localStorage.setItem(key,value); } catch { /* almacenamiento deshabilitado */ } };
  const safeRemove = key => { try { localStorage.removeItem(key); } catch {} };
  const strip = text => String(text||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const allowed = new Set(views.map(v => v[0]));
  let done = new Set();
  try {
    const data = JSON.parse(safeLoad("biodata.v2.progress") || "[]");
    if(Array.isArray(data)) done = new Set(data.filter(id=>routeModules.some(m=>m[0]===id)));
  } catch {}
  function closeMenu() {
    $("app-sidebar").classList.remove("open");
    $("mobile-backdrop").hidden=true;
    $("mobile-menu").setAttribute("aria-expanded","false");
  }
  function go(name,updateHash=true) {
    if(!allowed.has(name)) return;
    views.forEach(([id])=>{ const element=$("view-"+id); if(element)element.classList.toggle("active",id===name); });
    document.querySelectorAll("[data-view]").forEach(b=>{
      const active=b.dataset.view===name;
      b.classList.toggle("active",active);
      if(active)b.setAttribute("aria-current","page"); else b.removeAttribute("aria-current");
    });
    $("current-view-label").textContent=(views.find(v=>v[0]===name)||[])[1]||"Inicio";
    if(name==="organismos")window.BioOrganisms?.render();
    if(name==="tabla")window.BioPeriodicTable?.render();
    if(name==="base-datos")window.BioDatabase?.render();
    if(name==="biblioteca")window.BioLibrary?.render();
    if(name==="ruta")renderRoute();
    if(updateHash && location.hash!=="#"+name)history.replaceState(null,"","#"+name);
    $("search-results").hidden=true;
    closeMenu();
    window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  }
  const processDetails={
    Registrar:["Registrar información","El equipo recopila datos confiables del organismo o elemento y registra la fuente consultada."],
    Almacenar:["Almacenar datos","La información se organiza en tablas relacionadas para mantenerla ordenada y facilitar su actualización."],
    Consultar:["Consultar información","Los usuarios buscan un organismo, elemento o concepto y acceden a su ficha."],
    Analizar:["Analizar resultados","Se comparan datos y se identifican patrones, semejanzas o diferencias relevantes."],
    Decidir:["Tomar decisiones","El equipo usa los resultados para planear mejoras y comunicar hallazgos."]
  };
  function renderProgress(){
    const percent=Math.round(done.size/routeModules.length*100);
    $("side-progress-value").textContent=percent+"%";
    $("side-progress-fill").style.width=percent+"%";
    $("side-progress-caption").textContent=done.size+" de "+routeModules.length+" áreas completadas";
    $("home-progress-fill").style.width=percent+"%";
    $("home-progress-value").textContent=done.size+" de "+routeModules.length+" áreas";
    $("route-percent").textContent=percent+"%";
    $("route-title").textContent=percent===100?"¡Exploración completada!":percent===0?"¡Tu aventura comienza aquí!":"¡Vas por buen camino!";
    $("route-subtitle").textContent=percent===100?"Has marcado todas las áreas como completadas.":"Has completado "+done.size+" de "+routeModules.length+" áreas de la plataforma.";
  }
  function renderRoute(){
    const list=$("route-list");list.replaceChildren();
    routeModules.forEach(([id,icon,name,description])=>{
      const card=document.createElement("article");card.className="route-item"+(done.has(id)?" done":"");
      const emoji=document.createElement("span");emoji.textContent=icon;
      const body=document.createElement("div");
      const title=document.createElement("h3");title.textContent=name;
      const p=document.createElement("p");p.textContent=description;
      body.append(title,p);
      const button=document.createElement("button");button.type="button";
      button.textContent=done.has(id)?"✓ Completado":"Marcar completo";
      button.setAttribute("aria-pressed",done.has(id)?"true":"false");
      button.addEventListener("click",()=>{
        if(done.has(id))done.delete(id);else done.add(id);
        safeSave("biodata.v2.progress",JSON.stringify([...done]));
        renderProgress();renderRoute();
      });
      const link=document.createElement("button");link.type="button";link.className="route-open";
      link.textContent="Abrir ↗";link.addEventListener("click",()=>go(id));
      card.append(emoji,body,button,link);list.append(card);
    });
  }
  const items=()=>{
    const organisms=(window.BIODATA?.organisms||[]).map(o=>({name:o.name,detail:o.scientific,view:"organismos",action:()=>{window.BioOrganisms?.search(o.name);window.BioOrganisms?.detail(o.name);}}));
    const elements=(window.BIODATA?.elements||[]).map(e=>({name:e.name,detail:"Elemento "+e.s+" · "+e.n,view:"tabla",action:()=>window.BioPeriodicTable?.show(e.n)}));
    const cells=Object.keys(window.BIODATA?.cellParts||{}).map(name=>({name,detail:"Biología celular",view:"celulas",action:()=>window.BioCells?.show(name)}));
    const modules=routeModules.map(([view,,name])=>({name,detail:"Módulo de BioData",view}));
    const lessons=(window.BioLibrary?.lessons||[]).map(l=>({name:l.title,detail:"Lección de "+l.cat,view:"biblioteca",action:()=>window.BioLibrary?.show(l.id)}));
    return [...organisms,...elements,...cells,...lessons,...modules];
  };
  function showSearch(query){
    const box=$("search-results");
    if(!query.trim()){box.hidden=true;box.replaceChildren();return;}
    const q=strip(query.trim());
    const matches=items().filter(x=>strip(x.name+" "+x.detail).includes(q)).slice(0,9);
    box.replaceChildren();
    if(!matches.length){const p=document.createElement("div");p.className="search-empty";p.textContent="Sin resultados para «"+query+"». Prueba otro concepto.";box.append(p);}
    matches.forEach(x=>{
      const button=document.createElement("button");button.className="search-hit";button.type="button";
      const strong=document.createElement("strong");strong.textContent=x.name;
      const small=document.createElement("small");small.textContent=x.detail;
      button.append(strong,small);
      button.addEventListener("click",()=>{
        go(x.view);
        if(x.action)x.action();
        $("global-search").value="";
        box.hidden=true;
      });
      box.append(button);
    });
    box.hidden=false;
  }
  document.addEventListener("click",event=>{
    const nav=event.target.closest("[data-view]");
    if(nav){go(nav.dataset.view);return;}
    const direct=event.target.closest("[data-go]");
    if(direct){go(direct.dataset.go);return;}
    const process=event.target.closest("[data-process]");
    if(process){
      document.querySelectorAll("[data-process]").forEach(b=>b.classList.toggle("active",b===process));
      const d=processDetails[process.dataset.process];
      if(d)$("process-detail").innerHTML="<h3>"+d[0]+"</h3><p>"+d[1]+"</p>";
    }
    if(!event.target.closest(".quick-search")&&!event.target.closest(".search-results"))$("search-results").hidden=true;
  });
  function init(){
    $("stat-organisms").textContent=String(window.BIODATA?.organisms?.length||0);
    $("stat-elements").textContent=String(window.BIODATA?.elements?.length||0);
    $("stat-questions").textContent=String(window.BioQuiz?.count||5);
    $("global-search").addEventListener("input",e=>showSearch(e.target.value));
    $("global-search").addEventListener("keydown",e=>{
      if(e.key==="Escape")$("search-results").hidden=true;
      if(e.key==="Enter"){const first=$("search-results").querySelector("button");if(first)first.click();}
    });
    document.addEventListener("keydown",e=>{
      if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){e.preventDefault();$("global-search").focus();}
      if(e.key==="Escape"){closeMenu();$("search-results").hidden=true;}
    });
    $("mobile-menu").addEventListener("click",()=>{
      const open=!$("app-sidebar").classList.contains("open");
      $("app-sidebar").classList.toggle("open",open);
      $("mobile-backdrop").hidden=!open;
      $("mobile-menu").setAttribute("aria-expanded",String(open));
    });
    $("mobile-backdrop").addEventListener("click",closeMenu);
    const dark=safeLoad("biodata.v2.theme")==="dark";
    document.body.classList.toggle("dark-theme",dark);
    $("theme-toggle").textContent=dark?"☀":"☾";
    $("theme-toggle").addEventListener("click",()=>{
      const on=document.body.classList.toggle("dark-theme");
      $("theme-toggle").textContent=on?"☀":"☾";
      safeSave("biodata.v2.theme",on?"dark":"light");
    });
    $("route-reset").addEventListener("click",()=>{
      if(!done.size)return;
      if(!confirm("¿Restablecer el progreso guardado en este navegador?"))return;
      done.clear();safeRemove("biodata.v2.progress");renderProgress();renderRoute();
    });
    renderProgress();renderRoute();
    const initial=location.hash.slice(1);
    go(allowed.has(initial)?initial:"inicio",false);
    window.addEventListener("hashchange",()=>{const name=location.hash.slice(1);if(allowed.has(name))go(name,false);});
  }
  document.addEventListener("DOMContentLoaded",init);
  window.BioDataApp={go};
})();