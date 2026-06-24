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

/*  Esercizio 1 */

function getEvenNumbers(numbers) {
  return numbers.filter((number) => number % 2 === 0);
}

const numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numeriPari = getEvenNumbers(numeri);
console.log(numeriPari);

/*  Esercizio 2 */
const student = {
  firstName: "Mario",
  lastName: "Rossi",
  age: 22,

  getFullName: function () {
    return `${this.firstName} ${this.lastName} ${this.age}`;
  },
};

console.log(student.getFullName());

const { firstName, lastName, age } = student;

console.log(firstName);
console.log(lastName);
console.log(age);

/*  Esercizio 3 */
const boxListSection = document.querySelector(".box-list");

if (boxListSection) {
  const nuovoParagrafo = document.createElement("p");
  nuovoParagrafo.textContent = "Questo è il testo originale del paragrafo.";

  nuovoParagrafo.style.fontSize = "18px";
  nuovoParagrafo.style.marginHeight = "15px";

  const nuovoBottone = document.createElement("button");
  nuovoBottone.textContent = "Cliccami!";
  nuovoBottone.style.padding = "10px 20px";
  nuovoBottone.style.cursor = "pointer";

  boxListSection.appendChild(nuovoParagrafo);
  boxListSection.appendChild(nuovoBottone);

  nuovoBottone.addEventListener("click", () => {
    nuovoParagrafo.textContent = "nuovo testo";
    nuovoParagrafo.style.color = "blue";
  });
}

/*  Esercizio 4 */
async function fetchTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
      throw new Error(`Errore di rete: ${response.status}`);
    }

    const todo = await response.json();

    console.log("Titolo del TODO:", todo.title);
  } catch (error) {
    console.error("Si è verificato un errore durante la fetch:", error.message);
  }
}
fetchTodo();

/* Esercizio 5 */
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
  address: { street, city },
  company: { name: companyName, catchPhrase },
} = user;

console.log(name);
console.log(street + ", " + city);
console.log(companyName + " - " + catchPhrase);
