import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  toggleStatus,
  getAllListOfSeller,
} from "../../../redux/slice/seller/voucher.seller.slice";

const VoucherItem = ({ data, sellerId }) => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const handleCallback = () => {
    dispatch(
      getAllListOfSeller({
        sellerId,
      })
    );
  };

  const handleToggleStatus = () => {
    dispatch(
      toggleStatus({
        isActive: !data?.isActive,
        promotionId: data?.promotionId,
        callback: {
          loadPage: () => handleCallback(),
          notification: (message) => notify(message),
        },
      })
    );
  };

  return (
    <div className="col-span-1 w-full flex justify-center items-center border border-slate-300 p-2 rounded">
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Name</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.name}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Description</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1 line-clamp-1">{data?.description}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Start Date</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.startDate}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">End Date</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.endDate}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Discount Type</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.discountType}</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Discount Value</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.discountValue} vnđ</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Min Purchase Amount</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.minPurchaseAmount} vnđ</span>
        </div>
        <div className="w-full flex justify-start items-center gap-2">
          <span className="shrink-0 font-medium">Usage Limit Per User</span>
          <span className="shrink-0 font-medium">:</span>
          <span className="flex-1">{data?.usageLimitPerUser}</span>
        </div>
        <div className="w-full flex justify-start items-center">
          <button
            onClick={() => handleToggleStatus()}
            className="px-2 py-1 bg-primary text-white rounded"
          >
            {data?.isActive ? "Hidden" : "Show"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VoucherItem;
