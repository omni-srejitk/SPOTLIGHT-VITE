import React from "react";
import { useNavigate } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
const Home = () => {
  let navigate = useNavigate();
  useBeforeunload(() => alert("removed"));

  return (
    <div className="box-border flex h-[100vh] items-center justify-center bg-white">
      {setTimeout(() => {
        {
          navigate(encodeURI("/Beyondarie"));
        }
      }, 1000)}
      <button>
        <img src="/Main screen svg.svg" alt="/Main screen svg.svg" />
      </button>
    </div>
  );
};
export default Home;
