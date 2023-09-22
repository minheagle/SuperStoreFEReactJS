import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Public/Header";
import Footer from "../components/Public/Footer";
import AboutShop from "../components/Shop/AboutShop";

const Shop = () => {
  return (
    <div className="relative w-full flex flex-col justify-start items-center bg-slate-50">
      <Header />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-12">
          <AboutShop />
        </div>
        <div className="col-span-12 grid grid-cols-12">
          <div className="col-span-1"></div>
          <div className="col-span-10">
            <Outlet />
          </div>
          <div className="col-span-1"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
