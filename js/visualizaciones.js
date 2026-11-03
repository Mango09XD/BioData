/* BioData - Microlaboratorios interactivos sin dependencias */
(() => {
"use strict";
const $=id=>document.getElementById(id);
const complement={A:"T",T:"A",C:"G",G:"C"};
const stages=[
 {name:"Interfase",caption:"La célula crece y replica el ADN durante la fase S antes de entrar en división. No pertenece a la mitosis propiamente dicha.",color:"#5ed9bc",draw:"diffuse"},
 {name:"Profase",caption:"Los cromosomas se condensan y comienza a organizarse el huso mitótico.",color:"#a08df5",draw:"paired"},
 {name:"Metafase",caption:"Los cromosomas se alinean aproximadamente en el plano ecuatorial de la célula.",color:"#5dbbeb",draw:"middle"},
 {name:"Anafase",caption:"Las cromátidas hermanas se separan y se desplazan hacia polos opuestos.",color:"#ffc26b",draw:"apart"},
 {name:"Telofase",caption:"Se reorganizan las envolturas nucleares alrededor de los conjuntos cromosómicos.",color:"#9cde83",draw:"telophase"},
 {name:"Citocinesis",caption:"Se separa el citoplasma; en células animales suele formarse un surco de división.",color:"#e5a4c6",draw:"split"}
];
let stage=0,playing=false,timer=null;
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;};
function dna(){
 const value=$("dna-input").value.toUpperCase().replace(/[^ATCG]/g,"").slice(0,36);
 if($("dna-input").value!==value)$("dna-input").value=value;
 const target=$("dna-visual");target.replaceChildren();
 for(const [i,base] of [...value].entries()){
  const opposite=complement[base];
  const pair=make("div","dna-pair");
  pair.style.setProperty("--offset",Math.sin(i*.75)*27+"px");
  pair.style.setProperty("--base-color",base==="A"?"#45d7b3":base==="T"?"#8da8f5":base==="C"?"#ffca79":"#f19cb8");
  pair.append(make("span","dna-letter",base),make("span","dna-bond","···"),make("span","dna-letter",opposite));
  target.append(pair);
 }
 const gc=(value.match(/[CG]/g)||[]).length;
 $("dna-complement").textContent=value?[...value].map(c=>complement[c]).join(""):"—";
 $("dna-count").textContent=value.length+" bases";
 $("dna-gc").textContent=value.length?Math.round(gc/value.length*100)+" %":"—";
 $("dna-tip").textContent=value.length<1?"Escribe A, T, C o G para formar el fragmento.":"Cada A se empareja con T y cada C con G. La secuencia complementaria se muestra en el mismo orden, sin invertir su orientación.";
}
function mitosis(){
 const current=stages[stage];
 $("mitosis-title").textContent=current.name;
 $("mitosis-caption").textContent=current.caption;
 $("mitosis-count").textContent=(stage+1)+" / "+stages.length;
 $("mitosis-stage").textContent=current.name;
 $("mitosis-prev").disabled=stage===0;
 $("mitosis-next").disabled=stage===stages.length-1;
 document.querySelectorAll("[data-mitosis-stage]").forEach((b,i)=>{
   b.classList.toggle("active",i===stage);
   b.setAttribute("aria-pressed",String(i===stage));
 });
 const svg=$("mitosis-visual");svg.replaceChildren();
 const ns="http://www.w3.org/2000/svg";
 function shape(tag,attrs){const node=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,String(v)));svg.append(node);return node;}
 const surface=shape("ellipse",{cx:180,cy:120,rx:140,ry:91,fill:"#102a3e",stroke:"#4fb9b6","stroke-width":3});
 if(current.draw==="split"){surface.setAttribute("d","");surface.setAttribute("rx",65);surface.setAttribute("cx",97);shape("ellipse",{cx:263,cy:120,rx:65,ry:89,fill:"#102a3e",stroke:"#4fb9b6","stroke-width":3});}
 else if(current.draw==="telophase"){shape("ellipse",{cx:180,cy:120,rx:138,ry:90,fill:"none",stroke:"#e5a4c6","stroke-width":2,"stroke-dasharray":"5 6"});}
 if(current.draw==="diffuse"){
   shape("circle",{cx:180,cy:120,r:59,fill:"#1c4262",stroke:"#638fd6","stroke-width":2});
   for(let i=0;i<12;i++){
      const x=145+((i*37)%72),y=85+((i*23)%65);
      shape("path",{d:"M"+x+" "+y+" q9 -12 15 1 q6 12 -6 14",stroke:current.color,fill:"none","stroke-width":3});
   }
 }else{
   if(current.draw==="telophase"||current.draw==="split"){
      [112,250].forEach(x=>{shape("circle",{cx:x,cy:120,r:43,fill:"#1c4262",stroke:"#9bc3ea","stroke-width":2});});
   }
   const centers=current.draw==="middle"?[[180,82],[180,112],[180,142],[180,172]]:
      current.draw==="apart"?[[101,88],[101,133],[259,88],[259,133]]:
      current.draw==="paired"?[[148,99],[193,98],[156,143],[205,145]]:
      [[100,107],[119,135],[242,107],[261,135]];
   centers.forEach(([x,y],i)=>{
      const color=i%2?"#e9a3d4":"#82f0c2";
      shape("path",{d:"M"+(x-10)+" "+(y-14)+" L"+(x+10)+" "+(y+14)+" M"+(x+10)+" "+(y-14)+" L"+(x-10)+" "+(y+14),stroke:color,"stroke-width":5,"stroke-linecap":"round"});
   });
   if(["middle","apart"].includes(current.draw)){
     [45,315].forEach(x=>shape("circle",{cx:x,cy:120,r:6,fill:"#ffd68c"}));
     centers.forEach(([x,y])=>{shape("path",{d:"M45 120 L"+x+" "+y+" M315 120 L"+x+" "+y,stroke:"#6d9cbe","stroke-width":1.2,opacity:.6});});
   }
 }
 $("mitosis-visual").setAttribute("aria-label","Diagrama esquemático de "+current.name.toLowerCase());
}
function stop(){if(timer)clearInterval(timer);timer=null;playing=false;$("mitosis-play").textContent="▶ Reproducir";}
function next(){stage=(stage+1)%stages.length;mitosis();}
function init(){
 if(!$("dna-input"))return;
 $("dna-input").addEventListener("input",dna);
 $("dna-example").addEventListener("click",()=>{$("dna-input").value="ATGCCGTTAACG";dna();});
 $("dna-clear").addEventListener("click",()=>{$("dna-input").value="";dna();});
 $("mitosis-prev").addEventListener("click",()=>{stop();stage=Math.max(stage-1,0);mitosis();});
 $("mitosis-next").addEventListener("click",()=>{stop();stage=Math.min(stage+1,stages.length-1);mitosis();});
 $("mitosis-play").addEventListener("click",()=>{
   if(playing){stop();return;}
   playing=true;$("mitosis-play").textContent="Ⅱ Pausar";
   if(stage===stages.length-1)stage=0;
   mitosis();timer=setInterval(next,2100);
 });
 const controls=$("mitosis-step-buttons");
 stages.forEach((s,i)=>{const b=make("button","mitosis-step",s.name);b.type="button";b.dataset.mitosisStage=String(i);b.addEventListener("click",()=>{stop();stage=i;mitosis();});controls.append(b);});
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stop();});
 dna();mitosis();
}
document.addEventListener("DOMContentLoaded",init);
window.BioVisualLab={stages};
})();