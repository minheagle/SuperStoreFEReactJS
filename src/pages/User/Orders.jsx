import React from "react";

import OrderItem from "../../components/User/order/OrderItem";

const Orders = () => {
  const orderList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleRenderOrderList = () => {
    return orderList?.map((order) => {
      return (
        <div key={order} className="w-full px-4">
          <OrderItem />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-semibold text-2xl">Order History</h2>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4">
        {handleRenderOrderList()}
      </div>
    </div>
  );
};

export default Orders;
