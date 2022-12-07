import React, { useContext } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";
import { apiContext } from "../../../config/RouterConfig";

const BrandStores = () => {
  const apiValue = useContext(apiContext);

  return (
    <div>
      <Header />
      <NewStoreFoundCard data={apiValue} />
      <Carousal data={apiValue} />
      <Footer />
    </div>
  );
};

export default BrandStores;
