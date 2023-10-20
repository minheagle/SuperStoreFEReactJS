import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, generatePath } from "react-router-dom";

import ROUTES from "../../../constants/ROUTES";
import defaultImageForProduct from "../../../assets/default-product-image.png";

import { getProductOfShop } from "../../../redux/slice/public/shop.public.slice";
import LoadingFull from "../../../components/common/LoadingFull";
import VoucherOfShop from "../../../components/Shop/VoucherOfShop";

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
    window.scroll(0, 0);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full">
        <VoucherOfShop shopId={state.shopId} />
      </div>
      <div className="w-full grid grid-cols-6">{handleRenderProductList()}</div>
    </div>
  );
};

export default HomeShop;
