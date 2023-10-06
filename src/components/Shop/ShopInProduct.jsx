import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import defaultAvatar from "../../assets/default-avatar.jpg";

const ShopInProduct = ({ shopData }) => {
  return (
    <div className="w-full grid grid-cols-5 bg-slate-100 p-4 rounded">
      <div className="col-span-2 flex justify-start items-center gap-8 border-r border-slate-300 p-2">
        <div className="w-32 h-32">
          {shopData?.storeAvatarUrl ? (
            <img
              src={shopData.storeAvatarUrl}
              alt=""
              className="object-cover aspect-square rounded-full"
            />
          ) : (
            <img
              src={defaultAvatar}
              alt=""
              className="object-cover aspect-square rounded-full"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-start items-center gap-4">
          <div className="w-full flex justify-start items-center">
            <span>{shopData?.storeName}</span>
          </div>
          <div className="w-full flex justify-around items-center gap-4">
            <button className="bg-primary text-white p-2 rounded">
              Chat now
            </button>
            <button className="flex justify-center items-center gap-2 bg-primary text-white rounded p-2">
              <FontAwesomeIcon icon="fas fa-store" />
              <span>View Shop</span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-3">Shop Information</div>
    </div>
  );
};

export default ShopInProduct;
