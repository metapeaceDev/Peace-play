"use client";
import React, { useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="p-4 container mx-auto">
        <h1 className="text-[#282828] text-[18px] md:text-[25px]">
          โปรไฟล์ของฉัน
        </h1>

        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center py-4">
            <Avatar src="#" className="w-20 h-20 text-large" />
          </div>

          <a href="/myProject/profile/editProfile">
            <div className="flex flex-wrap gap-4 items-center">
              <Button color="primary" variant="bordered">
                <p>แก้ไขโปรไฟล์</p>
              </Button>
            </div>
          </a>

          {/* <Button onClick={() => setIsOpen(!isOpen)}>Open Modal</Button> */}
        </div>

        <div className="bg-[#FFFFFF] p-4 w-full border-[#000000]] border-y-2 border-dashed">
          <p className="text-[#282828] text-[12px] md:text-[20px] mb-3">
            นายธีรภัทร ฤทธิเดช
          </p>
          <p className="text-[#A6A6A6] text-[10px] md:text-[16px] mb-3">
            @teerapat001
          </p>
          <p className="text-[#2F5D86] text-[10px] md:text-[16px] mb-3">
            ID : TN00025
          </p>

          <div className="block md:flex-col ">
            <div className="flex justify-between w-[250px] md:w-[400px]">
              <div className="flex justify-start items-baseline gap-4">
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 3.33594L6.26 6.8426C6.47911 6.98879 6.7366 7.0668 7 7.0668C7.2634 7.0668 7.52089 6.98879 7.74 6.8426L13 3.33594M2.33333 10.6693H11.6667C12.0203 10.6693 12.3594 10.5288 12.6095 10.2787C12.8595 10.0287 13 9.68956 13 9.33594V2.66927C13 2.31565 12.8595 1.97651 12.6095 1.72646C12.3594 1.47641 12.0203 1.33594 11.6667 1.33594H2.33333C1.97971 1.33594 1.64057 1.47641 1.39052 1.72646C1.14048 1.97651 1 2.31565 1 2.66927V9.33594C1 9.68956 1.14048 10.0287 1.39052 10.2787C1.64057 10.5288 1.97971 10.6693 2.33333 10.6693Z"
                    stroke="#3F3F46"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <p className="text-[#282828] text-[10px] md:text-[16px]">
                  teerapat@larngeartech.com
                </p>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.89052 1.39052C1.64048 1.64057 1.5 1.97971 1.5 2.33333V3C1.5 8.52267 5.97733 13 11.5 13H12.1667C12.5203 13 12.8594 12.8595 13.1095 12.6095C13.3595 12.3594 13.5 12.0203 13.5 11.6667V9.48067C13.5 9.34069 13.456 9.20425 13.3742 9.0907C13.2923 8.97714 13.1768 8.89223 13.044 8.848L10.0487 7.84933C9.89644 7.79873 9.73107 7.80472 9.5829 7.86619C9.43473 7.92766 9.3137 8.0405 9.242 8.184L8.48867 9.68867C6.85631 8.95112 5.54888 7.64369 4.81133 6.01133L6.316 5.258C6.4595 5.1863 6.57234 5.06527 6.63381 4.9171C6.69528 4.76893 6.70127 4.60356 6.65067 4.45133L5.652 1.456C5.6078 1.3233 5.52299 1.20787 5.40957 1.12603C5.29615 1.0442 5.15986 1.00011 5.02 1H2.83333C2.47971 1 2.14057 1.14048 1.89052 1.39052Z"
                    stroke="#3F3F46"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <p className="text-[#282828] text-[10px] md:text-[16px]">
                  090732057
                </p>
              </div>
            </div>

            <div className="flex justify-start items-baseline gap-4 mb-3">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7L2.33333 5.66667M2.33333 5.66667L7 1L11.6667 5.66667M2.33333 5.66667V12.3333C2.33333 12.5101 2.40357 12.6797 2.5286 12.8047C2.65362 12.9298 2.82319 13 3 13H5M11.6667 5.66667L13 7M11.6667 5.66667V12.3333C11.6667 12.5101 11.5964 12.6797 11.4714 12.8047C11.3464 12.9298 11.1768 13 11 13H9M5 13C5.17681 13 5.34638 12.9298 5.4714 12.8047C5.59643 12.6797 5.66667 12.5101 5.66667 12.3333V9.66667C5.66667 9.48986 5.7369 9.32029 5.86193 9.19526C5.98695 9.07024 6.15652 9 6.33333 9H7.66667C7.84348 9 8.01305 9.07024 8.13807 9.19526C8.2631 9.32029 8.33333 9.48986 8.33333 9.66667V12.3333C8.33333 12.5101 8.40357 12.6797 8.5286 12.8047C8.65362 12.9298 8.82319 13 9 13M5 13H9"
                  stroke="#3F3F46"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-[#282828] text-[10px] md:text-[16px]">
                93/3 หมู่2 ต.หนองจ๊อม อ.สันทราย จ.เชียงใหม่ 50210
              </p>
            </div>

            <div className="flex justify-start items-baseline gap-4 mb-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2012_79744)">
                  <path
                    d="M13.5773 11.358C13.1303 10.9107 12.608 10.5456 12.0344 10.2794C12.8433 9.62408 13.3594 8.62408 13.3594 7.50265C13.3594 5.52408 11.7094 3.90087 9.73085 3.93122C7.78263 3.96158 6.21299 5.54908 6.21299 7.50265C6.21299 8.62408 6.73085 9.62408 7.53799 10.2794C6.96425 10.5454 6.44196 10.9105 5.99513 11.358C5.02013 12.3348 4.46656 13.6241 4.43085 14.9991C4.43037 15.0181 4.43371 15.0371 4.44068 15.0548C4.44765 15.0726 4.45809 15.0888 4.47141 15.1024C4.48472 15.1161 4.50063 15.1269 4.5182 15.1343C4.53577 15.1417 4.55464 15.1455 4.57371 15.1455H5.57371C5.65049 15.1455 5.71478 15.0848 5.71656 15.008C5.75049 13.9723 6.17013 13.0027 6.90763 12.2669C7.28503 11.8875 7.73392 11.5868 8.22833 11.382C8.72275 11.1773 9.25286 11.0726 9.78799 11.0741C10.8755 11.0741 11.8987 11.4973 12.6683 12.2669C13.4041 13.0027 13.8237 13.9723 13.8594 15.008C13.8612 15.0848 13.9255 15.1455 14.0023 15.1455H15.0023C15.0213 15.1455 15.0402 15.1417 15.0578 15.1343C15.0754 15.1269 15.0913 15.1161 15.1046 15.1024C15.1179 15.0888 15.1283 15.0726 15.1353 15.0548C15.1423 15.0371 15.1456 15.0181 15.1451 14.9991C15.1094 13.6241 14.5558 12.3348 13.5773 11.358ZM9.78799 9.78837C9.17728 9.78837 8.60228 9.55087 8.17192 9.11872C7.95594 8.90445 7.78534 8.64887 7.67029 8.36722C7.55524 8.08558 7.4981 7.78365 7.50228 7.47944C7.50763 6.89372 7.74156 6.32765 8.15049 5.90801C8.57906 5.46872 9.15228 5.22408 9.76478 5.21694C10.3701 5.21158 10.9576 5.44729 11.3898 5.87051C11.8326 6.30444 12.0755 6.8848 12.0755 7.50265C12.0755 8.11337 11.838 8.68658 11.4058 9.11872C11.1938 9.33175 10.9417 9.50062 10.664 9.61557C10.3863 9.73051 10.0885 9.78924 9.78799 9.78837ZM5.31478 7.97408C5.29871 7.81872 5.28978 7.66158 5.28978 7.50265C5.28978 7.21872 5.31656 6.94194 5.36656 6.6723C5.37906 6.60801 5.34513 6.54194 5.28621 6.51515C5.04335 6.40622 4.82013 6.25622 4.62728 6.06694C4.40003 5.84659 4.2212 5.5813 4.10221 5.28798C3.98323 4.99466 3.92669 4.67976 3.93621 4.36337C3.95228 3.79015 4.18263 3.24551 4.58442 2.83479C5.02549 2.38301 5.61835 2.13658 6.24871 2.14372C6.81835 2.14908 7.36835 2.36872 7.78442 2.75801C7.92549 2.89015 8.04692 3.03658 8.14871 3.19372C8.18442 3.24908 8.25406 3.27229 8.31478 3.25087C8.62906 3.14194 8.96121 3.06515 9.30228 3.02944C9.40228 3.01872 9.45942 2.91158 9.41478 2.82229C8.83442 1.67408 7.64871 0.881223 6.27728 0.859794C4.29692 0.829437 2.64692 2.45265 2.64692 4.42944C2.64692 5.55087 3.16299 6.55087 3.97192 7.20622C3.40406 7.46872 2.88085 7.83122 2.42728 8.28479C1.44871 9.26158 0.895134 10.5509 0.85942 11.9277C0.858943 11.9467 0.862286 11.9657 0.869251 11.9834C0.876217 12.0012 0.886664 12.0173 0.899978 12.031C0.913291 12.0446 0.929201 12.0555 0.94677 12.0629C0.964339 12.0703 0.983212 12.0741 1.00228 12.0741H2.00406C2.08085 12.0741 2.14513 12.0134 2.14692 11.9366C2.18085 10.9009 2.60049 9.93122 3.33799 9.19551C3.86299 8.67051 4.50585 8.30622 5.20763 8.12944C5.27728 8.11158 5.32371 8.04551 5.31478 7.97408Z"
                    fill="#E8BA2D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2012_79744">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <p className="text-[#282828] text-[10px] md:text-[16px]">ชาย</p>
            </div>

            <div className="">
              <div className="flex items-center gap-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <p className="text-[#151511] text-[10px] md:text-[16px]">
                    ท่านยอมรับข่าวสารทางอีเมลจากระบบ
                  </p>
                </label>
              </div>
            </div>
          </div>

          <Modal
            isOpen={isOpen}
            // onOpenChange={onOpen}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            placement="center"
            scrollBehavior="outside"
            className=" bg-slate-600"
          >
            <ModalContent>
              {(onClose) => (
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </ModalContent>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Profile;
