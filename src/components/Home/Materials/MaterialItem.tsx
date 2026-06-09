import { IMaterialItem } from "@components/Home/Materials/Types";
import { Button, Grid } from "@mui/material";
import React from "react";

const MaterialItem: React.FC<IMaterialItem> = ({ name, alert, quantity, weeksForRefueling }) => (
  <section className="drug_list__item">
    <Grid container spacing={4}>
      <Grid size={alert ? 6 : 12}>
        <h3>{name}</h3>
      </Grid>
      {alert && (
        <Grid size={6}>
          <h3>{alert}</h3>
        </Grid>
      )}
    </Grid>
    <Grid
      container
      spacing={4}
      sx={{ alignItems: "flex-end", alignContent: "center", textAlign: "center" }}
    >
      <Grid size={4}>
        <div className="drug_list__item__quantity">{quantity}</div>
        <div className="drug_list__item__caption">Vials remaining</div>
      </Grid>
      <Grid size={4}>
        <div className="drug_list__item__quantity">{weeksForRefueling}</div>
        <div className="drug_list__item__caption">weeks for the next refueling</div>
      </Grid>
      <Grid size={4}>
        <Button variant="outlined">Go to details</Button>
      </Grid>
    </Grid>
  </section>
);

export default MaterialItem;
