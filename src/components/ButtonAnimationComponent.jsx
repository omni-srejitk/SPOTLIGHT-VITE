import React, { useEffect } from "react";
import lottie from "lottie-web";
import ButtonAnimate from "../Loading/ButtonAnimation.json";

export const ButtonAnimationComponent = ({ children }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("button"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: ButtonAnimate,
    });
  }, []);

  return (
    <div className="relative mx-auto mt-10 flex w-72 flex-col">
      <div className="w-full" id="button">
        <p className="absolute top-0 left-0 right-0 bottom-0 z-10 m-auto h-8  text-center text-[1.2rem] font-semibold text-black">
          {children}
        </p>
      </div>
    </div>
  );
};
