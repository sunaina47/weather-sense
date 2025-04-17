"use client";

import { useEffect, useState } from "react";
import { ConfigProvider, Switch, theme, Layout, Typography } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import "./globals.css";

const { Header, Footer } = Layout;
const { Title } = Typography;

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
          }}
        >
          <Layout
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Header
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                background: "transparent",
              }}
            >
              {/* Centered Title */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Title level={2} style={{ margin: 0 }}>
                  Weather Sense
                </Title>
              </div>

              {/* Dark Mode Switch */}
              <Switch
                checked={isDarkMode}
                checkedChildren={<BulbFilled />}
                unCheckedChildren={<BulbOutlined />}
                onChange={() => setIsDarkMode(!isDarkMode)}
                style={{ marginLeft: "auto" }}
              />
            </Header>

            <main style={{ flex: 1 }}>{children}</main>

            <Footer style={{ textAlign: "center", fontSize: 14 }}>
              Made with ❤️ by Sunaina Kharangate
            </Footer>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
