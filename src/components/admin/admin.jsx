import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocalStorageState } from "ahooks";
import {
  Layout,
  Menu,
  Button,
  theme,
  Modal,
  Form,
  Input,
  Checkbox,
  Space,
  DatePicker,
} from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import "./admin.css";
import { useMutation, useQuery } from "react-query";
import { api } from "../user/api";
import axios from "axios";
import { useQueryClient } from "react-query"; // queryClient o'zgaruvchisini import qiling

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [dateMovie, setDateMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMen] = useLocalStorageState("active-menu", {
    defaultValue: 1,
  });
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery("api-movisa", () =>
    api.get("/movies")
  );

  const { mutate: newPost } = useMutation(
    (newData) => {
      return api.post(`/movies`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-movis");
      },
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const maxI = data?.data.map((i) => i.id);
    const maxId = Math.max(...maxI);
    newPost({
      ...values,
      comments: [],
      data: dateMovie,
      liked: 0,
      favored: 0,
    });
  };

  const onChange = (date, dateString) => {
    setDateMovie(dateString);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <h1 id="word" className="glitch_word0">
          404 - page not found
        </h1>
      </div>
    );

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
          className="flex items-center justify-between"
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
          <Button className="mr-10" onClick={showModal}>
            Film qo'shish
          </Button>
        </Header>
        <Modal
          title="Film Qo'shish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="mt-10"
          >
            <Form.Item
              label="Kino nomi"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Iltimos kino nomini kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Kino ishlab chiqargan davlat"
              name="country"
              rules={[
                {
                  required: true,
                  message: "Kino ishlab chiqargan davlatni kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Kino Tili"
              name="langulage"
              rules={[
                {
                  required: true,
                  message: "Kino Tilini kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Kino video link"
              name="moviLink"
              rules={[
                {
                  required: true,
                  message: "Kino video linkni kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </Form.Item>

            <Form.Item
              label="Kino rasmi"
              name="img"
              rules={[
                {
                  required: true,
                  message: "Kino rasmini kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Kino ko'rish uchun yosh chegarasi"
              name="ageLimit"
              rules={[
                {
                  required: true,
                  message:
                    "Kino ko'rish uchun yosh chegarasi uchun yosh kiriting!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className="bg-blue-600 text-white" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>{" "}
        </Modal>
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
