import axios from "../axiosInstance.js";

const getAllProvince = async () => {
  try {
    const response = await axios.get("/63-provinces/provinces");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getProvinceByName = async (provinceName) => {
  try {
    const response = await axios.post("/63-provinces/provinces/by-name", {
      name: provinceName,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllDistrictByProvince = async (provinceId) => {
  try {
    const response = await axios.get(`/63-provinces/districts/${provinceId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getDistrictByName = async (districtName, provinceId) => {
  try {
    const response = await axios.post(
      `/63-provinces/districts/${provinceId}/by-name`,
      {
        name: districtName,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllWardByDistrict = async (districtId) => {
  try {
    const response = await axios.get(`/63-provinces/wards/${districtId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getWardByName = async (wardName) => {
  try {
    const response = await axios.post("/63-provinces/wards/by-name", {
      name: wardName,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetailAddress = async (detailAddressForm) => {
  try {
    const response = await axios.post(
      "/63-provinces/address-detail",
      detailAddressForm
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const provincesVietNamApi = {
  getAllProvince,
  getProvinceByName,
  getAllDistrictByProvince,
  getDistrictByName,
  getAllWardByDistrict,
  getWardByName,
  getDetailAddress,
};

export default provincesVietNamApi;
