import React from "react";
const Footer = () => {
  return (
    <div className="bg-[black]">
      <footer>
        <hr />
        <div className="my-3 mx-5 mb-0 flex flex-row items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-[50%] border-2 border-[white] bg-black">
            <div>
              <img className=" h-5 w-5" src="/spotlight white.svg" alt="/" />
            </div>
          </div>
          <p className="max-w-[70%] text-center text-[0.75rem]">
            Spotlight is The Coolest Retail Shelf that brings premium online
            brands near you!
          </p>
        </div>

        <div className="m-auto my-2 mb-3 w-2/5 text-center">
          <a
            href="https://www.instagram.com/omniflo.in/"
            className="m-2 inline"
          >
            <img src="/images/insta icon.svg" className="inline" />
          </a>
          <a href="https://twitter.com/Omniflo_in" className="inline">
            <img src="/images/twitter icon.svg" className="inline" />
          </a>
        </div>
        <hr />
        <p className="m-auto mt-0 w-1/2 text-center">&copy; 2022 Spotlight</p>
      </footer>
    </div>
  );
};

export default Footer;
