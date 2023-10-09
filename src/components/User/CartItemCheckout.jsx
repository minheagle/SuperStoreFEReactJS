import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SwiperForCart from "./SwiperForCart";

const CartItemCheckout = ({ item }) => {
  const handleRenderItemForShop = () => {
    return item?.cartResponse?.lineItems?.map((lineItem) => {
      return (
        <div key={lineItem.cartId} className="w-full flex ">
          <div className="w-1/2 flex justify-start items-center gap-2">
            <div className="shrink-0 w-24 h-24">
              <div className="w-full">
                <SwiperForCart
                  listImage={
                    lineItem.product.productItemResponse.imageProductList
                  }
                />
              </div>
            </div>
            <div className="flex-1 h-24 flex justify-start items-center">
              <p className="overflow-hidden text-ellipsis break-all">
                {lineItem.product.productName}
              </p>
            </div>
          </div>
          <div className="w-1/2 flex justify-around items-center">
            <div>
              <span className="text-primary">
                {lineItem.product.productItemResponse.price.toLocaleString() +
                  " VNĐ"}
              </span>
            </div>
            <div>
              <span>{lineItem.quantity}</span>
            </div>
            <div>
              <span className="text-primary">
                {(
                  lineItem.product.productItemResponse.price * lineItem.quantity
                ).toLocaleString() + " VNĐ"}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full">
      <div className="w-full h-12 flex justify-start items-center border-b border-slate-300 pl-4">
        <div className="flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">
            {item?.cartResponse?.seller?.storeName}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
        {handleRenderItemForShop()}
      </div>
      <div className="w-full h-12 flex justify-start items-center border-t border-slate-300 pl-4">
        <div className="flex justify-start items-center gap-4">
          <FontAwesomeIcon
            icon="fas fa-shipping-fast"
            className="text-primary"
          />
          <span>Ship money :</span>
          <span className="font-semibold">{item?.shipMoney ?? 0} VNĐ</span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCheckout;
