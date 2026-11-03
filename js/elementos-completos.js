/* Catálogo completo de nombres y símbolos de los 118 elementos químicos.
   Complementa las fichas parciales existentes sin inventar masas ni aplicaciones. */
(() => {
  "use strict";
  const all=[
  ["H","Hidrógeno"],["He","Helio"],["Li","Litio"],["Be","Berilio"],["B","Boro"],["C","Carbono"],["N","Nitrógeno"],["O","Oxígeno"],["F","Flúor"],["Ne","Neón"],
  ["Na","Sodio"],["Mg","Magnesio"],["Al","Aluminio"],["Si","Silicio"],["P","Fósforo"],["S","Azufre"],["Cl","Cloro"],["Ar","Argón"],["K","Potasio"],["Ca","Calcio"],
  ["Sc","Escandio"],["Ti","Titanio"],["V","Vanadio"],["Cr","Cromo"],["Mn","Manganeso"],["Fe","Hierro"],["Co","Cobalto"],["Ni","Níquel"],["Cu","Cobre"],["Zn","Zinc"],
  ["Ga","Galio"],["Ge","Germanio"],["As","Arsénico"],["Se","Selenio"],["Br","Bromo"],["Kr","Kriptón"],["Rb","Rubidio"],["Sr","Estroncio"],["Y","Itrio"],["Zr","Circonio"],
  ["Nb","Niobio"],["Mo","Molibdeno"],["Tc","Tecnecio"],["Ru","Rutenio"],["Rh","Rodio"],["Pd","Paladio"],["Ag","Plata"],["Cd","Cadmio"],["In","Indio"],["Sn","Estaño"],
  ["Sb","Antimonio"],["Te","Telurio"],["I","Yodo"],["Xe","Xenón"],["Cs","Cesio"],["Ba","Bario"],["La","Lantano"],["Ce","Cerio"],["Pr","Praseodimio"],["Nd","Neodimio"],
  ["Pm","Prometio"],["Sm","Samario"],["Eu","Europio"],["Gd","Gadolinio"],["Tb","Terbio"],["Dy","Disprosio"],["Ho","Holmio"],["Er","Erbio"],["Tm","Tulio"],["Yb","Iterbio"],
  ["Lu","Lutecio"],["Hf","Hafnio"],["Ta","Tantalio"],["W","Wolframio"],["Re","Renio"],["Os","Osmio"],["Ir","Iridio"],["Pt","Platino"],["Au","Oro"],["Hg","Mercurio"],
  ["Tl","Talio"],["Pb","Plomo"],["Bi","Bismuto"],["Po","Polonio"],["At","Astato"],["Rn","Radón"],["Fr","Francio"],["Ra","Radio"],["Ac","Actinio"],["Th","Torio"],
  ["Pa","Protactinio"],["U","Uranio"],["Np","Neptunio"],["Pu","Plutonio"],["Am","Americio"],["Cm","Curio"],["Bk","Berkelio"],["Cf","Californio"],["Es","Einstenio"],["Fm","Fermio"],
  ["Md","Mendelevio"],["No","Nobelio"],["Lr","Lawrencio"],["Rf","Rutherfordio"],["Db","Dubnio"],["Sg","Seaborgio"],["Bh","Bohrio"],["Hs","Hassio"],["Mt","Meitnerio"],["Ds","Darmstadtio"],
  ["Rg","Roentgenio"],["Cn","Copernicio"],["Nh","Nihonio"],["Fl","Flerovio"],["Mc","Moscovio"],["Lv","Livermorio"],["Ts","Teneso"],["Og","Oganesón"]
  ];
  const detailed=new Map((window.BIODATA?.elements||[]).map(e=>[e.n,e]));
  const periodOf=n=>n<=2?1:n<=10?2:n<=18?3:n<=36?4:n<=54?5:n<=86?6:7;
  const positionOf=n=>{
    if(n===1)return {group:1,period:1,row:1,col:1};
    if(n===2)return {group:18,period:1,row:1,col:18};
    if(n>=3&&n<=10){const col=n<=4?n-2:n+8;return {group:col,period:2,row:2,col};}
    if(n>=11&&n<=18){const col=n<=12?n-10:n;return {group:col,period:3,row:3,col};}
    if(n>=19&&n<=36)return {group:n-18,period:4,row:4,col:n-18};
    if(n>=37&&n<=54)return {group:n-36,period:5,row:5,col:n-36};
    if(n===55||n===56)return {group:n-54,period:6,row:6,col:n-54};
    if(n>=57&&n<=71)return {group:null,period:6,row:9,col:n-54};
    if(n>=72&&n<=86)return {group:n-68,period:6,row:6,col:n-68};
    if(n===87||n===88)return {group:n-86,period:7,row:7,col:n-86};
    if(n>=89&&n<=103)return {group:null,period:7,row:10,col:n-86};
    return {group:n-100,period:7,row:7,col:n-100};
  };
  function category(n,g){
    if(n>=57&&n<=71)return "Lantánido";
    if(n>=89&&n<=103)return "Actínido";
    if([2,10,18,36,54,86,118].includes(n))return "Gas noble";
    if([9,17,35,53,85,117].includes(n))return "Halógeno";
    if(g===1&&n!==1)return "Metal alcalino";
    if(g===2)return "Metal alcalinotérreo";
    if([5,14,32,33,51,52].includes(n))return "Metaloide";
    if([1,6,7,8,15,16,34].includes(n))return "No metal";
    if(g>=3&&g<=12)return "Metal de transición";
    if(n>=104&&n<=112)return "Metal de transición";
    return "Otro elemento";
  }
  const complete=all.map(([s,name],index)=>{
    const n=index+1,loc=positionOf(n),base=detailed.get(n)||{};
    return {...base,n,s,name,group:loc.group,period:loc.period,row:loc.row,col:loc.col,
      kind:base.kind||category(n,loc.group),
      mass:base.mass||"No incluida",
      uses:base.uses||"Ficha de referencia: consulta número atómico, símbolo, nombre y ubicación. Las aplicaciones y propiedades específicas se ampliarán en próximas versiones.",
      enriched:Boolean(detailed.has(n))
    };
  });
  if(complete.length!==118||complete[117].s!=="Og")throw Error("Tabla incompleta");
  window.BIODATA.elements=complete;
})();
