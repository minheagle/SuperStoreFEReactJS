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

  const handleOnChangeFilter = (e) => {
    const value = e.target.value;
    if (value === "None") {
      setFilter(null);
    } else {
      setFilter(value);
    }
  };

  const handleRenderListOrder = () => {
    let newList = [];
    if (filter) {
      newList = data?.filter((item) => item?.status === filter);
    } else {
      newList = data;
    }
    return newList?.map((order) => {
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
      <div className="w-full flex justify-start items-center gap-4">
        <div className="w-1/3 flex justify-start items-center">
          <h2 className="font-medium text-xl">List Order</h2>
        </div>
        <div className="w-2/3 flex justify-start items-center gap-4">
          <select
            name=""
            id=""
            onChange={(e) => handleOnChangeFilter(e)}
            className="w-48 h-8 outline-none border border-slate-300 rounded"
          >
            <option value={null} defaultChecked>
              None
            </option>
            <option value="Awaiting_Payment">Awaiting_Payment</option>
            <option value="Pending">Pending</option>
            <option value="Rejection">Rejection</option>
            <option value="Processing">Processing</option>
          </select>
          <button className="px-2 py-1 bg-primary text-white rounded">
            Filter
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4">
        {handleRenderListOrder()}
      </div>
    </div>
  );
};

export default Orders;
