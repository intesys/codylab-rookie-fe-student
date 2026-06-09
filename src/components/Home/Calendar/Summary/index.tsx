import { Grid } from "@mui/material";
import React from "react";
import "./index.scss";

const Summary: React.FC = () => (
  <div className="calendar__appointment_summary">
    <Grid container spacing={4}>
      <Grid size={4}>
        -
      </Grid>
      <Grid size={4}>
        -
      </Grid>
      <Grid size={4}>
        -
      </Grid>
    </Grid>
  </div>
);

export default Summary;
