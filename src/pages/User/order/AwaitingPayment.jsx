import { useSelector } from "react-redux";

import OrderItem from "../../../components/User/order/OrderItem";

const AwaitingPayment = () => {
  const { data, loading } = useSelector((state) => state.OrderUser.list_order);

  const handleRenderOrderList = () => {
    const newData = data?.filter((item) => item?.status === "Awaiting_Payment");
    return newData?.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <OrderItem data={item} />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      {handleRenderOrderList()}
    </div>
  );
};

export default AwaitingPayment;
