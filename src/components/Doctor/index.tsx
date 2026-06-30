import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { api } from "@config/api";
import { DoctorDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getPath } from "@lib/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DoctorDetail from "./DoctorDetail";
import DoctorPatientList from "./DoctorPatientList";

const EMPTY_DOCTOR: DoctorDTO = {};

const Doctor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, loading] = useGetDetail<DoctorDTO>(api.doctors.getDoctor, EMPTY_DOCTOR, Number(id));
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      api.doctors
        .deleteDoctor(Number(id))
        .then(() => {
          enqueueSnackbar("Doctor deleted successfully", { variant: "success" });
          navigate(getPath(DOCTORS_PATH));
        })
        .catch((err) => enqueueSnackbar(`Error: ${err.message}`, { variant: "error" }));
    }
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>{loading ? "" : `${doctor.name} ${doctor.surname}`}</BreadcrumbEl>
      </Breadcrumb>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              DOCTOR DETAILS
            </Typography>
            <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
              DELETE
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <DoctorDetail doctor={doctor} />
            <DoctorPatientList patients={doctor.latestPatients ?? []} />
          </Box>
        </>
      )}
    </div>
  );
};

export default Doctor;
