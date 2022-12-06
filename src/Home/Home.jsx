import React from "react";
import { useNavigate } from "react-router-dom";
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
export default Home;
