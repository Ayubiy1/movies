import { useNavigate, useParams } from "react-router";
import { api } from "./api";
import { useQuery } from "react-query";
import { Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
// import { Button } from "";

const Movie = () => {
  const { data, isLoading, isError } = useQuery("api-movis", () =>
    api.get("/movies")
  );
  const { id } = useParams();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <div className="loading-container">
          <div className="loading"></div>
          <div id="loading-text">loading</div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <h1 id="word" className="glitch_word0">
          404 - page not found
        </h1>
      </div>
    );

  return (
    <>
      <div className="container md:px-32">
        {data?.data
          .filter((i) => i.id == id)
          .map((item) => {
            return (
              <div className="text-white text-center" key={item?.id}>
                <div
                  className="h-[50px] flex items-center mt-10"
                  style={{ borderLeft: "8px solid #02b0e4" }}
                >
                  <button className="ml-5" onClick={() => navigate("/movie")}>
                    <ArrowLeftOutlined />
                  </button>
                  <h1 className="ml-5 font-bold text-[22px]">{item?.name}</h1>
                </div>

                {/*  */}
                <div className="mx-auto bg-[#24303D] px-10 py-5 mt-10 flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between">
                  <div className="relative mt-5 max-w-[300px]">
                    <img src={item?.img} className="w-[250px] relative" />
                    <span className="absolute top-[40px] left-[35px] bg-red-500 px-[8px] py-[2px]">
                      {item?.data}
                    </span>
                    {/* <span></span> */}
                  </div>
                  {/*  */}
                  <div>
                    <div className="lg:w-[678px] my-3">
                      <div className="relative bg-[#1d232c] hover:bg-[#222933] rounded-sm flex items-center w-[100%] text-start">
                        <p
                          className="bg-[#304055] w-[100px] rounded-l-sm min-h-[35px] text-[13px] pl-3 flex items-center"
                          style={{ fontWeight: "300" }}
                        >
                          NOMI
                        </p>
                        <p className="ml-3 text-[14px]">{item?.name}</p>
                      </div>
                    </div>

                    <div className="lg:w-[678px] my-3">
                      <div className="relative bg-[#1d232c] hover:bg-[#222933] rounded-sm flex items-center w-[100%]">
                        <p
                          className="bg-[#304055] w-[100px] rounded-l-sm h-[35px] text-[13px] pl-3 flex items-center"
                          style={{ fontWeight: "300" }}
                        >
                          DAVLATI
                        </p>
                        {/* <span className="text-[#304055] absolute top-[0] left-[-13px]">
                          <CaretLeftOutlined />
                        </span> */}
                        <p className="ml-3 text-[14px]">{item?.country}</p>
                      </div>
                    </div>

                    <div className="lg:w-[678px] my-3">
                      <div className="relative bg-[#1d232c] hover:bg-[#222933] rounded-sm flex items-center w-[100%]">
                        <p
                          className="bg-[#304055] w-[100px] rounded-l-sm h-[35px] text-[13px] pl-3 flex items-center"
                          style={{ fontWeight: "300" }}
                        >
                          SANASI
                        </p>
                        {/* <span className="text-[#304055] absolute top-[0] left-[-13px]">
                          <CaretLeftOutlined />
                        </span> */}
                        <p className="ml-3 text-[14px]">{item?.data}</p>
                      </div>
                    </div>

                    <div className="lg:w-[678px] my-3">
                      <div className="relative bg-[#1d232c] hover:bg-[#222933] rounded-sm flex items-center w-[100%] text-start">
                        <p
                          className="bg-[#304055] w-[100px] rounded-l-sm h-[35px] text-[13px] pl-3 flex items-center"
                          style={{ fontWeight: "300" }}
                        >
                          JANR
                        </p>
                        {/* <span className="text-[#304055] absolute top-[0] left-[-13px]">
                          <CaretLeftOutlined />
                        </span> */}
                        <p className="ml-3 text-[14px]">{item?.typeName}</p>
                      </div>
                    </div>

                    <div className="lg:w-[678px] my-3">
                      <div className="relative bg-[#1d232c] hover:bg-[#222933] rounded-sm flex items-center w-[100%]">
                        <p
                          className="bg-[#304055] w-[100px] rounded-l-sm h-[35px] text-[13px] pl-3 flex items-center"
                          style={{ fontWeight: "300" }}
                        >
                          TIL
                        </p>
                        {/* <span className="text-[#304055] absolute top-[0] left-[-13px]">
                          <CaretLeftOutlined />
                        </span> */}
                        <p className="ml-3 text-[14px]">{item?.langulage}</p>
                      </div>
                    </div>

                    <div className="text-center my-3 mb-4 flex items-center justify-center gap-5">
                      <Button
                        type="primary"
                        className="flex items-center bg-[#4096ff]"
                      >
                        <LikeOutlined />
                      </Button>
                      <span className="text-green-600">{item?.liked}</span>
                      <Button
                        type="primary"
                        danger
                        className="flex items-center "
                      >
                        <DislikeOutlined />
                      </Button>
                    </div>

                    <Button className="text-white w-full">
                      Kinoni ko'rish
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

        <div>
          {data?.data
            .filter((i) => i.id == id)
            .map((item) => {
              return (
                <div className="mt-10">
                  <div>
                    <video
                      style={{ maxHeight: "500px", width: "80%" }}
                      className="mx-auto"
                      controls
                      autoPlay
                    >
                      <source src={item?.moviLink} type="video/mp4" />
                      <source src={item?.moviLink} type="video/ogg" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div></div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Movie;
