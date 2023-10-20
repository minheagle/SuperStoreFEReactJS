import axios from "../axiosInstance";

const getAllOfUser = async (userId) => {
  try {
    const response = await axios.get(`/promotions/user/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllAvailable = async (userId) => {
  try {
    const response = await axios.get(`/promotions/available/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVoucher = async (userId, listPromotionId) => {
  try {
    const response = await axios.post(
      `/promotions/user/${userId}/choose`,
      listPromotionId
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const voucherForUser = { getAllOfUser, getAllAvailable, getVoucher };

export default voucherForUser;
