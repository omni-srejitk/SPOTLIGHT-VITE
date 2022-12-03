//importing dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as geolib from "geolib";
//importing components
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";
import { LoadComponent } from "../../../components/LoadComponent";

const BrandStores = (props) => {
  // const [loading, setLoading] = useState(false);

  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    //using get request to consume the data from api
    axios
      .get(`${brandDetailURL}`, {
        headers: {
          "Content-Type": "text/html",
        },
      })
      .then((resp) => {
        props.brandName(resp.data);
        console.log("props is : " + props);
        // props.brandName(resp.data);
        // console.log("stores data is : " + props);
      });

    // showing loader component for 5 secs
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [brandData, setBrandData] = useState(null);
  //N-> declaring variables to get curr lat and curr long
  let currLat;
  let currLong;

  let myData = {};
  //initializing new data as object
  var newData = {};

  //initializing findDistance function
  var findDistance = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((Location) => {
      currLat = Location.coords.latitude;
      currLong = Location.coords.longitude;

      //intializing dist as object and first input as key-value pair of storeDistance with empty string
      const dist = { storeDistance: "" };

      if (props.data && props.data.stores) {
        //for all the stores in json of data
        for (let i = 0; i < props.data.stores.length; i++) {
          const element = props.data.stores[i];

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
        var byDistance = props.data.stores.slice(0);
        byDistance.sort(function (a, b) {
          return a.storeDistance - b.storeDistance;
        });
        myData.stores = byDistance;
        // console.log("data.stores", myData.stores);

        resolve(myData);
      }
    });
  });
  //assigning value of new data = data
  newData = myData;
  // console.log(myData);
  findDistance.then(function (value) {
    setBrandData(newData);
  });

  function openGoogleByMethod() {
    window.open(
      `https://www.google.com/maps/dir/${currLat},${currLong}/${brandData?.stores[0].lat},${brandData?.stores[0].long}`
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
  // console.log("props.data", props.data);
  let [condition, setCondition] = useState(false);
  // if(!brandData?.stores[0].storeDistance){
  if (brandData?.stores[0]?.storeDistance) {
    if (!condition) {
      setCondition(true);
    }
  }
  // }

  return (
    <div>
      {/* {brandData?.stores[0].storeDistance && brandData?.stores[0].storeName ? ( */}
      {condition ? (
        <>
          <Header />
          <NewStoreFoundCard
            distance={brandData?.stores[0].storeDistance}
            storeName={brandData?.stores[0].storeName}
            showButton={showButton()}
          />
          {/* <Carousal data={props.data} /> */}
          <Carousal data={props.data} />
          <Footer />
        </>
      ) : (
        ""
      )}
    </div>
  );
};
{
  /* <LoadComponent /> */
}

//     "" /* .newDiv-loadContainer{
{
  /* <NewStoreFoundCard data={props.data} /> */
}
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: auto;
//   }
// `;

export default BrandStores;

// {
//   //on loading show loading screen
//   loading ? (
//     <LoadingScreen />
//   ) : (
//     //after 5 secs show store not found card component
//     <NewStoreFoundCard data={props.data} />
//   )
// }
//  <>
//  <div className="bg-black">
// <div>
//   {
//     //on loading show loading screen
//     loading ? (
//       <LoadComponent />
//     ) : (
//       //after 5 secs show store not found card component
//       <>
//         <Header />
//         <NewStoreFoundCard data={props.data} />
//         <Carousal data={props.data} />
//         <Footer />
//       </>
//     )
//   }
//   <StoreFoundCard data={props.data}/>
//   <Usp data={props.data}/>
//   <NewStoreFoundCard data={props.data} />
//   </div>
// </div>
// </>

{
  /* <div>
      <Header />
      <NewStoreFoundCard data={props.data} />
      <Carousal data={props.data} />
      <Footer />
    </div>  */
}
