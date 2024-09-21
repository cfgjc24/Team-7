import React, { useState, useEffect } from "react";
import Provider from "./provider";
import ProviderMap from "./map";
import Grid from "@mui/material/Grid2";
import AlertLayout from "./alert";
const Supervisor = () => {
  const [providerList, setProviderList] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    /* const providers = [
      {
        caregiverid: "1",
        caregivername: "John Pork",
        phonenumber: "666-666-6666",
        state: "Emergency",
        client: "Client A",
        active: true,
        geodata: [40.728, -74.077],
        alert: true,
      },
      {
        caregiverid: "2",
        caregivername: "John Ham",
        phonenumber: "666-666-6666",
        state: "At home",
        client: "Client B",
        active: true,
        geodata: "40.7128, -74.006",
        alert: false,
      },
    ]; */
    fetch("/getActive", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedProviders = data.map((position) => {
          if (typeof position.geodata === "string") {
            const [lat, lon] = position.geodata.split(",").map(parseFloat);
            return {
              ...position,
              geodata: [lat, lon],
            };
          }
          return position;
        });

        setProviderList(updatedProviders);
      })
      .catch((error) => console.error("ERROR:", error));
  }, []);

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  return (
    <Grid container>
      <Grid item xs style={{ flexGrow: 0.1 }}>
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
      <Grid item xs style={{ flexGrow: 0.5 }}>
        <AlertLayout alertList={providerList} />
      </Grid>
    </Grid>
  );
};

export default Supervisor;
