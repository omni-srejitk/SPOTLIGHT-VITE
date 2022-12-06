//importing dependencies
import React, { useContext } from "react";
import NewStoreNotFoundCard from "../../../components/NewStoreNotFoundCard";
import { apiContext } from "../../../config/RouterConfig";

const StoreNotFound = () => {
  const apiValue = useContext(apiContext);
  console.log("apiValue", apiValue);

  return (
    <div className="bg-[#000000] h-[100vh] lg:w-[40vw]">
      <NewStoreNotFoundCard data={apiValue} />
    </div>
  );
};

export default StoreNotFound;
