(() => {
 function show(part){const info=BIODATA.cellParts[part];if(!info)return;document.getElementById("cell-detail").innerHTML=`<span class="info-emoji">${info.emoji}</span><h3>${info.title}</h3><p>${info.text}</p>`;document.querySelectorAll("[data-part]").forEach(b=>b.classList.toggle("active",b.dataset.part===part));}
 document.addEventListener("click",e=>{const b=e.target.closest("[data-part]");if(b)show(b.dataset.part);});
 document.addEventListener("DOMContentLoaded",()=>show("Célula vegetal"));
 window.BioCells={show};
})();

