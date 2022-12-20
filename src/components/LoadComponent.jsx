import React, { useEffect } from "react";
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
  return (
    <div className=" h-[100vh]">
      <div className="h-[60vh] pt-24" id="container"></div>
      <p className="mx-auto mt-4 w-full text-center text-[1.5rem] sm:left-[20rem]">
        Searching store near you...
      </p>
    </div>
  );
};
