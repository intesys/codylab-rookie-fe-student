/*Esercizio 1 - Filtrare un array
Crea una funzione getEvenNumbers che riceve un array di numeri e restituisce un nuovo array contenente solo i numeri pari. Usa il metodo filter.
*/
function getEvenNumbers(array) {
  return array.filter(function (numero) {
    return numero % 2 === 0;
  });
}

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]));

/*
Esercizio 2 - Oggetto studente
Crea un oggetto student con le proprieta' firstName, lastName e age. Aggiungi un metodo getFullName che restituisce il nome completo. Poi usa il destructuring per estrarre firstName e lastName in variabili separate.
*/
const student = {
  firstName: "Marco",
  lastName: "Aprea",
  age: 38,

  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const { firstName, lastName } = student;

console.log(student.getFullName());
console.log(firstName);
console.log(lastName);

/*
Esercizio 4 - Fetch da API
Scrivi una funzione asincrona che usa fetch per scaricare i dati dall'API https://jsonplaceholder.typicode.com/todos/1 e stampa in console il titolo del todo ricevuto. Gestisci eventuali errori con try/catch.
*/
async function getTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    const data = await response.json();

    console.log(data.title);
  } catch (error) {
    console.log("Si è verificato un errore:", error);
  }
}

getTodo();

//Esercizio 5

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
