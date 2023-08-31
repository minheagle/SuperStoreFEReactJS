import { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PAGING from "../../constants/PAGING.js";

const Paging = ({ total }) => {
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const totalPage =
    total % numberPerPage === 0
      ? total / numberPerPage
      : Math.floor(total / numberPerPage) + 1;

  const previousPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page === totalPage) return;
    setPage(page + 1);
  };

  return (
    <div className="w-full flex justify-center items-center m-4">
      <div className="w-2/12"></div>
      <div className="w-8/12 flex justify-center items-center gap-4 text-xl">
        <button onClick={() => previousPage()}>
          <FontAwesomeIcon
            icon="fas fa-chevron-circle-left"
            className="text-2xl text-slate-600"
          />
        </button>
        <span>Page</span>
        <span>{page}</span>
        <span>of</span>
        <span>{totalPage}</span>
        <button onClick={() => nextPage()}>
          <FontAwesomeIcon
            icon="fas fa-chevron-circle-right"
            className="text-2xl text-slate-600"
          />
        </button>
      </div>
      <div className="w-2/12">
        <div className="w-full flex justify-start items-center">
          <div className="w-8/10 flex justify-start items-center gap-2 p-2 bg-slate-500 rounded text-white">
            <span>Number per page</span>
            <select
              name=""
              id=""
              defaultValue={numberPerPage}
              onChange={(e) => setNumberPerPage(e.target.value)}
              className="text-slate-700"
            >
              <option value={PAGING.ADMIN.TEN_ITEM_PER_PAGE}>
                {PAGING.ADMIN.TEN_ITEM_PER_PAGE}
              </option>
              <option value={PAGING.ADMIN.TWENTY_FIVE_ITEM_PER_PAGE}>
                {PAGING.ADMIN.TWENTY_FIVE_ITEM_PER_PAGE}
              </option>
              <option value={PAGING.ADMIN.FIFTY_ITEM_PER_PAGE}>
                {PAGING.ADMIN.FIFTY_ITEM_PER_PAGE}
              </option>
              <option value={PAGING.ADMIN.ONE_HUNDRED_ITEM_PER_PAGE}>
                {PAGING.ADMIN.ONE_HUNDRED_ITEM_PER_PAGE}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paging;
