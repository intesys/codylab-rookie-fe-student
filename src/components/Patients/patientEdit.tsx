import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientDTOBloodGroupEnum } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getBloodType, getDetailPath, getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, MenuItem, Switch, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EMPTY_PATIENT: PatientDTO = {};
const BLOOD_GROUPS = Object.values(PatientDTOBloodGroupEnum);

const PatientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [fetched, loading] = useGetDetail<PatientDTO>(api.patients.getPatient, EMPTY_PATIENT, numericId);
  const [patient, setPatient] = useState<PatientDTO>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (fetched && Object.keys(fetched).length > 0) {
      setPatient(fetched);
    }
  }, [fetched]);

  const setField = (field: keyof PatientDTO, value: unknown) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: keyof PatientDTO, val: string) => {
    setField(field, val === "" ? null : Number(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNaN(numericId)) return;

    if (isSubmitting) return;
    setIsSubmitting(true);

    api.patients
      .updatePatient(numericId, patient)
      .then(() => {
        enqueueSnackbar("Patient updated successfully", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || err.message || "Update failed";
        enqueueSnackbar(`Error: ${errorMsg}`, { variant: "error" });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>Patient</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2, mt: 1 }}>
        EDIT PATIENT
      </Typography>

      {loading ? (
        <Typography>Loading data form...</Typography>
      ) : (
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
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            <TextField
              label="Name"
              required
              value={patient.name ?? ""}
              onChange={(e) => setField("name", e.target.value)}
            />
            <TextField
              label="Surname"
              required
              value={patient.surname ?? ""}
              onChange={(e) => setField("surname", e.target.value)}
            />
            <TextField
              label="Address"
              required
              value={patient.address ?? ""}
              onChange={(e) => setField("address", e.target.value)}
            />
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            <TextField
              label="OPD"
              type="number"
              required
              value={patient.opd ?? ""}
              onChange={(e) => handleNumberChange("opd", e.target.value)}
            />
            <TextField
              label="IDP"
              type="number"
              required
              value={patient.idp ?? ""}
              onChange={(e) => handleNumberChange("idp", e.target.value)}
            />
            <TextField
              label="Blood Group"
              select
              required
              value={patient.bloodGroup ?? ""}
              onChange={(e) => setField("bloodGroup", e.target.value)}
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
              onChange={(e) => setField("chronicPatient", e.target.checked)}
              color="error"
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Chronic patient
            </Typography>
          </Box>

          <TextField
            label="Notes"
            multiline
            rows={4}
            value={patient.notes ?? ""}
            onChange={(e) => setField("notes", e.target.value)}
          />

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
              onClick={() => navigate(getDetailPath(PATIENTS_PATH, id))}
              sx={{ fontWeight: 600, px: 3 }}
            >
              BACK
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default PatientEdit;
