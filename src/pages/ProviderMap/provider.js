import React from "react";
import {
  Container,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Provider = ({
  providers,
  onProviderSelect,
  selectedProvider,
  setSelectedProvider,
}) => {
  return (
    <Container>
      <p>Find Provider</p>
      <TextField
        id="search-provider"
        label="Search by name"
        variant="outlined"
      />
      <hr />
      {selectedProvider ? (
        <div>
          <Typography variant="h6">{selectedProvider.caregivername}</Typography>
          <Typography>Phone: {selectedProvider.phonenumber}</Typography>
          <Typography>State: {selectedProvider.state}</Typography>
          <Typography>Client: {selectedProvider.client}</Typography>
          <Typography>
            Active: {selectedProvider.active ? "Yes" : "No"}
          </Typography>
          <Typography>
            Coordinates: {selectedProvider.geodata.join(", ")}
          </Typography>
          <button onClick={() => setSelectedProvider(null)}>
            Back to List
          </button>
        </div>
      ) : (
        <List>
          {providers.map((provider) => (
            <React.Fragment key={provider.caregiverid}>
              <ListItem button onClick={() => onProviderSelect(provider)}>
                <ListItemText primary={provider.caregivername} />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Provider;
