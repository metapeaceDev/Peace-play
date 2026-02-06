import React from "react";
import Cards from "../../../component/card/index";

function page() {
  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-[#282828] text-[25px]">รายการโปรด</h1>
      <div className=" bg-white rounded-lg ">
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
      </div>
    </div>
  );
}

export default page;
