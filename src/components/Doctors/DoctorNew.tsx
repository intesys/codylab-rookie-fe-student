import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { DoctorApiApi, DoctorDTO } from "@generated/axios";
import { getPath } from "@lib/utils";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DoctorForm from "./DoctorForm";

const api = new DoctorApiApi();

const DoctorNew: React.FC = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<DoctorDTO>({});

  const handleSave = () => {
    api.createDoctor(doctor).then(() => {
      navigate(getPath(DOCTORS_PATH));
    });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
        NEW DOCTOR
      </Typography>
      <DoctorForm doctor={doctor} onChange={setDoctor} onSave={handleSave} />
    </div>
  );
};

export default DoctorNew;
