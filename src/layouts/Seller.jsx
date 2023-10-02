import { Outlet } from "react-router-dom";

import Header from "../components/Public/Header";
import Footer from "../components/Public/Footer";
import Navbar from "../components/Seller/Navbar";

const Seller = () => {
  return (
    <div className="relative w-full flex flex-col justify-start items-center bg-slate-50">
      <Header />
      <div className="w-full grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-10 grid grid-cols-5 py-4">
          <div className="col-span-1">
            <Navbar />
          </div>
          <div className="col-span-4 z-10">
            <Outlet />
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Seller;
