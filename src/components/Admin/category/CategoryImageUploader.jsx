import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryImageUploader = ({
  field,
  form,
  handleOnChangeDisplayCancelButton,
}) => {
  const { state } = useLocation();
  const [image, setImage] = useState(field.value);

  const handleOnChangeImage = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setImage(image);
    if (state.categoryId) {
      handleOnChangeDisplayCancelButton(false);
    }
    form.setFieldValue(field.name, files[0]);
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (state.categoryId) {
      handleOnChangeDisplayCancelButton(false);
    }
    form.setFieldValue(field.name, null);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        multiple
        onChange={handleOnChangeImage}
        className="hidden"
        id="image-input"
      />
      {image ? (
        <div className="w-full flex justify-center items-center p-4">
          <div className="w-3/4 flex justify-start content-start">
            <div className="w-11/12 flex justify-center items-center">
              <img src={image} alt="" className="object-cover" />
            </div>
            <div className="w-1/12 flex-1 flex flex-col justify-start items-start">
              <button
                type="button"
                className="w-full flex justify-center items-center p-1"
                onClick={() => handleDeleteImage()}
              >
                <div className="w-full flex justify-center items-center p-2 rounded-full bg-white">
                  <FontAwesomeIcon
                    icon="fas fa-trash"
                    className="text-red-600"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="image-input"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPEG, PNG, JPG or GIF (MAX : 5Mb)
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default CategoryImageUploader;
