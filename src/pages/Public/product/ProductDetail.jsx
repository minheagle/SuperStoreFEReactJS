import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getDetail } from "../../../redux/slice/public/product.public.slice";
import { addToCart } from "../../../redux/slice/cart/cart.slice";
import ROUTES from "../../../constants/ROUTES";

import LoadingFull from "../../../components/common/LoadingFull";
import BreadcrumbForProduct from "../../../components/Public/product/BreadcrumbForProduct";
import ImageGallery from "../../../components/Public/product/ImageGallery";
import ShopInProduct from "../../../components/Shop/ShopInProduct";
import CommentAndRating from "../../../components/Public/product/CommentAndRating";
import QuestionAndAnswer from "../../../components/Public/product/Q&A";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const { data, loading } = useSelector((state) => state.ProductPublic.detail);
  const { shop_detail } = useSelector((state) => state.ShopPublic);
  const { add_to_cart } = useSelector((state) => state.Cart);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    dispatch(
      getDetail({
        productId,
      })
    );
    window.scroll(0, 0);
  }, [productId]);

  const handleGetAllImage = (data) => {
    return data?.productItemResponseList?.flatMap((item) =>
      item?.imageProductList?.map((img) => img.imgProductUrl)
    );
  };

  const handleGetAllProductItem = (data) => {
    return data?.productItemResponseList?.map((item) => {
      return handleProductItem(item);
    });
  };

  const handleProductItem = (data) => {
    const { pitemId, price, qtyInStock, status } = data;
    const options = handleOptionForProductItem(data.optionTypes);
    return {
      pitemId,
      price,
      qtyInStock,
      status,
      options,
    };
  };

  const handleOptionForProductItem = (data) => {
    return data?.map((item) => {
      return {
        optionName: item.optionName,
        optionValue: item.optionValue.valueName,
      };
    });
  };

  const productItemList = handleGetAllProductItem(data);

  const [checkedValue, setCheckedValue] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productItemList) {
      setCheckedValue(productItemList[0]);
    }
  }, [data]);

  const handleChangeCheckedValue = (pitemId) => {
    const newCheckedValue = productItemList?.find(
      (item) => item.pitemId === pitemId
    );
    setCheckedValue(newCheckedValue);
  };

  const handleRenderOption = () => {
    return productItemList?.map((item, index) => {
      return (
        <div key={index} className="w-1/2 p-1">
          <div
            onClick={() => handleChangeCheckedValue(item.pitemId)}
            className={`w-full cursor-pointer ${
              item?.pitemId === checkedValue?.pitemId
                ? "bg-primary text-white rounded"
                : "border border-slate-300 rounded"
            }`}
          >
            {item?.options?.map((option, index) => {
              return (
                <div key={index} className="w-full flex gap-2">
                  <span className="w-1/2 flex justify-end items-center">
                    {option.optionName + " :"}
                  </span>
                  <span className="w-1/2 flex justify-start items-center">
                    {option.optionValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (!userData) {
      return navigate(ROUTES.PUBLIC.LOGIN);
    }
    if (quantity && Number.parseInt(quantity) > 0) {
      const item = {
        productItemId: checkedValue.pitemId,
        quantity: Number.parseInt(quantity),
      };
      dispatch(
        addToCart({
          productItem: item,
          userId: userData.id,
          callback: {
            notification: (message) => notify(message),
          },
        })
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <LoadingFull />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="col-span-10 py-4">
        <div className="w-full flex flex-col justify-start items-center gap-4">
          <div className="w-full flex justify-start items-center p-2 bg-primary text-white rounded">
            <BreadcrumbForProduct
              categoryId={data?.categoryId}
              productName={data?.productName}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="col-span-1 w-full">
              <ImageGallery listImage={handleGetAllImage(data)} />
            </div>
            <div className="col-span-1 w-full flex flex-col justify-start items-center gap-8">
              <div className="w-full flex justify-start items-center px-2">
                <span className="text-xl font-medium">{data.productName}</span>
              </div>
              <div className="w-full h-24 flex justify-start items-center gap-4 bg-slate-100 rounded">
                <span className="w-1/4 flex justify-end items-center text-xl font-semibold"></span>
                <span className="flex-1 text-2xl font-normal text-primary">
                  {checkedValue?.price.toLocaleString() + " VNĐ"}
                </span>
              </div>
              <div className="w-full flex justify-start items-center gap-4 pl-4">
                <div className="shrink-0 w-1/4 flex justify-start items-center text-xl font-semibold">
                  Options :
                </div>
                <div className="w-3/4 flex justify-start items-center flex-wrap">
                  {handleRenderOption()}
                </div>
              </div>
              <div className="w-full flex justify-start items-center gap-4 pl-4">
                <span className="w-1/4 flex justify-start items-center text-xl font-semibold">
                  Quantity :
                </span>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={quantity}
                  onChange={(e) => handleChangeQuantity(e)}
                  className="outline-none border border-black rounded pl-2"
                />
                <span className="flex-1 text-sm font-normal">
                  {checkedValue?.qtyInStock + " item in stock"}
                </span>
              </div>
              <div className="w-full flex justify-start items-center gap-8 pl-4">
                <button
                  onClick={() => handleAddToCart()}
                  className="flex justify-center items-center gap-2 px-4 py-2 bg-primary text-white rounded"
                >
                  {add_to_cart.loading ? (
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
                  <FontAwesomeIcon
                    icon="fas fa-cart-plus"
                    className="text-2xl"
                  />
                  <span className="text-xl">Add to cart</span>
                </button>
                {/* <button className="w-36 h-16 bg-red-600 text-white text-xl rounded">
                  Buy now
                </button> */}
              </div>
            </div>
          </div>
          {/* Shop information */}
          <div className="w-full">
            <ShopInProduct shopData={shop_detail?.data} />
          </div>
          {/* Product description */}
          <div className="w-full h-24 bg-slate-100 p-4 rounded">
            <span>{data.description}</span>
          </div>
          {/* Comment and Rating */}
          <div className="w-full bg-slate-100 rounded">
            <CommentAndRating />
          </div>
          {/* Q&A */}
          <div className="w-full bg-slate-100 rounded">
            <QuestionAndAnswer productId={productId} />
          </div>
          {/* Product same from shop */}
          {/* Product same */}
        </div>
        <ToastContainer />
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default ProductDetail;
