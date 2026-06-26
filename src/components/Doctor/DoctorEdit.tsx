import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorEdit: React.FC = () => {
  const navigate = useNavigate();

  // Stato iniziale popolato con i dati del dottore
  const [form, setForm] = useState({
    name: "Filippo",
    surname: "Dolci",
    profession: "chirurgo",
    email: "email.chenonghe1@gmail.com",
    phone: "3490011222",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Breadcrumb fisso basato sulla struttura del tutor */}
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Home</Link>
        </BreadcrumbEl>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)}>Doctors</Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>Edit</BreadcrumbEl>
      </Breadcrumb>

      <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: 700, color: "#333", fontSize: "1.15rem" }}>
        EDIT DOCTOR
      </Typography>

      {/* Card contenitore del Form */}
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
          {/* Campo Nome */}
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

          {/* Campo Cognome */}
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

          {/* Campo Professione */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Profession *"
              name="profession"
              fullWidth
              value={form.profession}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Campo Email */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Email *"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Campo Numero di Telefono */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Phone number *"
              name="phone"
              fullWidth
              value={form.phone}
              onChange={handleChange}
              variant="outlined"
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          {/* Barra dei Bottoni inferiore */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              {/* Bottone SAVE Rosso */}
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

              {/* Bottone BACK Bianco con bordo rosso */}
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

export default DoctorEdit;
