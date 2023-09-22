import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    totalCount: null,
    loading: false,
    error: "",
  },
  detail: {
    data: null,
    loading: false,
    error: "",
  },
  create: {
    loading: false,
    message: "",
    error: "",
  },
  update: {
    loading: false,
    message: "",
    error: "",
  },
  delete_item: {
    loading: false,
    message: "",
    error: "",
  },
  move: {
    loading: false,
    message: "",
    error: "",
  },
};

const categorySlice = createSlice({
  name: "Category",
  initialState: initialState,
  reducers: {
    getAllCategory: (state) => {
      state.list.loading = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.list.loading = false;
      state.list.error = "";
      state.list.data = action.payload.data;
      state.list.totalCount = action.payload.totalCount;
    },
    getAllCategoryFailure: (state, action) => {
      state.list.loading = false;
      state.list.error = action.payload;
    },
    getDetailCategory: (state) => {
      state.detail.loading = true;
    },
    getDetailCategorySuccess: (state, action) => {
      state.detail.loading = false;
      state.detail.error = "";
      state.detail.data = action.payload.data;
    },
    getDetailCategoryFailure: (state, action) => {
      state.detail.loading = false;
      state.detail.error = action.payload;
    },
    createCategory: (state) => {
      state.create.loading = true;
    },
    createCategorySuccess: (state, action) => {
      state.create.loading = false;
      state.create.error = "";
      state.create.message = action.payload;
    },
    createCategoryFailure: (state, action) => {
      state.create.loading = false;
      state.create.error = action.payload;
    },
    updateCategory: (state) => {
      state.update.loading = true;
    },
    updateCategorySuccess: (state, action) => {
      state.update.loading = false;
      state.update.error = "";
      state.update.message = action.payload;
    },
    updateCategoryFailure: (state, action) => {
      state.update.loading = false;
      state.update.error = action.payload;
      state.update.message = "";
    },
    deleteCategory: (state) => {
      state.delete_item.loading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.delete_item.loading = false;
      state.delete_item.message = action.payload;
      state.delete_item.error = "";
    },
    deleteCategoryFailure: (state, action) => {
      state.delete_item.loading = false;
      state.delete_item.message = "";
      state.delete_item.error = action.payload;
    },
    moveCategory: (state) => {
      state.move.loading = true;
    },
    moveCategorySuccess: (state, action) => {
      state.move.loading = false;
      state.move.error = "";
      state.move.message = action.payload;
    },
    moveCategoryFailure: (state, action) => {
      state.move.loading = false;
      state.move.message = "";
      state.move.error = action.payload;
    },
  },
});

export const {
  getAllCategory,
  getAllCategorySuccess,
  getAllCategoryFailure,
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFailure,
  createCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,
  moveCategory,
  moveCategorySuccess,
  moveCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
