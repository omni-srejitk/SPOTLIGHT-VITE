import React from "react";
import { useParams } from "react-router-dom";
import { fetchBrandDetails } from "../services/api";
import { Card } from "./Cards/Card";

export const Carousal = () => {
  const { brand } = useParams();
  const { data, isFetching } = fetchBrandDetails(brand);
  let stars = data?.rating?.slice(0, 3);

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

  return (
    <div className="my-4 flex h-72 w-full justify-start gap-4  overflow-x-auto bg-black px-0 py-2  text-base text-black scrollbar-none">
      <Card>
        <div className="relative h-full rounded-lg border-2 border-yellow-500/20 bg-yellow-200 p-2 text-center text-black">
          <div className="absolute bottom-0 left-0 z-0 w-40">
            <img src="/images/yellow bar.svg" />
          </div>

          <div className="ml-6 mt-5 mb-2 flex h-1/4 w-4/5 flex-row items-center justify-start">
            <div className="z-10 flex h-16 w-16 items-center justify-center rounded-[2.5rem] border-[1px] border-black bg-white p-3">
              <img className=" object-contain " src={data?.logo} />
            </div>
            <p
              className="z-10 ml-3 cursor-pointer text-xl font-semibold capitalize text-[black]"
              onClick={() => window.open(`${data?.url}`)}
            >
              {data.name}
            </p>
          </div>
          <p
            className="line-clamp-4 relative z-10 max-h-[7rem] w-full overflow-y-auto px-4 text-start text-lg leading-6"
            title={data?.story}
          >
            {data?.story}
          </p>
        </div>
      </Card>

      <Card>
        <div className="relative h-full rounded-lg border-2 border-yellow-500/20 bg-yellow-200 p-2 text-center text-yellow-400">
          <p className="relative z-10 mt-3 p-4 text-xl font-semibold text-black">
            Happy customer
          </p>
          <span className="relative z-10 text-black">{data?.testimonial}</span>
        </div>
      </Card>

      <Card>
        <div className=" flex h-full flex-col items-center justify-center rounded-xl bg-yellow-200 p-2 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/40 px-4 py-0 text-7xl font-medium text-yellow-500">
            {stars}
          </div>
          <div className="mt-4 flex">{ratingStar}</div>
          <p className="relative z-10 text-gray-700">
            {data?.rating?.slice(5, -2)}
          </p>
        </div>
      </Card>
    </div>
  );
};
