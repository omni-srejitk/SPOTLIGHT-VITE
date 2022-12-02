import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, Button } from "@mui/material";
import * as geolib from "geolib";

const ButtonCard = ({ data }) => {
  const navigate = useNavigate();

  const [Location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  useEffect(() => {
    //If we do not get geolocation in navigator
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported or denied",
      });
    }
  }, [Location]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSuccess = (Location) => {
    // if we get geolocation in navigator
    setLocation({
      loaded: true,
      coordinates: {
        lat: Location.coords.latitude,
        lng: Location.coords.longitude,
      },
    });

    //initializing store distance in a empty list
    const storeDistance = [];
    if (data && data.stores) {
      // for all the stores present in json
      for (let i = 0; i < data.stores.length; i++) {
        const element = data.stores[i];

        //calculating distance of stores from your location
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

        //updating all the store distance in the list and converting it in km
        storeDistance.push(Math.round(locationDistance / 1000));
      }
    }
    // redirecting to Stores page if nearest store is 50km from user location
    if (Math.min(...storeDistance) <= 50) {
      navigate("Stores");
    }
    // redirecting to Stores not found page if nearest store is more than 50km from user location
    else {
      navigate("Store Not Found");
    }
  };
  // if user denies permission to access their location
  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
    console.log(error);
    //if user denies permission to access their location redirect to Location denied page
    navigate("Location denied");
  };

  // asking for location of a user and it's condition
  const ShowLocationPopUp = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return (
    //rendering button card component
    <StyleDiv>
      <div className="card">
        <p>
          Visit the nearest store for <br /> <i> exclusive deals </i>{" "}
        </p>
        <Button onClick={ShowLocationPopUp}>
          <img src="./images/map_pin.svg" alt="icon" /> &nbsp; Find a Store Near
          Me{" "}
        </Button>
        <p className="ask">
          We ask for location permission to locate stores near you. Click
          “Allow” once you see a popup.
        </p>
      </div>
    </StyleDiv>
  );
};

const StyleDiv = styled("div")`
  .card {
    margin: 20px;
    padding: 20px 0;
    box-sizing: border-box;
    background: linear-gradient(
      180deg,
      rgba(58, 58, 58, 0.7) 5.22%,
      rgba(72, 72, 72, 0.4) 94.94%
    );
    backdrop-filter: blur(12px);
    border-radius: 5px;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.2);
    p {
      text-align: center;
      margin: 10px 0px 5px 0px;
      font-size: 1.2rem;
      i {
        font-weight: 700;
        color: #f38137;
        font-size: 1.1rem;
      }
    }

    .ask {
      font-weight: 400;
      font-size: 0.75rem;
      text-align: center;
      color: #adadad;
      margin: 10px 30px;
    }

    button {
      ${
        "" /*first*/ /* background: linear-gradient(-45deg, #6713d2, #FF0C67, #338AFF, #6713d2);  */
      }
      background: linear-gradient(-45deg, /*#FCB69F,*/#c90076,#662D8C,/*#ED1E79,*/#FCB69F,#c90076,#ED1E79/*,#FCB69F*/);
      /* ,white=#FCB69F, #3F0BDB, #FF0C67,#338AFF ,#FFA63D, new -> #6713d2, #00dbde, #9600FF, #F6EA41*/
      background-size: 600%;
      left: 4.3%;
      width: 80%;
      border-radius: 10px;
      margin: 10px 20px;
      font-weight: 600;
      font-size: 19px;
      text-transform: none;
      color: #fff;
      font-family: "Poppins", sans-serif;
      text-decoration: none;
      padding: 10px 0;
      position: relative;
      animation: anime 9s linear infinite;
      img {
        width: 28px;
        height: 28px;
        margin-right: 5px;
      }
    }
    button:hover {
      transform: translateY(-5px);
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

export default ButtonCard;
