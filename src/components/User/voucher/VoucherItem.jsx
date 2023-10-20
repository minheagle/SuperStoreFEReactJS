import React from "react";
import moment from "moment";

const VoucherItem = ({ data }) => {
  const isExpired = moment(data?.endDate).toDate().getDate() < moment().date();

  return (
    <div className="relative col-span-1 w-full border border-slate-300 p-2 rounded">
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <div className="w-full">
          <span className="font-medium">Shop : </span>
          <span> {data?.seller?.storeName}</span>
        </div>
        <div className="w-full">
          <span className="font-medium">Name : </span>
          <span> {data?.name}</span>
        </div>
        <div className="w-full">
          <span className="font-medium">Description : </span>
          <span> {data?.description}</span>
        </div>
        <div className="w-full">
          <span className="font-medium">Discount : </span>
          <span className="text-red-600">
            {data?.discountValue?.toLocaleString()} vnđ
          </span>
        </div>
        <div className="w-full">
          <span className="font-medium">Usage Available : </span>
          <span> {data?.usageAvailable}</span>
        </div>
      </div>
      {isExpired ? (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-100 bg-opacity-75 flex items-center justify-center">
          <div className=" text-xl text-primary">Expired</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default VoucherItem;
