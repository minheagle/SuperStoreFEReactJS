import axios from "../axiosInstance";

const getAllFromShop = async (shopId) => {
  try {
    const response = await axios.get(`/public/promotions/seller/${shopId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVoucher = async (userId, listPromotionId) => {
  try {
    const response = await axios.post(
      `/public/promotions/user/${userId}/choose`,
      listPromotionId
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const voucherPublicApi = { getAllFromShop, getVoucher };

export default voucherPublicApi;
