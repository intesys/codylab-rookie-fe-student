import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PatientForm from "./PatientForm";

const EMPTY_PATIENT: PatientDTO = {};

const PatientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [record, loading] = useGetDetail<PatientDTO>(api.patients.getPatient, EMPTY_PATIENT, Number(id));
  const [patient, setPatient] = useState<PatientDTO>({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setPatient(record);
  }, [record]);

  const handleSubmit = () => {
    api.patients
      .updatePatient(Number(id), patient)
      .then(() => {
        enqueueSnackbar("Patient updated successfully", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}>
        EDIT PATIENT
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <PatientForm patient={patient} onChange={setPatient} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default PatientEdit;
