import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiContext } from "../config/RouterConfig";
import { useNavigate } from "react-router-dom";
import * as geolib from "geolib";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { Modal } from "./Modal";

export const MainButton = ({ data, locDeny, setLocDeny }) => {
  const brand = useParams();

  const apiValue = useContext(apiContext); //values by context
  console.log("apiValue", apiValue);

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
    console.log("entered in success");
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

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
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
        <div className="w-[100px] h-[100px] bg-white flex justify-center items-center  rounded-[50px] border-[1px] border-black z-10 absolute left-[49%] top-[10%] sm:w-[22%]">
          <div className=" w-[64px] h-[64px] rounded-[32px]">
            <img className=" w-[100%] h-[100%]" src={data.brandLogo} alt="/" />
          </div>
        </div>
        {(user) => {
          console.log("user", user);
          return <p>{user}</p>;
        }}

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
          className=" relative text-black block w-[80%] m-auto rounded-lg text-center mt-12 font-semibold text-[1.2rem]"
          onClick={() => {
            // ShowLocationPopUp();
            setIsOpen(true);
            console.log("button clicked");
          }}
          id="button"
        >
          <div className="absolute top-[35%] z-[50] left-[15%] lg:top-[40%] lg:left-[25%]">
            Find a store near me
            <img src="/Find a store near me.svg" className="inline ml-2" />
          </div>
          <ButtonAnimationComponent />
        </button>
        <button
          onClick={() => {
            console.log("set to false");
            setIsOpen(false);
            setLocDeny(true);
          }}
        >
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <img
              src="/newLoc.svg"
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
                // ShowLocationPopUp();
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
                console.log("set to false inside ");
                setIsOpen(false);
              }}
            >
              Grant Permission
            </button>
          </Modal>
        </button>
      </div>
    </div>
  );
};
