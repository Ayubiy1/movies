import {
  LoadingOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@mui/icons-material";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";

const Header = ({ setLogin, login }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      <div
        className={`${
          login == true ? "bg-[#001529]" : "bg-[#222933]"
        } h-[100px] md:px-[20px]`}
      >
        <div className="px10 w-[100%] h-[100%] flex items-center justify-between">
          <p className="text-[50px] text-white m-0">Films</p>
          {login == false && location.pathname !== "/login" && (
            <Button
              className="flex items-center text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {(login == false &&
            location.pathname == "/movie" &&
            location.pathname == `movie${id}`) ||
            (location.pathname == "/login" && (
              <Button
                className="flex items-center text-white"
                onClick={() => navigate("/movie")}
              >
                Movies
              </Button>
            ))}
          {login == true && (
            <Button
              className="flex items-center text-white"
              onClick={() => setLogin(false)}
            >
              <LoginOutlined />
            </Button>
          )}
        </div>
      </div>
      <div>
        {location.pathname !== "/login" ||
          (location.pathname !== "/admin" && (
            <div className="flex items-center justify-between rounded-sm bg-[#304156] w-[300px] mt-[30px] ms-[20px]">
              <input
                placeholder="Film izlash..."
                className="bg-transparent border-none outline-none ps-4"
              />
              <button className="text-white p-2">
                <SearchOutlined />
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Header;
