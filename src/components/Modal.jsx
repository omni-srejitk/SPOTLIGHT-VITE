import React from "react";
import ReactDOM from "react-dom";
// import { Button } from '../../Buttons';

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
        {/* <Button type={'LOGO_BUTTON'} clickFunc={onClose}>
            close
          </Button> */}
        {/* <button onClick={onClose}>Close Modal</button> */}
        {children}
        {/* Hello */}
      </div>
    </div>
  );
};

// const modal_style = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%,-50%)',
//   backgroundColor: '#FFF',
//   padding: 0,
//   zIndex: 1000
// }
// const OVERLAY_STYLES = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right : 0,
//   bottom: 0,
//   backgroundColor: 'rgba(0,0,0,0.7)',
//   zIndex: 999
// }
// ReactDOM.createPortal(
// ,
// document.getElementById("mortal")
