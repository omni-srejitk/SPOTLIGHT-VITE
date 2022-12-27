import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [storeDetails, setStoreDetails] = useState({
    information: {},
    distance: 0,
    storeName: "",
  });
  return (
    <StoreContext.Provider value={{ storeDetails, setStoreDetails }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, useStore };
