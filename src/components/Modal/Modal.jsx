import React from "react";
import ReactDOM from "react-dom";

export const Modal = ({ isModalOpen, onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="fixed inset-0 bg-white/30"></div>
      {isModalOpen ? (
        <div
          className=" fixed top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </div>,
    document.getElementById("portal")
  );
};
