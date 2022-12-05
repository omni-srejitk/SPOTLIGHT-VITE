import React from "react";
import { useState } from "react";
import { formInput } from "../services/api";
import { useParams } from "react-router-dom";
import { Modal } from "./Modal";
import { LoadComponent } from "./LoadComponent";

const NewLocCard = ({ distance }) => {
  const brand = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  //initializing initial input values as object
  const inputInitialValues = {
    fullname: "",
    phone: "",
    email: "",
    brand: "",
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
  // var newData = {};

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

  // getting all the inputs from the form
  const onInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      brand: brand.brandName,
    });
  };

  //submitting and sending all the form data on backend and database
  const handleClick = async () => {
    let response = await formInput(input);
    setName(response?.data?.data?.fullname);
    console.log(response);
    console.log(
      "response?.data?.data?.fullname",
      response?.data?.data?.fullname
    );
    toggleCard(cardInitialValues.thanks);
  };

  let [isOpen, setIsOpen] = useState(true);

  return (
    //rendering store not found card component
    <div className=" w-[100%] bg-[#000000] ">
      {card.view === "form" ? (
        <p className="text-[1.35rem] ml-[5%]">Oops! The store is too far</p>
      ) : (
        <p className="text-[1.35rem] ml-[5%]">
          Thanks for using ShopOnSpotlight
        </p>
      )}
      {card.view === "form" ? (
        distance ? (
          <div className="card bg-[#5E5BF2] rounded-xl mx-[5%] h-[100vh] relative">
            {/* <img
              src="/images/loc deny form design.png"
              className="absolute bottom-[0%] left-0"
            /> */}
            <img src="/images/arrow.png" className="w-[30%] m-auto py-[10%]" />
            <p className="store text-[1rem] tracking-[4px] text-center">
              THE NEAREST STORE IS
            </p>
            <p className="text-center font-bold text-[2.5rem] mt-4 leading-[3rem] text-[#FFFFFF]">
              {distance} km Away
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
                setFullName(e);
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
            {phoneError && <p className="text-[red] m-0 p-0">{phoneError}</p>}
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
              className="bg-[#FCD439] text-[#000000] w-[85%] p-[0.75rem] my-6 rounded-lg block mx-auto relative"
              onClick={() => {
                handleClick();
              }}
            >
              <span>Get 25% off on Launch</span>
              <img src="../images/discount.svg" alt="icon" className="inline" />
            </button>
          </div>
        ) : (
          <LoadComponent />
        )
      ) : (
        <div className="card bg-[#7E2AE2] rounded-xl mx-[5%] min-h-[100vh]">
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
              className="bg-[#FCD439] p-4 rounded-lg w-[60%] my-[8%] block mx-auto text-[black] font-medium text-[1.15rem] mb-4"
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
          {/* <img
            src="/not found design.svg"
            className=" absolute bottom-0 left-0"
          /> */}
          <p className="text-[1.5rem] text-center mt-[10rem] mb-4 w-[80%] mx-auto">
            Follow us on instagram for more exclusive deals
          </p>
          <p className="text-[1rem] text-center w-[60%] mx-auto">
            You'll be the first one to get exclusive notifications
          </p>
          <button className="block w-[70%] my-8 mx-auto p-[0.8rem] bg-white text-[1rem] text-black">
            <a href="https://www.instagram.com/shoponspotlight/">
              <span className="">Follow us on Instagram</span>
            </a>
            <img className="inline ml-2" src="/insta.svg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewLocCard;

// {
// /* <div className="card">
//         <h4 style={{ margin: 5, padding: "0px 10px" }}>Congratulations!</h4>
//         <hr />
//         <p style={{ margin: 10, paddingRight: 10, paddingLeft: 10 }}>
//           You’ll be the first one to be notified when we launch in Bangalore
//         </p>
//         <Button className="Button-insta">
//           <a href="https://www.instagram.com/shoponspotlight/">
//             <img src="/images/instagram.svg" alt="instagram" />
//             &nbsp; Follow on Instagram
//           </a>
//         </Button>
//       </div> */
// }
