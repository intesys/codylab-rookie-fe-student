// Questo è un commento in JavaScript riga singola
/* 
    Questo è un commento in JavaScript multi riga 
*/
/* 

Esercizio 1{

1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box

*/
const getEvenNumbers = (numbers) => {
  return numbers.filter((n) => n % 2 === 0);
};

// Verifica del risultato:
console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]));

const student = {
  firstName: "Mario",
  lastName: "Rossi",
  age: 21,
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

// Uso del metodo
console.log(student.getFullName());

// Destructuring delle proprietà
const { firstName, lastName } = student;

console.log(firstName);
console.log(lastName);

/* 
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Manipolazione DOM</title>
</head>
<body>

    <button id="mio-bottone">Cliccami!</button>
    <p id="mio-paragrafo">Testo originale</p>

    <script>
        bottone.addEventListener("click", () => {
            paragrafo.textContent = "Il testo è stato cambiato con successo!";
            paragrafo.style.color = "blue";
        });
    </script>

</body>
</html>*/

async function getTodoTitle() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Errore HTTP! Stato: ${response.status}`);
    }

    const todo = await response.json();

    console.log("Titolo del todo:", todo.title);
  } catch (error) {
    console.error("Si è verificato un errore durante la richiesta:", error.message);
  }
}

// Esecuzione della funzione
getTodoTitle();

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

// Destructuring annidato con rinomina di una variabile
const {
  name,
  address: { city },
  company: { name: companyName },
} = user;

// Verifica dei dati estratti:
console.log(name);
console.log(city);
console.log(companyName);

//ESERCIZI FATTI DA ME:

// Es 1
const PI = 3.14;
try {
  PI = 3.1415; // Genera errore
} catch (error) {
  console.log("Errore: Non puoi riassegnare una costante!");
}

// Es 2
let contatore = 0;
contatore++;
contatore++;
contatore++;
console.log(contatore); // 3

// Es 1
let a = "10";
let b = 10;
console.log(a == b); // true (converte il tipo)
console.log(a === b); // false (tipo string diverso da number)

// Es 2
const prodotto = "Computer";
const prezzo = 800;
const sconto = 50;
console.log(`Il ${prodotto} costa ${prezzo - sconto}€`);

// Es 1
let punteggio = 85;
if (punteggio >= 90) {
  console.log("Eccellente");
} else if (punteggio >= 60) {
  console.log("Superato");
} else {
  console.log("Sufficiente/Non superato");
}

// Es 2
let isOnline = true;
let statusMessage = isOnline ? "Disponibile" : "Non in linea";

// Es 1
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}

// Es 2
const spesa = ["pane", "latte", "uova"];
for (const item of spesa) {
  console.log(item.toUpperCase());
}

// Es 1
const numeri = [1, 2, 3, 4];
numeri.push(5);
numeri.shift();
console.log(numeri); // [2, 3, 4, 5]

// Es 2
const prezzi = [10, 20, 30, 40];
const prezziScontati = prezzi.map((p) => p * 0.9);
const prezziAlti = prezzi.filter((p) => p > 25);

// Es 1 e 2 combinati
const libro = {
  titolo: "Il Signore degli Anelli",
  autore: "J.R.R. Tolkien",
  annoPubblicazione: 1954,
  descrizione: function () {
    return `Il libro ${this.titolo} è stato scritto da ${this.autore}`;
  },
};
libro.annoPubblicazione = 1955;
libro.letto = true;
