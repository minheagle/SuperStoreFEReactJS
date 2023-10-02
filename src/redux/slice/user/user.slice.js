import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_user: {
    data: "",
    loading: false,
    error: "",
  },
  change_avatar: {
    data: "",
    loading: false,
    error: "",
  },
  add_address: {
    loading: false,
    message: "",
    error: "",
  },
  become_seller: {
    data: "",
    loading: false,
    error: "",
  },
};

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    updateUser: (state) => {
      state.update_user.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.update_user.loading = false;
      state.update_user.error = "";
      state.update_user.data = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.update_user.loading = false;
      state.update_user.data = "";
      state.update_user.error = action.payload;
    },
    changeAvatar: (state) => {
      state.change_avatar.loading = true;
    },
    changeAvatarSuccess: (state, action) => {
      state.change_avatar.loading = false;
      state.change_avatar.error = "";
      state.change_avatar.data = action.payload;
    },
    changeAvatarFailure: (state, action) => {
      state.change_avatar.loading = false;
      state.change_avatar.data = "";
      state.change_avatar.error = action.payload;
    },
    addAddress: (state) => {
      state.add_address.loading = true;
    },
    addAddressSuccess: (state, action) => {
      state.add_address.loading = false;
      state.add_address.error = "";
      state.add_address.message = action.payload;
    },
    addAddressFailure: (state, action) => {
      state.add_address.loading = false;
      state.add_address.message = "";
      state.add_address.error = action.payload;
    },
    becomeSeller: (state) => {
      state.become_seller.loading = true;
    },
    becomeSellerSuccess: (state, action) => {
      state.become_seller.loading = false;
      state.become_seller.error = "";
      state.become_seller.data = action.payload;
    },
    becomeSellerFailure: (state, action) => {
      state.become_seller.loading = false;
      state.become_seller.data = "";
      state.become_seller.error = action.payload;
    },
  },
});

export const {
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  changeAvatar,
  changeAvatarSuccess,
  changeAvatarFailure,
  addAddress,
  addAddressSuccess,
  addAddressFailure,
  becomeSeller,
  becomeSellerSuccess,
  becomeSellerFailure,
} = userSlice.actions;

export default userSlice.reducer;
