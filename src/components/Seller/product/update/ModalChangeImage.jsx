import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  updateImageProductItem,
  getProductItemDetail,
} from "../../../../redux/slice/seller/product.seller.slice";

const ModalChangeImage = ({ openModal, data, handleToggleOpenModal }) => {
  const dispatch = useDispatch();
  const { shopName, productId, productItemId } = useParams();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const { update_image_product_item } = useSelector(
    (state) => state.ProductSeller
  );

  //   console.log(file);

  const handleOnChangeImage = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setImage(image);
    setFile(files[0]);
  };

  const handleCancelChange = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setFile(null);
  };

  const handleCloseModal = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setFile(null);
    handleToggleOpenModal(false);
  };

  const handleFormData = () => {
    const formData = new FormData();
    formData.append("imageProductItemId", data.imgProductId);
    formData.append("imagePublicId", data.imgPublicId);
    formData.append("file", file);
    return formData;
  };

  const handleCallback = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(null);
    setFile(null);
    handleToggleOpenModal(false);
    dispatch(getProductItemDetail({ productId, productItemId }));
  };

  const handleSaveChange = () => {
    if (file) {
      dispatch(
        updateImageProductItem({
          changeImageProductItem: handleFormData(),
          callback: {
            reload: () => handleCallback(),
          },
        })
      );
    }
  };

  return openModal ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="w-[324px] h-[372px] flex flex-col justify-start items-center bg-white rounded">
        <div className="w-full flex justify-end items-center text-red-600 text-xl">
          <button
            onClick={() => handleCloseModal()}
            className="w-6 h-6 flex justify-center items-center"
          >
            <FontAwesomeIcon
              icon="fas fa-window-close"
              className="w-full h-full"
            />
          </button>
        </div>
        <input
          type="file"
          multiple
          onChange={handleOnChangeImage}
          className="hidden"
          id="image-input"
        />
        <div className="w-[300px] h-[300px] flex justify-center items-center">
          {image ? (
            <img
              src={image}
              alt=""
              className="w-full object-cover aspect-square rounded"
            />
          ) : (
            <img
              src={data.imgProductUrl}
              alt=""
              className="w-full object-cover aspect-square rounded"
            />
          )}
        </div>
        <div className="w-full h-12 flex justify-start items-center py-1 pl-4">
          {image ? (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => handleCancelChange()}
                className="px-2 py-1 bg-primary text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveChange()}
                className="flex justify-start items-center gap-2 px-2 py-1 bg-primary text-white rounded"
              >
                {update_image_product_item.loading ? (
                  <div>
                    <svg
                      aria-hidden="true"
                      className="inline w-4 h-4 text-gray-200 animate-spin fill-primary"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  ""
                )}
                <span>Save</span>
              </button>
            </div>
          ) : (
            <label htmlFor="image-input">
              <div className="px-2 py-1 bg-primary text-white rounded">
                Change
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalChangeImage;
