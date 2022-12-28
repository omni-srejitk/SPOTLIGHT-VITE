import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { ShiningStarsAnimation } from "../ShiningStarsAnimation";

export const Banner = ({ children, color }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={"Card"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={`relative flex h-[60vh] min-h-[30rem]  w-full flex-col items-center rounded-lg p-2 pt-12 sm:h-[24rem] ${color}`}
      >
        <img
          src="/new left dots.svg"
          className="absolute left-0 top-4 h-[90%]"
        />
        <img
          src="/new right dots.svg"
          className="absolute right-0 top-4 h-[90%]"
        />
        <div className="absolute right-12 top-4 w-12">
          <ShiningStarsAnimation />
        </div>
        <div className="absolute left-[-0.6rem] top-[-0.7rem] w-[3.5rem]">
          <img className="" src="/new star.svg" />
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
