import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientRecordDTO } from "@generated/axios";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PatientRecordForm from "./PatientRecordForm";

const PatientRecordNew: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<PatientRecordDTO>({ patientId: Number(id) });
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = () => {
    console.log("Submitting record:", record);
    api.patientRecords
      .createPatientRecord(record)
      .then((response) => {
        console.log("Success response:", response);
        enqueueSnackbar("Record created successfully", { variant: "success" });
        navigate(getDetailPath(PATIENTS_PATH, id));
      })
      .catch((err) => {
        console.error("Error creating record:", err.response?.data ?? err.message);
        enqueueSnackbar(`Error: ${err.response?.data?.message ?? err.message}`, { variant: "error" });
      });
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
        <BreadcrumbEl active>New Record</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}>
        NEW RECORD
      </Typography>
      <PatientRecordForm record={record} onChange={setRecord} onSubmit={handleSubmit} />
    </div>
  );
};

export default PatientRecordNew;
