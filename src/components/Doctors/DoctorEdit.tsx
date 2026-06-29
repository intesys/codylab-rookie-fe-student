import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorApiApi, DoctorDTO } from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import { getDetailPath, getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DoctorForm from "./DoctorForm";

const api = new DoctorApiApi();
const emptyDoctor: DoctorDTO = {};

const DoctorEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [doctorData, loading] = useGetDetail<DoctorDTO>((id) => api.getDoctor(id), emptyDoctor, Number(id));
  const [doctor, setDoctor] = useState<DoctorDTO>(emptyDoctor);

  // Sincronizza lo stato locale quando i dati del medico finiscono di caricare
  useEffect(() => {
    if (!loading && doctorData) {
      setDoctor(doctorData);
    }
  }, [doctorData, loading]);

  const handleSave = () => {
    api.updateDoctor(Number(id), doctor).then(() => {
      navigate(getDetailPath(DOCTORS_PATH, id));
    });
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        EDIT DOCTOR
      </Typography>
      <DoctorForm doctor={doctor} onChange={setDoctor} onSave={handleSave} />
    </div>
  );
};

export default DoctorEdit;
