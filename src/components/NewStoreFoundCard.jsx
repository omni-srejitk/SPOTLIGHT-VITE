import React, { useContext, useState } from "react";
import * as geolib from "geolib";
import { LoadComponent } from "./LoadComponent";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { distanceContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const NewStoreFoundCard = () => {
  let navigate = useNavigate();
  let newValue = useContext(distanceContext);
  let data = { ...newValue.storeDetails.information };
  const [brandData, setBrandData] = useState(null);
  let brand = useParams();
  let [currLat, setCurrLat] = useState(0);
  let [currLong, setCurrLong] = useState(0);

  var newData = {};

  const successCallback = (Location, resolve) => {
    // Our Location
    setCurrLat(Location.coords.latitude);
    setCurrLong(Location.coords.longitude);

    // ! Dist why?
    const dist = { storeDistance: "" };

    // ? sTORE dETAILS iNFO
    if (data && data.stores) {
      //for all the stores in json of data
      for (let i = 0; i < data.stores.length; i++) {
        const element = data.stores[i];

        //calculating distance using lat and long
        const locationDistance = geolib.getPreciseDistance(
          {
            latitude: Location.coords.latitude,
            longitude: Location.coords.longitude,
          },
          {
            latitude: element.latitude,
            longitude: element.longitude,
          }
        );
        //  ? individual Store Distance
        const distance = Math.round(locationDistance / 1000);

        dist.storeDistance = distance;

        //adding distance into data.stores Individual store
        Object.assign(element, dist);
      }
      //sorting with distance
      // Copy
      var byDistance = data.stores.slice(0);
      byDistance.sort(function (a, b) {
        return a.storeDistance - b.storeDistance;
      });

      data.stores = byDistance;
      resolve(data);
    }
  };

  //initializing findDistance function
  var findDistance = new Promise(function (resolve) {
    navigator.geolocation.getCurrentPosition(
      (Location) => successCallback(Location, resolve),
      null,
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 10000,
      }
    );
  });
  //assigning value of new data = data
  newData = data;

  //
  findDistance.then((data) => setBrandData(data));

  function openGoogleByMethod() {
    if (currLat != 0 && currLong != 0) {
      window.localStorage.removeItem("myLat");
      window.open(
        `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData.stores[0].latitude},${brandData.stores[0].longitude}`
      );
    }
  }
  if (Object.keys(data).length === 0) {
    setTimeout(() => {
      navigate(`/${brand.brandName}`);
    }, 3000);
  }
  // Todo: height-93%?
  return (
    //rendering store found card component min-h-[30rem]
    <div className="bg-black">
      {brandData?.stores[0].storeDistance ? (
        <div className="relative z-[50] m-2 mx-5 h-[60vh] min-h-[30rem] rounded-lg bg-[#E37353] p-2 pt-12 sm:h-[24rem]">
          <img
            src="/new left dots.svg"
            className="absolute left-[2%] top-[2%] z-10 h-[93%]"
          />

          <img
            src="/new right dots.svg"
            className="absolute right-[2%] top-[2%] h-[93%]"
          />
          <img
            src="/new 2 stars.svg"
            className="absolute left-[20%] top-[5%] w-[13%]"
          />
          <img
            src="/new stores design.svg"
            className="absolute left-[0%] bottom-[0] z-0 w-[50%]"
          />
          <div className="m-auto w-24 p-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-[12rem] border-[1px] border-black bg-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-[12rem] bg-black">
                <img className=" h-8 w-8" src="/spotlight white.svg" alt="/" />
              </div>
            </div>
          </div>
          <p className="mx-auto mt-10 w-4/5 text-center text-[1.5rem] font-bold tracking-[2px] text-[#1D1D1D]">
            {brandData?.stores[0].customer_name}
          </p>
          <p className="max-w-4/5 mx-auto mt-2 text-center text-[2.5rem] font-semibold text-[#1D1D1D]">
            {brandData?.stores[0].storeDistance} km Away
          </p>
          <button
            className=" relative m-auto mt-0 block w-4/5 rounded-lg text-center text-[1.30rem] font-semibold text-black lg:top-0 lg:mt-0 lg:pt-0"
            onClick={() => {
              openGoogleByMethod();
            }}
            id="button"
          >
            <div className="absolute top-[4.75rem] left-8 z-[50] mx-auto w-4/5 lg:left-12 lg:top-[5.75rem] ">
              <span className="">Take me there</span>
              <img src="/Find a store near me.svg" className="ml-2 inline" />
            </div>
            <ButtonAnimationComponent />
          </button>
        </div>
      ) : (
        <LoadComponent />
      )}
    </div>
  );
};
export default NewStoreFoundCard;
