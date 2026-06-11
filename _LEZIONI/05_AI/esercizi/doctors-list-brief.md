# Brief esercizio: sezione Doctors

Usa questo documento come contesto da allegare al tuo assistente AI
durante gli esercizi 2 e 3 della lezione 05.

---

## Obiettivo

Completare (o verificare e migliorare) la sezione **Doctors** dell'applicazione CodyLab,
seguendo lo stesso pattern gia' implementato per **Patients**.

## File di riferimento (da studiare prima)

| Cosa implementare | File di riferimento (Patients) |
|-------------------|-------------------------------|
| Lista con filtro | `src/components/Patients/index.tsx` |
| Card anteprima | `src/components/Patients/PatientBox/index.tsx` |
| Form filtro | `src/components/Patients/FiltersForm/index.tsx` |
| Reducer filtro | `src/components/Patients/lib.ts` |
| Dettaglio | `src/components/Patient/index.tsx` |
| Form creazione/modifica | `src/components/Patient/PatientForm/index.tsx` |

## File target (Doctors)

| Componente | Percorso |
|------------|----------|
| Lista dottori | `src/components/Doctors/index.tsx` |
| Card anteprima | `src/components/Doctors/DoctorBox/index.tsx` |
| Form filtro | `src/components/Doctors/FiltersForm/index.tsx` |
| Reducer filtro | `src/components/Doctors/lib.ts` |
| Dettaglio dottore | `src/components/Doctor/index.tsx` |
| Form dottore | `src/components/Doctor/DoctorForm/index.tsx` |

## Requisiti funzionali — DoctorBox

- [ ] Componente in `src/components/Doctors/DoctorBox/index.tsx`
- [ ] Riceve `doctor: DoctorDTO` tramite props (stesso pattern di PatientBox)
- [ ] Mostra avatar con `generateAvatarImage(DetailType.DOCTOR, doctor.id)`
- [ ] Mostra nome, cognome e professione del dottore
- [ ] Mostra telefono ed email (se presenti) con icone MUI
- [ ] Mostra lista `latestPatients` con avatar paziente
- [ ] Link al dettaglio con `getDetailPath(DOCTORS_PATH, doctor.id)`
- [ ] Usa `Card`, `CardActionArea`, `Grid` MUI come in PatientBox
- [ ] Attributo `data-cy="doctor-item"` per i test Cypress

## Requisiti funzionali — Lista Doctors

- [ ] Pagina in `src/components/Doctors/index.tsx`
- [ ] Breadcrumb con voce "Doctors"
- [ ] SectionHeader con titolo "Doctors database" e bottone "Add new doctor"
- [ ] Form filtro collegato al reducer (`DoctorsFilterContext`)
- [ ] Caricamento lista con `useGetList(api.doctors.getListDoctor, filter)`
- [ ] Spinner (`CircularProgress`) durante il caricamento
- [ ] Griglia a 3 colonne (`Grid size={4}`) con `DoctorBox` per ogni dottore
- [ ] Attributo `data-cy="doctors-list"` sulla griglia

## Vincoli tecnici

- Tipi: `DoctorDTO`, `DoctorFilterDTO` da `@generated/axios`
- API: `api.doctors.getListDoctor` da `@config/api` (non axios/fetch diretto)
- Path: `DOCTORS_PATH` da `@config/paths`
- Hook: `useGetList` da `@hooks/useGetList`
- Import con alias (`@components`, `@lib`, `@config`, ecc.)
- Nessun `console.log` nel codice finale
- Codice in inglese (nomi variabili, commenti, label UI)

## Verifica finale

1. `npm start` — l'app si avvia senza errori TypeScript
2. Navigare a `/doctors` — la lista si carica
3. Cliccare su un dottore — si apre la pagina di dettaglio
4. Il filtro aggiorna la lista
5. Completare la [`checklist-revisione.md`](../assets/checklist-revisione.md)

## Nota per chi ha gia' il codice

Se `DoctorBox` o la lista Doctors sono gia' presenti nel repository,
usa l'AI per **revisionare** il codice esistente confrontandolo con questo brief
e con `PatientBox`. Correggi eventuali discrepanze e completa la checklist.
