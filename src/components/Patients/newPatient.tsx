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

const NewPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patient, setPatient] = useState<PatientDTO>({});

  const [fetchedRecord, loading] = useGetDetail<PatientDTO>(
    isEdit ? api.patients.getPatient : async () => ({ data: EMPTY_PATIENT }),
    EMPTY_PATIENT,
    Number(id)
  );

  useEffect(() => {
    if (isEdit && fetchedRecord) setPatient(fetchedRecord);
  }, [fetchedRecord, isEdit]);

  const setField = (field: keyof PatientDTO, value: unknown) => setPatient({ ...patient, [field]: value });
  const handleNumberChange = (field: keyof PatientDTO, val: string) => setField(field, val === "" ? null : Number(val));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const apiCall = isEdit ? api.patients.updatePatient(Number(id), patient) : api.patients.createPatient(patient);

    apiCall
      .then((res) => {
        enqueueSnackbar(`Patient ${isEdit ? "updated" : "created"} successfully`, { variant: "success" });
        const targetId = isEdit ? id : res?.data?.id;
        navigate(targetId ? getDetailPath(PATIENTS_PATH, targetId) : getPath(PATIENTS_PATH));
      })
      .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Box sx={{ pointerEvents: isSubmitting ? "none" : "auto", opacity: isSubmitting ? 0.7 : 1 }}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{isEdit ? "Edit" : "New"}</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {isEdit ? "EDIT PATIENT" : "NEW PATIENT"}
      </Typography>

      {isEdit && loading ? (
        <Typography>Loading patient details...</Typography>
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
              color="primary"
            />
            <Typography variant="body2">Chronic patient</Typography>
          </Box>

          <TextField
            label="Notes"
            multiline
            rows={3}
            value={patient.notes ?? ""}
            onChange={(e) => setField("notes", e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>
              SAVE
            </Button>
            <Button variant="outlined" type="button" onClick={() => navigate(getPath(PATIENTS_PATH))}>
              BACK
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default NewPatient;
