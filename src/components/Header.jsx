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
    <div className="m-0 flex flex-col items-start justify-center bg-[black] pl-0">
      <p className="p-4 pb-0 text-[1.5rem] font-bold">{greet}, &#128075;</p>
      <p className="m-0 mb-0 p-4 pb-0 pt-0 text-[1rem] font-semibold">
        We are glad to have you here
      </p>
    </div>
  );
};
export default Header;
