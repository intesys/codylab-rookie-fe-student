import React, { Dispatch, useEffect, useMemo, useReducer, useState } from "react";
import { api } from "../../config/api"; // Assicurati che il percorso verso la tua istanza API sia corretto
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";
import NewDoctor from "./newDoctor";

export interface Doctor {
  id: string;
  name: string;
  surname: string;
  profession: string;
  email: string;
  phone: string;
}

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

/* ==========================================================================
   COMPONENTE: LISTA DEI DOTTORI
   ========================================================================== */
const DoctorsList: React.FC<{
  doctors: Doctor[];
  onAddNew: () => void;
  onEdit: (doc: Doctor) => void;
  onViewDetails: (doc: Doctor) => void;
}> = ({ doctors, onAddNew, onEdit, onViewDetails }) => {
  const [searchName, setSearchName] = useState("");
  const [searchSurname, setSearchSurname] = useState("");
  const [searchProfession, setSearchProfession] = useState("");

  const filteredDoctors = doctors.filter((doc) => {
    return (
      doc.name.toLowerCase().includes(searchName.toLowerCase()) &&
      doc.surname.toLowerCase().includes(searchSurname.toLowerCase()) &&
      doc.profession.toLowerCase().includes(searchProfession.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>DOCTORS DATABASE</h2>
        <button
          onClick={onAddNew}
          style={{
            backgroundColor: "#fff",
            color: "red",
            border: "1px solid red",
            padding: "8px 12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + ADD NEW DOCTOR
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "15px 0",
          borderRadius: "4px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>FIND A DOCTOR</h3>
        <input
          placeholder="Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "200px" }}
        />
        <input
          placeholder="Surname"
          value={searchSurname}
          onChange={(e) => setSearchSurname(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "200px" }}
        />
        <input
          placeholder="Profession/Specialization"
          value={searchProfession}
          onChange={(e) => setSearchProfession(e.target.value)}
          style={{ marginRight: "10px", padding: "8px", width: "200px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        {filteredDoctors.length === 0 ? (
          <p style={{ color: "gray" }}>No doctors found matching the search criteria.</p>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
                width: "250px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#007bff",
                  margin: "0 auto 10px",
                }}
              ></div>
              <h3 style={{ margin: "5px 0" }}>
                {doc.name} {doc.surname}
              </h3>
              <p style={{ color: "gray", margin: "5px 0" }}>{doc.profession}</p>
              <p style={{ margin: "5px 0" }}> {doc.phone}</p>
              <p style={{ margin: "5px 0", fontSize: "12px", color: "red" }}> {doc.email}</p>
              <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
                <button onClick={() => onViewDetails(doc)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                  View
                </button>
                <button onClick={() => onEdit(doc)} style={{ padding: "5px 10px", cursor: "pointer" }}>
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE: FORM DI MODIFICA
   ========================================================================== */
const DoctorEditForm: React.FC<{
  doctor: Doctor;
  onSave: (doc: Doctor) => void;
  onBack: () => void;
}> = ({ doctor, onSave, onBack }) => {
  const [name, setName] = useState(doctor.name);
  const [surname, setSurname] = useState(doctor.surname);
  const [profession, setProfession] = useState(doctor.profession);
  const [email, setEmail] = useState(doctor.email);
  const [phone, setPhone] = useState(doctor.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: doctor.id,
      name,
      surname,
      profession,
      email,
      phone,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        margin: "20px",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2>EDIT DOCTOR</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
        <div>
          <label>Name *</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Surname *</label>
          <br />
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Profession *</label>
          <br />
          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Email *</label>
          <br />
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
        <div>
          <label>Phone number *</label>
          <br />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "8px" }} />
        </div>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          marginRight: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        SAVE
      </button>
      <button
        type="button"
        onClick={onBack}
        style={{
          backgroundColor: "white",
          color: "gray",
          padding: "10px 20px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        BACK
      </button>
    </form>
  );
};

/* ==========================================================================
   COMPONENTE: DETTAGLI DEL DOTTORE
   ========================================================================== */
const DoctorDetails: React.FC<{ doctor: Doctor; onBack: () => void }> = ({ doctor, onBack }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>DOCTOR DETAILS</h2>
      <div
        style={{
          display: "flex",
          gap: "20px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ backgroundColor: "#333", color: "white", padding: "20px", width: "250px" }}>
          <h3>
            {doctor.name} {doctor.surname}
          </h3>
          <p style={{ color: "#bbb" }}>{doctor.profession}</p>
          <hr style={{ borderColor: "#444" }} />
          <p>📞 {doctor.phone}</p>
          <p style={{ color: "red" }}>✉️ {doctor.email}</p>
          <button onClick={onBack} style={{ marginTop: "20px", width: "100%", padding: "8px", cursor: "pointer" }}>
            Back to List
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Patients</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>PID</th>
                <th style={{ padding: "8px" }}>OPD</th>
                <th style={{ padding: "8px" }}>IPD</th>
                <th style={{ padding: "8px" }}>Name</th>
                <th style={{ padding: "8px" }}>Surname</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>3</td>
                <td style={{ padding: "8px" }}>1222</td>
                <td style={{ padding: "8px" }}>32322</td>
                <td style={{ padding: "8px" }}>Carlo</td>
                <td style={{ padding: "8px" }}>Marchiori</td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }}>4</td>
                <td style={{ padding: "8px" }}>3232</td>
                <td style={{ padding: "8px" }}>2311</td>
                <td style={{ padding: "8px" }}>Enrico</td>
                <td style={{ padding: "8px" }}>Costanzi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   COMPONENTE PRINCIPALE (CONTAINER)
   ========================================================================== */
const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [view, setView] = useState<"LIST" | "NEW" | "EDIT" | "DETAILS">("LIST");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Carica l'elenco reale dei medici dall'API del backend
  const loadDoctors = () => {
    api.doctors
      .getListDoctor(0, 100, "", {})
      .then((response) => {
        const mapped = (response.data ?? []).map((d: any) => ({
          id: String(d.id ?? ""),
          name: d.name ?? "",
          surname: d.surname ?? "",
          profession: d.profession ?? "",
          email: d.email ?? "",
          phone: d.phone ?? "",
        }));
        setDoctors(mapped);
      })
      .catch((err) => {
        console.error("Failed to load doctors from server:", err);
      });
  };

  // Sincronizza lo stato con il backend all'avvio del componente
  useEffect(() => {
    loadDoctors();
  }, []);

  // Gestisce sia la creazione (POST) che la modifica (PUT) inviando i dati alle API
  const handleSaveDoctor = (savedDoctor: Doctor) => {
    const isEdit = Boolean(savedDoctor.id);

    const apiCall = isEdit
      ? api.doctors.updateDoctor(Number(savedDoctor.id), {
          id: Number(savedDoctor.id),
          name: savedDoctor.name,
          surname: savedDoctor.surname,
          profession: savedDoctor.profession,
          email: savedDoctor.email,
          phone: savedDoctor.phone,
        })
      : api.doctors.createDoctor({
          name: savedDoctor.name,
          surname: savedDoctor.surname,
          profession: savedDoctor.profession,
          email: savedDoctor.email,
          phone: savedDoctor.phone,
        });

    apiCall
      .then(() => {
        loadDoctors(); // Ricarica la lista aggiornata direttamente dal database
        setView("LIST");
        setSelectedDoctor(null);
      })
      .catch((err) => {
        console.error("Failed to save doctor:", err);
      });
  };

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl
          onClick={() => {
            setView("LIST");
            setSelectedDoctor(null);
          }}
          active={view === "LIST"}
        >
          Doctors
        </BreadcrumbEl>
        {view === "NEW" && <BreadcrumbEl active>New</BreadcrumbEl>}
        {view === "EDIT" && <BreadcrumbEl active>Edit</BreadcrumbEl>}
        {view === "DETAILS" && (
          <BreadcrumbEl active>
            {selectedDoctor?.name} {selectedDoctor?.surname}
          </BreadcrumbEl>
        )}
      </Breadcrumb>

      {view === "LIST" && (
        <DoctorsList
          doctors={doctors}
          onAddNew={() => {
            setSelectedDoctor(null);
            setView("NEW");
          }}
          onEdit={(doc) => {
            setSelectedDoctor(doc);
            setView("EDIT");
          }}
          onViewDetails={(doc) => {
            setSelectedDoctor(doc);
            setView("DETAILS");
          }}
        />
      )}

      {view === "NEW" && (
        <NewDoctor
          onSave={handleSaveDoctor}
          onBack={() => {
            setView("LIST");
            setSelectedDoctor(null);
          }}
        />
      )}

      {view === "EDIT" && selectedDoctor && (
        <DoctorEditForm
          doctor={selectedDoctor}
          onSave={handleSaveDoctor}
          onBack={() => {
            setView("LIST");
            setSelectedDoctor(null);
          }}
        />
      )}

      {view === "DETAILS" && selectedDoctor && (
        <DoctorDetails
          doctor={selectedDoctor}
          onBack={() => {
            setView("LIST");
            setSelectedDoctor(null);
          }}
        />
      )}
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
