import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Card, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PatientEdit: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "Carlo",
    surname: "Marchiori",
    address: "Via Strade Perdute, 3",
    opd: "1222",
    idp: "32322",
    bloodGroup: "B-",
    chronicPatient: false,
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, chronicPatient: e.target.checked }));
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(PATIENTS_PATH)} style={{ textDecoration: "none", color: "#666" }}>
            Patients
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>

      {/* Titolo*/}
      <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: 700, color: "#333", fontSize: "1.15rem" }}>
        EDIT PATIENT
      </Typography>

      <Card
        sx={{
          p: "32px 24px",
          borderRadius: "4px",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
          border: "1px solid #E6E6E6",
          backgroundColor: "#FFF",
        }}
      >
        <Grid container spacing={3}>
          {/*Name, Surname, Address */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Name *"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Surname *"
              name="surname"
              fullWidth
              value={form.surname}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Address *"
              name="address"
              fullWidth
              value={form.address}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/*OPD, IDP, Blood Group */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="OPD *"
              name="opd"
              fullWidth
              value={form.opd}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="IDP *"
              name="idp"
              fullWidth
              value={form.idp}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Blood Group *"
              name="bloodGroup"
              fullWidth
              value={form.bloodGroup}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/*Chronic Patient Switch */}
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={<Switch checked={form.chronicPatient} onChange={handleSwitchChange} color="error" />}
              label="Chronic patient"
              sx={{ color: "#666" }}
            />
          </Grid>

          {/*Notes */}
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              rows={4}
              value={form.notes}
              onChange={handleChange}
              variant="outlined"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Pulsanti d'azione */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "#E31B23",
                  color: "#FFF",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  px: 3,
                  borderRadius: "4px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#C2181E",
                    boxShadow: "none",
                  },
                }}
              >
                Save
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{
                  color: "#E31B23",
                  borderColor: "#E31B23",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  px: 3,
                  borderRadius: "4px",
                  "&:hover": {
                    borderColor: "#C2181E",
                    backgroundColor: "rgba(227, 27, 35, 0.04)",
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PatientEdit;
