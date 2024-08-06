"use client";
// app/page.js
import Head from "next/head";
import dynamic from "next/dynamic";
import { getCoordinatesFromLink } from "@/lib/getCoordinatesFromLink";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapSection({url}:any) {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    async function fetchCoordinates() {
      const coords: any = await getCoordinatesFromLink(url);

      setCoordinates(coords);
    }

    fetchCoordinates();
  }, []);

  return (
    <div>
      <main>
        <h3>Map:</h3>
        {coordinates ? <Map coordinates={coordinates} /> : <p>Loading...</p>}
      </main>
    </div>
  );
}
