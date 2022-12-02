//importing dependencies
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import axios from "axios";

//importing components
import Header from "../../../components/Header";
import SpotlightXBrand from "../../../components/SpotlightXBrand";
import StoreNotFoundCard from "../../../components/StoreNotFoundCard";
import Usp from "../../../components/Usp";
import Footer from "../../../components/Footer";
import { Carousal } from "../../../components/Carousal";
import NewStoreNotFoundCard from "../../../components/NewStoreNotFoundCard";

const StoreNotFound = (props) => {
  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    //using get request to consume the data from api
    axios.get(`${brandDetailURL}`).then((resp) => {
      props.brandName(resp.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    //rendering brand stores not found page
    <div className="bg-[#000000] h-[100vh]">
      <NewStoreNotFoundCard data={props.data} />
    </div>
  );
};

export default StoreNotFound;
