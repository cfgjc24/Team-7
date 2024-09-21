import React from "react";
import {
  Container,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
const Provider = ({
  providers,
  onProviderSelect,
  selectedProvider,
  setSelectedProvider,
}) => {
  return (
    <Container sx={{ marginTop: "20px" }}>
      <h2>Find Provider</h2>
      <TextField
        id="search-provider"
        label="Search by name"
        variant="outlined"
      />
      <IconButton>
        <ManageSearchIcon
          style={{
            fontSize: 50,
            marginLeft: 10,
            marginRight: -20,
            marginTop: -10,
          }}
        />
      </IconButton>

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
          <Button
            variant="outlined"
            onClick={() => setSelectedProvider(null)}
            sx={{
              color: "black",
              borderColor: "black",
              "&:hover": {
                borderColor: "black",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
              marginTop: "10px",
            }}
          >
            Back to List
          </Button>
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
