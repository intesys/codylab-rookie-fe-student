import { DoctorDTO } from "@generated/axios";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  doctor: DoctorDTO;
  onChange: (doctor: DoctorDTO) => void;
  onSave: () => void;
}

const DoctorForm: React.FC<IProps> = ({ doctor, onChange, onSave }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
      {/* Prima Riga: Name, Surname, Profession */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Name *"
          fullWidth
          value={doctor.name ?? ""}
          onChange={(e) => onChange({ ...doctor, name: e.target.value })}
        />
        <TextField
          label="Surname *"
          fullWidth
          value={doctor.surname ?? ""}
          onChange={(e) => onChange({ ...doctor, surname: e.target.value })}
        />
        <TextField
          label="Profession *"
          fullWidth
          value={doctor.profession ?? ""}
          onChange={(e) => onChange({ ...doctor, profession: e.target.value })}
        />
      </Box>

      {/* Seconda Riga: Email, Phone number */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Email *"
          fullWidth
          type="email"
          value={doctor.email ?? ""}
          onChange={(e) => onChange({ ...doctor, email: e.target.value })}
        />
        <TextField
          label="Phone number *"
          fullWidth
          value={doctor.phoneNumber ?? ""}
          onChange={(e) => onChange({ ...doctor, phoneNumber: e.target.value })}
        />
        {/* Box vuoto per bilanciare il layout a 3 colonne della riga precedente */}
        <Box sx={{ flex: 1 }} />
      </Box>

      {/* Pulsanti Azione */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={onSave}>
          SAVE 💾
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          BACK
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorForm;
