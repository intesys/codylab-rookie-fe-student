import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { api } from "@config/api";
import { DoctorDTO, DoctorFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getNewDetailPath } from "@lib/utils";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Action, doctorsFilterReducer } from "./lib";
import DoctorCard from "./DoctorCard";
import DoctorFilterForm from "./DoctorFilterForm";

interface IDoctorsFilterContext {
  filter: DoctorFilterDTO;
  dispatch: Dispatch<Action>;
}

export const DoctorsFilterContext: React.Context<IDoctorsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action: Action) => {},
});

const Doctors: React.FC = () => {
  const [filter, dispatch] = useReducer(doctorsFilterReducer, {});
  const doctorsContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const navigate = useNavigate();

  const [doctors, loading] = useGetList<DoctorDTO, DoctorFilterDTO>(api.doctors.getListDoctor, filter);

  return (
    <DoctorsFilterContext.Provider value={doctorsContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Doctors</BreadcrumbEl>
      </Breadcrumb>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          DOCTORS DATABASE
        </Typography>
        <Button variant="outlined" color="error" onClick={() => navigate(getNewDetailPath(DOCTORS_PATH))}>
          + ADD NEW DOCTOR
        </Button>
      </Box>
      <DoctorFilterForm />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </Grid>
          ))}
        </Grid>
      )}
    </DoctorsFilterContext.Provider>
  );
};

export default Doctors;
