import React from "react";
import { Card, Typography, Row, Col, Carousel } from "antd";

const { Text } = Typography;

const SunriseSunset = ({ weatherData }) => {
  const sunriseTime = weatherData?.sunrise?.[0]
    ? new Date(weatherData.sunrise[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const sunsetTime = weatherData?.sunset?.[0]
    ? new Date(weatherData.sunset[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 15 } }}>
      <Carousel autoplay autoplaySpeed={2000} dots={false} effect="fade">
        {/* Sunrise Slide */}
        <div>
          <Row justify="center" align="middle">
            <Col>
              <img
                src="/images/sunrise.png"
                alt="Sunrise"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "16px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Text strong style={{ fontSize: "1.2rem" }}>
                  Sunrise at {sunriseTime}
                </Text>
              </div>
            </Col>
          </Row>
        </div>

        {/* Sunset Slide */}
        <div>
          <Row justify="center" align="middle">
            <Col>
              <img
                src="/images/sunset.png"
                alt="Sunset"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "16px",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Text strong style={{ fontSize: "1.2rem" }}>
                  Sunset at {sunsetTime}
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </Carousel>
    </Card>
  );
};

export default SunriseSunset;
