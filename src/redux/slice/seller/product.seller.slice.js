import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  },
});

export const { createProduct, createProductSuccess, createProductFailure } =
  productForSellerSlice.actions;

export default productForSellerSlice.reducer;
