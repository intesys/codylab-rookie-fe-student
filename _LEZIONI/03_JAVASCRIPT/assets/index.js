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

console.log("Hello World");

/* Esercizio 1
Crea una funzione getEvenNumbers che riceve un array di numeri 
e restituisce un nuovo array contenente solo i numeri pari. Usa il metodo filter.
*/

// Funzione che riceve un array e filtra solo i numeri pari
const getEvenNumbers = (numbers) => {
  // Ritorna l'array tenendo solo i numeri con resto 0 divisi per 2
  return numbers.filter((number) => number % 2 === 0);
};

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]));

/* Esercizio 2
Crea un oggetto student con le proprieta' firstName, lastName e age. 
Aggiungi un metodo getFullName che restituisce il nome completo. 
Poi usa il destructuring per estrarre firstName e lastName in variabili separate.
*/

// Creazione dell'oggetto studente con proprietà e metodo
const student = {
  firstName: "Nimeth",
  lastName: "Mahabaduge",
  age: 18,

  // Metodo per unire nome e cognome
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

// Estrazione di firstName e lastName in variabili separate
const { firstName, lastName } = student;

console.log(firstName);
console.log(lastName);
console.log(student.getFullName());

/* Esercizio 4
Scrivi una funzione asincrona che usa fetch per scaricare i dati dall'API 
https://jsonplaceholder.typicode.com/todos/1 e stampa in console il titolo del todo ricevuto. 
Gestisci eventuali errori con try/catch.
*/

// Funzione asincrona per scaricare i dati
async function getTodoTitle() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  try {
    const response = await fetch(url); // Invia la richiesta HTTP

    if (!response.ok) {
      throw new Error(`Errore: ${response.status}`); // Gestisce risposte di errore del server
    }

    const todo = await response.json();
    console.log("Titolo del todo:", todo.title); // Stampa solo la proprietà 'title'
  } catch (error) {
    console.error("Si è verificato un errore:", error.message); // Cattura errori di rete
  }
}

getTodoTitle(); // Esegue la funzione

/* Esercizio 5
Dato il seguente oggetto, usa il destructuring per estrarre il nome dell'utente, 
la citta' e il nome dell'azienda in variabili separate:
const user = { ... };
*/

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

// Destructuring annidato con ridenominazione per evitare conflitti di nomi
const {
  name: userName, // Estrae name e lo rinomina in userName
  address: { city }, // Entra in address ed estrae city
  company: { name: companyName }, // Entra in company, estrae name e lo rinomina
} = user;

// Test delle variabili estratte
console.log(userName); // Output: Leanne Graham
console.log(city); // Output: Milano
console.log(companyName); // Output: Tech Solutions

/*ESERCIZIO 1 della consegna iniziale
1) Creare una costante che contiene una lista di stringhe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiene la lista dei box
*/

// 1) Costante che contiene una lista di stringhe
const listaStringhe = ["Mela", "Arancia", "Pesca", "Ciliegie", "Anguria", "Uva"];

// 2) Intercettare la div che contiene la lista dei box
const contenitoreBox = document.querySelector(".box-list");

// Controllo di sicurezza se la div esiste
if (contenitoreBox) {
  // 3) Ciclo for che cicla la lista di stringhe
  for (let i = 0; i < listaStringhe.length; i++) {
    // 4) Per ogni stringa creare un box...
    const nuovoBox = document.createElement("div");
    nuovoBox.classList.add("box"); // Applica classe stile "box"
    nuovoBox.innerHTML = `<span>${listaStringhe[i]}</span>`; //
    contenitoreBox.appendChild(nuovoBox);
  }

  // Test di corretto funzionamento
  console.log("I box con i frutti sono stati creati con successo!");
}
