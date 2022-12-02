// import React from 'react'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { styled, Button } from "@mui/material";
import * as geolib from "geolib";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";

export const MainButton = ({ data }) => {
  const brand = useParams();
  console.log("data", data);

  const navigate = useNavigate();
  const [Location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported or denied",
      });
    }
  }, [Location]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSuccess = (Location) => {
    // if we get geolocation in navigator
    setLocation({
      loaded: true,
      coordinates: {
        lat: Location.coords.latitude,
        lng: Location.coords.longitude,
      },
    });

    //initializing store distance in a empty list
    const storeDistance = [];
    if (data && data.stores) {
      // for all the stores present in json
      for (let i = 0; i < data.stores.length; i++) {
        const element = data.stores[i];

        //calculating distance of stores from your location
        const locationDistance = geolib.getPreciseDistance(
          {
            latitude: Location.coords.latitude,
            longitude: Location.coords.longitude,
          },
          {
            latitude: element.lat,
            longitude: element.long,
          }
        );

        //updating all the store distance in the list and converting it in km
        storeDistance.push(Math.round(locationDistance / 1000));
      }
    }
    // redirecting to Stores page if nearest store is 50km from user location
    if (Math.min(...storeDistance) <= 50) {
      navigate("Stores");
    } else {
      navigate("Store_Not_Found");
    }
  };
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
    console.log(error);
    //if user denies permission to access their location redirect to Location denied page
    navigate("Location_denied");
  };

  const ShowLocationPopUp = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return (
    <div className="bg-[#613DE5] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem]">
      <img
        src="/images/Left Dots.png"
        className="absolute left-[2%] top-[2%] h-[93%]"
      />
      <img
        src="/images/Right Dots.png"
        className="absolute right-[2%] top-[2%] h-[93%]"
      />
      <img
        src="/images/star.png"
        className="absolute left-[-4%] top-[-3%] w-[17%]"
      />
      <img
        src="/images/2 stars.png"
        className="absolute right-[15%] top-[2%] w-[13%]"
      />

      <div className="w-[25%] h-[18%] bg-white p-[3.5%] rounded-[50%] border-[1px] border-black left-[30%] top-[10.5%] absolute sm:w-[22%]">
        <img
          className=" w-[100%] h-[100%]"
          src="/images/new Logo.png"
          alt="/"
        />
      </div>

      <div className="w-[25%] h-[18%] bg-white p-[3%] rounded-[50%] border-[1px] border-black z-10 absolute left-[49%] top-[10.5%] sm:w-[22%]">
        <img className=" w-[100%] h-[100%] " src={data.brandLogo} alt="/" />
      </div>

      <p className="text-[1.2rem] text-center absolute top-[36%] left-[30%] sm:left-[35%]">
        <span className="font-bold">{brand.brandName} </span> is now
      </p>
      <p className="text-center text-[1.2rem] absolute top-[43%] left-[32%] sm:left-[37%]">
        on <span className=" font-bold">Spotlight</span>
      </p>

      <hr className=" rounded border-t-4 border-[white] absolute top-[51%] left-[25%] bg-gray-200 dark:bg-white" />
      <p className=" relative top-[54%] w-[80%] m-auto text-center">
        Visit the nearest store
      </p>
      <p className="w-[80%] m-auto text-center relative top-[54%]">
        for exclusive deals
      </p>
      {/* <p className="w-[50%] m-auto relative top-[58%] left-[25%] sm:left-[35%]">
        Visit the nearest store left-[25%] sm:left-[50%]
      </p> */}
      {/* <p className="w-[50%] m-auto absolute top-[63%] left-[28%]">
        for exclusive deals
      </p> */}

      <button
        className="bg-[]  text-black px-4 py-4 block w-[65%] m-auto rounded-lg text-center absolute top-[78%] left-[17.5%] "
        onClick={ShowLocationPopUp}
        id="button"
      >
        Take me there
        <ArrowForwardIcon fontSize="small" />
        {/* <ButtonAnimationComponent /> */}
      </button>
    </div>
  );
};
