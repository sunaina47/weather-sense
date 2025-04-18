// components/LeafletMap.js
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { API_KEY_OpenWeather } from "../../constants";

// Fix Leaflet icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Optional: Set map center on prop change
const SetMapCenter = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords.lat && coords.lon) {
      map.setView([coords.lat, coords.lon], 8);
    }
  }, [coords, map]);

  return null;
};

const LeafletMap = ({ coords }) => {
  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={8}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "16px" }}
    >
      <SetMapCenter coords={coords} />

      <LayersControl position="topright">
        {/* Base Layer: OpenStreetMap */}
        <LayersControl.BaseLayer checked name="Standard">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Topography">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)"
          />
        </LayersControl.BaseLayer>

        {/* Overlay Layers from OpenWeatherMap */}
        <LayersControl.Overlay checked name="Clouds">
          <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            // opacity={0.8}
            zIndex={400}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            // opacity={0.8}
            zIndex={400}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            opacity={0.9}
            zIndex={400}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Wind">
          <TileLayer
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            // opacity={0.8}
            zIndex={400}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Pressure">
          <TileLayer
            url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            // opacity={0.8}
            zIndex={400}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Thunderstorm Activity">
          <TileLayer
            url={`https://tile.openweathermap.org/map/thunder_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`}
            // opacity={1}
            zIndex={400}
          />
        </LayersControl.Overlay>
      </LayersControl>

      <Marker position={[coords.lat, coords.lon]}>
        <Popup>
          You are here!
          <br />
          Lat: {coords.lat.toFixed(4)}, Lon: {coords.lon.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
