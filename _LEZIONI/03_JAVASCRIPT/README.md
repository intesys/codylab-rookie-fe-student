# 03 - JavaScript

> JavaScript e' il linguaggio di programmazione del web: rende le pagine interattive, gestisce dati e comunica con i server. In questa lezione imparerai le basi fondamentali per iniziare a costruire applicazioni moderne.

## Indice

- [Obiettivi di apprendimento](#obiettivi-di-apprendimento)
- [Prerequisiti](#prerequisiti)
- [1. Cos'e' JavaScript](#1-cose-javascript)
- [2. Tipi di dato](#2-tipi-di-dato)
- [3. Variabili: let e const](#3-variabili-let-e-const)
- [4. Scope e Hoisting](#4-scope-e-hoisting)
- [5. Gli operatori](#5-gli-operatori)
- [6. Prendere decisioni con if / else](#6-prendere-decisioni-con-if--else)
- [7. Il ciclo for](#7-il-ciclo-for)
- [8. Switch](#8-switch)
- [9. Array](#9-array)
- [10. Oggetti](#10-oggetti)
- [11. JSON](#11-json)
- [12. Destructuring e Spread Operator](#12-destructuring-e-spread-operator)
- [13. Funzioni](#13-funzioni)
- [14. Il DOM](#14-il-dom)
- [15. Eventi](#15-eventi)
- [16. Programmazione asincrona](#16-programmazione-asincrona)
- [17. Gestione degli errori](#17-gestione-degli-errori)
- [Esercizi pratici](#esercizi-pratici)
- [Risorse utili](#risorse-utili)
- [Riepilogo](#riepilogo)
- [BONUS - TypeScript](#bonus---typescript)

## Obiettivi di apprendimento

Al termine di questa lezione sarai in grado di:

- Comprendere cos'e' JavaScript e il suo ruolo nello sviluppo web
- Dichiarare variabili e utilizzare i tipi di dato fondamentali
- Utilizzare operatori aritmetici, di confronto e logici
- Controllare il flusso del programma con condizioni e cicli
- Lavorare con array, oggetti e JSON
- Usare destructuring e spread operator (fondamentali per React)
- Scrivere funzioni in diverse forme (dichiarazione, espressione, arrow)
- Manipolare il DOM per rendere le pagine interattive
- Gestire eventi dell'utente
- Effettuare operazioni asincrone con `fetch`, Promises e `async`/`await`
- Gestire gli errori con `try`/`catch`

## Prerequisiti

- Conoscenza base di HTML e CSS (lezione precedente)
- Un editor di codice (VS Code consigliato)
- Un browser moderno (Chrome, Firefox o Edge)
- La console del browser aperta (tasto F12, tab "Console")

---

## 1. Cos'e' JavaScript

JavaScript e' **il linguaggio di programmazione del web**. Se HTML definisce la struttura di una pagina e CSS ne gestisce l'aspetto, JavaScript aggiunge il comportamento: rende le pagine interattive, reagisce alle azioni dell'utente e puo' comunicare con server remoti per caricare o inviare dati.

Qualche esempio concreto di cosa fa JavaScript ogni giorno:

- Quando clicchi "Mi piace" su un social e il contatore si aggiorna senza ricaricare la pagina
- Quando compili un form e un messaggio ti avvisa che hai dimenticato un campo
- Quando scorri una pagina e nuovi contenuti appaiono automaticamente (infinite scroll)
- Quando un menu si apre e si chiude al click

JavaScript e' nato nel 1995 come linguaggio esclusivo per i browser, ma nel tempo si e' evoluto enormemente. Oggi, grazie a **Node.js**, puo' funzionare anche lato server, permettendo di usare un unico linguaggio sia per il frontend che per il backend. Tutti i framework moderni che userai (React, Vue, Angular) sono basati su JavaScript.

Per provare gli esempi di questa lezione, puoi aprire la **Console del browser**: premi `F12` (o `Ctrl+Shift+I`), vai nel tab "Console" e scrivi direttamente il codice.

## 2. Tipi di dato

In JavaScript ogni valore ha un tipo. Conoscere i tipi di dato e' fondamentale perche' determina cosa puoi fare con quel valore e come si comporta nelle operazioni.

I tipi si dividono in due categorie principali:

- [MDN - Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#data_types)

**Tipi primitivi** - sono valori semplici e immutabili:

| Tipo        | Descrizione                          | Esempio             |
| ----------- | ------------------------------------ | ------------------- |
| `Number`    | Numeri interi e decimali             | `42`, `3.14`        |
| `String`    | Testo, racchiuso tra virgolette      | `"ciao"`, `'hello'` |
| `Boolean`   | Vero o falso                         | `true`, `false`     |
| `Null`      | Assenza intenzionale di valore       | `null`              |
| `Undefined` | Variabile dichiarata ma senza valore | `undefined`         |

**Tipi non primitivi** - sono strutture piu' complesse che possono contenere altri valori:

| Tipo       | Descrizione                                  | Esempio                      |
| ---------- | -------------------------------------------- | ---------------------------- |
| `Object`   | Collezione di coppie chiave-valore           | `{ name: "Alice", age: 25 }` |
| `Array`    | Lista ordinata di valori                     | `[1, 2, 3]`                 |
| `Function` | Blocco di codice riutilizzabile              | `function() {}`             |

Per verificare il tipo di un valore puoi usare l'operatore `typeof`:

```javascript
console.log(typeof 42);          // "number"
console.log(typeof "ciao");      // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (questo e' un bug storico di JS!)
console.log(typeof [1, 2, 3]);   // "object"
```

## 3. Variabili: let e const

Le variabili sono contenitori per memorizzare valori. In JavaScript moderno usiamo due parole chiave: `let` per valori che possono cambiare e `const` per valori che restano costanti.

- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

Con `let` puoi dichiarare una variabile e riassegnarle un nuovo valore in qualsiasi momento:

```javascript
let courseName = "Frontend Development";
let totalProjects = 4;
let isActive = true;

console.log(courseName);    // "Frontend Development"
console.log(totalProjects); // 4

totalProjects = 5;
console.log(totalProjects); // 5
```

Con `const` dichiari una variabile il cui valore non puo' essere riassegnato. Usala sempre quando sai che il valore non cambiera' - e' una buona pratica che rende il codice piu' prevedibile:

```javascript
const maxStudents = 42;

try {
  maxStudents = 99;
} catch (err) {
  console.log(err);
  // TypeError: Assignment to constant variable.
}

console.log(maxStudents); // 42
```

Come regola generale: **usa sempre `const` di default**, e passa a `let` solo quando sai che il valore dovra' cambiare.

## 4. Scope e Hoisting

Lo **scope** (ambito) determina dove una variabile e' visibile e utilizzabile nel codice. Capire lo scope e' essenziale per evitare bug difficili da individuare.

`let` e `const` hanno **block scope**: esistono solo all'interno del blocco `{}` in cui sono dichiarate.

```javascript
let x = 1;

if (x === 1) {
  let x = 2;
  console.log(x); // 2 (questa e' una variabile DIVERSA, locale al blocco if)
}

console.log(x); // 1 (la variabile esterna non e' stata modificata)
```

Esiste anche `var`, che ha **function scope**: la variabile e' visibile in tutta la funzione, ignorando i blocchi `{}`. Questo comportamento causa spesso bug involontari:

```javascript
if (true) {
  var message = "ciao";
}
console.log(message); // "ciao" - var "esce" dal blocco if!

if (true) {
  let greeting = "hello";
}
// console.log(greeting); // ReferenceError - let resta nel suo blocco
```

L'**hoisting** e' un meccanismo per cui le dichiarazioni con `var` vengono "spostate" in cima al loro scope prima dell'esecuzione. Questo puo' portare a risultati inaspettati:

```javascript
console.log(nome); // undefined (non da errore, ma non ha ancora un valore)
var nome = "Alice";

// console.log(cognome); // ReferenceError - let non viene "sollevata"
let cognome = "Rossi";
```

Per tutti questi motivi, **evita sempre `var`**. Usa `const` e `let`: il codice sara' piu' chiaro e prevedibile.

## 5. Gli operatori

Gli operatori permettono di eseguire operazioni sui valori: calcoli matematici, confronti e operazioni logiche.

- [MDN - Operatori](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)

### Operatori aritmetici

Eseguono le classiche operazioni matematiche. Il modulo (`%`) restituisce il resto della divisione ed e' utile per verificare se un numero e' pari o dispari.

```javascript
let x = 5;
let y = 2;

console.log(x + y);  // 7  (addizione)
console.log(x - y);  // 3  (sottrazione)
console.log(x * y);  // 10 (moltiplicazione)
console.log(x / y);  // 2.5 (divisione)
console.log(x % y);  // 1  (modulo - resto della divisione)
console.log(x ** y); // 25 (esponenziale - 5 alla seconda)
```

### Operatori di assegnamento

Combinano un'operazione aritmetica con l'assegnamento, rendendo il codice piu' conciso:

```javascript
let score = 10;

score += 5;  // equivale a: score = score + 5 -> 15
score -= 3;  // equivale a: score = score - 3 -> 12
score *= 2;  // equivale a: score = score * 2 -> 24
score /= 4;  // equivale a: score = score / 4 -> 6
score %= 4;  // equivale a: score = score % 4 -> 2
```

### Incremento e decremento

Aumentano o diminuiscono un valore di 1. La posizione dell'operatore (`++x` vs `x++`) cambia quando avviene l'incremento:

```javascript
let counter = 5;

console.log(counter++); // 5 (restituisce il valore, POI incrementa)
console.log(counter);   // 6

console.log(++counter); // 7 (incrementa PRIMA, poi restituisce il valore)

console.log(counter--); // 7 (restituisce il valore, POI decrementa)
console.log(counter);   // 6
```

### Operatori di confronto

Confrontano due valori e restituiscono un booleano (`true` o `false`). Attenzione alla differenza tra `==` e `===`:

- `==` (uguaglianza debole) confronta i valori **convertendo automaticamente** il tipo. Questo puo' dare risultati sorprendenti.
- `===` (uguaglianza stretta) confronta valori **e** tipo, senza conversioni. E' quasi sempre la scelta giusta.

```javascript
// Differenza tra == e ===
console.log(5 == "5");   // true  - converte la stringa "5" in numero 5, poi confronta
console.log(5 === "5");  // false - tipi diversi (number vs string), nessuna conversione

console.log(0 == false); // true  - false viene convertito in 0
console.log(0 === false); // false - tipi diversi (number vs boolean)

// Usa SEMPRE === per evitare bug
let x = 5;
let y = 2;

console.log(x === y);  // false
console.log(x !== y);  // true (diverso, confronto stretto)
console.log(x > y);    // true
console.log(x < y);    // false
console.log(x >= y);   // true
console.log(x <= y);   // false
```

### Operatori logici

Combinano piu' condizioni booleane. Sono fondamentali per costruire condizioni complesse:

```javascript
let age = 20;
let hasTicket = true;

// AND (&&) - vero solo se ENTRAMBE le condizioni sono vere
console.log(age >= 18 && hasTicket); // true

// OR (||) - vero se ALMENO UNA condizione e' vera
console.log(age >= 21 || hasTicket); // true

// NOT (!) - inverte il valore booleano
console.log(!hasTicket); // false
```

### Operatori su stringhe

Le stringhe possono essere concatenate con `+` oppure, meglio, con i **template literals** (backtick `` ` ``), che permettono di inserire espressioni direttamente nel testo:

```javascript
let firstName = "Mario";
let lastName = "Rossi";

// Concatenazione classica
console.log(firstName + " " + lastName); // "Mario Rossi"

// Template literals (modo moderno e consigliato)
console.log(`${firstName} ${lastName}`); // "Mario Rossi"

// Proprieta' utili
console.log(firstName.length); // 5
console.log(firstName[0]);    // "M"
console.log(firstName[1]);    // "a"
```

## 6. Prendere decisioni con if / else

Le strutture condizionali permettono al programma di prendere decisioni diverse in base a una condizione. Sono il meccanismo fondamentale per controllare il flusso di esecuzione.

- [MDN - if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

La forma base confronta una condizione: se e' vera esegue un blocco, altrimenti ne esegue un altro:

```javascript
let temperature = 30;

if (temperature > 25) {
  console.log("Fa caldo, prendi dell'acqua!");
} else {
  console.log("La temperatura e' nella norma.");
}
```

Quando hai piu' di due possibilita', puoi concatenare le condizioni con `else if`:

```javascript
let grade = 75;

if (grade >= 90) {
  console.log("Ottimo!");
} else if (grade >= 70) {
  console.log("Buono, continua cosi'!");
} else if (grade >= 60) {
  console.log("Sufficiente, puoi migliorare.");
} else {
  console.log("Insufficiente, devi studiare di piu'.");
}
// "Buono, continua cosi'!"
```

Per condizioni semplici puoi usare l'**operatore ternario**, una forma compatta che troverai spesso in React:

```javascript
let age = 20;

let canVote = age >= 18 ? "Si'" : "No";
console.log(canVote); // "Si'"
```

## 7. Il ciclo for

Il ciclo `for` ripete un blocco di codice un numero definito di volte. E' perfetto quando sai in anticipo quante iterazioni servono.

- [MDN - for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)

La sintassi prevede tre parti: inizializzazione, condizione di continuazione e aggiornamento:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

Un uso molto comune e' scorrere gli elementi di un array:

```javascript
const colors = ["rosso", "verde", "blu"];

for (let i = 0; i < colors.length; i++) {
  console.log(`Colore ${i}: ${colors[i]}`);
}
// "Colore 0: rosso"
// "Colore 1: verde"
// "Colore 2: blu"
```

Esiste anche il `for...of`, piu' leggibile quando non ti serve l'indice:

```javascript
const fruits = ["mela", "banana", "arancia"];

for (const fruit of fruits) {
  console.log(fruit);
}
// "mela", "banana", "arancia"
```

## 8. Switch

Lo `switch` e' un'alternativa a lunghe catene di `if...else if` quando devi confrontare un valore con molte opzioni fisse. Ogni `case` viene confrontato con il valore e il `break` e' fondamentale per uscire dallo switch dopo la corrispondenza:

- [MDN - switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

```javascript
let role = "admin";

switch (role) {
  case "admin":
    console.log("Accesso completo");
    break;
  case "editor":
    console.log("Accesso in scrittura");
    break;
  case "viewer":
    console.log("Accesso in sola lettura");
    break;
  default:
    console.log("Ruolo non riconosciuto");
    break;
}
// "Accesso completo"
```

## 9. Array

Un array e' una lista ordinata di valori. E' una delle strutture dati piu' usate in JavaScript e la userai continuamente in React per gestire liste di elementi.

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Per creare un array si usano le parentesi quadre. Ogni elemento ha un **indice** (posizione) che parte da 0:

```javascript
const technologies = ["HTML", "CSS", "JavaScript", "React"];

console.log(technologies[0]);     // "HTML" (primo elemento)
console.log(technologies[2]);     // "JavaScript" (terzo elemento)
console.log(technologies.length); // 4 (quanti elementi ci sono)
console.log(technologies[technologies.length - 1]); // "React" (ultimo elemento)
```

### Metodi per modificare un array

JavaScript offre diversi metodi per aggiungere e rimuovere elementi. Questi metodi **modificano** l'array originale:

```javascript
const stack = ["HTML", "CSS"];

stack.push("JavaScript");
console.log(stack); // ["HTML", "CSS", "JavaScript"] - aggiunge alla fine

stack.pop();
console.log(stack); // ["HTML", "CSS"] - rimuove l'ultimo

stack.unshift("Markdown");
console.log(stack); // ["Markdown", "HTML", "CSS"] - aggiunge all'inizio

stack.shift();
console.log(stack); // ["HTML", "CSS"] - rimuove il primo

stack.splice(1, 0, "SCSS");
console.log(stack); // ["HTML", "SCSS", "CSS"] - inserisce "SCSS" alla posizione 1

stack.splice(1, 1);
console.log(stack); // ["HTML", "CSS"] - rimuove 1 elemento dalla posizione 1
```

### Metodi per iterare e trasformare

Questi metodi sono fondamentali e li userai moltissimo in React. La differenza chiave tra `map` e `forEach`:

- `map` **restituisce un nuovo array** con i risultati della trasformazione
- `forEach` esegue un'azione per ogni elemento ma **restituisce `undefined`** (non crea un nuovo array)

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - trasforma ogni elemento e restituisce un NUOVO array
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// forEach - esegue un'azione per ogni elemento, NON restituisce nulla
numbers.forEach((n, index) => {
  console.log(`Posizione ${index}: ${n}`);
});

// filter - restituisce un NUOVO array con solo gli elementi che soddisfano la condizione
const evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers); // [2, 4]

// find - restituisce il PRIMO elemento che soddisfa la condizione
const firstBigNumber = numbers.find((n) => n > 3);
console.log(firstBigNumber); // 4
```

## 10. Oggetti

Gli oggetti sono contenitori per valori organizzati in coppie **chiave-valore**. Rappresentano entita' del mondo reale con proprieta' e comportamenti. Se un array e' una lista ordinata, un oggetto e' una "scheda" con campi nominati.

- [MDN - Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Per creare un oggetto si usano le parentesi graffe. Le proprieta' possono contenere qualsiasi tipo di dato, inclusi altri oggetti, array e funzioni:

```javascript
const person = {
  firstName: "Alice",
  lastName: "Bianchi",
  age: 30,
  hobbies: ["lettura", "coding", "musica"],
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

Per accedere alle proprieta' si usa la notazione con il punto oppure le parentesi quadre:

```javascript
console.log(person.firstName);      // "Alice"
console.log(person.age);            // 30
console.log(person.hobbies);        // ["lettura", "coding", "musica"]
console.log(person.fullName());     // "Alice Bianchi"
console.log(person["firstName"]);   // "Alice" (notazione alternativa)
```

Per modificare o aggiungere proprieta' basta assegnarle direttamente:

```javascript
person.age = 31;
person.email = "alice@example.com";

console.log(person.age);   // 31
console.log(person.email); // "alice@example.com"
```

## 11. JSON

**JSON** (JavaScript Object Notation) e' un formato testuale per lo scambio di dati. E' diventato lo standard de facto per comunicare tra frontend e backend (API). La sua sintassi e' molto simile a quella degli oggetti JavaScript, ma con alcune differenze: le chiavi devono essere stringhe tra virgolette doppie e non sono ammesse funzioni.

JavaScript offre due metodi per convertire tra oggetti e JSON:

```javascript
const student = {
  firstName: "Marco",
  lastName: "Verdi",
  age: 22,
};

// Da oggetto JavaScript a stringa JSON
const jsonString = JSON.stringify(student);
console.log(jsonString);
// '{"firstName":"Marco","lastName":"Verdi","age":22}'

// Da stringa JSON a oggetto JavaScript
const parsed = JSON.parse(jsonString);
console.log(parsed.firstName); // "Marco"
```

Userai `JSON.parse()` ogni volta che riceverai dati da un server, e `JSON.stringify()` quando vorrai inviarli.

## 12. Destructuring e Spread Operator

Il **destructuring** e lo **spread operator** sono funzionalita' moderne di JavaScript che rendono il codice piu' conciso e leggibile. Sono fondamentali per lavorare con React, dove li userai in quasi ogni componente.

### Destructuring di oggetti

Il destructuring permette di estrarre proprieta' da un oggetto e assegnarle a variabili con lo stesso nome, tutto in una riga:

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "Milano",
};

// Senza destructuring
const name = person.name;
const age = person.age;

// Con destructuring (molto piu' conciso)
const { name, age, city } = person;

console.log(name); // "Alice"
console.log(age);  // 30
console.log(city); // "Milano"
```

### Destructuring di array

Funziona in modo simile, ma basandosi sulla posizione anziche' sul nome:

```javascript
const colors = ["rosso", "verde", "blu"];

const [first, second, third] = colors;

console.log(first);  // "rosso"
console.log(second); // "verde"
console.log(third);  // "blu"

// Puoi anche saltare elementi
const [primary, , tertiary] = colors;
console.log(primary);  // "rosso"
console.log(tertiary); // "blu"
```

### Spread Operator

Lo spread operator (`...`) "espande" un array o un oggetto. E' essenziale per creare copie e combinare dati **senza modificare gli originali** (immutabilita'):

```javascript
// Spread con array
const fruits = ["mela", "banana"];
const moreFruits = [...fruits, "arancia", "kiwi"];
console.log(moreFruits); // ["mela", "banana", "arancia", "kiwi"]
console.log(fruits);     // ["mela", "banana"] (l'originale non cambia!)

// Spread con oggetti
const person = { name: "Alice", age: 30 };
const updatedPerson = { ...person, age: 31, city: "Milano" };
console.log(updatedPerson); // { name: "Alice", age: 31, city: "Milano" }
console.log(person);        // { name: "Alice", age: 30 } (l'originale non cambia!)
```

Questo pattern di "copia e modifica" e' alla base della gestione dello stato in React.

## 13. Funzioni

Le funzioni sono blocchi di codice riutilizzabili che eseguono un compito specifico. Permettono di organizzare il codice, evitare ripetizioni e rendere il programma piu' leggibile.

- [MDN - Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

### Dichiarazione di funzione

La forma classica usa la parola chiave `function`. Queste funzioni vengono "sollevate" (hoisting), quindi possono essere chiamate anche prima della loro dichiarazione nel codice:

```javascript
function sum(a, b) {
  return a + b;
}

console.log(sum(3, 7)); // 10
```

### Espressione di funzione

Qui la funzione viene assegnata a una variabile. A differenza della dichiarazione, non viene sollevata:

```javascript
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```

### Arrow function

Introdotte con ES6, le arrow function offrono una sintassi piu' concisa. Sono la forma che userai di piu' in React:

```javascript
const divide = (a, b) => {
  return a / b;
};

console.log(divide(10, 2)); // 5

// Se il corpo e' una sola espressione, puoi omettere le graffe e il return
const square = (n) => n * n;
console.log(square(4)); // 16
```

### Parametri di default

Puoi assegnare valori predefiniti ai parametri, che verranno usati se non viene passato un argomento:

```javascript
const greet = (name = "studente") => {
  return `Ciao, ${name}!`;
};

console.log(greet("Alice")); // "Ciao, Alice!"
console.log(greet());        // "Ciao, studente!"
```

## 14. Il DOM

Il **DOM** (Document Object Model) e' la rappresentazione ad albero della pagina HTML creata dal browser. JavaScript puo' interagire con il DOM per leggere, modificare, aggiungere o rimuovere elementi dalla pagina, rendendo l'interfaccia dinamica.

Immagina la pagina come un albero: il tag `<html>` e' la radice, `<head>` e `<body>` sono i rami principali, e ogni tag al loro interno e' un nodo.

### Selezionare elementi

Per manipolare un elemento della pagina, devi prima selezionarlo. JavaScript offre diversi metodi:

```javascript
// Seleziona un elemento per il suo attributo id
const title = document.getElementById("main-title");

// Seleziona il PRIMO elemento che corrisponde a un selettore CSS
const firstButton = document.querySelector(".btn");

// Seleziona TUTTI gli elementi che corrispondono a un selettore CSS
const allButtons = document.querySelectorAll(".btn");
```

### Modificare il contenuto

Una volta selezionato un elemento puoi cambiarne il testo o l'HTML interno:

```javascript
const title = document.getElementById("main-title");

// Modifica solo il testo (piu' sicuro)
title.textContent = "Benvenuto nel corso!";

// Modifica l'HTML interno (attenzione: puo' essere vulnerabile a XSS)
title.innerHTML = "Benvenuto nel <strong>corso</strong>!";
```

### Modificare lo stile

Puoi cambiare l'aspetto degli elementi accedendo alla proprieta' `style`:

```javascript
const title = document.getElementById("main-title");

title.style.color = "blue";
title.style.fontSize = "24px";
title.style.backgroundColor = "#f0f0f0";
```

Per aggiungere o rimuovere classi CSS (approccio preferito rispetto allo stile inline):

```javascript
const card = document.querySelector(".card");

card.classList.add("active");
card.classList.remove("hidden");
card.classList.toggle("selected");
```

### Creare e rimuovere elementi

Puoi creare nuovi elementi e inserirli nella pagina, oppure rimuovere quelli esistenti:

```javascript
// Creare un nuovo elemento
const newParagraph = document.createElement("p");
newParagraph.textContent = "Questo paragrafo e' stato creato con JavaScript!";

// Aggiungerlo alla pagina (come ultimo figlio di un contenitore)
const container = document.getElementById("content");
container.appendChild(newParagraph);

// Rimuovere un elemento
const oldElement = document.getElementById("obsolete");
oldElement.remove();
```

## 15. Eventi

Gli **eventi** sono azioni che accadono sulla pagina: un click, la pressione di un tasto, l'invio di un form, il movimento del mouse. La programmazione basata sugli eventi e' il cuore dell'interattivita' web: il tuo codice "ascolta" e "reagisce" a queste azioni.

### addEventListener

Per reagire a un evento si usa `addEventListener`. Questo metodo collega un elemento a una funzione (chiamata **handler** o **callback**) che viene eseguita quando l'evento si verifica:

```javascript
const button = document.getElementById("my-button");

button.addEventListener("click", function () {
  console.log("Bottone cliccato!");
});
```

### Eventi comuni

Ecco gli eventi che userai piu' spesso:

| Evento     | Si verifica quando...                    |
| ---------- | ---------------------------------------- |
| `click`    | L'utente clicca su un elemento           |
| `input`    | Il valore di un campo di testo cambia    |
| `submit`   | Un form viene inviato                    |
| `keydown`  | Un tasto della tastiera viene premuto    |
| `mouseover`| Il mouse passa sopra un elemento         |

### L'oggetto Event

Ogni handler riceve automaticamente un oggetto `event` con informazioni sull'evento accaduto:

```javascript
const input = document.getElementById("search");

input.addEventListener("input", function (event) {
  console.log("Stai scrivendo:", event.target.value);
});

const form = document.getElementById("my-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form inviato senza ricaricare la pagina!");
});
```

### Esempio pratico: bottone che cambia testo

Ecco un esempio completo che combina selezione di elementi, eventi e modifica del DOM:

```html
<button id="change-btn">Cliccami!</button>
<p id="message">Testo originale</p>
```

```javascript
const button = document.getElementById("change-btn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "Il testo e' stato cambiato con JavaScript!";
  message.style.color = "green";
});
```

## 16. Programmazione asincrona

Alcune operazioni richiedono tempo: scaricare dati da un server, leggere un file, attendere un timer. JavaScript e' **single-threaded** (esegue una cosa alla volta), ma grazie alla programmazione asincrona puo' avviare queste operazioni senza bloccare il resto del programma.

### Callbacks

Una callback e' semplicemente una funzione passata come argomento a un'altra funzione, che verra' chiamata "dopo" che un'operazione e' completata:

```javascript
setTimeout(function () {
  console.log("Questo messaggio appare dopo 2 secondi");
}, 2000);

console.log("Questo messaggio appare subito");
// Output:
// "Questo messaggio appare subito"
// (dopo 2 secondi) "Questo messaggio appare dopo 2 secondi"
```

### Promises

Le **Promises** (promesse) sono un modo piu' strutturato per gestire le operazioni asincrone. Una Promise rappresenta un valore che potrebbe essere disponibile ora, in futuro, o mai:

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operazione completata!");
  } else {
    reject("Qualcosa e' andato storto");
  }
});

myPromise
  .then((result) => console.log(result))   // "Operazione completata!"
  .catch((error) => console.log(error));
```

### async / await

La sintassi `async`/`await` e' il modo moderno e piu' leggibile per lavorare con le Promises. Una funzione `async` restituisce sempre una Promise, e `await` "aspetta" che una Promise si risolva:

```javascript
async function fetchMessage() {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve("Dati pronti!"), 1000);
  });

  console.log(response); // "Dati pronti!" (dopo 1 secondo)
}

fetchMessage();
```

### fetch - esempio pratico

`fetch` e' la funzione nativa per fare richieste HTTP. E' il modo principale per comunicare con le API e scaricare dati. Restituisce una Promise:

```javascript
async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();

  console.log(users);
  users.forEach((user) => {
    console.log(`${user.name} - ${user.email}`);
  });
}

getUsers();
```

Questo pattern (fetch -> json -> elabora i dati) e' quello che userai praticamente in ogni applicazione React per caricare dati dal server.

## 17. Gestione degli errori

Gli errori possono accadere in qualsiasi momento: un server non risponde, un dato non e' nel formato atteso, una variabile e' `undefined`. Il costrutto `try`/`catch`/`finally` permette di intercettare gli errori e gestirli in modo controllato, evitando che il programma si blocchi.

```javascript
try {
  const data = JSON.parse("questo non e' JSON valido");
} catch (error) {
  console.log("Errore catturato:", error.message);
  // "Errore catturato: Unexpected token q in JSON at position 0"
} finally {
  console.log("Questo blocco viene eseguito SEMPRE, con o senza errore");
}
```

La combinazione `try`/`catch` e' particolarmente utile con le operazioni asincrone, dove gli errori sono frequenti (il server non risponde, la rete e' assente):

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Dati ricevuti:", data);
    return data;
  } catch (error) {
    console.log("Impossibile caricare i dati:", error.message);
  } finally {
    console.log("Richiesta terminata");
  }
}

fetchData("https://jsonplaceholder.typicode.com/posts/1");
```

## Esercizi pratici

### Esercizio 1 - Filtrare un array

Crea una funzione `getEvenNumbers` che riceve un array di numeri e restituisce un nuovo array contenente solo i numeri pari. Usa il metodo `filter`.

```javascript
// Risultato atteso:
getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]); // [2, 4, 6, 8]
```

### Esercizio 2 - Oggetto studente

Crea un oggetto `student` con le proprieta' `firstName`, `lastName` e `age`. Aggiungi un metodo `getFullName` che restituisce il nome completo. Poi usa il destructuring per estrarre `firstName` e `lastName` in variabili separate.

### Esercizio 3 - Manipolazione del DOM

Crea una pagina HTML con un bottone e un paragrafo. Quando l'utente clicca il bottone, il testo del paragrafo deve cambiare e il colore deve diventare blu.

### Esercizio 4 - Fetch da API

Scrivi una funzione asincrona che usa `fetch` per scaricare i dati dall'API `https://jsonplaceholder.typicode.com/todos/1` e stampa in console il titolo del todo ricevuto. Gestisci eventuali errori con `try`/`catch`.

### Esercizio 5 - Destructuring avanzato

Dato il seguente oggetto, usa il destructuring per estrarre il nome dell'utente, la citta' e il nome dell'azienda in variabili separate:

```javascript
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
```

## Risorse utili

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) - La guida ufficiale e completa
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Riferimento dettagliato di ogni funzionalita'
- [JavaScript.info](https://javascript.info/) - Tutorial moderno e ben strutturato
- [Eloquent JavaScript](https://eloquentjavascript.net/) - Libro gratuito online
- [DevDocs](https://devdocs.io/javascript/) - Documentazione rapida e consultabile

## Riepilogo

In questa lezione abbiamo coperto le basi fondamentali di JavaScript:

- **Tipi di dato**: primitivi (Number, String, Boolean, Null, Undefined) e non primitivi (Object, Array, Function)
- **Variabili**: `const` per valori immutabili, `let` per valori che cambiano, mai `var`
- **Scope**: block scope con `let`/`const`, function scope con `var`
- **Operatori**: aritmetici, di assegnamento, confronto (usa sempre `===`), logici
- **Strutture di controllo**: `if`/`else`, operatore ternario, `switch`
- **Cicli**: `for`, `for...of`
- **Array e metodi**: `push`, `pop`, `map` (restituisce nuovo array), `filter`, `forEach`
- **Oggetti e JSON**: coppie chiave-valore, `JSON.stringify()`, `JSON.parse()`
- **Destructuring e Spread**: estrarre valori e creare copie immutabili
- **Funzioni**: dichiarazione, espressione, arrow function
- **DOM**: selezionare, modificare, creare e rimuovere elementi
- **Eventi**: `addEventListener`, gestire interazioni dell'utente
- **Async**: Promises, `async`/`await`, `fetch` per chiamate API
- **Errori**: `try`/`catch`/`finally` per gestire problemi in modo controllato

Questi concetti sono le fondamenta su cui costruiremo le prossime lezioni con React e TypeScript.

---

# BONUS - TypeScript

> TypeScript estende JavaScript aggiungendo la tipizzazione statica: ti aiuta a trovare errori prima ancora di eseguire il codice.

## Indice del bonus

- [1. Introduzione a TypeScript](#1-introduzione-a-typescript)
- [2. Installazione e compilazione](#2-installazione-e-compilazione)
- [3. Variabili tipizzate](#3-variabili-tipizzate)
- [4. Funzioni tipizzate](#4-funzioni-tipizzate)
- [5. Types e Interfaces](#5-types-e-interfaces)
- [6. Risorse utili (TypeScript)](#6-risorse-utili-typescript)

## 1. Introduzione a TypeScript

TypeScript e' un linguaggio di programmazione open source sviluppato da Microsoft. E' un super-set di JavaScript, ovvero un linguaggio che estende JavaScript aggiungendo tipizzazione statica e altre funzionalita' avanzate. Questo permette di trovare errori durante la fase di sviluppo, prima dell'esecuzione del codice.

Principali vantaggi di TypeScript:

- Rilevamento degli errori in fase di compilazione
- Migliore supporto IDE (completamento automatico, suggerimenti)
- Codice piu' manutenibile e documentato
- Refactoring piu' sicuro

## 2. Installazione e compilazione

Per utilizzare TypeScript devi installarlo globalmente con npm e poi compilare i file `.ts` in `.js` con il comando `tsc`:

```bash
# Installazione
npm install -g typescript

# Compilazione
tsc nome_file.ts
```

## 3. Variabili tipizzate

In TypeScript puoi specificare il tipo di ogni variabile. Se provi ad assegnare un valore del tipo sbagliato, il compilatore ti avvisa immediatamente:

```typescript
let x: number = 5;
let y: number = 2;

console.log(x + y);
// Expected output: 7

// esempio di errore
console.log(x + " " + y);
// Expected output: error TS2362: The left-hand side of an arithmetic
// operation must be of type 'any', 'number', 'bigint' or an enum type.
```

Ecco altri esempi di variabili con tipo esplicito:

```typescript
let school: string = "CodyLab";
let courseName: string = "Frontend Development";
let projects: number = 4;
let awesome: boolean = true;
let technologies: string[] = ["HTML", "CSS", "JavaScript"];
```

## 4. Funzioni tipizzate

Le funzioni in TypeScript specificano il tipo dei parametri e del valore di ritorno. Questo previene errori come passare una stringa dove serve un numero:

```typescript
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(1, 2));
// Expected output: 3

// esempio di errore
console.log(sum("1", "2"));
// Expected output: error TS2345: Argument of type '"1"' is not
// assignable to parameter of type 'number'.
```

## 5. Types e Interfaces

In TypeScript, i types e le interfaces sono strumenti per definire la forma degli oggetti. La differenza principale e' che un'interfaccia puo' essere estesa dopo la sua definizione, mentre un type e' immutabile una volta definito.

### 5.1 Definizione base

```typescript
// Definizione di un Type
type Course = {
  name: string;
  duration: number;
  isActive?: boolean;
};

// Definizione di un'Interface
interface Student {
  name: string;
  age: number;
  courses?: string[];
}

// Utilizzo
let webDevelopment: Course = {
  name: "Web Development",
  duration: 12,
  isActive: true,
};

let student: Student = {
  name: "Alice",
  age: 25,
  courses: ["HTML", "CSS", "JavaScript"],
};
```

### 5.2 Estensione

Le interfacce si estendono con `extends`, i type si combinano con l'operatore di intersezione `&`:

```typescript
// Estensione di Interface
interface BasicCourse {
  name: string;
  duration: number;
}

interface AdvancedCourse extends BasicCourse {
  advanced: boolean;
  topics: string[];
}

// Estensione di Type
type BasicCourseType = {
  name: string;
  duration: number;
};

type AdvancedCourseType = BasicCourseType & {
  advanced: boolean;
  topics: string[];
};
```

### 5.3 Utility Types

TypeScript fornisce diversi utility types per trasformare i tipi esistenti senza doverli riscrivere:

```typescript
interface FullCourse {
  name: string;
  duration: number;
  advanced: boolean;
  price: number;
}

// Omit - rimuove proprieta' specifiche
interface ShortCourse extends Omit<FullCourse, "price"> {}

// Pick - seleziona solo alcune proprieta'
interface CoursePreview extends Pick<FullCourse, "name" | "duration"> {}

// Partial - rende tutte le proprieta' opzionali
interface CourseUpdate extends Partial<FullCourse> {}
```

## 6. Risorse utili (TypeScript)

- [TypeScript - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Per testare il codice TypeScript online
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Documentazione completa
