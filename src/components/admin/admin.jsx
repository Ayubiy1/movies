import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";
import { Layout, Menu, Button, theme } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./admin.css";

const { Header, Sider, Content } = Layout;
const Admin = () => {
  const [activeMenu, setActiveMen] = useLocalStorageState("active-menu", {
    defaultValue: 1,
  });
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });
  //149 206 167
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-[86vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          defaultSelectedKeys={[`${activeMenu}`]}
          mode="inline"
        >
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            label="Kinolar"
            onClick={() => {
              navigate("movies");
              setActiveMen(1);
            }}
          >
            Kinolar
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<VideoCameraOutlined />}
            label="Janrlar"
            onClick={() => {
              navigate("ganers");
              setActiveMen(2);
            }}
          >
            Janrlar
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: "50vh",
            overflowY: "scroll",
          }}
        >
          <Outlet />
          {/* <Movies /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
