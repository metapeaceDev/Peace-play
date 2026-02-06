"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { text } from "stream/consumers";

function Content() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="container mx-auto">
      <Accordion variant="splitted" className="text-start">
        <AccordionItem
          key="1"
          aria-label="ส่วนที่ 1 - เรื่องราวของเจิดกับเซียง"
          title={
            <div className="w-auto h-[30px] bg-[#FFFFFF] text-[#061118] flex justify-between items-center pl-2 pr-2 rounded-md">
              <div>
                <p>สัปเหร่อ</p>
              </div>

              <div className="flex justify-end items-center gap-2 pl-2 pr-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.06 13.79C15.91 13.94 15.72 14.01 15.53 14.01C15.34 14.01 15.15 13.94 15 13.79L12 10.79L9 13.79C8.71 14.08 8.23 14.08 7.94 13.79C7.65 13.5 7.65 13.02 7.94 12.73L11.47 9.2C11.76 8.91 12.24 8.91 12.53 9.2L16.06 12.73C16.35 13.03 16.35 13.5 16.06 13.79Z"
                    fill="#2F5D86"
                  />
                </svg>
              </div>
            </div>
          }
          className="p-3 mb-4 shadow bg-[#FFFFFF] text-[#393939]"
        >
          {[1, 2, 3].map((item: any, index: number) => (
            <>
              <div
                key={index}
                className="border rounded-lg mb-2 p-3 bg-[#FFFFFF] text-[#393939] "
              >
                <a href="/project/projectDetail/contents/video">
                  <div className="flex justify-between">
                    <div className="flex justify-normal gap-2">
                      <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="26.67"
                          height="26.67"
                          rx="13.335"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.3328 20.5328C15.2424 20.5328 17.0737 19.7742 18.424 18.424C19.7742 17.0737 20.5328 15.2424 20.5328 13.3328C20.5328 11.4233 19.7742 9.59191 18.424 8.24164C17.0737 6.89138 15.2424 6.13281 13.3328 6.13281C11.4233 6.13281 9.59191 6.89138 8.24164 8.24164C6.89138 9.59191 6.13281 11.4233 6.13281 13.3328C6.13281 15.2424 6.89138 17.0737 8.24164 18.424C9.59191 19.7742 11.4233 20.5328 13.3328 20.5328ZM12.9323 10.784C12.7968 10.6936 12.6392 10.6416 12.4765 10.6337C12.3137 10.6258 12.1519 10.6623 12.0082 10.7391C11.8646 10.816 11.7445 10.9304 11.6607 11.0702C11.577 11.21 11.5328 11.3699 11.5328 11.5328V15.1328C11.5328 15.2958 11.577 15.4556 11.6607 15.5954C11.7445 15.7352 11.8646 15.8496 12.0082 15.9265C12.1519 16.0034 12.3137 16.0398 12.4765 16.0319C12.6392 16.024 12.7968 15.972 12.9323 15.8816L15.6323 14.0816C15.7556 13.9994 15.8566 13.8881 15.9265 13.7574C15.9964 13.6268 16.033 13.481 16.033 13.3328C16.033 13.1847 15.9964 13.0388 15.9265 12.9082C15.8566 12.7776 15.7556 12.6662 15.6323 12.584L12.9323 10.784Z"
                          fill="#2F5D86"
                        />
                      </svg>

                      <p>การทำงานกับโลกภายในของตนเอง</p>
                    </div>

                    <p>15:00</p>
                  </div>
                </a>
              </div>
            </>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Content;
