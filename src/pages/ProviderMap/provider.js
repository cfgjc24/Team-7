import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
link.crossOrigin = "anonymous";
document.head.appendChild(link);

const ProviderMap = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions([
      [40.728157, -74.077644],
      [41.728157, -73.077644],
      [39.728157, -75.077644],
    ]);
  }, []);

  return (
    <MapContainer
      center={[40.728157, -74.077644]}
      zoom={12}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((position, index) => (
        <Marker key={index} position={position}></Marker>
      ))}
    </MapContainer>
  );
};

const Provider = () => {
  /* provider format:
    caregiverid: 
    state: str
    client: str
    active: bool
    geodata: [x, y]
    */
  const [providerList, setProviderList] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    const providers = [
      {
        caregiverid: "1",
        caregivername: "Name A",
        phonenumber: "666-666-6666",
        state: "Emergency",
        client: "Client A",
        active: true,
        geodata: [40.728, -74.077],
      },
      {
        caregiverid: "2",
        caregivername: "Name B",
        phonenumber: "666-666-6666",
        state: "At home",
        client: "Client B",
        active: true,
        geodata: [40.7128, -74.006],
      },
    ];

    setProviderList(providers);
  }, []);
  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <Container>
      <p>Find Provider</p>
      <TextField
        id="search-provider"
        label="Search by name"
        variant="outlined"
      />
      <hr></hr>
      {selectedProvider ? (
        // Display selected provider details
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
        // Display provider list
        <List>
          {providerList.map((provider) => (
            <React.Fragment key={provider.caregiverid}>
              <ListItem button onClick={() => handleProviderClick(provider)}>
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
export { Provider, ProviderMap };
