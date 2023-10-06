import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProduct: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
  createProduct: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
};

const productForSellerSlice = createSlice({
  name: "Product_Seller",
  initialState: initialState,
  reducers: {
    createProduct: (state) => {
      state.createProduct.loading = true;
    },
    createProductSuccess: (state, action) => {
      state.createProduct.loading = false;
      state.createProduct.error = "";
      state.createProduct.data = action.payload.data;
      state.createProduct.message = action.payload.message;
    },
    createProductFailure: (state, action) => {
      state.createProduct.loading = false;
      state.createProduct.error = action.payload;
      state.createProduct.data = "";
      state.createProduct.message = "";
    },
    getAllList: (state) => {
      state.listProduct.loading = true;
    },
    getAllListSuccess: (state, action) => {
      state.listProduct.loading = false;
      state.listProduct.error = "";
      state.listProduct.data = action.payload;
    },
    getAllListFailure: (state, action) => {
      state.listProduct.loading = false;
      state.listProduct.data = [];
      state.listProduct.error = action.payload;
    },
  },
});

export const {
  createProduct,
  createProductSuccess,
  createProductFailure,
  getAllList,
  getAllListSuccess,
  getAllListFailure,
} = productForSellerSlice.actions;

export default productForSellerSlice.reducer;
