import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { api } from "@config/api";
import { PATIENTS_PATH } from "@config/paths";
import { PatientDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Card, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IndexPatients: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [patients, setPatients] = useState<PatientDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchPid, setSearchPid] = useState("");
  const [searchOpd, setSearchOpd] = useState("");
  const [searchIdp, setSearchIdp] = useState("");

  const fetchPatients = () => {
    setLoading(true);
    api.patients
      .getListPatient(0, 100, "", {})
      .then((res) => {
        setPatients(res.data ?? []);
      })
      .catch((err) => {
        enqueueSnackbar(`Error loading patients: ${err.message}`, { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPid && !searchOpd && !searchIdp) {
      fetchPatients();
      return;
    }

    const filtered = patients.filter((p) => {
      const matchPid = searchPid ? p.id === Number(searchPid) : true;
      const matchOpd = searchOpd ? p.opd === Number(searchOpd) : true;
      const matchIdp = searchIdp ? p.idp === Number(searchIdp) : true;
      return matchPid && matchOpd && matchIdp;
    });
    setPatients(filtered);
  };

  const handleNavigateNew = () => {
    const basePath = getPath(PATIENTS_PATH);
    const newPath = `${basePath}/new`.replace(/\/\//g, "/");
    navigate(newPath);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, mt: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
          PATIENTS DATABASE
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<PersonAddIcon />}
          onClick={handleNavigateNew}
          sx={{ borderRadius: 2, fontWeight: 600, px: 2 }}
        >
          ADD NEW PATIENT
        </Button>
      </Box>

      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
          mb: 4,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
          FIND A PATIENT
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5 }}>
          Insert the information of patient
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 2, alignItems: "center" }}>
          <TextField
            label="Patient ID (PID)"
            size="small"
            type="number"
            value={searchPid}
            onChange={(e) => setSearchPid(e.target.value)}
          />
          <TextField
            label="Outpatient Number (OPD)"
            size="small"
            type="number"
            value={searchOpd}
            onChange={(e) => setSearchOpd(e.target.value)}
          />
          <TextField
            label="Inpatient Number (IDP)"
            size="small"
            type="number"
            value={searchIdp}
            onChange={(e) => setSearchIdp(e.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            color="error"
            startIcon={<SearchIcon />}
            sx={{ height: "40px", px: 3, fontWeight: 600 }}
          >
            SEARCH
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Typography align="center">Loading patients database...</Typography>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 3 }}>
          {patients.map((p) => (
            <Card
              key={p.id}
              onClick={() => navigate(`/patients/${p.id}`)}
              sx={{
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {p.name} {p.surname}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, mb: 3 }}>
                PID: <strong style={{ color: "#333" }}>{p.id}</strong> | OPD:{" "}
                <strong style={{ color: "#333" }}>{p.opd ?? "-"}</strong> | IDP:{" "}
                <strong style={{ color: "#333" }}>{p.idp ?? "-"}</strong>
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    bgcolor: p.id && p.id % 2 === 0 ? "#757575" : "#1976d2",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, alignItems: "center" }}>
                    <Box sx={{ width: 40, height: 12, bgcolor: "rgba(255,255,255,0.3)", borderRadius: 1 }} />
                    <Box sx={{ width: 25, height: 6, bgcolor: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
                  </Box>
                </Avatar>
              </Box>
            </Card>
          ))}
          {patients.length === 0 && (
            <Typography sx={{ gridColumn: "1 / -1", color: "text.secondary", py: 4 }} align="center">
              No patients found in the database.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default IndexPatients;
