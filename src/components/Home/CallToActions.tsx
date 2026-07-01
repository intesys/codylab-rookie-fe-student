import { PATIENTS_PATH } from "@config/paths";
import { getPath } from "@lib/utils";
import { Add, Search } from "@mui/icons-material";
import { Button, Grid, SxProps } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const IconSx: SxProps = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 1,
  paddingX: 10,
  paddingY: 8,
};

const CallToActions: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={4}
      className="home__row home__call_to_actions"
      direction="row"
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <Button
          variant="contained"
          sx={IconSx}
          onClick={() => navigate(getPath(PATIENTS_PATH), { state: { view: "NEW" } })}
        >
          <Add sx={{ width: 60, height: 60 }} />
          Register new patient
        </Button>
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        <Button
          sx={{ ...IconSx, background: "#fff" }}
          color="secondary"
          onClick={() => navigate(getPath(PATIENTS_PATH))}
        >
          <Search sx={{ width: 60, height: 60 }} />
          Search for patients
        </Button>
      </Grid>
    </Grid>
  );
};

export default CallToActions;
