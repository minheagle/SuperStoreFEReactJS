import React from "react";
import { useSelector } from "react-redux";

const SubmitCreate = ({ product, productItem }) => {
  const { data } = useSelector((state) => state.CategoryPublic.list);
  // console.log(productItem);

  const handleRenderImageForProductItem = (value) => {
    return value?.map((item, index) => {
      return (
        <div key={index} className="w-1/4 flex justify-center items-center p-1">
          <img
            src={URL.createObjectURL(item)}
            alt=""
            className="object-cover"
          />
        </div>
      );
    });
  };

  const handleRenderOptionForProductItem = (value) => {
    return value?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-1/2 flex justify-center items-center gap-2 border border-slate-400 rounded"
        >
          <span className="w-1/2 flex justify-end items-center pr-2 font-semibold">
            {item.optionName} :
          </span>
          <span className="w-1/2 flex justify-start items-center pl-2">
            {item.optionValueRequest}
          </span>
        </div>
      );
    });
  };

  const handleRenderProductItem = () => {
    return productItem?.map((item, index) => {
      return (
        <div key={index} className="w-1/2 flex justify-center items-center p-2">
          <div className="w-full flex flex-col justify-start items-center border border-slate-400 rounded">
            <div className="w-full flex justify-start items-center pl-2">
              <span className="w-36 flex justify-start items-center font-semibold">
                Price :
              </span>
              <span className="flex-1 flex justify-start items-center">
                {item.price.toLocaleString()}
              </span>
            </div>
            <div className="w-full flex justify-start items-center pl-2">
              <span className="w-36 flex justify-start items-center font-semibold">
                Quantity Stock :
              </span>
              <span className="flex-1 flex justify-start items-center">
                {item.qtyInStock}
              </span>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-2 p-2">
              <span className="w-full flex justify-start items-center font-semibold">
                Images :
              </span>
              <div className="w-full flex flex-wrap">
                {handleRenderImageForProductItem(item.imgProductFile)}
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-2 p-2">
              <span className="w-full flex justify-start items-center font-semibold">
                Options :
              </span>
              <div className="w-full flex flex-wrap">
                {handleRenderOptionForProductItem(item.optionTypeRequestList)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full flex flex-col justify-start items-center gap-4 border border-slate-400 p-2 rounded">
        <span className="w-full flex justify-start items-center font-semibold">
          Product :
        </span>
        <div className="w-full flex flex-col justify-start items-center pl-4">
          <div className="w-full flex justify-start items-center">
            <span className="w-36 flex justify-start items-center font-semibold">
              Category :
            </span>
            <span className="flex-1">
              {data?.find((item) => item.id === product.categoryId)?.content}
            </span>
          </div>
          <div className="w-full flex justify-start items-center">
            <span className="w-36 flex justify-start items-center font-semibold">
              Product Name :
            </span>
            <span className="flex-1">{product.productName}</span>
          </div>
          <div className="w-full flex justify-start items-center">
            <span className="w-36 flex justify-start items-center font-semibold">
              Description :
            </span>
            <span className="flex-1">{product.description}</span>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4 border border-slate-400 p-2 rounded">
        <span className="w-full flex justify-start items-center font-semibold">
          Product Item :
        </span>
        <div className="w-full flex flex-wrap justify-start items-center">
          {handleRenderProductItem()}
        </div>
      </div>
    </div>
  );
};

export default SubmitCreate;
