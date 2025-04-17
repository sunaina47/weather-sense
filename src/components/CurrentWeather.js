import React from "react";
import { Card, Typography, Row, Col } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const CurrentWeather = ({ placeName, currentWeather, weatherCodeDetails }) => {
  const weatherCode = currentWeather?.current?.weathercode;
  const weatherInfo = weatherCodeDetails?.[weatherCode] || {
    icon: "❓",
    description: "Unknown condition",
  };

  const formattedTime = dayjs(currentWeather?.current?.time).format(
    "dddd, MMM D - h:mm A"
  );

  const getWeatherBackground = (description) => {
    const lower = description.toLowerCase();
    if (lower.includes("clear")) return weatherBackgrounds.clear;
    if (lower.includes("cloud")) return weatherBackgrounds.cloudy;
    if (lower.includes("rain")) return weatherBackgrounds.rain;
    if (lower.includes("snow")) return weatherBackgrounds.snow;
    if (lower.includes("fog")) return weatherBackgrounds.fog;
    if (lower.includes("thunder")) return weatherBackgrounds.thunderstorm;
    return weatherBackgrounds.default;
  };

  const weatherBackgrounds = {
    clear: "url('/images/clear.jpg')",
    cloudy: "url('/images/cloudy.jpg')",
    rain: "url('/images/rain.jpg')",
    snow: "url('/images/snow.jpg')",
    fog: "url('/images/fog.jpg')",
    thunderstorm: "url('/images/thunderstorm.jpg')",
    default: "url('/images/weather.jpg')",
  };

  return (
    <Card
      style={{
        marginBottom: 20,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundImage: getWeatherBackground(weatherInfo.description),
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        backdropFilter: "brightness(0.8)", // white text over images
      }}
    >
      <Title level={4} style={{ marginBottom: 4 }}>
        Current Weather in {placeName}
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        {formattedTime}
      </Text>

      <Row gutter={[16, 16]} align="middle">
        {/* Weather Icon */}
        <Col
          xs={6}
          sm={4}
          md={3}
          lg={4}
          style={{ fontSize: "4rem", textAlign: "center" }}
        >
          {weatherInfo.icon}
        </Col>
        {/* Temperature and Description */}
        <Col xs={18} sm={20} md={21} lg={6}>
          <Text strong style={{ fontSize: "2.2rem" }}>
            {currentWeather?.current?.temperature_2m}{" "}
            {currentWeather?.current_units?.temperature_2m}
          </Text>
        </Col>
        <Col xs={12}>
          <Text type="secondary" style={{ fontSize: "1.1rem" }}>
            {weatherInfo.description}
          </Text>
          <br />
          <Text strong style={{ fontSize: "1rem" }}>
            Feels Like {currentWeather?.current?.apparent_temperature}{" "}
            {currentWeather?.current_units?.apparent_temperature}
          </Text>
        </Col>
      </Row>

      {/* Additional Info */}
      <Row gutter={[16, 16]}>
        {[
          {
            label: "Precipitation",
            value: currentWeather?.current?.precipitation_probability,
            unit: currentWeather?.current_units?.precipitation_probability,
          },
          {
            label: "Wind Speed",
            value: currentWeather?.current?.wind_speed_10m,
            unit: currentWeather?.current_units?.wind_speed_10m,
          },
          {
            label: "Humidity",
            value: currentWeather?.current?.relative_humidity_2m,
            unit: currentWeather?.current_units?.relative_humidity_2m,
          },
          {
            label: "Pressure",
            value: currentWeather?.current?.surface_pressure,
            unit: currentWeather?.current_units?.surface_pressure,
          },
        ].map((item, index) => (
          <Col xs={24} sm={12} md={6} lg={6} key={index}>
            <Card
              style={{
                borderRadius: "16px",
                textAlign: "center",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              variant="borderless"
            >
              <Text type="secondary" style={{ fontSize: "0.85rem" }}>
                {item.label}
              </Text>
              <br />
              <Text strong style={{ fontSize: "1.5rem" }}>
                {item.value}{" "}
                <span style={{ fontSize: "0.9rem" }}>{item.unit}</span>
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default CurrentWeather;
