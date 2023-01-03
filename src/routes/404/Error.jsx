import React from "react";

export const Error = () => {
  return (
    <div className="bg-black p-4">
      <div className="relative m-0 mx-auto flex h-full min-h-screen w-full flex-col items-center justify-start rounded-3xl border-2  bg-black p-2">
        <img src="/Illustration.svg" className="mx-auto block w-24 pt-20" />

        <div className="flex w-full flex-col items-center justify-around gap-4 px-2">
          <p className=" w-full  text-center text-base text-red-500">
            404 Error
          </p>
          <p className=" w-full text-center text-3xl text-white">
            Page Not Found...
          </p>
          <p className=" w-full px-4 text-center text-xl text-white">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
    </div>
  );
};
