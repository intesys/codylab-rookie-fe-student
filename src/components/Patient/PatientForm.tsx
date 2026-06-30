import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import { getBloodType, getPath } from "@lib/utils";
import { Box, Button, MenuItem, Switch, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  patient: PatientDTO;
  onChange: (patient: PatientDTO) => void;
  onSubmit: () => void;
}

const BLOOD_GROUPS = Object.values(PatientDTOBloodGroupEnum);

const PatientForm: React.FC<IProps> = ({ patient, onChange, onSubmit }) => {
  const navigate = useNavigate();

  const set = (field: keyof PatientDTO, value: unknown) => onChange({ ...patient, [field]: value });

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "white",
        p: 3,
        borderRadius: 1,
        border: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        <TextField label="Name *" value={patient.name ?? ""} onChange={(e) => set("name", e.target.value)} />
        <TextField label="Surname *" value={patient.surname ?? ""} onChange={(e) => set("surname", e.target.value)} />
        <TextField label="Address *" value={patient.address ?? ""} onChange={(e) => set("address", e.target.value)} />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
        <TextField
          label="OPD *"
          type="number"
          value={patient.opd ?? ""}
          onChange={(e) => set("opd", Number(e.target.value))}
        />
        <TextField
          label="IDP *"
          type="number"
          value={patient.idp ?? ""}
          onChange={(e) => set("idp", Number(e.target.value))}
        />
        <TextField
          label="Blood Group *"
          select
          value={patient.bloodGroup ?? ""}
          onChange={(e) => set("bloodGroup", e.target.value)}
        >
          {BLOOD_GROUPS.map((bg) => (
            <MenuItem key={bg} value={bg}>
              {getBloodType(bg)}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Switch
          checked={patient.chronicPatient ?? false}
          onChange={(e) => set("chronicPatient", e.target.checked)}
          color="default"
        />
        <Typography variant="body2">Chronic patient</Typography>
      </Box>

      <TextField
        label="Notes"
        multiline
        rows={3}
        value={patient.notes ?? ""}
        onChange={(e) => set("notes", e.target.value)}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={onSubmit} startIcon={<span>💾</span>}>
          SAVE
        </Button>
        <Button variant="outlined" onClick={() => navigate(getPath(PATIENTS_PATH))}>
          BACK
        </Button>
      </Box>
    </Box>
  );
};

export default PatientForm;
