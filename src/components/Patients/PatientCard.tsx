import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath } from "@lib/utils";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  patient: PatientDTO;
}

const PatientCard: React.FC<IProps> = ({ patient }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(getDetailPath(PATIENTS_PATH, patient.id))}>
      <CardActionArea>
        <CardContent sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h6">
            {patient.name} <strong>{patient.surname}</strong>
          </Typography>
          <Typography variant="body2" color="primary">
            PID: {patient.id} | OPD: {patient.opd} | IDP: {patient.idp}
          </Typography>
          <img
            src={generateAvatarImage(DetailType.PATIENT, patient.id)}
            alt={`${patient.name} ${patient.surname}`}
            style={{ width: 80, height: 80, borderRadius: "50%", marginTop: 8 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PatientCard;
