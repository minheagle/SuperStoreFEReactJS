import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AvatarUploader = ({ field, form, errors }) => {
  const [avatar, setAvatar] = useState(field.value);

  const handleOnChangeAvatar = (e) => {
    const files = e.target.files;
    const image = URL.createObjectURL(files[0]);
    setAvatar(image);
    form.setFieldValue(field.name, files[0]);
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
                errors.avatar ? "border-2 border-red-500" : ""
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
      {errors.avatar ? (
        <span className="text-red-500">{errors.avatar}</span>
      ) : (
        ""
      )}
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
    </div>
  );
};

export default AvatarUploader;
