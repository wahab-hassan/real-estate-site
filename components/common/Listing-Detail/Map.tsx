"use client";
// components/Map.js
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const radius = 1000; // 1 km radius

interface MapProps {
  coordinates: [number, number];
}

function Map({ coordinates }: MapProps) {
  return (
    <MapContainer
      className="border border-border/50 mt-5 z-0"
      /*
      // @ts-ignore */
      center={coordinates}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle
        center={coordinates}
        /*
      // @ts-ignore */
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
