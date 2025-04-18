import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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

const LeafletMap = ({ coords }) => {
  const mapContainerRef = useRef(null); // To reference the map container

  useEffect(() => {
    if (coords.lat && coords.lon) {
      // Initialize the map
      const map = L.map(mapContainerRef.current, {
        center: [coords.lat, coords.lon],
        zoom: 8,
      });

      // Base map layers
      const osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        }
      );

      const topoLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution:
            "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)",
        }
      );

      // Overlay layers
      const cloudsLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { zIndex: 400 }
      );

      const precipitationLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { zIndex: 400 }
      );

      const temperatureLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { opacity: 0.9, zIndex: 400 }
      );

      const windLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { zIndex: 400 }
      );

      const pressureLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { zIndex: 400 }
      );

      const thunderstormLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/thunder_new/{z}/{x}/{y}.png?appid=${API_KEY_OpenWeather}`,
        { zIndex: 400 }
      );

      // Adding layers to the map
      osmLayer.addTo(map);

      // Adding Marker
      const marker = L.marker([coords.lat, coords.lon]).addTo(map);
      marker.bindPopup("You are here!");

      // Layer control
      const baseMaps = {
        OpenStreetMap: osmLayer,
        Topography: topoLayer,
      };

      const overlayMaps = {
        Clouds: cloudsLayer,
        Precipitation: precipitationLayer,
        Temperature: temperatureLayer,
        Wind: windLayer,
        Pressure: pressureLayer,
        Thunderstorm: thunderstormLayer,
      };

      L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(map);

      // Return cleanup function to remove the map on unmount
      return () => {
        map.remove();
      };
    }
  }, [coords]); // Re-run effect if coords change

  return (
    <div
      ref={mapContainerRef}
      style={{ height: "500px", width: "100%", borderRadius: "16px" }}
    ></div>
  );
};

export default LeafletMap;
