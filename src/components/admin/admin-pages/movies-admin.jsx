import { Button, Form, Input, Modal, Table, Tag, message } from "antd";
import { api } from "../../user/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { confirm } = Modal;

const Movies = ({ isModalOpen, setIsModalOpen }) => {
  const [itemS, setItemS] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: `Kino muvaffaqiyatli o'zgartirildi`,
    });
  };
  const successDelete = () => {
    messageApi.open({
      type: "success",
      content: `Kino muvaffaqiyatli o'chirildi`,
    });
  };

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery("api-movis-admin", () =>
    api.get("/movies")
  );

  const {
    mutate: newPut,
    isLoading: isLoadingPut,
    isSuccess: isSuccessPut,
  } = useMutation(
    (newData) => {
      return api.put(`/movies/${itemS?.id}`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-movis-admin");
        success();
      },
    }
  );

  const { mutate: deletE, isSuccess: isSuccessDelete } = useMutation(
    () => {
      return api.delete(`/movies/${itemS?.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-movis-admin");
        successDelete();
      },
    }
  );

  const [movieIdEdit, setMovieIdEdit] = useState(null);
  const [modalType, setModalType] = useState("edit");
  const [modalDelete, setModalDelete] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (value) => {
    const newData = { ...value, comments: itemS?.comments };
    newPut(newData);
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Rasmi",
      dataIndex: "img",
      render: (img) => {
        return <img className="w-[50px]" src={img} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      // render: (name) => {
      //   // return <p className="m-0">{name}</p>;
      // },
    },
    {
      title: "Janr",
      dataIndex: "type",
    },
    {
      title: "Joylashgan",
      dataIndex: "data",
      render: (value, row) => {
        return (
          <>
            <Tag color="green">{value}</Tag>
          </>
        );
      },
    },
    {
      title: "Davlati",
      dataIndex: "country",
    },
    {
      title: "Like",
      dataIndex: "liked",
    },
    {
      title: "Actions",
      render: (row) => {
        return (
          <div className="flex gap-2 items-center">
            <Button
              className="bg-red-500 text-white flex items-center"
              onClick={() => {
                setItemS(row);
                showDeleteConfirm();
              }}
            >
              <DeleteFilled />
            </Button>
            <Button
              className="bg-blue-600 text-white flex items-center"
              onClick={() => {
                setMovieIdEdit(row?.id);
                setItemS(row);
                setModalType("edit");
                showModal();
              }}
            >
              <EditFilled />
            </Button>
          </div>
        );
      },
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: `Are you sure you want to delete ${itemS?.name}?`, // Ma'lumotni yuqorida olish uchun template literal ishlatamiz
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletE(itemS?.id);
      },
      onCancel() {
        console.log("Cancel");
      },
      className: "custom-confirm-modal",
    });
  };

  if (isLoadingPut) {
    return <>Loading...</>;
  }

  if (isLoading) {
    return <>Looading...</>;
  }

  return (
    <>
      {contextHolder}
      {data?.data
        .filter((i) => i.id == movieIdEdit)
        .map((item) => {
          return (
            <Modal
              title={`${modalType === "edit" ? `${item?.name}` : ""}`}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={false}
              key={item?.id}
            >
              {modalType == "edit" ? (
                <Form
                  onFinish={(values) => {
                    onFinish(values);
                    setItemS(item);
                  }}
                  initialValues={{ ...item }} 
                >
                  <Form.Item name="name" label="Kino nomi">
                    <Input value={item.name} />
                  </Form.Item>

                  <Form.Item name="country" label="Kino davlati">
                    <Input value={item.country} />
                  </Form.Item>

                  <Form.Item name="img" label="Kino rasmi">
                    <Input value={item.img} />
                  </Form.Item>

                  <Form.Item name="type" label="Kino janri">
                    <Input value={item.type} />
                  </Form.Item>

                  <Form.Item name="favored" label="Kino favored sanog'i">
                    <Input type="number" value={item.favored} />
                  </Form.Item>

                  <Form.Item name="liked" label="Kino liked sanog'i">
                    <Input type="number" value={item.liked} />
                  </Form.Item>

                  <Form.Item name="data" label="Kino ishlab chiqarilgan sana">
                    <Input type="number" value={item.data} />
                    {/* <Space direction="vertical" className="w-[100%]">
                      <DatePicker placeholder={item?.data} />
                    </Space> */}
                  </Form.Item>

                  <Form.Item name="ageLimit" label="Kino yosh chegarasi">
                    <Input type="number" value={item.ageLimit} />
                  </Form.Item>

                  <Form.Item>
                    <Button htmlType="submit">O'zgartirish</Button>
                  </Form.Item>
                </Form>
              ) : (
                <>
                  <p>Delte</p>
                  <Button
                    onClick={() => {
                      setItemS(item);
                      deletE(item?.id);
                    }}
                  >
                    delete
                  </Button>
                </>
              )}
            </Modal>
          );
        })}

      <Fade triggerOnce>
        <Table
          scroll={{ x: 1000 }}
          key={data?.data.map((i) => i.id)}
          loading={isLoading}
          columns={columns}
          dataSource={
            data?.data.map((item) => ({ ...item, key: item.id })) || []
          }
        />
      </Fade>
    </>
  );
};

export default Movies;
