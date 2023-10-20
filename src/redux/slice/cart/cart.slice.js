import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart_list: {
    data: [],
    total: 0,
    loading: false,
    message: "",
    error: "",
  },
  add_to_cart: {
    loading: false,
    message: "",
    error: "",
  },
  update_quantity: {
    loading: false,
    message: "",
    error: "",
  },
  delete_cart_item: {
    loading: false,
    message: "",
    error: "",
  },
  checkout: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
  save_order: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    getCartList: (state) => {
      state.cart_list.loading = true;
    },
    getCartListSuccess: (state, action) => {
      state.cart_list.loading = false;
      state.cart_list.error = "";
      state.cart_list.data = action.payload.data;
      state.cart_list.total = action.payload.total;
    },
    getCartListFailure: (state, action) => {
      state.cart_list.loading = false;
      state.cart_list.data = [];
      state.cart_list.error = action.payload;
    },
    addToCart: (state) => {
      state.add_to_cart.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.add_to_cart.loading = false;
      state.add_to_cart.error = "";
      state.add_to_cart.message = action.payload.message;
      state.cart_list.data = action.payload.data;
      state.cart_list.total = action.payload.total;
    },
    addToCartFailure: (state, action) => {
      state.add_to_cart.loading = false;
      state.add_to_cart.message = "";
      state.add_to_cart.error = action.payload;
    },
    updateQuantity: (state) => {
      state.update_quantity.loading = true;
    },
    updateQuantitySuccess: (state, action) => {
      state.update_quantity.loading = false;
      state.update_quantity.error = "";
      state.cart_list.data = action.payload;
    },
    updateQuantityFailure: (state, action) => {
      state.update_quantity.loading = false;
      state.update_quantity.error = action.payload;
    },
    deleteCartItem: (state) => {
      state.delete_cart_item.loading = true;
    },
    deleteCartItemSuccess: (state, action) => {
      state.delete_cart_item.loading = false;
      state.delete_cart_item.error = "";
      state.cart_list.data = action.payload;
      state.cart_list.total = state.cart_list.total - 1;
    },
    deleteCartItemFailure: (state, action) => {
      state.delete_cart_item.loading = false;
      state.delete_cart_item.message = "";
      state.delete_cart_item.error = action.payload;
    },
    checkout: (state) => {
      state.checkout.loading = true;
    },
    checkoutSuccess: (state, action) => {
      state.checkout.loading = false;
      state.checkout.error = "";
      state.checkout.data = action.payload;
    },
    checkoutFailure: (state, action) => {
      state.checkout.loading = false;
      state.checkout.data = [];
      state.checkout.error = action.payload;
    },
    saveOrder: (state) => {
      state.save_order.loading = true;
    },
    saveOrderSuccess: (state, action) => {
      state.save_order.loading = false;
      state.save_order.error = "";
      state.save_order.data = action.payload;
    },
    saveOrderFailure: (state, action) => {
      state.save_order.loading = false;
      state.save_order.data = [];
      state.save_order.error = action.payload;
    },
  },
});

export const {
  getCartList,
  getCartListSuccess,
  getCartListFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  updateQuantity,
  updateQuantitySuccess,
  updateQuantityFailure,
  deleteCartItem,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  checkout,
  checkoutSuccess,
  checkoutFailure,
  saveOrder,
  saveOrderSuccess,
  saveOrderFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
