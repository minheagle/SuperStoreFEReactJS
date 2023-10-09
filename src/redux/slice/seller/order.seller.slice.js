import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_order: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
  all_order_confirm: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
  confirm_order: {
    loading: false,
    message: "",
    error: "",
  },
  rejection_order: {
    loading: false,
    message: "",
    error: "",
  },
};

const orderForSellerSlice = createSlice({
  name: "Order_For_Seller",
  initialState: initialState,
  reducers: {
    getAllOrder: (state) => {
      state.all_order.loading = true;
    },
    getAllOrderSuccess: (state, action) => {
      state.all_order.loading = false;
      state.all_order.error = "";
      state.all_order.data = action.payload;
    },
    getAllOrderFailure: (state, action) => {
      state.all_order.loading = false;
      state.all_order.data = [];
      state.all_order.error = action.payload;
    },
    getAllOrderConfirm: (state) => {
      state.all_order_confirm.loading = true;
    },
    getAllOrderConfirmSuccess: (state, action) => {
      state.all_order_confirm.loading = false;
      state.all_order_confirm.error = "";
      state.all_order_confirm.data = action.payload;
    },
    getAllOrderConfirmFailure: (state, action) => {
      state.all_order_confirm.loading = false;
      state.all_order_confirm.data = [];
      state.all_order_confirm.error = action.payload;
    },
    confirmOrder: (state) => {
      state.confirm_order.loading = true;
    },
    confirmOrderSuccess: (state, action) => {
      state.confirm_order.loading = false;
      state.confirm_order.error = "";
      state.confirm_order.message = action.payload;
    },
    confirmOrderFailure: (state, action) => {
      state.confirm_order.loading = false;
      state.confirm_order.message = "";
      state.confirm_order.error = action.payload;
    },
    rejectionOrder: (state) => {
      state.rejection_order.loading = true;
    },
    rejectionOrderSuccess: (state, action) => {
      state.rejection_order.loading = false;
      state.rejection_order.error = "";
      state.rejection_order.message = action.payload;
    },
    rejectionOrderFailure: (state, action) => {
      state.rejection_order.loading = false;
      state.rejection_order.message = "";
      state.rejection_order.error = action.payload;
    },
  },
});

export const {
  getAllOrder,
  getAllOrderSuccess,
  getAllOrderFailure,
  getAllOrderConfirm,
  getAllOrderConfirmSuccess,
  getAllOrderConfirmFailure,
  confirmOrder,
  confirmOrderSuccess,
  confirmOrderFailure,
  rejectionOrder,
  rejectionOrderSuccess,
  rejectionOrderFailure,
} = orderForSellerSlice.actions;

export default orderForSellerSlice.reducer;
