import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalForProduct from "./ModalForProduct";

const OptionForProduct = ({
  field,
  form,
  resetOptions,
  handleToggleResetOptions,
}) => {
  const [options, setOptions] = useState(field.value || []);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (resetOptions) {
      setOptions([]);
      handleToggleResetOptions(false);
    }
  }, [resetOptions]);

  const handleAddNewOption = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleGetNewOption = (newOptionForm) => {
    setOptions([...options, newOptionForm]);
    form.setFieldValue(field.name, [...options, newOptionForm]);
  };

  const handleDeleteOption = (indexRemove) => {
    const newOptions = options.filter((item, index) => index !== indexRemove);
    setOptions(newOptions);
    form.setFieldValue(field.name, newOptions);
  };

  const handleRenderOptions = () => {
    return options?.map((item, index) => {
      return (
        <div key={index} className="w-1/2 flex justify-center items-center p-2">
          <div className="relative w-full flex flex-col justify-start items-start">
            <div className="w-full flex flex-col justify-start items-center border-2 border-slate-500 rounded pt-6 pl-4">
              <label
                htmlFor=""
                className="w-full flex justify-normal items-center gap-1"
              >
                <span className="font-semibold">Type : </span>
                <span>{item.optionName}</span>
              </label>
              <label
                htmlFor=""
                className="w-full flex justify-normal items-center gap-1"
              >
                <span className="font-semibold">Name : </span>
                <span>{item.optionValueRequest}</span>
              </label>
            </div>
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
