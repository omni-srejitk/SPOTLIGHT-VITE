import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MainButton } from "../components/MainButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carousal } from "../components/Carousal";
import { LoadComponent } from "../components/LoadComponent";
import { NewModalLocationDeny } from "../components/NewModalLocationDeny";

const Brand = (props) => {
  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;
  useEffect(() => {
    axios.get(`${brandDetailURL}`).then((resp) => {
      props?.brandName(resp?.data);
    });
  }, []);
  const [locDeny, setLocDeny] = useState(false);
  return (
    <div className="bg-[#000000] ">
      <div>
        {props?.data?.story ? (
          <>
            {locDeny ? (
              <NewModalLocationDeny />
            ) : (
              <>
                <Header />
                <MainButton
                  data={props.data}
                  locDeny={locDeny}
                  setLocDeny={setLocDeny}
                />
                <Carousal data={props?.data} />
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
