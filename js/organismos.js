(() => {
 let filter="Todos", query="";
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){
  const grid=document.getElementById("organism-grid");if(!grid)return;
  const list=BIODATA.organisms.filter(o=>(filter==="Todos"||o.type===filter)&&(o.name+" "+o.scientific+" "+o.summary+" "+o.type).toLowerCase().includes(query.toLowerCase()));
  grid.innerHTML=list.length?list.map(o=>`<article class="organism-card"><button data-organism="${esc(o.name)}"><div class="organism-art">${o.emoji}</div><div class="organism-copy"><h3>${esc(o.name)}</h3><p><em>${esc(o.scientific)}</em></p><p>${esc(o.summary)}</p><span class="tag">${esc(o.type)}</span></div></button></article>`).join(""):"<p class='muted'>No encontramos resultados.</p>";
 }
 function detail(name){const o=BIODATA.organisms.find(x=>x.name===name);if(!o)return;const box=document.getElementById("organism-detail");box.classList.remove("hidden");box.innerHTML=`<span class="eyebrow">FICHA DEL ORGANISMO</span><h3>${o.emoji} ${esc(o.name)} <small class="muted"><em>${esc(o.scientific)}</em></small></h3><span class="tag">${esc(o.type)}</span><p>${esc(o.summary)}</p><dl><dt>Hábitat</dt><dd>${esc(o.habitat)}</dd><dt>Nutrición</dt><dd>${esc(o.nutrition)}</dd><dt>Reproducción</dt><dd>${esc(o.reproduction)}</dd><dt>Dato interesante</dt><dd>${esc(o.facts)}</dd></dl>`;box.scrollIntoView({behavior:"smooth",block:"nearest"});}
 document.addEventListener("click",e=>{let card=e.target.closest("[data-organism]");if(card)detail(card.dataset.organism);let f=e.target.closest("[data-filter]");if(f){filter=f.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===f));render();}});
 document.addEventListener("input",e=>{if(e.target.id==="organism-search"){query=e.target.value;render();}});
 window.BioOrganisms={render,detail,search(q){query=q||"";const i=document.getElementById("organism-search");if(i)i.value=query;render();}};
 document.addEventListener("DOMContentLoaded",render);
})();

