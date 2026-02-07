"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { getVideoById } from "@/services/videoService";
import { PeacePlayVideo } from "@/types/peacePlay";
import Footer from "../../../component/footer";
import Cards from "../../.../../../component/card";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { BorderColorSample } from "@/utils/border-comstant";
import Link from "next/link";
import Content from "./tabs/content/page";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Suspense } from "react";

function ProjectDetailContent() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [video, setVideo] = useState<PeacePlayVideo | null>(null);

  useEffect(() => {
    if (id) {
      getVideoById(id).then(setVideo);
    }
  }, [id]);

  if (!video) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <>
      <div className="relative flex h-[300px] lg:h-[800px] w-full mix-blend-overla mt-[56px]">
        <Image
          src={video.thumbnailUrl || "/assets/image8.png"}
          className="object-cover"
          alt={video.title}
          fill
        />
        <div className="absolute top-[35%] px-20 w-full z-10">
          <p className="text-white text-7xl mb-4">{video.title}</p>
          <p className="text-white text-base tracking-widest">
            {video.resolution} | {Number(video.duration / 60).toFixed(0)}m | {video.format}
          </p>
          <div className="my-8 border opacity-55" />
          <div className="flex gap-3 justify-between">
            <div className="flex gap-5">
              <Image
                width={176}
                height={270}
                src={video.thumbnailUrl || "/assets/image8.png"}
                className="object-cover rounded-lg h-[270px] "
                alt={video.title}
              />
              <div className="w-[80%]">
                <p className="text-white font-extrabold text-lg mb-2">
                  Created by : User {video.userId}
                </p>
                <p className="text-white font-extrabold tracking-widest">
                  {video.description}
                </p>
                <div className="flex justify-start gap-2 mt-6">
                  <Button
                    className="bg-none text-white text-[10px] md:text-[12px] w-10"
                    variant="bordered"
                    radius={"full"}
                    fullWidth={true}
                  >
                    Fantasy
                  </Button>

                  <Button
                    className="bg-none text-white text-[10px] md:text-[12px] w-10"
                    variant="bordered"
                    radius={"full"}
                    fullWidth={true}
                  >
                    Fanily
                  </Button>

                  <Button
                    className="bg-none text-white text-[10px] md:text-[12px] w-10"
                    variant="bordered"
                    radius={"full"}
                    fullWidth={true}
                  >
                    Music
                  </Button>
                </div>
              </div>
            </div>

            <Card className="w-[290px] h-[260px] border-none bg-transparent shadow-none">
              <CardBody className="justify-center items-center pb-0 ">
                <CircularProgress
                  classNames={{
                    svg: "w-40 h-40 drop-shadow-md border-none overflow-x-hidden overflow-y-hidden",
                    indicator: "stroke-[#E0CC3F] border-none",
                    track: "stroke-slate-500 opacity-40 border-none",
                    value: "text-3xl font-semibold text-white border-none",
                  }}
                  value={7.5}
                  formatOptions={{ style: "decimal" }}
                  maxValue={10}
                  strokeWidth={4}
                  showValueLabel={true}
                />
              </CardBody>
              <CardFooter className="justify-center items-center pt-0 ">
                <Chip
                  classNames={{
                    base: "border-none overflow-x-hidden overflow-y-hidden",
                    content: "text-white/90 text-2xl font-semibold",
                  }}
                  variant="bordered"
                >
                  Ratting
                </Chip>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="absolute bottom-[-1px] bg-gradient-to-t from-[#211208] to-none w-full h-[400px]"></div>
      </div>
      <div className="bg-[#211208]">
        <div className="container mx-auto px-8 py-8 ">
          <div className="hidden md:block">
            <div className="flex justify-between mt-6">
              <div>
                <div className="text-white text-[24px] py-1">ID : TN00025</div>

                <div className="text-white text-[32px] py-2">
                  สัปเหร่อ (จักรวาลไทบ้าน)
                </div>
              </div>

              <div className="w-[300px] h-[100px] flex gap-2">
                <Button
                  className="bg-[#2F5D86] text-white text-[18px] w-1/2"
                  radius={"sm"}
                  onPress={() => router.push(`/project/projectDetail/contents/video?id=${video?.videoId}`)}
                >
                  รับชม
                </Button>
                <Button
                  className="bg-white text-[#2F5D86] border border-[#2F5D86] text-[18px] w-1/2"
                  radius={"sm"}
                  onPress={onOpen}
                >
                  ซื้อสคริป
                </Button>
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-center ">
            <div className="flex-col ">
              <div className="text-white text-[24px] py-2 ">
                สัปเหร่อ (จักรวาลไทบ้าน)
              </div>

              <div className="w-[300px] h-[100px] flex gap-2">
                <Button
                  className="bg-[#2F5D86] text-white text-[16px] w-1/2"
                  radius={"sm"}
                  onPress={() => router.push(`/project/projectDetail/contents/video?id=${video?.videoId}`)}
                >
                  รับชม
                </Button>
                <Button
                  className="bg-white text-[#2F5D86] border border-[#2F5D86] text-[16px] w-1/2"
                  radius={"sm"}
                  onPress={onOpen}
                >
                  ซื้อสคริป
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-normal gap-2">
            <div className="text-white text-[10px] md:text-[16px] py-2 ">
              หมวดหมู่ : ภาพยนตร์สยองขวัญ
            </div>

            <div className="w-[5px] md:w-[25px] h-[15px] flex justify-start gap-2">
              <Button
                className="bg-[#FFF0FC] text-[#2F5D86] text-[10px] md:text-[12px]"
                variant="bordered"
                radius={"sm"}
                fullWidth={true}
                style={{ border: `${BorderColorSample}` }}
              >
                ตลก
              </Button>

              <Button
                className="bg-[#FFF0FC] text-[#2F5D86] text-[10px] md:text-[12px]"
                variant="bordered"
                radius={"sm"}
                fullWidth={true}
                style={{ border: `${BorderColorSample}` }}
              >
                ความรัก
              </Button>

              <Button
                className="bg-[#FFF0FC] text-[#2F5D86] text-[10px] md:text-[12px]"
                variant="bordered"
                radius={"sm"}
                fullWidth={true}
                style={{ border: `${BorderColorSample}` }}
              >
                ผจญภัย
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 py-4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.88822 6.55229C10.3883 6.05219 10.6693 5.37391 10.6693 4.66667C10.6693 3.95942 10.3883 3.28115 9.88822 2.78105C9.38813 2.28095 8.70985 2 8.0026 2C7.29536 2 6.61708 2.28095 6.11699 2.78105C5.61689 3.28115 5.33594 3.95942 5.33594 4.66667C5.33594 5.37391 5.61689 6.05219 6.11699 6.55229C6.61708 7.05238 7.29536 7.33333 8.0026 7.33333C8.70985 7.33333 9.38813 7.05238 9.88822 6.55229Z"
                stroke="#FFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.70277 10.7002C5.57794 9.825 6.76493 9.33333 8.0026 9.33333C9.24028 9.33333 10.4273 9.825 11.3024 10.7002C12.1776 11.5753 12.6693 12.7623 12.6693 14H3.33594C3.33594 12.7623 3.8276 11.5753 4.70277 10.7002Z"
                stroke="#FFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="text-white text-[10px] md:text-[16px]">
              500 ผู้เรียน
            </p>
            <div className="flex justify-normal items-center gap-2 px-6">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.0026 7H8.0026M4.0026 9.66667H8.0026M9.33594 13H2.66927C2.31565 13 1.97651 12.8595 1.72646 12.6095C1.47641 12.3594 1.33594 12.0203 1.33594 11.6667V2.33333C1.33594 1.97971 1.47641 1.64057 1.72646 1.39052C1.97651 1.14048 2.31565 1 2.66927 1H6.39327C6.57007 1.00004 6.73961 1.0703 6.8646 1.19533L10.4739 4.80467C10.599 4.92966 10.6692 5.0992 10.6693 5.276V11.6667C10.6693 12.0203 10.5288 12.3594 10.2787 12.6095C10.0287 12.8595 9.68956 13 9.33594 13Z"
                  stroke="#FFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-white text-[10px] md:text-[16px]">5 ยูนิต</p>
            </div>

            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.04149 1.22311C9.32498 0.269846 10.675 0.269847 10.9585 1.22311L12.3139 5.7809C12.4427 6.21396 12.8459 6.50688 13.2976 6.49554L18.0511 6.37619C19.0453 6.35123 19.4625 7.6352 18.6435 8.19939L14.7276 10.8969C14.3556 11.1532 14.2016 11.6272 14.3519 12.0532L15.9344 16.5373C16.2653 17.4751 15.1731 18.2686 14.3835 17.664L10.6079 14.7734C10.2492 14.4988 9.75083 14.4988 9.39209 14.7734L5.61653 17.6641C4.82686 18.2686 3.73465 17.4751 4.06562 16.5373L5.64806 12.0532C5.79842 11.6272 5.64442 11.1532 5.27235 10.8969L1.35649 8.19939C0.53748 7.6352 0.954668 6.35123 1.94888 6.37619L6.70245 6.49554C7.15411 6.50688 7.55727 6.21396 7.68606 5.7809L9.04149 1.22311Z"
                fill="#FFD100"
              />
            </svg>

            <p className="text-white text-[10px] md:text-[16px]">
              4.8 (รีวิว 2K)
            </p>
          </div>

          <div className="text-white text-[10px] md:text-[16px] pb-4 ">
            ผู้เขียน
          </div>

          <a
            href="/project/projectDetail/tabs/writer"
            className="flex gap-1 items-center  "
          >
            <div className="flex gap-2 items-center">
              <button className="bg-[#D9D9D9] p-5 rounded-full"></button>
              <p className="text-[10px] md:text-[16px] text-white">
                สุรศักดิ์ ป้องศร
              </p>
            </div>
          </a>

          <div className="text-white text-[12px] md:text-[20px] pt-4 ">
            ภาพรวม
          </div>

          <div className="hidden md:block ">
            <div className=" flex justify-between py-4">
              <div>
                <div className="flex justify-start gap-2 py-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z"
                      stroke="#FFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.46094 12C3.73494 7.943 7.52594 5 12.0029 5C16.4809 5 20.2709 7.943 21.5449 12C20.2709 16.057 16.4809 19 12.0029 19C7.52594 19 3.73494 16.057 2.46094 12Z"
                      stroke="#FFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-white text-[10px] md:text-[16px]">
                    124 การดู
                  </p>
                </div>

                <div className="flex justify-start gap-2 py-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12L15 15M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                      stroke="#FFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="text-white text-[10px] md:text-[16px]">
                    ระยะเวลาที่คาดหวัง : 01:30:00
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-start gap-2 py-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM5 8V6V8Z"
                      fill="#FFF"
                    />
                  </svg>

                  <p className="text-white text-[10px] md:text-[16px]">
                    ระยะเวลาการลงทะเบียน : ไม่มีวันหมดอายุ
                  </p>
                </div>
                <div className="flex justify-start gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM5 8V6V8Z"
                      fill="#FFF"
                    />
                  </svg>

                  <p className="text-white text-[10px] md:text-[16px]">
                    ระยะเวลาหลักสูตร : 01 ม.ค. 2566 - 31 ธ.ค. 2566
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex-col  py-4">
            <div>
              <div className="flex justify-start gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.46094 12C3.73494 7.943 7.52594 5 12.0029 5C16.4809 5 20.2709 7.943 21.5449 12C20.2709 16.057 16.4809 19 12.0029 19C7.52594 19 3.73494 16.057 2.46094 12Z"
                    stroke="#3F3F46"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-white text-[10px] md:text-[16px]">
                  124 การดู
                </p>
              </div>

              <div className="flex justify-start gap-2 py-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12L15 15M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-white text-[10px] md:text-[16px]">
                  ระยะเวลาที่คาดหวัง : 01:30:00
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-start gap-2 py-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM5 8V6V8Z"
                    fill="#545859"
                  />
                </svg>

                <p className="text-white text-[10px] md:text-[16px]">
                  ระยะเวลาการลงทะเบียน : ไม่มีวันหมดอายุ
                </p>
              </div>
              <div className="flex justify-start gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V6C3 5.45 3.19567 4.97933 3.587 4.588C3.979 4.196 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.021 4.196 20.413 4.588C20.8043 4.97933 21 5.45 21 6V20C21 20.55 20.8043 21.021 20.413 21.413C20.021 21.8043 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM5 8V6V8Z"
                    fill="#545859"
                  />
                </svg>

                <p className="text-white text-[10px] md:text-[16px]">
                  ระยะเวลาหลักสูตร : 01 ม.ค. 2566 - 31 ธ.ค. 2566
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col pt-5">
            <Tabs
              color="default"
              variant="underlined"
              classNames={{
                base: "mb-1",
              }}
            >
              <Tab
                key="เกี่ยวกััับ"
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] md:text-[16px] text-white">
                      เกี่ยวกับ
                    </span>
                  </div>
                }
              >
                <Content />
              </Tab>

              <Tab
                key="เนื้อหา"
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] md:text-[16px] text-white">
                      เนื้อหา
                    </span>
                  </div>
                }
              >
                <Content />
              </Tab>

              <Tab
                key="บทสคริป"
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] md:text-[16px] text-white">
                      บทสคริป
                    </span>
                  </div>
                }
              >
                <Content />
              </Tab>
              <Tab
                key="การสนทนา"
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] md:text-[16px] text-white">
                      การสนทนา
                    </span>
                  </div>
                }
              >
                <Content />
              </Tab>
              <Tab
                key="รีวิว"
                title={
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] md:text-[16px] text-white">
                      รีวิว
                    </span>
                  </div>
                }
              >
                <Content />
              </Tab>
            </Tabs>
          </div>

          <div className="flex justify-center  py-4 w-full"></div>
          <div className="text-white text-[12px] md:text-[32px] py-10">
            เนื้อหาใกล้เคียง
          </div>

          <div className="block md:flex items-center mb-5 gap-4 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((items: any, index: number) => {
              return (
                <div
                  className="w-full md:w-[31.5%] lg:w-[32%] xl:w-[24%] mb-3 md:mb-0"
                  key={index}
                >
                  <Cards />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {/* Modal Title */}
              </ModalHeader>
              <ModalBody>
                <Image
                  src="/assets/image13.png"
                  width={130}
                  height={125}
                  alt=""
                  className="mb-[10px] w-full rounded-lg"
                />
                <div className="flex justify-center">
                  <p className="text-[#282828] text-[20px] ">
                    คุณได้ลงทะเบียเรียบร้อยแล้ว
                    <br /> รอการอนุมัติจากเจ้าหน้าที่...
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ปิด
                </Button>
                <Button color="primary" onPress={onClose}>
                  รับทราบ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDetailContent />
    </Suspense>
  );
}
