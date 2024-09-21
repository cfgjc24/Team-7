import React, { useState, useEffect } from "react";
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
  const [searchID, setSearchID] = useState("");

  const handleSearch = () => {
    console.log(searchID);
    fetch(`/queryCareGiver?caregiverid=${searchID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("HELLO", data);
        if (data && data.geodata) {
          // Splice and convert geodata string into latitude and longitude
          const [lat, lon] = data.geodata.split(",").map(parseFloat);
          data.geodata = [lat, lon]; // Set the converted geodata array
          setSelectedProvider(data); // Update the selected provider with the new data
        } else {
          console.log(data);
          setSelectedProvider(null); // Handle no data found
        }
      })
      .catch((error) => {
        console.error("Error fetching provider:", error);
        setSelectedProvider([]); // In case of error, show an empty list
      });

    console.log(selectedProvider);
  };
  return (
    <Container sx={{ marginTop: "20px" }}>
      <h2>Find Provider</h2>
      <TextField
        id="search-provider"
        label="Search by ID"
        variant="outlined"
        onChange={(e) => setSearchID(e.target.value)}
      />
      <IconButton onClick={handleSearch}>
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
          <Typography variant="h6">
            {selectedProvider?.caregivername || selectedProvider?.caregiverID}
          </Typography>
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
            <React.Fragment key={provider.caregiverID}>
              <ListItem button onClick={() => onProviderSelect(provider)}>
                <ListItemText primary={provider.caregiverID} />
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
