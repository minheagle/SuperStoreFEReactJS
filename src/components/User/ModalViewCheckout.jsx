import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import cartHandle from "../../utils/handle/handleTotalCartItem";
import ROUTES from "../../constants/ROUTES";
import { saveOrder } from "../../redux/slice/cart/cart.slice";

import CartItemCheckout from "./CartItemCheckout";

const ModalViewCheckout = ({
  openModalView,
  shipAddress,
  handleToggleOpenModalView,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const { data } = useSelector((state) => state.Cart.checkout);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const findAddress = () => {
    const find = userData?.address?.find(
      (item) => item.addressName === shipAddress
    );
    return find;
  };

  const handleCartForOrder = (data) => {
    return data?.map((item) => {
      const listCartId = item.cartResponse.lineItems.map((cart) => cart.cartId);
      const shipMoney = item.shipMoney ? item.shipMoney : 0;
      const sellerId = item.cartResponse.seller.id;
      return { sellerId, cartId: listCartId, shipMoney };
    });
  };

  const totalItemAndPrice = cartHandle.handleTotalItemsAndTotalPrice(data);

  const handleChangePayment = (e) => {
    const value = e.target.value;
    setPayment(value);
  };

  const handleRenderCartItem = () => {
    return data?.map((item) => {
      return (
        <div
          key={item}
          className="w-full flex justify-start items-center gap-4 border border-slate-300 rounded"
        >
          <CartItemCheckout item={item} />
        </div>
      );
    });
  };

  const handleMakeOrder = () => {
    const getAddress = findAddress();
    if (payment !== null) {
      const paymentStatus = payment === "BANK_PAYMENT" ? true : false;
      dispatch(
        saveOrder({
          orderRequest: {
            addressId: getAddress.id,
            userId: userData.id,
            listOrderBelongToSeller: handleCartForOrder(data),
            paymentStatus,
          },
          callback: {
            goToOrder: () => navigate(ROUTES.USER.PURCHASE),
          },
        })
      );
    }
  };

  return openModalView ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="relative w-1/2 max-h-[32rem] flex flex-col justify-start items-center gap-4 bg-white rounded overflow-y-scroll">
        <div className="sticky top-0 right-0 w-full flex justify-end items-center">
          <button
            onClick={() => handleToggleOpenModalView(false)}
            className="w-6 h-6 text-white bg-red-600 rounded"
          >
            <FontAwesomeIcon icon="fas fa-times" />
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4 px-8">
          <div className="w-full h-12 flex justify-start items-center bg-slate-100 rounded">
            <div className="w-1/2 pl-4">
              <span className="">Product</span>
            </div>
            <div className="w-1/2 flex justify-around items-center">
              <div>
                <span>Unit Price</span>
              </div>
              <div>
                <span>Quantity</span>
              </div>
              <div>
                <span>Total Price</span>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {handleRenderCartItem()}
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-4 p-4 bg-slate-100 rounded">
            <div className="w-full flex justify-start items-center">
              <span className="shrink-0">Ship Address : </span>
            </div>
            <div className="w-full flex justify-start items-center">
              <span className="flex-1">{shipAddress}</span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-4 p-4 bg-slate-100 rounded">
            <div className="w-full flex justify-start items-center">
              <span className="">Payment : </span>
            </div>
            <div className="w-full flex justify-start items-center">
              <select
                name=""
                id=""
                onChange={(e) => handleChangePayment(e)}
                value={payment}
                className="w-1/2 h-8 border border-slate-300 outline-none rounded"
              >
                <option value="SHIP_COD">SHIP_COD</option>
                <option value="BANK_PAYMENT">BANK_PAYMENT</option>
              </select>
            </div>
          </div>

          <div className="w-full flex flex-col justify-start items-center gap-4 bg-slate-100 rounded p-4">
            <div className="w-full h-12 flex justify-end items-center gap-4">
              <div>
                <span>Total items: </span>
                <span>{totalItemAndPrice.totalItems}</span>
              </div>
              <div>
                <span>Total price: </span>
                <span>{totalItemAndPrice.totalPrice.toLocaleString()} VNĐ</span>
              </div>
            </div>
            <div className="w-full h-12 flex justify-end items-center">
              <button
                onClick={() => handleMakeOrder()}
                className="text-white bg-primary px-4 py-2 rounded"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalViewCheckout;
