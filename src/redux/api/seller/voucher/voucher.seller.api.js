import axios from "../../axiosInstance";

const getAllBySeller = async (sellerId) => {
  try {
    const response = await axios.get(`/promotions/seller/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createVoucher = async (promotionRequestCreate) => {
  try {
    const response = await axios.post(
      "/promotions/new",
      promotionRequestCreate
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const toggleStatus = async (status, promotionId) => {
  try {
    const response = await axios.patch(`/promotions/${promotionId}`, status);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const voucherForSeller = { getAllBySeller, createVoucher, toggleStatus };

export default voucherForSeller;
