import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, generatePath } from "react-router-dom";

import ROUTES from "../../../constants/ROUTES";
import defaultImageForProduct from "../../../assets/default-product-image.png";

import { getProductOfShop } from "../../../redux/slice/public/shop.public.slice";
import LoadingFull from "../../../components/common/LoadingFull";

const HomeShop = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { data, loading } = useSelector(
    (state) => state.ShopPublic.product_of_shop
  );

  useEffect(() => {
    dispatch(
      getProductOfShop({
        shopId: state.shopId,
      })
    );
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <LoadingFull />
      </div>
    );
  }

  const handleRenderProductList = () => {
    return data?.map((item, index) => {
      const imageList = item?.productItemResponseList.flatMap((item) =>
        item.imageProductList.map((img) => img.imgProductUrl)
      );
      return (
        <div key={item.productId} className="col-span-1 p-2">
          <div className="w-full border border-slate-300 rounded">
            <div className="w-full">
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
              {/* <button className="bg-primary rounded text-white px-2 py-1">
                Add to cart
              </button> */}
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
    <div className="w-full grid grid-cols-6">{handleRenderProductList()}</div>
  );
};

export default HomeShop;
