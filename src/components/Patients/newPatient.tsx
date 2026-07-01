import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, MenuItem, Switch, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SAFE_BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-", "UNKNOWN"];

const NewPatient: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [patient, setPatient] = useState<PatientDTO>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field: keyof PatientDTO, value: unknown) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: keyof PatientDTO, val: string) => {
    setField(field, val === "" ? null : Number(val));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    let formattedBloodGroup = patient.bloodGroup;
    if (formattedBloodGroup && formattedBloodGroup !== "UNKNOWN") {
      formattedBloodGroup = formattedBloodGroup.replace("+", "_PLUS").replace("-", "_MINUS");
    }

    const patientDataWithDefaults: PatientDTO = {
      ...patient,
      bloodGroup: formattedBloodGroup,
      sex: "M",
      birthDate: new Date(2000, 0, 1).toISOString().split("T")[0],
      age: 26,
      version: 0,
    };

    console.log("Dati finali in invio al backend:", patientDataWithDefaults);

    api.patients
      .createPatient(patientDataWithDefaults)
      .then(() => {
        enqueueSnackbar("Patient created successfully", { variant: "success" });
        navigate(getPath(PATIENTS_PATH));
      })
      .catch((err) => {
        let errorMsg = "Errore 400: Dati non validi. ";
        const responseData = err.response?.data;

        if (responseData) {
          if (typeof responseData === "string") {
            errorMsg += responseData;
          } else if (responseData.message) {
            errorMsg += responseData.message;
          } else if (responseData.errors) {
            errorMsg += JSON.stringify(responseData.errors);
          } else {
            errorMsg += JSON.stringify(responseData);
          }
        }

        enqueueSnackbar(errorMsg, { variant: "error", autoHideDuration: 8000 });
        console.log("Errore dettagliato rilevato nella console:", err.response);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2, mt: 1 }}>
        NEW PATIENT
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
            {SAFE_BLOOD_GROUPS.map((bg) => (
              <MenuItem key={bg} value={bg}>
                {bg}
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
            onClick={() => navigate(getPath(PATIENTS_PATH))}
            sx={{ fontWeight: 600, px: 3 }}
          >
            BACK
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default NewPatient;
