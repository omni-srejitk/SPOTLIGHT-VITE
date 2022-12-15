import React, { useEffect } from "react";
import lottie from "lottie-web";
// import SplashColorsAnimation from "../Loading/SplashColors.json";
import SplashColorsAnimation from "../Loading/pintu 2.json";
// import SplashColorsAnimation from "../Loading/black.json";

export const SplashColors = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("splash"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: SplashColorsAnimation,
    });
  }, []);
  return <div className=" h-[100vh]" id="splash"></div>;
};
