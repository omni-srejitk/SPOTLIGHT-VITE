import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/material";

const Footer = () => {
  return (
    //rendering footer component
    <div className="bg-[black]">
      <footer>
        <hr className="w=[100%]" />
        <div className="flex flex-row justify-center items-center mb-0 my-3">
          <div className="m-2 my-0 w-[15%] h-[10%] bg-white p-[2%] rounded-[50%] border-[1px] border-black">
            <img
              className=" w-[100%] h-[100%]"
              src="/images/new Logo.png"
              alt="/"
            />
          </div>
          <p className="w-[75%] text-center text-[0.75rem]">
            Spotlight is The Coolest Retail Shelf that brings premium online
            brands near you!
          </p>
        </div>
        <div className="w-[40%] text-center m-auto my-2">
          <a href="https://www.instagram.com/omniflo.in/" className="m-2">
            <InstagramIcon />
          </a>
          <a href="https://twitter.com/Omniflo_in">
            <TwitterIcon />
          </a>
        </div>
        <p className="w-[50%] text-center m-auto mt-0">&copy; 2022 Spotlight</p>
      </footer>
    </div>
  );
};

export default Footer;
