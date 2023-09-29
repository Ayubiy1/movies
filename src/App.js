import "./App.css";
import { Route, Router, Routes, useLocation, useNavigate } from "react-router";
import Users from "./components/all";
import Films from "./components/user/movies";
import Movie from "./components/user/movie";
import Login from "./components/login-page";
import { useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";
import Admin from "./components/admin/admin";
import Movies from "./components/admin/admin-pages/movies-admin";
import Ganers from "./components/admin/admin-pages/ganers-admin";
import { Context } from "./components/contex";

function App() {
  const [login, setLogin] = useLocalStorageState("login", {
    defaultValue: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenGaner, setIsModalOpenGaner] = useState(false);
  const [movie, setMovie] = useState({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (login && location.pathname === "/login") navigate("admin/movies");
  //   else if (!login) navigate("/movie");
  // }, [login]);

  // console.log(search);
  return (
    <div className="App">
      <Context.Provider value={{ movie, setMovie }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Users
                  setLogin={setLogin}
                  login={login}
                  filter={filter}
                  setFilter={setFilter}
                  search={search}
                  setSearch={setSearch}
                />
              </>
            }
          >
            {/*  */}
            <Route
              path="movie"
              element={
                <Films filter={filter} search={search} setSearch={setSearch} />
              }
            />
            <Route
              path="movie/:id"
              element={
                <>
                  <Movie />
                </>
              }
            />
            {/*  */}

            <Route
              path="admin"
              element={
                <Admin
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpenGaner={isModalOpenGaner}
                  setIsModalOpenGaner={setIsModalOpenGaner}
                />
              }
            >
              <Route
                path="movies"
                element={
                  <Movies
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpenGaner={isModalOpenGaner}
                    setIsModalOpenGaner={setIsModalOpenGaner}
                  />
                }
              />
              <Route
                path="ganers"
                element={
                  <Ganers
                    isModalOpenGaner={isModalOpenGaner}
                    setIsModalOpenGaner={setIsModalOpenGaner}
                  />
                }
              />
            </Route>

            <Route
              path="login"
              element={<Login login={login} setLogin={setLogin} />}
            />
          </Route>
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
