import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Brand from "../Brands/Brand";
import BrandStores from "../conditions/iflocationallow/brandsStore/BrandStores";
import LocationDenyPage from "../conditions/iflocationdeny/LocationDenyPage";
import StoreNotFound from "../conditions/iflocationallow/brandsStoreNotFound/StoreNotFound";

export const RouterConfig = () => {
  return (
    <div className="my-0 mx-auto  bg-[#000000] p-0 text-[white] sm:max-w-[30rem]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:brandName" element={<Brand />}></Route>
          <Route
            path={encodeURI(`:brandName/Stores`)}
            element={<BrandStores />}
          ></Route>
          <Route
            path={encodeURI(`:brandName/Location_denied`)}
            element={<LocationDenyPage />}
          ></Route>
          <Route
            path={encodeURI(`:brandName/Store_Not_Found`)}
            element={<StoreNotFound />}
          ></Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};
