import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { MainButton } from "../../components/MainButton";
import { Carousal } from "../../components/Carousal";

import { useQuery } from "react-query";
import { useStore } from "../../context/storeContext";

import { SplashScreen } from "../../components/Splash/SplashScreen";
import Header from "../../components/Header";

const Brand = () => {
  const { brand } = useParams();
  const brandName = String(brand?.slice(0, 1)).toUpperCase() + brand?.slice(1);

  const details = useStore();
  const brandDetailURL = import.meta.env.VITE_SPOTLIGHT_GET + `${brand}`;

  const fetchBrandDetails = () => {
    return useQuery(
      ["brandDetails"],

      () => {
        return axios.get(brandDetailURL);
      },

      {
        select: (data) => {
          const res = data?.data;
          const {
            name,
            story,
            rating_count,
            stores,
            username,
            testimonial,
            rating,
            logo,
          } = res;

          return {
            name,
            story,
            rating_count,
            stores,
            username,
            testimonial,
            rating,
            logo,
          };
        },
      }
    );
  };

  const fetchLiveStoreData = (BRAND, loading) => {
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
        enabled: loading,
      }
    );
  };

  const { data: brandDetail, isLoading: isBrandDetailsLoading } =
    fetchBrandDetails();
  const { data: liveStoreData, isLoading: isLiveStoreDataLoading } =
    fetchLiveStoreData(brandDetail?.name, isBrandDetailsLoading);

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

  const LOADING = isBrandDetailsLoading || isLiveStoreDataLoading;

  return LOADING ? (
    <SplashScreen loading={LOADING} />
  ) : (
    <div className="min-w-screen relative mx-auto flex h-full min-h-screen w-full flex-grow flex-col items-center justify-start bg-black p-4 pt-0 lg:w-[60vw]">
      <Header />
      <MainButton />
      <Carousal />
    </div>
  );
};
export default Brand;
