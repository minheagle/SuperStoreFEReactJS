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
  update_product_item: {
    loading: false,
    message: "",
    error: "",
  },
  update_image_product_item: {
    loading: false,
    message: "",
    error: "",
  },
  delete_product: {
    loading: false,
    message: "",
    error: "",
  },
  delete_product_item: {
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
      state.update_product.loading = false;
      state.update_product.error = "";
      state.update_product.message = action.payload;
    },
    updateProductFailure: (state, action) => {
      state.update_product.loading = false;
      state.update_product.message = "";
      state.update_product.error = action.payload;
    },
    updateProductItem: (state) => {
      state.update_product_item.loading = true;
    },
    updateProductItemSuccess: (state, action) => {
      state.update_product_item.loading = false;
      state.update_product_item.error = "";
      state.update_product_item.message = action.payload;
    },
    updateProductItemFailure: (state, action) => {
      state.update_product_item.loading = false;
      state.update_product_item.message = "";
      state.update_product_item.error = action.payload;
    },
    updateImageProductItem: (state) => {
      state.update_image_product_item.loading = true;
    },
    updateImageProductItemSuccess: (state, action) => {
      state.update_image_product_item.loading = false;
      state.update_image_product_item.error = "";
      state.update_image_product_item.message = action.payload;
    },
    updateImageProductItemFailure: (state, action) => {
      state.update_image_product_item.loading = false;
      state.update_image_product_item.message = "";
      state.update_image_product_item.error = action.payload;
    },
    deleteProduct: (state) => {
      state.delete_product.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.delete_product.loading = false;
      state.delete_product.error = "";
      state.delete_product.message = action.payload;
    },
    deleteProductFailure: (state, action) => {
      state.delete_product.loading = false;
      state.delete_product.message = "";
      state.delete_product.error = action.payload;
    },
    deleteProductItem: (state) => {
      state.delete_product_item.loading = true;
    },
    deleteProductItemSuccess: (state, action) => {
      state.delete_product_item.loading = false;
      state.delete_product_item.error = "";
      state.delete_product_item.message = action.payload;
    },
    deleteProductItemFailure: (state, action) => {
      state.delete_product_item.loading = false;
      state.delete_product_item.message = "";
      state.delete_product_item.error = action.payload;
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
  updateProductItem,
  updateProductItemSuccess,
  updateProductItemFailure,
  updateImageProductItem,
  updateImageProductItemSuccess,
  updateImageProductItemFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  deleteProductItem,
  deleteProductItemSuccess,
  deleteProductItemFailure,
} = productForSellerSlice.actions;

export default productForSellerSlice.reducer;
