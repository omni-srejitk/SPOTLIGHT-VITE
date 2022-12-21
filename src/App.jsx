import "./App.css";
import React, { createContext, useState } from "react";
import { RouterConfig } from "./config/RouterConfig";
import { QueryClient, QueryClientProvider } from "react-query";
export const distanceContext = createContext();

const queryClient = new QueryClient()


function App() {
  const [storeDetails, setStoreDetails] = useState({
    information: {},
    distance: 0,
    storeName: "",
  });

  return (
    <QueryClientProvider client={queryClient}>
    <distanceContext.Provider value={{ storeDetails, setStoreDetails }}>
      <RouterConfig className="m-0 p-0" />
    </distanceContext.Provider>
    </QueryClientProvider>
  );
}
export default App;
