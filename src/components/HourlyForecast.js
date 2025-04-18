import React, { useEffect, useRef } from "react";
import { Card, Typography } from "antd";
import dayjs from "dayjs";
import "../styles/weather.css";

const { Text } = Typography;

const HourlyForecast = ({ hourly, weatherCodeDetails }) => {
  const scrollRef = useRef(null);
  const today = dayjs().format("DD-MMM-YYYY");
  const currentTime = dayjs();
  const hourlyData = hourly?.hourly?.time
    ?.map((t, idx) => {
      const time = dayjs(t);
      if (
        time.format("DD-MMM-YYYY") === today &&
        (time.isAfter(currentTime) || time.isSame(currentTime))
      ) {
        return {
          time,
          temperature: hourly?.hourly.temperature_2m?.[idx],
          temperature_unit: hourly?.hourly_units?.temperature_2m,
          feelsLike: hourly?.hourly.apparent_temperature?.[idx],
          feelsLike_unit: hourly?.hourly_units?.apparent_temperature,
          precipitation: hourly.hourly.precipitation_probability?.[idx],
          precipitation_unit: hourly?.hourly_units?.precipitation_probability,
          windSpeed: hourly.hourly.wind_speed_10m?.[idx],
          windSpeed_unit: hourly?.hourly_units?.wind_speed_10m,
          weatherCode: hourly.hourly.weathercode?.[idx],
        };
      }
      return null;
    })
    .filter(Boolean);

  // Mouse wheel to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    if (el) el.addEventListener("wheel", handleWheel);
    return () => {
      if (el) el.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <>
      <Typography.Title level={4}>Hourly</Typography.Title>
      <br />
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          overflowX: "auto",
          paddingBottom: 8,
          gap: "16px",
          scrollBehavior: "smooth",
        }}
        className="hourly-scroll-container"
      >
        {hourlyData.map((entry, idx) => {
          const weatherInfo = weatherCodeDetails?.[entry.weatherCode] || {
            icon: "❔",
            description: "Unknown",
          };

          return (
            <Card
              key={idx}
              style={{
                minWidth: "180px",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                flexShrink: 0,
              }}
            >
              <Text strong style={{ fontSize: "1rem" }}>
                {dayjs(entry.time).format("h:mm A")}
              </Text>
              <div style={{ fontSize: "2rem", marginTop: 4 }}>
                {weatherInfo.icon}
              </div>
              <div style={{ fontSize: "1.6rem", marginTop: 4 }}>
                {entry.temperature}
                {entry.temperature_unit}
              </div>
              <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                {weatherInfo.description}
              </Text>
              <br />
              <br />
              <Text strong>
                🌡️ {entry.feelsLike}
                {entry.feelsLike_unit}
              </Text>
              <br />
              <Text strong>
                💧 {entry.precipitation}
                {entry.precipitation_unit}
              </Text>
              <br />
              <Text strong>
                🌬️ {entry.windSpeed}
                {entry.windSpeed_unit}
              </Text>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default HourlyForecast;
