import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(encodeURI(`/${pathname.slice(1)}`));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-red-500">
      <button>
        <img src="/Main screen svg.svg" alt="/Main screen svg.svg" />
      </button>
    </div>
  );
};
export default Home;
