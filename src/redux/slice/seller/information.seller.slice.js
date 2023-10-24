import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  information_detail: {
    data: {},
    loading: false,
    error: "",
  },
  change_information: {
    loading: false,
    error: "",
    message: "",
  },
  change_avatar: {
    loading: false,
    error: "",
    message: "",
  },
  change_background: {
    loading: false,
    error: "",
    message: "",
  },
};

const informationSellerSlice = createSlice({
  name: "Information_Seller",
  initialState: initialState,
  reducers: {
    getInformationDetail: (state) => {
      state.information_detail.loading = true;
    },
    getInformationDetailSuccess: (state, action) => {
      state.information_detail.loading = false;
      state.information_detail.error = "";
      state.information_detail.data = action.payload;
    },
    getInformationDetailFailure: (state, action) => {
      state.information_detail.loading = false;
      state.information_detail.data = {};
      state.information_detail.error = action.payload;
    },
    changeInformation: (state) => {
      state.change_information.loading = true;
    },
    changeInformationSuccess: (state, action) => {
      state.change_information.loading = false;
      state.change_information.error = "";
      state.change_information.message = action.payload;
    },
    changeInformationFailure: (state, action) => {
      state.change_information.loading = false;
      state.change_information.message = "";
      state.change_information.error = action.payload;
    },
    changeAvatar: (state) => {
      state.change_avatar.loading = true;
    },
    changeAvatarSuccess: (state, action) => {
      state.change_avatar.loading = false;
      state.change_avatar.error = "";
      state.change_avatar.message = action.payload;
    },
    changeAvatarFailure: (state, action) => {
      state.change_avatar.loading = false;
      state.change_avatar.message = "";
      state.change_avatar.error = action.payload;
    },
    changeBackground: (state) => {
      state.change_background.loading = true;
    },
    changeBackgroundSuccess: (state, action) => {
      state.change_background.loading = false;
      state.change_background.error = "";
      state.change_background.message = action.payload;
    },
    changeBackgroundFailure: (state, action) => {
      state.change_background.loading = false;
      state.change_background.message = "";
      state.change_background.error = action.payload;
    },
  },
});

export const {
  getInformationDetail,
  getInformationDetailSuccess,
  getInformationDetailFailure,
  changeInformation,
  changeInformationSuccess,
  changeInformationFailure,
  changeAvatar,
  changeAvatarSuccess,
  changeAvatarFailure,
  changeBackground,
  changeBackgroundSuccess,
  changeBackgroundFailure,
} = informationSellerSlice.actions;

export default informationSellerSlice.reducer;
