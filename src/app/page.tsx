"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Card from "../component/card";
import RankingCard from "@/component/card/rankingCard";
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
import { getPublicVideos } from "@/services/videoService";
import { PeacePlayVideo } from "@/types/peacePlay";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user, loading: authLoading } = useAuth();
  const [videos, setVideos] = useState<PeacePlayVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive Top 10 Videos sorted by Views
  const top10Videos = useMemo(() => {
    return [...videos]
      .sort((a, b) => (b.views || 0) - (a.views || 0)) // Sort by views descending
      .slice(0, 10);
  }, [videos]);

  useEffect(() => {
    if (authLoading) return;

    // Optional: Allow non-logged in users to see the page but with empty video list
    // OR fetch only if user is present.
    // Given the new Security Rules, fetching without user will fail.
    
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const data = await getPublicVideos(20);
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user, authLoading]);

  return (
    <div className="">
      <div className="">
        <div className="">
          <Carousel videos={videos} />
        </div>

        <div className="container mx-auto p-4">
          <div className="flex justify-between mt-8 items-center mb-4">
            <div className="text-[#000000] text-[22px] lg:text-[32px] font-bold flex items-center gap-2">
              <span className="text-4xl">🏆</span> 
              10 อันดับยอดนิยมวันนี้
            </div>
          </div>

          <Swiper
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Navigation]}
            navigation={false}
            spaceBetween={10}
            breakpoints={{
              375: {
                width: 350,
                spaceBetween: 10,
                slidesPerView: 1.2,
              },
              768: {
                 width: 400,
                 slidesPerView: 2,
              },
              1024: {
                spaceBetween: 20,
                width: 450,
                slidesPerView: 3,
              },
              1440: {
                spaceBetween: 30,
                width: null, // Let it adapt
                slidesPerView: 4,
              },
            }}
            className="pb-10"
          >
            {loading ? (
                <SwiperSlide>Loading...</SwiperSlide>
            ) : top10Videos.length > 0 ? (
                top10Videos.map((video, index) => (
                  <SwiperSlide key={`rank-${video.videoId}`}>
                    <RankingCard video={video} rank={index + 1} />
                  </SwiperSlide>
                ))
            ) : (
                 <SwiperSlide>ไม่พบข้อมูล</SwiperSlide>
            )}
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
            {loading ? (
               <SwiperSlide>Loading...</SwiperSlide>
            ) : videos.length > 0 ? (
               videos.map((video) => (
                <SwiperSlide key={video.videoId}>
                  <Card video={video} />
                </SwiperSlide>
              ))
            ) : (
                <SwiperSlide>ไม่พบข้อมูล</SwiperSlide>
            )}
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
            {loading ? (
               <SwiperSlide>Loading...</SwiperSlide>
            ) : videos.length > 0 ? (
               videos.map((video) => (
                <SwiperSlide key={`new-${video.videoId}`}>
                  <Card video={video} />
                </SwiperSlide>
              ))
            ) : (
                <SwiperSlide>ไม่พบข้อมูล</SwiperSlide>
            )}
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
            {loading ? (
               <SwiperSlide>Loading...</SwiperSlide>
            ) : videos.length > 0 ? (
               videos.map((video) => (
                <SwiperSlide key={`series-${video.videoId}`}>
                  <Card video={video} />
                </SwiperSlide>
              ))
            ) : (
                <SwiperSlide>ไม่พบข้อมูล</SwiperSlide>
            )}
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
            {loading ? (
               <SwiperSlide>Loading...</SwiperSlide>
            ) : videos.length > 0 ? (
               videos.map((video) => (
                <SwiperSlide key={`thai-${video.videoId}`}>
                  <Card video={video} />
                </SwiperSlide>
              ))
            ) : (
                <SwiperSlide>ไม่พบข้อมูล</SwiperSlide>
            )}
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
