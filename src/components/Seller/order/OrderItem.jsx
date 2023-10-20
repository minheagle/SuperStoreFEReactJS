import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import ProductItem from "./ProductItem";

const OrderItem = ({ data, sellerId }) => {
  const dispatch = useDispatch();
  console.log(data);
  const dateTime = data?.date
    ? moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    : "";

  const handleRenderProductItem = () => {
    return data?.orderDetailList?.map((item) => {
      return (
        <div key={item.id} className="w-full">
          <ProductItem data={item} />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      <div className="w-full flex justify-end items-center">
        <div className="flex justify-center items-center gap-4">
          <button className="px-2 py-1 bg-primary text-white rounded">
            Confirm
          </button>
          <button className="px-2 py-1 bg-red-600 text-white rounded">
            Rejection
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-medium">Delivery Address</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1 line-clamp-1">{data?.deliveryAddress}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-medium">Date time</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1 line-clamp-1">{dateTime}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-medium">Total Price</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1 line-clamp-1 text-red-600">
            {data?.total?.toLocaleString()} vnđ
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-medium">Product</span>
          <span className="shrink-0 font-medium">:</span>
        </div>
        <div className="w-full flex flex-col justify-start items-center border border-slate-300 rounded">
          <div className="w-full flex justify-center items-center gap-2 border-b border-slate-300">
            <div className="w-2/5 flex justify-center items-center font-medium">
              Product
            </div>
            <div className="w-1/5 flex justify-center items-center font-medium">
              Option
            </div>
            <div className="w-1/5 flex justify-center items-center font-medium">
              Unit Price
            </div>
            <div className="w-1/5 flex justify-center items-center font-medium">
              Quantity
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-2">
            {handleRenderProductItem()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
