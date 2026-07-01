import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PatientDTO, PatientRecordDTO } from "@generated/axios";
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

interface DoctorItem {
  id: number;
  name: string;
  surname: string;
}

const NewPatientRecord: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const numericId = id ? Number(id) : 0;

  const [patientInfo, setPatientInfo] = useState<PatientDTO | null>(null);
  const [record, setRecord] = useState<PatientRecordDTO>({ patientId: isNaN(numericId) ? undefined : numericId });
  const [doctors, setDoctors] = useState<DoctorItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!numericId || isNaN(numericId)) {
      enqueueSnackbar("Invalid patient ID provided", { variant: "error" });
      return;
    }

    zapi.patients
      .getPatient(numericId)
      .then((res) => {
        if (res.data) {
          setPatientInfo(res.data);
          setRecord((prev) => ({ ...prev, patientId: numericId, patient: res.data }));
        }
      })
      .catch((err) => {
        console.error("Error fetching patient context:", err);
      });

    api.doctors
      .getListDoctor(0, 100, "", {})
      .then((response) => {
        const mappedDoctors = (response.data ?? []).map((d) => ({
          id: d.id ?? 0,
          name: d.name ?? "",
          surname: d.surname ?? "",
        }));
        setDoctors(mappedDoctors);
      })
      .catch((err) => {
        enqueueSnackbar(`Failed to fetch doctors: ${err.message}`, { variant: "error" });
      });
  }, [numericId, enqueueSnackbar]);

  const setField = (field: keyof PatientRecordDTO, value: unknown) => {
    setRecord((prev) => ({ ...prev, [field]: value }));
  };

  const handleDoctorChange = (e: SelectChangeEvent<string | number>) => {
    const val = e.target.value;
    if (val === "") {
      setField("doctor", null);
      return;
    }
    const selectedDocId = Number(val);
    const selectedDoc = doctors.find((d) => d.id === selectedDocId);

    setField("doctor", {
      id: selectedDocId,
      name: selectedDoc?.name ?? "",
      surname: selectedDoc?.surname ?? "",
      profession: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!numericId || isNaN(numericId)) {
      enqueueSnackbar("Invalid patient mapping", { variant: "error" });
      return;
    }

    if (!record.doctor || !record.doctor.id) {
      enqueueSnackbar("Please select a valid doctor", { variant: "warning" });
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const dateString = record.date || new Date().toISOString().split("T")[0];
    const finalDate = new Date(`${dateString}T12:00:00.000Z`);

    const payload: PatientRecordDTO = {
      ...record,
      patientId: numericId,
      patient: patientInfo || undefined,
      date: finalDate.toISOString(),
    };

    api.patientRecords
      .createPatientRecord(payload)
      .then(() => {
        enqueueSnackbar("Medical record added successfully", { variant: "success" });
        navigate(`/patients/${numericId}`);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || err.message || "Failed to create record";
        enqueueSnackbar(`Error 400: ${errorMsg}`, { variant: "error" });
      })
      .finally(() => setIsSubmitting(false));
  };

  const patientNameHeader = patientInfo ? `${patientInfo.name} ${patientInfo.surname}: ` : "";

  return (
    <Box sx={{ p: 2 }}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to="/patients">Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={`/patients/${numericId}`}>Patient</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New Record</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2, mt: 1, textTransform: "uppercase" }}>
        {patientNameHeader || "LOADING: "}NEW PATIENT RECORD
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          pointerEvents: isSubmitting ? "none" : "auto",
          opacity: isSubmitting ? 0.7 : 1,
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, alignItems: "center" }}>
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
          <FormControl fullWidth required>
            <InputLabel id="doctor-dropdown-label">Doctor</InputLabel>
            <Select
              labelId="doctor-dropdown-label"
              label="Doctor"
              value={record.doctor?.id ?? ""}
              onChange={handleDoctorChange}
            >
              {doctors.length === 0 ? (
                <MenuItem disabled value="">
                  No doctors available
                </MenuItem>
              ) : (
                doctors.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name} {d.surname}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <TextField
            label="Reason of visit"
            multiline
            required
            rows={4}
            value={record.reasonVisit ?? ""}
            onChange={(e) => setField("reasonVisit", e.target.value)}
          />
          <TextField
            label="Treatment made"
            multiline
            required
            rows={4}
            value={record.treatmentMade ?? ""}
            onChange={(e) => setField("treatmentMade", e.target.value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Button
            variant="contained"
            color="error"
            type="submit"
            startIcon={<SaveIcon />}
            sx={{ fontWeight: 600, px: 3 }}
          >
            SAVE
          </Button>
          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={() => navigate(`/patients/${numericId}`)}
            sx={{ fontWeight: 600, px: 3 }}
          >
            BACK
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewPatientRecord;
