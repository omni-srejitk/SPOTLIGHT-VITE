import React, { useContext } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";
import { newContext } from "../../../App";

const BrandStores = () => {
  const newValue = useContext(newContext);

  return (
    <div>
      <Header />
      <NewStoreFoundCard data={newValue.info} />
      <Carousal data={newValue.info} />
      <Footer />
    </div>
  );
};

export default BrandStores;
