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
    <div className="bg-[#613DE5] p-2 pt-[3rem] m-[5%] rounded-lg relative w-[90%] h-[60vh] min-h-[480px] sm:h-[27rem]">
      <img
        src="/new left dots.svg"
        className="absolute left-[0%] top-[2%] h-[93%]"
      />
      <img
        src="/new right dots.svg"
        className="absolute right-[0%] top-[2%] h-[93%]"
      />
      <img
        src="/new star.svg"
        className="absolute left-[-4%] top-[-3%] w-[17%]"
      />
      <img
        src="/new 2 stars.svg"
        className="absolute right-[15%] top-[2%] w-[13%]"
      />

      <div className="w-[100px] h-[100px] bg-white border-[1px] border-black mx-[25%] flex justify-center items-center rounded-[50px] sm:mx-[30%]">
        <div className="bg-black w-[64px] h-[64px] flex justify-center items-center rounded-[32px]">
          <img
            className=" w-[34px] h-[34px]"
            src="/spotlight white.svg"
            alt="/"
          />
        </div>
      </div>
      {/* flex justify-center items-center */}
      <div className="w-[100px] h-[100px] bg-white flex justify-center items-center  rounded-[50px] border-[1px] border-black z-10 absolute left-[49%] top-[10%] sm:w-[22%]">
        {/* <div className=" w-[64px] h-[64px] bg-black rounded-[32px]"> */}
        <img className=" w-[64px] h-[64px] " src={data.brandLogo} alt="/" />
        {/* </div> */}
      </div>

      <p className="text-[1.45rem] text-center mt-8">
        <span className="font-bold">{brand.brandName} </span> is now
      </p>
      <p className="text-center text-[1.45rem] mt-[-0.45rem]">
        on <span className=" font-bold">Spotlight</span>
      </p>

      <hr className=" rounded border-t-2 w-[50%] mx-auto mt-1 border-[white]" />

      <p className="mt-4 w-[80%] m-auto text-center text-[1.1rem]">
        Visit the nearest store
      </p>
      <p className="w-[80%] m-auto text-center mt-[-0.2rem]">
        for exclusive deals
      </p>

      <input
        className="bg-[#573480] w-[65%] block mx-auto mt-6 p-2 pl-4 top-[70%] left-[18%] rounded-lg"
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        placeholder="Enter your location"
      />

      <button
        className="bg-[#FCD439] text-black px-3 py-4 block w-[65%] m-auto rounded-lg text-center mt-3 font-semibold text-[1.1rem]"
        onClick={() => {
          handleSubmit();
        }}
        id="button"
      >
        Find a store near me
        <ArrowForwardIcon fontSize="small" />
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

// {/* <input
//         className="bg-[#573480] absolute w-[63%] block mx-auto p-2 top-[70%] left-[18%] rounded-lg"
//         type="text"
//         value={place}
//         onChange={(e) => setPlace(e.target.value)}
//         placeholder="Enter your location"
//       />

//       <button
//         className="bg-[#FCD439] text-black px-4 py-4 pt-3 block w-[65%] m-auto rounded-lg text-center absolute top-[82%] left-[17%] "
//         onClick={() => handleSubmit()}
//       >
//         Find a store near me <ArrowForwardIcon fontSize="small" />{" "}
//       </button> */}

{
  /* <button
className="bg-[#FCD439] text-black px-3 py-4 block w-[65%] m-auto rounded-lg text-center mt-12 font-semibold text-[1.1rem]"
onClick={() => {
  // showModal();
  // setModalCondition(true);
  // {
  //   modalcondition ? showModal() : ShowLocationPopUp();
  // }
  ShowLocationPopUp();
}}
id="button"
>
Find a store near me
<ArrowForwardIcon fontSize="small" />
{/* <ButtonAnimationComponent /> */
}
// </button>
// {modalcondition ? showModal() : ""} */}
