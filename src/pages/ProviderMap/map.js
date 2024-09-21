import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
link.crossOrigin = "anonymous";
document.head.appendChild(link);

const ProviderMap = ({ positions, onMarkerClick }) => {
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
        <Marker
          key={index}
          position={position.geodata}
          eventHandlers={{
            click: () => {
              onMarkerClick(position);
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default ProviderMap;
