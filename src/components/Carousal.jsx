import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";

export const Carousal = ({ data }) => {
  let brand = useParams();

  const Story = decodeURIComponent(data?.story);
  const modifiedStory = Story.split("!").join(".").split(".");
  const slicedArray = modifiedStory.slice(0, 2);
  modifiedStory.splice(0, 2);

  return (
    <div className=" text-[black] text-[1.05rem] p-2 flex h-[250px] w-[93%]  justify-start overflow-x-auto gap-4 no-scrollbar m-[2%] bg-[black]">
      <div className="h-[100%] min-w-[70%] bg-[#FAE77D] text-center z-10 border-0 outline-none rounded-xl relative">
        <div className="absolute top-0 right-0 w-auto z-0">
          <img src="/images/Union Rings.png" />
        </div>
        <div className="ml-[10%] mt-[7%] w-[80%] h-[27%] flex flex-row mb-[5%] items-center justify-start">
          <div className="w-[70px] h-[70px] bg-white flex justify-center items-center  rounded-[35px] border-[1px] border-black z-10 ">
            <img className=" w-[40px] h-[40px] " src={data.brandLogo} alt="/" />
          </div>
          {/* <div className="w-[33%] h-[100%] p-[3px] bg-white rounded-[50%] border-[1px] border-black mr-4">
            <img className="w-[100%] h-[100%]" src={data?.brandLogo} alt="/" />
          </div> */}
          <p className="text-[1.25rem] text-[black] font-semibold z-10 ml-3">
            {brand.brandName}
          </p>
        </div>
        <p className="">{slicedArray[0]}.</p>
        <div className="absolute bottom-0 left-0 w-[10rem] z-0">
          <img src="/images/yellow bar.png" />
        </div>
      </div>

      {/* <div className="w-[100px] h-[100px] bg-white flex justify-center items-center  rounded-[50px] border-[1px] border-black z-10 absolute left-[49%] top-[10%] sm:w-[22%]">
        
        <img className=" w-[64px] h-[64px] " src={data.brandLogo} alt="/" />
      </div> */}
      {/* <div className='p-10 pr-16 pt-6 h-[100%] bg-[#FAE77D] z-10 border-0 outline-none rounded-xl'>
          <div className='absolute top-0 right-0 w-[7rem] z-0'>
            <img src='/images/Union Rings.png'/>
          </div>           
            <p className='text-[1.25rem] text-[black] font-semibold mb-[1rem]'>Happy Customer</p>        
          <p className=''>{slicedArray[1]}.</p>
          <div className='absolute bottom-0 left-0 w-[10rem] z-0'>
            <img src='/images/yellow bar.png'/>
          </div>
        </div> */}

      {/* <div className='p-10 pr-16 h-[100%] bg-[#FAE77D] text-center flex items-center justify-center z-10'>{slicedArray[1]}</div> */}

      {modifiedStory.map((str) => {
        return (
          <div className=" h-[100%] relative min-w-[70%] ">
            <div className="absolute top-0 right-0 w-auto z-0">
              <img src="/images/Union Rings.png" />
            </div>
            <div className="p-2 h-[100%] bg-[#FAE77D] text-center flex items-center justify-center border-[white] rounded-xl border-[2px]">
              <span className="z-[2] relative">{str}.</span>
            </div>
            <div className="absolute bottom-0 w-[90%] z-3">
              <img src="/images/yellow bar.png" />
            </div>
          </div>
        );
      })}
      {/* </Carousel> */}
    </div>
  );
};
//  w-[10rem] centerMode={true}  ={true} min-h-[20rem] min-h-[20rem] 32rem border-[white] rounded-xl

// {modifiedStory.map(str => {
//   return (
//     <div className='h-[100%] relative'>
//       <div className='absolute top-0 right-0 w-[7rem] z-0'>
//         <img src='/images/Union Rings.png'/>
//       </div>
//       <div className='p-10 pr-16 h-[100%] bg-[#FAE77D] text-center flex items-center justify-center border-[white] border-[2px] rounded-xl relative'><span className='z-[2]'>{str}.</span></div>
//       <div className='absolute bottom-0 w-[10rem] z-0'>
//         <img src='/images/yellow bar.png'/>
//       </div>
//     </div>
//   )
// })}
