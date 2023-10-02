import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import ROUTES from "../constants/ROUTES";
import ROLES from "../constants/ROLES";
import handleRoles from "../utils/handle/handleRoles.js";

import Header from "../components/Admin/Header";
import Navbar from "../components/Admin/Navbar";

const Admin = () => {
  const { isOpen } = useSelector((state) => state.UIAdmin.navbar);
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (accessToken) {
    if (!handleRoles.checkRole(ROLES.ADMIN, userData.roles)) {
      return <Navigate to={ROUTES.PUBLIC.HOME} />;
    }
  } else {
    return <Navigate to={ROUTES.PUBLIC.LOGIN} />;
  }
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
