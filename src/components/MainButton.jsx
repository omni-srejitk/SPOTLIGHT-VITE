// import React from 'react'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { styled, Button } from "@mui/material";
import * as geolib from "geolib";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { Modal } from "./Modal";

export const MainButton = ({ data }) => {
  const brand = useParams();
  // console.log("data", data);

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

  let [isOpen, setIsOpen] = useState(true);
  let [modalcondition, setModalCondition] = useState(false);

  function showModal() {
    return (
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <img src="/newLoc.svg" className="w-[30%] h-[30%] my-6 block mx-auto" />
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
    );
  }

  return (
    <div className="bg-[#613DE5] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem]">
      <img
        src="/new left dots.svg"
        className="absolute left-[0%] top-[2%] h-[93%]"
      />
      <img
        src="/new right dots.svg"
        className="absolute right-[0%] top-[2%] h-[93%]"
      />
      <img
        src="/new star.svg"
        className="absolute left-[-4%] top-[-3%] w-[17%]"
      />
      <img
        src="/new 2 stars.svg"
        className="absolute right-[15%] top-[2%] w-[13%]"
      />

      <div className="w-[100px] h-[100px] bg-white border-[1px] border-black mx-[25%] flex justify-center items-center rounded-[50px] sm:mx-[30%]">
        <div className="bg-black w-[64px] h-[64px] flex justify-center items-center rounded-[32px]">
          <img
            className=" w-[34px] h-[34px]"
            src="/spotlight white.svg"
            alt="/"
          />
        </div>
      </div>
      {/* flex justify-center items-center */}
      <div className="w-[100px] h-[100px] bg-white flex justify-center items-center  rounded-[50px] border-[1px] border-black z-10 absolute left-[49%] top-[10%] sm:w-[22%]">
        {/* <div className=" w-[64px] h-[64px] bg-black rounded-[32px]"> */}
        <img className=" w-[64px] h-[64px] " src={data.brandLogo} alt="/" />
        {/* </div> */}
      </div>

      <p className="text-[1.45rem] text-center mt-8">
        <span className="font-bold">{brand.brandName} </span> is now
      </p>
      <p className="text-center text-[1.45rem] mt-[-0.45rem]">
        on <span className=" font-bold">Spotlight</span>
      </p>

      <hr className=" rounded border-t-2 w-[50%] mx-auto mt-2 border-[white]" />

      <p className="mt-4 w-[80%] m-auto text-center text-[1.1rem]">
        Visit the nearest store
      </p>
      <p className="w-[80%] m-auto text-center mt-[-0.2rem]">
        for exclusive deals
      </p>
      <button
        className="bg-[#FCD439] text-black px-3 py-4 block w-[65%] m-auto rounded-lg text-center mt-12 font-semibold text-[1.1rem]"
        onClick={() => {
          // showModal();
          // setModalCondition(true);
          // {
          //   modalcondition ? showModal() : ShowLocationPopUp();
          // }
          ShowLocationPopUp();
        }}
        id="button"
      >
        Find a store near me
        <img src="/Find a store near me.svg" className="inline ml-2" />
        {/* <ButtonAnimationComponent /> */}
      </button>
      {/* {modalcondition ? showModal() : ""} */}
    </div>
  );
};

// onClick={() => {
//   showModal();
//   ShowLocationPopUp
// }}
{
  /* <div className="w-[100px] h-[100px] bg-white border-[1px] border-black mx-[20%] top-[10.5%] sm:w-[22%] p-[13px] rounded-[50px]">
  onClick={ShowLocationPopUp}
        <div className="bg-black w-[74px] h-[74px] p-[10px] rounded-[37px]">
          <img
            className=" w-[54px] h-[54px]"
            src="/spotlight white.svg"
            alt="/"
          />
        </div>
      </div> */
}
{
  /* <div className="w-[100px] h-[100px] bg-white border-[1px] border-black mx-[25%] top-[10.5%] p-[18px] rounded-[50px] sm:mx-[30%]">
        <div className="bg-black w-[64px] h-[64px] p-[15px] rounded-[32px]">
          <img
            className=" w-[34px] h-[34px]"
            src="/spotlight white.svg"
            alt="/"
          />
        </div>
      </div>

      <div className="w-[100px] h-[100px] bg-white p-[18px] rounded-[50px] border-[1px] border-black z-10 absolute left-[49%] top-[10%] sm:w-[22%]">
        <img className=" w-[100%] h-[100%] " src={data.brandLogo} alt="/" />
      </div> */
}
