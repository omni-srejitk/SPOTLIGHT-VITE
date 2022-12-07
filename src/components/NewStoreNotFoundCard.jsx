import React from "react";
import * as geolib from "geolib";
import { useState } from "react";
import { formInput } from "../services/api";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { LoadComponent } from "./LoadComponent";
import { ButtonAnimationComponent } from "./ButtonAnimationComponent";

const NewStoreNotFoundCard = ({ data }) => {
  const brand = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  let [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");

  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  //initializing initial input values as object
  const inputInitialValues = {
    fullname: "",
    phone: "",
    email: "",
    brand: "",
    lat: "",
    long: "",
  };

  const [input, setInput] = useState(inputInitialValues);
  const [brandData, setBrandData] = useState(null);

  const cardInitialValues = {
    form: {
      view: "form",
    },
    thanks: {
      view: "thanks",
    },
  };

  const [card, toggleCard] = useState(cardInitialValues.form);

  //initializing new data as object
  var newData = {};

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(phone) {
    return /^\d{10}$/.test(phone);
  }

  const handleEmailChange = (e) => {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setMessage(e.target.value);
  };

  const handlePhoneChange = (e) => {
    if (!isValidPhone(e.target.value)) {
      setPhoneError("Phone is invalid");
    } else {
      setPhoneError(null);
    }

    setPhoneMessage(e.target.value);
  };

  var findDistance = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition((Location) => {
      //intializing dist as object and first input as key-value pair of storeDistance with empty string
      const dist = { storeDistance: "", Location };

      if (data && data.stores) {
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

  newData = data;

  //updating the state of brand data with new data as input
  findDistance.then(function (value) {
    setBrandData(newData);
  });
  // getting all the inputs from the form
  const onInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      brand: brand.brandName,
      lat: brandData.stores[0].Location.coords.latitude,
      long: brandData.stores[0].Location.coords.longitude,
    });
  };

  //submitting and sending all the form data on backend and database
  const handleClick = async () => {
    let response = await formInput(input);
    setName(response?.data?.data?.fullname);
    if (phoneMessage && message) {
      toggleCard(cardInitialValues.thanks);
    }
  };

  return (
    <div className=" bg-[#000000] py-2">
      {card.view === "form" ? (
        <p className="ml-6 text-[1.35rem]">Oops! The store is too far</p>
      ) : (
        <p className="ml-6 text-[1.35rem]">Thanks for using ShopOnSpotlight</p>
      )}
      {card.view === "form" ? (
        brandData && brandData.stores ? (
          <div>
            <div className="card mx-5 h-full rounded-xl bg-[#5E5BF2] pb-5">
              <img src="/images/arrow.svg" className="m-auto w-24 py-12" />
              <p className="store text-center text-[1rem] tracking-[4px]">
                THE NEAREST STORE IS
              </p>
              <p className="mt-4 text-center text-[2.5rem] font-bold leading-[3rem] text-[#FFFFFF]">
                {brandData.stores[0].storeDistance} km Away
              </p>
              <p className="mt-4 text-center text-[1.25rem] font-medium leading-6">
                How Far Will You Go for Love?
              </p>
              <p className="mt-4 text-center text-[0.9rem] leading-6">
                Instead, let us Notify you when
                <br />
                we launch near you.
              </p>
              <input
                id="outlined-basic"
                onChange={(e) => {
                  onInputChange(e);
                  setName(e.target.value);
                }}
                name="fullname"
                placeholder="Full Name"
                variant="outlined"
                size="small"
                className="m-auto my-4 mt-8 block w-4/5 rounded-lg bg-[#2D2C73] p-4"
              />
              <input
                id="outlined-basic"
                onChange={(e) => {
                  onInputChange(e);
                  handlePhoneChange(e);
                }}
                name="phone"
                placeholder="Phone number"
                variant="outlined"
                size="small"
                className="m-auto my-4 block w-4/5 rounded-lg bg-[#2D2C73] p-4"
              />
              {phoneError && (
                <p style={{ color: "red", margin: 0, padding: 0 }}>
                  {phoneError}
                </p>
              )}
              <input
                id="outlined-basic"
                onChange={(e) => {
                  onInputChange(e);
                  handleEmailChange(e);
                }}
                name="email"
                placeholder="Email"
                variant="outlined"
                size="small"
                className="m-auto my-4 block w-4/5 rounded-lg bg-[#2D2C73] p-4"
              />
              {error && <p className="m-0 p-0 text-[red]">{error}</p>}
              <button
                className="relative m-auto mt-8 block w-80 rounded-lg text-center text-[1.2rem] font-semibold text-black"
                onClick={() => {
                  handleClick();
                }}
                id="button"
              >
                <div className="absolute top-12 left-12 z-[50] ">
                  Get 25% off on Launch
                  <img src="/images/discount.svg" className="ml-2 inline" />
                </div>
                <ButtonAnimationComponent />
              </button>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )
      ) : (
        <div className="card relative m-5 min-h-[80vh] rounded-xl bg-[#7E2AE2] pb-4">
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <img src="/Success.svg" className="my-6 mx-auto block h-36 w-56" />
            <p className="m-2 text-center text-[2rem] font-bold">
              Congratulations! {name}
            </p>
            <p className="p-2 text-center text-[1.25rem] font-semibold">
              You’ll be the first one to be notified when we launch in Bangalore
            </p>
            <button
              className="my-6 mx-auto block w-3/5 rounded-lg bg-[#FCD439] p-4 text-[1.15rem] font-medium text-[black]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <a href="https://www.instagram.com/shoponspotlight/">
                <span className="">Follow us on Instagram</span>
              </a>
            </button>
          </Modal>

          <img src="/new 2 stars.svg" className="block pt-12 pl-20" />
          <img
            src="/not found design.svg"
            className=" absolute bottom-0 left-0 z-0"
          />
          <p className="mx-auto mt-40 mb-4 w-4/5 text-center text-[1.5rem]">
            Follow us on instagram for more exclusive deals
          </p>
          <p className="mx-auto w-3/5 text-center text-[1rem]">
            You'll be the first one to get exclusive notifications
          </p>
          <button className="relative z-[15] my-8 mx-auto block w-60 rounded-lg bg-white p-[0.8rem] text-[1rem] text-black">
            Follow us on instagram{" "}
            <img className="ml-2 inline" src="/insta.svg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewStoreNotFoundCard;
