import React, { useState } from "react";

// Definiamo l'interfaccia direttamente qui per evitare conflitti di importazione con index.tsx
interface Doctor {
  id: string;
  name: string;
  surname: string;
  profession: string;
  email: string;
  phone: string;
}

interface NewDoctorProps {
  onSave: (doc: Doctor) => void;
  onBack: () => void;
}

const NewDoctor: React.FC<NewDoctorProps> = ({ onSave, onBack }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: "", // Lasciamo vuoto l'ID così il server genererà quello corretto sul database
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
      <h2>NEW DOCTOR</h2>
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
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
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

export default NewDoctor;
