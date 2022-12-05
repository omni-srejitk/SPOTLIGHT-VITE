import React, { useEffect, useState } from "react";
import * as geolib from "geolib";
import axios from "axios";
const ManualLocation = ({ location, data }) => {
  let currLat;
  let currLong;
  console.log(location);

  const [brandData, setBrandData] = useState(null);

  //initializing new data as object
  var newData = {};

  //initializing findDistance function
  var findDistance = new Promise(function (resolve, reject) {
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=10ff75a41458452486c224643ce04ee3`
      )
      .then((res) => {
        const dist = { storeDistance: "" };
        if (data && data.stores) {
          console.log(
            "entered if statement, ie data and data.stores available"
          );

          //for all the stores in json of data
          for (let i = 0; i < data.stores.length; i++) {
            const element = data.stores[i];

            const locationDistance = geolib.getPreciseDistance(
              {
                latitude: currLat,
                longitude: currLong,
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

          //updating data.stores with sorted data.stores
          data.stores = byDistance;
          resolve(data);
        }
      });
  });
  findDistance.then(function (value) {
    newData = data;
    setBrandData(newData);
    console.log("2");
  });
  // function openGoogleByMethod() {
  //   window.open(
  //     `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData.stores[0].lat},${brandData.stores[0].long}`
  //   );
  // }

  const ShowLocationPopUp = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return (
    //rendering store found card component
    <div className="bg-[#8732E9] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[50vh] sm:h-[27rem]">
      <img
        src="/images/Left Dots.png"
        className="absolute left-[2%] top-[5%] w-[9.5%]"
      />
      <img
        src="/images/Right Dots.png"
        className="absolute right-[2%] top-[5%] w-[9.5%]"
      />
      <img
        src="/images/star.png"
        className="absolute left-[-4%] top-[-3%] w-[17%]"
      />
      <img
        src="/images/2 stars.png"
        className="absolute right-[20%] top-[5%] w-[13%]"
      />

      <div className="w-[20%] h-[18%] bg-white p-[3.5%] rounded-[50%] border-[1px] border-black left-[30%] top-[10.5%] absolute">
        <img
          className=" w-[100%] h-[100%]"
          src="/images/new Logo.png"
          alt="/"
        />
      </div>

      <div className="w-[20%] h-[18%] bg-white p-[3%] rounded-[50%] border-[1px] border-black z-10 absolute left-[46%] top-[10.5%]">
        <img className=" w-[100%] h-[100%] " src={data.brandLogo} alt="/" />
      </div>

      <p className="text-[1.2rem] text-center absolute top-[36%] left-[30%] sm:left-[35%]">
        <span className="font-bold">{brand.brandName} </span> is now
      </p>
      <p className="text-center text-[1.2rem] absolute top-[43%] left-[32%] sm:left-[37%]">
        on <span className=" font-bold">Spotlight</span>
      </p>

      <hr className=" rounded border-t-4 border-[white] absolute top-[51%] left-[25%] bg-gray-200 dark:bg-white" />
      <p className="w-[50%] m-auto absolute top-[58%] left-[25%]">
        Visit the nearest store{" "}
      </p>
      <p className="w-[50%] m-auto absolute top-[63%] left-[28%]">
        for exclusive deals{" "}
      </p>

      <button
        className="bg-[#FCD439] text-black px-4 py-4 block w-[65%] m-auto rounded-lg text-center absolute top-[78%] left-[17.5%] "
        onClick={ShowLocationPopUp}
      >
        Find a store near me <ArrowForwardIcon fontSize="small" />{" "}
      </button>
    </div>
  );
};
export default ManualLocation;
