import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Public/Header.jsx";
import Footer from "../components/Public/Footer.jsx";
import Navbar from "../components/User/Navbar.jsx";

const User = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center bg-slate-50">
      <Header />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-10 grid grid-cols-5 p-4">
          <div className="col-span-1">
            <Navbar />
          </div>
          <div className="col-span-4">
            <Outlet />
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
