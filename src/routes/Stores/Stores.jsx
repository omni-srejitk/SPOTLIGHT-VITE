import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShopStore } from "../../store/ShopStore";
import { Banner } from "../../components/Cards/Banner";
import { ButtonAnimationComponent } from "../../components/ButtonAnimationComponent";
import { Carousal } from "../../components/Carousal";
import { useMutation } from "react-query";
import axios from "axios";
import { Modal } from "../../components/Modal/Modal";
import { useFetchLocation } from "../../components/utils/useFetchLocation";
import Header from "../../components/Header";
import { LoadComponent } from "../../components/LoadComponent";
import { useRef } from "react";

export const Stores = () => {
  const { calculateDistance } = useFetchLocation();
  const storeData = useShopStore((state) => state.storeData);
  const storeFound = useShopStore((state) => state.storeFound);
  const isStoreLoading = useShopStore((state) => state.isStoreLoading);
  const latitude = localStorage.getItem("myLat");
  const longitude = localStorage.getItem("myLon");

  const brand = useParams();
  let [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputInitialValues = {
    fullname: "",
    phone: "",
    email: "",
    brand: "",
    lat: "",
    long: "",
  };

  const [input, setInput] = useState(inputInitialValues);

  const CAN_SUBMIT = input.fullname && input.phone && input.email;

  useEffect(() => {
    calculateDistance(true, "");
  }, []);

  function openGoogleByMethod() {
    if (latitude != 0 && longitude != 0) {
      window.open(
        `https://www.google.com/maps/dir/${latitude},${longitude}/${storeData.latitude},${storeData.longitude}`
      );
    }
  }

  const onInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      brand: brand.brandName,
    });
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
  }

  function isValidPhone(phone) {
    return /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}$/.test(phone);
  }

  const handleEmailChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
  };

  const handlePhoneChange = (e) => {
    if (!isValidPhone(e.target.value)) {
      setPhoneError("Phone is invalid");
    } else {
      setPhoneError(null);
    }
  };

  const handleNameChange = (e) => {
    if (!isValidName(e.target.value)) {
      setNameError("Name is invalid");
    } else {
      setNameError(null);
    }
  };

  const loginUser = (form) => {
    return axios.post("https://api.omniflo.in/formentry", form);
  };

  const { mutate, data: FormDatares, isLoading } = useMutation(loginUser);

  const handleClick = (e) => {
    e.preventDefault();

    if (CAN_SUBMIT) {
      calculateDistance(true);
      mutate(input);
      setName(FormDatares?.data?.data?.fullname);
      setIsOpen(true);
      setErrorMessage("");
      setInput({
        fullname: "",
        phone: "",
        email: "",
        brand: "",
        lat: "",
        long: "",
      });
    } else {
      setErrorMessage("Please enter all fields");
    }
  };

  const NEARBY_STORE = (
    <div className="mx-auto flex h-full w-full flex-grow flex-col bg-black p-4 pt-0 lg:w-[60vw]">
      <Header />
      <Banner color="bg-rose-500">
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
        </div>
        <p className="mx-auto mt-10 w-4/5 text-center text-[1.5rem] font-bold tracking-[2px] text-[#1D1D1D]">
          {storeData?.customer_name}
        </p>
        <p className="max-w-4/5 mx-auto mt-2 text-center text-[2.5rem] font-semibold text-[#1D1D1D]">
          {storeData?.storeDistance || 0} km Away
        </p>
        <ButtonAnimationComponent
          onClick={() => {
            openGoogleByMethod();
          }}
        >
          <div className="group flex h-full w-full items-center justify-center gap-2 ">
            <p>Take me there</p>
            <img
              src="/Find a store near me.svg"
              className="ml-2 inline  group-hover:ml-6"
            />
          </div>
        </ButtonAnimationComponent>
      </Banner>
      <Carousal />
    </div>
  );

  const FARAWAY_STORE = (
    <div className="mx-auto flex h-full w-full flex-grow flex-col bg-black p-4 lg:w-[60vw]">
      <div className="h-full w-full">
        <div className="card mx-2 h-full rounded-xl bg-indigo-500 pb-5">
          <img src="/images/arrow.svg" className="m-auto w-24 py-12" />
          <p className="store text-center text-base tracking-[4px] text-white">
            THE NEAREST STORE IS
          </p>
          <p className="mt-4 text-center text-[2.5rem] font-bold leading-[3rem] text-indigo-900">
            {storeData?.storeDistance} km Away
          </p>
          <p className="mt-4 text-center text-lg font-medium leading-6 text-indigo-900">
            How Far Will You Go for Love?
          </p>
          <p className="mt-4 text-center text-sm font-semibold leading-6 text-white">
            Instead, let us notify you when
            <br />
            we launch near you.
          </p>

          <form
            onSubmit={handleClick}
            className="flex w-full flex-col items-center justify-center"
          >
            <input
              onChange={(e) => {
                onInputChange(e);
                handleNameChange(e);
                setName(e.target.value);
              }}
              value={input.fullname}
              name="fullname"
              placeholder="Full Name"
              className="m-auto my-4 block w-4/5 rounded-lg border-2 border-transparent bg-indigo-900 p-4 text-white outline-transparent placeholder:text-indigo-300 focus:border-indigo-900 focus-visible:border-indigo-900"
            />
            {nameError && (
              <p className="m-0 w-4/5 p-0 text-white">{nameError}</p>
            )}
            <input
              onChange={(e) => {
                onInputChange(e);
                handlePhoneChange(e);
              }}
              value={input.phone}
              name="phone"
              placeholder="Phone number"
              className="m-auto my-4 block w-4/5 rounded-lg border-2 border-transparent bg-indigo-900 p-4 text-white outline-transparent placeholder:text-indigo-300 focus:border-indigo-900 focus-visible:border-indigo-900"
            />
            {phoneError && (
              <p className="m-0 w-4/5 p-0 text-white">{phoneError}</p>
            )}
            <input
              onChange={(e) => {
                onInputChange(e);
                handleEmailChange(e);
              }}
              value={input.email}
              name="email"
              placeholder="Email"
              className="m-auto my-4 block w-4/5 rounded-lg border-2 border-transparent bg-indigo-900 p-4 text-white outline-transparent placeholder:text-indigo-300 focus:border-indigo-900 focus-visible:border-indigo-900"
            />
            {error && <p className="m-0 w-4/5 p-0 text-white">{error}</p>}
            {errorMessage && (
              <p className="m-0 w-4/5 p-0 text-white">{errorMessage}</p>
            )}

            <ButtonAnimationComponent type="submit">
              <div className="group flex h-full w-full items-center justify-center gap-2 ">
                <p>Get 25% off on Launch</p>
                <img
                  src="/Find a store near me.svg"
                  className="ml-2 inline  group-hover:ml-6"
                />
              </div>
            </ButtonAnimationComponent>
          </form>
        </div>
      </div>
      {isOpen ? (
        <Modal
          isModalOpen={isOpen}
          onClose={() => {
            setInput({
              fullname: "",
              phone: "",
              email: "",
              brand: "",
              lat: "",
              long: "",
            });
            setIsOpen(false);
          }}
        >
          <div className="relative h-full w-full min-w-[80vw] rounded-lg bg-white p-10 lg:w-[30vw] lg:min-w-[30vw]">
            <div
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200"
            >
              <span className="material-icons-round">close</span>
            </div>
            <img src="/Success.svg" className="my-6 mx-auto block h-36 w-56" />
            <p className="m-2 text-center text-[2rem] font-bold">
              Congratulations! {name}
            </p>
            <p className="p-2 text-center text-[1.25rem] font-semibold">
              You’ll be the first one to be notified when we launch in near you!
            </p>
            <button
              className="my-6 mx-auto block w-4/5 rounded-lg bg-[#FCD439] p-4 text-[1.15rem] font-medium text-[black]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <a href="https://www.instagram.com/shoponspotlight/">
                <span className="">Follow us on Instagram</span>
                <img
                  src="/images/insta icon dark.svg"
                  className="inline pl-2"
                  alt="/"
                />
              </a>
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );

  const [showAnim, setShowAnim] = useState(true);
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowAnim(false);
    }, 5000);

    return () => {
      timerRef && clearTimeout(timerRef.current);
    };
  }, []);

  return !isStoreLoading && showAnim ? (
    <LoadComponent />
  ) : storeData?.storeDistance > 50 ? (
    FARAWAY_STORE
  ) : (
    NEARBY_STORE
  );
};
