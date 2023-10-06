import React from "react";

const Checkout = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full h-24 flex justify-end items-center bg-slate-100 p-4 rounded">
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-4">
          <span>Total:</span>
          <span className="text-primary">0 VNĐ</span>
        </div>
        <button className="text-white bg-primary px-4 py-2 rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
