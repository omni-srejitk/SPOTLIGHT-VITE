import React from "react";
import { useParams } from "react-router-dom";

export const Carousal = ({ data }) => {
  let brand = useParams();

  const Story = decodeURIComponent(data?.story);
  const modifiedStory = Story.split("!").join(".").split(".");
  const slicedArray = modifiedStory.slice(0, 2);
  modifiedStory.splice(0, 2);

  // todo => some changes,doubts here
  return (
    <div className=" no-scrollbar m-2 flex h-60 w-[93%] justify-start  gap-4 overflow-x-auto bg-[black] p-2 text-[1.05rem] text-[black]">
      <div className="relative z-10 h-full min-w-[70%] rounded-xl border-0 bg-[#FAE77D] text-center outline-none">
        <div className="absolute top-0 right-0 z-0 w-auto">
          <img src="/images/Union.svg" />
        </div>
        <div className="ml-12 mt-8 mb-4 flex h-1/4 w-4/5 flex-row items-center justify-start">
          {/* Todo: => image changes */}
          <div className="z-10 flex h-[70px] w-[70px] items-center justify-center  rounded-[35px] border-[1px] border-black bg-white ">
            <img className=" h-[40px] w-[40px] " src={data.brandLogo} alt="/" />
          </div>
          <p className="z-10 ml-3 text-[1.25rem] font-semibold text-[black]">
            {brand.brandName}
          </p>
        </div>
        <p className="">{slicedArray[0]}.</p>
        <div className="absolute bottom-0 left-0 z-0 w-[10rem]">
          <img src="/images/yellow bar.svg" />
        </div>
      </div>

      {modifiedStory.map((str) => {
        return (
          <div className=" relative h-full min-w-[70%] ">
            <div className="absolute top-0 right-0 z-0 w-auto">
              <img src="/images/Union.svg" />
            </div>
            <div className="flex h-full items-center justify-center rounded-xl border-[2px] border-[white] bg-[#FAE77D] p-2 text-center">
              <span className="relative z-[2]">{str}.</span>
            </div>
            <div className="z-3 absolute bottom-0 w-[90%]">
              <img src="/images/yellow bar.svg" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
