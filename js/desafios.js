(() => {
 const qs=[
 {q:"¿Cuál es el número atómico del oxígeno?",o:["6","8","12","16"],a:1,x:"El oxígeno tiene número atómico 8: posee ocho protones."},
 {q:"¿Qué estructura contiene la mayor parte del ADN de una célula vegetal?",o:["Pared celular","Vacuola","Núcleo","Cloroplasto"],a:2,x:"El núcleo contiene la mayor parte del material genético de una célula vegetal."},
 {q:"¿Qué proceso utilizan las plantas para producir azúcares usando luz?",o:["Fermentación","Fotosíntesis","Digestión","Evaporación"],a:1,x:"La fotosíntesis transforma energía luminosa en energía química."},
 {q:"¿Cuál de estos organismos pertenece al reino de los hongos?",o:["Sábila","Ajolote","Champiñón","Mariposa"],a:2,x:"El champiñón es un hongo."},
 {q:"¿Qué lenguaje se utiliza para consultar bases de datos relacionales?",o:["SQL","HTML","CSS","PNG"],a:0,x:"SQL permite definir, consultar y modificar datos en bases de datos relacionales."},
 {q:"¿Qué molécula almacena información genética?",o:["ATP","ADN","Glucosa","Clorofila"],a:1,x:"El ADN almacena la información hereditaria en la mayoría de los seres vivos."},
 {q:"¿Cuál es la unidad básica de los seres vivos?",o:["Tejido","Órgano","Célula","Átomo"],a:2,x:"La célula es la unidad estructural y funcional fundamental de los seres vivos."},
 {q:"¿Qué organelo participa en la producción de ATP?",o:["Mitocondria","Vacuola","Ribosoma","Pared celular"],a:0,x:"Las mitocondrias intervienen en la respiración celular."},
 {q:"¿Cuál es el símbolo químico del hierro?",o:["H","He","Fe","Ir"],a:2,x:"Fe procede del latín ferrum."},
 {q:"¿Cuál es un ejemplo de reproducción asexual?",o:["Fecundación","Gemación de levaduras","Polinización","Meiosis"],a:1,x:"La gemación es un mecanismo de reproducción asexual frecuente en levaduras."},
 {q:"¿Qué estudia la ecología?",o:["Interacciones entre seres vivos y ambiente","Solamente genes","Solo minerales","Únicamente planetas"],a:0,x:"La ecología analiza las relaciones de los organismos entre sí y con el entorno."},
 {q:"En un cruce Aa × Aa, ¿qué porcentaje esperado tiene genotipo aa?",o:["0 %","25 %","50 %","75 %"],a:1,x:"El cuadro de Punnett da AA, Aa, Aa y aa, por lo que aa representa 1 de 4 casos."},
 {q:"¿Qué proceso reduce a la mitad el número de cromosomas?",o:["Mitosis","Fotosíntesis","Meiosis","Fermentación"],a:2,x:"La meiosis genera células con la mitad del número de cromosomas."}
 ];
 let i=0,score=0,answered=false;const $=id=>document.getElementById(id);
 function render(){const q=qs[i];answered=false;$("quiz-progress").textContent=`Pregunta ${i+1} de ${qs.length}`;$("quiz-score").textContent=`Puntuación: ${score}`;$("quiz-progress-bar").style.width=`${i/qs.length*100}%`;$("quiz-question").textContent=q.q;$("quiz-options").innerHTML=q.o.map((o,n)=>`<button class="quiz-option" data-answer="${n}">${String.fromCharCode(65+n)}. ${o}</button>`).join("");$("quiz-feedback").textContent="";$("quiz-feedback").className="quiz-feedback";$("next-question").disabled=true;$("next-question").textContent=i===qs.length-1?"Ver resultado":"Siguiente pregunta →";}
 function answer(n){if(answered)return;answered=true;const q=qs[i],ok=n===q.a;if(ok)score++;document.querySelectorAll("[data-answer]").forEach((b,j)=>{b.disabled=true;if(j===q.a)b.classList.add("correct");else if(j===n)b.classList.add("incorrect");});$("quiz-score").textContent=`Puntuación: ${score}`;$("quiz-feedback").textContent=(ok?"¡Correcto! ":"No exactamente. ")+q.x;$("quiz-feedback").classList.toggle("bad",!ok);$("quiz-progress-bar").style.width=`${(i+1)/qs.length*100}%`;$("next-question").disabled=false;}
 function next(){if(!answered)return;if(i<qs.length-1){i++;render();}else{$("quiz-question").textContent=`¡Desafío terminado! Obtuviste ${score} de ${qs.length}.`;$("quiz-options").innerHTML="";$("quiz-feedback").textContent=score===qs.length?"¡Excelente! Respondiste todas correctamente.":"Puedes reiniciar para practicar y mejorar tu puntuación.";$("next-question").disabled=true;$("next-question").textContent="Terminado";}}
 function restart(){i=0;score=0;render();}
 document.addEventListener("click",e=>{const b=e.target.closest("[data-answer]");if(b)answer(Number(b.dataset.answer));if(e.target.id==="next-question")next();if(e.target.id==="restart-quiz")restart();});
 document.addEventListener("DOMContentLoaded",render);window.BioQuiz={restart,count:qs.length};
})();

