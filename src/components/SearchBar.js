"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({ onSearch, loading }) {
  const handleSearch = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      alert("Please enter a city name.");
      return;
    }
    onSearch(trimmed);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Input
        placeholder="Search for location"
        suffix={<SearchOutlined />}
        onPressEnter={(e) => handleSearch(e.target.value)}
        size="large"
        loading={loading}
      />
    </div>
  );
}
