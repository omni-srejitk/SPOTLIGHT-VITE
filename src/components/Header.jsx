import React from "react";

const Header = () => {
  return (
    //rendering header component
    <div className="bg-[black] m-0 pl-0 flex flex-col justify-center items-start">
      {/* <a href="/">Spotlight</a> */}
      <p className="text-[1.5rem] p-4 pb-0 font-bold">
        Good Morning, &#128075;
      </p>
      <p className="text-[1rem] p-4 pb-0 pt-0 m-0 mb-0 font-semibold">
        We are glad to have you here
      </p>
    </div>
  );
};
export default Header;
