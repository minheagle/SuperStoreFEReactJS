import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TreeSelect, Select } from "antd";

import { getAllList } from "../../redux/slice/public/category.public.slice";
import {
  changeCategory,
  changeMaxPrice,
  changeMinPrice,
  changeSort,
} from "../../redux/slice/search_filter_paging/search.filter.paging.slice";
import convertToTree from "../../utils/handle/handleDataForTreeSelect";

const SearchAndFilter = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.CategoryPublic.list);
  const { categoryId, minPrice, maxPrice, sort } = useSelector(
    (state) => state.Filter
  );
  const convertData = data.length === 0 ? [] : convertToTree(data);

  useEffect(() => {
    dispatch(getAllList());
  }, []);

  const handleOnChangeCategory = (value) => {
    dispatch(changeCategory(value));
  };

  const handleOnChangeMinPrice = (e) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      dispatch(changeMinPrice(value));
    }
  };

  const handleOnChangeMaxPrice = (e) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value)) {
      dispatch(changeMaxPrice(value));
    }
  };

  const handleOnChangeSort = (value) => {
    dispatch(changeSort(value));
  };

  return (
    <div className="col-span-7 h-12 grid grid-cols-7 gap-4">
      <div className="col-span-1"></div>
      <div className="col-span-5 w-full flex justify-start items-center gap-2">
        <div className="w-1/4 flex justify-start items-center gap-2">
          <span className="shrink-0 text-white">Category</span>
          <TreeSelect
            notFoundContent={<div>No result</div>}
            treeData={convertData}
            value={categoryId}
            placeholder="Select your category"
            onChange={(value) => handleOnChangeCategory(value)}
            className="flex-1 hover:border-slate-300"
          />
        </div>
        <div className="w-3/4 flex justify-start items-center gap-2">
          <div className="w-2/5 flex justify-start items-center gap-2">
            <span className="shrink-0 text-white">Min Price</span>
            <div className="flex-1">
              <input
                type="number"
                value={minPrice}
                min={0}
                onChange={(e) => handleOnChangeMinPrice(e)}
                className="w-full h-8 outline-none pl-2 rounded"
              />
            </div>
          </div>
          <div className="w-2/5 flex justify-start items-center gap-2">
            <span className="shrink-0 text-white">Max Price</span>
            <div className="flex-1">
              <input
                type="number"
                min={0}
                value={maxPrice}
                onChange={(e) => handleOnChangeMaxPrice(e)}
                className="w-full h-8 outline-none pl-2 rounded"
              />
            </div>
          </div>
          <div className="w-1/5 flex justify-start items-center gap-2">
            <span className="shrink-0 text-white">Sort</span>
            <div className="flex-1">
              <Select
                value={sort}
                options={[
                  {
                    value: "ASC",
                    label: "ASC",
                  },
                  {
                    value: "DESC",
                    label: "DESC",
                  },
                ]}
                onChange={(value) => handleOnChangeSort(value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default SearchAndFilter;
