import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO, PatientRecordDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath, getNewRecordDetailPath, getPath } from "@lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EMPTY_PATIENT: PatientDTO = {};

const PatientIndex: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [patient, loading] = useGetDetail<PatientDTO>(api.patients.getPatient, EMPTY_PATIENT, Number(id));
  const [records, setRecords] = useState<PatientRecordDTO[]>([]);

  useEffect(() => {
    if (patient?.patientRecords) {
      setRecords(patient.patientRecords);
    }
  }, [patient]);

  const handleDeleteRecord = (recordId: number) => {
    api.patientRecords
      .deletePatientRecord(recordId)
      .then(() => {
        enqueueSnackbar("Record deleted successfully", { variant: "success" });
        setRecords((prev) => prev.filter((r) => r.id !== recordId));
      })
      .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
  };

  const lastRecord = records.length > 0 ? records[records.length - 1] : null;

  if (loading) return <Typography>Loading patient data...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Detail</BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* CARD DETTAGLIO PAZIENTE */}
        <Box sx={{ width: 300 }}>
          <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                alt={`${patient.name}`}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="h6">
                    {patient.name} <strong>{patient.surname}</strong>
                  </Typography>
                  <EditIcon
                    sx={{ fontSize: 16, color: "#e57373", cursor: "pointer", ml: 0.5 }}
                    onClick={() => navigate(getEditDetailPath(PATIENTS_PATH, patient.id))}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {patient.address ?? "-"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* INFO CLINICHE DI SINTESI */}
          <Box
            sx={{
              bgcolor: "#3a3a3a",
              color: "white",
              p: 3,
              borderRadius: 1,
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="overline" sx={{ color: "#bdbdbd", fontSize: 10 }}>
              HEALTH INFORMATION
            </Typography>
            <Box>
              <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                OPD
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {patient.opd ?? "-"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                BLOOD GROUP
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {patient.bloodGroup ? getBloodType(patient.bloodGroup) : "-"}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: "#555" }} />
            <Typography variant="body2" sx={{ color: patient.chronicPatient ? "#ef9a9a" : "#9e9e9e", fontWeight: 700 }}>
              CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
            </Typography>
          </Box>
        </Box>

        {/* TABELLA RECORD CLINICI */}
        <Box sx={{ flex: 1, bgcolor: "white", p: 2, borderRadius: 1, border: "1px solid #e0e0e0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Medical Records
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(getNewRecordDetailPath(PATIENTS_PATH, patient.id))}
            >
              + Add Record
            </Button>
          </Box>
          <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Type of Visit</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Treatment</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Doctor</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ color: "#9e9e9e", py: 3 }}>
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((rec) => (
                    <TableRow
                      key={rec.id}
                      hover
                      onClick={() => navigate(`${getDetailPath(PATIENTS_PATH, patient.id)}/record/${rec.id}/edit`)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell sx={{ color: "#e57373" }}>{rec.date ?? "-"}</TableCell>
                      <TableCell>{rec.typeVisit ?? "-"}</TableCell>
                      <TableCell>{rec.reasonVisit ?? "-"}</TableCell>
                      <TableCell>{rec.treatmentMade ?? "-"}</TableCell>
                      <TableCell>{rec.doctor ? `${rec.doctor.name} ${rec.doctor.surname}` : "-"}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (rec.id) handleDeleteRecord(rec.id);
                          }}
                          sx={{ "&:hover": { color: "#f44336" } }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientIndex;
