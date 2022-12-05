import React, { useState } from "react";
import * as geolib from "geolib";
import { LoadComponent } from "./LoadComponent";

// const NewStoreFoundCard = ({ distance, storeName, showButton }) => {
const NewStoreFoundCard = ({ data }) => {
  //N-> declaring variables to get curr lat and curr long
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

      //intializing dist as object and first input as key-value pair of storeDistance with empty string
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

          //updating in dist object
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
  // console.log("brandData", brandData);
  function openGoogleByMethod() {
    window.open(
      `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData.stores[0].lat},${brandData.stores[0].long}`
    );
  }
  return (
    //rendering store found card component
    <div className="bg-black">
      {brandData && brandData.stores ? (
        <div className="bg-[#E37353] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem] z-[50]">
          <img
            src="/new left dots.svg"
            className="absolute left-[2%] top-[2%] h-[93%] z-10"
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
            className="absolute left-[0%] bottom-[0] w-[50%] z-0"
          />

          <div className="w-[100px] p-0 m-auto">
            <div className="w-[100px] h-[100px] bg-white border-[1px] border-black flex justify-center items-center rounded-[50px]">
              <div className="bg-black w-[64px] h-[64px] flex justify-center items-center rounded-[50%]">
                <img
                  className=" w-[34px] h-[34px]"
                  src="/spotlight white.svg"
                  alt="/"
                />
              </div>
            </div>
          </div>
          <p className="mt-10 text-[#1D1D1D] text-center w-[80%] mx-auto text-[1.5rem] tracking-[2px] font-bold">
            {brandData?.stores[0].storeName}
          </p>

          <p className="mt-2 text-center text-[#1D1D1D] max-w-[80%] mx-auto text-[2.5rem] font-semibold">
            {brandData?.stores[0].storeDistance} km Away
          </p>

          {/* {showButton} */}

          <button
            className="bg-[#FCD439] text-black px-4 py-4 block w-[65%] m-auto rounded-lg text-center top-[70.5%] left-[17.5%]  absolute z-10"
            onClick={openGoogleByMethod}
          >
            Find a store near me
          </button>
        </div>
      ) : (
        <LoadComponent />
      )}
    </div>
  );
};
export default NewStoreFoundCard;
