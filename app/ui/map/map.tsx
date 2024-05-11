"use client";

import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { ReactNode, useState } from "react";



const Map = ({children, h, w }: {children: ReactNode, h:number, w: number}) => {
  const [coord, setCoord] = useState<LatLngExpression>([-27.37, -55.92]);
  

 /* const GetMyLocation = () => {
    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoord([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };

    return (
      <div className="get-my-location">
        <button onClick={getMyLocation}>Get My Location</button>
      </div>
    );
  };
*/
  return (
    <div>
      <MapContainer style={{ height: `${h}vw`, width: `${w}vw` }}
        center={coord}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {children}

      </MapContainer>
    </div>
  );
};

export default Map;