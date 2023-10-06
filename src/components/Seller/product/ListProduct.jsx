import React from "react";
import { useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

import defaultProductImage from "../../../assets/default-product-image.png";
import ROUTES from "../../../constants/ROUTES";

const ListProduct = () => {
  const { listProduct } = useSelector((state) => state.ProductSeller);

  const handleRenderProductList = () => {
    return listProduct?.data?.map((item, index) => {
      const imageList = item?.productItemResponseList.flatMap((item) =>
        item.imageProductList.map((img) => img.imgProductUrl)
      );
      return (
        <div key={item.productId} className="col-span-1 p-2">
          <div className="w-full border border-slate-300 rounded">
            <div className="w-full">
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
            <div className="w-full px-2">
              <span>{item.productName}</span>
            </div>
            <div className="w-full flex justify-between items-center text-xs text-primary px-2">
              <span className="">
                {item.minPrice.toLocaleString() + " vnđ"}
              </span>
              <span className="">
                {item.maxPrice.toLocaleString() + " vnđ"}
              </span>
            </div>
            <div className="w-full flex justify-between items-center px-2 py-4">
              <button className="bg-primary rounded text-white px-2 py-1">
                Add to cart
              </button>
              <Link
                to={generatePath(ROUTES.PUBLIC.PRODUCT_DETAIL, {
                  productId: item.productId,
                })}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-12 flex flex-col justify-start items-center gap-2 py-4">
        <div className="w-full h-12 flex justify-start items-center bg-primary rounded ">
          <h2 className="font-normal text-xl text-white pl-4">Products :</h2>
        </div>
        <div className="w-full grid grid-cols-4">
          {handleRenderProductList()}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
