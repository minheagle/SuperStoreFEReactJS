import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  get_all_of_user: {
    data: [],
    loading: false,
    error: "",
  },
  get_all_available: {
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

const voucherForUser = createSlice({
  name: "Voucher_User",
  initialState: initialState,
  reducers: {
    getAllVoucherOfUser: (state) => {
      state.get_all_of_user.loading = true;
    },
    getAllVoucherOfUserSuccess: (state, action) => {
      state.get_all_of_user.loading = false;
      state.get_all_of_user.error = "";
      state.get_all_of_user.data = action.payload;
    },
    getAllVoucherOfUserFailure: (state, action) => {
      state.get_all_of_user.loading = false;
      state.get_all_of_user.data = [];
      state.get_all_of_user.error = action.payload;
    },
    getAllAvailable: (state) => {
      state.get_all_available.loading = true;
    },
    getAllAvailableSuccess: (state, action) => {
      state.get_all_available.loading = false;
      state.get_all_available.error = "";
      state.get_all_available.data = action.payload;
    },
    getAllAvailableFailure: (state, action) => {
      state.get_all_available.loading = false;
      state.get_all_available.data = [];
      state.get_all_available.error = action.payload;
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
  getAllVoucherOfUser,
  getAllVoucherOfUserSuccess,
  getAllVoucherOfUserFailure,
  getAllAvailable,
  getAllAvailableSuccess,
  getAllAvailableFailure,
  getVoucher,
  getVoucherSuccess,
  getVoucherFailure,
} = voucherForUser.actions;

export default voucherForUser.reducer;
