import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import Star from "react-rating-star-with-type";

import ROUTES from "../../../constants/ROUTES";

import defaultImageForProduct from "../../../assets/default-product-image.png";
import noResult from "../../../assets/no-result.jpg";

const Products = () => {
  const { list } = useSelector((state) => state.ProductPublic);
  const { page } = useSelector((state) => state.Filter);

  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);

  const handleRenderProductList = () => {
    return list?.data?.map((item, index) => {
      const imageList = item?.productItemResponseList.flatMap((item) =>
        item.imageProductList.map((img) => img.imgProductUrl)
      );
      return (
        <div key={item.productId} className="col-span-1 w-full p-2">
          <div className="w-full h-[350px] flex flex-col justify-start items-center border border-slate-300 rounded">
            <div className="shrink-0 w-full">
              {imageList.length === 0 ? (
                <img
                  src={defaultImageForProduct}
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
                    to={generatePath(ROUTES.PUBLIC.PRODUCT_DETAIL, {
                      productId: item.productId,
                    })}
                    className="w-14 h-6 flex justify-center items-center bg-red-600 text-white rounded"
                  >
                    View
                  </Link>
                  <Star
                    count={5}
                    value={item?.voteStar}
                    size={16}
                    color1="gray"
                    color2="orange"
                    edit={false}
                  />
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
      <div className="col-span-1"></div>
      <div className="col-span-10 flex flex-col justify-start items-center gap-2 py-4">
        <div className="w-full h-12 flex justify-start items-center bg-primary rounded ">
          <h2 className="font-normal text-xl text-white pl-4">Products :</h2>
        </div>
        <div className="w-full grid grid-cols-6">
          {list?.data?.length !== 0 ? (
            handleRenderProductList()
          ) : (
            <div className="col-span-6 w-full flex justify-center items-center">
              <div className="w-1/2 flex justify-center items-center">
                <img src={noResult} alt="" className="w-full object-cover" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default Products;
