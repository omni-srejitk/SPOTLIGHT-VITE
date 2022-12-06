import React from "react";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
// import background from './src/Home/Bg_img.png'
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white box-border flex justify-center items-center h-[100vh]">
      <a href={encodeURI("/Gladful")}>
        <img src="/Main screen svg.svg" className="" />
      </a>
      {/* <button onClick={() => navigate("Gladful")}>
        <img src="/Main screen svg.svg" className="" />
      </button> */}
    </div>
  );
};
//  <div className="bg-white max-w-[100%] box-border pt-[40vh]">
//       <a href={encodeURI("/Gladful")}>
//         <img
//           src="/Main screen svg.svg"
//           className="w-[20%] mx-auto top-[50%] block"
//         />
//       </a>
//     </div>
export default Home;
