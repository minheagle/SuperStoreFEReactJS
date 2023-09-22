import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutShop = () => {
  return (
    <div className="w-full h-64 bg-white grid grid-cols-12">
      <div className="col-span-1"></div>
      <div className="col-span-10 flex justify-start items-center">
        <div className="w-1/3">
          <div className="w-full h-48 flex flex-col justify-start items-center rounded-lg px-8 bg-[url('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg')]">
            <div className="w-full py-2">
              <div className="w-32 h-32 border-2 border-slate-400 rounded-full"></div>
            </div>
            <div className="w-full flex justify-between items-center text-white">
              <button
                type="button"
                className="w-2/5 h-8 flex justify-center items-center gap-2 border border-slate-400 rounded"
              >
                <FontAwesomeIcon icon="fas fa-plus" />
                <span>Follow</span>
              </button>
              <button
                type="button"
                className="w-2/5 h-8 flex justify-center items-center gap-2 border border-slate-400 rounded"
              >
                <FontAwesomeIcon icon="fas fa-comments" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3">Col 2</div>
        <div className="w-1/3">Col 3</div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default AboutShop;
