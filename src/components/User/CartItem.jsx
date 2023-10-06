import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SwiperForCart from "./SwiperForCart";

const CartItem = ({ item, handleChangeCheckedCartItemList }) => {
  const shopId = item?.seller?.id ?? null;
  const [checkedListItem, setCheckedListItem] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (checkedListItem.includes(itemId)) {
      setCheckedListItem(checkedListItem.filter((id) => id !== itemId));
    } else {
      setCheckedListItem([...checkedListItem, itemId]);
    }
  };

  useEffect(() => {
    handleChangeCheckedCartItemList({
      shopId: shopId,
      cartId: checkedListItem,
    });
  }, [checkedListItem]);

  const handleRenderItemForShop = () => {
    return item?.lineItems?.map((lineItem) => {
      return (
        <div key={lineItem.cartId} className="w-full flex ">
          <div className="w-1/2 flex justify-start items-center gap-2">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(lineItem.cartId)}
              checked={checkedListItem.includes(lineItem.cartId)}
            />
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
              <p className="overflow-hidden text-ellipsis break-all">
                {lineItem.product.productName}
              </p>
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
            <div className="flex justify-center items-center gap-4">
              <button>
                <FontAwesomeIcon icon="fas fa-edit" />
              </button>
              <button>
                <FontAwesomeIcon icon="fas fa-trash" className="text-red-600" />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full">
      <div className="w-full h-12 flex justify-start items-center border-b border-slate-300 pl-4">
        <div className="flex justify-start items-center gap-4">
          <FontAwesomeIcon icon="fas fa-store" className="text-primary" />
          <span className="font-semibold">{item?.seller?.storeName}</span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
        {handleRenderItemForShop()}
      </div>
    </div>
  );
};

export default CartItem;
