import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="relative h-full min-w-[80%] ">
      <div className="absolute top-0 right-0 z-0 w-auto">
        <img src="/images/Union.svg" />
      </div>
      {children}
      <div className="z-3 absolute bottom-0 w-40">
        <img src="/images/yellow bar.svg" />
      </div>
    </div>
  );
};
