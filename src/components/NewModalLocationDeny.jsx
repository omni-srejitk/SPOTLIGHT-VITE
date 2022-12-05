import React from "react";

export const NewModalLocationDeny = () => {
  return (
    <div className="m-0 p-6 ">
      <div className="m-0 p-2 mx-auto bg-black border-[1px] border-white relative rounded-3xl">
        <img src="/map image.svg" className="pt-[15%] block w-[30%] mx-auto" />
        <img src="/earth frame.svg" className="h-[70vh] lg:mt-20" />
        <p className="absolute top-[30%] left-[10%] text-[2rem] text-center w-[80%]">
          Well that's one way to go about it!
        </p>
        <p className="text-[white] absolute top-[45%] left-[15%] text-center text-[1.25rem] w-[70%]">
          Unfotunately, we can't show stores near you if you deny location
          permission.
        </p>
        <p className="text-[#ADADAD] absolute bottom-[14.5%] left-[15%] text-center text-[0.9rem] w-[70%]">
          Everyone deserves a second chance.
        </p>
        <p className="text-[#ADADAD] absolute bottom-[5%] left-[15%] text-center text-[0.9rem] w-[70%]">
          <a href="" className="underline pr-2">
            This is how
          </a>
          you can enable location permission again to find stores nearest you
        </p>
      </div>
    </div>
  );
};
