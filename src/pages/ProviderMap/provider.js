import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const Provider = () => {
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    setProviderList(["provider 1", "provider 2"]);
  }, []);

  return (
    <Container>
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
    </Container>
  );
};
export default Provider;
