import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    totalCount: null,
    loading: false,
    error: "",
  },
  detail: {
    data: null,
    loading: false,
    error: "",
  },
  create: {
    loading: false,
    error: "",
  },
};

const productForAdminSlice = createSlice({
  name: "Product_For_Admin",
  initialState: initialState,
  reducers: {
    createProduct: (state) => {
      state.create.loading = true;
    },
    createProductSuccess: (state) => {
      state.create.loading = false;
      state.create.error = "";
    },
    createProductFailure: (state, action) => {
      state.create.loading = false;
      state.create.error = action.payload;
    },
  },
});

export const { createProduct, createProductSuccess, createProductFailure } =
  productForAdminSlice.actions;

export default productForAdminSlice.reducer;
