import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop_detail: {
    data: "",
    loading: false,
    message: "",
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
  },
});

export const { getShopDetail, getShopDetailSuccess, getShopDetailFailure } =
  shopPublicSlice.actions;

export default shopPublicSlice.reducer;
