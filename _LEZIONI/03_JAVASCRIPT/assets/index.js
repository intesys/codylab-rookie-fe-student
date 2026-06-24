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
//console.log("Hello World");

// ESERCIZIO 1

/*console.log("ESERCIZIO 1");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getEvenNumbers(array) {
  let evenNumbers = [];

  for (let i = 0; i < array.length; i++) {
    evenNumbers = array.filter((array) => array % 2 === 0);
  }
  return evenNumbers;
}

console.log(getEvenNumbers(numbers));

console.log("ESERCIZIO 2");

const student = {
  firstName: "Mario",
  lastName: "Rossi",
  age: 25,
};

function getFullName(student) {
  return student.firstName + " " + student.lastName;
}

const { firstName } = student;
const { lastName } = student;

console.log(getFullName(student));
console.log(firstName);
console.log(lastName);

console.log("ESERCIZIO 3");

const button = document.getElementById("button");

button.addEventListener("click", function () {
  const paragraph = document.getElementById("paragraph");
  paragraph.textContent = "Testo modificato";
  paragraph.style.color = "blue";
});

console.log("ESERCIZIO 4");

async function fetchData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const { title } = await response.json();
    console.log(title);
    return title;
  } catch (error) {
    console.log("Errore", error.message);
  }
}

fetchData();

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

console.log(name); // Output: Leanne Graham
console.log(city); // Output: Milano
console.log(companyName); // Output: Tech Solutions
*/

const stringhe = ["Carciofo", "Zenzero", "Wasabi", "Duro", "Mollo", "Sporco"];
const box_list = document.getElementsByClassName("box-list");
for (const parola of stringhe) {
  box_list[0].innerHTML += `<div class="box"><span>${parola}</span></div>`;
}
