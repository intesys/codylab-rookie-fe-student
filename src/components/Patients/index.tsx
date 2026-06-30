import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PatientFilterDTO } from "@generated/axios";
import React, { Dispatch, useMemo, useReducer, useState } from "react";
import { Action, patientsFilterReducer } from "./lib";

export interface Patient {
  id: string;
  pid: string;
  opd: string;
  ipd: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
}

interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext = React.createContext<IPatientsFilterContext>({
  filter: {},
  dispatch: () => {},
});

interface PatientsListProps {
  patients: Patient[];
  onAddNew: () => void;
  onEdit: (patient: Patient) => void;
  onViewDetails: (patient: Patient) => void;
}

const PatientsList: React.FC<PatientsListProps> = ({ patients, onAddNew, onEdit, onViewDetails }) => {
  const [pid, setPid] = useState("");
  const [opd, setOpd] = useState("");
  const [ipd, setIpd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const filteredPatients = patients.filter((p) => {
    return (
      p.pid.toLowerCase().includes(pid.toLowerCase()) &&
      p.opd.toLowerCase().includes(opd.toLowerCase()) &&
      p.ipd.toLowerCase().includes(ipd.toLowerCase()) &&
      p.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
      p.lastName.toLowerCase().includes(lastName.toLowerCase()) &&
      p.gender.toLowerCase().includes(gender.toLowerCase()) &&
      p.bloodGroup.toLowerCase().includes(bloodGroup.toLowerCase()) &&
      p.phone.toLowerCase().includes(phone.toLowerCase()) &&
      p.email.toLowerCase().includes(email.toLowerCase())
    );
  });

  const inputStyle: React.CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>PATIENTS DATABASE</h2>

        <button
          onClick={onAddNew}
          style={{
            background: "white",
            color: "red",
            border: "1px solid red",
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + ADD NEW PATIENT
        </button>
      </div>

      <div
        style={{
          marginTop: 20,
          border: "1px solid #ddd",
          padding: 20,
          borderRadius: 6,
          background: "#fafafa",
        }}
      >
        <h3>FIND A PATIENT</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 15,
          }}
        >
          <input placeholder="PID" value={pid} onChange={(e) => setPid(e.target.value)} style={inputStyle} />

          <input placeholder="OPD" value={opd} onChange={(e) => setOpd(e.target.value)} style={inputStyle} />

          <input placeholder="IPD" value={ipd} onChange={(e) => setIpd(e.target.value)} style={inputStyle} />

          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />

          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} style={inputStyle}>
            <option value="">Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginTop: 25,
        }}
      >
        {filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              style={{
                width: 280,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 20,
                background: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,.05)",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#007bff",
                  margin: "0 auto 15px",
                }}
              />

              <h3 style={{ textAlign: "center" }}>
                {patient.firstName} {patient.lastName}
              </h3>

              <p>PID: {patient.pid}</p>
              <p>OPD: {patient.opd}</p>
              <p>IPD: {patient.ipd}</p>
              <p>{patient.gender}</p>
              <p>{patient.bloodGroup}</p>
              <p>{patient.phone}</p>
              <p style={{ color: "red", fontSize: 13 }}>{patient.email}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 15,
                }}
              >
                <button onClick={() => onViewDetails(patient)}>View</button>

                <button onClick={() => onEdit(patient)}>Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface PatientFormProps {
  patient?: Patient | null;
  onSave: (patient: Patient) => void;
  onBack: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onBack }) => {
  const [pid, setPid] = useState(patient?.pid || "");
  const [opd, setOpd] = useState(patient?.opd || "");
  const [ipd, setIpd] = useState(patient?.ipd || "");
  const [firstName, setFirstName] = useState(patient?.firstName || "");
  const [lastName, setLastName] = useState(patient?.lastName || "");
  const [dob, setDob] = useState(patient?.dob || "");
  const [gender, setGender] = useState(patient?.gender || "");
  const [bloodGroup, setBloodGroup] = useState(patient?.bloodGroup || "");
  const [phone, setPhone] = useState(patient?.phone || "");
  const [email, setEmail] = useState(patient?.email || "");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: patient?.id || Date.now().toString(),
      pid,
      opd,
      ipd,
      firstName,
      lastName,
      dob,
      gender,
      bloodGroup,
      phone,
      email,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        margin: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <h2>{patient ? "EDIT PATIENT" : "NEW PATIENT"}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px 15px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>PID *</label>
          <input value={pid} onChange={(e) => setPid(e.target.value)} required style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>OPD</label>
          <input value={opd} onChange={(e) => setOpd(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>IPD</label>
          <input value={ipd} onChange={(e) => setIpd(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>First Name *</label>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Last Name *</label>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={inputStyle}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Blood Group</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} style={inputStyle}>
            <option value="">Select</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "500", fontSize: "14px" }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        </div>
      </div>

      <div style={{ marginTop: 25 }}>
        <button
          type="submit"
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            marginRight: 10,
            fontWeight: "bold",
          }}
        >
          SAVE
        </button>

        <button
          type="button"
          onClick={onBack}
          style={{
            background: "white",
            border: "1px solid #ccc",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          BACK
        </button>
      </div>
    </form>
  );
};

interface PatientDetailsProps {
  patient: Patient;
  onBack: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onBack }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>PATIENT DETAILS</h2>

      <div
        style={{
          display: "flex",
          gap: 25,
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 20,
          background: "#fff",
        }}
      >
        <div
          style={{
            width: 280,
            background: "#333",
            color: "white",
            padding: 20,
          }}
        >
          <h3>
            {patient.firstName} {patient.lastName}
          </h3>

          <hr style={{ borderColor: "#555" }} />

          <p>PID: {patient.pid}</p>
          <p>OPD: {patient.opd}</p>
          <p>IPD: {patient.ipd}</p>
          <p>DOB: {patient.dob}</p>
          <p>Gender: {patient.gender}</p>
          <p>Blood: {patient.bloodGroup}</p>
          <p>📞 {patient.phone}</p>
          <p style={{ color: "red" }}>✉ {patient.email}</p>

          <button
            onClick={onBack}
            style={{
              marginTop: 20,
              width: "100%",
              padding: 8,
              cursor: "pointer",
            }}
          >
            Back to List
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Medical Information</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: 8, textAlign: "left" }}>Field</th>
                <th style={{ padding: 8, textAlign: "left" }}>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ padding: 8 }}>PID</td>
                <td style={{ padding: 8 }}>{patient.pid}</td>
              </tr>

              <tr>
                <td style={{ padding: 8 }}>OPD</td>
                <td style={{ padding: 8 }}>{patient.opd}</td>
              </tr>

              <tr>
                <td style={{ padding: 8 }}>IPD</td>
                <td style={{ padding: 8 }}>{patient.ipd}</td>
              </tr>

              <tr>
                <td style={{ padding: 8 }}>Blood Group</td>
                <td style={{ padding: 8 }}>{patient.bloodGroup}</td>
              </tr>

              <tr>
                <td style={{ padding: 8 }}>Phone</td>
                <td style={{ padding: 8 }}>{patient.phone}</td>
              </tr>

              <tr>
                <td style={{ padding: 8 }}>Email</td>
                <td style={{ padding: 8 }}>{patient.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      pid: "PID-1001",
      opd: "OPD-2001",
      ipd: "IPD-3001",
      firstName: "John",
      lastName: "Doe",
      dob: "1990-04-12",
      gender: "Male",
      bloodGroup: "A+",
      phone: "555-111-2222",
      email: "john.doe@email.com",
    },
    {
      id: "2",
      pid: "PID-1002",
      opd: "OPD-2002",
      ipd: "IPD-3002",
      firstName: "Anna",
      lastName: "Smith",
      dob: "1988-07-22",
      gender: "Female",
      bloodGroup: "O+",
      phone: "555-333-4444",
      email: "anna.smith@email.com",
    },
    {
      id: "3",
      pid: "PID-1003",
      opd: "OPD-2003",
      ipd: "IPD-3003",
      firstName: "Michael",
      lastName: "Brown",
      dob: "1979-01-15",
      gender: "Male",
      bloodGroup: "B-",
      phone: "555-555-6666",
      email: "michael.brown@email.com",
    },
  ]);

  const [view, setView] = useState<"LIST" | "NEW" | "EDIT" | "DETAILS">("LIST");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleSavePatient = (savedPatient: Patient) => {
    setPatients((prev) => {
      const exists = prev.some((p) => p.id === savedPatient.id);

      if (exists) {
        return prev.map((p) => (p.id === savedPatient.id ? savedPatient : p));
      }

      return [...prev, savedPatient];
    });

    setSelectedPatient(null);
    setView("LIST");
  };

  return (
    <PatientsFilterContext.Provider value={patientsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active={view === "LIST"}>
          <span
            onClick={() => {
              setView("LIST");
              setSelectedPatient(null);
            }}
            style={{ cursor: "pointer" }}
          >
            Patients
          </span>
        </BreadcrumbEl>

        {view === "NEW" && <BreadcrumbEl active>New</BreadcrumbEl>}
        {view === "EDIT" && <BreadcrumbEl active>Edit</BreadcrumbEl>}
        {view === "DETAILS" && selectedPatient && (
          <BreadcrumbEl active>
            {selectedPatient.firstName} {selectedPatient.lastName}
          </BreadcrumbEl>
        )}
      </Breadcrumb>

      {view === "LIST" && (
        <PatientsList
          patients={patients}
          onAddNew={() => {
            setSelectedPatient(null);
            setView("NEW");
          }}
          onEdit={(patient) => {
            setSelectedPatient(patient);
            setView("EDIT");
          }}
          onViewDetails={(patient) => {
            setSelectedPatient(patient);
            setView("DETAILS");
          }}
        />
      )}

      {(view === "NEW" || view === "EDIT") && (
        <PatientForm
          patient={selectedPatient}
          onSave={handleSavePatient}
          onBack={() => {
            setSelectedPatient(null);
            setView("LIST");
          }}
        />
      )}

      {view === "DETAILS" && selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onBack={() => {
            setSelectedPatient(null);
            setView("LIST");
          }}
        />
      )}
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
