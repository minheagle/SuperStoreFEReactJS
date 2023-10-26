import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all_by_product: {
    data: [],
    loading: false,
    error: "",
  },
};

const ratingPublicSlice = createSlice({
  name: "Rating_Public",
  initialState: initialState,
  reducers: {
    getAllByProduct: (state) => {
      state.all_by_product.loading = true;
    },
    getAllByProductSuccess: (state, action) => {
      state.all_by_product.loading = false;
      state.all_by_product.error = "";
      state.all_by_product.data = action.payload;
    },
    getAllByProductFailure: (state, action) => {
      state.all_by_product.loading = false;
      state.all_by_product.data = [];
      state.all_by_product.error = action.payload;
    },
  },
});

export const {
  getAllByProduct,
  getAllByProductSuccess,
  getAllByProductFailure,
} = ratingPublicSlice.actions;

export default ratingPublicSlice.reducer;
