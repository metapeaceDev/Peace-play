"use client";

import NavBarTop from "../layouts/navbar";
import Aside from "../layouts/aside";
import { usePathname } from "next/navigation";

const Menu = ({ children }: any) => {
  const router = usePathname();
  const spil = router.split("/");

  return (
    <>
      <NavBarTop hasSidebar={spil[1] == "myProject"} />

      {spil[1] == "myProject" ? (
        <>
          <Aside />
          <div className="p-4 lg:ml-64">
            <div className="px-4 pb-4 mt-16">{children}</div>
          </div>
        </>
      ) : (
        <div className="">{children}</div>
      )}
    </>
  );
};

export default Menu;
