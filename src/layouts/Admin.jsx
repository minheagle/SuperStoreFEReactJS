import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Header from "../components/Admin/Header";
import Navbar from "../components/Admin/Navbar";

const Admin = () => {
  const { isOpen } = useSelector((state) => state.UIAdmin.navbar);
  return (
    <div className="relative w-full flex bg-slate-300 min-h-screen">
      <Navbar />
      <div
        className={`relative flex flex-col flex-1 ${
          isOpen ? "w-with-navbar" : "w-full"
        }`}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
