import axios from "../../axiosInstance.js";

const getAllOrder = async (sellerId) => {
  try {
    const response = await axios.get(`/seller/order/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllConfirm = async () => {
  try {
  } catch (error) {}
};

const confirmOrder = async (sellerId, orderId) => {
  try {
    const response = await axios.post(
      `/seller/order/confirm-order/${sellerId}/${orderId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const rejectionOrder = async (sellerId, orderId) => {
  try {
    const response = await axios.post(
      `/seller/order/rejection-order/${sellerId}/${orderId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const orderForSellerApi = {
  getAllOrder,
  getAllConfirm,
  confirmOrder,
  rejectionOrder,
};

export default orderForSellerApi;
