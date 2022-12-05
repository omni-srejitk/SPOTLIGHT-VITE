import React from "react";
import * as geolib from "geolib";
import { useState } from "react";
import { formInput } from "../services/api";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { LoadComponent } from "./LoadComponent";

const NewStoreNotFoundCard = ({ data }) => {
  const brand = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  let [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");

  const [setPhoneMessage] = useState("");
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
    console.log(response);
    console.log("response?.data?.data?.name", response?.data?.data?.fullname);

    toggleCard(cardInitialValues.thanks);
  };

  return (
    //rendering store not found card component
    <div className=" bg-[#000000] py-[2%]">
      {card.view === "form" ? (
        <p className="text-[1.35rem] ml-[5%]">Oops! The store is too far</p>
      ) : (
        <p className="text-[1.35rem] ml-[5%]">
          Thanks for using ShopOnSpotlight
        </p>
      )}
      {card.view === "form" ? (
        brandData && brandData.stores ? (
          <div>
            <div className="card bg-[#5E5BF2] rounded-xl m-[5%] pb-[5%]">
              <img
                src="/images/arrow.png"
                className="w-[30%] sm:w-[20%] m-auto py-[10%]"
              />
              <p className="store text-[1rem] tracking-[4px] text-center">
                THE NEAREST STORE IS
              </p>
              <p className="text-center font-bold text-[2.5rem] mt-4 leading-[3rem] text-[#FFFFFF]">
                {brandData.stores[0].storeDistance} km Away
              </p>
              {/* <hr className="hr2" /> */}
              <p className="text-center font-medium text-[1.25rem] leading-6 mt-4">
                How Far Will You Go for Love?
              </p>
              <p className="text-center text-[0.9rem] leading-6 mt-4">
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
                /*label="Full name"*/ variant="outlined"
                size="small"
                className="bg-[#2D2C73] block w-[80%] m-auto my-4 mt-8 p-[0.5rem] rounded-lg"
              />
              <input
                id="outlined-basic"
                onChange={(e) => {
                  onInputChange(e);
                  handlePhoneChange(e);
                }}
                name="phone"
                placeholder="Phone number"
                /*label="Phone number"*/ variant="outlined"
                size="small"
                className="bg-[#2D2C73] block w-[80%] m-auto my-4 p-[0.5rem] rounded-lg"
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
                /*label="Email"*/ variant="outlined"
                size="small"
                className="bg-[#2D2C73] block w-[80%] m-auto my-4 p-[0.5rem] rounded-lg"
              />
              {error && (
                <p style={{ color: "red", margin: 0, padding: 0 }}>{error}</p>
              )}
              <button
                className="bg-[#FCD439] text-[#000000] w-[85%] p-[0.75rem] my-6 rounded-lg block mx-auto mb-4"
                onClick={() => {
                  handleClick();
                }}
              >
                <span>Get 25% off on Launch</span>
                <img
                  src="../images/discount.svg"
                  alt="icon"
                  className="inline"
                />
              </button>
            </div>
          </div>
        ) : (
          <LoadComponent />
        )
      ) : (
        <div className="card bg-[#7E2AE2] rounded-xl m-[5%] pb-[5%] min-h-[80vh] relative">
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <img
              src="/Success.svg"
              className="w-[60%] h-[30%] my-6 block mx-auto"
            />
            <p className="text-[2rem] font-bold text-center m-2">
              Congratulations! {name}
            </p>
            <p className="text-[1.25rem] text-center font-semibold p-2">
              You’ll be the first one to be notified when we launch in Bangalore
            </p>
            <button
              className="bg-[#FCD439] p-4 rounded-lg w-[60%] my-[8%] block mx-auto text-[black] font-medium text-[1.15rem]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <a href="https://www.instagram.com/shoponspotlight/">
                <span className="">Follow us on Instagram</span>
              </a>
            </button>
          </Modal>

          <img src="/new 2 stars.svg" className="block pt-[3rem] pl-[30%]" />
          <img
            src="/not found design.svg"
            className=" absolute bottom-0 left-0 z-0"
          />
          <p className="text-[1.5rem] text-center mt-[10rem] mb-4 w-[80%] mx-auto">
            Follow us on instagram for more exclusive deals
          </p>
          <p className="text-[1rem] text-center w-[60%] mx-auto">
            You'll be the first one to get exclusive notifications
          </p>
          <button className="block w-[70%] my-8 z-[15] mx-auto p-[0.8rem] bg-white text-[1rem] text-black relative rounded-lg">
            Follow us on instagram{" "}
            <img className="inline ml-2" src="/insta.svg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewStoreNotFoundCard;

// {/* <div className="card">
//   <h4 style={{ margin: 5, padding: "0px 10px" }}>Congratulations!</h4>
//   <hr />
//   <p style={{ margin: 10, paddingRight: 10, paddingLeft: 10 }}>
//     You’ll be the first one to be notified when we launch in Bangalore
//   </p>
//   <Button className="Button-insta">
//     <a href="https://www.instagram.com/shoponspotlight/">
//       <img src="/images/instagram.svg" alt="instagram" />
//       &nbsp; Follow on Instagram
//     </a>
//   </Button>
// </div>; */}
