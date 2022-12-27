import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { useStore } from "../context/storeContext";
import { Modal } from "./Modal/Modal";
import { useShopStore } from "../store/ShopStore";
import { Banner } from "./Cards/Banner";
import { useFetchLocation } from "./utils/useFetchLocation";

export const MainButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { brand } = useParams();
  const { storeDetails } = useStore();
  const { information } = storeDetails;

  const navigate = useNavigate();
  const { calculateDistance } = useFetchLocation();
  const storeFound = useShopStore((state) => state.storeFound);

  return (
    <div className="flex h-full w-full flex-grow">
      <Banner color={"bg-indigo-600"}>
        <div className="flex h-fit w-fit -space-x-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[1px] bg-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <div className=" h-9 w-9">
                <img
                  className=" h-full w-full"
                  src="/spotlight white.svg"
                  alt="/"
                />
              </div>
            </div>
          </div>

          <div className="flex h-24 w-24 items-center justify-center rounded-full  bg-white ">
            <div className=" rounded-full object-contain p-1">
              <img className=" object-contain" src={information?.logo} />
            </div>
          </div>
        </div>
        <p className="mt-8 mb-0 text-center text-[1.45rem]">
          <span className="font-bold">{brand} </span> is now
        </p>
        <p className="mt-[-0.45rem] text-center text-[1.45rem]">
          on <span className=" font-bold">Spotlight</span>
        </p>
        <hr className=" mx-auto mt-2 w-48 rounded border-t-2 border-white" />
        <p className="m-auto mt-4 w-64 text-center text-base">
          Visit the nearest store
        </p>
        for exclusive deals
        <button
          onClick={() => {
            if (
              localStorage.getItem("myLat") &&
              localStorage.getItem("myLon")
            ) {
              calculateDistance(true);
            } else {
              setIsOpen(true);
            }
            storeFound ? navigate("Stores") : navigate("Not Found");
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
            setIsOpen(false);
          }}
        ></button>
      </Banner>
      {isOpen ? (
        <Modal isModalOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="relative h-full w-full min-w-[80vw] rounded-lg bg-white p-10 lg:w-[30vw] lg:min-w-[30vw]">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200"
            >
              <span className="material-icons-round">close</span>
            </div>
            <img src="/newLoc.svg" className="my-6 mx-auto block h-40 w-24" />
            <p className="m-2 text-center text-lg font-medium">
              You&#39;re just a few seconds away
            </p>
            <p className="p-2 text-center text-base font-normal">
              We ask for location permission to locate stores near you. Click
              “Allow” once you see a popup. Grant permission
            </p>
            <button
              className="my-8 mx-auto block w-52 rounded-lg bg-yellow-500 p-4 text-lg font-medium text-black"
              onClick={() => {
                setIsOpen(false);
                calculateDistance(true);
              }}
            >
              Grant Permission
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};
