import React from "react";

export const LocationDenied = () => {
  return (
    <div className="relative m-0 mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center rounded-3xl border-2  bg-black p-2">
      <img
        src="/map image.svg"
        className="absolute top-10 mx-auto block w-24 pt-12"
      />
      <img
        src="/earth frame.svg"
        className="absolute left-0  h-full animate-pulse lg:mt-20"
      />
      <div className="flex w-full flex-col items-center justify-around gap-4 px-2">
        <p className=" w-full text-center text-3xl text-white">
          Well that&#39;s one way to go about it!
        </p>
        <p className=" w-full px-4 text-center text-xl text-white">
          Unfotunately, we can&#39;t show stores near you if you deny location
          permission.
        </p>
        <p className=" w-full  text-center text-base text-gray-300">
          Everyone deserves a second chance.
        </p>
        <p className=" w-full text-center text-base text-gray-300">
          <a
            href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid"
            className="pr-2 underline"
          >
            This is how
          </a>
          you can enable location permission again to find stores nearest you
        </p>
      </div>
    </div>
  );
};
