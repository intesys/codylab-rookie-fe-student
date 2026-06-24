// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/
/* 

testo Esercizio 1.b

1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box
*/

/* Esercizio 1.b */

const stringhe = ["Ciao", "Mondo", "JavaScript", "Esercizio", "Box", "cucu", "ciaoo", "miao", "bau"];

const boxListSection = document.querySelector(".box-list");

if (boxListSection) {
  for (let i = 0; i < stringhe.length; i++) {
    const nuovoBox = document.createElement("div");

    nuovoBox.classList.add("box");

    const contenutoBox = document.createElement("span");
    contenutoBox.textContent = stringhe[i];

    nuovoBox.appendChild(contenutoBox);
    boxListSection.appendChild(nuovoBox);
  }
}

/* 
    altra soluzione:


const letters = ["a", "b", "c", "d", "e"];

const newBox = document.getElementsByClassName("box-list");

for (const letter of letters) {
  newBox[0].innerHTML += `<div class="box"><span>${letter}</span></div>`;
}
*/

console.log("Hello World");
