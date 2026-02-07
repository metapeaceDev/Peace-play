"use client";
import React from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Cards from "../../component/card/index";
import Inprogress from "../../component/card/inProgress";
import Finish from "../../component/card/finish";
import Expire from "@/component/card/expire";

function MyProject() {
  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-[#282828] text-[25px]">โปรเจคของฉัน</h1>
      <div className="flex w-full flex-col pt-6">
        <Tabs aria-label="Options" color="primary" variant="underlined">
          <Tab key="ยังไม่เริ่ม" title="ยังไม่เริ่ม">
            <div className="block md:flex items-center mb-5 gap-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((items: any, index: number) => {
                return (
                  <div
                    className="w-full md:w-[48%] lg:w-[31%] xl:w-[22%] mb-3 md:mb-0"
                    key={index}
                  >
                    <Cards />
                  </div>
                );
              })}
            </div>
          </Tab>

          <Tab key="กำลังดำเนินการ" title="กำลังดำเนินการ">
            {/* <Inprogress /> */}
            <div className="block md:flex items-center mb-5 gap-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((items: any, index: number) => {
                return (
                  <div
                    className="w-full md:w-[48%] lg:w-[31%] xl:w-[22%] mb-3 md:mb-0"
                    key={index}
                  >
                    <Inprogress />
                  </div>
                );
              })}
            </div>
          </Tab>

          <Tab
            key="เสร็จสิ้น"
            title={
              <div className="flex items-center space-x-2">
                <span>เสร็จสิ้น</span>
              </div>
            }
          >
            <div className="block md:flex items-center mb-5 gap-4 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map((items: any, index: number) => {
                return (
                  <div
                    className="w-full md:w-[48%] lg:w-[31%] xl:w-[22%] mb-3 md:mb-0"
                    key={index}
                  >
                    <Finish />
                    <div className="my-5"></div>
                    <Expire />
                  </div>
                );
              })}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default MyProject;
