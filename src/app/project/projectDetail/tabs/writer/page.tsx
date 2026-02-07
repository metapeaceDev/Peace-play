"use client";
import { ChevronDownIcon } from "@/component/icons";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import Cards from "../../../../../component/card";
import Footer from "../../../../../component/footer";

const Writer = () => {
  return (
    <div className="bg-[#FAFAFA]">
      <div className="container mx-auto p-4">
        <div className="">
          <p className="text-[#282828] text-[15px] md:text-[25px]">ผู้เขียน</p>
        </div>

        <div className="w-auto rounded-lg shadow-lg p-4 bg-white mb-4">
          <div className="flex justify-normal gap-4">
            <div className="flex gap-4 items-center">
              <Avatar
                isBordered
                color="default"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </div>

            <p className="text-[#282828] text-[15px] md:text-[25px]">
              สุรศักดิ์ ป้องศร
            </p>
          </div>
          <p className="text-[#282828] text-[12px] md:text-[20px] pt-6">
            ความสามารถพิเศษ
          </p>
          <p className="text-[#666666] text-[10px] md:text-[16px] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie,
          </p>
          <p className="text-[#282828] text-[12px] md:text-[20px] pt-8">
            ประวัติโดยย่อ
          </p>
          <p className="text-[#666666] text-[10px] md:text-[16px] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </p>
        </div>

        <div className="w-auto rounded-lg shadow-lg p-4">
          <div className="block md:flex justify-between items-center">
            <form className="flex">
              <button className="h-[40px] bg-[#FFFFFF] border rounded-sm hover:bg-[#D9D9D9] hover:text-white px-3">
                <p className="text-[#2F5D86] text-[12px] md:text-[20px]">
                  ค้นหา
                </p>
              </button>
              <input
                type="text"
                placeholder="โปรเจคของผู้เขียน"
                className="h-[40px] w-full bg-[#FFFFFF] border rounded-sm focus:bg-[#D9D9D9] text-[#CCCCCC] pl-4 text-[12px] md:text-[20px]"
              />
            </form>

            <Dropdown className="w-full md:w-[20%]">
              <DropdownTrigger>
                <Button
                  className="bg-[#2F5D86] text-[#FFFFFF] border rounded-2xl mt-3  "
                  variant="bordered"
                  endContent={<ChevronDownIcon />}
                >
                  <p className="text-[12px] md:text-[20px]">ยอดนิยม</p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">ต่อสู้</DropdownItem>
                <DropdownItem key="copy">หนังรัก</DropdownItem>
                <DropdownItem key="edit">คอมเมดี้</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  หนังผี
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <p className="text-[#282828] text-[12px] md:text-[20px] mt-5 font-extrabold">
            เนื้อหาทั้งหมด (60)
          </p>
          <div className="block md:flex items-center mb-5 pt-4 gap-3 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((items: any, index: number) => {
              return (
                <div
                  className="w-full md:w-[32%] xl:w-[24%] mb-3 md:mb-0"
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
    </div>
  );
};

export default Writer;
