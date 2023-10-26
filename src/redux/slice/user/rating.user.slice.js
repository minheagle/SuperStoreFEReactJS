import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  create_rating: {
    data: null,
    loading: false,
    error: "",
  },
  update_rating: {
    data: null,
    loading: false,
    error: "",
  },
  delete_rating: {
    data: null,
    loading: false,
    error: "",
  },
};

const productReviewForUserSlice = createSlice({
  name: "Product_Review_For_User",
  initialState: initialState,
  reducers: {
    createRating: (state) => {
      state.create_rating.loading = true;
    },
    createRatingSuccess: (state, action) => {
      state.create_rating.loading = false;
      state.create_rating.error = "";
      state.create_rating.data = action.payload;
    },
    createRatingFailure: (state, action) => {
      state.create_rating.loading = false;
      state.create_rating.data = null;
      state.create_rating.error = action.payload;
    },
  },
});

export const { createRating, createRatingSuccess, createRatingFailure } =
  productReviewForUserSlice.actions;

export default productReviewForUserSlice.reducer;
