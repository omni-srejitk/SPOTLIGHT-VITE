import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Splash.css";

export const SplashScreen = ({ loading = false }) => {
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="welcome"
        >
          <span id="splash-overlay" className="splash"></span>
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full bg-black p-2"
            id="welcome"
          >
            <div className=" h-12 w-12">
              <img
                className=" h-full w-full"
                src="/spotlight white.svg"
                alt="/"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
