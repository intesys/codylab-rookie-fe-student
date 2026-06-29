import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PatientApiApi, PatientDTO, PatientFilterDTO } from "@generated/axios";
import React, { Dispatch, useEffect, useMemo, useReducer, useState } from "react";
import { Action, patientsFilterReducer } from "./lib";
import NewPatient, { IFormState } from "./newPatient"; // Importiamo l'interfaccia IFormState

const patientApi = new PatientApiApi();

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (_action) => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patientsList, setPatientsList] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [pidInput, setPidInput] = useState<string>("");
  const [opdInput, setOpdInput] = useState<string>("");
  const [idpInput, setIdpInput] = useState<string>("");

  const [view, setView] = useState<"list" | "new">("list");

  // Funzione per caricare i pazienti dal DB
  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await patientApi.getListPatient(0, 100, "", filter);
      setPatientsList(response.data || []);
    } catch (err: any) {
      console.log("Errore nel recupero dei pazienti:", err.response?.data || err);
      setError("Impossibile caricare i pazienti dal database.");
    } finally {
      setLoading(false);
    }
  };

  // Hook che scatta quando cambia il filtro
  useEffect(() => {
    fetchPatients();
  }, [filter]);

  // Nuova funzione per salvare il paziente sul database
  const handleCreatePatient = async (formData: IFormState) => {
    try {
      // Prepariamo l'oggetto come lo vuole il backend.
      // NOTA: adatta questi nomi ai campi effettivi del tuo PatientDTO
      const newPatientData = {
        name: `${formData.name} ${formData.surname}`,
        address: formData.address,
        opd: Number(formData.opd),
        idp: Number(formData.idp),
        bloodGroup: formData.bloodGroup,
        isChronic: formData.isChronic,
        notes: formData.notes,
      };

      // Chiamata POST al database.
      // IMPORTANTE: "createPatient" potrebbe chiamarsi diversamente nella tua API generata (es: addPatient, postPatient)
      await patientApi.createPatient(newPatientData as PatientDTO);

      alert("Paziente salvato con successo!");

      // Torniamo alla vista lista
      setView("list");

      // Forziamo il ricaricamento della lista chiamando la fetch manualmente o svuotando i filtri
      fetchPatients();
    } catch (err: any) {
      console.error("Errore durante il salvataggio:", err.response?.data || err);
      alert("Errore: impossibile salvare il paziente nel database.");
      throw err; // Lanciamo l'errore per farlo gestire a NewPatient se necessario
    }
  };

  const handleSearch = () => {
    dispatch({
      type: "SET_FILTER",
      payload: {
        id: pidInput ? Number(pidInput) : undefined,
        opd: opdInput ? Number(opdInput) : undefined,
        idp: idpInput ? Number(idpInput) : undefined,
      },
    });
  };

  if (view === "new") {
    // Passiamo la nuova funzione handleCreatePatient come prop onSave
    return <NewPatient onBack={() => setView("list")} onSave={handleCreatePatient} />;
  }

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "1.25rem" }}> PATIENTS DATABASE </h2>
        <button
          onClick={() => setView("new")}
          style={{
            backgroundColor: "white",
            color: "red",
            border: "1px solid red",
            padding: "6px 12px",
            cursor: "pointer",
            fontWeight: "600",
            borderRadius: "4px",
          }}
        >
          + ADD NEW PATIENT
        </button>
      </div>

      {/* Il resto del tuo codice per la visualizzazione e la ricerca (lista pazienti) rimane identico */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>FIND A PATIENT</h3>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280" }}>Insert the information of patient</p>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Patient ID (PID)"
            value={pidInput}
            onChange={(e) => setPidInput(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <input
            type="text"
            placeholder="Outpatient Number (OPD)"
            value={opdInput}
            onChange={(e) => setOpdInput(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <input
            type="text"
            placeholder="Inpatient Number (IDP)"
            value={idpInput}
            onChange={(e) => setIdpInput(e.target.value)}
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <button
            onClick={handleSearch}
            style={{
              color: "red",
              border: "1px solid red",
              backgroundColor: "white",
              padding: "10px 28px",
              fontWeight: "600",
              fontSize: "0.75rem",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            SEARCH
          </button>
        </div>
      </div>

      {loading && <p style={{ marginTop: "30px", textAlign: "center" }}>Caricamento in corso...</p>}
      {error && <p style={{ marginTop: "30px", color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          {patientsList.length === 0 ? (
            <p style={{ color: "#6b7280", gridColumn: "1 / -1", textAlign: "center" }}>Nessun paziente trovato.</p>
          ) : (
            patientsList.map((patient: PatientDTO) => (
              <div
                key={patient.id}
                style={{
                  backgroundColor: "white",
                  padding: "30px 20px",
                  borderRadius: "5px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 style={{ margin: "0 0 10px 0", fontSize: "1.25rem", color: "#111827", fontWeight: "bold" }}>
                  {patient.name || "N/A"}
                </h2>
                <p style={{ margin: "0 0 20px 0", fontSize: "0.85rem", color: "#4b5563" }}>
                  PID: <strong>{patient.id}</strong> | OPD: <strong>{patient.opd}</strong> | IDP:{" "}
                  <strong>{patient.idp}</strong>
                </p>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  👤
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
