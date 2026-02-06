"use client";

import Image from "next/image";
import Card from "../component/card";
import CardInfo from "@/component/card/cardInfo";
import Footer from "../component/footer";
import Carousel from "@/component/navBar/carousel";
import Category from "@/component/card/category";
import { useDisclosure } from "@nextui-org/react";
import { IconArrowLeft, IconArrowRight } from "@/component/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="">
      <div className="">
        <div className="">
          <Carousel />
        </div>

        <div className="container mx-auto p-4">
          <div className="flex justify-between mt-8 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px]">
              หมวดหมู่ทั้งหมด
            </div>
            <div className="">
              <p className="text-[#2F5D86] text-center mb-2 hidden md:block">
                ดูทั้งหมด
              </p>
              <div className="flex gap-2 justify-center items-center">
                <IconArrowLeft />
                <div className=" bg-black w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <IconArrowRight />
              </div>
            </div>
          </div>

          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation]}
            navigation={false}
            spaceBetween={20}
            breakpoints={{
              375: {
                width: 400,
                spaceBetween: 20,
                slidesPerView: 1.5,
              },
              1024: {
                spaceBetween: 20,
                width: 410,
              },
              1440: {
                spaceBetween: 20,
                width: 378,
              },
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((items: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Category />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-between mt-10 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px]">
              ยอดนิยม
            </div>
            <div className="">
              <p className="text-[#2F5D86] text-center mb-2 hidden md:block">
                ดูทั้งหมด
              </p>
              <div className="flex gap-2 justify-center items-center">
                <IconArrowLeft />
                <div className=" bg-black w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <IconArrowRight />
              </div>
            </div>
          </div>

          <Swiper
            breakpoints={{
              375: {
                width: 400,
                spaceBetween: 20,
                slidesPerView: 1.5,
              },
              1024: {
                spaceBetween: 20,
                width: 410,
              },
              1440: {
                spaceBetween: 20,
                width: 378,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((items: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Card />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-between mt-10 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px]">
              ใหม่ล่าสุด
            </div>
            <div className="">
              <p className="text-[#2F5D86] text-center mb-2 hidden md:block">
                ดูทั้งหมด
              </p>
              <div className="flex gap-2 justify-center items-center">
                <IconArrowLeft />
                <div className=" bg-black w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <IconArrowRight />
              </div>
            </div>
          </div>

          <Swiper
            breakpoints={{
              375: {
                width: 400,
                spaceBetween: 20,
                slidesPerView: 1.5,
              },
              1024: {
                spaceBetween: 20,
                width: 410,
              },
              1440: {
                spaceBetween: 20,
                width: 378,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((items: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Card />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-between mt-10 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px]">
              ซี่รีส์ และโปรแกรมทีวี
            </div>
            <div className="">
              <p className="text-[#2F5D86] text-center mb-2 hidden md:block">
                ดูทั้งหมด
              </p>
              <div className="flex gap-2 justify-center items-center">
                <IconArrowLeft />
                <div className=" bg-black w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <IconArrowRight />
              </div>
            </div>
          </div>

          <Swiper
            breakpoints={{
              375: {
                width: 400,
                spaceBetween: 20,
                slidesPerView: 1.5,
              },
              1024: {
                spaceBetween: 20,
                width: 410,
              },
              1440: {
                spaceBetween: 20,
                width: 378,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((items: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Card />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex justify-between mt-10 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px]">
              ภาพยนต์ไทย
            </div>
            <div className="">
              <p className="text-[#2F5D86] text-center mb-2 hidden md:block">
                ดูทั้งหมด
              </p>
              <div className="flex gap-2 justify-center items-center">
                <IconArrowLeft />
                <div className=" bg-black w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <div className=" bg-slate-300 w-[20px] h-[4px] rounded-xl"></div>
                <IconArrowRight />
              </div>
            </div>
          </div>

          <Swiper
            breakpoints={{
              375: {
                width: 400,
                spaceBetween: 20,
                slidesPerView: 1.5,
              },
              1024: {
                spaceBetween: 20,
                width: 410,
              },
              1440: {
                spaceBetween: 20,
                width: 378,
              },
            }}
            pagination={{
              clickable: true,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((items: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Card />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="mt-10">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h1 className="text-[#061118] text-[40px] ">ข่าวสาร</h1>
              </div>
              <a href="">
                <div className="flex gap-2 items-center">
                  <h3 className="text-[#2F5D86] text-[16px]">ดูทั้งหมด</h3>
                </div>
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <Swiper
              breakpoints={{
                375: {
                  width: 400,
                  spaceBetween: 20,
                  slidesPerView: 1.5,
                },
                1024: {
                  spaceBetween: 20,
                  width: 410,
                },
                1440: {
                  spaceBetween: 20,
                  width: 378,
                },
              }}
              pagination={{
                clickable: true,
              }}
            >
              <div className="space-y-3 mb-3">
                {[1, 2, 3, 4].map((items: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <CardInfo />
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>

          <div className="hidden md:block">
            <div className="space-y-3 mb-3">
              {[1, 2].map((items: any, index: number) => {
                return (
                  <div key={index}>
                    <CardInfo />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
