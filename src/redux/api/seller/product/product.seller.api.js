import axios from "../../axiosInstance.js";

const createProduct = async (product) => {
  try {
    const response = axios.post("/products/add-new/product", product);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const productForSellerApi = { createProduct };

export default productForSellerApi;
