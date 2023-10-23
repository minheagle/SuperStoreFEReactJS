import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrder } from "../../../redux/slice/seller/order.seller.slice";

import OrderItem from "../../../components/Seller/order/OrderItem";

const Orders = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(null);

  const { data, loading } = useSelector((state) => state.OrderSeller.all_order);

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  useEffect(() => {
    dispatch(
      getAllOrder({
        sellerId: shopData.id,
      })
    );
  }, []);

  const handleRenderListOrder = () => {
    return data?.map((order) => {
      return (
        <div
          key={order.id}
          className="w-full flex justify-center items-center p-4 border border-slate-300 rounded"
        >
          <OrderItem data={order} sellerId={shopData.id} />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="font-medium text-xl">List Order</h2>
        <select name="" id="">
          <option value=""></option>
        </select>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4">
        {handleRenderListOrder()}
      </div>
    </div>
  );
};

export default Orders;
