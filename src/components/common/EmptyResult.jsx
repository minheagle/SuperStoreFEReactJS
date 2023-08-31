import React from "react";

const EmptyResult = ({ title }) => {
  return (
    <div className="w-full flex justify-center items-center border-2 border-slate-500 rounded">
      <div className="w-1/2 flex justify-center items-center">{title}</div>
    </div>
  );
};

export default EmptyResult;
