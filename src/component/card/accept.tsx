import React from "react";
import Image from "next/image";

function Accept() {
  return (
    <>
      <div>
        <Image
          src="/assets/Questionair.png"
          width={130}
          height={125}
          alt=""
          className="mb-[10px] w-full rounded-lg"
        />
      </div>
    </>
  );
}

export default Accept;
