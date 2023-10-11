import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
  minPrice: 0,
  maxPrice: 0,
  productName: null,
  page: 1,
  size: 24,
  sort: "ASC",
};

const searchFilterPagingSlice = createSlice({
  name: "Search_And_Filter",
  initialState: initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    changeMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    changeMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    changeProductName: (state, action) => {
      state.productName = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  changeCategory,
  changeMinPrice,
  changeMaxPrice,
  changeProductName,
  changePage,
  changeSize,
  changeSort,
} = searchFilterPagingSlice.actions;

export default searchFilterPagingSlice.reducer;
