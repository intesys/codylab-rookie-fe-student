import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
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
import { Link, useNavigate } from "react-router-dom";

const Doctor: React.FC = () => {
  const doctor = {
    name: "Filippo",
    surname: "Dolci",
    specialty: "chirurgo",
    phone: "3490011222",
    email: "email.chenonghe1@gmail.com",
  };

  const lastVisitedPatients = [
    { pid: 4, name: "Enrico", surname: "Costanzi", color: "#666" },
    { pid: 3, name: "Carlo", surname: "Marchiori", color: "#0059B2" },
  ];

  const allPatients = [
    { pid: 3, opd: "1222", idp: "32322", name: "Carlo", surname: "Marchiori" },
    { pid: 4, opd: "5232", idp: "3211", name: "Enrico", surname: "Costanzi" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>

        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: 700, color: "#333", fontSize: "1.15rem" }}>
        DOCTOR DETAILS
      </Typography>

      {/* Card Superiore Profilo Medico */}
      <Card
        sx={{
          p: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 3,
          mb: 4,
          borderRadius: "4px",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid #E6E6E6",
          backgroundColor: "#FFF",
        }}
      >
        <Avatar
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=1`}
          sx={{
            width: 60,
            height: 60,

            bgcolor: "#005bae",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 500, color: "#333", fontSize: "1.6rem" }}>
              {doctor.name}{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                {doctor.surname}
              </Box>
            </Typography>
            <IconButton
              size="small"
              component={Link}
              to={`/doctors/${doctor.name}/edit`}
              sx={{ color: "#E31B23", ml: 0.5, p: 0 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "#666", fontStyle: "italic", mt: 0.5, fontSize: "0.85rem" }}>
            {doctor.specialty}
          </Typography>
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3.8 }}>
          <Box sx={{ bgcolor: "#3F4142", color: "#FFF", p: 3, borderRadius: "4px", minHeight: "340px" }}>
            {/* Sezione CONTATTI */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                letterSpacing: "0.8px",
                fontWeight: 700,
                mb: 2.5,
                color: "#9A9A9A",
                fontSize: "0.75rem",
              }}
            >
              CONTACTS
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <PhoneIcon sx={{ color: "#E31B23", fontSize: "1.1rem" }} />
              <Typography variant="body2" sx={{ color: "#EAEAEA", fontSize: "0.85rem" }}>
                {doctor.phone}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4.5 }}>
              <EmailIcon sx={{ color: "#E31B23", fontSize: "1.1rem" }} />
              <Typography variant="body2" sx={{ color: "#EAEAEA", fontSize: "0.85rem", wordBreak: "break-all" }}>
                {doctor.email}
              </Typography>
            </Box>

            {/*  ULTIMI VISITATI */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                letterSpacing: "0.8px",
                fontWeight: 700,
                mb: 2.5,
                color: "#9A9A9A",
                fontSize: "0.75rem",
              }}
            >
              LAST VISITED PATIENTS
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {lastVisitedPatients.map((patient) => (
                <Box key={patient.pid} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: patient.color, fontSize: "0.75rem" }}>👤</Avatar>
                  <Typography
                    variant="body2"
                    sx={{ color: "#FFF", fontSize: "0.85rem", fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {patient.name}
                    <Box
                      component="span"
                      sx={{ display: "block", fontWeight: 400, color: "#B0B0B0", fontSize: "0.8rem" }}
                    >
                      {patient.surname}
                    </Box>
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8.2 }}>
          <TableContainer
            component={Paper}
            sx={{
              p: "20px 24px",
              borderRadius: "4px",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid #E6E6E6",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "#333", fontSize: "1.05rem" }}>
              Patients
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    PID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    OPD
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    IDP
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    Surname
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 700,
                      color: "#999",
                      borderBottom: "1px solid #F0F0F0",
                      fontSize: "0.75rem",
                      px: 1,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPatients.map((patient) => (
                  <TableRow key={patient.pid} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell sx={{ py: 2, px: 1, color: "#444", fontSize: "0.85rem" }}>{patient.pid}</TableCell>
                    <TableCell sx={{ py: 2, px: 1, color: "#444", fontSize: "0.85rem" }}>{patient.opd}</TableCell>
                    <TableCell sx={{ py: 2, px: 1, color: "#444", fontSize: "0.85rem" }}>{patient.idp}</TableCell>
                    <TableCell sx={{ py: 2, px: 1, color: "#444", fontSize: "0.85rem" }}>{patient.name}</TableCell>
                    <TableCell sx={{ py: 2, px: 1, color: "#444", fontSize: "0.85rem" }}>{patient.surname}</TableCell>
                    <TableCell align="right" sx={{ py: 1, px: 1 }}>
                      <IconButton size="small" sx={{ color: "#555" }}>
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
