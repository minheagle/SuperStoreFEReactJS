import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    page: 1,
    size: 10,
    sort: "ASC",
  },
};

const pagingForAdmin = createSlice({
  name: "Paging_For_Admin",
  initialState: initialState,
  reducers: {
    changePageUsers: (state, action) => {
      state.users.page = action.payload;
    },
    changeSizeUsers: (state, action) => {
      state.users.size = action.payload;
    },
    changeSortUsers: (state, action) => {
      state.users.sort = action.payload;
    },
  },
});

export const { changePageUsers, changeSizeUsers, changeSortUsers } =
  pagingForAdmin.actions;

export default pagingForAdmin.reducer;
