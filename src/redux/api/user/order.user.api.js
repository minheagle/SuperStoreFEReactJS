import axios from "../axiosInstance.js";

const getAll = async (userId) => {
  try {
    const response = await axios.get(`/cart/history/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getLinkPayment = async (paymentServiceRequest) => {
  try {
    const response = await axios.post("/payment", paymentServiceRequest);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const handlePayment = async (informationStatusPayment) => {
  try {
    const response = await axios.patch(
      "/payment/status",
      informationStatusPayment
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const orderUserApi = { getAll, getLinkPayment, handlePayment };

export default orderUserApi;
