import React from "react";
import { useDispatch } from "react-redux";

import { getLinkPayment } from "../../../redux/slice/user/order.user.slice";

import OrderItem from "./OrderItem";

const OrderSameNumber = ({ data }) => {
  const dispatch = useDispatch();

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const getTotalAmount = () => {
    let totalAmount = 0;
    data?.data?.forEach((item) => {
      totalAmount += item.total;
    });
    return totalAmount;
  };

  const handleRenderOrderItem = () => {
    return data?.data?.map((item) => {
      return (
        <div key={item.id} className="w-full">
          <OrderItem data={item} />
        </div>
      );
    });
  };

  const handleGetLink = () => {
    const amountPayment = getTotalAmount();
    dispatch(
      getLinkPayment({
        paymentServiceRequest: {
          userId: userData.id,
          orderNumber: data.orderNumber,
          amountPayment,
        },
        callback: {
          openPaymentPage: (url) => window.open(url, "_blank"),
        },
      })
    );
  };

  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className="w-full flex flex-col justify-start items-center border border-slate-300 rounded px-4">
        <div className="w-full grid grid-cols-4">
          <div className="col-span-3">
            <div className="w-full p-2 flex gap-2">
              <span>Total Amount : </span>
              <span className="text-red-600">
                {getTotalAmount().toLocaleString()}
              </span>
              <span>VNĐ</span>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full flex justify-end items-center p-2">
              {data?.status === "Awaiting_Payment" ? (
                <button
                  onClick={() => handleGetLink()}
                  className="px-2 py-1 bg-primary text-white rounded"
                >
                  {data?.status}
                </button>
              ) : (
                <button className="px-2 py-1 bg-primary text-white rounded">
                  {data?.status}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-4 p-2">
          {handleRenderOrderItem()}
        </div>
      </div>
    </div>
  );
};

export default OrderSameNumber;
