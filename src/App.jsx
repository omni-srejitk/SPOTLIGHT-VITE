import "./App.css";
import React, { createContext, useState } from "react";
import { RouterConfig } from "./config/RouterConfig";
export const distanceContext = createContext();

function App() {
  const [storeDetails, setStoreDetails] = useState({
    information: {},
    distance: 0,
    storeName: "",
  });

  return (
    <distanceContext.Provider value={{ storeDetails, setStoreDetails }}>
      <RouterConfig className="m-0 p-0" />
    </distanceContext.Provider>
  );
}
export default App;
