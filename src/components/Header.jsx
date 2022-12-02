import React from "react";
import { styled } from "@mui/material";

const Header = () => {
  return (
    //rendering header component
    <div className="bg-[black]">
      {/* <a href="/">Spotlight</a> */}
      <p className="text-[1.5rem] p-4 pb-2 m-0">Good Morning, </p>
      <p className="text-[1rem] p-4 pt-0 m-0">We are glad to have you here</p>
    </div>
  );
};

const StylePElement = styled("p")`
  padding: 10px 20px;
  margin-top: 0;

  line-height: 24px;
  background-color: black;
  width: auto;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
`;

export default Header;
