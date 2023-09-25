import { Outlet } from "react-router";
import Films from "./user/movies";
import Header from "./user/header";

const Users = ({ setLogin, login }) => {
  return (
    <>
      <div
        className="max-h-[100vh] overflow-y-scroll"
        style={{ border: "1px solid" }}
      >
        <Header setLogin={setLogin} login={login} />

        <Outlet />
      </div>
    </>
  );
};

export default Users;
