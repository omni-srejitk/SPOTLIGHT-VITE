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
    // return () => instance.destroy()
  }, []);
  return (
    <>
      <div className="button top-0 left-0 w-[100%]" id="button"></div>
      {/* <LottieView source={require('../Animations/74468-rocket.json')} autoPlay loop></LottieView> */}
    </>
  );
};
// return () => instance.destroy();
