import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import ROUTES from "../../constants/ROUTES";

const Navbar = () => {
  const { data } = useSelector((state) => state.Auth.information);
  const navbarList = [
    {
      id: 1,
      title: "My Account",
      icon: "fas fa-user",
      path: ROUTES.USER.ACCOUNT.PROFILE,
      child: [
        { id: 1, title: "Profile", path: ROUTES.USER.ACCOUNT.PROFILE },
        { id: 2, title: "Payment", path: ROUTES.USER.ACCOUNT.PAYMENT },
        { id: 3, title: "Address", path: ROUTES.USER.ACCOUNT.ADDRESS },
        {
          id: 4,
          title: "Change password",
          path: ROUTES.USER.ACCOUNT.CHANGE_PASSWORD,
        },
        {
          id: 5,
          title: "Notification Setting",
          path: ROUTES.USER.ACCOUNT.SETTING_NOTIFICATION,
        },
      ],
    },
    {
      id: 2,
      title: "Cart",
      icon: "fas fa-shopping-cart",
      path: ROUTES.USER.CART,
      child: [],
    },
    {
      id: 3,
      title: "Order",
      icon: "fas fa-newspaper",
      path: ROUTES.USER.PURCHASE.DEFAULT,
      child: [],
    },
    {
      id: 4,
      title: "Notification",
      icon: "fas fa-bell",
      path: ROUTES.USER.NOTIFICATION,
      child: [
        { id: 1, title: "Update Order", path: ROUTES.USER.NOTIFICATION_ORDER },
        { id: 2, title: "Promotion", path: ROUTES.USER.NOTIFICATION_PROMOTION },
        { id: 3, title: "Wallet", path: ROUTES.USER.NOTIFICATION_WALLET },
      ],
    },
    {
      id: 5,
      title: "Voucher",
      icon: "fas fa-gift",
      path: ROUTES.USER.VOUCHER_WALLET.LIST,
      child: [
        { id: 1, title: "List", path: ROUTES.USER.VOUCHER_WALLET.LIST },
        {
          id: 2,
          title: "Available",
          path: ROUTES.USER.VOUCHER_WALLET.AVAILABLE,
        },
      ],
    },
  ];

  const styleActiveNavbar = "bg-primary text-white rounded";

  const handleRenderChildNavbar = (child) => {
    return child.map((item) => {
      return (
        <NavLink
          key={item.id}
          to={item.path}
          end
          className="w-full flex justify-start items-center hover:bg-primary hover:text-white hover:rounded"
        >
          {({ isActive }) => (
            <div
              className={`w-full flex justify-start items-center p-2 ${
                isActive ? styleActiveNavbar : ""
              }`}
            >
              {item.title}
            </div>
          )}
        </NavLink>
      );
    });
  };

  const handleRenderNavbar = () => {
    return navbarList.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full flex flex-col justify-start items-center gap-2"
        >
          <NavLink
            to={item.path}
            className="group w-full flex justify-center items-center hover:bg-primary hover:text-white hover:rounded"
          >
            {({ isActive }) => (
              <div
                className={`w-full flex justify-start items-center gap-2 p-2 ${
                  isActive ? styleActiveNavbar : ""
                }`}
              >
                {item.icon ? (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-xl text-primary group-hover:text-white ${
                      isActive ? "text-white" : ""
                    }`}
                  />
                ) : (
                  ""
                )}
                <span>{item.title}</span>
              </div>
            )}
          </NavLink>
          {item.child ? (
            <div className="w-full flex flex-col justify-start gap-2 pl-6">
              {handleRenderChildNavbar(item.child)}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full flex justify-between items-center">
        <div className="w-12 h-12 flex justify-center items-center border border-slate-300 rounded-full">
          {data?.imageUrl ? (
            <img
              src={data.imageUrl}
              alt=""
              className="object-cover w-12 h-12 rounded-full"
            />
          ) : (
            <FontAwesomeIcon
              icon="fas fa-user"
              className="text-2xl text-slate-300"
            />
          )}
        </div>
        <div className="flex flex-col justify-start content-start">
          <span className="font-semibold">
            {data?.userName ? data.userName : "Undefined"}
          </span>
          <div className="flex justify-start items-center gap-2">
            <FontAwesomeIcon
              icon="fas fa-edit"
              className="text-xl text-slate-300"
            />
            <span className="text-slate-300">Edit profile</span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full flex flex-col justify-start items-center">
          {handleRenderNavbar()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
