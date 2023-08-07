import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menu: {
    isOpen: false,
  },
  auth: {
    isOpen: false,
  },
};

const UIPublicSlice = createSlice({
  name: "UI_Public",
  initialState: initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menu.isOpen = !state.menu.isOpen;
    },
    toggleAuth: (state) => {
      state.auth.isOpen = !state.auth.isOpen;
    },
  },
});

export const { toggleMenu, toggleAuth } = UIPublicSlice.actions;

export default UIPublicSlice.reducer;
