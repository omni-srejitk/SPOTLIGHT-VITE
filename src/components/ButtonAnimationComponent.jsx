import React, { useEffect } from "react";
import lottie from "lottie-web";
import ButtonAnimate from "../Loading/ButtonAnimation.json";

export const ButtonAnimationComponent = () => {
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
    <>
      <div className="button top-0 left-0 w-full" id="button"></div>
    </>
  );
};
