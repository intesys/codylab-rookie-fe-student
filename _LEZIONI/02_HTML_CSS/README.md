# 02 - HTML e CSS

> I due linguaggi fondamentali per costruire pagine web: HTML per la struttura, CSS per lo stile. In questa lezione imparerai a scrivere pagine complete, stilizzarle e renderle responsive.

## Indice

- [Obiettivi di apprendimento](#obiettivi-di-apprendimento)
- [Prerequisiti](#prerequisiti)
- [1. Come funziona una pagina web](#1-come-funziona-una-pagina-web)
- [2. HTML - La struttura](#2-html---la-struttura)
- [3. Form HTML](#3-form-html)
- [4. CSS - Lo stile](#4-css---lo-stile)
- [5. Il Box Model](#5-il-box-model)
- [6. Specificita dei selettori](#6-specificita-dei-selettori)
- [7. Collegare CSS all'HTML](#7-collegare-css-allhtml)
- [8. Responsive Layout](#8-responsive-layout)
- [9. Best Practices](#9-best-practices)
- [10. DevTools del browser](#10-devtools-del-browser)
- [Esercizi pratici](#esercizi-pratici)
- [Risorse utili](#risorse-utili)
- [Riepilogo](#riepilogo)

## Obiettivi di apprendimento

Al termine di questa lezione sarai in grado di:

- Comprendere come il browser interpreta HTML e CSS per visualizzare una pagina
- Scrivere un documento HTML con struttura semantica corretta
- Creare form e tabelle in HTML
- Applicare stili CSS usando selettori, proprietà e il Box Model
- Collegare un foglio di stile esterno a una pagina HTML
- Costruire layout responsive con Media Queries, Flexbox e CSS Grid
- Usare i DevTools del browser per ispezionare e modificare una pagina in tempo reale

## Prerequisiti

- Avere un editor di testo installato (VS Code consigliato)
- Sapere cos'è un file e come salvarlo con una determinata estensione
- Conoscenza base dell'uso del terminale (aprire file, navigare cartelle)

---

## 1. Come funziona una pagina web

Prima di scrivere codice, e utile capire cosa succede quando apri una pagina nel browser.

Quando visiti un sito, il browser scarica dei file dal server. I due file principali sono:

- **HTML** - contiene la struttura e il contenuto della pagina (testi, immagini, link)
- **CSS** - contiene le regole di stile che definiscono l'aspetto visivo (colori, dimensioni, posizioni)

Il browser legge prima l'HTML per costruire la struttura della pagina (il cosiddetto **DOM**, Document Object Model), poi applica il CSS per renderla visivamente gradevole.

Un'analogia utile: pensa al corpo umano. L'**HTML e lo scheletro**: definisce la struttura portante, le ossa, le articolazioni. Il **CSS e la pelle e i vestiti**: definisce l'aspetto esteriore, i colori, le proporzioni visibili. Senza lo scheletro non c'e forma; senza la pelle e i vestiti, lo scheletro resta esposto e poco gradevole. Allo stesso modo, HTML e CSS lavorano sempre insieme.

Puoi vedere un esempio completo di questa collaborazione nel file [`index.html`](./index.html) presente in questa cartella.

---

## 2. HTML - La struttura

HTML (HyperText Markup Language) e il linguaggio standard per creare e strutturare i contenuti di una pagina web. Non e un linguaggio di programmazione, ma un linguaggio di **markup**: usa dei "tag" (etichette) per dire al browser cosa rappresenta ogni porzione di contenuto.

### Struttura base di un documento HTML

Ogni pagina HTML segue una struttura minima. Ecco lo "scheletro" che troverai in qualsiasi sito web:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

- `<!DOCTYPE html>` dice al browser che il documento usa HTML5
- `<html>` e l'elemento radice che racchiude tutto il documento
- `<head>` contiene metadati (titolo, charset, link a CSS) che non vengono visualizzati nella pagina
- `<body>` contiene tutto il contenuto visibile della pagina

### Elementi HTML principali

Ecco gli elementi che userai piu spesso, suddivisi per categoria.

**Testi e titoli** - per organizzare i contenuti testuali della pagina:

- `<h1>` - `<h6>`: Intestazioni, da `<h1>` (titolo principale) a `<h6>` (sotto-titolo piu piccolo). Usa un solo `<h1>` per pagina
- `<p>`: Paragrafo di testo
- `<strong>`: Testo importante (il browser lo mostra in grassetto)
- `<em>`: Testo enfatizzato (il browser lo mostra in corsivo)
- `<br>`: Interruzione di riga (va a capo senza aprire un nuovo paragrafo)

**Link e immagini** - per collegare risorse e mostrare contenuti multimediali:

- `<a href="url">`: Link a un'altra pagina o risorsa
- `<img src="url" alt="descrizione">`: Immagine. L'attributo `alt` e obbligatorio per l'accessibilita

**Liste** - per presentare serie di elementi:

- `<ul>`: Lista non ordinata (con pallini)
- `<ol>`: Lista ordinata (con numeri)
- `<li>`: Singolo elemento di una lista

**Contenitori** - per raggruppare elementi e applicare stili:

- `<div>`: Contenitore generico a livello di blocco (va a capo)
- `<span>`: Contenitore generico inline (resta sulla stessa riga)

**Elementi semantici** - comunicano al browser (e agli screen reader) il significato del contenuto:

- `<header>`: Intestazione della pagina o di una sezione (spesso contiene logo e navigazione)
- `<nav>`: Blocco di navigazione con link di menu
- `<main>`: Contenuto principale della pagina (uno solo per pagina)
- `<section>`: Sezione tematica del contenuto
- `<article>`: Contenuto autonomo e indipendente (un post, un commento, una notizia)
- `<aside>`: Contenuto laterale, correlato ma non essenziale
- `<footer>`: Pie' di pagina con informazioni di chiusura (credits, link legali)

Per un elenco completo di tutti i tag HTML disponibili, consulta il [Cheat Sheet HTML](./_doc/HTML-Cheat-sheet.pdf).

---

## 3. Form HTML

I form permettono all'utente di inserire dati e inviarli. Sono fondamentali per login, registrazioni, ricerche e qualsiasi interazione che richiede input dall'utente.

### Elementi principali dei form

- `<form>`: Contenitore del form. L'attributo `action` indica dove inviare i dati, `method` indica il metodo HTTP (GET o POST)
- `<label>`: Etichetta descrittiva per un campo. L'attributo `for` collega la label all'`id` del campo corrispondente
- `<input>`: Campo di inserimento. Cambia comportamento in base all'attributo `type`
- `<textarea>`: Area di testo multilinea, utile per messaggi o commenti
- `<select>` e `<option>`: Menu a tendina per selezione da una lista di opzioni
- `<button>`: Pulsante cliccabile, con `type="submit"` invia il form

### Tipi di input principali

L'elemento `<input>` e molto versatile. Ecco i tipi piu usati:

- `text`: Testo libero su una riga
- `email`: Indirizzo email (il browser valida il formato)
- `password`: Password (i caratteri sono nascosti)
- `number`: Valore numerico con frecce di incremento/decremento
- `checkbox`: Casella di spunta (selezione multipla)
- `radio`: Pulsante di scelta esclusiva (una sola opzione tra piu alternative)

### Esempio completo di un form

Ecco un form di contatto con i principali tipi di campo:

```html
<form action="/invia" method="POST">
  <label for="nome">Nome:</label>
  <input type="text" id="nome" name="nome" placeholder="Il tuo nome" required />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" placeholder="tu@esempio.it" required />

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required />

  <label for="eta">Eta:</label>
  <input type="number" id="eta" name="eta" min="14" max="99" />

  <label>Linguaggi preferiti:</label>
  <input type="checkbox" id="html" name="linguaggi" value="html" />
  <label for="html">HTML</label>
  <input type="checkbox" id="css" name="linguaggi" value="css" />
  <label for="css">CSS</label>
  <input type="checkbox" id="js" name="linguaggi" value="js" />
  <label for="js">JavaScript</label>

  <label>Esperienza:</label>
  <input type="radio" id="principiante" name="esperienza" value="principiante" />
  <label for="principiante">Principiante</label>
  <input type="radio" id="intermedio" name="esperienza" value="intermedio" />
  <label for="intermedio">Intermedio</label>

  <label for="messaggio">Messaggio:</label>
  <textarea id="messaggio" name="messaggio" rows="4" placeholder="Scrivi qui..."></textarea>

  <label for="ruolo">Ruolo:</label>
  <select id="ruolo" name="ruolo">
    <option value="">-- Seleziona --</option>
    <option value="studente">Studente</option>
    <option value="docente">Docente</option>
    <option value="altro">Altro</option>
  </select>

  <button type="submit">Invia</button>
</form>
```

L'attributo `required` rende un campo obbligatorio: il browser impedira l'invio se il campo e vuoto. L'attributo `placeholder` mostra un testo suggerimento nel campo vuoto.

---

## 4. CSS - Lo stile

CSS (Cascading Style Sheets) e il linguaggio che definisce l'aspetto visivo di una pagina HTML. Con CSS puoi controllare colori, dimensioni, posizioni, animazioni e molto altro.

### Struttura base di una regola CSS

Ogni regola CSS e composta da un selettore (chi stilizzare) e un blocco di dichiarazioni (come stilizzarlo):

```css
selettore {
  proprieta: valore;
}
```

### Selettori principali

I selettori servono per "puntare" gli elementi HTML a cui applicare uno stile. Ecco i piu importanti:

- **ID**: `#id` - Seleziona un elemento con un ID specifico (deve essere unico nella pagina)
- **Classe**: `.class` - Seleziona tutti gli elementi con una determinata classe
- **Tag**: `tag` (es. `div`, `header`, `p`) - Seleziona tutti gli elementi con quel tag
- **Universale**: `*` - Seleziona tutti gli elementi della pagina
- **Attributo**: `[attributo=valore]` - Seleziona elementi con un attributo specifico

### Concatenazione dei selettori

I selettori si possono combinare per creare regole piu specifiche. Questo e fondamentale per stilizzare solo gli elementi che ti interessano:

```css
/* Elemento con ID "header" E classe "active" */
#header.active {
  background-color: blue;
}

/* Tutti i <p> discendenti di un <div> (qualsiasi livello di profondita) */
div p {
  color: gray;
}

/* Solo i <p> figli diretti di un <div> */
div > p {
  font-weight: bold;
}

/* Il <p> immediatamente dopo un <div> (fratello adiacente) */
div + p {
  margin-top: 0;
}
```

### Proprieta CSS comuni

Ecco le proprieta che userai piu spesso, raggruppate per categoria:

```css
.elemento {
  /* Colori e sfondi */
  color: #333;
  background-color: white;
  background-image: url("immagine.jpg");

  /* Testo */
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;

  /* Dimensioni */
  width: 300px;
  height: 200px;

  /* Box model */
  margin: 10px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;

  /* Posizionamento */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* Visualizzazione */
  display: block;
  visibility: visible;
  opacity: 1;
}
```

Per un elenco completo, consulta il [Cheat Sheet CSS](./_doc/CSS-Cheat-sheet.pdf).

---

## 5. Il Box Model

Questo e uno dei concetti piu importanti del CSS. **Ogni elemento HTML e una scatola rettangolare** (un "box"), e questa scatola e composta da quattro livelli, dall'interno verso l'esterno:

```
+-------------------------------------------+
|                 MARGIN                     |
|   +-----------------------------------+   |
|   |             BORDER                 |   |
|   |   +---------------------------+   |   |
|   |   |         PADDING           |   |   |
|   |   |   +-------------------+   |   |   |
|   |   |   |     CONTENT       |   |   |   |
|   |   |   +-------------------+   |   |   |
|   |   +---------------------------+   |   |
|   +-----------------------------------+   |
+-------------------------------------------+
```

- **Content**: Il contenuto vero e proprio dell'elemento (testo, immagine, ecc.)
- **Padding**: Lo spazio interno tra il contenuto e il bordo. E come "l'imbottitura" dentro una scatola
- **Border**: Il bordo visibile attorno all'elemento
- **Margin**: Lo spazio esterno tra questo elemento e gli elementi vicini. E la distanza tra una scatola e l'altra

### Un esempio pratico

Immagina una cornice con una foto. Il **content** e la foto, il **padding** e il passepartout (lo spazio tra foto e cornice), il **border** e la cornice vera e propria, e il **margin** e lo spazio tra la cornice e le altre cornici appese al muro.

```css
.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #ccc;
  margin: 16px;
}
```

### content-box vs border-box

Per default, il CSS calcola le dimensioni in modo poco intuitivo: `width` e `height` si applicano solo al **content**, e padding e border si aggiungono sopra. Questo significa che un elemento con `width: 300px`, `padding: 20px` e `border: 2px` occupera in realta 344px (300 + 20 + 20 + 2 + 2).

Con `box-sizing: border-box`, invece, `width` e `height` includono gia padding e border. Il contenuto si riduce automaticamente per fare spazio. Questo comportamento e molto piu prevedibile:

```css
/* Comportamento default (poco intuitivo) */
.box-content {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale: 300 + 20 + 20 + 2 + 2 = 344px */
}

/* Comportamento consigliato (piu intuitivo) */
.box-border {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale: 300px (padding e border inclusi) */
}
```

La pratica comune e applicare `border-box` a tutti gli elementi del sito con questa regola globale:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

---

## 6. Specificita dei selettori

Quando piu regole CSS si applicano allo stesso elemento, il browser deve decidere quale vince. La **specificita** e il sistema di "punteggio" che il browser usa per questa decisione. Piu un selettore e specifico, piu ha la priorita.

La gerarchia, dalla specificita piu alta a quella piu bassa, e:

1. **Style inline**: `<div style="color: red;">` (priorita massima)
2. **ID**: `#header` (punteggio alto)
3. **Classi, attributi e pseudo-classi**: `.active`, `[type="text"]`, `:hover`
4. **Elementi e pseudo-elementi**: `div`, `p`, `::before` (priorita minima)

A parita di specificita, vince la regola scritta per ultima nel foglio di stile. Come buona pratica, evita di usare troppi ID nei selettori e preferisci le classi: rendono il CSS piu flessibile e facile da mantenere.

---

## 7. Collegare CSS all'HTML

Esistono tre modi per applicare stili CSS a una pagina HTML. Ognuno ha vantaggi e svantaggi diversi.

### 8.1 CSS Inline

Gli stili vengono scritti direttamente nell'attributo `style` del singolo elemento:

```html
<div style="color: blue; font-size: 16px;">Questo e un testo blu</div>
```

**Pro**: Applicazione immediata a un singolo elemento.
**Contro**: Difficile da mantenere, non riutilizzabile, mischia struttura e stile.

### 8.2 CSS Interno

Le regole CSS vengono scritte dentro un tag `<style>` nel `<head>` del documento:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <style>
      div {
        color: blue;
        font-size: 16px;
      }

      .highlight {
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <div>Questo e un testo blu</div>
    <div class="highlight">Questo e un testo blu con sfondo giallo</div>
  </body>
</html>
```

**Pro**: Tutte le regole in un unico punto, non richiede file esterni.
**Contro**: Valido solo per la pagina corrente, aumenta le dimensioni del file HTML.

### 8.3 CSS Esterno

Le regole CSS sono in un file separato, collegato tramite `<link>`. Questo e il metodo consigliato:

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <title>Titolo pagina</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Contenuto della pagina -->
  </body>
</html>
```

Il file `style.css` separato contiene le regole:

```css
div {
  color: blue;
  font-size: 16px;
}

.highlight {
  background-color: yellow;
}
```

**Pro**: Separazione di struttura e presentazione, file CSS riutilizzabile su piu pagine, il browser puo salvarlo in cache (caricamento piu veloce).
**Contro**: Richiede un file aggiuntivo.

Puoi vedere questo approccio in azione nel file [`index.html`](./index.html), che collega i fogli di stile `reset.css` e `style.css` dalla cartella `assets`.

---

## 8. Responsive Layout

Il design responsive permette alle pagine web di adattarsi a qualsiasi dimensione dello schermo: dal monitor del desktop allo smartphone. Oggi la maggior parte del traffico web viene da dispositivi mobili, quindi progettare pagine responsive non e un optional, e una necessita.

### 8.1 Media Queries

Le media queries permettono di applicare regole CSS diverse in base alle caratteristiche del dispositivo (larghezza dello schermo, orientamento, ecc.):

```css
/* Stile base per tutti i dispositivi */
body {
  font-size: 16px;
}

/* Dispositivi mobile (max 600px) */
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }

  .menu {
    display: none;
  }
}

/* Tablet e dispositivi di medie dimensioni */
@media (min-width: 601px) and (max-width: 1200px) {
  .container {
    width: 90%;
  }
}

/* Solo orientamento orizzontale */
@media (orientation: landscape) {
  .sidebar {
    display: block;
  }
}
```

L'approccio consigliato e il **mobile-first**: scrivi prima gli stili per lo schermo piu piccolo, poi aggiungi regole con `min-width` per schermi piu grandi.

### 8.2 Flexbox

Flexbox e un modello di layout **unidimensionale**: organizza gli elementi in una riga o in una colonna. E perfetto per menu di navigazione, barre laterali e distribuire spazio tra elementi.

Proprieta del contenitore (l'elemento padre con `display: flex`):

```css
.container {
  display: flex;

  /* Direzione del flusso: row | column | row-reverse | column-reverse */
  flex-direction: row;

  /* Andare a capo quando gli elementi non entrano: nowrap | wrap | wrap-reverse */
  flex-wrap: wrap;

  /* Allineamento sull'asse principale: flex-start | flex-end | center | space-between | space-around | space-evenly */
  justify-content: space-between;

  /* Allineamento sull'asse secondario: flex-start | flex-end | center | stretch | baseline */
  align-items: center;

  /* Allineamento delle righe quando ci sono piu linee: flex-start | flex-end | center | stretch | space-between | space-around */
  align-content: stretch;
}
```

Proprieta degli elementi figli:

```css
.item {
  /* Quanto puo crescere rispetto agli altri (0 = non cresce) */
  flex-grow: 1;

  /* Quanto puo ridursi rispetto agli altri (0 = non si riduce) */
  flex-shrink: 1;

  /* Dimensione base prima della distribuzione dello spazio */
  flex-basis: 200px;

  /* Shorthand per grow, shrink e basis */
  flex: 1 1 200px;

  /* Sovrascrive align-items per questo singolo elemento */
  align-self: center;

  /* Ordine di visualizzazione (indipendente dall'ordine HTML) */
  order: 2;
}
```

### 8.3 CSS Grid (cenni)

Grid e un sistema di layout **bidimensionale**: permette di controllare sia righe che colonne contemporaneamente. E ideale per layout di pagina complessi, gallerie e griglie di contenuti. Per questo corso ci concentreremo su Flexbox, ma ecco la sintassi base di Grid per riferimento:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

Per approfondire CSS Grid, consulta la [guida completa su CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/).

---

## 9. Best Practices

Ecco un elenco di buone pratiche che dovresti seguire fin da subito. Sembrano tante, ma diventeranno naturali con la pratica:

- Utilizzare HTML semantico (`<header>`, `<nav>`, `<main>`, `<footer>`) al posto di `<div>` generici, per migliorare accessibilita e SEO
- Separare HTML (struttura) dal CSS (presentazione) usando fogli di stile esterni
- Usare nomi di classi CSS descrittivi e riutilizzabili (es. `.card-title` invece di `.t1`)
- Mantenere il CSS organizzato raggruppando le regole per sezione o componente
- Aggiungere sempre l'attributo `alt` alle immagini per l'accessibilita
- Testare le pagine su diversi dispositivi e browser
- Ottimizzare le immagini (dimensioni e peso del file) per velocizzare il caricamento
- Considerare l'accessibilita: contrasto sufficiente tra testo e sfondo, dimensioni del testo leggibili
- Usare `box-sizing: border-box` globalmente per calcoli di dimensione prevedibili
- Adottare un approccio mobile-first nel design responsive

---

## 10. DevTools del browser

I DevTools (strumenti per sviluppatori) sono integrati in ogni browser moderno e sono lo strumento piu importante per chi impara lo sviluppo web. Ti permettono di ispezionare, modificare e debuggare le pagine in tempo reale.

### Come aprire i DevTools

Ci sono diversi modi per aprire i DevTools:

- Premi **F12** sulla tastiera
- Premi **Ctrl + Shift + I** (Windows/Linux) o **Cmd + Option + I** (Mac)
- Fai clic destro su qualsiasi elemento della pagina e seleziona **"Ispeziona"** (o "Inspect")

### Cosa puoi fare con i DevTools

**Ispezionare gli elementi**: Nella scheda "Elements" (o "Elementi") puoi vedere la struttura HTML della pagina come un albero. Cliccando su un elemento, nella parte destra vedrai tutte le regole CSS che si applicano a quell'elemento.

**Modificare CSS in tempo reale**: Puoi aggiungere, modificare o disattivare qualsiasi proprieta CSS direttamente nei DevTools. Le modifiche sono immediate e visibili nella pagina, ma non permanenti - si perdono al refresh. Questo e perfetto per sperimentare senza paura di rompere nulla.

**Visualizzare il Box Model**: Quando selezioni un elemento, i DevTools mostrano una rappresentazione grafica del Box Model con i valori esatti di margin, border, padding e content. Ogni livello ha un colore diverso, cosi puoi capire esattamente quanto spazio occupa ogni parte.

**Console**: Nella scheda "Console" puoi vedere errori e avvisi. Per ora ti servira soprattutto per individuare problemi con i percorsi dei file (immagini non trovate, CSS non caricati).

Prova subito: apri il file [`index.html`](./index.html) nel browser, premi F12, e inizia a esplorare la struttura della pagina e i suoi stili.

---

## Esercizi pratici

### Esercizio 1 - Pagina profilo personale

Crea un file `profilo.html` con una pagina di presentazione personale che contenga:

- Un titolo `<h1>` con il tuo nome
- Un'immagine (puoi usare un placeholder come `https://via.placeholder.com/150`)
- Un paragrafo `<p>` con una breve descrizione di te
- Una lista non ordinata `<ul>` con almeno 3 hobby
- Un link `<a>` a un sito che ti piace

La pagina deve usare almeno 3 elementi semantici (`<header>`, `<main>`, `<footer>`).

### Esercizio 2 - Card con stile CSS

Partendo dal profilo dell'esercizio 1, crea un file `style.css` esterno e stilizza il profilo come una "card" (scheda):

- Larghezza fissa di 400px, centrata nella pagina (`margin: 0 auto`)
- Sfondo bianco con un'ombra leggera (`box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)`)
- Bordi arrotondati (`border-radius: 12px`)
- Padding interno di 24px
- Immagine circolare (`border-radius: 50%`)
- Font leggibile (es. `font-family: Arial, sans-serif`)

### Esercizio 3 - Layout responsive a 3 colonne

Crea una pagina con un layout a 3 colonne usando Flexbox o CSS Grid:

- Ogni colonna deve contenere un titolo e un paragrafo di testo
- Su desktop (larghezza > 768px): le 3 colonne affiancate
- Su mobile (larghezza <= 768px): le colonne impilate una sotto l'altra (singola colonna)
- Usa una media query per gestire il cambio di layout
- Aggiungi `gap` tra le colonne e `padding` interno

### Esercizio 4 - Form di contatto stilizzato

Crea un form di contatto completo con:

- Campi per: nome, email, oggetto (select con opzioni), messaggio (textarea)
- Pulsante di invio
- Stilizza il form con CSS esterno: campi a larghezza piena, bordi arrotondati, colore di focus sui campi, pulsante con colore di sfondo e effetto hover
- Il form deve essere responsive: su mobile occupa il 100% della larghezza, su desktop massimo 600px centrato

---

## Risorse utili

- HTML Tags > [Cheat Sheet](./_doc/HTML-Cheat-sheet.pdf)
- Selettori CSS > [Cheat Sheet](./_doc/CSS-Cheat-sheet.pdf)
- [MDN Web Docs - HTML](https://developer.mozilla.org/it/docs/Web/HTML) - La documentazione di riferimento per HTML
- [MDN Web Docs - CSS](https://developer.mozilla.org/it/docs/Web/CSS) - La documentazione di riferimento per CSS
- [CSS-Tricks - Guida completa a Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - La migliore guida visuale per Flexbox
- [CSS-Tricks - Guida completa a Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) - La migliore guida visuale per CSS Grid
- [Can I Use](https://caniuse.com/) - Per verificare la compatibilita delle proprieta CSS con i vari browser

---

## Riepilogo

In questa lezione hai imparato i fondamenti di HTML e CSS:

- **Come funziona il web**: il browser legge HTML per la struttura e CSS per lo stile
- **HTML**: struttura base di un documento, elementi semantici, form
- **CSS**: selettori, proprieta, Box Model e specificita
- **Collegamento CSS-HTML**: tre metodi (inline, interno, esterno) con preferenza per l'esterno
- **Responsive design**: Media Queries, Flexbox e CSS Grid per layout adattivi
- **DevTools**: come usare gli strumenti del browser per ispezionare e sperimentare

Nella prossima lezione inizieremo con **JavaScript**, il linguaggio che rende le pagine web interattive e dinamiche.
