"use client";
import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import {
  fetchCityCoordinates,
  fetchWeatherData,
  fetchPlaceName,
  fetchMoonPhase,
} from "../utils/fetchWeatherApi";
import dayjs from "dayjs";
import WeeklyForecast from "../components/WeeklyForecast";
import HourlyForecast from "../components/HourlyForecast";
import MoonPhases from "../components/MoonPhases";
import ClothingSuggestion from "../components/ClothingSuggestion";
import SearchLocation from "../components/SearchLocation";
import SunriseSunset from "../components/SunriseSunset";
import dynamic from "next/dynamic";
import CurrentWeather from "../components/CurrentWeather";
const WeatherMap = dynamic(() => import("../components/WeatherMap"), {
  ssr: false,
});

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [moonPhase, setMoonPhase] = useState("");
  const [coords, setCoords] = useState("");
  const [error, setError] = useState("");

  const getWeather = async (lat, lon, place) => {
    setLoading(true);
    const data = await fetchWeatherData(lat, lon);
    const today = dayjs().format("YYYY-MM-DD");
    const moonPhase = await fetchMoonPhase(lat, lon, today);
    if (data && moonPhase) {
      setWeatherData(data);
      setMoonPhase(moonPhase?.astronomy?.astro?.moon_phase);
      setPlaceName(place);
      setError("");
    } else {
      message.error("Failed to fetch weather data.");
    }
    setLoading(false);
  };

  const handleSearch = async (place) => {
    setLoading(true);
    const coordinates = await fetchCityCoordinates(place);
    if (coordinates) {
      getWeather(coordinates.latitude, coordinates.longitude, place);
      setCoords({ lat: coordinates.latitude, lon: coordinates.longitude });
    } else {
      setError("Place not found.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const place = await fetchPlaceName(coords.latitude, coords.longitude);
          getWeather(coords.latitude, coords.longitude, place);
          setCoords({ lat: coords.latitude, lon: coords.longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const weatherCodeDetails = {
    0: { icon: "☀️", description: "Clear sky" },
    1: { icon: "🌤️", description: "Mainly clear" },
    2: { icon: "⛅", description: "Partly cloudy" },
    3: { icon: "☁️", description: "Overcast" },
    45: { icon: "🌫️", description: "Fog" },
    48: { icon: "🌫️", description: "Depositing rime fog" },
    51: { icon: "🌦️", description: "Light drizzle" },
    53: { icon: "🌦️", description: "Moderate drizzle" },
    55: { icon: "🌦️", description: "Dense drizzle" },
    61: { icon: "🌧️", description: "Slight rain" },
    63: { icon: "🌧️", description: "Moderate rain" },
    65: { icon: "🌧️", description: "Heavy rain" },
    71: { icon: "❄️", description: "Slight snow fall" },
    73: { icon: "❄️", description: "Moderate snow fall" },
    75: { icon: "❄️", description: "Heavy snow fall" },
    80: { icon: "🌧️", description: "Rain showers" },
    81: { icon: "🌧️", description: "Moderate rain showers" },
    82: { icon: "🌧️", description: "Violent rain showers" },
    95: { icon: "⛈️", description: "Thunderstorm" },
    96: { icon: "⛈️", description: "Thunderstorm with slight hail" },
    99: { icon: "⛈️", description: "Thunderstorm with heavy hail" },
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Left Panel */}
            <div style={{ flex: 3, paddingRight: 20, minWidth: 300 }}>
              <SearchLocation onSearch={handleSearch} />
              {weatherData && (
                <>
                  <CurrentWeather
                    placeName={placeName}
                    currentWeather={{
                      current: weatherData.current,
                      current_units: weatherData.current_units,
                    }}
                    weatherCodeDetails={weatherCodeDetails}
                  />
                  <br />
                  <HourlyForecast
                    hourly={{
                      hourly: weatherData.hourly,
                      hourly_units: weatherData.hourly_units,
                    }}
                    weatherCodeDetails={weatherCodeDetails}
                  />
                  <br />
                  <WeatherMap coords={coords} />
                </>
              )}
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, minWidth: 250 }}>
              {weatherData && (
                <>
                  <WeeklyForecast
                    weeklyData={{
                      daily: weatherData.daily,
                      daily_units: weatherData.daily_units,
                    }}
                    weatherCodeDetails={weatherCodeDetails}
                  />
                  <br />
                  <SunriseSunset
                    weatherData={{
                      sunrise: weatherData.daily?.sunrise,
                      sunset: weatherData.daily?.sunset,
                    }}
                  />
                  <ClothingSuggestion
                    weatherCode={weatherData?.current?.weathercode}
                    weatherCodeDetails={weatherCodeDetails}
                  />
                  <MoonPhases moonPhase={moonPhase} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
