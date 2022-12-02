import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SpotlightXBrand from "../../components/SpotlightXBrand";
import NewLocationDenyCard from "../../components/NewLocationDenyCard";
import ManualLocation from "../../components/ManualLocation";
import Usp from "../../components/Usp";
import Footer from "../../components/Footer";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousal } from "../../components/Carousal";
import { LoadComponent } from "../../components/LoadComponent";

const LocationDenyPage = (props) => {
  // console.log('props in location deny page is : ',props)
  const brand = useParams();
  // const [sign, setSign] = useState(false)
  const [newLocation, setnewLocation] = useState("");
  // let sign = false;

  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    axios
      .get(`${brandDetailURL}`, {
        headers: {
          "Content-Type": "text/html",
        },
      })
      .then((resp) => {
        props.brandName(resp.data);
      });
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  const getPlace = (place) => {
    console.log("place received in Deny Page is : ", place);
    // location = place; //Manual Location received
    setnewLocation(place);
    // setSign(true)
    console.log("entered getplace for sign");
  };

  return (
    //rendering location deny page
    <div className="bg-black">
      {!newLocation ? (
        props.data ? (
          <>
            <Header />
            <NewLocationDenyCard data={props.data} onSubmit={getPlace} />
            <Carousal data={props.data} />
            <Footer />
          </>
        ) : (
          <LoadComponent />
        )
      ) : (
        <ManualLocation location={newLocation} data={props.data} />
      )}
    </div>
  );
};

// const StyleDivElement = styled("div")`
//   hr {
//     width: 50%;
//     height: 0px;
//     margin: auto;
//     background: rgba(217, 217, 217, 0.6);
//     opacity: 0.2;
//     border: 1px solid #adadad;
//   }
// `;

export default LocationDenyPage;
{
  /* <ManualLocation location={newLocation} data={props.data} /> */
}
{
  /* <LocationDenyCard onSubmit={getPlace}/> */
}
{
  /* <ManualLocation /> */
}
{
  /* <NewStoreFoundCard /> */
}
{
  /* <Usp data={props.data}/> */
}
