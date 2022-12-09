import React from "react";
import NewStoreNotFoundCard from "../../../components/NewStoreNotFoundCard";
// import { apiContext } from "../../../config/RouterConfig";

const StoreNotFound = () => {
  // const apiValue = useContext(apiContext);

  return (
    <div className="h-[100vh] bg-[#000000] lg:w-[40vw]">
      <NewStoreNotFoundCard />
    </div>
  );
};

export default StoreNotFound;
