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
  info: {
    data: null,
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
      state.list.totalCount = action.payload.totalCount;
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
      state.detail.data = action.payload;
    },
    getUserDetailFailure: (state, action) => {
      state.detail.loading = false;
      state.detail.error = action.payload;
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
} = userForAdminSlice.actions;

export default userForAdminSlice.reducer;
