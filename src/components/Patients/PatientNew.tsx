import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { PatientApiApi, PatientDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientForm from "./PatientForm";

const api = new PatientApiApi();

const PatientNew: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<PatientDTO>({});

  const handleSave = () => {
    api.createPatient(patient).then(() => {
      navigate(getPath(PATIENTS_PATH));
    });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        NEW PATIENT
      </Typography>
      <PatientForm patient={patient} onChange={setPatient} onSave={handleSave} />
    </div>
  );
};

export default PatientNew;
