import React, { useState, useEffect } from "react";
import ProviderMap from "./map";
import Provider from "./provider";
import {
  Container,
  Box,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
const Supervisor = () => {
  return (
    <Grid container>
      <Grid item xs style={{ flexGrow: 0.5 }}>
        <Provider></Provider>
      </Grid>
      <Grid item xs style={{ flexGrow: 2.5 }}>
        <ProviderMap></ProviderMap>
      </Grid>
      <Grid item xs style={{ flexGrow: 1 }}>
        <p>Alerts</p>
      </Grid>
    </Grid>
  );
};

export default Supervisor;
