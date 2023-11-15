import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchParams,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";

import {
  getListOrder,
  handlePayment,
} from "../../redux/slice/user/order.user.slice";
import ROUTES from "../../constants/ROUTES";

import LoadingFull from "../../components/common/LoadingFull";
import OrderItem from "../../components/User/order/OrderItem";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, loading } = useSelector((state) => state.OrderUser.list_order);
  const { cancel_order } = useSelector((state) => state.OrderUser);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleCallback = () => {
    dispatch(
      getListOrder({
        userId: userData.id,
      })
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

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
  }, [userData.id, cancel_order.loading]);

  const handleRenderOrderList = () => {
    return data?.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <OrderItem data={item} />
        </div>
      );
    });
  };

  const navbarData = [
    {
      id: 1,
      content: "Awaiting payment",
      path: ROUTES.USER.PURCHASE.AWAITING_PAYMENT,
    },
    { id: 2, content: "Transferred", path: ROUTES.USER.PURCHASE.TRANSFERRED },
    { id: 3, content: "Pending", path: ROUTES.USER.PURCHASE.PENDING },
    { id: 4, content: "Processing", path: ROUTES.USER.PURCHASE.PROCESSING },
    { id: 5, content: "Cancelled", path: ROUTES.USER.PURCHASE.CANCELLED },
    { id: 6, content: "Rejection", path: ROUTES.USER.PURCHASE.REJECTION },
    { id: 7, content: "Completed", path: ROUTES.USER.PURCHASE.COMPLETED },
  ];
  const styleActiveNavbar = "bg-primary text-white rounded";

  const handleRenderNavbarForOrder = () => {
    return navbarData.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full h-12 flex justify-center items-center"
        >
          <NavLink
            to={item.path}
            className="group w-full flex justify-center items-center hover:bg-primary hover:text-white hover:rounded"
          >
            {({ isActive }) => (
              <div
                className={`w-full h-12 flex justify-center items-center ${
                  isActive ? styleActiveNavbar : ""
                }`}
              >
                <span>{item.content}</span>
              </div>
            )}
          </NavLink>
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
      <div
        className={`w-full h-12 grid grid-cols-${navbarData.length} border border-slate-300 rounded`}
      >
        {handleRenderNavbarForOrder()}
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4">
        <Outlet context={{ data }} />
      </div>
      {/* <div className="w-full flex flex-col justify-start items-center gap-4">
        {handleRenderOrderList()}
      </div> */}
    </div>
  );
};

export default Orders;
