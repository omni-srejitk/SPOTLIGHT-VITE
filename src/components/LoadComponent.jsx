import React, { useState, useEffect } from "react";
import lottie from "lottie-web";
import LoadComp from "../Loading/LoadingAnimation.json";

export const LoadComponent = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: LoadComp,
    });
  }, []);
  return <div className="h-[100vh]" id="container"></div>;
};
