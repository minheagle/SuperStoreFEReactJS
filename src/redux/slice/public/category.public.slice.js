import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    loading: false,
    error: "",
  },
};

const categoryPublicSlice = createSlice({
  name: "Category_Public",
  initialState: initialState,
  reducers: {
    getAllList: (state) => {
      state.list.loading = true;
    },
    getAllListSuccess: (state, action) => {
      state.list.loading = false;
      state.list.error = "";
      state.list.data = action.payload;
    },
    getAllListFailure: (state, action) => {
      state.list.loading = false;
      state.list.data = "";
      state.list.error = action.payload;
    },
  },
});

export const { getAllList, getAllListSuccess, getAllListFailure } =
  categoryPublicSlice.actions;

export default categoryPublicSlice.reducer;
