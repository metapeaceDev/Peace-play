"use client";

import React from "react";
import Cards from "../../../../component/card/inProgress";

function Notstart() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        {[1, 2, 3].map((items: any, index: number) => {
          return (
            <div key={index}>
              <Cards />
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between">
        {[1, 2, 3].map((items: any, index: number) => {
          return (
            <div key={index}>
              <Cards />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Notstart;
