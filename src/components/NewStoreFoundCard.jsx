import React, { useState } from "react";
import * as geolib from "geolib";
import { LoadComponent } from "./LoadComponent";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";

const NewStoreFoundCard = ({ data }) => {
  let currLat;
  let currLong;
  const [brandData, setBrandData] = useState(null);

  //initializing new data as object
  var newData = {};

  //initializing findDistance function
  var findDistance = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((Location) => {
      currLat = Location.coords.latitude;
      currLong = Location.coords.longitude;

      const dist = { storeDistance: "" };

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
              latitude: element.lat,
              longitude: element.long,
            }
          );
          const distance = Math.round(locationDistance / 1000);

          dist.storeDistance = distance;

          //adding distance into data.stores
          Object.assign(element, dist);
        }
        //sorting with distance
        var byDistance = data.stores.slice(0);
        byDistance.sort(function (a, b) {
          return a.storeDistance - b.storeDistance;
        });
        data.stores = byDistance;
        resolve(data);
      }
    });
  });
  //assigning value of new data = data
  newData = data;
  findDistance.then(function (value) {
    setBrandData(newData);
  });
  function openGoogleByMethod() {
    window.open(
      `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData.stores[0].lat},${brandData.stores[0].long}`
    );
  }
  // Todo: height-93%?
  return (
    //rendering store found card component
    <div className="bg-black">
      {brandData?.stores[0].storeDistance ? (
        <div className="relative z-[50] m-2 mx-5 h-[60vh] min-h-[30rem] rounded-lg bg-[#E37353] p-2 pt-12 sm:h-[27rem]">
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
            {brandData?.stores[0].storeName}
          </p>
          <p className="max-w-4/5 mx-auto mt-2 text-center text-[2.5rem] font-semibold text-[#1D1D1D]">
            {brandData?.stores[0].storeDistance} km Away
          </p>
          <button
            className=" relative m-auto mt-12 block w-4/5 rounded-lg text-center text-[1.2rem] font-semibold text-black"
            onClick={() => {
              openGoogleByMethod;
            }}
            id="button"
          >
            <div className="absolute top-10 left-10 z-[50] lg:left-20 lg:top-14">
              Find a store near me
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
