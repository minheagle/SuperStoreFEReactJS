import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../components/Public/Header.jsx";
import Footer from "../components/Public/Footer.jsx";
import Chat from "../components/common/Chat.jsx";
import Navbar from "../components/User/Navbar.jsx";

const User = () => {
  return (
    <div className="relative w-full flex flex-col justify-start items-center bg-slate-50">
      <Header />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-10 grid grid-cols-5">
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
      <Chat />
      <ToastContainer />
    </div>
  );
};

export default User;
