import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const SplashScreen = ({ loading = false }) => {
  return (
    <div className="min-w-screen flex h-screen flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 180, 360],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            exit={{
              scale: [1, 50, 100],
              opacity: [100, 0],
            }}
            className="flex h-24 w-24 items-center justify-center rounded-[3rem]  bg-gray-900 p-2"
          >
            <div className=" h-12 w-12">
              <img
                className=" h-full w-full"
                src="/spotlight white.svg"
                alt="/"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
