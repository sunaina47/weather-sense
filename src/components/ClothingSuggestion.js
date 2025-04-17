// components/ClothingSuggestion.js
import React from "react";
import { Card, Typography, Row, Col, Image } from "antd";

const { Title, Text } = Typography;

// Suggestions and images
const getClothingData = (code) => {
  if ([0, 1].includes(code)) {
    return {
      text: "Light and breathable clothes are great for sunny weather.",
      image: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    };
  } else if ([2, 3].includes(code)) {
    return {
      text: "It might be slightly cloudy. A light jacket could be useful.",
      image: "https://cdn-icons-png.flaticon.com/128/2806/2806175.png",
    };
  } else if ([45, 48].includes(code)) {
    return {
      text: "Wear warm clothes and ensure visibility in fog.",
      image: "https://cdn-icons-png.flaticon.com/128/3827/3827006.png",
    };
  } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return {
      text: "Carry an umbrella and wear waterproof clothing.",
      image: "https://cdn-icons-png.flaticon.com/128/2832/2832005.png",
    };
  } else if ([71, 73, 75].includes(code)) {
    return {
      text: "Bundle up with heavy jackets, gloves, and boots.",
      image: "https://cdn-icons-png.flaticon.com/128/3810/3810517.png",
    };
  } else if ([95, 96, 99].includes(code)) {
    return {
      text: "Stay indoors if possible. Wear protective rain gear.",
      image: "https://cdn-icons-png.flaticon.com/128/9997/9997704.png",
    };
  } else {
    return {
      text: "Dress according to your comfort and keep an eye on the sky.",
      image: "https://cdn-icons-png.flaticon.com/512/3123/3123138.png",
    };
  }
};

const ClothingSuggestion = ({ weatherCode, weatherCodeDetails }) => {
  const weather = weatherCodeDetails[weatherCode];
  const { text, image } = getClothingData(weatherCode);

  if (!weather) return null;

  return (
    <Card
      title="Clothing Suggestion"
      style={{
        maxWidth: 600,
        marginTop: 24,
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontSize: "18px",
        fontWeight: "600",
      }}
    >
      <Row justify="center" style={{ marginBottom: 16 }}>
        <Image
          width={150}
          preview={false}
          src={image}
          alt="Clothing suggestion"
          style={{ borderRadius: 8 }}
        />
      </Row>
      <Row justify="center">
        <Col>
          <Text style={{ fontSize: "16px" }}>{text}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ClothingSuggestion;
