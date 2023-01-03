import React, { useEffect } from "react";
import lottie from "lottie-web";
import ButtonAnimate from "../Loading/ButtonAnimation.json";

export const ButtonAnimationComponent = ({ children, onClick, ...props }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("button"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: ButtonAnimate,
    });

    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <button
      onClick={onClick}
      id="button"
      className="relative mx-auto mt-10 inline  w-72"
      {...props}
    >
      <div className="absolute z-20 h-full w-full">{children}</div>
    </button>
  );
};
