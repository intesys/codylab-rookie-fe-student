import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PatientFilterDTO } from "@generated/axios";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Action, patientsFilterReducer } from "./lib";

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

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
        <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "1.25rem" }}> PATIENTS DATABASE </h3>

        <button
          style={{
            backgroundColor: "white",
            color: "red",
            border: "1px solid red",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          + ADD PATIENT
        </button>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>PATIENT</h3>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280" }}>Insert the information of patient</p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Patient ID (PID)"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db" }}
          />

          <input
            type="text"
            placeholder="Outpatient Number (OPD)"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db" }}
          />

          <input
            type="text"
            placeholder="Inpatient Number (IDP)"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #d1d5db" }}
          />

          <button
            style={{
              color: "red",
              border: "1px solid red",
              backgroundColor: "white",
              padding: "10px 28px",
              fontWeight: "600",
              fontSize: "0.75rem",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
