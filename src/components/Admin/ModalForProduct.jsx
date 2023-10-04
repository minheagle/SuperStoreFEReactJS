import { useState } from "react";
import * as Yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import optionProductValidator from "../../utils/validate/Product/option.product.validator.schema";

const ModalForProduct = ({ isOpen, handleCloseModal, handleGetNewOption }) => {
  const [option, setOption] = useState({
    optionName: "",
    optionValueRequest: "",
  });

  const [errors, setErrors] = useState({
    optionName: "",
    optionValueRequest: "",
  });

  const validateField = async (fieldName, value) => {
    try {
      await Yup.reach(optionProductValidator, fieldName).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setOption((prevData) => ({ ...prevData, [name]: value }));
    await validateField(name, value);
  };

  const handleSubmitOption = async (newOption) => {
    for (const property in newOption) {
      await validateField(property, newOption[property]);
    }
    if (
      newOption.optionValueRequest &&
      newOption.optionName &&
      !errors.optionValueRequest &&
      !errors.optionName
    ) {
      handleGetNewOption(newOption);
      handleCloseModal();
      setOption({
        optionName: "",
        optionValueRequest: "",
      });
    }
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-40">
      <div className="relative w-1/3 flex flex-col justify-start items-center gap-4 border-2 border-slate-600 bg-slate-300 p-12 rounded">
        <div className="w-full flex flex-col justify-start items-center gap-2">
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="type"
              className="w-full flex justify-start items-center font-semibold"
            >
              Type Option :
            </label>
            {errors.optionName ? (
              <div className="w-full flex justify-end items-center gap-2 text-red-500">
                <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                <span className="text-sm">{errors.optionName}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            id="optionName"
            name="optionName"
            value={option.optionName}
            placeholder="Enter your type"
            onChange={(e) => handleChange(e)}
            className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
              errors.optionName ? "outline outline-2 outline-red-500" : ""
            }`}
          />
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-2">
          <div className="w-full flex justify-between items-center">
            <label
              htmlFor="type"
              className="w-full flex justify-start items-center font-semibold"
            >
              Name Option :
            </label>
            {errors.optionValueRequest ? (
              <div className="w-full flex justify-end items-center gap-2 text-red-500">
                <FontAwesomeIcon icon="fas fa-info-circle" className="" />
                <span className="text-sm">{errors.optionValueRequest}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <input
            type="text"
            id="optionValueRequest"
            name="optionValueRequest"
            value={option.optionValueRequest}
            placeholder="Enter your name option"
            onChange={(e) => handleChange(e)}
            className={`w-full flex justify-center items-center outline-none shadow appearance-none border rounded pl-2 ${
              errors.optionValueRequest
                ? "outline outline-2 outline-red-500"
                : ""
            }`}
          />
        </div>
        <button
          type="button"
          onClick={() => handleSubmitOption(option)}
          className="w-24 h-10 flex justify-center items-center bg-slate-500 text-white rounded"
        >
          Add
        </button>
        <button
          onClick={() => handleCloseModal()}
          type="button"
          className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded"
        >
          <FontAwesomeIcon icon="fas fa-times-circle" className="text-white" />
        </button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalForProduct;
