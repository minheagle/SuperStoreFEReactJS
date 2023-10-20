import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: {
    data: [],
    paging: null,
    loading: false,
    error: "",
  },
  detail: {
    data: null,
    loading: false,
    error: "",
  },
  info: {
    data: null,
    loading: false,
    error: "",
  },
  create: {
    loading: false,
    error: "",
  },
  update: {
    loading: false,
    error: "",
  },
  delete_item: {
    loading: false,
    error: "",
  },
};

const userForAdminSlice = createSlice({
  name: "User_For_Admin",
  initialState: initialState,
  reducers: {
    getAllUser: (state) => {
      state.list.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.list.loading = false;
      state.list.data = action.payload.data;
      state.list.paging = action.payload.paging;
    },
    getAllUserFailure: (state, action) => {
      state.list.loading = false;
      state.list.error = action.payload;
    },
    getUserDetail: (state) => {
      state.detail.loading = true;
    },
    getUserDetailSuccess: (state, action) => {
      state.detail.loading = false;
      state.detail.data = action.payload.data;
    },
    getUserDetailFailure: (state, action) => {
      state.detail.loading = false;
      state.detail.error = action.payload;
    },
    createUser: (state, action) => {
      state.create.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.create.loading = false;
    },
    createUserFailure: (state, action) => {
      state.create.loading = false;
      state.create.error = action.payload;
    },
  },
});

export const {
  getAllUser,
  getAllUserSuccess,
  getAllUserFailure,
  getUserDetail,
  getUserDetailSuccess,
  getUserDetailFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
} = userForAdminSlice.actions;

export default userForAdminSlice.reducer;
