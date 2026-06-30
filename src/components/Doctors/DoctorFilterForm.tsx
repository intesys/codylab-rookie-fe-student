import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { DoctorsFilterContext } from "./index";

const DoctorFilterForm: React.FC = () => {
  const { filter, dispatch } = useContext(DoctorsFilterContext);

  const [localFilter, setLocalFilter] = useState(filter);

  const handleSearch = () => {
    dispatch({ type: "SET_FILTER", payload: localFilter });
  };

  return (
    <Box sx={{ bgcolor: "white", p: 3, mb: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline", mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          FIND A DOCTOR
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Insert the doctor's information
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Name"
          size="small"
          value={localFilter.name ?? ""}
          onChange={(e) => setLocalFilter((f) => ({ ...f, name: e.target.value || undefined }))}
        />
        <TextField
          label="Surname"
          size="small"
          value={localFilter.surname ?? ""}
          onChange={(e) => setLocalFilter((f) => ({ ...f, surname: e.target.value || undefined }))}
        />
        <Button variant="outlined" color="error" endIcon={<SearchIcon />} onClick={handleSearch}>
          SEARCH
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorFilterForm;
