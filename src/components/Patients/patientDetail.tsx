import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PatientDTO, PatientRecordDTO } from "@generated/axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  Card,
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

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const numericId = id ? Number(id) : 0;

  const [patient, setPatient] = useState<PatientDTO | null>(null);
  const [records, setRecords] = useState<PatientRecordDTO[]>([]);
  const [loadingPatient, setLoadingPatient] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);

  useEffect(() => {
    if (!numericId || isNaN(numericId)) return;

    setLoadingPatient(true);
    api.patients
      .getPatient(numericId)
      .then((res) => {
        setPatient(res.data ?? null);
      })
      .catch((err) => {
        enqueueSnackbar(`Error loading patient: ${err.message}`, { variant: "error" });
      })
      .finally(() => setLoadingPatient(false));

    setLoadingRecords(true);
    api.patientRecords
      .getPatientRecord(numericId)
      .then((res: any) => {
        const recordsData = Array.isArray(res.data) ? res.data : res.data ? [res.data] : [];
        setRecords(recordsData);
      })
      .catch(() => {
        setRecords([]);
      })
      .finally(() => setLoadingRecords(false));
  }, [numericId, enqueueSnackbar]);

  const handleDeletePatient = () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      api.patients
        .deletePatient(numericId)
        .then(() => {
          enqueueSnackbar("Patient deleted successfully", { variant: "success" });
          navigate("/patients");
        })
        .catch((err) => {
          enqueueSnackbar(`Failed to delete patient: ${err.message}`, { variant: "error" });
        });
    }
  };

  if (loadingPatient) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading patient information...
      </Typography>
    );
  }

  if (!patient && !loadingPatient) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Patient not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to="/patients">Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {patient?.name?.toLowerCase()} {patient?.surname?.toLowerCase()}
        </BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
          Patient Details
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeletePatient}
          sx={{ borderRadius: 2, fontWeight: 600, px: 2 }}
        >
          DELETE
        </Button>
      </Box>

      <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          boxShadow: "none",
          mb: 4,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#1976d2",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {patient?.name?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {patient?.name} {patient?.surname}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {patient?.address}
          </Typography>
        </Box>
      </Card>

      <Box sx={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 4, alignItems: "start" }}>
        <Box
          sx={{
            bgcolor: "#37474f",
            color: "white",
            p: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.2)", pb: 1 }}
          >
            HEALTH INFO
          </Typography>
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}>
              ID
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {patient?.id}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}>
              OPD
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {patient?.opd ?? "-"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}>
              BLOOD GROUP
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {patient?.bloodGroup ?? "-"}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Records
            </Typography>
            <Button
              variant="contained"
              color="error"
              startIcon={<AddIcon />}
              onClick={() => navigate(`/patients/${numericId}/record/new`)}
              sx={{ borderRadius: 2, fontWeight: 600, px: 2.5 }}
            >
              RECORD
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0", borderRadius: 1 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, width: "20%" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: "40%" }}>Reason</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: "40%" }}>Treatment</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingRecords ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
                      Loading patient clinical records...
                    </TableCell>
                  </TableRow>
                ) : records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary", fontWeight: 500 }}>
                      No records
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((rec) => (
                    <TableRow key={rec.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {rec.date ? new Date(rec.date).toLocaleDateString("it-IT") : "-"}
                      </TableCell>
                      <TableCell>{rec.reasonVisit ?? "-"}</TableCell>
                      <TableCell>{rec.treatmentMade ?? "-"}</TableCell>
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

export default PatientDetails;
