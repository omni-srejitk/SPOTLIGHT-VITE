import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="box-border flex h-[100vh] items-center justify-center bg-white">
      {setTimeout(() => {
        {
          {
            /* navigate(encodeURI("/Beyondarie")); */
          }
          navigate(encodeURI("/Bowl Curry"));
        }
      }, 1000)}
      <button>
        <img src="/Main screen svg.svg" alt="/Main screen svg.svg" />
      </button>
    </div>
  );
};
export default Home;
