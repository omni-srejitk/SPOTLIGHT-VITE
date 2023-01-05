import React from "react";
import { motion } from "framer-motion";

export const Card = ({ children }) => {
  return (
    <motion.div className="relative h-full min-w-[80%] cursor-pointer overflow-hidden rounded-xl border-2 border-white bg-yellow-200 scrollbar-none ">
      <div className="absolute top-0 right-0 z-0 w-auto  select-none">
        <img src="/images/Union.svg" />
      </div>
      {children}
      <div className="absolute bottom-0 z-0 w-40 select-none">
        <img src="/images/yellow bar.svg" />
      </div>
    </motion.div>
  );
};
