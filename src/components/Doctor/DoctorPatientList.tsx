import { PatientDTO } from "@generated/axios";
import { DetailType } from "@lib/types";
import { generateAvatarImage } from "@lib/utils";
import {
  Avatar,
  Box,
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

interface IProps {
  patients?: PatientDTO[];
}

const DoctorPatientList: React.FC<IProps> = ({ patients }) => {
  return (
    <Box sx={{ flex: 1, bgcolor: "white", p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
        Assigned Patients
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>OPD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients && patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#9e9e9e", py: 3 }}>
                  No patients assigned
                </TableCell>
              </TableRow>
            ) : (
              patients?.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>{patient.id ?? "-"}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={generateAvatarImage(DetailType.PATIENT, patient.id)}
                        sx={{ width: 24, height: 24 }}
                      />
                      <span>
                        {patient.name} {patient.surname}
                      </span>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "#e57373" }}>{patient.opd ?? "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DoctorPatientList;