import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH, PATIENTS_PATH } from "@config/paths";
import { PatientApiApi, PatientDTO, PatientRecordApiApi } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import {
  generateAvatarImage,
  getBloodType,
  getDetailPath,
  getEditDetailPath,
  getNewRecordDetailPath,
} from "@lib/utils";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const patientApi = new PatientApiApi();
const recordApi = new PatientRecordApiApi();

const emptyPatient: PatientDTO = {};

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [patient, loading] = useGetDetail<PatientDTO>((id) => patientApi.getPatient(id), emptyPatient, Number(id));

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      patientApi.deletePatient(Number(id)).then(() => {
        navigate(getDetailPath(PATIENTS_PATH, ""));
      });
    }
  };

  const handleDeleteRecord = (recordId: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      recordApi.deletePatientRecord(recordId).then(() => {
        window.location.reload();
      });
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={`/${PATIENTS_PATH}`}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient.name} {patient.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          PATIENT DETAILS
        </Typography>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          DELETE
        </Button>
      </Box>

      {/* Header card con avatar e nome */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          mb: 2,
          borderRadius: 1,
          border: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src={generateAvatarImage(DetailType.PATIENT, patient.id) || undefined}
          alt={`${patient.name} ${patient.surname}`}
          style={{ width: 64, height: 64, borderRadius: "50%" }}
        />
        <Box>
          <Typography variant="h5">
            {patient.name} <strong>{patient.surname}</strong>
            <IconButton size="small" color="error" onClick={() => navigate(getEditDetailPath(PATIENTS_PATH, id))}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {patient.address}
          </Typography>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Sidebar */}
        <Box sx={{ bgcolor: "#424242", color: "white", p: 3, borderRadius: 1, minWidth: 260 }}>
          <Typography variant="overline" sx={{ color: "#ef9a9a" }}>
            HEALTH INFORMATION
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#bdbdbd" }}>
            PATIENT ID
          </Typography>
          <Typography variant="h5">{patient.id}</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#bdbdbd" }}>
            OPD
          </Typography>
          <Typography variant="h5">{patient.opd}</Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "#bdbdbd" }}>
            BLOOD GROUP
          </Typography>
          <Typography variant="h5">{patient.bloodGroup ? getBloodType(patient.bloodGroup) : "-"}</Typography>
          <Box sx={{ borderTop: "1px solid #616161", my: 2 }} />
          <Typography variant="body2">Notes</Typography>
          <Box sx={{ borderTop: "1px solid #616161", my: 2 }} />
          <Typography variant="overline" sx={{ color: patient.chronicPatient ? "#ef9a9a" : "white" }}>
            CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
          </Typography>
        </Box>

        {/* Records */}
        <Box sx={{ flex: 1, bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6">Records</Typography>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => navigate(getNewRecordDetailPath(PATIENTS_PATH, id))}
            >
              RECORD
            </Button>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type of</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Treatment made</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(patient.patientRecords ?? []).map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.typeVisit}</TableCell>
                  <TableCell sx={{ color: "primary.main" }}>{record.reasonVisit}</TableCell>
                  <TableCell>{record.treatmentMade}</TableCell>
                  <TableCell>
                    <Link to={getDetailPath(DOCTORS_PATH, record.doctor?.id)} style={{ color: "#1976d2" }}>
                      {record.doctor?.name} {record.doctor?.surname}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleDeleteRecord(record.id!)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};

export default Patient;
