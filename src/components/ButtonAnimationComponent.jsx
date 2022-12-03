import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
import ButtonAnimate from "../Loading/ButtonAnimation.json";

export const ButtonAnimationComponent = ({ text }) => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("button"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: ButtonAnimate,
      // animationData: require("../Loading/ButtonAnimation.json"),
    });
    // return ( => instance.destroy();
  }, []);
  return (
    <>
      <button className="button top-0 left-0" id="button">
        hvdkgcfu
      </button>
      {/* <LottieView source={require('../Animations/74468-rocket.json')} autoPlay loop></LottieView> */}
    </>
  );
};
// return () => instance.destroy();
