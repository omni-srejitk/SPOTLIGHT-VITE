import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.div
      key="splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen w-screen items-center justify-center bg-white"
    >
      <button>
        <img src="/Main screen svg.svg" alt="loading-animation" />
      </button>
    </motion.div>
  );
};
export default Home;
