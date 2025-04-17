// components/MoonPhaseCard.js
import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const getMoonPhaseInfo = (phaseName) => {
  switch (phaseName) {
    case "New Moon":
      return { phase: "New Moon", emoji: "🌑" };
    case "Waxing Crescent":
      return { phase: "Waxing Crescent", emoji: "🌒" };
    case "First Quarter":
      return { phase: "First Quarter", emoji: "🌓" };
    case "Waxing Gibbous":
      return { phase: "Waxing Gibbous", emoji: "🌔" };
    case "Full Moon":
      return { phase: "Full Moon", emoji: "🌕" };
    case "Waning Gibbous":
      return { phase: "Waning Gibbous", emoji: "🌖" };
    case "Last Quarter":
      return { phase: "Last Quarter", emoji: "🌗" };
    case "Waning Crescent":
      return { phase: "Waning Crescent", emoji: "🌘" };
    default:
      return { phase: "Unknown Phase", emoji: "🌑" };
  }
};

const MoonPhase = ({ moonPhase }) => {
  console.log("moonPhase", moonPhase);
  const { phase, emoji } = getMoonPhaseInfo(moonPhase);

  return (
    <Card
      title="Moon Phase"
      style={{
        borderRadius: 10,
        marginTop: 24,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontSize: "18px",
      }}
    >
      <Title level={1} style={{ textAlign: "center" }}>
        {emoji}
      </Title>
      <Text style={{ display: "block", textAlign: "center", fontSize: 16 }}>
        {phase}
      </Text>
    </Card>
  );
};

export default MoonPhase;
