import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MainButton } from "../../components/MainButton";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Carousal } from "../../components/Carousal";
// import { NewModalLocationDeny } from "../../components/NewModalLocationDeny";
// import { distanceContext } from "../../App";
// import "./brands.css";
import { useQuery } from "react-query";
import { useStore } from "../../context/storeContext";

const Brand = () => {
  const { brand } = useParams();
  const brandName = String(brand?.slice(0, 1)).toUpperCase() + brand?.slice(1);

  const details = useStore();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brandName}`;

  const fetchBrandDetails = () => {
    return useQuery(
      // Name of API
      ["brandDetails"],

      // The actual API CALL
      () => {
        return axios.get(brandDetailURL);
      },
      // options
      {
        select: (data) => {
          const res = data?.data;
          const { name, story, testimonial, rating, logo } = res;

          return { name, story, testimonial, rating, logo };
        },
      }
    );
  };

  const fetchLiveStoreData = (BRAND) => {
    return useQuery(
      ["livestore_data"],
      () => {
        return axios.get(
          `https://engine.omniflo.in/api/method/omniflo_lead.omniflo_lead.api.frappe_api.customer_profile?brand=${encodeURI(
            BRAND
          )}`,
          {
            headers: {
              Authorization: `Token ${
                import.meta.env.VITE_AUTHORIZATION_TOKEN
              }`,
            },
          }
        );
      },
      {
        select: (data) =>
          data?.data?.message?.filter((store) =>
            store.latitude !== null || store.longitude !== null
              ? { latitude: store.latitude, longitude: store.longitude }
              : false
          ),
      }
    );
  };

  const { data: brandDetail, isLoading: isBrandDetailsLoading } =
    fetchBrandDetails();
  const { data: liveStoreData, isLoading: isLiveStoreDataLoading } =
    fetchLiveStoreData(brandName);

  const setData = () => {
    if (!isBrandDetailsLoading && !isLiveStoreDataLoading) {
      const storeDetails = { ...brandDetail, stores: liveStoreData };

      details.setStoreDetails({
        information: storeDetails,
      });
    }
  };

  useEffect(() => {
    if (!isBrandDetailsLoading && !isLiveStoreDataLoading) {
      setData();
    }
  }, [isBrandDetailsLoading, isLiveStoreDataLoading]);

  const [locDeny, setLocDeny] = useState(false);
  localStorage.setItem("ModalCondition", true);

  return (
    <div className="min-w-screen relative flex h-fit min-h-screen w-full flex-col items-center justify-start">
      <Header />
      <MainButton setLocDeny={setLocDeny} />
      <Carousal />
      {/* <Footer /> */}
    </div>
  );

  // return (
  //   <div className="bg-[#000000] ">
  //     <div>

  //     {/* // MODAL LOGIC */}
  //       {Object.keys(details.storeDetails.information).length !== 0 ? (
  //         <>
  //           {locDeny ? (
  //             false
  //           ) : (
  //             // <NewModalLocationDeny />
  //             <>
  //               <Header />
  //               {/* <MainButton setLocDeny={setLocDeny} /> */}
  //               {/* <Carousal /> */}
  //               <Footer />
  //             </>
  //           )}
  //         </>
  //       ) : (
  //         <div className="welcome">
  //           <span id="splash-overlay" className="splash"></span>
  //           <div
  //             className="flex h-24 w-24 items-center justify-center rounded-[3rem] bg-black p-2"
  //             id="welcome"
  //           >
  //             <div className=" h-12 w-12">
  //               <img
  //                 className=" h-full w-full"
  //                 src="/spotlight white.svg"
  //                 alt="/"
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};
export default Brand;
