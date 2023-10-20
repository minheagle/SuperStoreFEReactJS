import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  getListOrder,
  handlePayment,
} from "../../redux/slice/user/order.user.slice";
import handleOrder from "../../utils/handle/handleOrder";
import ROUTES from "../../constants/ROUTES";

import LoadingFull from "../../components/common/LoadingFull";
import OrderSameNumber from "../../components/User/order/OrderSameNumber";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, loading } = useSelector((state) => state.OrderUser.list_order);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleCallback = () => {
    dispatch(
      getListOrder({
        userId: userData.id,
      })
    );
    window.scroll(0, 0);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      dispatch(
        handlePayment({
          informationStatusPayment: {
            code: searchParams.get("code"),
            id: searchParams.get("id"),
            cancel: searchParams.get("cancel"),
            status: searchParams.get("status"),
            orderCode: searchParams.get("orderCode"),
          },
          callback: {
            getNewOrder: () => handleCallback(),
            redirect: () => navigate(ROUTES.USER.PURCHASE),
          },
        })
      );
    }
  }, [searchParams.size]);

  useEffect(() => {
    dispatch(
      getListOrder({
        userId: userData.id,
      })
    );
  }, [userData.id]);

  const handleRenderOrderList = () => {
    const newData = handleOrder(data);
    return newData?.map((item) => {
      return (
        <div key={item.orderNumber} className="w-full">
          <OrderSameNumber data={item} />
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
