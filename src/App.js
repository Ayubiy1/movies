import "./App.css";
import { Route, Router, Routes, useLocation, useNavigate } from "react-router";
import Users from "./components/all";
import Films from "./components/user/movies";
import Movie from "./components/user/movie";
import Login from "./components/login-page";
import { useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";
import Admin from "./components/admin/admin";
import Movies from "./components/admin/admin-pages/movies";
import Ganers from "./components/admin/admin-pages/ganers";

function App() {
  const [login, setLogin] = useLocalStorageState("login", {
    defaultValue: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (login && location.pathname === "/login") navigate("admin/movies");
    else if (!login) navigate("/movie");
    else if (location.pathname === "/movie") {
      console.log("Adas");
    }
  }, [login]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Users setLogin={setLogin} login={login} />
            </>
          }
        >
          {/*  */}
          <Route path="movie" element={<Films />} />
          <Route
            path="movie/:id"
            element={
              <>
                <Movie />
              </>
            }
          />
          {/*  */}

          <Route path="admin" element={<Admin />}>
            <Route
              path="movies"
              element={
                <Movies
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route path="ganers" element={<Ganers />} />
          </Route>

          <Route
            path="login"
            element={<Login login={login} setLogin={setLogin} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
