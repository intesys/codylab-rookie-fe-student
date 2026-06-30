import { DOCTORS_PATH } from "@config/paths";
import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getDetailPath } from "@lib/utils";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
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
          <Typography variant="h6">
            {doctor.name} <strong>{doctor.surname}</strong>
          </Typography>
          <Typography variant="body2" color="primary">
            ID: {doctor.id}
          </Typography>
          <img
            src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
            alt={`${doctor.name} ${doctor.surname}`}
            style={{ width: 80, height: 80, borderRadius: "50%", marginTop: 8 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DoctorCard;
