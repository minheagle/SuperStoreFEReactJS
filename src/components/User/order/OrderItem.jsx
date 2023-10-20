import React from "react";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderItem = ({ data }) => {
  const dateTime = data?.date
    ? moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    : "";
  const shipMoney = data?.shipMoney ? data.shipMoney : 0;

  const handleRenderOrderDetailList = () => {
    return data?.orderDetailList?.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full flex flex-col justify-start items-center border border-slate-300 rounded"
        >
          <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
            <span className="shrink-0 font-medium">Product Name : </span>
            <span className="flex-1 line-clamp-1">
              {item?.product?.productName}
            </span>
          </div>
          <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
            <span className="shrink-0 font-medium">Price : </span>
            <span className="text-red-600">
              {item?.unitPrice?.toLocaleString()}
            </span>
            <span className="">VNĐ</span>
          </div>
          <div className="w-full flex justify-start items-center gap-2 px-4 py-1">
            <span className="shrink-0 font-medium">Quantity : </span>
            <span className="flex-1 line-clamp-1">{item?.quantity}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1 pb-2 border border-slate-300 rounded">
      <div className="w-full h-12 flex justify-between items-center border-b border-slate-300 pl-4">
        <div className="w-1/2 flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">{data?.seller?.storeName}</span>
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
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-semibold">Products :</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2 p-4">
        {handleRenderOrderDetailList()}
      </div>
    </div>
  );
};

export default OrderItem;
