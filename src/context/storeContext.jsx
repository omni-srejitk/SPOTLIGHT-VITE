import React, { createContext, useContext, useState } from "react";
import StoreNotFound from "../conditions/iflocationallow/brandsStoreNotFound/StoreNotFound";

const StoreContext = createContext();

const useStore = () => useContext(StoreNotFound)

const [storeDetails, setStoreDetails] = useState({
    information: {},
    distance: 0,
    storeName: "",
  });

const StoreProvider = ({children}) =>{
    return <StoreContext.Provider value={{storeDetails, setStoreDetails}}>{children}</StoreContext.Provider>

} 


export default { StoreProvider, useStore}