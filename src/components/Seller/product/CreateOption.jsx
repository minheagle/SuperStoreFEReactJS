import React from "react";

const CreateOption = ({ field, form }) => {
  return (
    <div className="w-full flex justify-start items-center flex-wrap gap-3 border-2 border-dashed p-4 rounded-lg text-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-end items-center">
          <div className="w-12 h-12 flex justify-center items-center border-2 border-dashed border-slate-300 rounded-lg text-center">
            <label className="cursor-pointer w-full flex justify-center items-center">
              <div className="w-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-slate-300"
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
        </div>
      </div>
    </div>
  );
};

export default CreateOption;
