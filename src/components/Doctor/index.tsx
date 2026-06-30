import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH, PATIENTS_PATH } from "@config/paths";
import { DoctorApiApi, DoctorDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath, getEditDetailPath } from "@lib/utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const doctorApi = new DoctorApiApi();
const emptyDoctor: DoctorDTO = {};

const Doctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctor, loading] = useGetDetail<DoctorDTO>((id) => doctorApi.getDoctor(id), emptyDoctor, Number(id));

  if (loading) return <Typography>Loading...</Typography>;

  const assignedPatients = doctor.latestPatients ?? [];

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={`/${DOCTORS_PATH}`}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>
          {doctor.name} {doctor.surname}
        </BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        DOCTOR DETAILS
      </Typography>

      {/* Header card con avatar, nome e professione */}
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
          src={generateAvatarImage(DetailType.DOCTOR, doctor.id) || undefined}
          alt={`${doctor.name} ${doctor.surname}`}
          style={{ width: 64, height: 64, borderRadius: "50%" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {doctor.name} <strong>{doctor.surname}</strong>
            <IconButton size="small" color="error" onClick={() => navigate(getEditDetailPath(DOCTORS_PATH, id))}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doctor.profession || "No profession assigned"}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ bgcolor: "#424242", color: "white", p: 3, borderRadius: 1, minWidth: 280, maxWidth: 280 }}>
          <Typography variant="overline" sx={{ color: "#ef9a9a", fontWeight: "bold" }}>
            CONTACTS
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
            <PhoneIcon fontSize="small" sx={{ color: "#ef9a9a" }} />
            <Typography variant="body2">{doctor.phoneNumber || "-"}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 4 }}>
            <EmailIcon fontSize="small" sx={{ color: "#ef9a9a" }} />
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {doctor.email || "-"}
            </Typography>
          </Box>

          <Box sx={{ borderTop: "1px solid #616161", my: 2 }} />

          <Typography variant="overline" sx={{ color: "#ef9a9a", fontWeight: "bold" }}>
            LAST VISITED PATIENTS
          </Typography>

          {assignedPatients.slice(0, 2).map((p: any) => (
            <Box key={p.id} sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
              <img
                src={generateAvatarImage(DetailType.PATIENT, p.id)}
                alt=""
                style={{ width: 32, height: 32, borderRadius: "50%" }}
              />
              <Typography variant="body2">
                {p.name} {p.surname}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ flex: 1, bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Patients
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>PID</TableCell>
                <TableCell>OPD</TableCell>
                <TableCell>IDP</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignedPatients.length > 0 ? (
                assignedPatients.map((p: any) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.opd || "-"}</TableCell>
                    <TableCell>{p.idp || "-"}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.surname}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => navigate(getDetailPath(PATIENTS_PATH, p.id))}>
                        <ArrowForwardIosIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: "text.secondary", py: 4 }}>
                    No patients assigned to this doctor.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </div>
  );
};

export default Doctor;
