import React from "react";

const NavBarTop = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 darks:bg-gray-800 darks:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 darks:text-gray-400 darks:hover:bg-gray-700 darks:focus:ring-gray-600"
            >
              <span className="sr-only kanit">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a className="flex">
              {/* <MetapeaceIcon /> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap darks:text-white">
                Metapeace
              </span>
            </a>
          </div>

          <div className="hidden lg:flex gap-8 items-center">
            <a
              href="/"
              className="font-extrabold text-[#B8B8B8] cursor-pointer hover:text-[#2F5D86]"
            >
              หน้าหลัก
            </a>
            <a
              href="/project"
              className="font-extrabold text-[#B8B8B8] cursor-pointer hover:text-[#2F5D86]"
            >
              โปรเจคทั้งหมด
            </a>
            <a
              href="/project"
              className="font-extrabold text-[#2F5D86] cursor-pointer hover:text-[#2F5D86]"
            >
              คลังความรู้
            </a>
            <a
              href="/myProject"
              className="font-extrabold text-[#B8B8B8] cursor-pointer hover:text-[#2F5D86]"
            >
              โปรเจคของฉัน
            </a>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarTop;
