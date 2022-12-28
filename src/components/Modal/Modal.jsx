import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ isModalOpen, onClose, children, position }) => {
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <div className="fixed inset-0 bg-white/30"></div>
        {isModalOpen && (
          <motion.div
            key="Modal"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`${position}  fixed h-fit w-fit`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        )}
      </div>
    </AnimatePresence>,
    document.getElementById("portal")
  );
};
