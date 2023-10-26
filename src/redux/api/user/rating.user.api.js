import axios from "../axiosInstance";

const createRating = async (productReviewRequest) => {
  try {
    const response = await axios.post(
      "/product-review/create",
      productReviewRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 3 * 60 * 1000,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRating = async (productReviewUpdateRequest) => {
  try {
    const response = await axios.post(
      "/product-review/update",
      productReviewUpdateRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 3 * 60 * 1000,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRating = async (productReviewId) => {
  try {
    const response = await axios.post(
      `/product-review/update/${productReviewId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const productReviewForUser = { createRating, updateRating, deleteRating };

export default productReviewForUser;
