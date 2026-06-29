import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { api } from "@config/api";
import { PatientDTO, PatientFilterDTO } from "@generated/axios";
import useGetList from "@hooks/useGetList";
import { getNewDetailPath } from "@lib/utils";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { Dispatch, useMemo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Action, patientsFilterReducer } from "./lib";
import PatientCard from "./PatientCard";
import PatientFilterForm from "./PatientFilterForm";
interface IPatientsFilterContext {
  filter: PatientFilterDTO;
  dispatch: Dispatch<Action>;
}

export const PatientsFilterContext: React.Context<IPatientsFilterContext> = React.createContext({
  filter: {},
  dispatch: (action: Action) => {},
});

const Patients: React.FC = () => {
  const [filter, dispatch] = useReducer(patientsFilterReducer, {});
  const patientContextValue = useMemo(() => ({ filter, dispatch }), [filter, dispatch]);
  const navigate = useNavigate();

  const [patients, loading] = useGetList<PatientDTO, PatientFilterDTO>(api.patients.getListPatient, filter);

  return (
    <PatientsFilterContext.Provider value={patientContextValue}>
      <Breadcrumb>
        <BreadcrumbEl active>Patients</BreadcrumbEl>
      </Breadcrumb>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          PATIENTS DATABASE
        </Typography>
        <Button variant="outlined" color="error" onClick={() => navigate(getNewDetailPath(PATIENTS_PATH))}>
          + ADD NEW PATIENT
        </Button>
      </Box>
      <PatientFilterForm />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={patient.id}>
              <PatientCard patient={patient} />
            </Grid>
          ))}
        </Grid>
      )}
    </PatientsFilterContext.Provider>
  );
};

export default Patients;
