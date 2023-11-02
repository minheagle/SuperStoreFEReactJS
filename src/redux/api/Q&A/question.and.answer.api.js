import axios from "../axiosInstance";

const getListByProduct = async (productId) => {
  try {
    const response = await axios.get(`/public/comments/${productId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const add = async (createCommentRequest) => {
  try {
    const response = await axios.post("/comment/create", createCommentRequest);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const questionAndAnswerApi = { getListByProduct, add };

export default questionAndAnswerApi;
