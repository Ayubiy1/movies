import { Outlet } from "react-router";
import Films from "./user/movies";
import Header from "./user/header";

const Users = ({ setLogin, login, filter, setFilter, search, setSearch }) => {
  return (
    <>
      <div
        className="maxh-[100vh] adadasd overflow-y-scroll pb-20"
        // style={{ border: "1px solid" }}
      >
        <Header
          setLogin={setLogin}
          login={login}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        <Outlet />
      </div>
    </>
  );
};

export default Users;
