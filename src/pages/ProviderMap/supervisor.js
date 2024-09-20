import React, { useState, useEffect } from "react";
import ProviderMap from "./map";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
const Supervisor = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs style={{ flexGrow: 1 }}>
        <p>Alert</p>
      </Grid>
      <Grid item xs style={{ flexGrow: 2.5 }}>
        <ProviderMap></ProviderMap>
      </Grid>
      <Grid item xs style={{ flexGrow: 1 }}>
        <p>Alert</p>
      </Grid>
    </Grid>
  );
};

export default Supervisor;
