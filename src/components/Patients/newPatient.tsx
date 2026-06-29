import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React, { useState } from "react";

interface INewPatientProps {
  onBack: () => void;
}

const NewPatient: React.FC<INewPatientProps> = ({ onBack }) => {
  // Stati locali per raccogliere i dati del form
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [opd, setOpd] = useState("");
  const [idp, setIdp] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isChronic, setIsChronic] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvataggio dati:", { name, surname, address, opd, idp, bloodGroup, isChronic, notes });
    alert("Patient saved successfully!");
    onBack();
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>Patients</BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>

      <h2 style={{ marginBottom: "20px", marginTop: "10px", fontWeight: "bold", fontSize: "1.25rem" }}>NEW PATIENT</h2>

      <form
        onSubmit={handleSave}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "5px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Name *"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <input
            type="text"
            placeholder="Surname *"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            style={{ flex: 1, padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <input
            type="text"
            placeholder="Address *"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ flex: 1, padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "16px", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="OPD *"
            required
            value={opd}
            onChange={(e) => setOpd(e.target.value)}
            style={{ flex: 1, padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <input
            type="text"
            placeholder="IDP *"
            required
            value={idp}
            onChange={(e) => setIdp(e.target.value)}
            style={{ flex: 1, padding: "12px 14px", border: "1px solid #d1d5db", borderRadius: "4px" }}
          />
          <select
            required
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              backgroundColor: "white",
              color: bloodGroup ? "#000" : "#9ca3af",
            }}
          >
            <option value="" disabled hidden>
              Blood Group *
            </option>
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

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "25px" }}>
          <label
            style={{
              position: "relative",
              display: "inline-block",
              width: "44px",
              height: "22px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={isChronic}
              onChange={(e) => setIsChronic(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isChronic ? "red" : "#ccc",
                borderRadius: "34px",
                transition: "0.3s",
              }}
            />
            <span
              style={{
                position: "absolute",
                height: "16px",
                width: "16px",
                left: isChronic ? "24px" : "4px",
                bottom: "3px",
                backgroundColor: "white",
                borderRadius: "50%",
                transition: "0.3s",
              }}
            />
          </label>
          <span style={{ fontSize: "0.9rem", color: "#4b5563" }}>Chronic patient</span>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <textarea
            placeholder="Notes"
            rows={5}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 24px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            SAVE
          </button>

          <button
            type="button"
            onClick={onBack}
            style={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
              padding: "10px 24px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            BACK
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPatient;
