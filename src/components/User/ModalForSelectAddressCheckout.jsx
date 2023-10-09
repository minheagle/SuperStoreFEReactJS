import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd";

const ModalForSelectAddressCheckout = ({
  openModal,
  handleToggleOpenModal,
  handleChangeShipAddress,
  handleToggleConfirm,
}) => {
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const options = userData?.address.map((item) => {
    return {
      value: item.id,
      label: item.addressName,
    };
  });

  const handleOnChangeAddress = (value) => {
    const address = userData?.address.find((item) => item.id === value);
    handleChangeShipAddress(address.addressName);
  };

  return openModal ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="relative w-1/2 flex flex-col justify-start items-center gap-4 bg-white p-8 rounded">
        <button
          onClick={() => handleToggleOpenModal(false)}
          className="absolute top-0 right-0 w-6 h-6 text-white bg-red-600 rounded"
        >
          <FontAwesomeIcon icon="fas fa-times" />
        </button>
        <div className="w-full flex justify-center items-center">
          <span>Select your ship address</span>
        </div>
        <div className="w-full">
          <Select
            options={options}
            onChange={(value) => handleOnChangeAddress(value)}
            className="w-full"
          />
        </div>
        <div className="w-full flex justify-end items-center">
          <button
            onClick={() => {
              handleToggleConfirm(true);
              handleToggleOpenModal(false);
            }}
            className="w-20 h-8 bg-primary text-white rounded"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalForSelectAddressCheckout;
