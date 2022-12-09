import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as geolib from "geolib";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { Modal } from "./Modal";
import { newContext } from "../App";
import { ShiningStarsAnimation } from "./ShiningStarsAnimation";
import { SunAnimation } from "./SunAnimation";

export const MainButton = ({ setLocDeny }) => {
  const brand = useParams();
  const newValue = useContext(newContext);
  let data = newValue.info;
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
  }, [Location]);

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
    if (data && data?.stores) {
      console.log("entered data");
      // for all the stores present in json
      for (let i = 0; i < data?.stores?.length; i++) {
        const element = data?.stores[i];

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

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className=" relative m-4 h-[60vh] min-h-[30rem] rounded-lg bg-[#613DE5] p-2 pt-12 sm:h-[27rem]">
        <img
          src="/new left dots.svg"
          className="absolute left-0 top-4 h-[93%]"
        />
        <img
          // Todo what about 93% and negative padding?
          src="/new right dots.svg"
          className="absolute right-0 top-4 h-[93%]"
        />

        <SunAnimation />
        <div className="absolute right-12 top-4 w-[3rem]">
          <ShiningStarsAnimation />
        </div>

        <div className="mx-24 flex h-24 w-24 items-center justify-center rounded-[3rem] border-[1px] border-black bg-white sm:mx-[30%]">
          <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-black">
            <div className=" h-9 w-9">
              <img
                className=" h-full w-full"
                src="/spotlight white.svg"
                alt="/"
              />
            </div>
          </div>
        </div>

        <div className="absolute left-44 top-12 z-10 flex h-24 w-24 items-center justify-center rounded-[3rem] border-[1px] border-black bg-white sm:left-56 ">
          <div className=" h-16 w-16 rounded-[2rem]">
            <img
              className=" h-full w-full"
              src={data?.logo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "Success.svg";
              }}
            />
          </div>
        </div>

        <p className="mt-8 mb-0 text-center text-[1.45rem]">
          <span className="font-bold">{brand.brandName} </span> is now
        </p>
        <p className="mt-[-0.45rem] text-center text-[1.45rem]">
          on <span className=" font-bold">Spotlight</span>
        </p>

        <hr className=" mx-auto mt-2 w-48 rounded border-t-2 border-[white]" />

        <p className="m-auto mt-4 w-64 text-center text-[1.1rem]">
          Visit the nearest store
        </p>
        <p className="m-auto mt-[-0.2rem] w-64 text-center">
          for exclusive deals
        </p>
        <button
          onClick={() => {
            setIsOpen(true);
            console.log("button clicked");
          }}
          className="mx-auto w-full"
        >
          <ButtonAnimationComponent>
            <span>Find a store near me</span>
            <img src="/Find a store near me.svg" className="ml-2 inline" />
          </ButtonAnimationComponent>
        </button>
        <button
          onClick={() => {
            console.log("set to false");
            setIsOpen(false);
            setLocDeny(true);
          }}
        >
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <img src="/newLoc.svg" className="my-6 mx-auto block h-40 w-24" />
            <p className="m-2 text-center text-[1.15rem] font-medium">
              You&#39;re just a few seconds away
            </p>
            <p className="p-2 text-center text-[0.75rem] font-normal">
              We ask for location permission to locate stores near you. Click
              “Allow” once you see a popup. Grant permission
            </p>
            <button
              className="my-8 mx-auto block w-52 rounded-lg bg-[#FCD439] p-4 text-[1.15rem] font-medium text-[black]"
              onClick={() => {
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
