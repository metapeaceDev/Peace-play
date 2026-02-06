"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Category = () => {
  const router = useRouter();
  return (
    <div
      className="w-full border rounded-[16px] p-4 shadow-md bg-white my-1 cursor-pointer"
      onClick={() => router.push("project/projectDetail")}
    >
      <Image
        src="/assets/9.png"
        width={263}
        height={148}
        alt=""
        className="mb-[20px] w-full"
      />
      <div>
        <div className="flex items-center"></div>
        <h1 className="text-[#061118] text-[20px] pt-1">หนังผจญภัย</h1>
      </div>
      <a href="">
        <div className="flex gap-4 items-center">
          <h3 className="text-[#282828] text-[16px] pt-1">100 ผลลัพท์</h3>
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.589844 11.5275L5.16984 6.9375L0.589844 2.3475L1.99984 0.9375L7.99984 6.9375L1.99984 12.9375L0.589844 11.5275Z"
              fill="#2F5D86"
            />
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Category;
