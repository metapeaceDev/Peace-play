"use client";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import { aborted } from "util";

const Carousel = () => {
  return (
    // before:absolute before:w-full before:inset-0 before:bg-black
    <>
      <div className="hidden md:block">
        <div className="relative flex justify-center">
          <div className="min-h-[250px] md:min-h-[350px] z-50 h-full mx-auto flex flex-col justify-center items-center text-white absolute mt-20">
            <div className="min-h-[350px] w-[300px] md:w-[500px] lg:w-[800px] relative z-50 h-full flex flex-col justify-center items-center text-white p-6">
              <p className="text-white md:text-[49px] pt-20 pb-6 leading-[60px]">
                ระบบสร้างสรรค์งานในรูปแบบโปรเจค (Metapeace)
              </p>
              <p className="text-[#FFFFFF] text-[24px] font-normal">
                อิสรภาพของการสร้างสรรค์งานในรูปแบบต่างๆที่ทำงานได้ทั้งในโลกจริงและ
                โลกเสมือน พร้อมทั้งเป็นแหล่งรวมความบันเทิงหลากหลายรูปแบบ <br />
              </p>
              <div className="mt-4 w-full">
                <form className="flex items-center">
                  <label htmlFor="voice-search" className="sr-only">
                    Search
                  </label>
                  <div className="w-full">
                    <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                    <input
                      type="text"
                      id="voice-search"
                      className=" bg-gray-50 border border-gray-300 text-sm text-black rounded-lg focus:outline-none w-full ps-10 p-2.5"
                      placeholder="ไทบ้าน เดอะซีรีส์"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0  flex items-center"
                    ></button>
                  </div>
                  <button className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg
                      className="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    ค้นหา
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Swiper
            navigation={true}
            // modules={[Navigation, Autoplay]}
            modules={[Navigation]}
            style={{ height: "800px", width: "full" }}
            loop={true}
            autoplay={{
              delay: 3000,
              // disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <div className="">
                <img
                  src="/assets/image8.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <img
                  src="/assets/image9.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <img
                  src="/assets/image10.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <img
                  src="/assets/image11.png"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex flex-col justify-center items-center text-white ">
          <p className="text-[#1A1A1A] text-[31px]  ">
            เสริมทักษะของคุณให้พร้อมใน การแข่งขันยุคดิจิทัล
          </p>
          <p className="text-[#282828] text-[16px] font-normal pt-10">
            สร้างทักษะใหม่ๆให้ตัวคุณเองโดยโปรเจคเรียนจากผู้เชี่ยวชาญเพื่อฝึกฝนจนชำนาญ
            ก้าวหน้าในอาชีพ สามารถเรียนรู้ ที่ใดก็ได้ในโลกนี้ทุกเวลา
          </p>
          <div className="mt-4 w-full">
            <form className="flex items-center">
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="w-full">
                <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input
                  type="text"
                  id="voice-search"
                  className=" bg-gray-50 border border-gray-300 text-sm text-black rounded-lg focus:outline-none w-full ps-10 p-2.5"
                  placeholder="ไทบ้าน เดอะซีรีส์"
                />
                <button
                  type="button"
                  className="absolute inset-y-0  flex items-center"
                ></button>
              </div>
              <button className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
