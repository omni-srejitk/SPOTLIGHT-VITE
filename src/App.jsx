import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Home from "./Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Brand from "./Brands/Brand";
// import BrandStores from "./conditions/iflocationallow/brandsStore/BrandStores";
import BrandStores from "./conditions/iflocationallow/brandsStore/BrandStores";
import LocationDenyPage from "./conditions/iflocationdeny/LocationDenyPage";
import StoreNotFound from "./conditions/iflocationallow/brandsStoreNotFound/StoreNotFound";
import { RouterConfig } from "./config/RouterConfig";

function App() {
  return <RouterConfig />;
}

export default App;
