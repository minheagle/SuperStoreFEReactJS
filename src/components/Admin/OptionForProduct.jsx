import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalForProduct from "./ModalForProduct";

const OptionForProduct = ({ handleOnChangeOptions }) => {
  const [options, setOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    handleOnChangeOptions(options);
  }, [options]);

  const handleAddNewOption = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGetNewOption = (newOptionForm) => {
    setOptions([...options, newOptionForm]);
  };

  const handleDeleteOption = (indexRemove) => {
    const newOptions = options.filter((item, index) => index !== indexRemove);
    setOptions(newOptions);
  };

  const handleRenderOptions = () => {
    return options?.map((item, index) => {
      return (
        <div key={index} className="w-1/4 flex justify-center items-center p-2">
          <div className="relative w-full flex flex-col justify-start items-start border-2 border-slate-500 rounded p-2">
            <label htmlFor="">
              <span>Type : </span>
              <span>{item.type}</span>
            </label>
            <label htmlFor="">
              <span>Name : </span>
              <span>{item.name}</span>
            </label>
            <label htmlFor="">
              <span>Percent : </span>
              <span>{item.percent}</span>
            </label>
            <button
              type="button"
              onClick={() => handleDeleteOption(index)}
              className="absolute top-0 right-0 w-6 h-6 flex justify-center items-center border border-dashed border-slate-500 bg-red-500"
            >
              <FontAwesomeIcon icon="fas fa-trash" className="text-white" />
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 border border-slate-500 p-2 rounded">
      <div className="w-full flex justify-end items-center">
        <button
          type="button"
          onClick={() => handleAddNewOption()}
          className="w-8 h-8 flex justify-center items-center border border-dashed border-slate-500 rounded"
        >
          <FontAwesomeIcon icon="fas fa-plus" />
        </button>
      </div>
      <div className="w-full flex justify-start items-center flex-wrap">
        {handleRenderOptions()}
      </div>
      <ModalForProduct
        isOpen={openModal}
        handleCloseModal={handleCloseModal}
        handleGetNewOption={handleGetNewOption}
      />
    </div>
  );
};

export default OptionForProduct;
