import React from "react";

const CategoryItem = ({ index, item }) => {
  return (
    <div className="w-36 h-52 flex flex-col justify-start items-center gap-2">
      <div className="w-36 h-36">
        <img
          src={item.imageUrl}
          alt=""
          className="object-cover w-36 h-36 boder border-slate-300 rounded-full"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <span className="font-semibold text-center">{item.content}</span>
      </div>
    </div>
  );
};

export default CategoryItem;
