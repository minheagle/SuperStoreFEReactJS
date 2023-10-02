import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageUploader = ({ field, form, resetImage, handleToggleResetImage }) => {
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (resetImage) {
      setImages([]);
      handleToggleResetImage(false);
    }
  }, [resetImage]);

  const handleImageChange = (e) => {
    const files = e.target.files;

    const listImages = [...images];
    const listImageErrors = [...imageErrors];
    for (let i = 0; i < files.length; i++) {
      listImages.push(files[i]);
    }
    setImages(listImages);
    setImageErrors(listImageErrors);
    form.setFieldValue(field.name, listImages);
  };

  const handleDeleteImage = (image) => {
    const newListImage = images.filter((img) => img !== image);
    setImages(newListImage);
    form.setFieldValue(field.name, newListImage);
  };

  const handlePreviewClick = (image) => {
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleClosePreviewImage = (previewImage) => {
    URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
  };

  const handleRenderListImage = () => {
    return images?.map((image, index) => {
      return (
        <div
          key={index}
          className="flex flex-col justify-start items-center gap-2"
        >
          <div className="relative w-32 h-32 flex items-center justify-center border-2 rounded-lg object-cover">
            <img
              className=""
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
            />
            <button
              type="button"
              className="absolute w-8 h-8 top-0 left-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handlePreviewClick(image)}
            >
              <FontAwesomeIcon icon="fas fa-eye" className="text-xl" />
            </button>
            <button
              type="button"
              className="absolute w-8 h-8 top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleDeleteImage(image)}
            >
              <FontAwesomeIcon icon="fas fa-trash" className="text-xl" />
            </button>
          </div>
          {form.errors[field.name] ? (
            <span className="text-red-500 text-sm">
              {form.errors[field.name][index]}
            </span>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-3 border-2 border-dashed p-4 rounded-lg text-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-end items-center">
          <div className="w-12 h-12 flex justify-center items-center border-2 border-dashed border-slate-300 rounded-lg text-center">
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="hidden"
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="cursor-pointer w-full flex justify-center items-center"
            >
              <div className="w-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-slate-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>
        <div className="w-full flex justify-start items-center flex-wrap gap-2">
          {handleRenderListImage()}
        </div>
        {previewImage && (
          <div className="fixed inset-0 w-full h-auto flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative w-1/2 flex justify-center items-center">
              <img className="w-full h-full" src={previewImage} alt="Preview" />
              <button
                type="button"
                className="absolute w-10 h-10 top-0 right-0 text-white"
                onClick={() => handleClosePreviewImage(previewImage)}
              >
                <FontAwesomeIcon
                  icon="fas fa-times-circle"
                  className="text-2xl text-red-600"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
