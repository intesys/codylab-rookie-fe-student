import { DoctorDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface IProps {
  doctor: DoctorDTO;
}

const DoctorDetail: React.FC<IProps> = ({ doctor }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Box
        sx={{
          bgcolor: "white",
          color: "black",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 1,
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={generateAvatarImage(DetailType.DOCTOR, doctor.id)}
            alt={`${doctor.name} ${doctor.surname}`}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 400, color: "black" }}>
              {doctor.name} <strong>{doctor.surname}</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {doctor.profession ?? "-"}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            {doctor.address ?? "-"}
          </Typography>
        </Box>

        {doctor.phoneNumber && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneIcon sx={{ fontSize: 16, color: "#e57373" }} />
            <Typography variant="body2" sx={{ color: "black" }}>
              {doctor.phoneNumber}
            </Typography>
          </Box>
        )}

        {doctor.email && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailIcon sx={{ fontSize: 16, color: "#e57373" }} />
            <Typography variant="body2" sx={{ color: "black" }}>
              {doctor.email}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DoctorDetail;