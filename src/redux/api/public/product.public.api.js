import axios from "../axiosInstance.js";

const getAll = async (params) => {
  try {
    const response = await axios.get("/public/products");
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getByShopId = async (shopId) => {
  try {
    const response = await axios.get(`/public/products/${shopId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const search = async (params) => {
  try {
    const response = await axios.get("/public/products/search", {
      params: params,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetail = async (productId) => {
  try {
    const response = await axios.get(`/public/products/product/${productId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const productPublicApi = { getAll, getByShopId, search, getDetail };

export default productPublicApi;
