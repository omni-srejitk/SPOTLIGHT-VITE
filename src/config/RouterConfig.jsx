import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationDenyPage from "../components/LocationDenyPage";
import { Error } from "../routes/404/Error";
import Brand from "../routes/Brand/Brand";
import Home from "../routes/Home/Home";
import { Stores } from "../routes/Stores/Stores";

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:brand" element={<Brand />} />
      <Route path="/:brand/Stores" element={<Stores />} />
      <Route path="/:brand/Location_Denied" element={<LocationDenyPage />} />
      <Route path="/:brand/*" element={<Error />} />
    </Routes>
  );
};
