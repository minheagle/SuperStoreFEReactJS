import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import {
  changeAvatar,
  changeBackground,
} from "../../redux/slice/seller/information.seller.slice";

import defaultAvatar from "../../assets/default-avatar.jpg";

const HeaderOfShop = () => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const shopBackgroundUrl =
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg";

  const { data } = useSelector(
    (state) => state.InformationSeller.information_detail
  );

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const [newAvatar, setNewAvatar] = useState(null);
  const [avatar, setAvatar] = useState(
    data?.storeAvatarUrl ? data.storeAvatarUrl : null
  );

  const [background, setBackground] = useState(
    data?.storeBackgroundUrl ? data.storeBackgroundUrl : shopBackgroundUrl
  );
  const [newBackground, setNewBackground] = useState(null);

  const handleOnChangeAvatar = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setNewAvatar(files[0]);
    setAvatar(image);
  };

  const handleOnChangeBackground = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setNewBackground(files[0]);
    setBackground(image);
  };

  const handleChangeAvatarForm = () => {
    const formData = new FormData();
    formData.append("storeAvatar", newAvatar);

    return formData;
  };

  const handleUploadAvatar = () => {
    dispatch(
      changeAvatar({
        sellerId: shopData.id,
        storeAvatar: handleChangeAvatarForm(),
        callback: {
          notification: (message) => notify(message),
          reload: () => window.location.reload(),
        },
      })
    );
  };

  const handleChangeBackgroundForm = () => {
    const formData = new FormData();
    formData.append("storeBackground", newBackground);

    return formData;
  };

  const handleUploadBackground = () => {
    dispatch(
      changeBackground({
        sellerId: shopData.id,
        storeBackground: handleChangeBackgroundForm(),
        callback: {
          notification: (message) => notify(message),
          reload: () => window.location.reload(),
        },
      })
    );
  };

  const deleteNewAvatar = () => {
    URL.revokeObjectURL(avatar);
    setAvatar(data.storeAvatarUrl);
    setNewAvatar(null);
  };

  const deleteNewBackground = () => {
    URL.revokeObjectURL(background);
    setBackground(
      data?.storeBackgroundUrl ? data.storeBackgroundUrl : shopBackgroundUrl
    );
    setNewBackground(null);
  };

  return (
    <div className="w-full p-2">
      <div
        className={`relative w-full h-60 flex justify-start items-center rounded p-4 bg-[url('${background}')]`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="w-48 h-48 flex flex-col justify-center items-center">
          <div className="w-40 h-40 border-2 border-white rounded-full">
            {avatar ? (
              <img
                src={avatar}
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
          {newAvatar ? (
            <div className="w-full h-12 flex justify-center items-center">
              <div className="w-2/3 flex justify-between items-center gap-2">
                <button
                  onClick={() => handleUploadAvatar()}
                  className="flex-1 px-2 py-1 text-white bg-primary rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteNewAvatar()}
                  className="px-2 py-1 flex justify-center items-center bg-red-600 text-white rounded"
                >
                  <FontAwesomeIcon
                    icon="fas fa-trash-alt"
                    className="text-xl"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                id="avatar-image"
                onChange={handleOnChangeAvatar}
                className="hidden"
              />
              <label htmlFor="avatar-image">
                <div
                  type="button"
                  className="w-32 h-6 cursor-pointer flex justify-center items-center text-white font-semibold border border-white rounded"
                >
                  Change avatar
                </div>
              </label>
            </div>
          )}
        </div>
        <div className="h-12 text-white text-2xl">
          {shopData ? shopData.storeName : "Shop Name Default"}
        </div>
        <div className="absolute bottom-0 right-0 p-2">
          {newBackground ? (
            <div className="w-full h-12 flex justify-center items-center">
              <div className="w-full flex justify-between items-center gap-2">
                <button
                  onClick={() => handleUploadBackground()}
                  className="flex-1 px-2 py-1 text-white bg-primary rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => deleteNewBackground()}
                  className="px-2 py-1 flex justify-center items-center bg-red-600 text-white rounded"
                >
                  <FontAwesomeIcon
                    icon="fas fa-trash-alt"
                    className="text-xl"
                  />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                id="background"
                onChange={handleOnChangeBackground}
                className="hidden"
              />
              <label htmlFor="background">
                <div className="cursor-pointer flex justify-center items-center gap-2 text-white font-medium">
                  <FontAwesomeIcon icon="fas fa-edit" />
                  <span>Change background</span>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderOfShop;
