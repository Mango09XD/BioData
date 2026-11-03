/* Tabla periódica interactiva BioData: 118 elementos, filtros y fichas. */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=s=>String(s??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
let selected=8,query="",category="Todos";
const categories=["Todos","No metal","Gas noble","Halógeno","Metal alcalino","Metal alcalinotérreo","Metal de transición","Metaloide","Lantánido","Actínido","Otro elemento"];
function render(){
 const table=$("periodic-table");if(!table)return;
 table.classList.add("periodic-table-full");
 const elements=window.BIODATA.elements;
 table.innerHTML=elements.map(el=>{
   const visible=(category==="Todos"||el.kind===category)&&(!query||norm(el.name+" "+el.s+" "+el.n).includes(norm(query)));
   return '<button class="element-cell '+(visible?"":"dimmed")+' '+(selected===el.n?"selected":"")+'" style="--column:'+el.col+';--row:'+el.row+'" data-element="'+el.n+'" title="'+esc(el.name)+'" aria-label="'+esc(el.name)+', elemento '+el.n+'" aria-pressed="'+(selected===el.n)+'"><small>'+el.n+'</small><strong>'+esc(el.s)+'</strong><small>'+esc(el.name)+'</small></button>';
 }).join("");
 show(selected,false);
 const count=elements.filter(el=>(category==="Todos"||el.kind===category)&&(!query||norm(el.name+" "+el.s+" "+el.n).includes(norm(query)))).length;
 if($("periodic-count"))$("periodic-count").textContent=count+" / 118 elementos";
}
function show(n,update=true){
 const el=window.BIODATA.elements.find(e=>e.n===Number(n));if(!el)return;
 selected=el.n;
 document.querySelectorAll("[data-element]").forEach(b=>{const active=Number(b.dataset.element)===el.n;b.classList.toggle("selected",active);b.setAttribute("aria-pressed",String(active));});
 const group=el.group===null?"Serie f":String(el.group);
 $("element-detail").innerHTML='<div class="element-symbol">'+el.n+'<br><strong>'+esc(el.s)+'</strong></div><div><h3>'+esc(el.name)+'</h3><p class="muted">'+esc(el.kind)+'</p></div><dl><dt>Número atómico</dt><dd>'+el.n+'</dd><dt>Período</dt><dd>'+el.period+'</dd><dt>Grupo</dt><dd>'+group+'</dd><dt>Masa atómica</dt><dd>'+esc(el.mass)+(el.mass==="No incluida"?"":" u")+'</dd><dt>Información</dt><dd>'+esc(el.uses)+'</dd></dl><a href="https://iupac.org/what-we-do/periodic-table-of-elements/" target="_blank" rel="noopener noreferrer" class="element-source">Consulta la referencia de IUPAC ↗</a>';
 if(update&&$("periodic-count"))$("periodic-count").textContent=(document.querySelectorAll(".element-cell:not(.dimmed)").length)+" / 118 elementos";
}
function init(){
 const search=$("periodic-search");if(!search)return;
 search.addEventListener("input",e=>{query=e.target.value;render();});
 const select=$("periodic-category");if(select){
   categories.forEach(cat=>{const option=document.createElement("option");option.value=cat;option.textContent=cat;select.append(option);});
   select.addEventListener("change",e=>{category=e.target.value;render();});
 }
 render();
}
document.addEventListener("click",event=>{const b=event.target.closest("[data-element]");if(b)show(b.dataset.element);});
document.addEventListener("DOMContentLoaded",init);
window.BioPeriodicTable={render,show,search(q){const result=window.BIODATA.elements.find(e=>norm(e.name+" "+e.s+" "+e.n).includes(norm(q)));if(result){query="";category="Todos";if($("periodic-search"))$("periodic-search").value="";if($("periodic-category"))$("periodic-category").value="Todos";render();show(result.n);}}};
})();