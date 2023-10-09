import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CartItemNested from "./CartItemNested";

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
          <CartItemNested
            data={lineItem}
            checkedListItem={checkedListItem}
            handleCheckboxChange={handleCheckboxChange}
          />
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
