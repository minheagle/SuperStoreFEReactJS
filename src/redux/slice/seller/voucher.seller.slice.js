import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list_of_seller: {
    data: [],
    loading: false,
    error: "",
  },
  create_voucher: {
    data: null,
    loading: false,
    error: "",
  },
  toggle_status: {
    loading: false,
    message: "",
    error: "",
  },
};

const voucherForSellerSlice = createSlice({
  name: "Voucher_For_Seller",
  initialState: initialState,
  reducers: {
    getAllListOfSeller: (state) => {
      state.list_of_seller.loading = true;
    },
    getAllListOfSellerSuccess: (state, action) => {
      state.list_of_seller.loading = false;
      state.list_of_seller.error = "";
      state.list_of_seller.data = action.payload;
    },
    getAllListOfSellerFailure: (state, action) => {
      state.list_of_seller.loading = false;
      state.list_of_seller.data = [];
      state.list_of_seller.error = action.payload;
    },
    createVoucher: (state) => {
      state.create_voucher.loading = true;
    },
    createVoucherSuccess: (state, action) => {
      state.create_voucher.loading = false;
      state.create_voucher.error = "";
      state.create_voucher.data = action.payload;
    },
    createVoucherFailure: (state, action) => {
      state.create_voucher.loading = false;
      state.create_voucher.data = null;
      state.create_voucher.error = action.payload;
    },
    toggleStatus: (state) => {
      state.toggle_status.loading = true;
    },
    toggleStatusSuccess: (state, action) => {
      state.toggle_status.loading = false;
      state.toggle_status.error = "";
      state.toggle_status.message = action.payload;
    },
    toggleStatusFailure: (state, action) => {
      state.toggle_status.loading = false;
      state.toggle_status.message = "";
      state.toggle_status.error = action.payload;
    },
  },
});

export const {
  getAllListOfSeller,
  getAllListOfSellerSuccess,
  getAllListOfSellerFailure,
  createVoucher,
  createVoucherSuccess,
  createVoucherFailure,
  toggleStatus,
  toggleStatusSuccess,
  toggleStatusFailure,
} = voucherForSellerSlice.actions;

export default voucherForSellerSlice.reducer;
