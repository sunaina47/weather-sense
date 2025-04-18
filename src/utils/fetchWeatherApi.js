import axios from "axios";
import { API_KEY_Weather } from "../../constants";

// Fetch Weather data based on lat and lon with all available details
const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: lat,
        longitude: lon,
        current: [
          "temperature_2m",
          "precipitation_probability",
          "weathercode",
          "wind_speed_10m",
          "apparent_temperature",
          "relative_humidity_2m",
          "surface_pressure",
        ].join(","),
        hourly:
          "temperature_2m,precipitation_probability,weathercode,wind_speed_10m,apparent_temperature,relative_humidity_2m,surface_pressure",
        daily:
          "temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset",
        temperature_unit: "celsius",
        timezone: "auto",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Fetch Place name based on lat and lon (works for cities, villages, towns, and more)
const fetchPlaceName = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();

    if (data && data.address) {
      const { amenity, village, town, city, hamlet, municipality, county } =
        data.address;
      return (
        amenity ||
        village ||
        town ||
        city ||
        hamlet ||
        municipality ||
        county ||
        "Unknown Location"
      );
    } else {
      throw new Error("Unable to find the place name");
    }
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "Unknown Location";
  }
};

// Fetch coordinates (lat, lon) based on any place name
const fetchCityCoordinates = async (place) => {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`
    );
    const geoData = await geoRes.json();
    if (geoData.results && geoData.results.length > 0) {
      const { latitude, longitude } = geoData.results[0];
      return { latitude, longitude };
    } else {
      throw new Error("Place not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

const fetchMoonPhase = async (lat, lon, date) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY_Weather}&q=${lat},${lon}&dt=${date}`
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  fetchWeatherData,
  fetchPlaceName,
  fetchCityCoordinates,
  fetchMoonPhase,
};
