import React from "react";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import * as geolib from "geolib";
import { useState } from "react";
import { formInput } from "../services/api";
import { useParams } from "react-router-dom";

const StoreNotFoundCard = ({ data }) => {
  const brand = useParams();
  const [setMessage] = useState("");
  const [error, setError] = useState(null);

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
    //getting geoLocation of the user from navigator
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

        //updating data.stores with sorted data.stores
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

  // console.log(brandData)

  // const myStyle = {
  //   label:focus-within{
  //     margin = '10px'
  //   }
  // } style={myStyle}

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
    console.log(response);
    toggleCard(cardInitialValues.thanks);
  };

  return (
    //rendering store not found card component
    <StyleDivElement>
      {card.view === "form" ? (
        brandData && brandData.stores ? (
          <div className="card">
            <p className="store">THE NEAREST STORE IS</p>
            <p className="distance">
              {brandData.stores[0].storeDistance}km Away
            </p>
            <hr className="hr2" />
            <p className="text1">How Far Will You Go for Love? </p>
            <p className="text2">
              Instead, let us Notify you when we launch near you.{" "}
            </p>
            <StyleTextFiled
              id="outlined-basic"
              onChange={(e) => onInputChange(e)}
              name="fullname"
              placeholder="Full Name"
              /*label="Full name"*/ variant="outlined"
              size="small"
            />
            <StyleTextFiled
              id="outlined-basic"
              onChange={(e) => {
                onInputChange(e);
                handlePhoneChange(e);
              }}
              name="phone"
              placeholder="Phone number"
              /*label="Phone number"*/ variant="outlined"
              size="small"
            />
            {phoneError && (
              <p style={{ color: "red", margin: 0, padding: 0 }}>
                {phoneError}
              </p>
            )}
            <StyleTextFiled
              id="outlined-basic"
              onChange={(e) => {
                onInputChange(e);
                handleEmailChange(e);
              }}
              name="email"
              placeholder="Email"
              /*label="Email"*/ variant="outlined"
              size="small"
            />
            {error && (
              <p style={{ color: "red", margin: 0, padding: 0 }}>{error}</p>
            )}
            <Button
              className="Button-discount"
              onClick={() => {
                handleClick();
              }}
            >
              <img src="../images/discount.svg" alt="icon" /> Get 25% off on
              Launch{" "}
            </Button>
          </div>
        ) : (
          ""
        )
      ) : (
        <div className="card">
          <h4 style={{ margin: 5, padding: "0px 10px" }}>Congratulations!</h4>
          <hr />
          <p style={{ margin: 10, paddingRight: 10, paddingLeft: 10 }}>
            You’ll be the first one to be notified when we launch in Bangalore
          </p>
          <Button className="Button-insta">
            <a href="https://www.instagram.com/shoponspotlight/">
              <img src="/images/instagram.svg" alt="instagram" />
              &nbsp; Follow on Instagram
            </a>
          </Button>
        </div>
      )}
    </StyleDivElement>
  );
};

const StyleTextFiled = styled(TextField)`
  border-radius: 12px;
  width: 75%;
  margin: 10px 20px 20px 20px;
  font-weight: 600;
  font-size: 16px;
  text-transform: none;
  color: #fff;
  font-family: "Poppins", sans-serif;
  background-color: #fff;
  ${
    "" /* input:focus label{
      margin: -10px;
    }  */
  }
  ${
    "" /* label{
      margin: -10px;
    } */
  }
`;

const StyleDivElement = styled("div")`
  .card {
    ${"" /* width: 90%; */}
    margin:  20px;
    ${"" /* margin: auto; */}
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${"" /* box-sizing: border-box; */}
    background: linear-gradient(180deg, rgba(58, 58, 58, 0.7) 5.22%, rgba(72, 72, 72, 0.4) 94.94%);
    backdrop-filter: blur(12px);
    border-radius: 5px;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.2);

    .Button-discount {
      width: 75%;
      border-radius: 10px;
    }

    .Button-insta {
      width: 80%;
      border-radius: 10px;
      font-size: 20px;
    }

    p {
      text-align: center;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
    h4 {
      font-weight: 600;
      font-size: 32px;
      line-height: 36px;
      /* or 112% */

      text-align: center;

      background: linear-gradient(90deg, #b89fff 0%, #ff9bc1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    hr {
      width: 50%;
      height: 0px;
      margin: auto;
      background: rgba(217, 217, 217, 0.6);
      opacity: 0.2;
      border: 1px solid #adadad;
    }

    .distance {
      font-weight: 600;
      font-size: 32px;
      line-height: 24px;
      text-transform: capitalize;
      background: linear-gradient(90deg, #b89fff 0%, #ff9bc1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding: 10px;
      margin-bottom: 0;
    }
    .text1 {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 0;
    }
    .text2 {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      padding: 0 40px;
      margin-top: 5px;
    }
    .store {
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      margin: 0;
    }
    .hr2 {
      width: 218px;
      height: 0px;
      margin: 10px auto;
      background: rgba(217, 217, 217, 0.6);
      opacity: 0.2;
      border: 1px solid #adadad;
    }
    button {
      background: linear-gradient(-45deg, #ffa63d, #3f0bdb, #ff0c67, #338aff);
      background-size: 600%;
      border-radius: 20px;
      margin: 10px 20px 20px 20px;
      font-weight: 600;
      font-size: 16px;
      text-transform: none;
      color: #fff;
      font-family: "Poppins", sans-serif;
      text-decoration: none;
      padding: 10px 0;
      position: relative;
      animation: anime 16s linear infinite;

      img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }

  @keyframes anime {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default StoreNotFoundCard;
