import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: {
    data: "",
    loading: false,
    error: "",
  },
  province_detail: {
    data: "",
    loading: false,
    error: "",
  },
  districts: {
    data: "",
    loading: false,
    error: "",
  },
  district_detail: {
    data: "",
    loading: false,
    error: "",
  },
  wards: {
    data: "",
    loading: false,
    error: "",
  },
  ward_detail: {
    data: "",
    loading: false,
    error: "",
  },
  address_detail: {
    data: "",
    loading: false,
    error: "",
  },
};

const provincesVietNamSlice = createSlice({
  name: "Provinces_Viet_Nam",
  initialState: initialState,
  reducers: {
    getAllProvince: (state) => {
      state.provinces.loading = true;
    },
    getAllProvinceSuccess: (state, action) => {
      state.provinces.loading = false;
      state.provinces.error = "";
      state.provinces.data = action.payload;
    },
    getAllProvinceFailure: (state, action) => {
      state.provinces.loading = false;
      state.provinces.data = "";
      state.provinces.error = action.payload;
    },
    getProvinceDetail: (state) => {
      state.province_detail.loading = true;
    },
    getProvinceDetailSuccess: (state, action) => {
      state.province_detail.loading = false;
      state.province_detail.error = "";
      state.province_detail.data = action.payload;
    },
    getProvinceDetailFailure: (state, action) => {
      state.province_detail.loading = false;
      state.province_detail.data = "";
      state.province_detail.error = action.payload;
    },
    getDistrict: (state) => {
      state.districts.loading = true;
    },
    getDistrictSuccess: (state, action) => {
      state.districts.loading = false;
      state.districts.error = "";
      state.districts.data = action.payload;
    },
    getDistrictFailure: (state, action) => {
      state.districts.loading = false;
      state.districts.data = "";
      state.districts.error = action.payload;
    },
    getDistrictDetail: (state) => {
      state.district_detail.loading = true;
    },
    getDistrictDetailSuccess: (state, action) => {
      state.district_detail.loading = false;
      state.district_detail.error = "";
      state.district_detail.data = action.payload;
    },
    getDistrictDetailFailure: (state, action) => {
      state.district_detail.loading = false;
      state.district_detail.data = "";
      state.district_detail.error = action.payload;
    },
    getWard: (state) => {
      state.wards.loading = true;
    },
    getWardSuccess: (state, action) => {
      state.wards.loading = false;
      state.wards.error = "";
      state.wards.data = action.payload;
    },
    getWardFailure: (state, action) => {
      state.wards.loading = false;
      state.wards.data = "";
      state.wards.error = action.payload;
    },
    getWardDetail: (state) => {
      state.ward_detail.loading = true;
    },
    getWardDetailSuccess: (state, action) => {
      state.ward_detail.loading = false;
      state.ward_detail.error = "";
      state.ward_detail.data = action.payload;
    },
    getWardDetailFailure: (state, action) => {
      state.ward_detail.loading = false;
      state.ward_detail.data = "";
      state.ward_detail.error = action.payload;
    },
    getDetailAddress: (state) => {
      state.address_detail.loading = true;
    },
    getDetailAddressSuccess: (state, action) => {
      state.address_detail.loading = false;
      state.address_detail.error = "";
      state.address_detail.data = action.payload;
    },
    getDetailAddressFailure: (state, action) => {
      state.address_detail.loading = false;
      state.address_detail.data = "";
      state.address_detail.error = action.payload;
    },
  },
});

export const {
  getAllProvince,
  getAllProvinceSuccess,
  getAllProvinceFailure,
  getProvinceDetail,
  getProvinceDetailSuccess,
  getProvinceDetailFailure,
  getDistrict,
  getDistrictSuccess,
  getDistrictFailure,
  getDistrictDetail,
  getDistrictDetailSuccess,
  getDistrictDetailFailure,
  getWard,
  getWardSuccess,
  getWardFailure,
  getWardDetail,
  getWardDetailSuccess,
  getWardDetailFailure,
  getDetailAddress,
  getDetailAddressSuccess,
  getDetailAddressFailure,
} = provincesVietNamSlice.actions;

export default provincesVietNamSlice.reducer;
