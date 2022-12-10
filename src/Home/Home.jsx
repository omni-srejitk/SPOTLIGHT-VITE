import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  return (
    <div className="box-border flex h-[100vh] items-center justify-center bg-white">
      <button onClick={() => navigate("/Auric")}>
        <img src="/Main screen svg.svg" alt="/Main screen svg.svg" />
      </button>
      {/* <a href={encodeURI("/Auric")}>
        <img src="/Main screen svg.svg" className="" />
      </a> */}
    </div>
  );
};
export default Home;
