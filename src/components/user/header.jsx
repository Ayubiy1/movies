import { LoginOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@mui/icons-material";
import { Button, Dropdown, Drawer } from "antd";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Header = ({ setLogin, login, filter, setFilter, search, setSearch }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const itemsKinolar = [
    {
      key: "1",
      label: (
        <div className="flex gap-5 items-center justify-between">
          <a
            href="#kino"
            className="m-0 w-[210px] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
            onClick={() => setFilter("all")}
          >
            Tarjima kinolar
          </a>

          <a
            href="#kino"
            className="m-0 w-[210px] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
            onClick={() => setFilter("premyera")}
          >
            Premyeralar
          </a>

          <a
            href="#kino"
            className="m-0 w-[210px] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
            onClick={() => setFilter("Hindiston")}
          >
            Hind kinolar
          </a>

          <a
            href="http://kinochi.net/"
            target="_blank"
            className="m-0 w-[210px] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
            onClick={() => setFilter("all")}
          >
            KINO YANGILIKLARI
          </a>
        </div>
      ),
    },
  ];
  return (
    <div className="">
      <div
        className={`${
          login == true ? "bg-[#001529]" : "bg-[#222933]"
        } h-[100px] md:px-[20px] hidd`}
      >
        <div className="px10 w-[100%] h-[100%] flex items-center justify-between">
          {/* <div></div> */}
          <p className="text-[50px] text-white m-0">Films</p>
          <div className="hidden lg:block">
            <div className="hidden">
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

            {/* Dropdowns */}
            {location.pathname == "/movie" ? (
              <div
                className="flex items-center"
                onClick={() => {
                  navigate("/movie");
                }}
              >
                <div
                  className="text-[#a5bbdc] text-[20px] uppercase p-5 h-[100px] flex items-center cursor-pointer hover:text-white hover:bg-[rgba(255,105,7,.4)]"
                  style={{ borderBottom: "2px solid rgba(255,105,7,.4)" }}
                >
                  <p>bosh sahifa</p>
                </div>

                <Dropdown
                  menu={{
                    items: itemsKinolar,
                  }}
                  // placement="bottomCenter"
                  arrow
                  className="bg-transparent"
                >
                  <div
                    className="text-[#a5bbdc] text-[20px] uppercase p-5 h-[100px] flex items-center cursor-pointer hover:text-white hover:bg-[rgba(2,176,228,.4)]"
                    style={{ borderBottom: "2px solid rgba(2,176,228,.4)" }}
                  >
                    <p>kinolar</p>
                  </div>
                </Dropdown>

                <Dropdown
                  menu={{
                    items: itemsKinolar,
                  }}
                  placement="bottom"
                  arrow
                >
                  <div
                    className="text-[#a5bbdc] text-[20px] uppercase p-5 h-[100px] flex items-center cursor-pointer hover:text-white hover:bg-[rgba(255,105,7,.4)]"
                    style={{ borderBottom: "2px solid rgba(255,105,7,.4)" }}
                  >
                    <p>janr</p>
                  </div>
                </Dropdown>

                <Dropdown
                  menu={{
                    items: itemsKinolar,
                  }}
                  placement="bottom"
                  arrow
                >
                  <div
                    className="text-[#a5bbdc] text-[20px] uppercase p-5 h-[100px] flex items-center cursor-pointer hover:text-white hover:bg-[#FF6907]"
                    style={{ borderBottom: "2px solid #FF6907" }}
                  >
                    <p>yil</p>
                  </div>
                </Dropdown>

                <Dropdown
                  menu={{
                    items: itemsKinolar,
                  }}
                  placement="bottom"
                  arrow
                >
                  <div
                    className="text-[#a5bbdc] text-[20px] uppercase p-5 h-[100px] flex items-center cursor-pointer hover:text-white hover:bg-[rgba(255,193,70,.4)]"
                    style={{ borderBottom: "2px solid rgba(255,193,70,.4)" }}
                  >
                    <p>mamlakat</p>
                  </div>
                </Dropdown>

                {/* <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
                arrow
              >
                <div></div>
              </Dropdown>{" "} */}
              </div>
            ) : (
              <Button className="text-white" onClick={() => navigate("/movie")}>
                Movies
              </Button>
            )}
          </div>

          <Button
            className="text-white flex items-center lg:hidden"
            onClick={showDrawer}
          >
            <MenuFoldOutlined />
          </Button>
          <Drawer
            title={<p className="text-white">Menu</p>}
            placement="right"
            onClose={onClose}
            open={open}
            style={{ background: "#222933", color: "#fff" }}
          >
            <div className="flex gap-5 flex-col">
              <a
                href="#kino"
                className="m-0 w-[100%] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
                onClick={() => {
                  setFilter("all");
                  onClose();
                }}
              >
                Tarjima kinolar
              </a>

              <a
                href="#kino"
                className="m-0 w-[100%] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
                onClick={() => {
                  setFilter("premyera");
                  onClose();
                }}
              >
                Premyeralar
              </a>

              <a
                href="#kino"
                className="m-0 w-[100%] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
                onClick={() => {
                  setFilter("Hindiston");
                  onClose();
                }}
              >
                Hind kinolar
              </a>

              <a
                href="http://kinochi.net/"
                target="_blank"
                className="m-0 w-[100%] h-[40px] flex items-center justify-center hover:bg-[#166280] text-[17px] text-[#a5bbdc] bg-[#304156]"
                onClick={() => {
                  setFilter("all");
                  onClose();
                }}
              >
                KINO YANGILIKLARI
              </a>
            </div>
          </Drawer>
        </div>
      </div>

      <div>
        {location.pathname === "/movie" && (
          <div className="flex items-center justify-between rounded-sm bg-[#304156] w-[300px] mt-[30px] ms-[20px]">
            <input
              placeholder="Film izlash..."
              className="bg-transparent border-none outline-none ps-4"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-white p-2">
              <SearchOutlined />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
