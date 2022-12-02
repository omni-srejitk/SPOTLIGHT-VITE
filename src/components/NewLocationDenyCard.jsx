import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const NewLocationDenyCard = ({ data, onSubmit }) => {
  const [place, setPlace] = useState("");
  let brand = useParams();

  console.log(place);
  const handleSubmit = () => {
    // e.preventDefault();
    onSubmit(place);
  };

  return (
    <div className="bg-[#8732E9] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem]">
      <img
        src="/images/Left Dots.png"
        className="absolute left-[0%] top-[2%] h-[93%]"
      />
      <img
        src="/images/Right Dots.png"
        className="absolute right-[2%] top-[2%] h-[93%]"
      />
      <img
        src="/images/star.png"
        className="absolute left-[-4%] top-[-3%] w-[17%]"
      />
      <img
        src="/images/2 stars.png"
        className="absolute right-[15%] top-[3%] w-[13%]"
      />

      <div className="w-[25%] h-[18%] bg-white p-[3.5%] rounded-[50%] border-[1px] border-black left-[30%] top-[10.5%] absolute">
        <img
          className=" w-[100%] h-[100%]"
          src="/images/new Logo.png"
          alt="/"
        />
      </div>

      <div className="w-[25%] h-[18%] bg-white p-[3%] rounded-[50%] border-[1px] border-black z-10 absolute left-[49%] top-[10.5%]">
        <img className=" w-[100%] h-[100%] " src={data.brandLogo} alt="/" />
      </div>

      <hr className="w-[50%] mx-auto my-[63%]" />
      <p className="text-[1.2rem] text-center absolute top-[36%] left-[30%] sm:left-[35%]">
        <span className="font-bold">{brand.brandName} </span> is now
      </p>
      <p className="text-center text-[1.2rem] absolute top-[43%] left-[32%] sm:left-[37%]">
        on <span className=" font-bold">Spotlight</span>
      </p>

      <p className="w-[50%] m-auto absolute top-[56%] left-[25%]">
        Visit the nearest store
      </p>
      <p className="w-[50%] m-auto absolute top-[61%] left-[28%]">
        for exclusive deals{" "}
      </p>

      <input
        className="bg-[#573480] absolute w-[63%] block mx-auto p-2 top-[70%] left-[18%] rounded-lg"
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Enter your location"
      />

      <button
        className="bg-[#FCD439] text-black px-4 py-4 pt-3 block w-[65%] m-auto rounded-lg text-center absolute top-[82%] left-[17%] "
        onClick={() => handleSubmit()}
      >
        Find a store near me <ArrowForwardIcon fontSize="small" />{" "}
      </button>
    </div>
  );
};
export default NewLocationDenyCard;

// {brandData && brandData.stores ? (
//   <div className="card">
//     <p className="distance">{brandData.stores[0].storeDistance}km Away</p>
//     <p className="name">{brandData.stores[0].storeName}</p>
//     <p className="location">Bengaluru</p>
//     <Button onClick={openGoogleByMethod}>
//       <img src="../images/location.svg" alt="icon" />
//       <span>Take me there</span>
//     </Button>
//   </div>
// ) : (
//   <div className="card">
//     <p>Just a second</p>
//   </div>
// )}
