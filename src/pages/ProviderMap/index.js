import React from "react";

import { MapContainer, TileLayer } from "react-leaflet";

//
const ProviderMap = () => {
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
    </MapContainer>
  );
};

export default ProviderMap;
