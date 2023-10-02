import axios from "../axiosInstance.js";

const getAll = async () => {
  try {
    const response = await axios.get("/public/categories");
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const categoryPublicApi = { getAll };

export default categoryPublicApi;
