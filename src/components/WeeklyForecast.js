import React from "react";
import dayjs from "dayjs";
import { Card } from "antd";

const WeeklyForecast = ({ weeklyData, weatherCodeDetails }) => {
  const today = dayjs().format("YYYY-MM-DD");

  const forecastDays = weeklyData?.daily?.time.map((date, idx) => {
    const day = dayjs(date).format("YYYY-MM-DD");
    const isToday = day === today;
    const code = weeklyData?.daily?.weathercode[idx];
    const weather = weatherCodeDetails[code] || {
      icon: "❓",
      description: "Unknown",
    };

    return {
      isToday,
      dayName: isToday ? "Today" : dayjs(date).format("ddd"), // Full weekday
      weatherIcon: weather.icon,
      weatherDescription: weather.description,
      maxTemp: weeklyData.daily.temperature_2m_max[idx],
      minTemp: weeklyData.daily.temperature_2m_min[idx],
    };
  });

  // Sort with Today first
  const sortedForecast = [
    ...forecastDays.filter((day) => day.isToday),
    ...forecastDays.filter((day) => !day.isToday),
  ];

  return (
    <Card title="📅 Weekly Forecast">
      {sortedForecast.map((day, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontWeight: day.isToday ? "bold" : "normal" }}>
            {day.dayName}{" "}
            <span style={{ fontSize: "1.2rem" }}>{day.weatherIcon}</span>
          </span>
          <span>{day.weatherDescription}</span>
          <span>
            {day.maxTemp}/{day.minTemp}
          </span>
        </div>
      ))}
    </Card>
  );
};

export default WeeklyForecast;
