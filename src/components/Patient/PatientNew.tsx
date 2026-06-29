import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientForm from "./PatientForm";

const PatientNew: React.FC = () => {
  const [patient, setPatient] = useState<PatientDTO>({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    api.patients
      .createPatient(patient)
      .then((res) => {
        enqueueSnackbar("Patient created successfully", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, res.data.id));
      })
      .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}>
        NEW PATIENT
      </Typography>
      <PatientForm patient={patient} onChange={setPatient} onSubmit={handleSubmit} />
    </div>
  );
};

export default PatientNew;
