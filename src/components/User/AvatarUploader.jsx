import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { changeAvatar } from "../../redux/slice/user/user.slice";

const AvatarUploader = ({ userId, value, imagePublicId }) => {
  const dispatch = useDispatch();
  const notify = (message) => toast(message);

  const [newAvatar, setNewAvatar] = useState(null);
  const [avatar, setAvatar] = useState(value);
  const errors = {};

  const handleOnChangeAvatar = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setNewAvatar(files[0]);
    setAvatar(image);
  };

  const handleChangeAvatarForm = () => {
    const formData = new FormData();
    formData.append("publicId", imagePublicId);
    formData.append("avatar", newAvatar);

    return formData;
  };

  const deleteNewAvatar = () => {
    URL.revokeObjectURL(avatar);
    setAvatar(value);
  };

  const handleSaveAvatar = () => {
    dispatch(
      changeAvatar({
        userId: userId,
        changeAvatar: handleChangeAvatarForm(),
        callback: {
          notification: (message) => notify(message),
          refresh: () => window.location.reload(),
        },
      })
    );
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4">
      <input
        type="file"
        multiple
        onChange={handleOnChangeAvatar}
        className="hidden"
        id="image-input"
      />
      <div>
        {avatar ? (
          <div className="w-24 h-24">
            <img
              src={avatar}
              alt=""
              className={`w-24 h-24 object-cover rounded-full ${
                errors?.avatar ? "border-2 border-red-500" : ""
              }`}
            />
          </div>
        ) : (
          <div className="w-24 h-24 flex justify-center items-center bg-slate-100 rounded-full">
            <FontAwesomeIcon
              icon="fas fa-user"
              className="text-4xl text-slate-300"
            />
          </div>
        )}
      </div>
      {errors?.avatar ? (
        <span className="text-red-500">{errors.avatar}</span>
      ) : (
        ""
      )}
      {newAvatar ? (
        <div className="w-full h-12 flex justify-center items-center">
          <div className="w-2/3 flex justify-between items-center gap-2">
            <button
              onClick={() => handleSaveAvatar()}
              className="flex-1 h-10 text-white bg-primary rounded"
            >
              Save
            </button>
            <button
              onClick={() => deleteNewAvatar()}
              className="w-10 h-10 flex justify-center items-center bg-red-600 text-white rounded"
            >
              <FontAwesomeIcon icon="fas fa-trash-alt" className="text-xl" />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="image-input"
          className="cursor-pointer w-full flex justify-center items-center"
        >
          <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className=" bg-primary text-white rounded px-4 py-2">
              Select Image
            </div>
            <div className="flex flex-col justify-start items-start text-sm font-light">
              <span>Max size : 2Mb</span>
              <span>Type support : JPEG, JPG, PNG, GIF</span>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default AvatarUploader;
