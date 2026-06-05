# 01 - Introduzione allo sviluppo web

> In questa prima lezione scoprirai cos'e' il mondo dello sviluppo web, imparerai a usare gli strumenti fondamentali di ogni sviluppatore e configurerai il tuo ambiente di lavoro per tutto il corso.

## Indice

- [Obiettivi di apprendimento](#obiettivi-di-apprendimento)
- [Prerequisiti](#prerequisiti)
- [1. Cos'e' lo sviluppo web?](#1-cose-lo-sviluppo-web)
- [2. Il terminale](#2-il-terminale)
- [3. Installazione e configurazione degli strumenti](#3-installazione-e-configurazione-degli-strumenti)
- [4. Cos'e' Git?](#4-cose-git)
- [5. Cos'e' Node.js?](#5-cose-nodejs)
- [6. Verifica dell'installazione](#6-verifica-dellinstallazione)
- [Esercizi pratici](#esercizi-pratici)
- [Risorse utili](#risorse-utili)
- [Riepilogo](#riepilogo)

## Obiettivi di apprendimento

Al termine di questa lezione sarai in grado di:

- Spiegare cos'e' lo sviluppo web e la differenza tra frontend e backend
- Utilizzare il terminale per navigare tra le cartelle e creare file
- Installare e configurare Visual Studio Code con le estensioni necessarie
- Capire a cosa serve Git e utilizzare i comandi base per il controllo versione
- Capire a cosa serve Node.js e verificare che sia installato correttamente
- Creare un progetto, inizializzarlo con Git e fare il tuo primo commit

## Prerequisiti

- Un computer con Windows, macOS o Linux
- Una connessione a internet
- Conoscenza base di cosa sia un file e una cartella
- Nessuna esperienza di programmazione richiesta (partiamo da zero!)

## 1. Cos'e' lo sviluppo web?

Ogni volta che apri un sito internet, il tuo browser (Chrome, Firefox, Edge...) sta facendo un lavoro ben preciso: chiede dei dati a un computer remoto (il **server**), li riceve e li trasforma in una pagina visibile sullo schermo. Pensa al browser come a un interprete: riceve istruzioni scritte in un certo linguaggio e le traduce in testo, immagini, pulsanti e animazioni.

Questo meccanismo si chiama **modello client-server**:

- Il **client** e' il tuo browser, cioe' chi chiede le informazioni
- Il **server** e' un computer sempre acceso da qualche parte nel mondo, che risponde alle richieste

Lo sviluppo web si divide in due grandi aree:

- **Frontend**: tutto cio' che l'utente vede e con cui interagisce (la pagina, i pulsanti, i colori, le animazioni). Si costruisce con HTML, CSS e JavaScript.
- **Backend**: tutto cio' che succede "dietro le quinte" (salvare dati, gestire utenti, inviare email). Si costruisce con linguaggi come JavaScript (Node.js), Python, Java e altri.

In questo corso ci concentreremo sul **frontend**: imparerai a costruire interfacce web partendo dalle basi fino ad arrivare a un'applicazione completa.

## 2. Il terminale

Il terminale (o **riga di comando**) e' uno strumento che permette di comunicare con il computer scrivendo comandi di testo, invece di cliccare su icone e menu. Puo' sembrare un passo indietro, ma in realta' e' il contrario: il terminale e' piu' veloce, piu' preciso e ti da' un controllo totale su quello che succede.

Come sviluppatori useremo il terminale continuamente: per installare strumenti, gestire i file, lanciare il nostro progetto e molto altro.

### Aprire il terminale in VSCode

Una volta installato Visual Studio Code (vedi la sezione successiva), puoi aprire il terminale integrato in uno di questi modi:

- Dal menu: **Terminal > New Terminal**
- **Windows/Linux**: `Ctrl + Shift + P`, poi digita "Terminal: New Terminal" e premi Invio
- **Mac**: `Cmd + Shift + P`, poi digita "Terminal: New Terminal" e premi Invio

> Nota: su molte guide troverai la scorciatoia `Ctrl + ` ` (o `Cmd + ` ` su Mac). Su tastiera italiana questo tasto non esiste, quindi usa il menu o la Command Palette come indicato sopra.

Su **Windows** il terminale predefinito e' **PowerShell**. I comandi base che vedremo funzionano anche li', con alcune differenze (ad esempio `ls` funziona, ma `pwd` restituisce un output diverso). Dopo aver installato Git (sezione 3.3), avrai a disposizione anche **Git Bash**, un terminale che si comporta come quelli Linux/Mac. Per impostare Git Bash come terminale predefinito in VSCode: apri le impostazioni (`Ctrl+Shift+P` > "Terminal: Select Default Profile") e seleziona "Git Bash".

### Comandi base

Ecco i comandi che userai piu' spesso:

| Comando | Cosa fa | Esempio |
|---------|---------|---------|
| `pwd` | Mostra la cartella corrente | `pwd` |
| `ls` | Elenca i file nella cartella (Mac/Linux) | `ls` |
| `dir` | Elenca i file nella cartella (Windows) | `dir` |
| `cd` | Cambia cartella | `cd Documents` |
| `cd ..` | Torna alla cartella precedente | `cd ..` |
| `mkdir` | Crea una nuova cartella | `mkdir mio-progetto` |

Prova subito ad aprire il terminale e a navigare nelle tue cartelle per prendere confidenza.

## 3. Installazione e configurazione degli strumenti

Prima di scrivere codice, dobbiamo preparare gli strumenti giusti. Pensa a questa fase come a preparare il banco da lavoro: se gli strumenti sono in ordine, lavorare sara' molto piu' semplice.

### 3.1 Creazione della cartella di lavoro

Per prima cosa, crea una cartella dove terrai tutti i progetti del corso. Apri il terminale e digita:

```bash
mkdir Project
cd Project
```

Questa cartella sara' la tua base: ogni progetto che creerai vivra' qui dentro.

### 3.2 Visual Studio Code

**Visual Studio Code** (VSCode) e' l'editor di codice che useremo durante tutto il corso. E' gratuito, leggero e utilizzato dalla stragrande maggioranza degli sviluppatori frontend.

Scaricalo e installalo da: [code.visualstudio.com](https://code.visualstudio.com/)

#### Estensioni consigliate

Le estensioni aggiungono funzionalita' a VSCode. Installa le seguenti dal pannello Estensioni (`Ctrl+Shift+X` / `Cmd+Shift+X`):

- **Prettier - Code formatter** - Formatta automaticamente il codice in modo ordinato
- **Live Server** - Lancia un server locale per vedere le pagine HTML in tempo reale
- **Material Icon Theme** - Icone piu' chiare per i file nel pannello laterale
- **Italian Language Pack** - Traduzione italiana dell'interfaccia
- **Color Picker** - Per selezionare colori in formato esadecimale, RGB, ecc.
- **Better Comments** - Per organizzare meglio i commenti nel codice
- **DotENV** - Supporto per i file .env
- **Git Graph** - Visualizzazione grafica della cronologia git
- **Duplicate action** - Duplicazione rapida di file e codice
- **Path Autocomplete** - Completamento automatico dei percorsi
- **GitLens** - Estensione avanzata per Git
- **YAML** - Supporto per file YAML
- **Swagger Viewer** - Visualizzazione e testing di API REST

#### Configurazione di VSCode

Per avere un ambiente di lavoro coerente, copieremo una configurazione condivisa.

1. Apri il file [settings.json](./settings.json) presente in questa cartella
2. In VSCode, apri le impostazioni JSON:
   - **Windows/Linux**: File > Preferences > Settings > clicca sull'icona `{}` in alto a destra (Open Settings JSON)
   - **Mac**: Code > Preferences > Settings > clicca sull'icona `{}` in alto a destra (Open Settings JSON)
3. Copia il contenuto del file `settings.json` nel tuo file di configurazione

> IMPORTANTE: Se hai gia' una configurazione esistente, copia solo le parti mancanti senza sovrascrivere le tue impostazioni personali.

### 3.3 Git

Git e' lo strumento per il controllo versione (ne parliamo in dettaglio nella sezione successiva). Per ora, installalo:

- **Windows**: [git-scm.com/download/win](https://git-scm.com/download/win)
- **Mac**: [git-scm.com/download/mac](https://git-scm.com/download/mac)

Su Linux (Ubuntu/Debian) puoi installarlo dal terminale:

```bash
sudo apt install git
```

### 3.4 Node.js

Node.js e' l'ambiente che permette di eseguire JavaScript fuori dal browser (ne parliamo in dettaglio piu' avanti). Hai due opzioni per installarlo:

**Opzione 1 - Installazione diretta** (piu' semplice):
- [nodejs.org](https://nodejs.org/en) - Scarica la versione LTS (Long Term Support)

**Opzione 2 - Tramite Volta** (consigliata):
- [volta.sh](https://volta.sh/) - Permette di gestire piu' versioni di Node.js contemporaneamente

Volta e' l'opzione migliore se in futuro lavorerai su piu' progetti che richiedono versioni diverse di Node.js. Per un corso introduttivo, entrambe le opzioni vanno bene.

## 4. Cos'e' Git?

Immagina di scrivere un tema al computer. Ogni tanto fai "Salva con nome" creando copie come `tema_v1.docx`, `tema_v2.docx`, `tema_finale.docx`, `tema_finale_DAVVERO.docx`... Git risolve esattamente questo problema, ma in modo molto piu' elegante.

**Git** e' un sistema di **controllo versione**: tiene traccia di ogni modifica che fai ai tuoi file, permettendoti di tornare indietro a qualsiasi punto precedente. Pensa ai checkpoint dei videogiochi: ogni tanto salvi lo stato del gioco, e se qualcosa va storto puoi ricaricare un salvataggio precedente.

### Concetti fondamentali

- **Repository** (o "repo"): e' la cartella del tuo progetto, con tutta la sua cronologia di modifiche. Quando "inizializzi" un repo, Git inizia a osservare quella cartella.
- **Commit**: e' un "checkpoint", una fotografia del tuo progetto in un dato momento. Ogni commit ha un messaggio che descrive cosa hai cambiato.
- **Push**: invia i tuoi commit a un server remoto (come GitHub) per condividerli o salvarli online.
- **Pull**: scarica le modifiche fatte da altri (o da te su un altro computer) dal server remoto.

### Comandi base di Git

Ecco i comandi che userai piu' spesso:

```bash
# Inizializza un nuovo repository nella cartella corrente
git init

# Mostra lo stato dei file (modificati, nuovi, pronti per il commit)
git status

# Aggiungi un file specifico all'area di staging (pronti per il commit)
git add nome-file.txt

# Aggiungi TUTTI i file modificati
git add .

# Crea un commit con un messaggio descrittivo
git commit -m "Aggiunto il file iniziale del progetto"
```

Il flusso di lavoro tipico con Git e':

1. Modifichi i tuoi file
2. Controlli cosa hai cambiato con `git status`
3. Aggiungi le modifiche con `git add`
4. Salvi il checkpoint con `git commit`

Non preoccuparti se adesso sembra tanto: con la pratica diventera' automatico.

## 5. Cos'e' Node.js?

JavaScript e' il linguaggio di programmazione del web: e' nato per funzionare dentro il browser e rendere le pagine web interattive. Per molti anni, quello era l'unico posto in cui poteva "vivere".

**Node.js** ha cambiato le regole del gioco: e' un ambiente che permette di eseguire JavaScript direttamente sul tuo computer, fuori dal browser. Questo significa che con un solo linguaggio puoi costruire sia il frontend che il backend di un'applicazione.

### npm: il negozio dei pacchetti

Insieme a Node.js viene installato **npm** (Node Package Manager). Pensa a npm come a un enorme negozio online di librerie di codice: invece di scrivere tutto da zero, puoi cercare e installare "pacchetti" gia' pronti creati da altri sviluppatori.

Per esempio, se hai bisogno di un componente per gestire le date, invece di scriverne uno tu, puoi installare una libreria come `date-fns` con un semplice comando:

```bash
npm install date-fns
```

Durante il corso useremo npm costantemente per aggiungere strumenti e librerie ai nostri progetti.

## 6. Verifica dell'installazione

Dopo aver installato tutto, verifichiamo che gli strumenti funzionino correttamente. Apri il terminale di VSCode e lancia questi comandi:

```bash
git --version
```

Dovresti vedere qualcosa come `git version 2.x.x`.

```bash
node --version
```

Dovresti vedere qualcosa come `v20.x.x` (o la versione che hai installato).

```bash
npm --version
```

Dovresti vedere qualcosa come `10.x.x`.

Se uno di questi comandi restituisce un errore del tipo "comando non trovato", significa che l'installazione non e' andata a buon fine. Riprova seguendo le istruzioni della sezione corrispondente.

## Esercizi pratici

Metti alla prova quello che hai imparato. Prova a completare questi esercizi nell'ordine:

**Esercizio 1 - Navigazione con il terminale**

1. Apri il terminale di VSCode
2. Usa `pwd` per vedere in che cartella ti trovi
3. Naviga fino alla cartella `Project` che hai creato
4. Crea una nuova cartella chiamata `esercizio-01` con `mkdir`
5. Entra nella cartella con `cd esercizio-01`

**Esercizio 2 - Il tuo primo repository Git**

1. Dalla cartella `esercizio-01`, inizializza un repository con `git init`
2. Lancia `git status` e osserva il messaggio

**Esercizio 3 - Il tuo primo commit**

1. Crea un file chiamato `ciao.txt` (puoi farlo da VSCode o dal terminale)
2. Scrivi dentro una riga di testo qualsiasi
3. Lancia `git status`: vedrai il file in rosso (non ancora tracciato)
4. Aggiungi il file con `git add ciao.txt`
5. Lancia di nuovo `git status`: il file ora sara' in verde (pronto per il commit)
6. Fai il commit con `git commit -m "Aggiunto il file ciao.txt"`

**Esercizio 4 - JavaScript fuori dal browser**

1. Apri il terminale e digita:

```bash
node -e "console.log('Ciao mondo!')"
```

2. Dovresti vedere stampato `Ciao mondo!` nel terminale. Hai appena eseguito JavaScript senza un browser!

## Risorse utili

- [Documentazione ufficiale di VSCode](https://code.visualstudio.com/docs)
- [Git - La guida tascabile](https://rogerdudler.github.io/git-guide/index.it.html) - Guida semplice in italiano
- [Documentazione ufficiale di Git](https://git-scm.com/doc)
- [Documentazione ufficiale di Node.js](https://nodejs.org/en/docs)

## Riepilogo

In questa lezione hai imparato i concetti fondamentali per iniziare il tuo percorso nello sviluppo web:

- **Lo sviluppo web** si basa sul modello client-server: il browser (client) chiede dati al server, e il frontend e' tutto cio' che l'utente vede e usa
- **Il terminale** e' lo strumento principale dello sviluppatore per interagire con il computer tramite comandi testuali
- **Visual Studio Code** e' l'editor di codice che useremo, con estensioni che lo rendono ancora piu' potente
- **Git** e' il sistema di controllo versione che tiene traccia di ogni modifica ai tuoi file, come i checkpoint di un videogioco
- **Node.js** permette di eseguire JavaScript fuori dal browser, e **npm** e' il gestore di pacchetti per installare librerie

Nella prossima lezione inizieremo a esplorare i fondamenti di HTML e CSS, i primi mattoni per costruire pagine web.
