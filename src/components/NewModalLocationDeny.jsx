import React from "react";

export const NewModalLocationDeny = () => {
  // Todo => change some % to utility classes
  return (
    <div className="m-0 h-screen p-6">
      <div className="relative m-0 mx-auto rounded-3xl border-[1px] border-white bg-black p-2">
        <img src="/map image.svg" className="mx-auto block w-24 pt-12" />
        <img src="/earth frame.svg" className="h-[70vh] lg:mt-20" />
        <p className="absolute top-56 left-10 w-4/5 text-center text-[2rem]">
          Well that&#39;s one way to go about it!
        </p>
        <p className="absolute top-80 left-[15%] w-[70%] text-center text-[1.25rem] text-[white]">
          Unfotunately, we can&#39;t show stores near you if you deny location
          permission.
        </p>
        <p className="absolute bottom-[14.5%] left-[15%] w-[70%] text-center text-[0.9rem] text-[#ADADAD]">
          Everyone deserves a second chance.
        </p>
        <p className="absolute bottom-[5%] left-[15%] w-[70%] text-center text-[0.9rem] text-[#ADADAD]">
          <a href="" className="pr-2 underline">
            This is how
          </a>
          you can enable location permission again to find stores nearest you
        </p>
      </div>
    </div>
  );
};
