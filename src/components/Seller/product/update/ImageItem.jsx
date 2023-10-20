import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalChangeImage from "./ModalChangeImage";

const ImageItem = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleToggleOpenModal = (value) => {
    setOpenModal(value);
  };

  return (
    <div className="relative group w-full">
      <img
        src={data.imgProductUrl}
        alt=""
        className="object-cover aspect-square rounded"
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-slate-300 group-hover:bg-opacity-70 transition-opacity flex justify-center items-center rounded z-30">
        <button
          onClick={() => handleToggleOpenModal(true)}
          className="w-12 h-12 flex justify-center items-center bg-primary text-white rounded-full"
        >
          <FontAwesomeIcon icon="fas fa-edit" className="text-xl" />
        </button>
      </div>
      <ModalChangeImage
        openModal={openModal}
        data={data}
        handleToggleOpenModal={handleToggleOpenModal}
      />
    </div>
  );
};

export default ImageItem;
