import { useState } from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  updateQuantity,
  deleteCartItem,
} from "../../redux/slice/cart/cart.slice";

import SwiperForCart from "./SwiperForCart";

const CartItemNested = ({ data, checkedListItem, handleCheckboxChange }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [quantity, setQuantity] = useState(data?.quantity);
  const [error, setError] = useState("");

  const quantitySchema = Yup.number()
    .typeError("Quantity is a number")
    .min(0, "Quantity >= 0")
    .max(
      data?.product?.productItemResponse?.qtyInStock,
      "Quantity over in stock"
    )
    .required("Required");

  const handleChangeQuantity = async (e) => {
    const value = e.target.value;
    try {
      await quantitySchema.validate(value);
      setError("");
    } catch (validationError) {
      setError(validationError.message);
    }
    setQuantity(value);
  };

  const handleChangeEditQuantity = () => {
    if (!error) {
      if (Number.parseInt(quantity) !== data?.quantity) {
        dispatch(
          updateQuantity({
            cartId: data?.cartId,
            quantity: Number.parseInt(quantity),
          })
        );
        setEdit(false);
      } else {
        setEdit(false);
      }
    }
  };

  const handleDeleteCartItem = (cartId) => {
    dispatch(
      deleteCartItem({
        cartId,
      })
    );
  };

  return (
    <div className="w-full flex">
      <div className="w-2/5 flex justify-start items-center gap-2">
        <input
          type="checkbox"
          onChange={() => handleCheckboxChange(data?.cartId)}
          checked={checkedListItem.includes(data?.cartId)}
        />
        <div className="shrink-0 w-24 h-24">
          <div className="w-full">
            <SwiperForCart
              listImage={data?.product?.productItemResponse?.imageProductList}
            />
          </div>
        </div>
        <div className="flex-1 h-24 flex justify-start items-center">
          <p className="overflow-hidden text-ellipsis break-all">
            {data?.product?.productName}
          </p>
        </div>
      </div>
      <div className="w-3/5 flex justify-around items-center">
        <div className="w-1/4">
          <span className="text-primary">
            {data?.product?.productItemResponse?.price.toLocaleString() +
              " VNĐ"}
          </span>
        </div>
        <div className="w-1/4 flex justify-center items-center">
          {edit ? (
            <div className="h-12 flex flex-col justify-start items-center gap-2">
              <input
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => handleChangeQuantity(e)}
                className="w-24 h-8 outline-none border border-slate-300 rounded pl-2"
              />
              {error ? (
                <span className="h-4 text-xs text-red-600">{error}</span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <span>{quantity}</span>
          )}
        </div>
        <div className="w-1/4">
          <span className="text-primary">
            {(
              data?.product?.productItemResponse?.price * quantity
            ).toLocaleString() + " VNĐ"}
          </span>
        </div>
        <div className="w-1/4 flex justify-center items-center gap-4">
          {edit ? (
            <button onClick={() => handleChangeEditQuantity()}>
              <FontAwesomeIcon icon="fas fa-check-square" />
            </button>
          ) : (
            <button onClick={() => setEdit(true)}>
              <FontAwesomeIcon icon="fas fa-edit" />
            </button>
          )}
          <button onClick={() => handleDeleteCartItem(data?.cartId)}>
            <FontAwesomeIcon icon="fas fa-trash" className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemNested;
