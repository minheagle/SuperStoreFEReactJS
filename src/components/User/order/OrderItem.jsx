import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLinkPayment } from "../../../redux/slice/user/order.user.slice";

const OrderItem = ({ data }) => {
  const dispatch = useDispatch();
  const dateTime = data?.date
    ? moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    : "";
  const shipMoney = data?.shipMoney ? data.shipMoney : 0;

  console.log(data);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleRenderOrderDetailList = () => {
    return data?.orderDetailList?.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full flex justify-between items-center border border-slate-300 rounded"
        >
          <span>{item?.product?.productName}</span>
          <span>{item?.unitPrice?.toLocaleString()} VND</span>
          <span>{item?.quantity}</span>
        </div>
      );
    });
  };

  const handleAmountPayment = () => {
    let amountPayment = 0;
    data?.orderDetailList?.forEach((item) => {
      amountPayment += item.quantity * item.unitPrice;
    });
    amountPayment += shipMoney;
    return amountPayment;
  };

  const handleGetLink = () => {
    const amountPayment = handleAmountPayment();
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
    <div className="w-full flex flex-col justify-start items-center gap-1 pb-2 border border-slate-300 rounded">
      <div className="w-full h-12 flex justify-between items-center border-b border-slate-300 pl-4">
        <div className="w-1/2 flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">{data?.seller?.storeName}</span>
        </div>
        <div className="w-1/2 flex justify-end items-center pr-4">
          {data?.status === "Awaiting_Payment" ? (
            <button
              onClick={() => handleGetLink()}
              className="px-2 py-1 bg-primary text-white rounded"
            >
              {data?.status}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center pl-4">
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-semibold">Delivery Address :</span>
          <span>{data?.deliveryAddress}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-semibold">Date :</span>
          <span>{dateTime}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-semibold">Ship Money :</span>
          <span>{shipMoney} VND</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        {handleRenderOrderDetailList()}
      </div>
    </div>
  );
};

export default OrderItem;
