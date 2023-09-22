import React from "react";

const ImageCategory = ({ field, handleOnChangeImage }) => {
  return (
    <div className="w-full flex">
      <div className="w-36 h-36 flex justify-center items-center border border-slate-300 rounded-full">
        <img
          src={field.value}
          alt=""
          className="object-cover w-36 h-36 rounded-full"
        />
      </div>
      <div>
        <div className="bg-yellow-500 rounded">
          <button
            type="button"
            onClick={() => handleOnChangeImage(true)}
            className="text-white py-1 px-2"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCategory;
