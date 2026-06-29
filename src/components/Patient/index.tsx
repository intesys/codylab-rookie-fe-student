import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { api } from "@config/api";
import { PatientDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PatientDetail from "./PatientDetail";
import PatientRecordList from "./PatientRecordList";

const EMPTY_PATIENT: PatientDTO = {};

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, loading] = useGetDetail<PatientDTO>(api.patients.getPatient, EMPTY_PATIENT, Number(id));
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      api.patients
        .deletePatient(Number(id))
        .then(() => {
          enqueueSnackbar("Patient deleted successfully", { variant: "success" });
          navigate(getPath(PATIENTS_PATH));
        })
        .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
    }
  };

  const handleDeleteRecord = (recordId: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      api.patientRecords
        .deletePatientRecord(recordId)
        .then(() => {
          enqueueSnackbar("Record deleted successfully", { variant: "success" });
          // Reload patient to refresh records
          window.location.reload();
        })
        .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
    }
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              PATIENT DETAILS
            </Typography>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
              DELETE
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <PatientDetail patient={patient} />
            <PatientRecordList
              patientId={patient.id}
              records={patient.patientRecords ?? []}
              onDeleteRecord={handleDeleteRecord}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Patient;
