import { Button, Modal, Table, Tag } from "antd";
import { api } from "../../user/api";
import { useQuery } from "react-query";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";

const Movies = ({ isModalOpen, setIsModalOpen }) => {
  const { data, isLoading, isError } = useQuery("api-movis", () =>
    api.get("/movies")
  );
  const [movieIdEdit, setMovieIdEdit] = useState(null);
  const [movieIdDelte, setMovieIdDelte] = useState({});
  const [modalType, setModalType] = useState("edit");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
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
                setMovieIdDelte(row);
                setModalType("delte");
                showModal();
              }}
            >
              <DeleteFilled />
            </Button>
            <Button
              className="bg-blue-600 text-white flex items-center"
              onClick={() => {
                showModal();
                setMovieIdEdit(row?.id);
                setModalType("edit");
              }}
            >
              <EditFilled />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
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
                <div key={item?.id}></div>
              ) : (
                <>
                  <p>Delte</p>
                </>
              )}
            </Modal>
          );
        })}
      <Table
        key={data?.data.map((i) => i.id)}
        loading={isLoading}
        columns={columns}
        dataSource={data?.data.map((item) => ({ ...item, key: item.id })) || []}
        // dataSource={data?.data}
      />
    </>
  );
};

export default Movies;
