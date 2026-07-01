import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import BreadcrumbEl from "@components/Breadcrumb/BreadcrumbEl";
import { DOCTORS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DoctorNew: React.FC = () => {
  const navigate = useNavigate();

  // Stato per gestire i valori dei campi di testo
  const [form, setForm] = useState({
    name: "",
    surname: "",
    profession: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Breadcrumb corretto: rimosso il doppione e pulito lo stile del link */}
      <Breadcrumb>
        <BreadcrumbEl>
          <Link to={getPath(DOCTORS_PATH)} style={{ textDecoration: "none", color: "#666" }}>
            Doctors
          </Link>
        </BreadcrumbEl>
        <BreadcrumbEl active>New</BreadcrumbEl>
      </Breadcrumb>

      {/* Titolo principale della pagina */}
      <Typography
        variant="h6"
        sx={{
          mt: 4,
          mb: 3,
          fontWeight: 700,
          color: "#212121",
          fontSize: "0.95rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        NEW DOCTOR
      </Typography>

      {/* Pannello bianco contenitore del form (Card) */}
      <Card
        sx={{
          p: "40px 32px",
          borderRadius: "4px",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid #E0E0E0",
          backgroundColor: "#FFF",
        }}
      >
        <Grid container spacing={3}>
          {/* PRIMA COLONNA: Name, Email e Bottoni d'azione sotto */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Name *"
                  name="name"
                  fullWidth
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email *"
                  name="email"
                  fullWidth
                  value={form.email}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Box dei Bottoni posizionato esattamente sotto il campo Email */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
                  {/* Bottone SAVE Rosso */}
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      backgroundColor: "#FF0000",
                      color: "#FFF",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      px: 2.5,
                      py: 0.8,
                      borderRadius: "4px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#D32F2F",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Save
                  </Button>

                  {/* Bottone BACK Bianco con contorno Rosso */}
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                      color: "#FF0000",
                      borderColor: "#FF0000",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      px: 2.5,
                      py: 0.8,
                      borderRadius: "4px",
                      borderWidth: "1px",
                      "&:hover": {
                        borderColor: "#D32F2F",
                        backgroundColor: "rgba(255, 0, 0, 0.04)",
                        borderWidth: "1px",
                      },
                    }}
                  >
                    Back
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* SECONDA COLONNA: Surname e Phone number */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Surname *"
                  name="surname"
                  fullWidth
                  value={form.surname}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Phone number *"
                  name="phone"
                  fullWidth
                  value={form.phone}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* TERZA COLONNA: Profession / Specializzazione */}
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Profession *"
              name="profession"
              fullWidth
              value={form.profession}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default DoctorNew;
