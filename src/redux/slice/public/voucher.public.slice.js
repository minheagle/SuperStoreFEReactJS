import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  get_all_voucher_from_shop: {
    data: [],
    loading: false,
    error: "",
  },
  get_voucher: {
    data: null,
    loading: false,
    error: "",
  },
};

const voucherPublicSlice = createSlice({
  name: "Voucher_Public",
  initialState: initialState,
  reducers: {
    getAllVoucherFromShop: (state) => {
      state.get_all_voucher_from_shop.loading = true;
    },
    getAllVoucherFromShopSuccess: (state, action) => {
      state.get_all_voucher_from_shop.loading = false;
      state.get_all_voucher_from_shop.error = "";
      state.get_all_voucher_from_shop.data = action.payload;
    },
    getAllVoucherFromShopFailure: (state, action) => {
      state.get_all_voucher_from_shop.loading = false;
      state.get_all_voucher_from_shop.data = [];
      state.get_all_voucher_from_shop.error = action.payload;
    },
    getVoucher: (state) => {
      state.get_voucher.loading = true;
    },
    getVoucherSuccess: (state, action) => {
      state.get_voucher.loading = false;
      state.get_voucher.error = "";
      state.get_voucher.data = action.payload;
    },
    getVoucherFailure: (state, action) => {
      state.get_voucher.loading = false;
      state.get_voucher.data = null;
      state.get_voucher.error = action.payload;
    },
  },
});

export const {
  getAllVoucherFromShop,
  getAllVoucherFromShopSuccess,
  getAllVoucherFromShopFailure,
  getVoucher,
  getVoucherSuccess,
  getVoucherFailure,
} = voucherPublicSlice.actions;

export default voucherPublicSlice.reducer;
