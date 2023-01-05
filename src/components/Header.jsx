import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const Header = () => {
  var today = new Date();
  var curHr = today.getHours();
  let greet = "";

  if (curHr < 12) {
    greet = "Good Morning";
  } else if (curHr < 18) {
    greet = "Good Afternoon";
  } else {
    greet = "Good Evening";
  }

  const hasRenderedAlready = useRef(false);
  useEffect(() => {
    hasRenderedAlready.current = true;
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={hasRenderedAlready.current ? false : { y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 1 }}
        className="max-w-screen mx-auto mb-0 flex h-24 w-full flex-col items-start justify-center bg-black py-8  lg:w-[60vw]"
      >
        <p className=" pb-0 text-[1.5rem] font-bold text-white">
          {greet} &#128075;
        </p>
        <p className="m-0 mb-0 pb-0 pt-0 text-[1rem] font-semibold text-white">
          We are glad to have you here
        </p>
      </motion.header>
    </AnimatePresence>
  );
};
export default Header;
