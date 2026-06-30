import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom"; // <--- IMPORTANTE: Aggiunto Link qui
import { DoctorFilterDTO } from "../../generated/axios";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
import { Action, doctorsFilterReducer } from "./lib";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action) => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const navigate = useNavigate();

  const mockDoctors = [
    {
      id: 1,
      name: "Filippo",
      surname: "Dolci",
      specialization: "chirurgo",
      phone: "3490011222",
      email: "email.chenonghe1@gmail.com",
      color: "#005bae",
      patients: ["Enrico Costanzi", "Carlo Marchiori"],
    },
    {
      id: 2,
      name: "Alessandro",
      surname: "Falezza",
      specialization: "otorino laringoiatra",
      phone: "3490011222",
      email: "email.chenonghe2@gmail.com",
      color: "#2e7d32",
      patients: ["Denny Moscon", "Enrico Costanzi", "Carlo Marchiori"],
    },
    {
      id: 3,
      name: "Marco",
      surname: "Gialli",
      specialization: "Medico di base",
      phone: "0230122222",
      email: "marco.gialli@ho.com",
      color: "#fbc02d",
      patients: ["Carlo Marchiori"],
    },
  ];

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#212121", textTransform: "uppercase" }}>
          Doctors Database
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(`${getPath(DOCTORS_PATH)}/new`)}
          sx={{ color: "#FF0000", borderColor: "#FF0000", fontWeight: 700 }}
        >
          + Add New Doctor
        </Button>
      </Box>

      {/* Filtro */}
      <Card sx={{ p: 3, mb: 4, borderRadius: "4px" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          Find a Doctors
        </Typography>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 3 }}>
            <TextField label="Name" fullWidth size="small" />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField label="Surname" fullWidth size="small" />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <TextField label="Profession/ Specialization" fullWidth size="small" />
          </Grid>
          <Grid size={{ xs: 3 }}>
            <Button
              fullWidth
              variant="contained"
              endIcon={<SearchIcon />}
              sx={{ backgroundColor: "#FF0000", "&:hover": { backgroundColor: "#CC0000" } }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Lista Medici */}
      <Grid container spacing={3}>
        {mockDoctors.map((doctor) => (
          <Grid size={{ xs: 12, md: 4 }} key={doctor.id}>
            {/* AGGIUNTA: Trasformata la Card in un Link */}
            <Card
              component={Link}
              to={`/doctors/${doctor.id}`}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: "4px",
                textDecoration: "none", // Rimuove il sottolineato
                color: "inherit", // Mantiene il colore del testo
                display: "block",
                transition: "0.3s",
                "&:hover": { boxShadow: 6 }, // Aggiunge un effetto hover carino
              }}
            >
              <Avatar
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${doctor.id}`}
                sx={{ width: 80, height: 80, mx: "auto", mb: 2, bgcolor: doctor.color }}
              />
              <Typography variant="h6">
                {doctor.name} <strong>{doctor.surname}</strong>
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                {doctor.specialization}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography color="error" variant="body2">
                  {doctor.phone}
                </Typography>
                <Typography color="error" variant="body2">
                  {doctor.email}
                </Typography>
              </Box>

              <Box sx={{ borderTop: "1px solid #eee", pt: 2, textAlign: "left" }}>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  LAST PATIENTS VISITED
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {doctor.patients.map((p) => (
                    <Box key={p} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${p}`}
                        sx={{ width: 20, height: 20 }}
                      />
                      <Typography variant="caption">{p}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;

//import React, { Dispatch, useMemo, useReducer } from "react";
//import { DoctorFilterDTO } from "../../generated/axios";
//import Breadcrumb from "../Breadcrumb/Breadcrumb";
//import BreadcrumbEl from "../Breadcrumb/BreadcrumbEl";
//import { Action, doctorsFilterReducer } from "./lib";

//interface IDoctorsFilterContext {
//filter: DoctorFilterDTO;
//dispatch: Dispatch<Action>;
//}

//export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
//filter: {},
//dispatch: (action) => {},
//});

//const Doctors: React.FC = () => {
//const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
//const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);

//return (
//<DoctorsFilterContext.Provider value={doctorsContextValue}>
//<Breadcrumb>
//<BreadcrumbEl active>Doctors</BreadcrumbEl>
//</Breadcrumb>
//{/* Doctors filter form */}
//{/* Doctors list */}
//</DoctorsFilterContext.Provider>
//);
//};

//export default Doctors;
