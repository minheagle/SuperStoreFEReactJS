import React from "react";

const VoucherExpired = ({ data }) => {
  return (
    <div className="relative col-span-1 w-full flex justify-center items-center border border-slate-300 bg-slate-500 bg-opacity-30 p-2 rounded">
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full flex justify-center items-center z-30">
        <div className="w-24 h-24 flex justify-center items-center border border-red-600 bg-white rounded-full">
          <h2 className="text-xl text-red-600">Expired</h2>
        </div>
      </div>
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
      </div>
    </div>
  );
};

export default VoucherExpired;
