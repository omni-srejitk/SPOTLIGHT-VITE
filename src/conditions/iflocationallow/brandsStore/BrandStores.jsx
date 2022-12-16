import React from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import NewStoreFoundCard from "../../../components/NewStoreFoundCard";
import { Carousal } from "../../../components/Carousal";

const BrandStores = () => {
  return (
    <div>
      <Header />
      <NewStoreFoundCard signal={signal} />
      <Carousal />
      <Footer />
    </div>
  );
};

export default BrandStores;
