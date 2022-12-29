import { AnimatePresence } from "framer-motion";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LocationDenied } from "../routes/LocationDenied/LocationDenied";
import { Error } from "../routes/404/Error";
import Brand from "../routes/Brand/Brand";
import Home from "../routes/Home/Home";
import { Stores } from "../routes/Stores/Stores";

export const RouterConfig = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location?.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/:brand" element={<Brand />} />
        <Route path="/:brand/Stores" element={<Stores />} />
        <Route path="/:brand/Location_Denied" element={<LocationDenied />} />
        <Route path="/:brand/*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
};
