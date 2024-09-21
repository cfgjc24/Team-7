import React, { useState, useEffect } from "react";
import Provider from "./provider";
import ProviderMap from "./map";
import Grid from "@mui/material/Grid2";
import AlertLayout from "./alert";
const Supervisor = () => {
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

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <Grid container>
      <Grid item xs style={{ flexGrow: 0.2 }}>
        <Provider
          providers={providerList}
          onProviderSelect={handleProviderSelect}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
        />
      </Grid>
      <Grid item xs style={{ flexGrow: 2.5 }}>
        <ProviderMap
          positions={providerList}
          onMarkerClick={handleProviderSelect}
          selectedProvider={selectedProvider}
        />
      </Grid>
      <Grid item xs style={{ flexGrow: 0.8 }}>
        <AlertLayout />
      </Grid>
    </Grid>
  );
};

export default Supervisor;
