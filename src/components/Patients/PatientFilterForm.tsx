import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { PatientsFilterContext } from "./index";

const PatientFilterForm: React.FC = () => {
  const { filter, dispatch } = useContext(PatientsFilterContext);

  const [localFilter, setLocalFilter] = useState(filter);

  const handleSearch = () => {
    dispatch({ type: "SET_FILTER", payload: localFilter });
  };

  return (
    <Box sx={{ bgcolor: "white", p: 3, mb: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline", mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          FIND A PATIENT
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Insert the information of patient
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Patient ID (PID)"
          size="small"
          type="number"
          value={localFilter.id ?? ""}
          onChange={(e) => setLocalFilter((f) => ({ ...f, id: e.target.value ? Number(e.target.value) : undefined }))}
        />
        <TextField
          label="Outpatient Number (OPD)"
          size="small"
          type="number"
          value={localFilter.opd ?? ""}
          onChange={(e) => setLocalFilter((f) => ({ ...f, opd: e.target.value ? Number(e.target.value) : undefined }))}
        />
        <TextField
          label="Inpatient Number (IDP)"
          size="small"
          type="number"
          value={localFilter.idp ?? ""}
          onChange={(e) => setLocalFilter((f) => ({ ...f, idp: e.target.value ? Number(e.target.value) : undefined }))}
        />
        <Button variant="outlined" color="error" endIcon={<SearchIcon />} onClick={handleSearch}>
          SEARCH
        </Button>
      </Box>
    </Box>
  );
};

export default PatientFilterForm;
