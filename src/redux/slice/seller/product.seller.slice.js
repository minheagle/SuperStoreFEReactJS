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
  get_detail: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
  get_item_detail: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
  update_product: {
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
    getDetail: (state) => {
      state.get_detail.loading = true;
    },
    getDetailSuccess: (state, action) => {
      state.get_detail.loading = false;
      state.get_detail.error = "";
      state.get_detail.data = action.payload;
    },
    getDetailFailure: (state, action) => {
      state.get_detail.loading = false;
      state.get_detail.data = null;
      state.get_detail.error = action.payload;
    },
    getProductItemDetail: (state) => {
      state.get_item_detail.loading = true;
    },
    getProductItemDetailSuccess: (state, action) => {
      state.get_item_detail.loading = false;
      state.get_item_detail.error = "";
      state.get_item_detail.data = action.payload;
    },
    getProductItemDetailFailure: (state, action) => {
      state.get_item_detail.loading = false;
      state.get_item_detail.data = null;
      state.get_item_detail.error = action.payload;
    },
    updateProduct: (state) => {
      state.update_product.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.update_product.loading = true;
      state.update_product.error = "";
      state.update_product.message = action.payload;
    },
    updateProductFailure: (state, action) => {
      state.update_product.loading = true;
      state.update_product.message = "";
      state.update_product.error = action.payload;
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
  getDetail,
  getDetailSuccess,
  getDetailFailure,
  getProductItemDetail,
  getProductItemDetailSuccess,
  getProductItemDetailFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
} = productForSellerSlice.actions;

export default productForSellerSlice.reducer;
