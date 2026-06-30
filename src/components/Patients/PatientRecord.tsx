import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientRecordDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getDetailPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EMPTY_RECORD: PatientRecordDTO = {};

const PatientRecord: React.FC = () => {
  const { id, recordId } = useParams<{ id: string; recordId: string }>();
  const isEdit = Boolean(recordId);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [doctors, setDoctors] = useState<Array<{ id: number; name: string; surname: string }>>([]);
  const [record, setRecord] = useState<PatientRecordDTO>({ patientId: Number(id) });

  const [fetchedRecord, loading] = useGetDetail<PatientRecordDTO>(
    isEdit ? api.patientRecords.getPatientRecord : async () => ({ data: EMPTY_RECORD }),
    EMPTY_RECORD,
    Number(recordId)
  );

  useEffect(() => {
    if (isEdit && fetchedRecord) setRecord(fetchedRecord);
  }, [fetchedRecord, isEdit]);

  useEffect(() => {
    api.doctors
      .getListDoctor(0, 100, "", {})
      .then((res) => {
        setDoctors((res.data ?? []).map((d) => ({ id: d.id ?? 0, name: d.name ?? "", surname: d.surname ?? "" })));
      })
      .catch((err) => enqueueSnackbar(`Failed to load doctors: ${err.message}`, { variant: "error" }));
  }, [enqueueSnackbar]);

  const setField = (field: keyof PatientRecordDTO, value: unknown) => setRecord({ ...record, [field]: value });

  const handleDoctorChange = (e: SelectChangeEvent<string | number>) => {
    const val = e.target.value;
    if (val === "") return setField("doctor", null);
    const doc = doctors.find((d) => d.id === Number(val));
    setField("doctor", { ...record.doctor, id: Number(val), name: doc?.name ?? "", surname: doc?.surname ?? "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const apiCall = isEdit
      ? api.patientRecords.updatePatientRecord(Number(recordId), record)
      : api.patientRecords.createPatientRecord(record);

    apiCall
      .then(() => {
        enqueueSnackbar(`Record ${isEdit ? "updated" : "created"} successfully`, { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Box sx={{ pointerEvents: isSubmitting ? "none" : "auto", opacity: isSubmitting ? 0.7 : 1 }}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to="/patients">Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>Patient</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{isEdit ? "Edit Record" : "New Record"}</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {isEdit ? "EDIT RECORD" : "NEW RECORD"}
      </Typography>

      {isEdit && loading ? (
        <Typography>Loading record...</Typography>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
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
              label="Date"
              type="date"
              required
              value={record.date ?? ""}
              onChange={(e) => setField("date", e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Type of visit"
              required
              value={record.typeVisit ?? ""}
              onChange={(e) => setField("typeVisit", e.target.value)}
            />
          </Box>
          <TextField
            label="Reason for visit"
            multiline
            rows={3}
            value={record.reasonVisit ?? ""}
            onChange={(e) => setField("reasonVisit", e.target.value)}
          />
          <TextField
            label="Treatment made"
            multiline
            rows={3}
            value={record.treatmentMade ?? ""}
            onChange={(e) => setField("treatmentMade", e.target.value)}
          />

          <FormControl fullWidth required>
            <InputLabel id="doc-select">Doctor</InputLabel>
            <Select labelId="doc-select" label="Doctor" value={record.doctor?.id ?? ""} onChange={handleDoctorChange}>
              {doctors.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name} {d.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>
              SAVE
            </Button>
            <Button variant="outlined" type="button" onClick={() => navigate(getDetailPath(PATIENTS_PATH, id))}>
              BACK
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PatientRecord;
