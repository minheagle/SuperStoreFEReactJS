import axios from "../axiosInstance.js";

const getAll = async (userId) => {
  try {
    const response = await axios.get(`/cart/get/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const add = async (productItem, userId) => {
  try {
    const response = await axios.post(
      `/cart/add-to-cart/${userId}`,
      productItem
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const cartApi = { getAll, add };

export default cartApi;
