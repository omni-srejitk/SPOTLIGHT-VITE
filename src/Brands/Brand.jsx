import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MainButton } from "../components/MainButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carousal } from "../components/Carousal";
import { NewModalLocationDeny } from "../components/NewModalLocationDeny";
import { distanceContext } from "../App";
import "./brands.css";

const Brand = () => {
  const brand = useParams();
  const details = useContext(distanceContext);
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;
  useEffect(() => {
    axios.get(`${brandDetailURL}`).then((resp) => {
      details.setStoreDetails({
        ...details.storeDetails,
        information: resp.data,
      });
    });
  }, []);
  const [locDeny, setLocDeny] = useState(false);

  return (
    <div className="bg-[#000000] ">
      <div>
        {Object.keys(details.storeDetails.information).length !== 0 ? (
          <>
            {locDeny ? (
              <NewModalLocationDeny />
            ) : (
              <>
                <Header />
                <MainButton setLocDeny={setLocDeny} />
                <Carousal />
                <Footer />
              </>
            )}
          </>
        ) : (
          <div className="welcome">
            <span id="splash-overlay" className="splash"></span>
            <div
              className="flex h-24 w-24 items-center justify-center rounded-[3rem] bg-black p-2"
              id="welcome"
            >
              <div className=" h-12 w-12">
                <img
                  className=" h-full w-full"
                  src="/spotlight white.svg"
                  alt="/"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Brand;
