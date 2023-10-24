import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../constants/ROUTES";
import cartHandle from "../../utils/handle/handleTotalCartItem";
import { checkout } from "../../redux/slice/cart/cart.slice";

import ModalForSelectAddressCheckout from "./ModalForSelectAddressCheckout";
import ModalViewCheckout from "./ModalViewCheckout";

const Checkout = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalView, setOpenModalView] = useState(false);
  const [shipAddress, setShipAddress] = useState("");
  const [confirm, setConfirm] = useState(false);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    const cartList = cartHandle.handleCartCheckout(data);
    if (cartList?.length === 0) {
      setError("Please select cart item");
    } else {
      setError("");
    }
  }, [data]);

  const handleChangeShipAddress = (value) => {
    setShipAddress(value);
  };

  const handleToggleOpenModal = (value) => {
    setOpenModal(value);
  };

  const handleToggleOpenModalView = (value) => {
    setOpenModalView(value);
  };

  const handleToggleConfirm = (value) => {
    setConfirm(value);
  };

  const handleCheckout = () => {
    const cartList = cartHandle.handleCartCheckout(data);
    if (cartList?.length !== 0) {
      if (userData?.address?.length !== 0) {
        handleToggleOpenModal(true);
      } else {
        navigate(ROUTES.USER.ACCOUNT.ADDRESS_CREATE);
      }
    }
  };

  const handleConfirmCheckout = () => {
    const checkoutRequest = {
      shipAddress,
      listCartId: cartHandle.handleCartCheckout(data),
    };
    dispatch(
      checkout({
        checkoutRequest,
        callback: {
          openModalViewCheckout: () => handleToggleOpenModalView(true),
        },
      })
    );
  };

  return (
    <div className="w-full h-24 flex justify-end items-center bg-slate-100 p-4 rounded">
      <div className="flex justify-center items-center gap-4">
        {error ? <span className="text-primary">{error}</span> : ""}
        {error ? (
          <button className="text-primary bg-white px-4 py-2 rounded">
            Checkout
          </button>
        ) : confirm ? (
          <button
            onClick={() => handleConfirmCheckout()}
            className="text-white bg-primary px-4 py-2 rounded"
          >
            Confirm
          </button>
        ) : (
          <button
            onClick={() => handleCheckout()}
            className="text-white bg-primary px-4 py-2 rounded"
          >
            Checkout
          </button>
        )}
        <ModalForSelectAddressCheckout
          openModal={openModal}
          handleToggleOpenModal={handleToggleOpenModal}
          handleChangeShipAddress={handleChangeShipAddress}
          handleToggleConfirm={handleToggleConfirm}
        />
        <ModalViewCheckout
          openModalView={openModalView}
          shipAddress={shipAddress}
          handleToggleOpenModalView={handleToggleOpenModalView}
        />
      </div>
    </div>
  );
};

export default Checkout;
