"use client";
import React from "react";
import Cards from "../../component/card/index";
import Footer from "../../component/footer/index";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDownIcon } from "@/component/icons";

function Project() {
  return (
    <>
      <div className="container mx-auto mt-10 p-10">
        <p className="text-[#2F5D86] text-[25px] md:text-[35px] ">
          โปรเจคทั้งหมด
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

        <div className="container mx-auto">
          <div className="block md:flex justify-end items-center mt-4">
            <Dropdown className="w-full md:w-[20%]">
              <DropdownTrigger>
                <Button
                  className="bg-[#2F5D86] text-[#FFFFFF] border rounded-2xl mt-1"
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
                  หนัังผี
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flex-wrap items-center justify-between mb-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((items: any, index: number) => {
                return (
                  <div
                    className="w-full md:w-[31.5%] lg:w-[31%] xl:w-[32%] mb-3 md:mb-0"
                    key={index}
                  >
                    <Cards />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between mb-5 gap-4">
              {[1, 2, 3].map((items: any, index: number) => {
                return (
                  <div
                    className="w-full md:w-[31.5%] lg:w-[31%] xl:w-[32%] mb-3 md:mb-0"
                    key={index}
                  >
                    <Cards />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Project;
