//importing dependencies
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

//importing components
import Header from "../../../components/Header";
import SpotlightXBrand from "../../../components/SpotlightXBrand";
import StoreFoundCard from "../../../components/StoreFoundCard";
import Usp from "../../../components/Usp";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";
import { LoadComponent } from "../../../components/LoadComponent";

const BrandStores = (props) => {
  const [loading, setLoading] = useState(false);
  // console.log('props in stores is : ',props)

  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    //using get request to consume the data from api
    axios
      .get(`${brandDetailURL}`, {
        headers: {
          "Content-Type": "text/html",
        },
      })
      .then((resp) => {
        props.brandName(resp.data);
        console.log("stores data is : " + props.data);
      });

    // showing loader component for 5 secs
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    console.log("rendered useEffect");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    //rendering brand stores page
    <>
      <div className="bg-black">
        <div>
          {
            //on loading show loading screen
            loading ? (
              <LoadComponent />
            ) : (
              //after 5 secs show store not found card component
              <>
                <Header />
                <NewStoreFoundCard data={props.data} />
                <Carousal data={props.data} />
                <Footer />
              </>
            )
          }
          {/* <StoreFoundCard data={props.data}/> */}
          {/* <Usp data={props.data}/> */}
          {/* <NewStoreFoundCard data={props.data} /> */}
        </div>
      </div>
    </>
  );
};

//     "" /* .newDiv-loadContainer{
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: auto;
//   }
// `;

export default BrandStores;

// {
//   //on loading show loading screen
//   loading ? (
//     <LoadingScreen />
//   ) : (
//     //after 5 secs show store not found card component
//     <NewStoreFoundCard data={props.data} />
//   )
// }
