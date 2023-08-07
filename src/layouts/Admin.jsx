import { Outlet } from "react-router-dom";
import Header from "../components/Admin/Header";
import BreadCum from "../components/Admin/Breadcum";
import Navbar from "../components/Admin/Navbar";

const Admin = () => {
  return (
    <div className="flex bg-slate-300 min-h-screen">
      <Navbar />
      <div className="flex flex-col flex-1">
        <Header />
        <BreadCum />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
