import { useNavigate, useParams } from "react-router";
import { api } from "./api";
import { useMutation, useQuery } from "react-query";
import { Button, Form, Input } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  ArrowLeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useLocalStorageState } from "ahooks";

const Movie = () => {
  const { data, isLoading, isError } = useQuery("api-movis", () =>
    api.get("/movies")
  );
  const mutation = useMutation((newData) => {
    return api.put(`/movies/${id}`, newData);
  });

  const [likeOne, setLikeOne] = useLocalStorageState("like-one", {
    defaultValue: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      let dataa = data.data.filter((i) => i.id == id).map((i) => i?.comments);
      setCommentsData([
        ...dataa,
        // {
        //   img: "2",
        //   userId: 2,
        //   userComment: "2",
        // },
      ]);
    }
  }, [data, id]);

  const [commentsData, setCommentsData] = useState(null);

  const commentId = data?.data
    .filter((i) => i.id == id)
    .map((i) => i?.comments);

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

  const onFinish = (value) => {
    const newData = {
      ...value,
      id: +id,
      img: "https://cdn.uzmovi.com/v1/images/noavatar.png?v=2.7.1",
    };
    setCommentsData((prev) => [
      ...prev,
      {
        img: "2",
        userId: 2,
        userComment: "2",
      },
    ]);
    console.log(commentsData);
  };

  return (
    <>
      <div className="container md:px-32">
        {data?.data
          .filter((i) => i.id == id)
          .map((item, index) => {
            return (
              <div className="text-white text-center" key={index}>
                <Fade triggerOnce>
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
                        {likeOne !== true ? (
                          <Button
                            type="primary"
                            className="flex items-center bg-[#4096ff]"
                            onClick={() => {
                              console.log(item?.liked);
                              setLikeOne(true);
                            }}
                          >
                            <LikeOutlined />
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            disabled
                            className="flex items-center bg-[#4096ff]"
                            onClick={() => {
                              console.log(item?.liked);
                              setLikeOne(true);
                            }}
                          >
                            <LikeOutlined />
                          </Button>
                        )}

                        <span className="text-green-600">{item?.liked}</span>

                        {likeOne !== false ? (
                          <Button
                            className="flex items-center bg-red-700 text-white"
                            onClick={() => {
                              console.log(item?.liked);
                              setLikeOne(false);
                            }}
                          >
                            <DislikeOutlined />
                          </Button>
                        ) : (
                          <Button
                            type="primary"
                            disabled
                            className="flex items-center bg-red-700 text-white"
                            onClick={() => {
                              console.log(item?.liked);
                              setLikeOne(true);
                            }}
                          >
                            <DislikeOutlined />
                          </Button>
                        )}
                      </div>

                      <Button className="text-white w-full">
                        Kinoni ko'rish
                      </Button>
                    </div>
                  </div>
                </Fade>
              </div>
            );
          })}

        <div>
          {data?.data
            .filter((i) => i.id == id)
            .map((item) => {
              return (
                <div className="mt-10" key={item?.id}>
                  <Fade triggerOnce>
                    <div>
                      <video
                        style={{ maxHeight: "500px", width: "80%" }}
                        className="mx-auto"
                        controls
                        // autoPlay
                      >
                        <source src={item?.moviLink} type="video/mp4" />
                        <source src={item?.moviLink} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="bg-[#24303d] rounded-md mt-16 p-4 text-white">
                      <Form
                        className="flex items-center justify-between shadow-lg mb-2"
                        style={{ borderBottom: "1px solid #000" }}
                        onFinish={onFinish}
                      >
                        <Form.Item
                          className="w-[100%]"
                          name="userComment"
                          type="text"
                          rules={[
                            {
                              required: true,
                              message: "So'z kiritishingiz kerak",
                            },
                          ]}
                        >
                          <Input
                            className="w-[100%] bg-transparent placeholder:text-[#6e879f] text-[#6e879f] border-none outline-none"
                            placeholder={"Fikringizni kiriting..."}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="flex items-center bg-blue-600"
                          >
                            <RightOutlined />
                          </Button>
                        </Form.Item>
                      </Form>

                      <div className="mt-5">
                        {item?.comments.map((comment) => {
                          return (
                            <div
                              key={item?.id}
                              className="flex items-center gap-2 text-[#6e879f]"
                            >
                              <img
                                src={comment?.img}
                                className="rounded-full w-[50px]"
                              />
                              <div className="">
                                <p className="m-0 text-[12px] text-[#23527c]">
                                  Foydalanuvch
                                </p>
                                <p className="m-0 text-[15px]">
                                  {comment?.userComment}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Fade>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Movie;
