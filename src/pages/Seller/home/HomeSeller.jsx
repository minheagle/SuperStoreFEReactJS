import React from "react";

import HeaderOfShop from "../../../components/Seller/HeaderOfShop";

const HomeSeller = () => {
  const shopBackgroundUrl =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

  const shopAvatarUrl =
    "https://img.freepik.com/premium-photo/portrait-beautiful-anime-girl-avatar-computer-graphic-background-2d-illustration_67092-2021.jpg?w=2000";

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <HeaderOfShop
        shopBackgroundUrl={shopBackgroundUrl}
        shopAvatarUrl={shopAvatarUrl}
      />
      <div className="w-full"></div>
    </div>
  );
};

export default HomeSeller;
