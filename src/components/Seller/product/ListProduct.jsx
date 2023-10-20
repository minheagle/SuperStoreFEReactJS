import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";

import { deleteProduct } from "../../../redux/slice/seller/product.seller.slice";

import defaultProductImage from "../../../assets/default-product-image.png";
import ROUTES from "../../../constants/ROUTES";

const ListProduct = ({ shopName }) => {
  const dispatch = useDispatch();
  const { listProduct, delete_product } = useSelector(
    (state) => state.ProductSeller
  );

  const handleDeleteProduct = (productId) => {
    dispatch(
      deleteProduct({
        productId,
      })
    );
  };

  const handleRenderProductList = () => {
    return listProduct?.data?.map((item, index) => {
      const imageList = item?.productItemResponseList.flatMap((item) =>
        item.imageProductList.map((img) => img.imgProductUrl)
      );
      return (
        <div key={item.productId} className="col-span-1 w-full p-2">
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
                <div className="w-full h-8 flex justify-between items-center px-2 py-4">
                  <Link
                    to={generatePath(ROUTES.SELLER.PRODUCT.UPDATE, {
                      shopName: shopName,
                      productId: item.productId,
                    })}
                    className="w-12 h-8 flex justify-center items-center bg-primary rounded text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(item.productId)}
                    className="px-2 py-1 flex justify-center items-center bg-red-600 text-white rounded"
                  >
                    {delete_product.loading ? (
                      <div>
                        <svg
                          aria-hidden="true"
                          className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                    ) : (
                      ""
                    )}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
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
