import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import {
  DoctorApiApi,
  DoctorDTO,
  DoctorFilterDTO,
  PatientApiApi,
  PatientDTO,
  PatientRecordApiApi,
  PatientRecordDTO,
} from "@generated/axios";
import useGetDetail from "@hooks/useGetDetail";
import useGetList from "@hooks/useGetList";
import { getDetailPath, getPath } from "@lib/utils";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const patientApi = new PatientApiApi();
const recordApi = new PatientRecordApiApi();
const doctorApi = new DoctorApiApi();
const emptyPatient: PatientDTO = {};
const emptyDoctorFilter: DoctorFilterDTO = {};

const PatientRecordNew: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [patient] = useGetDetail<PatientDTO>((id) => patientApi.getPatient(id), emptyPatient, Number(id));

  const [doctorList] = useGetList<DoctorDTO, DoctorFilterDTO>(
    doctorApi.getListDoctor.bind(doctorApi),
    emptyDoctorFilter
  );
  const doctors = Array.isArray(doctorList) ? doctorList : [];

  const [record, setRecord] = useState<PatientRecordDTO>({
    patientId: Number(id),
    date: new Date().toLocaleDateString("it-IT"),
  });

  const handleSave = () => {
    recordApi.createPatientRecord(record).then(() => {
      navigate(getDetailPath(PATIENTS_PATH, id));
    });
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)}>Patients</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getDetailPath(PATIENTS_PATH, id)}>
            {patient.name} {patient.surname}
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New record</BreadcrumbEl>
      </Breadcrumb>

      <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, border: "1px solid #e0e0e0" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Date"
            fullWidth
            value={record.date ?? ""}
            onChange={(e) => setRecord({ ...record, date: e.target.value })}
          />
          <TextField
            label="Type of visit *"
            fullWidth
            value={record.typeVisit ?? ""}
            onChange={(e) => setRecord({ ...record, typeVisit: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel>Doctor *</InputLabel>
            <Select
              label="Doctor *"
              value={record.doctor?.id ?? ""}
              onChange={(e) => {
                const selected = doctors.find((d) => d.id === Number(e.target.value));
                setRecord({ ...record, doctor: selected });
              }}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name} {doctor.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Reason of visit *"
            fullWidth
            multiline
            rows={3}
            value={record.reasonVisit ?? ""}
            onChange={(e) => setRecord({ ...record, reasonVisit: e.target.value })}
          />
          <TextField
            label="Treatment made *"
            fullWidth
            multiline
            rows={3}
            value={record.treatmentMade ?? ""}
            onChange={(e) => setRecord({ ...record, treatmentMade: e.target.value })}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="error" onClick={handleSave}>
            SAVE 💾
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            BACK
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PatientRecordNew;
