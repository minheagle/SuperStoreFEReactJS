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

const updateQuantity = async (cartId, quantity) => {
  try {
    const response = await axios.post(`/cart/update/${cartId}/${quantity}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCartItem = async (cartId) => {
  try {
    const response = await axios.post(`/cart/delete/${cartId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkout = async (checkoutRequest) => {
  try {
    const response = await axios.post("/cart/check-out", checkoutRequest);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const saveOrder = async (orderRequest) => {
  try {
    const response = await axios.post("/cart/save-order", orderRequest);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const cartApi = {
  getAll,
  add,
  checkout,
  updateQuantity,
  deleteCartItem,
  saveOrder,
};

export default cartApi;
