/*
Esercizio ***
1) Creare una costante che contiene una lista di strighe
2) Intercettare la div che contiene la lista dei box
3) Creare un ciclo for che cicla la lista di stringhe
4) Per ogni stringa creare un box con il contenuto della stringa appendendolo alla div che contiente la lista dei box*/

//Esercizio ***
const stringhe = ["Pilot", "Aeroplane", "JavaScript", "Train", "Aviation", "Bus", "Netacademy", "Intesys", "96.4"];

const newBox = document.getElementsByClassName("box-list");

for (const i of stringhe) {
  newBox[0].innerHTML += `<div class="box"><span>${i}</span></div>`;
}

console.log("Hello World");

//Esercizio 1
function getEvenNumbers(arrayNumbers) {
  return arrayNumbers.filter(function (number) {
    return number % 2 === 0;
  });
}

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])); // [2, 4, 6, 8]
console.log("          ");

//Esercizio 2
const student = {
  firstName: "Mario",
  lastName: "Rossi",
  age: 20,

  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(student.getFullName()); // "Mario Rossi"

const { firstName, lastName } = student;
console.log(firstName);
console.log(lastName);
console.log("          ");

//Esercizio 3: index.html

//Esercizio 4
async function fetchTodoTitle() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.title);
  } catch (error) {
    console.error("Failed to fetch todo:", error);
  }
}

fetchTodoTitle();
console.log("          ");

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
console.log("          ");
