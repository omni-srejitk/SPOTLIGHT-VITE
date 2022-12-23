import React from "react";

const Header = () => {
  var today = new Date();
  var curHr = today.getHours();
  let greet = "";

  if (curHr < 12) {
    greet = "Good Morning";
  } else if (curHr < 18) {
    greet = "Good Afternoon";
  } else {
    greet = "Good Evening";
  }
  return (
    <header className="max-w-screen absolute top-0 m-0 flex h-24 w-full flex-col items-start justify-center bg-black py-8 pl-0">
      <p className="p-4 pb-0 text-[1.5rem] font-bold text-white">
        {greet}, &#128075;
      </p>
      <p className="m-0 mb-0 p-4 pb-0 pt-0 text-[1rem] font-semibold text-white">
        We are glad to have you here
      </p>
    </header>
  );
};
export default Header;
