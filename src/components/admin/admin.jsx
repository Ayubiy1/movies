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
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-[86vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        {/* <Menu
          theme="dark"
          //   mode="inline"
          defaultSelectedKeys={[`${activeMenu}`]}
          items={[
            {
              key: "1",
              icon: (
                <UserOutlined
                  onClick={() => {
                    navigate("movies");
                    setActiveMen(1);
                  }}
                />
              ),
              label: "Kinolar",
            },
            {
              key: "2",
              icon: (
                <VideoCameraOutlined
                  onClick={() => {
                    navigate("ganers");
                    setActiveMen(2);
                  }}
                />
              ),
              label: "Janrlar",
            },
          ]}
        /> */}

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          selectedKeys={[`${activeMenu}`]}
          className="flex items-center flex-col"
        >
          <Menu.Item
            className=""
            key="1"
            onClick={() => {
              navigate("movies");
              setActiveMen(1);
            }}
            icon={<UserOutlined />}
            label="Kinolar"
          >
            Kinolar
          </Menu.Item>

          <Menu.Item
            className=""
            key="2"
            onClick={() => {
              navigate("ganers");
              setActiveMen(2);
            }}
            icon={<VideoCameraOutlined />}
            label="Janrlar"
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
