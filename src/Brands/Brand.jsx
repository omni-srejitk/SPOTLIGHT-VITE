import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "@mui/material";
import axios from "axios";
import { MainButton } from "../components/MainButton";
import { Modal } from "../components/Modal";

//importing components
import Header from "../components/Header";
import SpotlightXBrand from "../components/SpotlightXBrand";
import ButtonCard from "../components/ButtonCard";
import Usp from "../components/Usp";
import Footer from "../components/Footer";
import { Carousal } from "../components/Carousal";
import { LoadComponent } from "../components/LoadComponent";
// import { LoadComponent } from "../components/LoadComponent";

const Brand = (props) => {
  //Getting brand name from the URL and updating the API URL
  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    axios.get(`${brandDetailURL}`).then((resp) => {
      props.brandName(resp.data);
      console.log(resp.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let [isOpen, setIsOpen] = useState(true);

  return (
    //Rendering the Brand Page
    <div style={{ backgroundColor: "#000000" }}>
      <StyleDivElement>
        {props.data.brandLogo ? (
          <>
            <Header />
            <MainButton data={props.data} />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <img
                src="/images/Loc.png"
                className="w-[30%] h-[30%] my-6 block mx-auto"
              />
              <p className="text-[1.15rem] font-medium text-center m-2">
                You're just a few seconds away
              </p>
              <p className="text-[0.75rem] text-center font-normal p-2">
                We ask for location permission to locate stores near you. Click
                “Allow” once you see a popup. Grant permission
              </p>
              <button
                className="bg-[#FCD439] p-4 rounded-lg w-[60%] my-[8%] block mx-auto text-[black] font-medium text-[1.15rem]"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Grant Permission
              </button>
            </Modal>
            <Carousal data={props.data} />
            {/* <LoadComponent /> */}
            <Footer />
          </>
        ) : (
          <LoadComponent />
        )}
      </StyleDivElement>
    </div>
  );
};

const StyleDivElement = styled("div")`
  margin-top: 0;

  hr {
    width: 50%;
    height: 0px;
    margin: auto;

    background: white;
    opacity: 0.8;
    border: 1px solid white;
    margin-bottom: 20px;
    margin-top: 5px;
    text-align: center;
  }
`;

export default Brand;

// {/* <button onClick={() => setIsOpen(true)}>Open Modal</button>
// <Modal open={isOpen} onClose={() => setIsOpen(false)}>
//   Fancy Modal
// </Modal> */}
