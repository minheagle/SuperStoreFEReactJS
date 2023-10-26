import axios from "../axiosInstance.js";

const getDetailShop = async (sellerId) => {
  try {
    const response = await axios.get(`/public/sellers/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailShopByName = async (storeName) => {
  try {
    const response = await axios.get(`/public/sellers/detail/${storeName}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const shopApi = { getDetailShop, getDetailShopByName };

export default shopApi;
