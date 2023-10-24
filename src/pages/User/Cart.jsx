import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCartList } from "../../redux/slice/cart/cart.slice";

import CartItem from "../../components/User/CartItem";
import Checkout from "../../components/User/Checkout";

const Cart = () => {
  const dispatch = useDispatch();
  const [checkedCartItemList, setCheckedCartItemList] = useState([]);

  const { cart_list } = useSelector((state) => state.Cart);
  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    dispatch(
      getCartList({
        userId: userData.id,
      })
    );
    window.scroll(0, 0);
  }, []);

  const handleChangeCheckedCartItemList = (value) => {
    if (value.cartId.length !== 0) {
      const cartItem = checkedCartItemList.find(
        (item) => item.shopId === value.shopId
      );
      if (cartItem) {
        const newList = checkedCartItemList.map((item) => {
          if (item.shopId === value.shopId) {
            item = value;
          }
          return item;
        });
        setCheckedCartItemList(newList);
      } else {
        setCheckedCartItemList([...checkedCartItemList, value]);
      }
    } else {
      setCheckedCartItemList(
        checkedCartItemList.filter((item) => item.shopId !== value.shopId)
      );
    }
  };

  const handleRenderCartItem = () => {
    return cart_list?.data?.map((item, index) => {
      return (
        <div
          key={index}
          className="w-full flex justify-start items-center gap-4 border border-slate-300 rounded"
        >
          <CartItem
            item={item}
            handleChangeCheckedCartItemList={handleChangeCheckedCartItemList}
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Cart List</h2>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full h-12 flex justify-start items-center bg-slate-100 rounded">
          <div className="w-2/5 pl-4">
            <span className="">Product</span>
          </div>
          <div className="w-3/5 flex justify-around items-center">
            <div>
              <span>Unit Price</span>
            </div>
            <div>
              <span>Quantity</span>
            </div>
            <div>
              <span>Total Price</span>
            </div>
            <div>Actions</div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          {handleRenderCartItem()}
        </div>
      </div>
      <Checkout data={checkedCartItemList} />
    </div>
  );
};

export default Cart;
