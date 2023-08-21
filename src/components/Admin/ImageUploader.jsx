import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageUploader = ({ images, handleImageChange, handleDeleteImage }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handlePreviewClick = (image) => {
    setPreviewImage(URL.createObjectURL(image));
  };

  return (
    <div className="flex justify-start items-center flex-wrap gap-3 border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
      <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="hidden"
          id="image-input"
        />
        <label htmlFor="image-input" className="cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
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
      {images.map((image, index) => (
        <div
          key={index}
          className="relative w-32 h-32 flex items-center justify-center border-2 border-gray-300 rounded-lg"
        >
          <img
            className="mt-2 max-w-full h-auto"
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
      ))}
      {previewImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <img
            className="max-h-screen max-w-full"
            src={previewImage}
            alt="Preview"
          />
          <button
            type="button"
            className="absolute w-10 h-10 top-4 right-4 text-white"
            onClick={() => setPreviewImage(null)}
          >
            <FontAwesomeIcon
              icon="fas fa-times-circle"
              className="text-2xl bg-red-500 rounded-full"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
