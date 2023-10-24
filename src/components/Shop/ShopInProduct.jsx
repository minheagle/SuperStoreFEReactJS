import React from "react";
import { Link, generatePath } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import defaultAvatar from "../../assets/default-avatar.jpg";
import ROUTES from "../../constants/ROUTES";
import LoadingFull from "../common/LoadingFull";

const ShopInProduct = ({ shopData }) => {
  // console.log(shopData);

  const shopName = shopData?.storeName?.replaceAll(" ", "-") ?? null;

  if (!shopData) {
    return (
      <div className="w-full">
        <LoadingFull />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-5 border border-slate-300 p-2 rounded">
      <div className="col-span-2 flex justify-start items-center gap-8 bg-slate-100 rounded p-2">
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
            <span className="font-medium">{shopData?.storeName}</span>
          </div>
          <div className="w-full flex justify-around items-center gap-4">
            <button className="bg-primary text-white p-2 rounded">
              Chat now
            </button>
            <Link
              to={generatePath(ROUTES.SHOP.HOME, {
                shopName,
              })}
              state={{ shopId: shopData?.id ?? null }}
              className="flex justify-center items-center gap-2 bg-primary text-white rounded p-2"
            >
              <FontAwesomeIcon icon="fas fa-store" />
              <span>View Shop</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3 w-full flex flex-col justify-start items-center gap-2 px-4">
        <div className="w-full flex gap-2">
          <span className="font-medium">Store Address : </span>
          <span>{shopData?.storeAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default ShopInProduct;
