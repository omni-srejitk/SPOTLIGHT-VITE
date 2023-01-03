import React from "react";
const Footer = () => {
  return (
    <footer className="max-w-screen bottom-0 w-full bg-black">
      <div className="my-3 mx-5 mb-0 flex flex-row items-center justify-center gap-6">
        <div className="rounded-1/2 mb-4 flex h-10 w-10 items-center justify-center bg-black">
          <div>
            <img
              className=" h-5 w-5"
              src="/spotlight white.svg"
              alt="The logo of spotlight"
            />
          </div>
        </div>
        <p className="max-w-[70%] text-center text-[0.75rem] text-gray-500">
          Spotlight is The Coolest Retail Shelf that brings premium online
          brands near you!
        </p>
      </div>
      <div className="m-auto my-4 flex w-2/5 items-center justify-center gap-6 text-center">
        <a href="https://www.instagram.com/omniflo.in/" className="m-2 inline">
          <img src="/images/insta icon.svg" className="inline " />
        </a>
        <a href="https://twitter.com/Omniflo_in" className="inline ">
          <img src="/images/twitter icon.svg" className="inline " />
        </a>
      </div>
      <p className="my-4 flex w-full items-center justify-center text-center text-gray-500">
        &copy; 2022 Spotlight
      </p>
    </footer>
  );
};

export default Footer;
