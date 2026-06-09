import Calendar from "@components/Home/Calendar";
import CallToActions from "@components/Home/CallToActions";
import MaterialList from "@components/Home/Materials/MaterialList";
import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import "./index.scss";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">
          Welcome{" "}
          <Typography variant="h5" color="primary" component="span">
            Mario Rossi
          </Typography>
        </Typography>
      </Box>
      <CallToActions />

      <Grid container spacing={4} className="home__row home__main">
        <Grid size={6}>
          <Typography variant="overline" sx={{ fontSize: "medium" }}>
            Materials are running out
          </Typography>
          <Card>
            <MaterialList />
          </Card>
        </Grid>
        <Grid size={6}>
          <Typography variant="overline" sx={{ fontSize: "medium" }}>
            Calendar
          </Typography>
          <Card>
            <Calendar />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
