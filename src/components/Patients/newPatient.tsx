import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import React, { useState } from "react";

// Esportiamo l'interfaccia IFormState così può essere usata anche nel componente padre
export interface IFormState {
  name: string;
  surname: string;
  address: string;
  opd: string;
  idp: string;
  bloodGroup: string;
  isChronic: boolean;
  notes: string;
}

interface INewPatientProps {
  onBack: () => void;
  // Nuova prop: passiamo una funzione asincrona che gestisce il salvataggio
  onSave: (data: IFormState) => Promise<void>;
}

const NewPatient: React.FC<INewPatientProps> = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState<IFormState>({
    name: "",
    surname: "",
    address: "",
    opd: "",
    idp: "",
    bloodGroup: "",
    isChronic: false,
    notes: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isChronic: e.target.checked }));
  };

  // Resa asincrona: ora attende che il padre finisca il salvataggio
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      // Non richiamiamo onBack() qui, lo facciamo dal padre dopo il successo
    } catch (error) {
      console.error("Errore durante il salvataggio nel form", error);
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "4px",
    fontSize: "0.9rem",
    boxSizing: "border-box" as const,
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname *"
            required
            value={formData.surname}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address *"
            required
            value={formData.address}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            name="opd"
            placeholder="OPD *"
            required
            value={formData.opd}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="idp"
            placeholder="IDP *"
            required
            value={formData.idp}
            onChange={handleChange}
            style={inputStyle}
          />
          <select
            name="bloodGroup"
            required
            value={formData.bloodGroup}
            onChange={handleChange}
            style={{ ...inputStyle, backgroundColor: "white", color: formData.bloodGroup ? "#000" : "#9ca3af" }}
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
            style={{ position: "relative", display: "inline-block", width: "44px", height: "22px", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={formData.isChronic}
              onChange={handleCheckboxChange}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: formData.isChronic ? "red" : "#ccc",
                borderRadius: "34px",
                transition: "0.3s",
              }}
            />
            <span
              style={{
                position: "absolute",
                height: "16px",
                width: "16px",
                left: formData.isChronic ? "24px" : "4px",
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
            name="notes"
            placeholder="Notes"
            rows={5}
            value={formData.notes}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              backgroundColor: isSaving ? "#fca5a5" : "red",
              color: "white",
              border: "none",
              padding: "10px 24px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: isSaving ? "not-allowed" : "pointer",
              borderRadius: "4px",
            }}
          >
            {isSaving ? "SAVING..." : "SAVE"}
          </button>
          <button
            type="button"
            onClick={onBack}
            disabled={isSaving}
            style={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
              padding: "10px 24px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: isSaving ? "not-allowed" : "pointer",
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
