import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Select } from "antd";

import { getAllLeaf } from "../../redux/slice/public/category.public.slice";
import {
  changeCategory,
  changeMaxPrice,
  changeMinPrice,
  changeSort,
} from "../../redux/slice/search_filter_paging/search.filter.paging.slice";
import convertToTree from "../../utils/handle/handleDataForTreeSelect";

const SearchAndFilter = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state) => state.CategoryPublic.all_leaf
  );
  const { categoryId, minPrice, maxPrice, sort } = useSelector(
    (state) => state.Filter
  );
  const convertData = data.length === 0 ? [] : convertToTree(data);

  useEffect(() => {
    dispatch(getAllLeaf());
  }, []);

  const handleOnChangeCategory = (value) => {
    dispatch(changeCategory(Number.parseInt(value)));
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
    if (value === "None") {
      dispatch(changeSort(null));
    } else {
      dispatch(changeSort(value));
    }
  };

  const handleRenderCategory = () => {
    const newData = [{ id: null, content: "None" }, ...data];
    return newData?.map((item, index) => {
      if (index === 0) {
        return (
          <option key={item.id} value={item.id} defaultChecked>
            {item.content}
          </option>
        );
      }
      return (
        <option key={item.id} value={item.id}>
          {item.content}
        </option>
      );
    });
  };

  const sortOption = [
    {
      value: null,
      label: "None",
    },
    {
      value: "rating-asc",
      label: "Rating ASC",
    },
    {
      value: "rating-desc",
      label: "Rating DESC",
    },
    {
      value: "old-product",
      label: "Old Product",
    },
    {
      value: "new-product",
      label: "New Product",
    },
  ];

  const handleRenderSortOption = () => {
    return sortOption.map((item, index) => {
      if (index === 0) {
        return (
          <option key={index} value={item.value} defaultChecked>
            {item.label}
          </option>
        );
      } else {
        return (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        );
      }
    });
  };

  return (
    <div className="col-span-7 h-12 grid grid-cols-7 gap-4">
      <div className="col-span-1"></div>
      <div className="col-span-5 w-full flex justify-start items-center gap-2">
        <div className="w-1/4 flex justify-center items-center">
          <div className="w-full flex justify-start items-center gap-2">
            <span className="shrink-0 text-white">Category</span>
            <div className="flex-1">
              <select
                onChange={(e) => handleOnChangeCategory(e.target.value)}
                className="w-full h-8 outline-none rounded"
              >
                {handleRenderCategory()}
              </select>
            </div>
          </div>
        </div>
        <div className="w-3/4 flex justify-start items-center gap-2">
          <div className="w-1/3 flex justify-start items-center gap-2">
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
          <div className="w-1/3 flex justify-start items-center gap-2">
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
          <div className="w-1/3 flex justify-start items-center gap-2">
            <span className="shrink-0 text-white">Sort</span>
            <div className="flex-1">
              <select
                onChange={(e) => handleOnChangeSort(e.target.value)}
                className="w-full h-8 outline-none rounded"
              >
                {handleRenderSortOption()}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default SearchAndFilter;
