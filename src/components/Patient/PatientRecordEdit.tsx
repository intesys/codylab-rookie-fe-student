import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientRecordDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PatientRecordForm from "./PatientRecordForm";

const EMPTY_RECORD: PatientRecordDTO = {};

const PatientRecordEdit: React.FC = () => {
  const { id, recordId } = useParams<{ id: string; recordId: string }>();
  const [fetched, loading] = useGetDetail<PatientRecordDTO>(api.patientRecords.getPatientRecord, EMPTY_RECORD, Number(recordId));
  const [record, setRecord] = useState<PatientRecordDTO>({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setRecord(fetched);
  }, [fetched]);

  const handleSubmit = () => {
    api.patientRecords
      .updatePatientRecord(Number(recordId), record)
      .then(() => {
        enqueueSnackbar("Record updated successfully", { variant: "success" });
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
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>Patient</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit Record</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}>
        EDIT RECORD
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <PatientRecordForm record={record} onChange={setRecord} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default PatientRecordEdit;
