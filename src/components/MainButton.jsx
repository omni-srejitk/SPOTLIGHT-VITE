import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";
import { useStore } from "../context/storeContext";
import { Modal } from "./Modal/Modal";
import { Banner } from "./Cards/Banner";
import { useFetchLocation } from "./utils/useFetchLocation";

export const MainButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { brand } = useParams();
  const { storeDetails } = useStore();
  const { information } = storeDetails;

  const { calculateDistance } = useFetchLocation();

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
            <div className="overflow-hidden rounded-full object-cover p-4">
              <img className=" object-contain" src={information?.logo} />
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[1.45rem] text-white">
          <span className="font-bold capitalize">{information?.name} </span> is
          now
        </p>
        <p className="text-center text-[1.45rem] text-white">
          on <span className="font-bold text-white">Spotlight</span>
        </p>
        <hr className=" mx-auto my-2  w-48 rounded border-t-2 border-white/30 text-lg text-white" />
        <p className="m-auto w-64 text-center text-xl text-white">
          Visit the nearest store
        </p>
        <p className="text-xl text-white"> for exclusive deals.</p>
        <ButtonAnimationComponent
          onClick={() => {
            if (
              localStorage.getItem("myLat") &&
              localStorage.getItem("myLon")
            ) {
              calculateDistance(true, "STORES");
            } else {
              setIsOpen(true);
            }
          }}
        >
          <div className=" group  flex h-full w-full items-center justify-center gap-2 text-lg font-medium ">
            <p>Find a store near me</p>
            <img
              src="/Find a store near me.svg"
              className="ml-2 inline  group-hover:ml-6"
            />
          </div>
        </ButtonAnimationComponent>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        ></button>
      </Banner>
      {isOpen ? (
        <Modal
          isModalOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position={"bottom-0 left-0 right-0 mx-auto"}
        >
          <div className="relative h-[33rem] w-full min-w-[80vw] rounded-lg bg-white p-10 text-black drop-shadow-lg lg:w-[58vw] lg:min-w-[30vw]">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200"
            >
              <span className="material-icons-round">close</span>
            </div>
            <img src="/newLoc.svg" className="my-6 mx-auto block h-40 w-24" />
            <p className="m-2 text-center text-xl font-medium">
              You&#39;re just a few seconds away
            </p>
            <p className="px-4 py-2 text-center text-base font-normal">
              We ask for location permission to locate stores near you
            </p>
            <p className="px-8 text-center text-base font-normal">
              Click “Allow” once you see a popup.
            </p>
            <button
              className="my-8 mx-auto mb-12 block w-52 rounded-lg bg-yellow-400 p-4 text-lg font-medium text-black hover:bg-yellow-500/80"
              onClick={() => {
                setIsOpen(false);
                calculateDistance(true, "STORES");
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
