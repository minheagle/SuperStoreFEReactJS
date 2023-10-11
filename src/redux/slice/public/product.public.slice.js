import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    total: 0,
    loading: false,
    message: "",
    error: "",
  },
  detail: {
    data: "",
    loading: "",
    message: "",
    error: "",
  },
};

const productPublicSlice = createSlice({
  name: "Product_Public",
  initialState: initialState,
  reducers: {
    getAllListProduct: (state) => {
      state.list.loading = true;
    },
    getAllListSuccess: (state, action) => {
      state.list.loading = false;
      state.list.error = "";
      state.list.data = action.payload.data;
      state.list.total = action.payload.total;
    },
    getAllListFailure: (state, action) => {
      state.list.loading = false;
      state.list.data = [];
      state.list.error = action.payload;
    },
    search: (state) => {
      state.list.loading = true;
    },
    searchSuccess: (state, action) => {
      state.list.loading = false;
      state.list.error = "";
      state.list.data = action.payload;
    },
    searchFailure: (state, action) => {
      state.list.loading = false;
      state.list.data = [];
      state.list.error = action.payload;
    },
    getDetail: (state) => {
      state.detail.loading = true;
    },
    getDetailSuccess: (state, action) => {
      state.detail.loading = false;
      state.detail.error = "";
      state.detail.data = action.payload;
    },
    getDetailFailure: (state, action) => {
      state.detail.loading = false;
      state.detail.data = "";
      state.detail.error = action.payload;
    },
  },
});

export const {
  getAllListProduct,
  getAllListSuccess,
  getAllListFailure,
  search,
  searchSuccess,
  searchFailure,
  getDetail,
  getDetailSuccess,
  getDetailFailure,
} = productPublicSlice.actions;

export default productPublicSlice.reducer;
