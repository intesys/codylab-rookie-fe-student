# 04 - React

> Introduzione a React: la libreria JavaScript per costruire interfacce utente moderne. Impareremo i concetti fondamentali, dai componenti allo stato, fino alla gestione dei dati con le API.

## Indice

- [Obiettivi di apprendimento](#obiettivi-di-apprendimento)
- [Prerequisiti](#prerequisiti)
- [1. Cos'e React e perche usarlo](#1-cose-react-e-perché-usarlo)
- [2. Cos'e Vite](#2-cose-vite)
- [3. JSX](#3-jsx)
- [4. Componenti](#4-componenti)
- [5. Gestione degli eventi in React](#5-gestione-degli-eventi-in-react)
- [6. State e Hooks](#6-state-e-hooks)
- [7. useEffect](#7-useeffect)
- [8. Rendering condizionale e liste](#8-rendering-condizionale-e-liste)
- [9. Thinking in React](#9-thinking-in-react)
- [10. Gestione dei dati in React](#10-gestione-dei-dati-in-react)
- [Esercizi pratici](#esercizi-pratici)
- [Risorse utili](#risorse-utili)
- [Riepilogo](#riepilogo)

## Obiettivi di apprendimento

Al termine di questa lezione sarai in grado di:

- Spiegare cos'e React e perche si utilizza nello sviluppo web moderno
- Creare un progetto React con Vite
- Scrivere codice JSX e comprendere le differenze con l'HTML
- Creare componenti funzionali e passare dati tramite props
- Gestire lo stato di un componente con `useState`
- Eseguire operazioni asincrone con `useEffect`
- Gestire eventi come click, submit e cambiamenti nei form
- Renderizzare elementi in modo condizionale e lavorare con le liste
- Effettuare chiamate API con Axios e gestire i dati ottenuti
- Configurare il routing dell'applicazione con React Router

## Prerequisiti

- HTML e CSS (struttura delle pagine, selettori, layout)
- JavaScript: manipolazione del DOM, eventi, `async`/`await`, destructuring, spread operator
- Basi di TypeScript: tipi, interfacce, generics
- Node.js e npm installati sul proprio computer
- Un editor di codice (VS Code consigliato)

## 1. Cos'e React e perche usarlo

React e una **libreria** JavaScript (non un framework) creata da Meta (ex Facebook) per costruire interfacce utente. Ma perche ne abbiamo bisogno se conosciamo gia JavaScript e la manipolazione del DOM?

Proviamo a pensare a un'applicazione come Instagram: ci sono post, commenti, like, storie, notifiche... Ogni volta che l'utente interagisce con la pagina, il DOM deve aggiornarsi. Con il JavaScript puro, gestire tutti questi aggiornamenti diventa rapidamente complicato e soggetto a errori. Il codice diventa difficile da mantenere, pieno di `document.querySelector` e di logica sparsa ovunque.

React risolve questo problema introducendo due concetti fondamentali:

**Componenti**: invece di scrivere una pagina intera, la dividiamo in pezzi riutilizzabili. Un bottone, una card, un form di login: ognuno e un componente indipendente con la propria logica e il proprio aspetto. Possiamo riutilizzarli ovunque nell'applicazione, proprio come dei mattoncini.

**Virtual DOM**: React mantiene una copia leggera del DOM in memoria. Quando qualcosa cambia, React confronta la versione precedente con quella nuova e aggiorna solo le parti che sono effettivamente cambiate, invece di ridisegnare l'intera pagina. Questo rende l'applicazione piu veloce e performante.

In sintesi, React ci permette di scrivere applicazioni complesse in modo organizzato, suddividendo l'interfaccia in componenti piccoli e gestibili, ognuno responsabile di una sola parte della pagina.

## 2. Cos'e Vite

Per sviluppare con React abbiamo bisogno di uno strumento che trasformi il nostro codice (JSX, TypeScript, moduli) in qualcosa che il browser possa eseguire. Questo strumento si chiama **build tool**.

**Vite** e il build tool che utilizzeremo in questo corso. E estremamente veloce perche sfrutta i moduli ES nativi del browser durante lo sviluppo: invece di ricompilare tutto il progetto a ogni modifica, Vite serve direttamente i singoli file al browser e aggiorna solo quelli che sono cambiati.

In passato si utilizzava **Create React App** (CRA) per creare progetti React, ma e ormai deprecato e non piu mantenuto. Vite e diventato lo standard de facto per i nuovi progetti React grazie alla sua velocita e semplicita.

Per creare un nuovo progetto React con TypeScript:

```bash
npm create vite@latest nome-progetto -- --template react-ts
cd nome-progetto
npm install
npm run dev
```

Il comando `npm run dev` avvia un server di sviluppo locale. L'applicazione sara raggiungibile all'indirizzo [http://localhost:5173/](http://localhost:5173/).

## 3. JSX

JSX (JavaScript XML) e la sintassi che React utilizza per descrivere l'interfaccia utente. A prima vista sembra HTML, ma in realta e **JavaScript** che viene trasformato in chiamate di funzione durante la compilazione.

Ecco un esempio di componente che utilizza JSX:

```typescript
const Greeting: React.FC = () => {
  const name = "Mario";

  return (
    <div>
      <h1>Ciao, {name}!</h1>
      <p>Benvenuto nella nostra applicazione.</p>
    </div>
  );
};
```

### Differenze tra JSX e HTML

JSX assomiglia all'HTML ma ha alcune differenze importanti:

| HTML              | JSX                |
| ----------------- | ------------------ |
| `class`           | `className`        |
| `for`             | `htmlFor`          |
| `<br>`            | `<br />`           |
| `<img ...>`       | `<img ... />`      |
| `style="color:red"` | `style={{ color: "red" }}` |

In JSX, `class` e una parola riservata di JavaScript, quindi si usa `className`. Lo stesso vale per `for` (usato nei cicli), che diventa `htmlFor`. Inoltre, tutti i tag devono essere chiusi esplicitamente, anche quelli che in HTML sono auto-chiudenti.

### Espressioni JavaScript in JSX

Possiamo inserire qualsiasi espressione JavaScript all'interno di JSX usando le parentesi graffe `{}`:

```typescript
const UserInfo: React.FC = () => {
  const name = "Luigi";
  const age = 17;
  const isAdult = age >= 18;

  return (
    <div>
      <p>Nome: {name}</p>
      <p>Eta: {age}</p>
      <p>Maggiorenne: {isAdult ? "Si" : "No"}</p>
      <p>Anno di nascita: {2026 - age}</p>
    </div>
  );
};
```

### Un solo elemento radice

JSX deve restituire sempre un **singolo elemento radice**. Se abbiamo piu elementi allo stesso livello, possiamo avvolgerli in un `<div>` oppure usare un **Fragment** (`<>...</>`), che non aggiunge nessun elemento al DOM:

```typescript
// Errore: piu elementi radice
const Wrong: React.FC = () => {
  return (
    <h1>Titolo</h1>
    <p>Paragrafo</p>
  );
};

// Corretto: Fragment
const Correct: React.FC = () => {
  return (
    <>
      <h1>Titolo</h1>
      <p>Paragrafo</p>
    </>
  );
};
```

## 4. Componenti

Un componente in React e semplicemente una **funzione che restituisce JSX**. Ogni componente rappresenta una parte dell'interfaccia utente ed e indipendente dagli altri.

```typescript
const Header: React.FC = () => {
  return (
    <header>
      <h1>La mia applicazione</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">Chi siamo</a>
      </nav>
    </header>
  );
};
```

I nomi dei componenti seguono la convenzione **PascalCase** (prima lettera maiuscola). Questo e fondamentale perche React distingue i componenti personalizzati dagli elementi HTML standard proprio grazie alla maiuscola iniziale.

### Props

Le **props** (abbreviazione di "properties") sono il meccanismo con cui un componente padre passa dati a un componente figlio. Funzionano esattamente come i parametri di una funzione.

```typescript
interface CardProps {
  title: string;
  content: string;
  highlighted?: boolean;
}

const Card: React.FC<CardProps> = ({ title, content, highlighted = false }) => {
  return (
    <div className={highlighted ? "card highlighted" : "card"}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};
```

Per usare questo componente, passiamo le props come se fossero attributi HTML:

```typescript
const App: React.FC = () => {
  return (
    <div>
      <Card title="React" content="Una libreria per costruire UI" highlighted />
      <Card title="TypeScript" content="JavaScript con i tipi" />
      <Card title="Vite" content="Build tool veloce" />
    </div>
  );
};
```

### Children

Esiste una prop speciale chiamata `children` che rappresenta il contenuto inserito tra il tag di apertura e di chiusura del componente:

```typescript
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};

// Utilizzo
const Page: React.FC = () => {
  return (
    <Container>
      <h1>Benvenuto</h1>
      <p>Questo contenuto viene passato come children.</p>
    </Container>
  );
};
```

### Composizione

La vera potenza dei componenti sta nella **composizione**: componenti piccoli vengono combinati per costruire interfacce complesse.

```typescript
const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Card title="Primo post" content="Contenuto del primo post" />
        <Card title="Secondo post" content="Contenuto del secondo post" />
      </Container>
      <Footer />
    </>
  );
};
```

## 5. Gestione degli eventi in React

In React, la gestione degli eventi e molto simile a quella del DOM nativo, ma con alcune differenze sintattiche.

Gli eventi in JSX usano il **camelCase** invece del lowercase dell'HTML: `onClick` invece di `onclick`, `onChange` invece di `onchange`, `onSubmit` invece di `onsubmit`.

```typescript
const Button: React.FC = () => {
  const handleClick = () => {
    alert("Bottone cliccato!");
  };

  return <button onClick={handleClick}>Cliccami</button>;
};
```

La convenzione e di nominare le funzioni handler con il prefisso `handle` seguito dal nome dell'evento: `handleClick`, `handleSubmit`, `handleChange`.

### Passare argomenti agli handler

Se dobbiamo passare un argomento all'handler, usiamo una arrow function:

```typescript
interface ItemListProps {
  items: string[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const handleItemClick = (item: string) => {
    console.log(`Hai cliccato su: ${item}`);
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item} onClick={() => handleItemClick(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};
```

### Gestire i form

Quando lavoriamo con i form, usiamo `onSubmit` e `event.preventDefault()` per evitare il ricaricamento della pagina:

```typescript
const LoginForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form inviato!");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Valore:", event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleInputChange} placeholder="Username" />
      <button type="submit">Login</button>
    </form>
  );
};
```

## 6. State e Hooks

Finora abbiamo visto componenti che mostrano dati fissi. Ma le applicazioni reali sono **interattive**: l'utente clicca, scrive, naviga, e l'interfaccia deve reagire. Per questo esiste lo **state** (stato).

Lo state e un dato che puo cambiare nel tempo e, quando cambia, React **ri-renderizza** automaticamente il componente per mostrare il valore aggiornato.

### Perche non possiamo usare una semplice variabile?

```typescript
// Questo NON funziona
const BrokenCounter: React.FC = () => {
  let count = 0;

  const handleClick = () => {
    count = count + 1;
    console.log(count); // il valore aumenta nel log...
  };

  // ...ma l'interfaccia non si aggiorna mai!
  return <button onClick={handleClick}>Contatore: {count}</button>;
};
```

Quando modifichiamo una variabile locale, React non lo sa e quindi non aggiorna l'interfaccia. Per comunicare a React che un dato e cambiato, dobbiamo usare l'hook `useState`.

### useState

`useState` e un **hook** di React (gli hook sono funzioni speciali che iniziano con `use`). Restituisce un array con due elementi: il valore attuale dello stato e una funzione per aggiornarlo.

```typescript
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>Contatore: {count}</p>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};
```

La sintassi `const [count, setCount] = useState(0)` utilizza il **destructuring** che abbiamo imparato con JavaScript. `useState(0)` inizializza lo stato a `0`, `count` e il valore corrente e `setCount` e la funzione che usiamo per aggiornarlo.

### Controlled components

Un pattern molto comune in React e quello dei **controlled components**, dove il valore di un input e controllato dallo stato:

```typescript
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Cerca..."
      />
      <p>Stai cercando: {query}</p>
    </div>
  );
};
```

In questo modo React e sempre consapevole del valore dell'input. Il flusso e: l'utente digita, l'evento `onChange` scatta, `setQuery` aggiorna lo stato, React ri-renderizza il componente con il nuovo valore.

## 7. useEffect

Quando un componente ha bisogno di interagire con il "mondo esterno" (fare una chiamata API, impostare un timer, modificare il titolo della pagina), queste operazioni si chiamano **side effects** (effetti collaterali). Non fanno parte del rendering ma sono necessarie per il funzionamento dell'applicazione.

L'hook `useEffect` ci permette di eseguire questi effetti collaterali in modo controllato.

### Sintassi base

```typescript
import { useEffect, useState } from "react";

const PageTitle: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    document.title = `Hai cliccato ${count} volte`;
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Cliccami ({count})</button>;
};
```

`useEffect` accetta due argomenti:

1. Una **funzione** che contiene l'effetto da eseguire
2. Un **array di dipendenze** che indica quando l'effetto deve rieseguirsi

### Array di dipendenze

L'array di dipendenze e fondamentale per controllare quando l'effetto viene eseguito:

```typescript
// Esegue a OGNI render (nessun array di dipendenze - sconsigliato)
useEffect(() => {
  console.log("Eseguito a ogni render");
});

// Esegue SOLO al primo render (array vuoto)
useEffect(() => {
  console.log("Eseguito solo al mount");
}, []);

// Esegue quando `userId` cambia
useEffect(() => {
  console.log(`Carico dati per utente ${userId}`);
}, [userId]);
```

### Esempio pratico: fetch dei dati

Uno degli usi piu comuni di `useEffect` e il caricamento di dati da un'API quando il componente viene montato:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  if (!user) {
    return <p>Utente non trovato.</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
```

### Cleanup function

Alcuni effetti necessitano di una **pulizia** quando il componente viene smontato (ad esempio, timer o sottoscrizioni). In questi casi, la funzione passata a `useEffect` restituisce una funzione di cleanup:

```typescript
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <p>Secondi trascorsi: {seconds}</p>;
};
```

La funzione di cleanup (quella con `clearInterval`) viene chiamata automaticamente da React quando il componente viene rimosso dal DOM, evitando cosi memory leak.

## 8. Rendering condizionale e liste

### Rendering condizionale

In React possiamo mostrare o nascondere elementi in base a una condizione. Ci sono diversi modi per farlo.

Con l'**operatore ternario**:

```typescript
interface StatusProps {
  isOnline: boolean;
}

const StatusBadge: React.FC<StatusProps> = ({ isOnline }) => {
  return (
    <span className={isOnline ? "badge-online" : "badge-offline"}>
      {isOnline ? "Online" : "Offline"}
    </span>
  );
};
```

Con l'**operatore logico `&&`**: utile quando vogliamo mostrare qualcosa solo se una condizione e vera, senza un caso alternativo:

```typescript
interface NotificationProps {
  messages: string[];
}

const Notification: React.FC<NotificationProps> = ({ messages }) => {
  return (
    <div>
      <h2>Notifiche</h2>
      {messages.length === 0 && <p>Nessuna nuova notifica.</p>}
      {messages.length > 0 && (
        <p>Hai {messages.length} nuovi messaggi!</p>
      )}
    </div>
  );
};
```

### Rendering di liste

Per visualizzare una lista di elementi usiamo il metodo `.map()` degli array, che abbiamo gia visto in JavaScript:

```typescript
interface Student {
  id: number;
  name: string;
  grade: number;
}

const StudentList: React.FC = () => {
  const students: Student[] = [
    { id: 1, name: "Marco", grade: 8 },
    { id: 2, name: "Giulia", grade: 9 },
    { id: 3, name: "Luca", grade: 7 },
  ];

  return (
    <ul>
      {students.map((student) => (
        <li key={student.id}>
          {student.name} - Voto: {student.grade}
        </li>
      ))}
    </ul>
  );
};
```

### La prop `key`

Ogni elemento generato con `.map()` **deve** avere una prop `key` con un valore univoco. React usa le key per identificare quale elemento e stato aggiunto, rimosso o modificato. Senza key (o con key non univoche), React non riesce ad aggiornare la lista in modo efficiente e puo causare bug visivi.

Regole per le key:

- Usare un **identificatore univoco** dei dati (come un `id` dal database)
- **Non** usare l'indice dell'array come key, a meno che la lista sia statica e non cambi mai ordine
- Le key devono essere **stabili**: non devono cambiare tra un render e l'altro

```typescript
// Corretto: id univoco
{students.map((student) => (
  <li key={student.id}>{student.name}</li>
))}

// Sconsigliato: indice dell'array
{students.map((student, index) => (
  <li key={index}>{student.name}</li>
))}
```

## 9. Thinking in React

"Thinking in React" e l'approccio mentale che ci guida nella progettazione di un'applicazione React. Si basa su 5 passaggi fondamentali:

### Passo 1: Suddividere l'interfaccia in componenti

Partendo dal mockup o dal design, identifichiamo le diverse aree dell'interfaccia e le raggruppiamo in componenti. Un buon componente dovrebbe avere una **sola responsabilita** (fare una cosa sola e farla bene). Se un componente cresce troppo, probabilmente va suddiviso in componenti piu piccoli.

### Passo 2: Costruire una versione statica

Prima di aggiungere qualsiasi interattivita, costruiamo una versione statica dell'applicazione. In questa fase i componenti ricevono i dati tramite props ma non hanno stato. Questo ci permette di concentrarci sulla struttura senza preoccuparci della logica.

### Passo 3: Identificare lo stato minimo necessario

Qual e il set minimo di dati che deve cambiare nel tempo? Non tutto deve essere nello stato. Una regola semplice: se un dato puo essere **calcolato** a partire da altri dati o props, allora non deve essere nello stato.

Ad esempio, in una lista di prodotti con un filtro di ricerca:
- La lista originale dei prodotti: **non e stato** (viene passata come prop o caricata una sola volta)
- Il testo di ricerca digitato dall'utente: **e stato** (cambia nel tempo)
- La lista filtrata: **non e stato** (si calcola dalla lista originale + il testo di ricerca)

### Passo 4: Decidere dove posizionare lo stato

Per ogni pezzo di stato, determiniamo quale componente dovrebbe possederlo. Lo stato dovrebbe vivere nel componente piu in alto nella gerarchia che ha bisogno di usarlo o di passarlo ai figli che ne hanno bisogno (questo concetto si chiama **lifting state up**).

### Passo 5: Aggiungere il flusso di dati inverso

Infine, permettiamo ai componenti figli di comunicare con i genitori. Se un input in un componente figlio deve aggiornare lo stato nel genitore, il genitore passa una **funzione callback** come prop. Il figlio la chiama quando l'utente interagisce.

Per approfondire, consulta la guida ufficiale: [React.dev - Thinking in React](https://it.react.dev/learn/thinking-in-react)

## 10. Gestione dei dati in React

Ora che conosciamo i fondamenti, costruiamo un'applicazione che interagisce con un'API esterna. Questa sezione introduce due strumenti fondamentali:

- **Axios**: una libreria per effettuare chiamate HTTP (GET, POST, PUT, DELETE). E un'alternativa a `fetch` con una sintassi piu comoda, gestione automatica del JSON e supporto agli interceptor per configurazioni globali (come gli header di autenticazione).

- **React Router**: una libreria per gestire la navigazione nell'applicazione. Permette di creare piu "pagine" in una Single Page Application (SPA), dove il cambio di pagina avviene senza ricaricare l'intero sito.

### Creare il progetto

```bash
npm create vite@latest dummyapp -- --template react-ts
cd dummyapp
npm install
npm run dev
```

Installare Axios e React Router:

```bash
npm install axios react-router-dom
```

### Configurazione dell'API

Come servizio di API fake utilizziamo [dummyapi.io](https://dummyapi.io/). Per poter effettuare le chiamate e necessario ottenere un **APP_ID** personale.

Per ottenere il tuo APP_ID:

1. Registrarsi su [https://dummyapi.io/](https://dummyapi.io/)
2. Effettuare il login
3. Copiare l'APP_ID dalla dashboard personale

Creare il file `./dummyapp/src/api.ts` per configurare Axios:

```typescript
import axios from "axios";

// ATTENZIONE: questo e un valore di esempio e NON funziona.
// Devi registrarti su https://dummyapi.io/ e usare il TUO APP_ID personale.
const APP_ID = "IL_TUO_APP_ID";

const api = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    "app-id": APP_ID,
  },
});

export default api;
```

Esempio di utilizzo di Axios per effettuare una chiamata GET:

```typescript
import api from "./api";

api.get("/user").then((response) => {
  console.log(response.data);
});
```

### Configurazione del routing

React Router ci permette di associare un URL a un componente specifico. Configuriamo il routing nell'`App`:

```typescript
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={/* Componente UserList */} />
        <Route path="/user/:id" element={/* Componente UserDetail */} />
        <Route path="/user/:id/edit" element={/* Componente UserDetailEdit */} />
      </Routes>
    </BrowserRouter>
  );
};
```

Il parametro `:id` nell'URL e un **parametro dinamico**: cambia in base all'utente selezionato. React Router ci fornisce l'hook `useParams` per leggerlo.

### Navigazione programmatica

Per navigare tra le pagine da codice (ad esempio dopo un click), usiamo l'hook `useNavigate`:

```typescript
import React from "react";
import { useNavigate } from "react-router-dom";

const UserList: React.FC = () => {
  const navigate = useNavigate();

  const handleUserClick = (id: string) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        <li onClick={() => handleUserClick("1")}>User 1</li>
        {/* ... */}
      </ul>
    </div>
  );
};
```

## Esercizi pratici

### Esercizio: Gestione dei Post

In questo esercizio metteremo in pratica quanto appreso creando nuovi componenti e configurando il routing per gestire una sezione dedicata ai post.

**Requisiti:**

- [ ] Configurare due nuove rotte `/post` e `/post/:id` e associare i componenti `PostList` e `PostDetail`
- [ ] Creare un componente `PostList` che visualizzi la lista dei post ottenuti dalla chiamata API `/post`
- [ ] Creare un componente `PostDetail` che visualizzi i dettagli di un post ottenuti dalla chiamata API `/post/{id}`
- [ ] Stilare sia il componente `PostList` che `PostDetail` utilizzando il CSS in modo da rendere l'applicazione gradevole

**Suggerimento di implementazione:**

Per il componente `PostList` potete strutturarlo in questo modo. Notate come vengono usati `useState` per gestire la lista di post, `useEffect` per caricare i dati al mount e `useNavigate` per la navigazione:

```typescript
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

interface Post {
  id: string;
  title: string;
}

interface PostResponse {
  data: Post[];
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<PostResponse>("/post").then((response) => {
      setPosts(response.data.data);
    });
  }, []);

  const handlePostClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="post-list">
      <h1>Post List</h1>
      {posts.map((post) => (
        <div key={post.id} onClick={() => handlePostClick(post.id)} className="post-item">
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default PostList;
```

Per questo esercizio non e importante che la grafica sia perfetta, l'importante e che i dati vengano visualizzati e gestiti correttamente.

### Checklist dell'esercizio Post

Una volta completato l'esercizio in aula, il routing dell'app di esempio dovrebbe includere tutte queste rotte:

```typescript
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/:id/edit" element={<UserDetailEdit />} />
        <Route path="/post" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
```

Per testare l'applicazione:

1. Verificare che la navigazione tra le diverse pagine funzioni correttamente
2. Controllare che i dati vengano caricati e visualizzati correttamente
3. Assicurarsi che il CSS applicato renda l'interfaccia utente gradevole e usabile

### Esercizio extra (da fare a casa): Tutorial Tic-Tac-Toe

Per consolidare i concetti di componenti, props, state e immutabilita', segui il tutorial ufficiale di React che ti guida nella creazione del gioco del **Tris**:

1. Crea un nuovo progetto: `npm create vite@latest tic-tac-toe -- --template react-ts`
2. Importa il file [`./assets/style.css`](./assets/style.css) nella cartella `src` del progetto
3. Segui il tutorial: [React.dev - Tutorial: Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)

Questo tutorial copre in particolare il concetto di **lifting state up** (spostare lo stato nel componente genitore) e l'**immutabilita'** (creare copie dei dati invece di modificarli).

## Risorse utili

- [React.dev - Documentazione ufficiale](https://it.react.dev/)
- [React.dev - Thinking in React](https://it.react.dev/learn/thinking-in-react)
- [React.dev - Tutorial Tic-Tac-Toe](https://react.dev/learn/tutorial-tic-tac-toe)
- [Vite - Documentazione ufficiale](https://vitejs.dev/)
- [Axios - Documentazione](https://axios-http.com/)
- [React Router - Documentazione](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)

## Riepilogo

In questa lezione abbiamo affrontato i concetti fondamentali di React:

- **React** e una libreria per costruire interfacce utente basata su componenti riutilizzabili
- **Vite** e il build tool moderno che utilizziamo per creare e servire i nostri progetti
- **JSX** e la sintassi che ci permette di scrivere interfacce in modo dichiarativo, mescolando HTML e JavaScript
- I **componenti** sono funzioni che restituiscono JSX e ricevono dati tramite **props**
- Gli **eventi** in React usano il camelCase e seguono la convenzione `handleNomeEvento`
- Lo **state** (`useState`) e il dato che puo cambiare nel tempo e provoca il re-render del componente
- **useEffect** ci permette di eseguire effetti collaterali come le chiamate API, controllando quando rieseguirli tramite l'array di dipendenze
- Il **rendering condizionale** e il **rendering di liste** con `.map()` e `key` ci permettono di costruire interfacce dinamiche
- **Thinking in React** e il processo mentale in 5 passi per progettare un'applicazione React
- **Axios** e **React Router** sono strumenti per gestire rispettivamente le chiamate HTTP e la navigazione
