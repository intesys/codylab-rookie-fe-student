import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage, getBloodType, getEditDetailPath } from "@lib/utils";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  patient: PatientDTO;
}

const PatientDetail: React.FC<IProps> = ({ patient }) => {
  const navigate = useNavigate();

  const lastRecord =
    patient.patientRecords && patient.patientRecords.length > 0
      ? patient.patientRecords[patient.patientRecords.length - 1]
      : null;

  const lastDoctor = lastRecord?.doctor ?? null;

  return (
    <Box sx={{ display: "flex", gap: 0, borderRadius: 1, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      <Box
        sx={{
          width: 300,
          minWidth: 300,
          bgcolor: "#3a3a3a",
          color: "white",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar
            src={generateAvatarImage(DetailType.PATIENT, patient.id)}
            alt={`${patient.name} ${patient.surname}`}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, color: "white" }}>
                {patient.name} <strong>{patient.surname}</strong>
              </Typography>
              <EditIcon
                sx={{ fontSize: 16, color: "#e57373", cursor: "pointer", ml: 0.5 }}
                onClick={() => navigate(getEditDetailPath(PATIENTS_PATH, patient.id))}
              />
            </Box>
            <Typography variant="body2" sx={{ color: "#bdbdbd" }}>
              {patient.address ?? "-"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "#555" }} />

        <Typography variant="overline" sx={{ color: "#bdbdbd", letterSpacing: 1.5, fontSize: 10 }}>
          HEALTH INFORMATION
        </Typography>

        <Box>
          <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
            PATIENT ID
          </Typography>
          <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
            {patient.id ?? "-"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
            OPD
          </Typography>
          <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
            {patient.opd ?? "-"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
            BLOOD GROUP
          </Typography>
          <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
            {patient.bloodGroup ? getBloodType(patient.bloodGroup) : "-"}
          </Typography>
        </Box>

        {patient.notes && (
          <Box>
            <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
              Notes
            </Typography>
            <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
              {patient.notes}
            </Typography>
          </Box>
        )}

        <Divider sx={{ borderColor: "#555" }} />

        <Typography variant="body2" sx={{ color: patient.chronicPatient ? "#ef9a9a" : "#9e9e9e", fontWeight: 700 }}>
          CHRONIC PATIENT: {patient.chronicPatient ? "YES" : "NO"}
        </Typography>

        {lastRecord && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <AccessTimeIcon sx={{ fontSize: 18, color: "#9e9e9e", mt: 0.2 }} />
              <Box>
                <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                  Last admission:
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {lastRecord.date ?? "-"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <LocalHospitalIcon sx={{ fontSize: 18, color: "#9e9e9e", mt: 0.2 }} />
              <Box>
                <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                  Reason of visit:
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {lastRecord.reasonVisit ?? "-"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <MedicalServicesIcon sx={{ fontSize: 18, color: "#9e9e9e", mt: 0.2 }} />
              <Box>
                <Typography variant="caption" sx={{ color: "#9e9e9e" }}>
                  Treatment made:
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  {lastRecord.treatmentMade ?? "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Divider sx={{ borderColor: "#555" }} />

      {lastDoctor && (
          <Box>
            <Typography variant="caption" sx={{ color: "#9e9e9e", letterSpacing: 1 }}>
              LAST DOCTOR WHO VISIT THE PATIENT
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
              <Avatar src={generateAvatarImage(DetailType.PATIENT, lastDoctor.id)} sx={{ width: 36, height: 36 }} />
              <Typography variant="body1" sx={{ color: "white", fontWeight: 600 }}>
                {lastDoctor.name} {lastDoctor.surname}
              </Typography>
            </Box>
            {lastDoctor.phoneNumber && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, color: "#e57373" }} />
                <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                  {lastDoctor.phoneNumber}
                </Typography>
              </Box>
            )}
            {lastDoctor.email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <EmailIcon sx={{ fontSize: 16, color: "#e57373" }} />
                <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                  {lastDoctor.email}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatientDetail;
