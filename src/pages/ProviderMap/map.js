import React, { useState, useEffect } from "react";
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

export default ProviderMap;
