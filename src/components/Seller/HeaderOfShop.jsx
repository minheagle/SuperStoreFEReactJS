import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import defaultAvatar from "../../assets/default-avatar.jpg";

const HeaderOfShop = ({ shopAvatarUrl, shopBackgroundUrl }) => {
  return (
    <div className="w-full p-2">
      <div
        className={`relative w-full h-60 flex justify-start items-center rounded p-4 bg-[url('${shopBackgroundUrl}')]`}
      >
        <div className="w-48 h-48 flex flex-col justify-center items-center">
          <div className="w-40 h-40 border-2 border-white rounded-full">
            {shopAvatarUrl ? (
              <img
                src={shopAvatarUrl}
                alt=""
                className="object-cover w-40 h-40 rounded-full"
              />
            ) : (
              <img
                src={defaultAvatar}
                alt=""
                className="object-cover w-40 h-40 rounded-full"
              />
            )}
          </div>
          <button
            type="button"
            className="w-32 h-6 text-white font-semibold border border-white rounded"
          >
            Change avatar
          </button>
        </div>
        <div className="h-12 text-white text-2xl">Shop Name</div>
        <div className="absolute bottom-0 right-0 p-2">
          <button
            type="button"
            className=" flex justify-center items-center gap-2 text-white font-medium"
          >
            <FontAwesomeIcon icon="fas fa-edit" />
            <span>Change background</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderOfShop;
