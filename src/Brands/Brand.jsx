import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MainButton } from "../components/MainButton";
import { Modal } from "../components/Modal";
//importing components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carousal } from "../components/Carousal";
import { LoadComponent } from "../components/LoadComponent";
import { NewModalLocationDeny } from "../components/NewModalLocationDeny";

const Brand = (props) => {
  const brand = useParams();
  const brandDetailURL = `https://api.omniflo.in/getbranddata?brandname=${brand.brandName}`;

  useEffect(() => {
    axios.get(`${brandDetailURL}`).then((resp) => {
      props.brandName(resp.data);
      // console.log(resp.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let [isOpen, setIsOpen] = useState(true);
  const [locDeny, setLocDeny] = useState(false);

  return (
    //Rendering the Brand Page
    <div className="bg-[#000000] ">
      {/* // <div className="max-w-[500px] bg-[#000000] text-[white] my-0 mx-auto p-0"> */}
      <div>
        {props.data.brandLogo ? (
          <>
            {locDeny ? (
              <NewModalLocationDeny />
            ) : (
              <>
                <Header />
                <MainButton
                  data={props.data}
                  locDeny={locDeny}
                  setLocDeny={setLocDeny}
                />
                <Carousal data={props.data} />
                {/* <LoadComponent /> */}
                <Footer />
              </>
            )}
          </>
        ) : (
          <LoadComponent />
        )}
      </div>
    </div>
  );
};
export default Brand;

// {/* <button onClick={() => setIsOpen(true)}>Open Modal</button>
// <Modal open={isOpen} onClose={() => setIsOpen(false)}>
//   Fancy Modal
// </Modal> */}
