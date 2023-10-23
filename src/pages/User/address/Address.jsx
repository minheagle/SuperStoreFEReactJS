import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ROUTES from "../../../constants/ROUTES";

const Address = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleCloseCreateModal = (value) => {
    setOpenModalCreate(value);
  };

  const handleChangeCheckedValue = (value) => {
    setCheckedValue(value);
  };

  const handleChangeAddressChecked = (value) => {
    setAddressChecked(value);
  };

  const handleToggleUpdateState = (value) => {
    setIsUpdate(value);
  };

  const handleAddressName = (addressName) => {
    const arrayAddress = addressName.split(", ");
    const addressObject = {
      wardName: arrayAddress[1],
      districtName: arrayAddress[2],
      provinceName: arrayAddress[3],
    };
    handleChangeCheckedValue(addressObject);
    handleChangeAddressChecked(arrayAddress[0]);
  };

  const handleRenderAddress = () => {
    return userData?.address?.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full flex justify-between items-center border border-slate-300 p-4 rounded"
        >
          <div>{item.addressName}</div>
          <div className="flex justify-end items-center gap-4">
            <Link
              to={generatePath(ROUTES.USER.ACCOUNT.ADDRESS_UPDATE, {
                addressId: item.id,
              })}
              className="w-24 h-10 flex justify-center items-center text-white bg-blue-600 rounded"
            >
              Edit
            </Link>
            {/* <button className="w-24 h-10 text-white bg-red-600 rounded">
              Delete
            </button> */}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white rounded pt-4">
      <div className="w-full flex justify-end items-center pr-8">
        <Link
          to={ROUTES.USER.ACCOUNT.ADDRESS_CREATE}
          className="flex justify-center items-center gap-2 px-4 py-2 text-white bg-primary rounded"
        >
          <FontAwesomeIcon icon="fas fa-plus" />
          <span>Add</span>
        </Link>
      </div>
      {userData?.address?.length === 0 || !userData?.address ? (
        <div className="w-full flex flex-col justify-start items-center gap-4 pt-4">
          <FontAwesomeIcon
            icon="fas fa-store"
            className="text-6xl text-primary"
          />
          <span>Address is empty !</span>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-center gap-2 pt-4 p-4">
          {handleRenderAddress()}
        </div>
      )}
    </div>
  );
};

export default Address;
