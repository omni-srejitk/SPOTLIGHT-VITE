import React from "react";

export const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] m-0 p-0 text-white backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="fixed top-[20%] left-1/2 z-[15] m-0 mb-auto h-fit w-[85%] -translate-x-1/2 translate-y-0 rounded-lg bg-[black] sm:w-[30%] lg:top-1/2  lg:h-[25rem] lg:-translate-y-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
// h-[50%]
