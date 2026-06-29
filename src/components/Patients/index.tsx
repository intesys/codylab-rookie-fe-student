import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PatientFilterDTO } from "@generated/axios";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { Action, patientsFilterReducer } from "./lib";
import NewPatient from "./newPatient"; // Make sure this path exactly matches your filename

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

  // State to toggle between database filters and adding a new patient
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Common input styling for reuse
  const inputStyle = {
    padding: "10px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "0.875rem",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
  };

  // If "+ ADD PATIENT" is clicked, render the form layout instead
  if (isAddingNew) {
    return <NewPatient onBack={() => setIsAddingNew(false)} />;
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
        <h3 style={{ margin: 0, fontWeight: "bold", fontSize: "1.25rem" }}> PATIENTS DATABASE </h3>

        <button
          onClick={() => setIsAddingNew(true)}
          style={{
            backgroundColor: "white",
            color: "red",
            border: "1px solid red",
            padding: "8px 16px",
            fontWeight: "600",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          + ADD PATIENT
        </button>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "6px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "24px" }}>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "bold", color: "#1f2937" }}>PATIENT FILTERS</h3>
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#6b7280" }}>
            Fill in the fields below to search the patient database
          </p>
        </div>

        {/* Section 1: System Identifiers */}
        <h4
          style={{
            margin: "0 0 12px 0",
            fontSize: "0.9rem",
            color: "#4b5563",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Identifiers
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label style={labelStyle}>Patient ID (PID)</label>
            <input type="text" placeholder="e.g. PID-12345" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Outpatient Number (OPD)</label>
            <input type="text" placeholder="e.g. OPD-9876" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Inpatient Number (IPD)</label>
            <input type="text" placeholder="e.g. IPD-5432" style={inputStyle} />
          </div>
        </div>

        {/* Section 2: Personal Information (Updated grid columns size to fit 5 fields nicely) */}
        <h4
          style={{
            margin: "0 0 12px 0",
            fontSize: "0.9rem",
            color: "#4b5563",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Personal Details
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label style={labelStyle}>First Name</label>
            <input type="text" placeholder="John" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input type="text" placeholder="Doe" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input type="date" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Gender</label>
            <select style={inputStyle} defaultValue="">
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Blood Group Filter Dropdown */}
          <div>
            <label style={labelStyle}>Blood Group</label>
            <select style={inputStyle} defaultValue="">
              <option value="">All Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <h4
          style={{
            margin: "0 0 12px 0",
            fontSize: "0.9rem",
            color: "#4b5563",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Contact Info
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <label style={labelStyle}>Phone Number</label>
            <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input type="email" placeholder="john.doe@example.com" style={inputStyle} />
          </div>
        </div>

        {/* Search Action Row */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
          <button
            style={{
              color: "white",
              border: "1px solid red",
              backgroundColor: "red",
              padding: "12px 36px",
              fontWeight: "600",
              fontSize: "0.875rem",
              cursor: "pointer",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
          >
            Search Database
          </button>
        </div>
      </div>
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
