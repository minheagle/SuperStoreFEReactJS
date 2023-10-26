import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list_order: {
    data: [],
    loading: false,
    error: "",
  },
  get_link_payment: {
    loading: false,
    error: "",
  },
  payment: {
    loading: false,
  },
  cancel_order: {
    data: null,
    loading: false,
    error: "",
  },
};

const orderForUserSlice = createSlice({
  name: "Order_For_User",
  initialState: initialState,
  reducers: {
    getListOrder: (state) => {
      state.list_order.loading = true;
    },
    getListOrderSuccess: (state, action) => {
      state.list_order.loading = false;
      state.list_order.error = "";
      state.list_order.data = action.payload;
    },
    getListOrderFailure: (state, action) => {
      state.list_order.loading = false;
      state.list_order.data = [];
      state.list_order.error = action.payload;
    },
    getLinkPayment: (state) => {
      state.get_link_payment.loading = true;
    },
    getLinkPaymentSuccess: (state, action) => {
      state.get_link_payment.loading = false;
    },
    getLinkPaymentFailure: (state, action) => {
      state.get_link_payment.loading = false;
    },
    handlePayment: (state) => {
      state.payment.loading = true;
    },
    handlePaymentSuccess: (state, action) => {
      state.payment.loading = false;
      // state.list_order.data = action.payload;
    },
    handlePaymentFailure: (state, action) => {
      state.payment.loading = false;
      // state.list_order.data = action.payload;
    },
    cancelOrder: (state) => {
      state.cancel_order.loading = true;
    },
    cancelOrderSuccess: (state, action) => {
      state.cancel_order.loading = false;
      state.cancel_order.error = "";
      state.cancel_order.data = action.payload;
    },
    cancelOrderFailure: (state, action) => {
      state.cancel_order.loading = false;
      state.cancel_order.data = null;
      state.cancel_order.error = action.payload;
    },
  },
});

export const {
  getListOrder,
  getListOrderSuccess,
  getListOrderFailure,
  getLinkPayment,
  getLinkPaymentSuccess,
  getLinkPaymentFailure,
  handlePayment,
  handlePaymentSuccess,
  handlePaymentFailure,
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
} = orderForUserSlice.actions;

export default orderForUserSlice.reducer;
