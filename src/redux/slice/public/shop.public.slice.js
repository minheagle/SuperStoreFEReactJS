import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop_detail: {
    data: "",
    loading: false,
    message: "",
    error: "",
  },
  shop_detail_by_name: {
    data: "",
    loading: false,
    message: "",
    error: "",
  },
  product_of_shop: {
    data: [],
    loading: false,
    error: "",
  },
};

const shopPublicSlice = createSlice({
  name: "Shop_Public",
  initialState: initialState,
  reducers: {
    getShopDetail: (state) => {
      state.shop_detail.loading = true;
    },
    getShopDetailSuccess: (state, action) => {
      state.shop_detail.loading = false;
      state.shop_detail.error = "";
      state.shop_detail.data = action.payload;
    },
    getShopDetailFailure: (state, action) => {
      state.shop_detail.loading = false;
      state.shop_detail.data = "";
      state.shop_detail.error = action.payload;
    },
    getShopDetailByName: (state) => {
      state.shop_detail.loading = true;
    },
    getShopDetailByNameSuccess: (state, action) => {
      state.shop_detail.loading = false;
      state.shop_detail.error = "";
      state.shop_detail.data = action.payload;
    },
    getShopDetailByNameFailure: (state, action) => {
      state.shop_detail.loading = false;
      state.shop_detail.data = "";
      state.shop_detail.error = action.payload;
    },
    getProductOfShop: (state) => {
      state.product_of_shop.loading = true;
    },
    getProductOfShopByName: (state) => {
      state.product_of_shop.loading = true;
    },
    getProductOfShopSuccess: (state, action) => {
      state.product_of_shop.loading = false;
      state.product_of_shop.error = "";
      state.product_of_shop.data = action.payload;
    },
    getProductOfShopFailure: (state, action) => {
      state.product_of_shop.loading = false;
      state.product_of_shop.data = "";
      state.product_of_shop.error = action.payload;
    },
  },
});

export const {
  getShopDetail,
  getShopDetailSuccess,
  getShopDetailFailure,
  getShopDetailByName,
  getShopDetailByNameSuccess,
  getShopDetailByNameFailure,
  getProductOfShop,
  getProductOfShopByName,
  getProductOfShopSuccess,
  getProductOfShopFailure,
} = shopPublicSlice.actions;

export default shopPublicSlice.reducer;
