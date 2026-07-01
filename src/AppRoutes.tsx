import Billing from "@components/Billing";
import Doctor from "@components/Doctor";
import Doctors from "@components/Doctors";
import Home from "@components/Home";
import News from "@components/News";
import Patients from "@components/Patients";
import NewPatient from "@components/Patients/newPatient";
import NewPatientRecord from "@components/Patients/newPatientRecord";
import PatientDetail from "@components/Patients/patientDetail";
import PatientEdit from "@components/Patients/patientEdit";
import Pharmacy from "@components/Pharmacy";
import Ward from "@components/Ward";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rotte di Base */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Home />} />

      {/* Rotte Pazienti (Esplicite e senza inghippi di annidamento) */}
      <Route path="/patients" element={<Patients />} />
      <Route path="/patients/new" element={<NewPatient />} />
      <Route path="/patients/:id" element={<PatientDetail />} />
      <Route path="/patients/:id/edit" element={<PatientEdit />} />
      <Route path="/patients/:id/record/new" element={<NewPatientRecord />} />

      {/* Rotte Dottori */}
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<Doctor />} />

      {/* Altre sezioni */}
      <Route path="/pharmacy" element={<Pharmacy />} />
      <Route path="/ward" element={<Ward />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
};

export default AppRoutes;
