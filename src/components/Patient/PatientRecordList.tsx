import { PATIENTS_PATH } from "@config/paths";
import { PatientRecordDTO } from "@generated/axios";
import { getNewRecordDetailPath } from "@lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";

interface IProps {
  patientId?: number;
  records: PatientRecordDTO[];
  onDeleteRecord?: (recordId: number) => void;
}

const PatientRecordList: React.FC<IProps> = ({ patientId, records, onDeleteRecord }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flex: 1, bgcolor: "white", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Records
        </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => navigate(getNewRecordDetailPath(PATIENTS_PATH, patientId))}
        >
          + RECORD
        </Button>
      </Box>
      <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Type of</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Reason</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Treatment made</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Doctor</TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#555" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#9e9e9e", py: 3 }}>
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id} hover>
                  <TableCell sx={{ color: "#e57373" }}>{record.date ?? "-"}</TableCell>
                  <TableCell>{record.typeVisit ?? "-"}</TableCell>
                  <TableCell sx={{ color: "#e57373" }}>{record.reasonVisit ?? "-"}</TableCell>
                  <TableCell>{record.treatmentMade ?? "-"}</TableCell>
                  <TableCell sx={{ color: "#e57373" }}>
                    {record.doctor ? `${record.doctor.name} ${record.doctor.surname}` : "-"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteRecord && record.id && onDeleteRecord(record.id)}
                      sx={{ color: "#9e9e9e" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientRecordList;
