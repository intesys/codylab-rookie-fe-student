import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Card,
  Grid,
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
import React from "react";
import { Link, useParams } from "react-router-dom";

const Doctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch(`/api/doctors/${id || "filippo-dolci"}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  if (!data)
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Doctor not found</Typography>
      </Box>
    );

  const { doctor, lastVisitedPatients, allPatients } = data;
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl active>
          {doctor?.name} {doctor?.surname}
        </BreadcrumbEl>
        <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        <BreadcrumbEl active>{/* Doctor name and surname */}</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: "bold", color: "#333" }}>
        DOCTOR DETAILS
      </Typography>

      {/* Card Profilo Medico */}
      <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 4,
          borderRadius: "4px",
          boxShadow: "none",
          border: "1px solid #E0E0E0",
        }}
      >
        <Avatar sx={{ bgcolor: "#004C99", width: 64, height: 64 }}>
          <AccountCircleIcon sx={{ fontSize: 45 }} />
        </Avatar>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {doctor?.name} {doctor?.surname}
            </Typography>
            <IconButton size="small" sx={{ color: "#E31B23" }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "#777", fontStyle: "italic", mt: 0.5 }}>
            {doctor?.specialty}
          </Typography>
        </Box>
      </Card>

      {/* Griglia a due colonne (Sidebar + Tabella) */}
      <Grid container spacing={4}>
        {/* Sidebar Contatti */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ bgcolor: "#3F4142", color: "#FFF", p: 3, borderRadius: "4px" }}>
            <Typography
              variant="caption"
              sx={{ display: "block", letterSpacing: "1px", fontWeight: "bold", mb: 2, color: "#AAA" }}
            >
              CONTACTS
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <PhoneIcon sx={{ color: "#E31B23", fontSize: "1.2rem" }} />
              <Typography variant="body2">{doctor?.phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <EmailIcon sx={{ color: "#E31B23", fontSize: "1.2rem" }} />
              <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                {doctor?.email}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{ display: "block", letterSpacing: "1px", fontWeight: "bold", mb: 2, color: "#AAA" }}
            >
              LAST VISITED PATIENTS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {lastVisitedPatients?.map((patient: any) => (
                <Box key={patient.pid} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: "#555" }} />
                  <Typography variant="body2">
                    {patient.name} {patient.surname}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Tabella Pazienti */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TableContainer
            component={Paper}
            sx={{ p: 3, borderRadius: "4px", boxShadow: "none", border: "1px solid #E0E0E0" }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Patients
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>PID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>OPD</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>IDP</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#888" }}>Surname</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold", color: "#888" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPatients?.map((patient: any) => (
                  <TableRow key={patient.pid}>
                    <TableCell>{patient.pid}</TableCell>
                    <TableCell>{patient.opd}</TableCell>
                    <TableCell>{patient.idp}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.surname}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <ChevronRightIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Doctor;

//import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
//import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
//import { DOCTORS_PATH } from "@config/paths";
//import { getPath } from "@lib/utils";
//import React from "react";
//import { Link } from "react-router-dom";

//const Doctor: React.FC = () => {
//  return (
//  <div>
//  <Breadcrumb>
//  <BreadcrumbEl>
//  <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
//<BreadcrumbEl>
//<BreadcrumbEl active>{/* Doctor name and surname */}</BreadcrumbEl>
//</Breadcrumb>
//</div>
//);
//};
//export default Doctor */
