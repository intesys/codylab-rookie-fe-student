import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { PatientApiApi, PatientDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PatientForm from "./PatientForm";

const api = new PatientApiApi();
const emptyPatient: PatientDTO = {};

const PatientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patientData, ,] = useGetDetail<PatientDTO>((id) => api.getPatient(id), emptyPatient, Number(id));
  const [patient, setPatient] = useState<PatientDTO>(patientData);

  const handleSave = () => {
    api.updatePatient(Number(id), patient).then(() => {
      navigate(getDetailPath(PATIENTS_PATH, id));
    });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        EDIT PATIENT
      </Typography>
      <PatientForm patient={patient} onChange={setPatient} onSave={handleSave} />
    </div>
  );
};

export default PatientEdit;
