(() => {
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function render(){const table=document.getElementById("periodic-table");if(!table)return;table.innerHTML=BIODATA.elements.map(el=>`<button class="element-cell" data-element="${el.n}" aria-label="${esc(el.name)}"><small>${el.n}</small><strong>${esc(el.s)}</strong><small>${esc(el.name)}</small></button>`).join("");const o=BIODATA.elements.find(e=>e.s==="O");if(o)show(o.n);}
 function show(n){const el=BIODATA.elements.find(e=>e.n===Number(n));if(!el)return;document.querySelectorAll("[data-element]").forEach(b=>b.classList.toggle("selected",Number(b.dataset.element)===el.n));document.getElementById("element-detail").innerHTML=`<div class="element-symbol">${el.n}<br><strong>${esc(el.s)}</strong></div><div><h3>${esc(el.name)}</h3><p class="muted">${esc(el.kind)}</p></div><dl><dt>Número atómico</dt><dd>${el.n}</dd><dt>Masa atómica</dt><dd>${esc(el.mass)} u</dd><dt>Grupo / período</dt><dd>${el.group} / ${el.period}</dd><dt>Usos y relevancia</dt><dd>${esc(el.uses)}</dd></dl>`;}
 document.addEventListener("click",e=>{const b=e.target.closest("[data-element]");if(b)show(b.dataset.element);});
 window.BioPeriodicTable={render,show,search(q){const el=BIODATA.elements.find(e=>(e.name+" "+e.s+" "+e.n).toLowerCase().includes(String(q).toLowerCase()));if(el)show(el.n);}};
 document.addEventListener("DOMContentLoaded",render);
})();

