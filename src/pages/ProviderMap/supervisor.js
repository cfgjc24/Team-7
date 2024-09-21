import React, { useState, useEffect } from "react";
import { Provider, ProviderMap } from "./provider";
import Grid from "@mui/material/Grid2";
import AlertLayout from "./alert";
const Supervisor = () => {
  return (
    <Grid container>
      <Grid item xs style={{ flexGrow: 0.2 }}>
        <Provider></Provider>
      </Grid>
      <Grid item xs style={{ flexGrow: 2.5 }}>
        <ProviderMap></ProviderMap>
      </Grid>
      <Grid item xs style={{ flexGrow: 0.8 }}>
        <AlertLayout></AlertLayout>
      </Grid>
    </Grid>
  );
};

export default Supervisor;
