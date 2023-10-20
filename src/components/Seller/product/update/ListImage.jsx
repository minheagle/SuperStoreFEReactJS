import React from "react";

import ImageItem from "./ImageItem";

const ListImage = ({ data = [] }) => {
  const handleRenderListImage = () => {
    return data?.map((item) => {
      return (
        <div key={item?.imgProductId} className="col-span-1 w-full">
          <ImageItem data={item} />
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-2 p-4">
      <div className="w-full flex justify-start items-center">
        <span className="font-medium">List Image : </span>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {handleRenderListImage()}
      </div>
    </div>
  );
};

export default ListImage;
