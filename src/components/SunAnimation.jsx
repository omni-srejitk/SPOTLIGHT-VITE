import React, { useEffect } from "react";
import lottie from "lottie-web";
import Sun from "../Loading/Sun.json";

export const SunAnimation = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("Sun"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Sun,
    });
  }, []);
  return (
    <div className="absolute top-[-2%] left-[-2%] w-16 p-0" id="Sun"></div>
  );
};
