// components/WeatherMap.js
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Typography } from "antd";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const WeatherMap = ({ coords }) => {
  return (
    <>
      <Typography.Title level={4}>Weather Map</Typography.Title>
      <div style={{ position: "relative", padding: "10px" }}>
        {/* LeafletMap */}
        <LeafletMap coords={coords} />
      </div>
    </>
  );
};

export default WeatherMap;
