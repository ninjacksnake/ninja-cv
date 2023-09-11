import React from "react";
import "./AppLayout.css";
import {
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import {  Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
const navigate = useNavigate();
  return (
    <Layout className="layout-container">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              icon: UserOutlined,
              title: "Profile",
              url: "/profile",
            },
            {
              icon: VideoCameraOutlined,
              title: "Resume",
              url: "/resume",
            },
            {
              icon: SettingOutlined,
              title: "Settings",
              url: "/settings",
            },
          ].map((item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: `${item.title}`,
            onClick: () => navigate(item.url)
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{ margin: "24px 16px 0", padding: "24px", overflow: "auto" }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ninjasoft ©2023 Created by Michael Fermin
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
