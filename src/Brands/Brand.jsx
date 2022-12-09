import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MainButton } from "../components/MainButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carousal } from "../components/Carousal";
import { LoadComponent } from "../components/LoadComponent";
import { NewModalLocationDeny } from "../components/NewModalLocationDeny";
import { newContext } from "../App";

const Brand = () => {
  const brand = useParams();
  const newValue = useContext(newContext);
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;
  useEffect(() => {
    axios.get(`${brandDetailURL}`).then((resp) => {
      newValue?.setInfo(resp.data);
    });
  }, []);
  const [locDeny, setLocDeny] = useState(false);

  return (
    <div className="bg-[#000000] ">
      <div>
        {Object.keys(newValue.info).length !== 0 ? (
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
          <LoadComponent />
        )}
      </div>
    </div>
  );
};
export default Brand;
