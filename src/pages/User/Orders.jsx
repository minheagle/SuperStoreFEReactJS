import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getListOrder } from "../../redux/slice/user/order.user.slice";

import LoadingFull from "../../components/common/LoadingFull";
import OrderItem from "../../components/User/order/OrderItem";

const Orders = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.OrderUser.list_order);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    dispatch(
      getListOrder({
        userId: userData.id,
      })
    );
  }, [userData.id]);

  const handleRenderOrderList = () => {
    return data?.map((order) => {
      return (
        <div key={order.id} className="w-full px-4">
          <OrderItem data={order} />
        </div>
      );
    });
  };

  if (loading) {
    return <LoadingFull />;
  }

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
