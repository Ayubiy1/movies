import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../../user/api";
import { Button, Drawer, Form, Input, Modal, Table, message } from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
const { confirm } = Modal;

const Ganers = ({ isModalOpenGaner, setIsModalOpenGaner }) => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const [editGaner, setEditGaner] = useState(false);
  const [ganer, setGaner] = useState(null);
  const [ganerID, setGanerID] = useState(null);
  // console.log(ganerID);

  const [messageApi, contextHolder] = message.useMessage();
  const successPost = () => {
    messageApi.open({
      type: "success",
      content: `Ganer muvaffaqiyatli qo'shildi!`,
    });
  };

  // Ganer get
  const { data, isLoading, isError } = useQuery("api-ganer", () =>
    api.get("/ganers")
  );

  // Ganer post new ganer
  const { mutate: newPost, isLoading: isLoadingPost } = useMutation(
    (newData) => {
      return api.post(`/ganers`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-ganer");
        successPost();
      },
    }
  );

  // Ganer delete
  const {
    mutate: deletE,
    isSuccess: isSuccessDelete,
    isLoading: isLoadingDelete,
  } = useMutation(
    () => {
      return api.delete(`ganers/${ganerID}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-ganer");
      },
    }
  );

  // Ganer Put
  const { mutate: dataPut, isLoading: isLoadingPut } = useMutation(
    (newData) => {
      console.log(ganerID);
      return api.put(`/ganers/${ganerID}`, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api-ganer");
      },
    }
  );

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletE();
      },
      onCancel() {},
    });
  };

  const onFinish = (values) => {
    const newData = {
      id: data?.data.length + 1,
      ...values,
      value: values?.label,
    };

    newPost(newData);
    setIsModalOpenGaner(false);
  };

  const onPut = (values) => {
    const newData = { id: ganer?.id, ...values, value: values?.label };

    // console.log(newData);

    dataPut(newData);
    setEditGaner(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Ganr Name",
      dataIndex: "label",
    },
    {
      title: "Actions",
      render: (value, row) => {
        return (
          <div className="flex gap-2 items-center">
            <Button
              className="bg-red-500 text-white flex items-center"
              onClick={() => {
                setGaner(row);
                setGanerID(row?.id);
                showDeleteConfirm();
              }}
            >
              <DeleteFilled />
            </Button>
            <Button
              className="bg-blue-600 text-white flex items-center"
              onClick={() => {
                setGaner(row);
                setEditGaner(true);
                setGanerID(row?.id);
              }}
            >
              <EditFilled />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (editGaner) {
      form.setFieldsValue(ganer);
    }
  }, [editGaner]);

  if (isLoadingPost) {
    return <>Loading...</>;
  }

  if (isLoadingDelete) {
    return <>Loading...</>;
  }

  if (isLoadingPut) {
    return <>Loading...</>;
  }
  // console.log(ganer?.label);
  return (
    <>
      {contextHolder}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data.map((item) => ({ ...item, key: item.id })) || []}
      />

      {/* Edit Draver */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={() => setEditGaner(false)}
        open={editGaner}
      >
        <Form
          name="basic"
          onFinish={onPut}
          autoComplete="off"
          initialValues={ganer}
          form={form}
        >
          <Form.Item
            label="Ganer nomi"
            name="label"
            rules={[
              {
                required: true,
                message: "Ganer nomini kiriting!",
              },
            ]}
          >
            <Input value={ganer?.label} />
          </Form.Item>

          <Form.Item className="text-right">
            <Button className="bg-blue-600 text-white" htmlType="submit">
              O'zgartirish
            </Button>
          </Form.Item>
        </Form>{" "}
      </Drawer>

      {/* Delete Drawer */}
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={() => setIsModalOpenGaner(false)}
        open={isModalOpenGaner}
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Ganer nomi"
            name="label"
            rules={[
              {
                required: true,
                message: "Ganer nomini kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="text-right">
            <Button className="bg-blue-600 text-white" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>{" "}
      </Drawer>
    </>
  );
};
export default Ganers;
