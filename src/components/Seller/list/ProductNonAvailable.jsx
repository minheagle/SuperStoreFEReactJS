import React from "react";

import defaultProductImage from "../../../assets/default-product-image.png";

const ProductNonAvailable = ({ item }) => {
  const imageList = item?.productItemResponseList.flatMap((item) =>
    item.imageProductList.map((img) => img.imgProductUrl)
  );

  return (
    <div key={item.productId} className="relative col-span-1 w-full">
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full flex justify-center items-center bg-slate-200 bg-opacity-50 rounded">
        <div className="w-36 h-36 flex justify-center items-center bg-white rounded-full">
          <h2 className="font-medium text-red-600">Non-available</h2>
        </div>
      </div>
      <div className="w-full h-[400px] flex flex-col justify-start items-center border border-slate-300 rounded">
        <div className="shrink-0 w-full">
          {imageList.length === 0 ? (
            <img
              src={defaultProductImage}
              alt=""
              className="object-cover aspect-square"
            />
          ) : (
            <img
              src={imageList[0]}
              alt=""
              className="object-cover aspect-square"
            />
          )}
        </div>
        <div className="flex-1 w-full flex flex-col justify-start items-center">
          <div className="flex-1 w-full px-2">
            <p className="line-clamp-3">{item.productName}</p>
          </div>
          <div className="shrink-0 w-full h-16 flex flex-col justify-start items-center">
            <div className="w-full h-8 flex justify-between items-center text-xs text-primary px-2">
              {item.minPrice === item.maxPrice ? (
                <span className="text-base">
                  {item.minPrice.toLocaleString() + " vnđ"}
                </span>
              ) : (
                <div className="w-full flex justify-between items-center gap-1 text-base">
                  <span className="">{item.minPrice.toLocaleString()}</span>
                  <span>...</span>
                  <span className="">
                    {item.maxPrice.toLocaleString() + " vnđ"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNonAvailable;
