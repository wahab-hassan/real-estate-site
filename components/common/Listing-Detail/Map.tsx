"use client";
// components/Map.js
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const radius = 1000; // 1 km radius

function Map({ coordinates }: any) {
  return (
    <MapContainer
    className="border border-border/50 mt-5 z-0"
      center={coordinates}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circle
        center={coordinates}
        radius={radius}
        pathOptions={{ color: "red" }}
      />
      {/* <Marker position={coordinates}>
        <Popup>
          Approximate Location
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}

export default Map;
