# Contesto progetto CodyLab Rookie - Front-end

Usa questo file come contesto da allegare ai prompt del tuo assistente AI.
Puoi incollarlo all'inizio di una conversazione, configurarlo come file di regole
del progetto, o allegarlo come riferimento negli esercizi.

---

## Stack tecnologico

- **Framework:** React (componenti funzionali e hooks)
- **Linguaggio:** TypeScript (strict mode)
- **UI:** Material-UI (MUI) v6
- **Styling:** SCSS (Sass)
- **Routing:** React Router
- **API:** Client OpenAPI generato in `src/generated/axios` (non usare fetch/Axios grezzo)
- **Testing:** Cypress (E2E), Jest (unit)
- **Build:** Parcel
- **Mock API:** MSW (Mock Service Worker) in `src/mocks`

## Struttura cartelle

```
src/
├── components/     # Componenti organizzati per feature (Patients, Doctors, ...)
├── config/         # Configurazione (api, paths, regex, date)
├── context/        # React Context providers
├── generated/      # Client API generato da OpenAPI (non modificare a mano)
├── hooks/          # Custom hooks riutilizzabili (useGetList, useGetDetail, ...)
├── lib/            # Utility e tipi condivisi
├── mocks/          # Handler MSW per mock API
└── assets/         # Immagini e stili globali
```

## Path alias (import)

Usa sempre gli alias configurati in `tsconfig.json`:

| Alias | Percorso |
|-------|----------|
| `@components/*` | `components/*` |
| `@config/*` | `config/*` |
| `@hooks/*` | `hooks/*` |
| `@lib/*` | `lib/*` |
| `@generated/*` | `generated/*` |
| `@context/*` | `context/*` |
| `@mocks/*` | `mocks/*` |
| `@assets/*` | `assets/*` |

## Convenzioni di codice

- Componenti funzionali con `React.FC` o `FC`
- Un componente per cartella con `index.tsx` come entry point
- Props tipizzate con `interface` o `type` (es. `IProps`)
- Stato immutabile: non mutare oggetti/array in-place, usa spread o metodi che restituiscono copie
- API accessibili tramite `api` da `@config/api`:

```typescript
import { api } from "@config/api";

// Esempi
api.patients.getListPatient(...)
api.patients.getPatient(id, ...)
api.doctors.getListDoctor(...)
api.doctors.getDoctor(id, ...)
api.patientRecords.createPatientRecord(...)
```

- Path delle rotte da `@config/paths` (es. `PATIENTS_PATH`, `DOCTORS_PATH`)
- Utility di navigazione da `@lib/utils` (es. `getDetailPath`, `getNewDetailPath`, `generateAvatarImage`)
- Tipi DTO da `@generated/axios` (es. `PatientDTO`, `DoctorDTO`, `PatientFilterDTO`)

## Pattern da seguire

Per implementare una nuova entita' (es. Doctors), usa **Patients** come riferimento:

| Patients (riferimento) | Doctors (da completare) |
|------------------------|-------------------------|
| `src/components/Patients/index.tsx` | `src/components/Doctors/index.tsx` |
| `src/components/Patients/PatientBox/` | `src/components/Doctors/DoctorBox/` |
| `src/components/Patients/FiltersForm/` | `src/components/Doctors/FiltersForm/` |
| `src/components/Patient/` (dettaglio) | `src/components/Doctor/` (dettaglio) |
| `src/components/Patients/lib.ts` (reducer filtro) | `src/components/Doctors/lib.ts` |

Hook riutilizzabili:

- `useGetList(apiMethod, filter)` per le liste con filtro
- `useGetDetail(apiMethod, emptyRecord, id)` per i dettagli

Layout condiviso:

- `Breadcrumb`, `SectionHeader`, `DetailHeader` da `@components/Layout/`
- Griglia MUI con `Grid container spacing={2}` e `Grid size={4}` per le card

## Cosa NON fare

- Non usare `fetch` o `axios` direttamente se esiste il metodo nel client generato
- Non modificare file in `src/generated/` (si rigenerano con `npm run build:api`)
- Non inserire `console.log` nel codice di produzione
- Non hardcodare secret, token o credenziali
- Non incollare dati sensibili (password, dati personali reali) nei prompt dell'AI
- Non committare codice che non hai compreso e verificato

## Comandi utili

```bash
npm ci              # Installa dipendenze
npm start           # Avvia il server di sviluppo
npm run build:api   # Rigenera il client API da api.yml
npm run build       # Build di produzione
```

## Backend

Il frontend si aspetta un backend sulla porta **8090**.
Repository: [codylab-rookie-be](https://github.com/intesys/codylab-rookie-be)
