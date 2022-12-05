//importing dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as geolib from "geolib";
//importing components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";
import { LoadComponent } from "../../../components/LoadComponent";

const BrandStores = (props) => {
  // const [loading, setLoading] = useState(false);

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
        console.log("props is : " + props);
      });

    // showing loader component for 5 secs
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log("props.data", props.data);

  return (
    <div>
      <Header />
      <NewStoreFoundCard data={props.data} />
      <Carousal data={props.data} />
      <Footer />
    </div>
  );
};

export default BrandStores;
