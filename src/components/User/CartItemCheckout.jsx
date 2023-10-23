import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getAllAvailable } from "../../redux/slice/user/voucher.user.slice";

import SwiperForCart from "./SwiperForCart";

const CartItemCheckout = ({
  item,
  handleOnChangeTotalForItem,
  handleOnChangeOrder,
}) => {
  const dispatch = useDispatch();

  const { get_all_available } = useSelector((state) => state.VoucherUser);

  const [voucher, setVoucher] = useState(null);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    dispatch(
      getAllAvailable({
        userId: userData.id,
      })
    );
  }, []);

  const handleRenderItemForShop = () => {
    return item?.cartResponse?.lineItems?.map((lineItem) => {
      return (
        <div key={lineItem.cartId} className="w-full flex ">
          <div className="w-1/2 flex justify-start items-center gap-2">
            <div className="shrink-0 w-24 h-24">
              <div className="w-full">
                <SwiperForCart
                  listImage={
                    lineItem.product.productItemResponse.imageProductList
                  }
                />
              </div>
            </div>
            <div className="flex-1 h-24 flex justify-start items-center">
              <p className="line-clamp-3">{lineItem.product.productName}</p>
            </div>
          </div>
          <div className="w-1/2 flex justify-around items-center">
            <div>
              <span className="text-primary">
                {lineItem.product.productItemResponse.price.toLocaleString() +
                  " VNĐ"}
              </span>
            </div>
            <div>
              <span>{lineItem.quantity}</span>
            </div>
            <div>
              <span className="text-primary">
                {(
                  lineItem.product.productItemResponse.price * lineItem.quantity
                ).toLocaleString() + " VNĐ"}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  const newList = get_all_available?.data?.filter(
    (voucher) => voucher.seller.id === item?.cartResponse?.seller?.id
  );

  const handleRenderVoucher = () => {
    newList.unshift({
      promotionId: null,
      name: null,
      description: "None",
    });
    return newList?.map((item, index) => {
      if (index === 0) {
        return (
          <option
            key={item?.promotionId}
            value={JSON.stringify(item)}
            defaultChecked
          >
            {item?.description}
          </option>
        );
      } else {
        return (
          <option key={item?.promotionId} value={JSON.stringify(item)}>
            {item?.description}
          </option>
        );
      }
    });
  };

  const handleTotalPrice = () => {
    let total = item?.total;
    let shipMoney = item?.shipMoney;
    let amount = item?.amount;
    if (voucher && voucher?.name) {
      switch (voucher?.discountType) {
        case "DISCOUNT_PERCENT":
          amount = amount - amount * voucher?.discountValue;
          total = amount + shipMoney;
          break;
        case "FIXED_AMOUNT":
          amount = amount - voucher?.discountValue;
          amount = amount > 0 ? amount : 0;
          total = amount + shipMoney;
          break;
        default:
          shipMoney = shipMoney - voucher?.discountValue;
          shipMoney = shipMoney > 0 ? shipMoney : 0;
          total = amount + shipMoney;
          break;
      }
    }
    return { total, amount, shipMoney };
  };

  const handleOnChangeVoucher = (e) => {
    const value = JSON.parse(e.target.value);
    setVoucher(value);
  };

  useEffect(() => {
    handleOnChangeTotalForItem({
      sellerId: item?.cartResponse?.seller?.id,
      total: handleTotalPrice().total,
    });
    handleOnChangeOrder({
      sellerId: item?.cartResponse?.seller?.id,
      cartId: item?.cartResponse?.lineItems?.map((item) => item.cartId),
      shipMoney: item?.shipMoney,
      amount: item?.amount,
      promotionName: voucher?.name,
    });
  }, [voucher]);

  return (
    <div className="w-full">
      <div className="w-full h-12 flex justify-start items-center border-b border-slate-300 pl-4">
        <div className="flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">
            {item?.cartResponse?.seller?.storeName}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
        {handleRenderItemForShop()}
      </div>
      <div className="w-full flex justify-start items-start border-t border-slate-300">
        <div className="w-1/2 h-12 flex justify-start items-center pl-4">
          <div className="flex justify-start items-center gap-4">
            <FontAwesomeIcon
              icon="fas fa-shipping-fast"
              className="text-primary"
            />
            <span className="font-semibold">Ship money :</span>
            <span className="text-red-600">{item?.shipMoney ?? 0} VNĐ</span>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-start items-center gap-2 p-4">
          <div className="w-full flex justify-start items-center">
            <span className="font-medium">Voucher From Shop : </span>
          </div>
          <div className="w-full flex justify-start items-center">
            <select
              name=""
              id=""
              onChange={(e) => handleOnChangeVoucher(e)}
              className="w-full outline-none border border-slate-300 rounded"
            >
              {handleRenderVoucher()}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end items-start border-t border-slate-300 p-4">
        <div className="w-1/2">
          <div className="w-full flex justify-center items-center">
            <span className="font-semibold text-center">Total Shop</span>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <span className="shrink-0 w-24 font-medium">Price</span>
            <span className="shrink-0 font-medium">:</span>
            <div className="flex-1 flex justify-end items-center">
              <span className="text-red-600">
                {(item?.total - item?.shipMoney)?.toLocaleString()} vnđ
              </span>
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-2">
            <span className="shrink-0 w-24 font-medium">Ship money</span>
            <span className="shrink-0 font-medium">:</span>
            <div className="flex-1 flex justify-end items-center">
              <span className="text-red-600">
                {item?.shipMoney?.toLocaleString()} vnđ
              </span>
            </div>
          </div>
          <div className="w-full flex justify-start items-start gap-2">
            <span className="shrink-0 w-24 font-medium">Voucher</span>
            <span className="shrink-0 font-medium">:</span>
            <div className="flex-1 flex justify-end items-center">
              {voucher && voucher?.name ? (
                <div className="flex flex-col justify-start items-center gap-2">
                  <span>{voucher?.discountType}</span>
                  <span className="text-red-600">
                    - {voucher?.discountValue?.toLocaleString()} vnđ
                  </span>
                </div>
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-2 border-t border-slate-300">
            <span className="text-red-600">
              {handleTotalPrice()?.total?.toLocaleString()} vnđ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCheckout;
