# 05 - Intelligenza Artificiale nello sviluppo frontend

> Modulo extra: imparerai a usare gli assistenti AI come partner di sviluppo
> per completare progetti frontend, mantenendo il controllo sul codice
> e sviluppando il pensiero critico necessario a ogni sviluppatore.

## Indice

- [Obiettivi di apprendimento](#obiettivi-di-apprendimento)
- [Prerequisiti](#prerequisiti)
- [1. Cos'e l'AI generativa e perche conta per un frontend developer](#1-cose-lai-generativa-e-perche-conta-per-un-frontend-developer)
- [2. Tipi di strumenti AI](#2-tipi-di-strumenti-ai)
- [3. Il flusso di lavoro universale: Pair Programming con l'AI](#3-il-flusso-di-lavoro-universale-pair-programming-con-lai)
- [4. Dare contesto all'AI: il segreto dei buoni risultati](#4-dare-contesto-allai-il-segreto-dei-buoni-risultati)
- [5. Scrivere prompt efficaci per il frontend](#5-scrivere-prompt-efficaci-per-il-frontend)
- [6. Revisione critica del codice generato](#6-revisione-critica-del-codice-generato)
- [7. Etica, limiti e responsabilita](#7-etica-limiti-e-responsabilita)
- [Esercizi pratici](#esercizi-pratici)
- [Risorse utili](#risorse-utili)
- [Riepilogo](#riepilogo)

## Obiettivi di apprendimento

Al termine di questo modulo extra sarai in grado di:

- Spiegare cos'e un LLM e come puo aiutare (e non sostituire) uno sviluppatore frontend
- Identificare le diverse categorie di strumenti AI e scegliere l'approccio giusto per ogni compito
- Applicare un flusso di lavoro strutturato: contesto, prompt, output, revisione, integrazione
- Scrivere prompt efficaci per creare componenti, integrare API e correggere errori
- Revisionare criticamente il codice generato dall'AI prima di integrarlo nel progetto
- Usare l'AI in modo responsabile ed etico nel contesto accademico e professionale

## Prerequisiti

- Aver completato le lezioni 01–04 del corso CodyLab Rookie
- Avere familiarita' con il progetto finale: struttura `src/components/`, React, TypeScript, MUI
- Aver avviato almeno una volta l'applicazione CodyLab (`npm start`)
- Avere accesso a un assistente AI (qualsiasi strumento: chat web, IDE con AI integrata, agenti)

> Questo modulo e' **facoltativo** e si svolge in autonomia dopo il corso in aula.
> Non e' richiesto un tool specifico: la lezione insegna un metodo valido con qualsiasi assistente.

---

## 1. Cos'e l'AI generativa e perche conta per un frontend developer

Negli ultimi anni, l'intelligenza artificiale ha cambiato il modo in cui molti sviluppatori lavorano. Ma cosa significa esattamente "AI generativa" nel contesto dello sviluppo software?

Un **LLM** (Large Language Model, modello linguistico di grandi dimensioni) e' un sistema addestrato su enormi quantita' di testo — incluso codice sorgente — che impara a predire la sequenza di token piu' probabile in risposta a un input. Quando chiedi a un assistente AI di "creare un componente React", il modello non "capisce" il codice come un essere umano: genera testo che _assomiglia_ al codice che ha visto durante l'addestramento.

Questo ha conseguenze importanti:

### Cosa l'AI fa bene

- **Boilerplate**: struttura iniziale di componenti, form, pagine con layout standard
- **Refactoring ripetitivo**: rinominare variabili, convertire pattern, aggiungere tipi TypeScript
- **Spiegazioni**: chiarire codice esistente, documentare funzioni, confrontare approcci
- **Debug assistito**: analizzare messaggi di errore e proporre correzioni
- **Test base**: generare test unitari o E2E per casi semplici

### Cosa l'AI fa male

- **Allucinazioni**: inventare API, metodi o librerie che non esistono nel tuo progetto
- **Ignorare le convenzioni**: produrre codice funzionante ma incoerente con il resto del codebase
- **Codice non testato**: suggerire soluzioni che sembrano corrette ma non compilano o non funzionano
- **Sicurezza**: proporre pattern insicuri (secret hardcoded, input non validati)

> **Nota:** Nei modelli di AI più recenti questi comportamenti sono spesso ridotti, ma possono comunque verificarsi in misura minore, quindi è sempre bene restare vigili.

### L'AI come assistente, non come sostituto

Pensa all'AI come a un **collega junior molto veloce**: sa molte cose, lavora in fretta, ma commette errori e non conosce il tuo progetto specifico. Tu resti il responsabile del codice che finisce nel repository. L'AI accelera il lavoro ripetitivo; il ragionamento, la revisione e le decisioni architetturali restano tuoi.

> Attenzione: accettare tutto il codice generato senza leggerlo e' come firmare un documento che non hai letto. Prima o poi qualcosa andra' storto.

---

## 2. Tipi di strumenti AI

Esistono molti strumenti AI per lo sviluppo software. Invece di imparare un prodotto specifico, e' piu' utile conoscere le **categorie** e capire quando usarle.

| Categoria                    | Cosa fa                                                   | Quando usarla                                                                |
| ---------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Autocompletamento inline** | Suggerisce codice mentre scrivi, riga per riga            | Scrittura rapida di codice ripetitivo, completamento di pattern noti         |
| **Chat nell'editor**         | Risponde a domande con contesto del file aperto           | Spiegazioni, domande su codice specifico, piccole correzioni                 |
| **Chat web**                 | Conversazione generica, senza accesso diretto al progetto | Spiegazioni teoriche, brainstorming, prompt con codice incollato manualmente |
| **Agenti**                   | Esegue modifiche su piu' file in autonomia su istruzione  | Scaffold di feature, refactoring multi-file, implementazioni guidate         |

> Nota: i nomi dei prodotti cambiano rapidamente. La tabella sopra descrive **categorie** di strumenti. Il tuo istituto o azienda potrebbe usare qualsiasi combinazione di questi — il metodo che imparerai qui funziona con tutti.

### Come scegliere l'approccio giusto

| Compito                                            | Approccio consigliato                                  |
| -------------------------------------------------- | ------------------------------------------------------ |
| "Spiegami questo componente"                       | Chat (web o editor) con il codice incollato            |
| "Completa questa riga di codice"                   | Autocompletamento inline                               |
| "Crea DoctorBox seguendo il pattern di PatientBox" | Chat con contesto + revisione manuale                  |
| "Implementa tutta la sezione Doctors"              | Agente, con brief dettagliato e checklist di revisione |

---

## 3. Il flusso di lavoro universale: Pair Programming con l'AI

Indipendentemente dallo strumento che usi, il flusso di lavoro efficace segue sempre gli stessi passi:

```
Contesto → Prompt → Output → Revisione → Integrazione
```

### Passo 1: Fornire contesto

Prima di chiedere qualsiasi cosa all'AI, prepara il terreno:

- Allega o incolla il file [`assets/contesto-progetto.md`](./assets/contesto-progetto.md)
- Indica il file di riferimento da cui copiare il pattern (es. `PatientBox` per creare `DoctorBox`)
- Specifica vincoli tecnici (tipi da usare, import obbligatori, cosa evitare)

### Passo 2: Scrivere un prompt specifico

Un prompt vago produce codice vago. Un prompt preciso produce codice utile. Vedremo come nella [sezione 5](#5-scrivere-prompt-efficaci-per-il-frontend).

### Passo 3: Ricevere l'output

L'AI restituisce codice, spiegazioni o entrambi. **Non copiare e incollare subito.** Leggi prima tutto l'output.

### Passo 4: Revisione umana

Questo e' il passo piu' importante e quello che molti saltano. Usa la [`checklist-revisione.md`](./assets/checklist-revisione.md) per verificare sistematicamente il codice.

### Passo 5: Integrazione

Solo dopo la revisione, integra il codice nel progetto. Se necessario, riavvia o aggiorna l'app (`npm start`), verifica nel browser e correggi eventuali problemi.

### Iterazione

Se qualcosa non funziona, torna al passo 2 con un prompt più specifico che descriva l'errore. Puoi anche integrare ulteriori dettagli o chiarimenti in un messaggio successivo per aumentare il livello di contesto nella chat attuale. Il ciclo si ripete finché il risultato non è soddisfacente.

### Adattamenti per categoria di strumento

| Categoria         | Attenzione particolare in fase di revisione                         |
| ----------------- | ------------------------------------------------------------------- |
| Autocompletamento | Controlla ogni suggerimento riga per riga prima di accettarlo       |
| Chat              | Verifica che gli import e i tipi siano corretti per il tuo progetto |
| Agenti            | Controlla **tutti** i file modificati, non solo quello principale   |

---

## 4. Dare contesto all'AI: il segreto dei buoni risultati

Il motivo piu' comune per cui l'AI produce codice inutile e' la **mancanza di contesto**. Senza sapere com'e' strutturato il tuo progetto, l'AI inventera' una struttura generica che probabilmente non si integrera' con il tuo codice.

### Il file di contesto progetto

Abbiamo preparato un file riutilizzabile con tutte le informazioni che l'AI deve conoscere:

**[`assets/contesto-progetto.md`](./assets/contesto-progetto.md)**

Contiene:

- Stack tecnologico (React, TypeScript, MUI, SCSS, OpenAPI)
- Struttura delle cartelle e path alias
- Convenzioni di codice del progetto CodyLab
- Pattern da seguire (Patients come riferimento per Doctors)
- Cosa **non** fare (axios grezzo, console.log, secret nei prompt)

### Come usarlo

A seconda dello strumento a tua disposizione:

| Strumento         | Come fornire il contesto                                |
| ----------------- | ------------------------------------------------------- |
| Chat web          | Incolla il contenuto all'inizio della conversazione     |
| Chat nell'editor  | Allega il file o incollalo nel primo messaggio          |
| Agenti            | Configuralo come file di regole/contesto del progetto   |
| Autocompletamento | Meno controllabile; compensa con revisione piu' attenta |

### Istruzioni di progetto

Molti strumenti AI permettono di configurare "regole" permanenti per un progetto (a volte chiamate rules, system prompt, istruzioni di progetto). Il concetto e' sempre lo stesso: dare all'AI informazioni che non devi ripetere a ogni prompt.

Il nostro [`contesto-progetto.md`](./assets/contesto-progetto.md) funge da questo scopo in modo **tool-agnostico**: puoi usarlo con qualsiasi assistente.

### Riferimenti a file esistenti

Quando chiedi all'AI di creare qualcosa di nuovo, indica sempre un file di riferimento:

```
Crea DoctorBox seguendo lo stesso pattern di PatientBox.
File di riferimento: src/components/Patients/PatientBox/index.tsx
File da creare: src/components/Doctors/DoctorBox/index.tsx
```

> Attenzione: se non specifichi un riferimento, l'AI potrebbe inventare una struttura diversa da quella del progetto. Risultato: codice che compila forse, ma non si integra con il resto dell'app.

---

## 5. Scrivere prompt efficaci per il frontend

Un buon prompt risponde a quattro domande. Usiamo la formula **RACI** adattata:

| Lettera                   | Significato               | Esempio                                                                                                             |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **R**uolo                 | Chi deve "fare" l'AI      | "Sei uno sviluppatore frontend senior"                                                                              |
| **A**zione                | Cosa deve fare            | "Crea il componente DoctorBox"                                                                                      |
| **C**ontesto              | Informazioni sul progetto | Stack, file di riferimento, DTO (Data Transfer Object, oggetto che rappresenta i dati scambiati con l'API) da usare |
| **I**struzioni vincolanti | Regole da rispettare      | "Non usare axios diretto", "Usa DetailType.DOCTOR"                                                                  |

### Prompt deboli vs prompt forti

| Prompt debole                      | Problema                                | Prompt forte                                                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Crea un componente per i dottori" | Troppo vago, nessun contesto            | "Crea DoctorBox in `src/components/Doctors/DoctorBox/index.tsx` seguendo il pattern di `PatientBox`. Usa `DoctorDTO`, `DetailType.DOCTOR`, `generateAvatarImage` e `getDetailPath(DOCTORS_PATH, doctor.id)`" |
| "Fix this error"                   | Nessun codice, nessun contesto          | "Errore TS2345 in `DoctorBox/index.tsx` riga 32: `doctor.id` e' `number` ma `generateAvatarImage` si aspetta `number`. Ecco il codice: [incolla]. Correggi senza cambiare la logica"                         |
| "Spiega React"                     | Troppo generico, non legato al progetto | "Analizza `src/components/Patients/index.tsx` e spiega come funziona il caricamento della lista con `useGetList` e il filtro con `useReducer`"                                                               |
| "Fai tutta la sezione doctors"     | Troppo ampio, output incontrollabile    | "Implementa solo `Doctors/index.tsx` seguendo `Patients/index.tsx`. Usa `api.doctors.getListDoctor`, `useGetList`, `DoctorFilterDTO`. Mostra solo questo file"                                               |

### Template pronti all'uso

Nel file [`assets/prompt-esempio.md`](./assets/prompt-esempio.md) trovi template copiabili per i casi piu' comuni:

1. Spiegare un componente esistente
2. Creare un nuovo componente
3. Integrare una chiamata API
4. Correggere un errore TypeScript
5. Revisionare codice generato

Sostituisci i placeholder `{{doppie_parentesi}}` con i valori del tuo compito.

### Consigli pratici

- **Un compito per prompt**: non chiedere "crea tutto" in un colpo solo
- **Includi il codice di riferimento**: incolla o allega il file da cui copiare il pattern
- **Specifica cosa NON fare**: spesso piu' utile che dire cosa fare
- **Chiedi spiegazioni**: "spiega perche' hai scelto questo approccio" ti aiuta a imparare
- **Itera**: il primo output raramente e' perfetto; affina il prompt con feedback specifico

---

## 6. Revisione critica del codice generato

L'AI puo' produrre codice che _sembra_ corretto ma contiene errori sottili: tipi sbagliati, import inesistenti, pattern incoerenti con il progetto. La revisione umana non e' opzionale.

### La checklist obbligatoria

Prima di considerare finito qualsiasi codice generato con l'AI, completa la checklist in:

**[`assets/checklist-revisione.md`](./assets/checklist-revisione.md)**

Le aree principali da verificare:

| Area          | Cosa controllare                                              |
| ------------- | ------------------------------------------------------------- |
| Comprensione  | Hai letto e capito tutto il codice?                           |
| TypeScript    | Compila senza errori? Tipi da `@generated/axios`?             |
| Import        | Alias corretti (`@components`, `@lib`, ecc.)?                 |
| React/MUI     | Componenti funzionali, hooks, immutabilita', key nelle liste? |
| Coerenza      | Confrontato con il componente di riferimento equivalente?     |
| Sicurezza     | Nessun `console.log`, secret o dato sensibile?                |
| Funzionalita' | L'app si avvia e la feature funziona nel browser?             |

### Confronto con il codebase

Il modo piu' efficace per trovare problemi e' il **confronto diretto**:

1. Apri il componente di riferimento (es. `PatientBox`)
2. Apri il componente generato (es. `DoctorBox`)
3. Verifica che struttura, import, pattern e stile siano coerenti
4. Segnala le differenze: alcune sono intenzionali, altre sono errori

### Errori comuni dell'AI su questo progetto

| Errore                        | Perche' succede                                  | Come correggere                                             |
| ----------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| Usa `fetch` o `axios` diretto | Pattern generico, non conosce il client generato | Sostituire con `api.doctors.getListDoctor` da `@config/api` |
| Ridefinisce i tipi DTO        | Non sa che esistono in `@generated/axios`        | Importare `DoctorDTO` da `@generated/axios`                 |
| Import relativi lunghi        | Pattern generico senza alias                     | Usare `@components`, `@lib`, ecc.                           |
| Muta lo stato in-place        | Non rispetta l'immutabilita' del progetto        | Usare spread operator o metodi che restituiscono copie      |
| Inventa props o metodi API    | Allucinazione                                    | Verificare in `src/generated/axios/api.ts`                  |

### Regola d'oro

> **Non committare codice che non hai capito.**
> L'AI accelera il lavoro, ma la responsabilita' del codice e' sempre tua.

---

## 7. Etica, limiti e responsabilita

### L'AI non impara al posto tuo

Usare l'AI per completare esercizi senza capire il risultato e' come copiare i compiti: sembra funzionare a breve termine, ma non sviluppi le competenze necessarie. L'obiettivo di questo modulo e' imparare a usare l'AI come **acceleratore**, non come scorciatoia.

### Dati sensibili nei prompt

Non inserire mai nei prompt dell'AI:

- Password, token, chiavi API
- Dati personali reali (nomi, email, numeri di telefono di persone vere)
- Codice proprietario di altre aziende senza autorizzazione

I prompt possono essere usati per migliorare i modelli AI. Tratta ogni conversazione come potenzialmente non privata.

### Quando chiedere aiuto al docente

L'AI e' un ottimo assistente, ma non sostituisce il docente. Chiedi aiuto umano quando:

- Non capisci un concetto fondamentale (es. "cos'e un hook?")
- L'AI ti ha dato risposte contraddittorie piu' volte
- Stai prendendo una decisione architetturale importante
- Sospetti un problema di sicurezza

### Trasparenza sull'uso dell'AI

Nel contesto accademico e professionale, e' buona pratica dichiarare quando hai usato l'AI:

- **A scuola**: chiedi al docente quali sono le regole del tuo istituto
- **In azienda**: segui le policy interne sull'uso dell'AI
- **In generale**: anche se non e' obbligatorio, sapere _cosa_ hai generato e _cosa_ hai scritto tu aiuta a crescere

---

## Esercizi pratici

Gli esercizi sono collegati alla TO DO LIST del progetto finale in [`readme.md`](../../readme.md).
Usa il brief dettagliato in [`esercizi/doctors-list-brief.md`](./esercizi/doctors-list-brief.md).

Prima di ogni esercizio, allega [`assets/contesto-progetto.md`](./assets/contesto-progetto.md) al tuo assistente AI.

### Esercizio 1 — Analisi di un componente esistente (30 min)

**Obiettivo:** usare l'AI per capire come funziona un componente gia' implementato, senza modificare codice.

**Procedura:**

1. Apri `src/components/Patients/PatientBox/index.tsx`
2. Usa il template "Spiegare un componente esistente" da [`assets/prompt-esempio.md`](./assets/prompt-esempio.md)
3. Chiedi all'AI di analizzare il componente e identificare i pattern riusabili

**Output atteso (scrivilo a mano o in un file di testo):**

- Elenco degli import e a cosa servono
- Come sono strutturate le props
- Quali utility del progetto vengono usate (`generateAvatarImage`, `getDetailPath`, ecc.)
- Quali pattern MUI vengono usati (Card, Grid, Avatar, Link)
- Cosa cambieresti per adattarlo a un'altra entita' (es. Doctors)

**Nessuna modifica al codice.** Questo esercizio serve a imparare a _leggere_ con l'aiuto dell'AI.

### Esercizio 2 — Creare o revisionare DoctorBox con AI supervisionata (1–1,5h)

**Obiettivo:** usare l'AI per creare (o revisionare) il componente `DoctorBox` seguendo il pattern di `PatientBox`.

**Procedura:**

1. Leggi il brief in [`esercizi/doctors-list-brief.md`](./esercizi/doctors-list-brief.md)
2. Usa il template "Creare un nuovo componente" da [`assets/prompt-esempio.md`](./assets/prompt-esempio.md)
3. Se `DoctorBox` esiste gia' nel repository, chiedi all'AI di **revisionarlo** confrontandolo con il brief e con `PatientBox`
4. Applica le correzioni necessarie
5. Completa la [`checklist-revisione.md`](./assets/checklist-revisione.md)

**Checklist:**

- [ ] Componente in `src/components/Doctors/DoctorBox/index.tsx`
- [ ] Usa `DetailType.DOCTOR` e `generateAvatarImage`
- [ ] Link al dettaglio con `getDetailPath(DOCTORS_PATH, doctor.id)`
- [ ] Stili e struttura coerenti con `PatientBox`
- [ ] Revisione manuale completata con checklist
- [ ] Sai spiegare a voce cosa fa il componente

### Esercizio 3 — Integrare la lista Doctors con AI (1–1,5h)

**Obiettivo:** usare l'AI per implementare (o verificare) la pagina lista `Doctors/index.tsx` con filtro e caricamento API.

**Procedura:**

1. Studia `src/components/Patients/index.tsx` come riferimento
2. Usa il template "Integrare una chiamata API" da [`assets/prompt-esempio.md`](./assets/prompt-esempio.md)
3. Vincolo fondamentale: usare `api.doctors.getListDoctor` da `@config/api`, **non** fetch o axios diretto
4. Integra il codice, avvia `npm start` e verifica nel browser

**Verifica:**

1. Navigare a `/doctors` — la lista si carica
2. Il filtro aggiorna i risultati
3. Cliccare su un dottore apre la pagina di dettaglio
4. Nessun errore TypeScript in console

### Esercizio extra (da fare a casa) — Debug guidato dall'AI

**Obiettivo:** imparare a usare l'AI per diagnosticare errori, non solo per generare codice.

**Procedura:**

1. Introduci un bug voluto nel codice (es. un tipo sbagliato, un import mancante) oppure usa un errore reale che hai incontrato
2. Usa il template "Correggere un errore TypeScript" da [`assets/prompt-esempio.md`](./assets/prompt-esempio.md)
3. Valuta se la soluzione proposta dall'AI e' corretta
4. Documenta in un file di testo (5-10 righe):
   - Il prompt che hai usato
   - Se l'AI ha commesso errori (es. ha inventato un metodo inesistente)
   - La soluzione finale e perche' funziona

---

## Risorse utili

### Prompt engineering (generico)

- [Anthropic — Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI — Best practices for prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering)

### File di questa lezione

- [`assets/contesto-progetto.md`](./assets/contesto-progetto.md) — Contesto CodyLab da allegare ai prompt
- [`assets/prompt-esempio.md`](./assets/prompt-esempio.md) — Template prompt riutilizzabili
- [`assets/checklist-revisione.md`](./assets/checklist-revisione.md) — Checklist revisione codice
- [`esercizi/doctors-list-brief.md`](./esercizi/doctors-list-brief.md) — Brief esercizi Doctors

### Approfondimenti (opzionale)

Se il tuo istituto o azienda adotta uno strumento AI specifico, consulta la sua documentazione ufficiale per dettagli su come configurare regole di progetto, allegare file e usare agenti. I concetti di questa lezione si applicano a qualsiasi strumento.

---

## Riepilogo

In questo modulo extra abbiamo visto come usare l'intelligenza artificiale nello sviluppo frontend in modo responsabile:

- Un **LLM** genera testo che assomiglia al codice, ma non "capisce" il tuo progetto: serve contesto e revisione
- Gli strumenti AI si dividono in **categorie** (autocompletamento, chat, agenti): ognuna ha un uso appropriato
- Il flusso di lavoro efficace e' sempre: **contesto → prompt → output → revisione → integrazione**
- Un buon prompt segue la formula **RACI**: Ruolo, Azione, Contesto, Istruzioni vincolanti
- La **revisione umana** e' obbligatoria: usa la checklist prima di integrare qualsiasi codice
- L'AI e' un **assistente**, non un sostituto: la responsabilita' del codice e' sempre tua

Ora puoi applicare questi concetti per completare il progetto finale CodyLab. Usa l'AI per accelerare il lavoro sulla TO DO LIST in [`readme.md`](../../readme.md), ma ricorda: ogni riga di codice che committi deve passare dalla tua revisione critica.

Buon lavoro!
