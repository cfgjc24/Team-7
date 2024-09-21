import React, { useState, useEffect } from "react";
import ProviderMap from "./map";
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
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    setProviderList(["provider 1", "provider 2"]);
  }, []);

  return (
    <Grid container>
      <Grid item xs style={{ flexGrow: 0.5 }}>
        <p>Find Provider</p>
        <TextField
          id="search-provider"
          label="Search by name"
          variant="outlined"
        />
        <hr></hr>
        <List>
          {providerList.map((provider, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={provider} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
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
