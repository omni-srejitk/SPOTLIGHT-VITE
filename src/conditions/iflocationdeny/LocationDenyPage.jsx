import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import NewLocationDenyCard from "../../components/NewLocationDenyCard";
import ManualLocation from "../../components/ManualLocation";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousal } from "../../components/Carousal";
import { LoadComponent } from "../../components/LoadComponent";
import { NewModalLocationDeny } from "../../components/NewModalLocationDeny";

const LocationDenyPage = (props) => {
  const brand = useParams();
  const [newLocation, setnewLocation] = useState("");

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

  const getPlace = (place) => {
    console.log("place received in Deny Page is : ", place);
    setnewLocation(place);
    console.log("entered getplace for sign");
  };

  return (
    <div className="bg-black">
      {/* {!newLocation ? (
        props.data?.brandLogo ? (
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
      )} */}
      <NewModalLocationDeny />
    </div>
  );
};

export default LocationDenyPage;
