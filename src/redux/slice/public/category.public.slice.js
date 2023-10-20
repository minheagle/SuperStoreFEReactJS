import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    loading: false,
    error: "",
  },
  all_leaf: {
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
    getAllLeaf: (state) => {
      state.all_leaf.loading = true;
    },
    getAllLeafSuccess: (state, action) => {
      state.all_leaf.loading = false;
      state.all_leaf.error = "";
      state.all_leaf.data = action.payload;
    },
    getAllLeafFailure: (state, action) => {
      state.all_leaf.loading = false;
      state.all_leaf.data = "";
      state.all_leaf.error = action.payload;
    },
  },
});

export const {
  getAllList,
  getAllListSuccess,
  getAllListFailure,
  getAllLeaf,
  getAllLeafSuccess,
  getAllLeafFailure,
} = categoryPublicSlice.actions;

export default categoryPublicSlice.reducer;
