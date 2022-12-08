import React from "react";

export const Carousal = ({ data }) => {
  return (
    <div className=" no-scrollbar m-2 flex h-72 w-[93.5%] justify-start  gap-4 overflow-x-auto bg-[black] p-2 text-[1.05rem] text-[black]">
      <div className="relative z-10 h-full min-w-[80%] rounded-xl border-0 bg-[#FAE77D] pb-4 text-center outline-none">
        <div className="absolute top-0 right-0 z-0 w-auto">
          <img src="/images/Union.svg" />
        </div>
        <div className="absolute bottom-0 left-0 z-0 w-40">
          <img src="/images/yellow bar.svg" />
        </div>

        <div className="ml-6 mt-4 mb-2 flex h-1/4 w-4/5 flex-row items-center justify-start">
          <div className="z-10 flex h-16 w-16 items-center justify-center rounded-[2rem] border-[1px] border-black bg-white p-2">
            <img
              className=" h-full w-full "
              src={data?.logo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/Success.svg";
              }}
            />
          </div>
          <p className="z-10 ml-3 text-[1.35rem] font-semibold text-[black]">
            {data.name}
          </p>
        </div>
        <p className="relative z-10 px-4 ">{data?.story}.</p>
      </div>

      <div className=" relative h-full min-w-[80%] ">
        <div className="absolute top-0 right-0 z-0 w-auto">
          <img src="/images/Union.svg" />
        </div>

        <div className=" h-full  rounded-xl border-[2px] border-[white] bg-[#FAE77D] p-2 text-center">
          <p className="relative z-10 mt-3 p-4 text-[1.35rem] font-semibold">
            Happy customer
          </p>
          <span className="relative z-10">{data?.testimonial}</span>
        </div>
        <div className=" absolute bottom-0 w-40">
          <img src="/images/yellow bar.svg" />
        </div>
      </div>

      <div className=" relative h-full min-w-[80%] ">
        <div className="absolute top-0 right-0 z-0 w-auto">
          <img src="/images/Union.svg" />
        </div>
        <div className=" h-full rounded-xl border-[2px] border-[white] bg-[#FAE77D] p-2 text-center">
          <p className="mt-3 p-4 text-[1.35rem] font-semibold">Rating</p>
          <span className="relative z-10">{data?.rating}</span>
        </div>
        <div className="z-3 absolute bottom-0 w-40">
          <img src="/images/yellow bar.svg" />
        </div>
      </div>
    </div>
  );
};
