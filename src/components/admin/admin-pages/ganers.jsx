import { useQuery } from "react-query";
import { api } from "../../user/api";
import { Button, Table, Tag } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Ganers = () => {
  const { data, isLoading, isError } = useQuery("api-movis", () =>
    api.get("/ganers")
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      rowScope: "row",
    },
    {
      title: "Ganr Name",
      dataIndex: "title",
    },
    {
      title: "Actions",
      render: () => {
        return (
          <div className="flex gap-2 items-center">
            <Button className="bg-red-500 text-white flex items-center">
              <DeleteFilled />
            </Button>
            <Button className="bg-blue-600 text-white flex items-center">
              <EditFilled />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data?.data.map((item) => ({ ...item, key: item.id })) || []}
        // dataSource={data?.data}
      />
    </>
  );
};
export default Ganers;
