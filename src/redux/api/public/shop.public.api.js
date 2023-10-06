import axios from "../axiosInstance.js";

const getDetailShop = async (sellerId) => {
  try {
    const response = await axios.get(`/public/sellers/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const shopApi = { getDetailShop };

export default shopApi;
