import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductAvailable from "../list/ProductAvailable";
import ProductNonAvailable from "../list/ProductNonAvailable";

const ListProduct = ({ shopName }) => {
  const { listProduct } = useSelector((state) => state.ProductSeller);

  const handleRenderProductList = () => {
    let newList = [];
    newList = listProduct?.data?.filter((item) => item.status);
    return newList?.map((item, index) => {
      return <ProductAvailable key={index} shopName={shopName} item={item} />;
    });
  };

  const handleRenderListNonAvailable = () => {
    let newList = [];
    newList = listProduct?.data?.filter((item) => !item.status);
    return newList?.map((item, index) => {
      return <ProductNonAvailable key={index} item={item} />;
    });
  };

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-12 flex flex-col justify-start items-center gap-2 py-4">
        <div className="w-full h-12 flex justify-start items-center bg-primary rounded ">
          <h2 className="font-normal text-xl text-white pl-4">Products :</h2>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          {handleRenderProductList()}
        </div>
        <div className="w-full h-12 flex justify-start items-center pl-4 bg-primary text-white rounded">
          <h2>List Non Available :</h2>
        </div>
        <div className="w-full grid grid-cols-4 gap-2">
          {handleRenderListNonAvailable()}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
