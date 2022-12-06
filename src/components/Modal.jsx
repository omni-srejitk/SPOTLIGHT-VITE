import React from "react";

export const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] m-0 p-0 backdrop-blur-[1px] text-white"
      onClick={onClose}
    >
      <div
        className="fixed top-[20%] left-1/2 z-50 m-0 mb-auto h-[50%] w-[85%] sm:w-[30%] -translate-x-1/2 translate-y-0 rounded-lg lg:top-1/2 lg:h-[25rem]  lg:-translate-y-1/2 bg-[black]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
