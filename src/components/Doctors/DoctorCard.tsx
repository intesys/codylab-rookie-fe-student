import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath } from "@lib/utils";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  doctor: DoctorDTO;
}

const DoctorCard: React.FC<IProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(getDetailPath(DOCTORS_PATH, doctor.id))}>
      <CardActionArea>
        <CardContent sx={{ textAlign: "center", py: 3 }}>
          <img
            src={generateAvatarImage(DetailType.DOCTOR, doctor.id) || undefined}
            alt={`${doctor.name} ${doctor.surname}`}
            style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 8 }}
          />
          <Typography variant="h6">
            {doctor.name} <strong>{doctor.surname}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {doctor.profession || "-"}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 1 }}>
            <PhoneIcon fontSize="small" color="error" />
            <Typography variant="body2">{doctor.phoneNumber || "-"}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
            <EmailIcon fontSize="small" color="error" />
            <Typography variant="body2">{doctor.email || "-"}</Typography>
          </Box>
          <Typography variant="caption" sx={{ fontWeight: "bold", mt: 2, display: "block" }}>
            LAST PATIENTS VISITED
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
            {(doctor.latestPatients ?? []).map((patient) => (
              <Box key={patient.id} sx={{ textAlign: "center" }}>
                <img
                  src={generateAvatarImage(DetailType.PATIENT, patient.id) || undefined}
                  alt={`${patient.name}`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <Typography variant="caption" sx={{ display: "block" }}>
                  {patient.name} {patient.surname}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DoctorCard;
