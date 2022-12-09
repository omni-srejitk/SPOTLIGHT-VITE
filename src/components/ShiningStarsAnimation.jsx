import React, { useEffect } from "react";
import lottie from "lottie-web";
import StarComp from "../Loading/ShiningStars.json";

export const ShiningStarsAnimation = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("my-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: StarComp,
    });
  }, []);
  return <div id="my-container"></div>;
};
