import MarkerIcon from "@/node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "@/node_modules/leaflet/dist/images/marker-shadow.png";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {Marker, Popup } from "react-leaflet";

export default function MapMarker({position, text}: {position:LatLngExpression, text: string }) {
    return (
        <Marker
        icon={
          new L.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
          })
        }
        position={position}
      >
        <Popup>
          {text}
        </Popup>
      </Marker>

    )
}