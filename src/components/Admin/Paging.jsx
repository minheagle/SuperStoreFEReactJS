import { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PAGING from "../../constants/PAGING.js";

const Paging = () => {
  const [numberPerPage, setNumberPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { totalCount } = useSelector((state) => state.UserForAdmin.list);

  const totalPage =
    totalCount % numberPerPage === 0
      ? totalCount / numberPerPage
      : Math.floor(totalCount / numberPerPage) + 1;

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
              <option value={PAGING.ADMIN.OPTION_1}>
                {PAGING.ADMIN.OPTION_1}
              </option>
              <option value={PAGING.ADMIN.OPTION_2}>
                {PAGING.ADMIN.OPTION_2}
              </option>
              <option value={PAGING.ADMIN.OPTION_3}>
                {PAGING.ADMIN.OPTION_3}
              </option>
              <option value={PAGING.ADMIN.OPTION_4}>
                {PAGING.ADMIN.OPTION_4}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paging;
