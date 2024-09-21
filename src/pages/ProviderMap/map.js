import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { iconEmergency, emergencyCircle } from "./icon";
import { Emergency } from "@mui/icons-material";

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
link.crossOrigin = "anonymous";
document.head.appendChild(link);

const ProviderMapContent = ({ positions, onMarkerClick }) => {
  const map = useMap();

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.map((position, index) => (
        <React.Fragment key={index}>
          {position.alert ? (
            <Circle
              center={position.geodata}
              color="red"
              fillColor="#f03"
              fillOpacity={0.5}
              radius={400}
              eventHandlers={{
                click: () => {
                  onMarkerClick(position);
                  map.setView(position.geodata, 15);
                },
              }}
            />
          ) : (
            <Marker
              position={position.geodata}
              eventHandlers={{
                click: () => {
                  onMarkerClick(position);
                  map.setView(position.geodata, 15);
                },
              }}
            ></Marker>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const ProviderMap = ({ positions, onMarkerClick }) => {
  return (
    <MapView
      center={[40.728157, -74.077644]}
      zoom={12}
      style={{ height: "100vh" }}
    >
      <ProviderMapContent positions={positions} onMarkerClick={onMarkerClick} />
    </MapView>
  );
};

const MapView = styled(MapContainer)`
  height: calc(100% - 8px);
  width: 100%;
`;

export default ProviderMap;
