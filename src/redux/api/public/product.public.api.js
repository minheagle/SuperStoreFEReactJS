import axios from "../axiosInstance.js";

const getAll = async () => {
  try {
    const response = await axios.get("/public/products");
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

const productPublicApi = { getAll, getDetail };

export default productPublicApi;
