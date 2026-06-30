import { PATIENTS_PATH } from "@config/paths";
import { PatientRecordDTO } from "@generated/axios";
import { getDetailPath } from "@lib/utils";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@config/api";

interface IProps {
  record: PatientRecordDTO;
  onChange: (record: PatientRecordDTO) => void;
  onSubmit: () => void;
}

const PatientRecordForm: React.FC<IProps> = ({ record, onChange, onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [doctors, setDoctors] = useState<Array<{ id: number; name: string; surname: string }>>([]);

  useEffect(() => {
    api.doctors.getListDoctor(0, 100, "", {}).then((response) => {
      const doctorsList = response.data.map((d) => ({
        id: d.id ?? 0,
        name: d.name ?? "",
        surname: d.surname ?? "",
      }));
      setDoctors(doctorsList);
    });
  }, []);

  const set = (field: keyof PatientRecordDTO, value: unknown) => onChange({ ...record, [field]: value });

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
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField
          label="Date *"
          type="date"
          value={record.date ?? ""}
          onChange={(e) => set("date", e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Type of visit *"
          value={record.typeVisit ?? ""}
          onChange={(e) => set("typeVisit", e.target.value)}
        />
      </Box>

      <TextField
        label="Reason of visit"
        multiline
        rows={3}
        value={record.reasonVisit ?? ""}
        onChange={(e) => set("reasonVisit", e.target.value)}
      />

      <TextField
        label="Treatment made"
        multiline
        rows={3}
        value={record.treatmentMade ?? ""}
        onChange={(e) => set("treatmentMade", e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel id="doctor-label">Doctor *</InputLabel>
        <Select
          labelId="doctor-label"
          label="Doctor *"
          value={record.doctor?.id ?? ""}
          onChange={(e) => set("doctor", { id: Number(e.target.value) } as PatientRecordDTO["doctor"])}
        >
          {doctors.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name} {d.surname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="error" onClick={onSubmit} startIcon={<span>💾</span>}>
          SAVE
        </Button>
        <Button variant="outlined" onClick={() => navigate(getDetailPath(PATIENTS_PATH, id))}>
          BACK
        </Button>
      </Box>
    </Box>
  );
};

export default PatientRecordForm;
