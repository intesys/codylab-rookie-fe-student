import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  patient: PatientDTO;
  onChange: (patient: PatientDTO) => void;
  onSave: () => void;
}

const bloodGroups = [
  { value: PatientDTOBloodGroupEnum.APlus, label: "A+" },
  { value: PatientDTOBloodGroupEnum.AMinus, label: "A-" },
  { value: PatientDTOBloodGroupEnum.BPlus, label: "B+" },
  { value: PatientDTOBloodGroupEnum.BMinus, label: "B-" },
  { value: PatientDTOBloodGroupEnum.AbPlus, label: "AB+" },
  { value: PatientDTOBloodGroupEnum.AbMinus, label: "AB-" },
  { value: PatientDTOBloodGroupEnum.ZeroPlus, label: "0+" },
  { value: PatientDTOBloodGroupEnum.ZeroMinus, label: "0-" },
];

const PatientForm: React.FC<IProps> = ({ patient, onChange, onSave }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Name *"
          fullWidth
          value={patient.name ?? ""}
          onChange={(e) => onChange({ ...patient, name: e.target.value })}
        />
        <TextField
          label="Surname *"
          fullWidth
          value={patient.surname ?? ""}
          onChange={(e) => onChange({ ...patient, surname: e.target.value })}
        />
        <TextField
          label="Address *"
          fullWidth
          value={patient.address ?? ""}
          onChange={(e) => onChange({ ...patient, address: e.target.value })}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="OPD *"
          fullWidth
          type="number"
          value={patient.opd ?? ""}
          onChange={(e) => onChange({ ...patient, opd: Number(e.target.value) })}
        />
        <TextField
          label="IDP *"
          fullWidth
          type="number"
          value={patient.idp ?? ""}
          onChange={(e) => onChange({ ...patient, idp: Number(e.target.value) })}
        />
        <FormControl fullWidth>
          <InputLabel>Blood Group *</InputLabel>
          <Select
            label="Blood Group *"
            value={patient.bloodGroup ?? ""}
            onChange={(e) => onChange({ ...patient, bloodGroup: e.target.value as PatientDTOBloodGroupEnum })}
          >
            {bloodGroups.map((bg) => (
              <MenuItem key={bg.value} value={bg.value}>
                {bg.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <FormControlLabel
        control={
          <Switch
            checked={patient.chronicPatient ?? false}
            onChange={(e) => onChange({ ...patient, chronicPatient: e.target.checked })}
          />
        }
        label="Chronic patient"
      />
      <TextField
        label="Notes"
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2, mb: 3 }}
        value={patient.notes ?? ""}
        onChange={(e) => onChange({ ...patient, notes: e.target.value })}
      />
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

export default PatientForm;
