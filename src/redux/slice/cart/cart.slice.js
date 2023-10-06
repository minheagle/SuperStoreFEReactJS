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
  },
});

export const {
  getCartList,
  getCartListSuccess,
  getCartListFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
