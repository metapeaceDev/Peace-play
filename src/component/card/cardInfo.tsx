import React from "react";
import Image from "next/image";

function CardInfo() {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <div className="block md:flex gap-6">
        <div className="w-auto md:w-[70%] lg:w-[28%] xl:w-[20%] 2xl:w-[16%]">
          <Image
            src="/assets/Image.png"
            width={262}
            height={147}
            alt=""
            layout=""
          />
        </div>

        <div className="w-full pt-4 md:pt-0">
          <h3 className="text-[#999999] text-[12px] pb-3">27 sep 2018</h3>
          <h3 className="text-[#666666] text-[16px]">
            ชายตัดไม้คนหนึ่งเดินไปตัดไม้อยู่ริมลำธาร เขาพลัดทำขวานตกลงในแม่น้ำ
            เขาเสียใจยิ่งนัก เทพารักษ์เห็นเขาเสียใจจึง
            โผล่ขึ้นจากน้ำพร้อมขวานทอง ขวานนี้ของเจ้าใช่ไหม ชายตัดไม้ตอบ ไม่ใช่
            ไม่ใช่ขวานของข้า เทพารักษ์ดำลงไปใหม่พร้อมโผล่มากับขวานเงิน
            ขวานนี้ของเจ้าใช่ไหม
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
