import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import {
  getLinkPayment,
  cancelOrder,
} from "../../../redux/slice/user/order.user.slice";

import ProductInOrder from "./ProductInOrder";

const OrderItem = ({ data }) => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const [loading, setLoading] = useState(false);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const dateTime = data?.date
    ? moment(data.date).format("dddd, MMMM Do YYYY, h:mm:ss a")
    : "";

  const shipMoney = data?.shipMoney ? data.shipMoney : 0;

  const handleRenderOrderDetailList = () => {
    return data?.orderDetailList?.map((item) => {
      return (
        <ProductInOrder
          key={item?.id}
          orderId={data?.id}
          item={item}
          status={data?.status}
        />
      );
    });
  };

  const handleGetLink = () => {
    dispatch(
      getLinkPayment({
        paymentServiceRequest: {
          userId: userData.id,
          orderNumber: data.orderNumber,
          amountPayment: data.total,
        },
        callback: {
          openPaymentPage: (url) => window.open(url, "_blank"),
          notification: (message) => notify(message),
        },
      })
    );
  };

  const handleCancelOrder = () => {
    setLoading(true);
    dispatch(
      cancelOrder({
        orderId: data.id,
        userId: userData.id,
        callback: {
          notification: (message) => notify(message),
          finish: () => setLoading(false),
        },
      })
    );
  };

  const handleRenderStatus = () => {
    if (data?.status === "Awaiting_Payment") {
      return (
        <div className="w-full flex justify-end items-center gap-4">
          <div className="px-2 py-1 bg-yellow-400 text-white rounded">
            <span>Awaiting Payment</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleGetLink()}
              className="font-light text-sm text-blue-600 underline"
            >
              Get Link Payment
            </button>
          </div>
          <div>
            <button onClick={() => handleCancelOrder()}>
              {loading ? (
                <div>
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <FontAwesomeIcon icon="fas fa-trash" className="text-red-600" />
              )}
            </button>
          </div>
        </div>
      );
    }
    if (data?.status === "Processing") {
      return (
        <div className="w-full flex justify-end items-center">
          <div className="px-2 py-1 bg-yellow-400 text-white rounded">
            <span>Processing</span>
          </div>
        </div>
      );
    }
    if (data?.status === "Rejection") {
      return (
        <div className="w-full flex justify-end items-center">
          <div className="px-2 py-1 bg-red-600 text-white rounded">
            <span>Rejection</span>
          </div>
        </div>
      );
    }
    if (data?.status === "Pending") {
      return (
        <div className="w-full flex justify-end items-center gap-4">
          <div className="px-2 py-1 bg-yellow-400 text-white rounded">
            <span>Pending</span>
          </div>
          <div>
            <button onClick={() => handleCancelOrder()}>
              {loading ? (
                <div>
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <FontAwesomeIcon icon="fas fa-trash" className="text-red-600" />
              )}
            </button>
          </div>
        </div>
      );
    }
    if (data?.status === "Cancelled") {
      return (
        <div className="w-full flex justify-end items-center">
          <div className="px-2 py-1 bg-red-600 text-white rounded">
            <span>Cancelled</span>
          </div>
        </div>
      );
    }
    if (data?.status === "Completed") {
      return (
        <div className="w-full flex justify-end items-center gap-2">
          <div className="px-2 py-1 bg-green-600 text-white rounded">
            <span>Completed</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1 pb-2 border border-slate-300 rounded">
      <div className="w-full h-12 flex justify-between items-center border-b border-slate-300 px-4">
        <div className="w-1/2 flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">{data?.seller?.storeName}</span>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {handleRenderStatus()}
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center pl-4">
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-semibold">Delivery Address</span>
          <span className="font-medium">:</span>
          <span>{data?.deliveryAddress}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-semibold">Date</span>
          <span className="font-medium">:</span>
          <span>{dateTime}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-semibold">Ship Money</span>
          <span className="font-medium">:</span>
          <span className="text-red-600">
            {shipMoney?.toLocaleString()} VND
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-semibold">Discount Money</span>
          <span className="font-medium">:</span>
          <span className="text-red-600">
            {data?.discount?.toLocaleString()} VND
          </span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 w-36 font-semibold">Products</span>
          <span className="font-medium">:</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-2 p-4">
        {handleRenderOrderDetailList()}
      </div>
    </div>
  );
};

export default OrderItem;
