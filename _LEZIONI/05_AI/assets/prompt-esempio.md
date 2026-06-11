# Template prompt riutilizzabili

Copia e adatta questi template nel tuo assistente AI.
Sostituisci i placeholder tra `{{doppie_parentesi}}` con i valori reali.

Prima di ogni prompt, allega o incolla il contenuto di [`contesto-progetto.md`](./contesto-progetto.md).

---

## 1. Spiegare un componente esistente

```
Ruolo: Sei un tutor di sviluppo frontend React/TypeScript.

Azione: Analizza il componente {{nome_componente}} e spiegami:
1. Quali props riceve e come sono tipizzate
2. Quali librerie e utility importa
3. Come gestisce la navigazione e i dati
4. Quali pattern posso riusare per un componente simile

Contesto:
- Progetto: CodyLab Rookie (applicazione ospedaliera React + MUI + TypeScript)
- File da analizzare: {{percorso_file}}
- Componente di riferimento per confronto: {{componente_riferimento}} ({{percorso_riferimento}})

Istruzioni vincolanti:
- Rispondi in italiano
- Cita i nomi esatti di import, hook e utility usati nel file
- Non proporre modifiche al codice, solo spiegazione
```

---

## 2. Creare un nuovo componente

```
Ruolo: Sei uno sviluppatore frontend senior che lavora su un progetto React/TypeScript esistente.

Azione: Crea il componente {{nome_componente}} seguendo lo stesso pattern di {{componente_riferimento}}.

Contesto:
- Stack: React, TypeScript, MUI, SCSS
- Percorso output: {{percorso_output}}
- File di riferimento: {{percorso_riferimento}}
- DTO da usare: {{nome_dto}} da @generated/axios
- Path costante: {{path_costante}} da @config/paths

Istruzioni vincolanti:
- Usa componenti funzionali con TypeScript
- Importa i tipi da @generated/axios, non ridefinirli
- Usa generateAvatarImage e getDetailPath da @lib/utils
- Usa DetailType.{{tipo}} da @lib/types
- Usa MUI Grid con size={4} per il layout a card
- Non aggiungere console.log
- Non usare fetch o axios direttamente
- Mostra il codice completo del file index.tsx
```

---

## 3. Integrare una chiamata API

```
Ruolo: Sei uno sviluppatore frontend che integra API REST in un'app React esistente.

Azione: Implementa la pagina lista per l'entita' {{entita}} con filtro e caricamento dati.

Contesto:
- File di riferimento: {{percorso_riferimento}} (stessa struttura per {{entita}})
- API method: api.{{modulo}}.{{metodo}} da @config/api
- Hook da usare: useGetList da @hooks/useGetList
- Filter DTO: {{filter_dto}} da @generated/axios
- Reducer filtro: gia' presente in {{percorso_lib}}

Istruzioni vincolanti:
- Usa useReducer per il filtro con Context Provider (come nel riferimento)
- Mostra CircularProgress durante il caricamento
- Mappa i risultati su componenti {{box_componente}}
- Non reinventare la logica di fetch: usa useGetList
- Mostra solo i file da creare o modificare, con il codice completo
```

---

## 4. Correggere un errore TypeScript

```
Ruolo: Sei un debugger TypeScript esperto.

Azione: Aiutami a risolvere questo errore senza cambiare la logica dell'applicazione.

Contesto:
- Errore: {{messaggio_errore}}
- File: {{percorso_file}}
- Riga: {{numero_riga}}

Codice attuale:
{{incolla_codice}}

Istruzioni vincolanti:
- Spiega la causa dell'errore in modo semplice
- Proponi la correzione minima necessaria
- Non refactorare codice non correlato all'errore
- Verifica che i tipi usati esistano in @generated/axios
```

---

## 5. Revisione del codice generato

```
Ruolo: Sei un code reviewer esperto di React e TypeScript.

Azione: Revisiona il codice che ho generato con l'AI e segnala problemi.

Contesto:
- Progetto: CodyLab Rookie (vedi contesto-progetto.md allegato)
- File da revisionare: {{percorso_file}}
- Componente di riferimento corretto: {{percorso_riferimento}}

Codice da revisionare:
{{incolla_codice}}

Istruzioni vincolanti:
- Controlla: tipi TypeScript, import corretti, convenzioni MUI, immutabilita'
- Segnala ogni problema con gravita' (alta/media/bassa) e correzione suggerita
- Non riscrivere tutto: indica solo cosa va corretto e perche'
```
