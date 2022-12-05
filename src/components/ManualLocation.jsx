import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NewStoreFoundCard2 from "./NewStoreFoundCard2";
import { Carousal } from "./Carousal";
import * as geolib from "geolib";
import axios from "axios";
import NewStoreNotFoundCard from "./NewStoreNotFoundCard";
import NewLocCard from "./NewLocCard";
import { LoadComponent } from "./LoadComponent";

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
        // console.log("location is : ", location);
        currLat = res.data.results[0].lat;
        currLong = res.data.results[0].lon;
        console.log("long in manual location is : ", currLong);
        // })/
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
            console.log("distance is : ", distance);

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
  });
  console.log("manualLocation data", data);
  function openGoogleByMethod() {
    window.open(
      `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData.stores[0].lat},${brandData.stores[0].long}`
    );
  }
  function showButton() {
    return (
      <button
        className="bg-[#FCD439] text-black text-[1.3rem] px-2 py-4 block w-[65%] m-auto rounded-lg text-center z-10 mt-12"
        onClick={openGoogleByMethod}
      >
        <span>Take me there </span>
        <img src="/telegram take me there.svg" className="inline pl-2" />
      </button>
    );
  }
  return (
    //rendering store found card component
    <div className="m-0 p-0">
      {brandData && brandData.stores ? (
        brandData.stores[0].storeDistance < 50 ? (
          <>
            <Header />
            <NewStoreFoundCard2
              distance={brandData.stores[0].storeDistance}
              storeName={brandData.stores[0].storeName}
              showButton={showButton()}
            />
            <Carousal data={data} />
            <Footer />
          </>
        ) : (
          <NewLocCard distance={brandData.stores[0].storeDistance} />
        )
      ) : (
        <LoadComponent />
      )}
    </div>
  );
};
export default ManualLocation;

{
  /* <StyleDivElement>
      {brandData && brandData.stores ?
     
      
      :
        <div className='card'>
          <p>Just a second</p>
        </div>
    } 
    </StyleDivElement> */
}

{
  /* <div className="bg-[#E37353] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[45vh] sm:h-[27rem] text-[black] ">
            <img
              src="/images/Left Dots.png"
              className="absolute left-[2%] top-[5%] w-[9.5%] z-10"
            />
            <img
              src="/images/Right Dots.png"
              className="absolute right-[2%] top-[5%] w-[9.5%]"
            />
            <img
              src="/images/2 stars.png"
              className="absolute left-[20%] top-[5%] w-[13%]"
            />
            <img
              src="/images/storeFC design.png"
              className="absolute left-[0%] bottom-[0] w-[50%] z-0"
            />

            <div className="w-[20%] sm:w-[23%] h-[18%] sm:h-[22%]  bg-white p-[3.5%] mt-[3%] mx-auto rounded-[50%] border-[1px] border-black left-[30%] top-[18%]">
              <img
                className=" w-[100%] h-[100%]"
                src="/images/new Logo.png"
                alt="/"
              />
            </div>

            <p className="mt-[10%] text-center w-[80%] mx-auto text-[1.35rem] font-semibold">
              {brandData.stores[0].storeName}
            </p>

            <p className="mt-[2%] text-center w-[80%] mx-auto text-[2rem] font-bold">
              {brandData.stores[0].storeDistance}km Away
            </p>

            <button
              className="bg-[#FCD439] text-black px-4 py-4 block w-[65%] m-auto rounded-lg text-center top-[71.5%] left-[17.5%]  absolute z-10"
              onClick={openGoogleByMethod}
            >
              Find a store near me
            </button>
          </div> */
}

/****************************   here   **************************/
// {/* <div className="bg-[#E37353] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem] text-[black]">
//             <img
//               src="/images/Left Dots.png"
//               className="absolute left-[2%] top-[2%] h-[93%] z-10"
//             />
//             <img
//               src="/images/Right Dots.png"
//               className="absolute right-[2%] top-[2%] h-[93%]"
//             />
//             <img
//               src="/images/2 stars.png"
//               className="absolute left-[20%] top-[5%] w-[13%]"
//             />
//             <img
//               src="/images/storeFC design.png"
//               className="absolute left-[0%] bottom-[0] w-[50%] z-0"
//             />

//             <div className="w-[20%] sm:w-[23%] h-[18%] sm:h-[22%]  bg-white p-[3.5%] mt-[3%] mx-auto rounded-[50%] border-[1px] border-black left-[30%] top-[18%]">
//               <img
//                 className=" w-[100%] h-[100%]"
//                 src="/images/new Logo.png"
//                 alt="/"
//               />
//             </div>

//             <p className="mt-[10%] text-center w-[80%] mx-auto text-[1.35rem] font-semibold">
//               {brandData.stores[0].storeName}
//             </p>

//             <p className="mt-[2%] text-center w-[80%] mx-auto text-[2rem] font-bold">
//               {brandData.stores[0].storeDistance}km Away
//             </p>

//             <button
//               className="bg-[#FCD439] text-black px-4 py-4 block w-[65%] m-auto rounded-lg text-center top-[70.5%] left-[17.5%]  absolute z-10"
//               onClick={openGoogleByMethod}
//             >
//               Find a store near me
//             </button>
//           </div> */}

//prev return
// return (
//   //rendering store found card component
//   <div className="m-0 p-0">
//     {brandData && brandData.stores ? (
//       brandData.stores[0].storeDistance < 50 ? (
//         <>
//           <Header />
//           <NewStoreFoundCard2 data={data} />
//           <Carousal data={data} />
//           <Footer />
//         </>
//       ) : (
//         <NewLocCard distance={brandData.stores[0].storeDistance} />
//       )
//     ) : (
//       <LoadComponent />
//     )}
//   </div>
// );
