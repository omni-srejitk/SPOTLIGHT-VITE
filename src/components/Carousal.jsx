import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBrandDetails } from "../services/api";
import { Card } from "./Cards/Card";

export const Carousal = () => {
  const { brand } = useParams();
  const { data } = fetchBrandDetails(brand);
  const [testimony, setTestimony] = useState(0);
  const [story, setStory] = useState(0);
  let stars = data?.rating;
  const controls = useAnimation();
  const storyControls = useAnimation();
  const LEFT_OFFSET = -260;
  const testimonyRef = useRef();
  const storyRef = useRef();

  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <span className="material-icons-round text-4xl text-yellow-500">
            star
          </span>
        ) : stars >= number ? (
          <span className="material-icons-round text-4xl text-yellow-500">
            star_half
          </span>
        ) : (
          <span className="material-icons-round text-4xl text-yellow-500">
            star_border
          </span>
        )}
      </span>
    );
  });

  useEffect(() => {
    testimonyRef.current = setInterval(() => {
      setTestimony((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 3000);

    storyRef.current = setInterval(() => {
      setStory((prev) => (prev >= 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      testimonyRef && clearTimeout(testimonyRef.current);
      storyRef && clearTimeout(storyRef.current);
    };
  }, []);

  return (
    <div className="my-4 flex h-72 w-full justify-start gap-4 overflow-x-auto bg-black  px-0 py-2 text-base text-black  scrollbar-none lg:grid lg:grid-cols-3">
      <Card>
        <div className="relative h-full rounded-lg border-2 border-yellow-500/20 text-center text-black">
          <div className="absolute bottom-0 left-0 z-0 w-40">
            <img src="/images/yellow bar.svg" />
          </div>

          <div className="mt-5 mb-2 flex h-1/4 w-full flex-row items-center justify-start px-2">
            <div className="z-10 flex h-16 w-16 items-center justify-center rounded-[2.5rem] border-[1px] border-black bg-white p-3">
              <img className=" object-contain " src={data?.logo} />
            </div>
            <p
              className="z-10 ml-3 cursor-pointer select-none text-xl font-semibold capitalize text-[black]"
              onClick={() => window.open(`${data?.url}`)}
            >
              {data?.name}
            </p>
          </div>

          <div className="z-10 flex w-full flex-col items-start justify-between">
            <motion.div
              animate={storyControls}
              onPan={(e, pointInfo) => {
                const x = pointInfo.offset.x;

                if (x < -250) {
                  storyControls.set({ x: x < LEFT_OFFSET ? x : LEFT_OFFSET });
                }
              }}
              onPanEnd={(e, pointInfo) => {
                const x = pointInfo.offset.x;

                if (x >= LEFT_OFFSET) {
                  setStory((prev) => (prev >= 1 ? 0 : prev + 1));
                } else {
                  storyControls.start({ x: 0 });
                }
              }}
              className="relative  h-32 cursor-grab select-none px-4 text-left text-black"
              title={data?.story[story]}
            >
              {data?.story[story]}
            </motion.div>
            <div className="z-10 flex justify-evenly gap-2 px-4">
              <div
                className={`h-2 w-2 rounded-full  ${
                  story === 0 ? "bg-yellow-500" : "bg-yellow-400"
                } `}
              ></div>
              <div
                className={`h-2 w-2 rounded-full  ${
                  story === 1 ? "bg-yellow-500" : "bg-yellow-400"
                } `}
              ></div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="relative z-10 h-full rounded-lg border-2 border-yellow-500/20  p-2 text-start text-yellow-400">
          <p className="relative z-10 mt-3 select-none p-4 text-xl font-semibold text-black">
            Happy customer
          </p>
          <motion.div
            animate={controls}
            onPan={(e, pointInfo) => {
              const x = pointInfo.offset.x;

              if (x < -250) {
                controls.set({ x: x < LEFT_OFFSET ? x : LEFT_OFFSET });
              }
            }}
            onPanEnd={(e, pointInfo) => {
              const x = pointInfo.offset.x;

              if (x >= LEFT_OFFSET) {
                setTestimony((prev) => (prev >= 2 ? 0 : prev + 1));
              } else {
                controls.start({ x: 0 });
              }
            }}
            className="flex w-full flex-col"
          >
            <p className="pointer-events-none relative z-10 h-32 cursor-grab select-none p-4 text-left text-black">
              {data?.testimonial[testimony]?.split("-")[0]}
            </p>
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex justify-evenly gap-2">
                <div
                  className={`h-2 w-2 rounded-full  ${
                    testimony === 0 ? "bg-yellow-500" : "bg-yellow-400"
                  } `}
                ></div>
                <div
                  className={`h-2 w-2 rounded-full  ${
                    testimony === 1 ? "bg-yellow-500" : "bg-yellow-400"
                  } `}
                ></div>
                <div
                  className={`h-2 w-2 rounded-full  ${
                    testimony === 2 ? "bg-yellow-500" : "bg-yellow-400"
                  } `}
                ></div>
              </div>

              <p className="relative z-10 px-4 text-right text-black">
                -{data?.testimonial[testimony]?.split("-")[1]}
              </p>
            </div>
          </motion.div>
        </div>
      </Card>

      <Card>
        <div className=" flex h-full flex-col items-center justify-center rounded-xl bg-yellow-200 p-2 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/40 px-4 py-0 text-7xl font-medium text-yellow-500">
            {stars}
          </div>
          <div className="mt-4 flex">{ratingStar}</div>
          <p className="relative z-10 text-gray-700">
            Based on {data?.rating_count} reviews.*
          </p>
        </div>
      </Card>
    </div>
  );
};
