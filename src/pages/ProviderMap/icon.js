import L from "leaflet";

const iconEmergency = new L.Icon({
  iconUrl: require("./emergency_marker.png"),
  iconRetinaUrl: require("./emergency_marker.png"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
});

const emergencyCircle = (position, map) => {
  L.circle(position, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(map);
};
export { iconEmergency, emergencyCircle };
