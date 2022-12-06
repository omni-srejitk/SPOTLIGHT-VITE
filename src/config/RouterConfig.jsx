import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Brand from "../Brands/Brand";
import BrandStores from "../conditions/iflocationallow/brandsStore/BrandStores";
import LocationDenyPage from "../conditions/iflocationdeny/LocationDenyPage";
import StoreNotFound from "../conditions/iflocationallow/brandsStoreNotFound/StoreNotFound";
export const apiContext = createContext();

export const RouterConfig = () => {
  const [data, setData] = useState({});

  return (
    <div className="max-w-[500px] bg-[#000000] text-[white] my-0 mx-auto p-0">
      <apiContext.Provider value={data}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route
              path="/:brandName"
              element={<Brand data={data} brandName={setData} />}
            ></Route>

            <Route
              path={encodeURI(`:brandName/Stores`)}
              // Todo => check if it is doing ok regarding props
              element={<BrandStores />}
            ></Route>
            <Route
              path={encodeURI(`:brandName/Location_denied`)}
              element={<LocationDenyPage data={data} />}
            ></Route>
            <Route
              path={encodeURI(`:brandName/Store_Not_Found`)}
              element={<StoreNotFound />}
            ></Route>
            {/* </Route> */}
          </Routes>
        </Router>
      </apiContext.Provider>
    </div>
  );
};
