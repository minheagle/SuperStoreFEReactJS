import axios from "../axiosInstance";

const getAll = async (productId) => {
  try {
    const response = await axios.get(
      `/public/product-review/get-all-by-product/${productId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ratingPublicApi = { getAll };

export default ratingPublicApi;
