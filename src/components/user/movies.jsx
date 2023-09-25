import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user.css";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { api } from "./api";
import { Carousel } from "antd";

const Films = () => {
  const { data, isLoading, isError } = useQuery("api-movis", () =>
    api.get("/movies")
  );

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
      <div className="mt-10 md:px-32">
        <div className="bg-[#523B67] w-full pt-3" style={{ opacity: "1px" }}>
          <div
            className="h-[50px] flex items-center ms-5 mb-5"
            style={{ borderLeft: "8px solid #9B59B6" }}
          >
            <p className="text-white ps-3">PREMYERA</p>
          </div>
          <Carousel autoplay className="mb-10">
            <div>
              <h3
                style={{
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                }}
              >
                {data?.data
                  .filter((a) => a.id == 1)
                  .map((i) => (
                    <img
                      src={i?.img}
                      onClick={() => navigate(`${i?.id}`)}
                      className="w[50%] pb-10 cursor-pointer h-[500px] mx-auto object-contain"
                    />
                  ))}
              </h3>
            </div>

            <div>
              <h3
                style={{
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                }}
              >
                {data?.data
                  .filter((a) => a.id == 5)
                  .map((i) => (
                    <img
                      src={i?.img}
                      onClick={() => navigate(`${i?.id}`)}
                      className="w[50%] pb-10 cursor-pointer h-[500px] mx-auto object-contain"
                    />
                  ))}
              </h3>
            </div>

            <div>
              <h3
                style={{
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                }}
              >
                {data?.data
                  .filter((a) => a.id == 15)
                  .map((i) => (
                    <img
                      src={i?.img}
                      onClick={() => navigate(`${i?.id}`)}
                      className="w[50%] pb-10 cursor-pointer h-[500px] mx-auto object-contain"
                    />
                  ))}
              </h3>
            </div>

            <div>
              <h3
                style={{
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                }}
              >
                {data?.data
                  .filter((a) => a.id == 13)
                  .map((i) => (
                    <img
                      src={i?.img}
                      onClick={() => navigate(`${i?.id}`)}
                      className="w[50%] pb-10 cursor-pointer h-[500px] mx-auto object-contain"
                    />
                  ))}
              </h3>
            </div>
          </Carousel>
        </div>

        <div className="flex items-start justify-center flex-wrap">
          {data?.data.map((item) => {
            return (
              <div
                key={item?.id}
                className="relative max-w-[200px] m-3 p-3 cursor-pointer bg-[#1D232C]"
                onClick={() => navigate(`${item?.id}`)}
              >
                <img src={item?.img} className="w-[100%]" />
                <span className="absolute top-[13px] left-[13px] text-[11px] px-2 py-1 bg-red-700 text-white">
                  {item?.data}
                </span>
                <div className="bg-[#222933] mt-2 p-2 text-center">
                  <p
                    className="text-white m-0 text-[15px] font-serif"
                    style={{ fontWeight: "100" }}
                  >
                    {item?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Films;
