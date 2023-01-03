import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { LocationDeniedInfo } from "../../components/NewModalLocationDeny";

export const LocationDenied = () => {
  return (
    <div className="mx-auto h-fit min-h-screen bg-black p-6 lg:max-w-[60vw]">
      <Header />
      <LocationDeniedInfo />
      <Footer />
    </div>
  );
};
