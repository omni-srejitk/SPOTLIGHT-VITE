import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    //rendering footer component
    <div className="bg-[black]">
      <footer>
        <hr className="w=[100%]" />
        <div className="flex flex-row justify-center items-center mb-0 my-3 mx-5">
          <div className="bg-black w-[40px] h-[40px] flex justify-center items-center rounded-[50%] border-2 border-[white]">
            <img
              className=" w-[20px] h-[20px]"
              src="/spotlight white.svg"
              alt="/"
            />
          </div>
          <p className="max-w-[70%] text-center text-[0.75rem]">
            Spotlight is The Coolest Retail Shelf that brings premium online
            brands near you!
          </p>
        </div>

        <div className="w-[40%] text-center m-auto my-2 mb-3">
          <a href="https://www.instagram.com/omniflo.in/" className="m-2">
            <InstagramIcon />
          </a>
          <a href="https://twitter.com/Omniflo_in">
            <TwitterIcon />
          </a>
        </div>
        <hr />
        <p className="w-[50%] text-center m-auto mt-0">&copy; 2022 Spotlight</p>
      </footer>
    </div>
  );
};

export default Footer;
