import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbar: {
    isOpen: false,
  },
  dropdownInfo: {
    isOpen: false,
  },
};

const UIAdminSlice = createSlice({
  name: "UI_Admin",
  initialState: initialState,
  reducers: {
    toggleNavbar: (state) => {
      state.navbar.isOpen = !state.navbar.isOpen;
    },
    toggleDropdownInfo: (state) => {
      state.dropdownInfo.isOpen = !state.dropdownInfo.isOpen;
    },
  },
});

export const { toggleNavbar, toggleDropdownInfo } = UIAdminSlice.actions;

export default UIAdminSlice.reducer;
