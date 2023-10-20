import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllListProduct } from "../../../redux/slice/public/product.public.slice";

const CategoryItem = ({ index, item }) => {
  const dispatch = useDispatch();

  const { categoryId, minPrice, maxPrice, productName, page, size } =
    useSelector((state) => state.Filter);

  const handleOnClick = () => {
    dispatch(
      getAllListProduct({
        params: {
          categoryId: item.id,
          minPrice,
          page: page,
          size,
        },
      })
    );
  };

  return (
    <div
      onClick={() => handleOnClick()}
      className="cursor-pointer h-52 flex flex-col justify-start items-center gap-2 hover:border hover:border-primary hover:rounded"
    >
      <div className="w-36 h-36">
        <img
          src={item.imageUrl}
          alt=""
          className="object-cover w-36 h-36 boder border-slate-300 rounded"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <span className="font-semibold text-center">{item.content}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
