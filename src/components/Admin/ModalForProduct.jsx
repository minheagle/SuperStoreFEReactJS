import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalForProduct = ({ isOpen, handleCloseModal, handleGetNewOption }) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");

  const handleSubmitOption = (newOption) => {
    handleGetNewOption(newOption);
    handleCloseModal();
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-slate-300 bg-opacity-70 z-50">
      <div className="relative flex flex-col justify-start items-center gap-4 border-2 border-slate-600 p-12 rounded">
        <label htmlFor="" className="w-full flex flex-col gap-2">
          <span className="w-full">Type : </span>
          <input
            onChange={(e) => setType(e.target.value)}
            type="text"
            className="w-full outline-none"
          />
        </label>
        <label htmlFor="" className="w-full flex flex-col gap-2">
          <span className="w-full">Name : </span>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full outline-none"
          />
        </label>
        <label htmlFor="" className="w-full flex flex-col gap-2">
          <span className="w-full">Percent : </span>
          <input
            onChange={(e) => setPercent(e.target.value)}
            type="text"
            className="w-full outline-none"
          />
        </label>
        <button
          type="button"
          onClick={() => handleSubmitOption({ type, name, percent })}
          className="w-24 h-10 flex justify-center items-center bg-slate-500 text-white rounded"
        >
          Submit
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
