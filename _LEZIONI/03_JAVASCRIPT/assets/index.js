// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/
/* 

Esercizio 1

1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box

*/
const letters = ["a", "b", "c", "d", "e", "f"];
const newBox = document.getElementsByClassName("box-list");

for (const letter of letters) {
  newBox[0].innerHTML += `<div class="box"><span>${letter}</span></div>`;
}

/*ESERCIZIO 1
Crea una funzione getEvenNumbers che riceve un array di numeri e restituisce un nuovo array contenente solo i numeri pari. Usa il metodo filter.
*/

console.log("ESERCIZIO 1");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getEvenNumbers(numbers) {
  const even = numbers.filter((n) => n % 2 === 0);
  return even;
}

console.log(getEvenNumbers(numbers));

/*ESERCIZIO 2
Crea un oggetto student con le proprieta' firstName, lastName e age. Aggiungi un metodo getFullName che restituisce il nome completo. Poi usa il destructuring per estrarre firstName e lastName in variabili separate.
*/

console.log("");
console.log("ESERCIZIO 2");

const student = {
  firstName: "samuele",
  lastName: "bortolotti",
  age: 19,
};

function getFullName(student) {
  return student.firstName + " " + student.lastName;
}

const { firstName, lastName } = student;

console.log(getFullName(student));
console.log(firstName);
console.log(lastName);

/*ESERCIZIO 3
Crea una pagina HTML con un bottone e un paragrafo. Quando l'utente clicca il bottone, il testo del paragrafo deve cambiare e il colore deve diventare blu.
*/

console.log("");
console.log("ESERCIZIO 3");

const button = document.getElementById("btn");

button.addEventListener("click", function () {
  const paragrafo = document.getElementById("prg");
  paragrafo.textContent = "Questo è il paragrafo nuovo";
  paragrafo.style.color = "green";
});

/*ESERCIZIO 4
Scrivi una funzione asincrona che usa fetch per scaricare i dati dall'API https://jsonplaceholder.typicode.com/todos/1 e stampa in console il titolo del todo ricevuto. Gestisci eventuali errori con try/catch.
*/

async function printTitle() {
  try {
    const dati = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const { title } = await dati.json();

    console.log("");
    console.log("ESERCIZIO 4");
    console.log(title);
  } catch (error) {
    console.log("");
    console.log("ESERCIZIO 4");
    console.log("Errore", error.message);
  }
}

printTitle();

/*ESERCIZIO 5
Dato il seguente oggetto, usa il destructuring per estrarre il nome dell'utente, la citta' e il nome dell'azienda in variabili separate:

const user = {
  name: "Leanne Graham",
  address: {
    street: "Kulas Light",
    city: "Milano",
  },
  company: {
    name: "Tech Solutions",
    catchPhrase: "Innovare per crescere",
  },
};

// Suggerimento: puoi fare destructuring annidato
// const { name, address: { city }, company: { name: companyName } } = user;
*/

console.log("");
console.log("ESERCIZIO 5");

const user = {
  name: "Leanne Graham",
  address: {
    street: "Kulas Light",
    city: "Milano",
  },
  company: {
    name: "Tech Solutions",
    catchPhrase: "Innovare per crescere",
  },
};

const {
  name,
  address: { city },
  company: { name: companyName },
} = user;

console.log(name);
console.log(city);
console.log(companyName);
