# Checklist di revisione del codice generato dall'AI

Questa è una checklist di esempio: usala **prima** di considerare finito qualsiasi codice prodotto con l'assistenza di un tool AI. Ogni voce deve essere verificata manualmente da te, ma ricorda che possono servire anche altri controlli specifici secondo il contesto e il tuo progetto.

---

## Comprensione

- [ ] Ho letto tutto il codice generato riga per riga
- [ ] So spiegare a voce cosa fa ogni parte principale del codice
- [ ] Ho capito perche' l'AI ha fatto certe scelte (import, struttura, tipi)

## TypeScript

- [ ] Nessun errore di compilazione (`npm start` parte senza errori TS)
- [ ] I tipi DTO provengono da `@generated/axios`, non sono ridefiniti a mano
- [ ] Le props del componente sono tipizzate correttamente
- [ ] Non ci sono `any` non necessari

## Import e convenzioni progetto

- [ ] Gli import usano gli alias (`@components`, `@lib`, `@config`, ecc.)
- [ ] Il client API e' importato da `@config/api`, non axios/fetch diretto
- [ ] I path delle rotte usano le costanti da `@config/paths`
- [ ] Le utility usano `@lib/utils` (es. `getDetailPath`, `generateAvatarImage`)

## React e MUI

- [ ] Il componente e' funzionale (non una classe)
- [ ] Lo stato e' gestito con hooks (`useState`, `useEffect`, `useReducer`)
- [ ] I dati non vengono mutati in-place (immutabilita')
- [ ] Le liste usano `.map()` con una `key` univoca
- [ ] I componenti MUI seguono lo stile del progetto (Grid, Card, Typography, ecc.)

## Coerenza con il codebase

- [ ] Ho confrontato il codice con il componente di riferimento equivalente
- [ ] La struttura delle cartelle rispetta il pattern feature-based
- [ ] Il naming dei file e componenti e' coerente con il resto del progetto

## Sicurezza e qualita'

- [ ] Nessun `console.log` lasciato nel codice
- [ ] Nessun secret, token o credenziale hardcoded
- [ ] Nessun dato sensibile inserito nei prompt usati per generare il codice

## Funzionalita'

- [ ] L'applicazione si avvia senza errori (`npm start`)
- [ ] La funzionalita' implementata funziona nel browser
- [ ] La navigazione tra le pagine e' corretta
- [ ] I dati vengono caricati e visualizzati come previsto

## Documentazione del lavoro

- [ ] Ho annotato il prompt usato (per imparare cosa ha funzionato)
- [ ] Ho segnalato eventuali errori dell'AI (codice sbagliato, API inesistenti)
- [ ] So spiegare al docente cosa ho fatto e cosa ho revisionato

---

## Regola d'oro

> **Non committare codice che non hai capito.**
> L'AI accelera il lavoro, ma la responsabilita' del codice e' sempre tua.
