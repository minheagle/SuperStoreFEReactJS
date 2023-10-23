import React from "react";

const ProductItem = ({ data }) => {
  //   console.log(data);
  const handleRenderOption = () => {
    return data?.product?.productItemResponse?.optionTypes?.map(
      (item, index) => {
        // console.log(item);
        return (
          <div
            key={index}
            className="w-full flex justify-start items-center gap-2"
          >
            <span className="shrink-0 w-24 font-medium">
              {item?.optionName}
            </span>
            <span className="shrink-0 font-medium">:</span>
            <span className="flex-1">{item?.optionValue?.valueName}</span>
          </div>
        );
      }
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex justify-center items-center gap-2 p-2">
        <div className="w-2/5 flex justify-start items-center">
          <span className="line-clamp-2 font-light">
            {data?.product?.productName}
          </span>
        </div>
        <div className="w-1/5 flex flex-col justify-start items-center">
          {handleRenderOption()}
        </div>
        <div className="w-1/5 flex justify-center items-center font-medium text-red-600">
          {data?.unitPrice?.toLocaleString()} vnđ
        </div>
        <div className="w-1/5 flex justify-center items-center font-medium">
          {data?.quantity}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
